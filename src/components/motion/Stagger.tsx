"use client";

import { m, type Variants } from "motion/react";
import type { ReactNode } from "react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const components = {
  span: m.span,
  div: m.div,
  ul: m.ul,
  ol: m.ol,
};

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: keyof typeof components;
};

export function Stagger({ children, className, as = "div" }: StaggerProps) {
  const Component = components[as];
  return (
    <Component
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </Component>
  );
}
