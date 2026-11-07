import { Container } from "@/components/ui/Container";
import { profile } from "@/content/profile";
import { getT } from "@/lib/i18n";

export async function Footer() {
  const t = await getT();
  return (
    <footer className="relative overflow-hidden pt-10">
      <Container>
        <p className="flex flex-col gap-1 border-t border-slate-900/15 pt-4 font-mono text-xs tracking-[0.06em] text-slate-500 uppercase sm:flex-row sm:justify-between dark:border-slate-100/15 dark:text-slate-400">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>{t("footer.builtWith")}</span>
        </p>
      </Container>
      {/* Wordmark dekoratif, sengaja terpotong di tepi bawah halaman. */}
      <p
        aria-hidden="true"
        className="mt-6 -mb-[0.2em] text-center font-display text-[clamp(7rem,38vw,40rem)] leading-[0.8] font-semibold tracking-[-0.07em] text-slate-900 font-stretch-expanded select-none dark:text-slate-50"
      >
        {profile.nickname}
        <span className="text-primary-600 dark:text-primary-400">.</span>
      </p>
    </footer>
  );
}
