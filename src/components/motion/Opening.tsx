"use client";

import { useEffect, useRef } from "react";
import { Logo } from "@/components/ui/Logo";

const STRIPS = 6;

/**
 * Layar pembuka di setiap load halaman: logo terisi seperti progress, huruf nama naik,
 * lalu overlay pecah jadi strip yang bergeser keluar (dari bawah ke atas).
 * Animasinya CSS (lihat `--animate-*` di globals.css) agar jalan sejak paint pertama.
 * Dilewati sepenuhnya untuk `prefers-reduced-motion`.
 */
export function Opening({ name }: { name: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = ref.current;
    if (!overlay) return;
    const animations = overlay.getAnimations({ subtree: true });
    Promise.all(animations.map((animation) => animation.finished)).then(() => {
      document.documentElement.dataset.opened = "";
    });
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 animate-vanish [animation-delay:2.2s] motion-reduce:hidden"
    >
      <div className="absolute inset-0 flex flex-col">
        {Array.from({ length: STRIPS }, (_, index) => (
          <div
            key={index}
            className="-mb-px flex-1 animate-wipe bg-slate-50"
            style={{ animationDelay: `${800 + (STRIPS - 1 - index) * 40}ms` }}
          />
        ))}
      </div>
      <div className="relative flex h-full animate-exit-up flex-col items-center justify-center gap-6 [animation-delay:0.75s]">
        <div className="relative size-16 sm:size-20">
          <Logo
            gradientId="opening-logo-base"
            className="absolute inset-0 size-full opacity-25"
          />
          <div className="absolute inset-0 animate-fill-up overflow-hidden">
            <div className="size-full animate-fill-down">
              <Logo gradientId="opening-logo-fill" className="size-full" />
            </div>
          </div>
        </div>
        <p className="flex overflow-hidden font-display text-8xl leading-[1] font-light tracking-[-0.06em] text-slate-800 sm:text-[11rem]">
          {[...name].map((letter, index) => (
            <span
              key={index}
              className="inline-block animate-rise"
              style={{ animationDelay: `${200 + index * 50}ms` }}
            >
              {letter}
            </span>
          ))}
          <span
            className="inline-block animate-rise font-mono text-[0.5em] text-primary-600"
            style={{ animationDelay: `${200 + name.length * 50}ms` }}
          >
            _
          </span>
        </p>
      </div>
    </div>
  );
}
