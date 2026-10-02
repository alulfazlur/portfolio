import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile } from "@/content/profile";
import { getT } from "@/lib/i18n";

export async function Footer() {
  const t = await getT();
  return (
    <footer className="relative pt-8 pb-28">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-teal-400/60 to-transparent"
      />
      <Container className="flex flex-col-reverse items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="flex flex-col gap-1 font-mono text-xs text-slate-500 sm:flex-row sm:gap-1.5 dark:text-slate-400">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span aria-hidden="true" className="hidden sm:inline">
            ·
          </span>
          <span>{t("footer.builtWith")}</span>
        </p>
        <SocialLinks />
      </Container>
    </footer>
  );
}
