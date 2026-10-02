/** Logo `<a/>`, sama dengan favicon (src/app/icon.svg). */
export function Logo({
  className,
  gradientId,
}: {
  className?: string;
  /** Harus unik per instance di satu halaman (SVG gradient dirujuk lewat id). */
  gradientId: string;
}) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0f766e" />
          <stop offset="1" stopColor="#0369a1" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill={`url(#${gradientId})`} />
      <g
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4.5"
      >
        <path d="M15 23 7 32l8 9" stroke="#ccfbf1" strokeOpacity="0.75" />
        <circle cx="28" cy="33.5" r="6.5" stroke="#ffffff" />
        <path d="M34.5 26.5v14" stroke="#ffffff" />
        <path d="M40 42 45 24" stroke="#99f6e4" />
        <path d="m49 23 8 9-8 9" stroke="#ccfbf1" strokeOpacity="0.75" />
      </g>
    </svg>
  );
}
