import { afterOpening } from "@/components/motion/afterOpening";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile } from "@/content/profile";
import { getT } from "@/lib/i18n";

const nameWords = profile.name.split(" ");

export async function Hero() {
  const t = await getT();
  const stats = t("hero.stats", { returnObjects: true });

  return (
    <section
      id="top"
      aria-label={t("hero.label")}
      className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-x-clip md:min-h-svh"
    >
      <Container className="flex flex-1 flex-col justify-between gap-10 pt-6 pb-24 sm:pt-10 sm:pb-32">
        {/* Baris meta seperti kepala lembar ledger. */}
        <ul
          style={afterOpening(500)}
          className="grid animate-fade-up grid-cols-2 gap-x-6 gap-y-2 border-b border-slate-900/15 pb-4 font-mono text-xs tracking-[0.08em] text-slate-600 uppercase motion-reduce:animate-none sm:grid-cols-3 dark:border-slate-100/15 dark:text-slate-400"
        >
          <li className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
            <span
              aria-hidden="true"
              className="size-2 shrink-0 bg-primary-600 dark:bg-primary-400"
            />
            {profile.role}
          </li>
          <li className="text-right sm:text-center">{t("contact.location")}</li>
          {stats.map((stat) => (
            <li key={stat.label} className="hidden text-right sm:block">
              {stat.value} {stat.label}
            </li>
          ))}
        </ul>

        <h1 className="font-display text-[clamp(3.25rem,17vw,21rem)] leading-[0.82] font-semibold tracking-[-0.055em] text-slate-900 font-stretch-expanded sm:text-[clamp(4rem,19vw,21rem)] dark:text-slate-50">
          <span className="sr-only">
            {profile.name} ({profile.nickname})
          </span>
          <span aria-hidden="true" className="flex flex-col">
            {nameWords.map((word, wordIndex) => (
              <span
                key={word}
                className={`block whitespace-nowrap ${
                  wordIndex % 2 === 0
                    ? "drift-left"
                    : "drift-right self-end text-right"
                }`}
              >
                <span className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                  {[...word].map((letter, letterIndex) => (
                    <span
                      key={letterIndex}
                      className="inline-block animate-rise motion-reduce:animate-none"
                      style={afterOpening(
                        (nameWords.slice(0, wordIndex).join("").length +
                          letterIndex) *
                          35,
                      )}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
                {wordIndex === nameWords.length - 1 && (
                  <span className="text-primary-600 dark:text-primary-400">
                    .
                  </span>
                )}
              </span>
            ))}
          </span>
        </h1>

        <div className="grid gap-8 border-t border-slate-900/15 pt-6 lg:grid-cols-12 lg:items-end lg:gap-6 dark:border-slate-100/15">
          {/* Di mobile tanpa fade: tagline sudah ter-render sejak paint pertama (di balik opening),
              jadi elemen LCP yang cepat. Mulai sm tetap fade-up. */}
          <p
            style={afterOpening(450)}
            className="max-w-xl text-xl leading-snug tracking-[-0.01em] text-pretty text-slate-700 motion-reduce:animate-none sm:animate-fade-up sm:text-2xl lg:col-span-6 dark:text-slate-300"
          >
            <span className="font-serif text-[1.15em] text-slate-900 italic dark:text-slate-50">
              {profile.nickname}
            </span>{" "}
            — {t("profile.tagline")}
          </p>
          <div
            className="flex animate-fade-up flex-wrap items-center gap-3 motion-reduce:animate-none lg:col-span-6 lg:justify-end"
            style={afterOpening(550)}
          >
            <ButtonLink href="#projects" arrow="right">
              {t("hero.viewProjects")}
            </ButtonLink>
            <ButtonLink href={profile.cvHref} variant="secondary" download>
              {t("hero.downloadCv")}
            </ButtonLink>
            <SocialLinks />
          </div>
        </div>
      </Container>
    </section>
  );
}
