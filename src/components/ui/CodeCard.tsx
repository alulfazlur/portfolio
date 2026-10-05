import {
  TypedCode,
  type CodeLine,
  type CodeToken,
} from "@/components/motion/TypedCode";

type CodeCardProps = {
  fileName: string;
  nickname: string;
  location: string;
  stack: string[];
};

const kw = (text: string): CodeToken => ({
  text,
  className: "text-indigo-300",
});
const k = (text: string): CodeToken => ({ text, className: "text-sky-300" });
const str = (text: string): CodeToken => ({
  text: `"${text}"`,
  className: "text-emerald-300",
});
const p = (text: string): CodeToken => ({ text, className: "text-slate-400" });

/** Baris `key: "value",` di dalam objek. */
const field = (key: string, value: string): CodeLine => ({
  indent: 1,
  tokens: [k(key), p(": "), str(value), p(",")],
});

/** Profil singkat dalam gaya file TypeScript. Dekoratif: info yang sama ada di teks hero. */
export function CodeCard({
  fileName,
  nickname,
  location,
  stack,
}: CodeCardProps) {
  const lines: CodeLine[] = [
    {
      indent: 0,
      tokens: [kw("export const"), p(" "), k("engineer"), p(" = {")],
    },
    field("nickname", nickname),
    { ...field("location", location) },
    { indent: 1, tokens: [k("stack"), p(": [")] },
    ...stack.map((item): CodeLine => ({
      indent: 2,
      tokens: [str(item), p(",")],
    })),
    { indent: 1, tokens: [p("],")] },
    { indent: 0, tokens: [p("};")] },
  ];

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-2xl bg-slate-900 shadow-2xl ring-1 shadow-slate-900/20 ring-slate-900/10 dark:bg-slate-950/70 dark:shadow-slate-950/50 dark:ring-slate-700/60"
    >
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
        <span className="size-3 rounded-full bg-rose-400/70" />
        <span className="size-3 rounded-full bg-amber-300/70" />
        <span className="size-3 rounded-full bg-emerald-400/70" />
        <span className="ml-3 rounded-md bg-white/5 px-2.5 py-1 font-mono text-xs text-slate-400">
          {fileName}
        </span>
      </div>
      <pre className="p-5 font-mono text-[13px] leading-7 break-words whitespace-pre-wrap sm:p-6 sm:text-sm">
        <TypedCode lines={lines} />
      </pre>
    </div>
  );
}
