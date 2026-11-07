import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { Section } from "@/components/ui/Section";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";
import { getT } from "@/lib/i18n";

/** "https://www.linkedin.com/in/x/" -> "linkedin.com/in/x" */
function displayUrl(href: string): string {
  return href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

const rowClass =
  "group flex min-h-16 items-baseline justify-between gap-4 border-b border-slate-900/10 py-5 transition-colors duration-300 hover:text-primary-700 dark:border-slate-100/10 dark:hover:text-primary-300";

const rowLabel =
  "text-2xl font-light tracking-[-0.03em] transition-transform duration-500 ease-out-expo group-hover:translate-x-2 sm:text-3xl";

const rowArrow =
  "inline-block text-xl transition-transform duration-500 ease-out-expo";

export async function Contact() {
  const t = await getT();
  const profileLinks = socials.filter((social) => social.label !== "Email");

  return (
    <Section
      id="contact"
      index="05"
      title={t("sections.contact")}
      layout="side"
    >
      <Reveal>
        <p className="text-[clamp(2rem,4vw,3.75rem)] leading-[1.05] font-light tracking-[-0.04em] text-balance text-slate-900 dark:text-slate-50">
          {t("contact.heading")}{" "}
          <span className="text-primary-700 italic dark:text-primary-300">
            {t("contact.headingAccent")}
          </span>
        </p>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          {t("profile.contactBlurb")}
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-14 sm:mt-20">
        <p className="font-mono text-[0.8125rem] text-slate-500 lowercase dark:text-slate-400">
          {t("contact.email")} · {t("contact.location")}
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-3 inline-block link-sweep pb-1 text-[clamp(1.6rem,4.8vw,4.5rem)] leading-[1.1] font-light tracking-[-0.045em] break-all text-slate-900 transition-colors duration-300 hover:text-primary-700 sm:break-normal dark:text-slate-50 dark:hover:text-primary-300"
        >
          {profile.email}
        </a>
        <div className="mt-8 grid gap-2.5 min-[360px]:grid-cols-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
          <ButtonLink href={`mailto:${profile.email}`} arrow="right">
            {t("contact.send")}
          </ButtonLink>
          <CopyEmailButton
            email={profile.email}
            label={t("contact.copy")}
            copiedLabel={t("contact.copied")}
          />
        </div>
      </Reveal>

      <Stagger
        as="ul"
        className="mt-16 border-t border-slate-900/10 text-slate-900 sm:mt-24 dark:border-slate-100/10 dark:text-slate-50"
      >
        {profileLinks.map((social) => (
          <StaggerItem as="li" key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={rowClass}
            >
              <span className={rowLabel}>{social.label}</span>
              <span className="flex min-w-0 items-baseline gap-4">
                <span className="hidden truncate font-mono text-xs text-slate-500 sm:inline dark:text-slate-400">
                  {displayUrl(social.href)}
                </span>
                <span
                  aria-hidden="true"
                  className={`${rowArrow} group-hover:translate-x-1 group-hover:-translate-y-1`}
                >
                  ↗
                </span>
              </span>
            </a>
          </StaggerItem>
        ))}
        <StaggerItem as="li">
          <a href={profile.cvHref} download className={rowClass}>
            <span className={rowLabel}>{t("contact.cv")}</span>
            <span className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-slate-500 lowercase dark:text-slate-400">
                {t("contact.cvAction")}
              </span>
              <span
                aria-hidden="true"
                className={`${rowArrow} group-hover:translate-y-1`}
              >
                ↓
              </span>
            </span>
          </a>
        </StaggerItem>
      </Stagger>
    </Section>
  );
}
