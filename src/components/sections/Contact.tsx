import { mdiFileDownloadOutline, mdiMapMarkerOutline } from "@mdi/js";
import { Nudge } from "@/components/motion/Nudge";
import { Pressable } from "@/components/motion/Pressable";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { tones } from "@/components/ui/tones";
import { profile } from "@/content/profile";
import { socials } from "@/content/socials";
import type { AccentColor, Social } from "@/content/types";
import { getT } from "@/lib/i18n";

const socialTones: Record<Social["label"], AccentColor> = {
  GitHub: "indigo",
  LinkedIn: "sky",
  X: "teal",
  Instagram: "rose",
  Email: "teal",
};

/** "https://www.linkedin.com/in/x/" -> "linkedin.com/in/x" */
function displayUrl(href: string): string {
  return href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

const cardClass =
  "group flex h-full items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-[border-color] duration-500 ease-out dark:border-slate-700/60 dark:bg-slate-800";

export async function Contact() {
  const t = await getT();
  const profileLinks = socials.filter((social) => social.label !== "Email");

  return (
    <Section
      id="contact"
      index="05"
      title={t("sections.contact")}
      tone="indigo"
      layout="side"
      glow="right"
    >
      <Reveal>
        <p className="text-3xl font-semibold tracking-tight text-balance text-slate-900 sm:text-5xl dark:text-slate-50">
          {t("contact.heading")}{" "}
          <span className="bg-linear-to-r from-primary-700 to-secondary-700 bg-clip-text text-transparent dark:from-primary-300 dark:to-secondary-300">
            {t("contact.headingAccent")}
          </span>
        </p>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          {t("profile.contactBlurb")}
        </p>
        <p className="mt-4 inline-flex items-center gap-2 font-mono text-sm text-slate-500 dark:text-slate-400">
          <Icon
            path={mdiMapMarkerOutline}
            className="size-4 text-primary-600 dark:text-primary-300"
          />
          {t("contact.location")}
        </p>
      </Reveal>

      <Stagger as="ul" className="mt-12 grid gap-4 *:min-w-0 sm:grid-cols-3">
        <StaggerItem
          as="li"
          className="relative overflow-hidden rounded-3xl border border-primary-200/70 bg-linear-to-br from-primary-50 via-white to-secondary-50 p-5 sm:col-span-3 sm:p-6 sm:p-8 dark:border-primary-400/20 dark:from-primary-400/10 dark:via-slate-800 dark:to-secondary-400/10"
        >
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex size-10 items-center justify-center rounded-xl ${tones.teal.iconBox}`}
            >
              <SocialIcon label="Email" />
            </span>
            <span className="font-mono text-xs tracking-wide text-primary-700 uppercase dark:text-primary-300">
              {t("contact.email")}
            </span>
          </div>
          <a
            href={`mailto:${profile.email}`}
            className="mt-5 block text-xl font-semibold tracking-tight break-all text-slate-900 underline decoration-primary-300 decoration-2 underline-offset-8 transition-colors duration-300 hover:decoration-primary-600 min-[400px]:text-2xl sm:text-4xl dark:text-slate-50 dark:decoration-primary-400/40 dark:hover:decoration-primary-300"
          >
            {profile.email}
          </a>
          <div className="mt-7 grid gap-2.5 min-[360px]:grid-cols-2 sm:mt-8 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
            <ButtonLink href={`mailto:${profile.email}`} arrow="right">
              {t("contact.send")}
            </ButtonLink>
            <CopyEmailButton
              email={profile.email}
              label={t("contact.copy")}
              copiedLabel={t("contact.copied")}
            />
          </div>
        </StaggerItem>

        {profileLinks.map((social) => {
          const tone = tones[socialTones[social.label]];
          return (
            <StaggerItem as="li" key={social.label}>
              <Pressable preset="card" className="h-full">
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cardClass} ${tone.card}`}
                >
                  <span
                    className={`inline-flex size-11 shrink-0 items-center justify-center rounded-xl ${tone.iconBox}`}
                  >
                    <SocialIcon label={social.label} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900 dark:text-slate-50">
                      {social.label}
                    </p>
                    <p className="mt-1 truncate font-mono text-xs text-slate-500 dark:text-slate-400">
                      {displayUrl(social.href)}
                    </p>
                  </div>
                  <span className={`shrink-0 ${tone.text}`}>
                    <Nudge direction="up-right">↗</Nudge>
                  </span>
                </a>
              </Pressable>
            </StaggerItem>
          );
        })}

        <StaggerItem as="li">
          <Pressable preset="card" className="h-full">
            <a
              href={profile.cvHref}
              download
              className={`${cardClass} ${tones.amber.card}`}
            >
              <span
                className={`inline-flex size-11 shrink-0 items-center justify-center rounded-xl ${tones.amber.iconBox}`}
              >
                <Icon path={mdiFileDownloadOutline} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900 dark:text-slate-50">
                  {t("contact.cv")}
                </p>
                <p className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-400">
                  {t("contact.cvAction")}
                </p>
              </div>
              <span className={`shrink-0 ${tones.amber.text}`}>
                <Nudge direction="down">↓</Nudge>
              </span>
            </a>
          </Pressable>
        </StaggerItem>
      </Stagger>
    </Section>
  );
}
