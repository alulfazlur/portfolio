import { Nudge } from "@/components/motion/Nudge";
import { Pressable } from "@/components/motion/Pressable";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
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
  "group flex h-full flex-col justify-between gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-[border-color] duration-500 ease-out dark:border-slate-700/60 dark:bg-slate-800";

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
          <span className="bg-linear-to-r from-accent to-accent-2 bg-clip-text text-transparent dark:from-accent-soft dark:to-accent-2-soft">
            {t("contact.headingAccent")}
          </span>
        </p>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          {t("profile.contactBlurb")}
        </p>
        <p className="mt-4 inline-flex items-center gap-2 font-mono text-sm text-slate-500 dark:text-slate-400">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-4 text-teal-600 dark:text-teal-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 10c0 5-8 12-8 12s-8-7-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {t("contact.location")}
        </p>
      </Reveal>

      <Stagger as="ul" className="mt-12 grid gap-4 sm:grid-cols-3">
        <StaggerItem
          as="li"
          className="relative overflow-hidden rounded-3xl border border-teal-200/70 bg-linear-to-br from-teal-50 via-white to-sky-50 p-6 sm:col-span-3 sm:p-8 dark:border-teal-400/20 dark:from-teal-400/10 dark:via-slate-800 dark:to-sky-400/10"
        >
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex size-10 items-center justify-center rounded-xl ${tones.teal.iconBox}`}
            >
              <SocialIcon label="Email" />
            </span>
            <span className="font-mono text-xs tracking-wide text-teal-700 uppercase dark:text-teal-300">
              {t("contact.email")}
            </span>
          </div>
          <a
            href={`mailto:${profile.email}`}
            className="mt-5 block text-2xl font-semibold tracking-tight break-all text-slate-900 underline decoration-teal-300 decoration-2 underline-offset-8 transition-colors duration-300 hover:decoration-teal-600 sm:text-4xl dark:text-slate-50 dark:decoration-teal-400/40 dark:hover:decoration-teal-300"
          >
            {profile.email}
          </a>
          <div className="mt-8 flex flex-wrap items-center gap-3">
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
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex size-10 items-center justify-center rounded-xl ${tone.iconBox}`}
                    >
                      <SocialIcon label={social.label} />
                    </span>
                    <span className={tone.text}>
                      <Nudge direction="up-right">↗</Nudge>
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-50">
                      {social.label}
                    </p>
                    <p className="mt-1 truncate font-mono text-xs text-slate-500 dark:text-slate-400">
                      {displayUrl(social.href)}
                    </p>
                  </div>
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
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex size-10 items-center justify-center rounded-xl ${tones.amber.iconBox}`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                    <path d="M14 2v6h6M12 12v6M9 15l3 3 3-3" />
                  </svg>
                </span>
                <span className={tones.amber.text}>
                  <Nudge direction="down">↓</Nudge>
                </span>
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-50">
                  {t("contact.cv")}
                </p>
                <p className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-400">
                  {t("contact.cvAction")}
                </p>
              </div>
            </a>
          </Pressable>
        </StaggerItem>
      </Stagger>
    </Section>
  );
}
