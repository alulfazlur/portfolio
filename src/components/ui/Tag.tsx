export function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded border border-slate-900/10 bg-slate-900/[0.025] px-2 py-0.5 font-mono text-xs text-slate-600 dark:border-slate-100/10 dark:bg-slate-100/[0.04] dark:text-slate-300">
      {children}
    </span>
  );
}
