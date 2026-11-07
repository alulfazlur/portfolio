"use client";

import { mdiClose } from "@mdi/js";
import {
  animate,
  useReducedMotionConfig,
  type AnimationPlaybackControls,
} from "motion/react";
import { useRouter } from "next/navigation";
import {
  useLayoutEffect,
  useRef,
  type MouseEvent,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import { easeOut } from "@/components/motion/ease";
import { Pressable } from "@/components/motion/Pressable";
import { setCardHidden, takeZoomOrigin } from "@/components/motion/zoomOrigin";
import { Icon } from "@/components/ui/Icon";

// Kurva standar (bukan ease-out tajam) agar kartu terlihat membesar, bukan langsung melompat.
const MORPH = { duration: 0.55, ease: [0.4, 0, 0.2, 1] } as const;

type Box = { left: number; top: number; width: number; height: number };

/**
 * Bagian panel yang terlihat di layar. Panel bisa jauh lebih tinggi dari viewport;
 * yang dianimasikan cukup potongan yang terlihat.
 */
function visibleBox(panel: HTMLElement): Box {
  const rect = panel.getBoundingClientRect();
  const top = Math.max(rect.top, 0);
  const bottom = Math.min(rect.bottom, window.innerHeight);
  return { left: rect.left, top, width: rect.width, height: bottom - top };
}

// Identitas ditulis eksplisit dengan fungsi yang sama seperti `fit`/`cover`. Jangan pakai
// "none": Motion menggantinya dengan versi nol keyframe lain, yaitu scale(0, 0).
const FIT_IDENTITY = "translate(0px, 0px) scale(1, 1)";
const PANEL_FROM = "translateY(24px) scale(0.96)";
const PANEL_IDENTITY = "translateY(0px) scale(1)";

/** Transform (origin kiri atas) yang membuat kotak `from` menempati kotak `to`. */
function fit(from: Box, to: Box): string {
  const x = to.left - from.left;
  const y = to.top - from.top;
  return `translate(${x}px, ${y}px) scale(${to.width / from.width}, ${to.height / from.height})`;
}

type Pose = { box: Box; transform: string };

/**
 * Posisi kartu tanpa efek tilt/hover, plus transform pembungkusnya (Tilt, Pressable)
 * yang sedang aktif. Pembungkus seukuran kartu, jadi transform itu bisa dipasang ulang
 * pada salinan kartu dengan transform-origin di tengah.
 */
function cardPose(card: HTMLElement): Pose {
  const wrappers: HTMLElement[] = [];
  for (
    let el = card.parentElement;
    el &&
    el.offsetWidth === card.offsetWidth &&
    el.offsetHeight === card.offsetHeight;
    el = el.parentElement
  ) {
    if (el.style.transform && el.style.transform !== "none") {
      wrappers.unshift(el);
    }
  }
  const transforms = wrappers.map((el) => el.style.transform);
  wrappers.forEach((el) => (el.style.transform = "none"));
  const rect = card.getBoundingClientRect();
  wrappers.forEach((el, index) => (el.style.transform = transforms[index]));
  return {
    box: {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    },
    transform: transforms.join(" "),
  };
}

/** Transform salinan kartu di posisi kartu asli, termasuk tilt/hover-nya. */
function posed(pose: Pose): string {
  return `translate(0px, 0px) ${pose.transform} scale(1)`;
}

/**
 * Transform (origin tengah) yang membuat salinan kartu menutupi bagian atas `to`, skala
 * seragam. Daftar fungsinya sama dengan `posed` (rotasi/geser tilt dinolkan) supaya
 * keduanya diinterpolasi per fungsi.
 */
function cover(pose: Pose, to: Box): string {
  const { box } = pose;
  const scale = to.width / box.width;
  const x = to.left + to.width / 2 - (box.left + box.width / 2);
  const y = to.top + (box.height * scale) / 2 - (box.top + box.height / 2);
  const flat = pose.transform
    .replace(/(rotate[XYZ]?)\([^)]*\)/g, "$1(0deg)")
    .replace(/(translate[XYZ]?)\([^)]*\)/g, "$1(0px)");
  return `translate(${x}px, ${y}px) ${flat} scale(${scale})`;
}

/** Salinan visual kartu (sudah di-promote ke GPU), untuk crossfade selama morph. */
function createGhost(
  card: HTMLElement,
  pose: Pose,
  layer: HTMLElement,
): HTMLElement {
  const ghost = card.cloneNode(true);
  if (!(ghost instanceof HTMLElement)) {
    throw new Error("Project card must be an element");
  }
  ghost.inert = true;
  Object.assign(ghost.style, {
    position: "fixed",
    left: `${pose.box.left}px`,
    top: `${pose.box.top}px`,
    width: `${pose.box.width}px`,
    height: `${pose.box.height}px`,
    margin: "0",
    transform: posed(pose),
    willChange: "transform, opacity",
    // Saat menutup, kartu asli sedang disembunyikan dan inline style itu ikut ter-clone.
    visibility: "visible",
  });
  layer.append(ghost);
  return ghost;
}

/** Permukaan polos yang membesar/mengecil di antara kartu dan panel (murah di-raster). */
function placeSurface(surface: HTMLElement, box: Box) {
  Object.assign(surface.style, {
    left: `${box.left}px`,
    top: `${box.top}px`,
    width: `${box.width}px`,
    height: `${box.height}px`,
    visibility: "visible",
  });
}

type ProjectModalProps = {
  children: ReactNode;
  /** Screenshot penuh di bagian atas panel, seperti di kartu. */
  media: ReactNode;
  labelledBy: string;
  closeLabel: string;
  /** Diisi bila tidak ada riwayat untuk kembali (modal dibuka langsung dari URL). */
  closeHref?: string;
};

/**
 * Case study dalam `<dialog>` di atas halaman utama (intercepting route).
 * Kartu yang diklik membesar dan berubah menjadi panel modal; menutup = kebalikannya,
 * lalu `router.back()` mengembalikan URL.
 *
 * Semua animasi hanya `transform` string + `opacity`, jadi Motion menjalankannya lewat
 * WAAPI di compositor dan tetap mulus walau main thread sibuk merender isi modal.
 * Panel aslinya tidak pernah di-transform (cukup fade), agar tidak di-raster ulang.
 */
export function ProjectModal({
  children,
  media,
  labelledBy,
  closeLabel,
  closeHref,
}: ProjectModalProps) {
  const router = useRouter();
  const reduceMotion = useReducedMotionConfig();
  // Diisi sekali di effect; ref tetap sama walau effect dijalankan ulang (Strict Mode).
  const origin = useRef<HTMLElement | null | undefined>(undefined);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ghostLayerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const backdrop = backdropRef.current;
    const surface = surfaceRef.current;
    const panel = panelRef.current;
    const layer = ghostLayerRef.current;
    const body = bodyRef.current;
    if (!dialog || !backdrop || !surface || !panel || !layer || !body) return;
    if (origin.current === undefined) origin.current = takeZoomOrigin();
    const card = reduceMotion ? null : origin.current;
    if (!dialog.open) dialog.showModal();
    // Fokus langsung ke tombol tutup, bukan pembungkus Pressable yang ikut bisa difokus.
    closeRef.current?.focus();

    const animations: AnimationPlaybackControls[] = [
      animate(backdrop, { opacity: [0, 1] }, { duration: 0.3, ease: easeOut }),
    ];
    let ghost: HTMLElement | null = null;

    if (card) {
      const pose = cardPose(card);
      const target = visibleBox(panel);
      ghost = createGhost(card, pose, layer);
      setCardHidden(card, true);
      placeSurface(surface, target);
      const grow = animate(
        surface,
        {
          transform: [fit(target, pose.box), FIT_IDENTITY],
          opacity: [0, 1, 1],
        },
        { ...MORPH, opacity: { ...MORPH, times: [0, 0.2, 1] } },
      );
      animations.push(
        grow,
        animate(
          ghost,
          { transform: [posed(pose), cover(pose, target)] },
          MORPH,
        ),
      );
      // Teks kartu ikut membesar dan tidak cocok dengan teks modal, jadi dihilangkan di awal;
      // yang terlihat bergerak hanya bingkai screenshot dan permukaan putih.
      const ghostText = ghost.querySelector<HTMLElement>("[data-zoom-body]");
      if (ghostText) {
        animations.push(
          animate(
            ghostText,
            { opacity: [1, 0] },
            { duration: 0.2, ease: easeOut },
          ),
        );
      }
      // Panel langsung tampil di atas salinan kartu: screenshot-nya berimpit, jadi tetap diam
      // dan sudutnya langsung menutup sudut salinan (yang ikut membesar). Hanya teks yang fade.
      grow.then(() => {
        body.style.opacity = "0";
        panel.style.opacity = "1";
        const reveal = animate(
          body,
          { opacity: [0, 1] },
          { duration: 0.25, ease: easeOut },
        );
        animations.push(reveal);
        reveal.then(() => {
          surface.style.visibility = "hidden";
          ghost?.remove();
        });
      });
    } else {
      animations.push(
        animate(
          panel,
          reduceMotion
            ? { opacity: [0, 1] }
            : {
                opacity: [0, 1],
                transform: [PANEL_FROM, PANEL_IDENTITY],
              },
          { duration: 0.4, ease: easeOut },
        ),
      );
    }

    return () => {
      animations.forEach((animation) => animation.stop());
      ghost?.remove();
      if (card) setCardHidden(card, false);
    };
  }, [reduceMotion]);

  async function dismiss() {
    const dialog = dialogRef.current;
    const backdrop = backdropRef.current;
    const surface = surfaceRef.current;
    const panel = panelRef.current;
    const layer = ghostLayerRef.current;
    if (closing.current || !dialog || !backdrop || !surface || !panel || !layer)
      return;
    closing.current = true;

    const card = reduceMotion ? null : origin.current;
    if (card) {
      // Diukur ulang: panel bisa sudah di-scroll di dalam dialog.
      const pose = cardPose(card);
      const target = visibleBox(panel);
      const ghost = createGhost(card, pose, layer);
      ghost.style.opacity = "0";
      placeSurface(surface, target);
      await Promise.all([
        animate(backdrop, { opacity: 0 }, MORPH),
        animate(panel, { opacity: 0 }, { duration: 0.15, ease: easeOut }),
        animate(
          surface,
          {
            transform: [FIT_IDENTITY, fit(target, pose.box)],
            opacity: [1, 1, 0],
          },
          { ...MORPH, opacity: { ...MORPH, times: [0, 0.8, 1] } },
        ),
        animate(
          ghost,
          {
            transform: [cover(pose, target), posed(pose)],
            opacity: [0, 1],
          },
          { ...MORPH, opacity: { duration: 0.3, delay: 0.1, ease: easeOut } },
        ),
      ]);
      setCardHidden(card, false);
      ghost.remove();
    } else {
      await Promise.all([
        animate(backdrop, { opacity: 0 }, { duration: 0.3, ease: easeOut }),
        animate(
          panel,
          reduceMotion
            ? { opacity: 0 }
            : { opacity: 0, transform: [PANEL_IDENTITY, PANEL_FROM] },
          { duration: 0.3, ease: easeOut },
        ),
      ]);
    }
    // close() memicu event "close" (onClose → kembali ke URL sebelumnya) dan mengembalikan fokus ke kartu.
    dialog.close();
  }

  function handleCancel(event: SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault();
    dismiss();
  }

  function handleBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) dismiss();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      onCancel={handleCancel}
      onClose={() =>
        closeHref ? router.replace(closeHref, { scroll: false }) : router.back()
      }
      className="m-0 size-full max-h-none max-w-none overflow-y-auto overscroll-contain border-0 bg-transparent p-0 text-slate-900 backdrop:bg-transparent dark:text-slate-100"
    >
      <div
        ref={backdropRef}
        aria-hidden="true"
        className="fixed inset-0 bg-slate-900/50 opacity-0 dark:bg-slate-950/70"
      />
      <div
        ref={surfaceRef}
        aria-hidden="true"
        className="invisible fixed origin-top-left rounded-[8px] bg-white ring-1 ring-slate-900/5 will-change-transform sm:rounded-[16px] dark:bg-slate-800 dark:ring-slate-700/60"
      />
      {/* Di bawah panel, agar panel bisa muncul di atas salinan kartu. */}
      <div
        ref={ghostLayerRef}
        aria-hidden="true"
        className="pointer-events-none"
      />
      <div
        onClick={handleBackdropClick}
        className="relative flex min-h-full items-start justify-center px-3 py-6 sm:px-6 sm:py-16"
      >
        <div
          ref={panelRef}
          className="relative w-full max-w-5xl rounded-[8px] bg-white opacity-0 shadow-2xl ring-1 shadow-slate-900/20 ring-slate-900/5 sm:rounded-[16px] dark:bg-slate-800 dark:shadow-slate-950/60 dark:ring-slate-700/60"
        >
          <div className="sticky top-0 z-10 -mb-14 flex justify-end px-3 pt-3">
            <Pressable preset="icon">
              <button
                ref={closeRef}
                type="button"
                onClick={dismiss}
                aria-label={closeLabel}
                title={closeLabel}
                className="inline-flex size-11 cursor-pointer items-center justify-center rounded-md border border-slate-200 bg-white/90 text-slate-600 shadow-sm backdrop-blur transition-colors hover:border-primary-300 hover:text-primary-700 dark:border-slate-700/60 dark:bg-slate-800/90 dark:text-slate-300 dark:hover:border-primary-400/40 dark:hover:text-primary-300"
              >
                <Icon path={mdiClose} />
              </button>
            </Pressable>
          </div>
          {media}
          <div ref={bodyRef} className="p-5 sm:p-10 lg:p-12">
            {children}
          </div>
        </div>
      </div>
    </dialog>
  );
}
