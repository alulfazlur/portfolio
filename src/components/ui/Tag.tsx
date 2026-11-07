export function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-[2px] border border-current/20 px-2 py-0.5 font-mono text-[0.6875rem] tracking-[0.04em] uppercase opacity-80">
      {children}
    </span>
  );
}
