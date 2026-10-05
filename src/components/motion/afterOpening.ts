/**
 * Jeda animasi masuk (CSS) yang menyambung dari opening (`--opening-delay` di globals.css).
 * Dipakai untuk konten di atas lipatan agar langsung jalan tanpa menunggu JavaScript
 * (hydration), yang di HP bisa makan beberapa detik.
 */
export function afterOpening(ms: number) {
  return { animationDelay: `calc(var(--opening-delay) + ${ms}ms)` };
}
