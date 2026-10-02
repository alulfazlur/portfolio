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
      <Container className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} {profile.name} · {t("footer.builtWith")}
        </p>
        <SocialLinks />
      </Container>
    </footer>
  );
}
