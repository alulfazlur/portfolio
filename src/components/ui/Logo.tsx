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
          <stop offset="0" stopColor="#2b2521" />
          <stop offset="1" stopColor="#161311" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill={`url(#${gradientId})`} />
      <g
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4.5"
      >
        <path d="M15 23 7 32l8 9" stroke="#f6f3ee" strokeOpacity="0.55" />
        <circle cx="28" cy="33.5" r="6.5" stroke="#f6f3ee" />
        <path d="M34.5 26.5v14" stroke="#f6f3ee" />
        <path d="M40 42 45 24" stroke="#ef5a3c" />
        <path d="m49 23 8 9-8 9" stroke="#f6f3ee" strokeOpacity="0.55" />
      </g>
    </svg>
  );
}
