"use client";

import { m, useReducedMotionConfig, useSpring } from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { softSpring } from "./spring";

/** Kemiringan maksimum (derajat) saat pointer di tepi elemen. */
const MAX_TILT = 5;

type TiltProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Efek 3D: elemen sedikit miring mengikuti pointer, lalu kembali datar saat pointer keluar.
 * Hanya untuk mouse; layar sentuh dan `prefers-reduced-motion` tidak mendapat efek ini.
 */
export function Tilt({ children, className }: TiltProps) {
  const reduceMotion = useReducedMotionConfig();
  const rotateX = useSpring(0, softSpring);
  const rotateY = useSpring(0, softSpring);
  // Ukuran diambil sekali saat pointer masuk, supaya kemiringan tidak ikut mengubah hitungan.
  const bounds = useRef<DOMRect | null>(null);

  function handleEnter(event: PointerEvent<HTMLDivElement>) {
    bounds.current = event.currentTarget.getBoundingClientRect();
  }

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse" || !bounds.current) {
      return;
    }
    const { left, top, width, height } = bounds.current;
    const x = (event.clientX - left) / width - 0.5;
    const y = (event.clientY - top) / height - 0.5;
    rotateY.set(x * MAX_TILT * 2);
    rotateX.set(-y * MAX_TILT * 2);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <m.div
      className={`will-change-transform ${className ?? ""}`}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerEnter={handleEnter}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </m.div>
  );
}
