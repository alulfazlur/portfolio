import { Container } from "@/components/ui/Container";
import { profile } from "@/content/profile";
import { getT } from "@/lib/i18n";

export async function Footer() {
  const t = await getT();
  return (
    <footer className="relative overflow-hidden pt-10">
      <Container>
        <p className="flex flex-col gap-1 border-t border-slate-900/10 pt-4 font-mono text-xs text-slate-500 sm:flex-row sm:justify-between dark:border-slate-100/10 dark:text-slate-400">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>{t("footer.builtWith")}</span>
        </p>
      </Container>
      {/* Wordmark dekoratif, sengaja terpotong di tepi bawah halaman. */}
      <p
        aria-hidden="true"
        className="mt-6 -mb-[0.2em] text-center font-display text-[clamp(7rem,40vw,42rem)] leading-[0.8] font-light tracking-[-0.07em] text-slate-200 select-none dark:text-slate-800"
      >
        {profile.nickname.toLowerCase()}
      </p>
    </footer>
  );
}
