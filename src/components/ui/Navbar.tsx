import Link from "next/link";
import { profile } from "@/content/profile";
import { getLocale, getT } from "@/lib/i18n";
import { Container } from "./Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import type { NavId } from "./NavIcon";
import { CommandBar } from "./CommandBar";
import { ThemeToggle } from "./ThemeToggle";

export async function Navbar() {
  const t = await getT();
  const locale = await getLocale();
  const homeHref = `/${locale}`;
  const ids: NavId[] = ["about", "skills", "experience", "projects", "contact"];
  const items = ids.map((id) => ({ id, label: t(`nav.${id}`) }));
  const languages = t("languages", { returnObjects: true });

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-50 focus:rounded-[2px] focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white dark:focus:bg-slate-50 dark:focus:text-slate-900"
      >
        {t("nav.skipToContent")}
      </a>

      <header className="sticky top-0 z-40 border-b border-slate-900/10 bg-slate-50/85 backdrop-blur-md md:hidden dark:border-slate-100/10 dark:bg-slate-900/85">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link
            href={homeHref}
            aria-label={profile.name}
            className="inline-flex size-10 overflow-hidden rounded-[2px]"
          >
            <Logo className="size-full" gradientId="logo-gradient-topbar" />
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher
              current={locale}
              label={t("nav.language")}
              languages={languages}
            />
            <ThemeToggle label={t("nav.theme")} />
          </div>
        </Container>
      </header>

      <CommandBar
        homeHref={homeHref}
        label={t("nav.label")}
        logoLabel={profile.name}
        items={items}
        controls={
          <>
            <LanguageSwitcher
              current={locale}
              label={t("nav.language")}
              languages={languages}
            />
            <ThemeToggle label={t("nav.theme")} />
          </>
        }
      />
    </>
  );
}
