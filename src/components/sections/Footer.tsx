import { Container } from "@/components/ui/Container";
import { profile } from "@/content/profile";
import { getT } from "@/lib/i18n";

export async function Footer() {
  const t = await getT();
  return (
    <footer className="relative pt-8 pb-28">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary-400/60 to-transparent"
      />
      <Container>
        <p className="flex flex-col items-center gap-1 text-center font-mono text-xs text-slate-500 sm:flex-row sm:justify-center sm:gap-1.5 dark:text-slate-400">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span aria-hidden="true" className="hidden sm:inline">
            ·
          </span>
          <span>{t("footer.builtWith")}</span>
        </p>
      </Container>
    </footer>
  );
}
