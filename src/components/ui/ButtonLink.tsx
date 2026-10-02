import type { ReactNode } from "react";
import { Nudge } from "@/components/motion/Nudge";
import { Pressable } from "@/components/motion/Pressable";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  arrow?: "right" | "up-right";
  download?: boolean;
  external?: boolean;
};

const variants = {
  primary:
    "bg-linear-to-r from-accent to-accent-2 text-white shadow-md shadow-teal-900/15 hover:shadow-lg hover:shadow-teal-900/25 dark:shadow-slate-950/40",
  secondary:
    "border border-slate-300 bg-white/70 text-slate-900 backdrop-blur hover:border-teal-400 hover:text-teal-700 dark:border-slate-600 dark:bg-slate-800/70 dark:text-slate-50 dark:hover:border-teal-400 dark:hover:text-teal-300",
};

const arrows = { right: "→", "up-right": "↗" };

export function ButtonLink({
  href,
  children,
  variant = "primary",
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
        className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-4 text-sm font-medium whitespace-nowrap transition-[box-shadow,border-color,color] duration-300 ease-out sm:px-6 ${variants[variant]}`}
      >
        {children}
        {arrow && <Nudge direction={arrow}>{arrows[arrow]}</Nudge>}
      </a>
    </Pressable>
  );
}
