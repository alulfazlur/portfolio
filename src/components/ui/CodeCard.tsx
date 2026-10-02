import type { ReactNode } from "react";
import { Stagger } from "@/components/motion/Stagger";
import { StaggerItem } from "@/components/motion/StaggerItem";

type CodeCardProps = {
  fileName: string;
  name: string;
  role: string;
  location: string;
  stack: string[];
};

const k = (text: string) => <span className="text-sky-300">{text}</span>;
const str = (text: string) => (
  <span className="text-emerald-300">&quot;{text}&quot;</span>
);
const p = (text: string) => <span className="text-slate-400">{text}</span>;

function Line({
  children,
  indent = false,
}: {
  children: ReactNode;
  indent?: boolean;
}) {
  return (
    <StaggerItem as="span" className={`block ${indent ? "pl-5" : ""}`}>
      {children}
    </StaggerItem>
  );
}

/** Profil singkat dalam gaya file TypeScript. Dekoratif: info yang sama ada di teks hero. */
export function CodeCard({
  fileName,
  name,
  role,
  location,
  stack,
}: CodeCardProps) {
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
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-7 sm:p-6 sm:text-sm">
        <code>
          <Stagger as="span" className="block">
            <Line>
              <span className="text-indigo-300">export const</span>{" "}
              {k("engineer")} {p("= {")}
            </Line>
            <Line indent>
              {k("name")}
              {p(": ")}
              {str(name)}
              {p(",")}
            </Line>
            <Line indent>
              {k("role")}
              {p(": ")}
              {str(role)}
              {p(",")}
            </Line>
            <Line indent>
              {k("location")}
              {p(": ")}
              {str(location)}
              {p(",")}
            </Line>
            <Line indent>
              {k("stack")}
              {p(": [")}
            </Line>
            {stack.map((item) => (
              <Line key={item} indent>
                <span className="pl-5">
                  {str(item)}
                  {p(",")}
                </span>
              </Line>
            ))}
            <Line indent>{p("],")}</Line>
            <Line>{p("};")}</Line>
          </Stagger>
        </code>
      </pre>
    </div>
  );
}
