// Kartu yang diklik, dipakai ProjectModal sebagai titik awal animasi zoom.
let origin: HTMLElement | null = null;

export function setZoomOrigin(card: HTMLElement) {
  origin = card;
}

/** Diambil sekali: modal yang dibuka tanpa klik kartu (mis. tombol forward) tidak memakai kartu lama. */
export function takeZoomOrigin(): HTMLElement | null {
  const card = origin;
  origin = null;
  return card;
}

/** Kartu asli disembunyikan selama "berubah" menjadi modal (layout-nya tetap). */
export function setCardHidden(card: HTMLElement, hidden: boolean) {
  card.style.visibility = hidden ? "hidden" : "";
}
