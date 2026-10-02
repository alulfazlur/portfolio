export function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 px-2.5 py-1 font-mono text-xs text-slate-600 dark:border-slate-700/60 dark:text-slate-400">
      {children}
    </span>
  );
}
