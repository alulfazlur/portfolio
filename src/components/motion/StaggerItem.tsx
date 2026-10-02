"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { easeOut } from "./ease";

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
};

const components = {
  span: motion.span,
  div: motion.div,
  li: motion.li,
  p: motion.p,
};

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: keyof typeof components;
};

export function StaggerItem({
  children,
  className,
  as = "div",
}: StaggerItemProps) {
  const Component = components[as];
  return (
    <Component className={className} variants={item}>
      {children}
    </Component>
  );
}
