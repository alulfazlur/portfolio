/** Ikon Material Design (`@mdi/js`, Apache 2.0), ikut warna teks. */
export function Icon({
  path,
  className = "size-5",
}: {
  path: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d={path} />
    </svg>
  );
}
