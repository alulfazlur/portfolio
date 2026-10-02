export const spring = {
  type: "spring",
  stiffness: 380,
  damping: 26,
  mass: 0.6,
} as const;

/** Lebih lambat & lembut, untuk elemen besar seperti kartu. */
export const softSpring = {
  type: "spring",
  stiffness: 170,
  damping: 22,
  mass: 1,
} as const;
