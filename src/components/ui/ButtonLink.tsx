import type { ReactNode } from "react";
import { Nudge } from "@/components/motion/Nudge";
import { Pressable } from "@/components/motion/Pressable";
import type { AccentColor } from "@/content/types";
import { tones } from "./tones";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  /** Warna aksen untuk varian primary (mis. warna project), menggantikan gradien teal. */
  tone?: AccentColor;
  arrow?: "right" | "up-right";
  download?: boolean;
  external?: boolean;
};

// Isian vermilion naik dari bawah saat hover (pseudo-element, hanya transform).
const fill =
  "relative isolate overflow-hidden before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:bg-primary-600 before:transition-transform before:duration-500 before:ease-out-expo hover:before:scale-y-100 dark:before:bg-primary-400";

const variants = {
  primary: `${fill} bg-slate-900 text-slate-50 hover:text-white dark:bg-slate-50 dark:text-slate-900 dark:hover:text-slate-950`,
  secondary: `${fill} border border-slate-900/80 text-slate-900 hover:border-primary-600 hover:text-white dark:border-slate-100/70 dark:text-slate-50 dark:hover:border-primary-400 dark:hover:text-slate-950`,
};

const arrows = { right: "→", "up-right": "↗" };

export function ButtonLink({
  href,
  children,
  variant = "primary",
  tone,
  arrow,
  download = false,
  external = false,
}: ButtonLinkProps) {
  return (
    <Pressable className="inline-flex">
      <a
        href={href}
        download={download || undefined}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-[2px] px-5 text-sm font-medium tracking-[-0.005em] whitespace-nowrap transition-[border-color,color] duration-300 ease-out sm:px-6 ${tone ? tones[tone].button : variants[variant]}`}
      >
        {children}
        {arrow && <Nudge direction={arrow}>{arrows[arrow]}</Nudge>}
      </a>
    </Pressable>
  );
}
