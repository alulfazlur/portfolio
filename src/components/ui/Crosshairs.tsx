const corners = [
  "-top-[5px] -left-[5px]",
  "-top-[5px] -right-[5px]",
  "-bottom-[5px] -left-[5px]",
  "-bottom-[5px] -right-[5px]",
];

/** Tanda registrasi "+" di keempat sudut blok (seperti gambar teknik). Induknya harus `relative`. */
export function Crosshairs() {
  return (
    <>
      {corners.map((corner) => (
        <span
          key={corner}
          aria-hidden="true"
          className={`pointer-events-none absolute size-[11px] ${corner} before:absolute before:top-1/2 before:left-0 before:h-px before:w-full before:bg-slate-400 after:absolute after:top-0 after:left-1/2 after:h-full after:w-px after:bg-slate-400 dark:before:bg-slate-500 dark:after:bg-slate-500`}
        />
      ))}
    </>
  );
}
