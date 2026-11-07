import { afterOpening } from "@/components/motion/afterOpening";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Crosshairs } from "@/components/ui/Crosshairs";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile } from "@/content/profile";
import { getT } from "@/lib/i18n";

const nameWords = profile.name.split(" ");

export async function Hero() {
  const t = await getT();
  const facts = t("profile.facts", { returnObjects: true });
  // Lembar spesifikasi singkat: semua label & nilai dari copy/data yang sudah ada.
  const spec = [
    { label: t("caseStudy.role"), value: profile.role },
    { label: facts.location.label, value: t("contact.location") },
    { label: facts.experience.label, value: facts.experience.value },
    { label: t("experience.stack"), value: profile.stack.join(" · ") },
  ];

  return (
    <section
      id="top"
      aria-label={t("hero.label")}
      className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-x-clip md:min-h-svh"
    >
      <Container className="flex flex-1 flex-col justify-center gap-12 pt-10 pb-24 sm:gap-16 sm:pt-16 sm:pb-32">
        <h1 className="font-display text-[clamp(3.5rem,17vw,13.5rem)] leading-[0.88] font-light tracking-[-0.055em] text-slate-900 sm:text-[clamp(4rem,13vw,13.5rem)] dark:text-slate-50">
          <span className="sr-only">
            {profile.name} ({profile.nickname})
          </span>
          <span aria-hidden="true" className="flex flex-col">
            {nameWords.map((word, wordIndex) => (
              <span
                key={word}
                className={`block whitespace-nowrap ${
                  wordIndex % 2 === 0 ? "drift-left" : "drift-right pl-[12vw]"
                }`}
              >
                <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
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
                {wordIndex === 0 && (
                  <span
                    style={afterOpening(500)}
                    className="ml-[0.2em] inline-block animate-fade-up align-top font-mono text-[max(0.75rem,0.11em)] tracking-normal text-primary-700 motion-reduce:animate-none dark:text-primary-300"
                  >
                    ({profile.nickname.toLowerCase()})
                  </span>
                )}
              </span>
            ))}
          </span>
        </h1>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-6">
            {/* Di mobile tanpa fade: tagline sudah ter-render sejak paint pertama (di balik opening),
                jadi elemen LCP yang cepat. Mulai sm tetap fade-up. */}
            <p
              style={afterOpening(450)}
              className="max-w-xl text-xl leading-snug font-light tracking-[-0.01em] text-pretty text-slate-700 motion-reduce:animate-none sm:animate-fade-up sm:text-2xl dark:text-slate-300"
            >
              {t("profile.tagline")}
            </p>
            <div
              className="mt-8 flex animate-fade-up flex-wrap items-center gap-3 motion-reduce:animate-none"
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

          <div
            style={afterOpening(600)}
            className="relative animate-fade-up border border-slate-900/10 bg-slate-50/70 backdrop-blur-sm motion-reduce:animate-none lg:col-span-5 lg:col-start-8 dark:border-slate-100/10 dark:bg-slate-900/60"
          >
            <Crosshairs />
            <dl className="divide-y divide-slate-900/8 font-mono text-[0.8125rem] dark:divide-slate-100/8">
              {spec.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 px-4 py-3"
                >
                  <dt className="text-slate-500 lowercase dark:text-slate-400">
                    {row.label}
                  </dt>
                  <dd className="text-slate-800 dark:text-slate-200">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
