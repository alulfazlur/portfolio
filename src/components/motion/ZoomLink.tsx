"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { setZoomOrigin } from "./zoomOrigin";

type ZoomLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

/** Link ke case study yang mencatat posisi kartu (`article` terdekat) agar modal bisa zoom dari situ. */
export function ZoomLink({ href, className, children }: ZoomLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const card = event.currentTarget.closest("article");
    if (card) setZoomOrigin(card);
  }

  return (
    <Link
      href={href}
      scroll={false}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
