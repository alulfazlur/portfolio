import { afterOpening } from "@/components/motion/afterOpening";
import { Tilt } from "@/components/motion/Tilt";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CodeCard } from "@/components/ui/CodeCard";
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
      className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-x-clip md:min-h-svh"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-48 left-1/4 size-[38rem] rounded-full bg-teal-200/50 blur-3xl dark:bg-teal-500/10" />
        <div className="absolute top-10 -right-40 size-[32rem] rounded-full bg-sky-200/50 blur-3xl dark:bg-sky-500/10" />
        <div className="absolute -bottom-40 -left-24 size-[28rem] rounded-full bg-emerald-100/60 blur-3xl dark:bg-emerald-500/5" />
      </div>

      <Container className="grid gap-8 pt-8 pb-20 sm:gap-10 sm:pt-20 sm:pb-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-12">
        <div className="min-w-0">
          <h1 className="text-5xl leading-[0.95] font-semibold tracking-tighter text-balance text-slate-900 sm:text-7xl dark:text-slate-50">
            <span className="sr-only">
              {profile.name} ({profile.nickname})
            </span>
            <span aria-hidden="true">
              {nameWords.map((word, wordIndex) => (
                <span key={word}>
                  <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
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
                  </span>{" "}
                </span>
              ))}
            </span>
          </h1>
          <p
            style={afterOpening(400)}
            className="mt-3 inline-flex max-w-full animate-fade-up items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3.5 py-1.5 font-mono text-sm text-slate-700 backdrop-blur motion-reduce:animate-none dark:border-slate-700/60 dark:bg-slate-800/70 dark:text-slate-300"
          >
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full bg-linear-to-r from-accent to-accent-3"
            />
            {profile.role}
          </p>
          {/* Di mobile tanpa fade: tagline sudah ter-render sejak paint pertama (di balik opening),
              jadi elemen LCP yang cepat. Mulai sm tetap fade-up. */}
          <p
            style={afterOpening(450)}
            className="mt-4 max-w-xl text-lg leading-relaxed text-pretty text-slate-600 motion-reduce:animate-none sm:mt-6 sm:animate-fade-up sm:text-xl dark:text-slate-300"
          >
            {t("profile.tagline")}
          </p>
          <div
            className="mt-6 flex animate-fade-up flex-wrap items-center gap-3 motion-reduce:animate-none sm:mt-10"
            style={afterOpening(550)}
          >
            <ButtonLink href="#projects">{t("hero.viewProjects")}</ButtonLink>
            <ButtonLink href={profile.cvHref} variant="secondary" download>
              {t("hero.downloadCv")}
            </ButtonLink>
            <div className="-ml-2.5 sm:ml-0">
              <SocialLinks />
            </div>
          </div>
        </div>

        <div
          className="relative min-w-0 animate-fade-up motion-reduce:animate-none lg:pl-6"
          style={afterOpening(250)}
        >
          <div className="transition-transform duration-500 ease-out hover:-translate-y-1 lg:rotate-1 lg:hover:rotate-0">
            <Tilt>
              <CodeCard
                fileName="intro.ts"
                nickname={profile.nickname}
                location={t("profile.location")}
                stack={profile.stack}
              />
            </Tilt>
          </div>
          {stats.map((stat) => (
            <p
              key={stat.label}
              className="absolute -top-10 right-3 inline-flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 shadow-slate-900/10 ring-slate-200 sm:top-auto sm:-bottom-8 sm:px-5 sm:py-4 lg:right-4 dark:bg-slate-800 dark:shadow-slate-950/40 dark:ring-slate-700/60"
            >
              <span className="bg-linear-to-r from-accent to-accent-2 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl dark:from-accent-soft dark:to-accent-2-soft">
                {stat.value}
              </span>
              <span className="max-w-28 text-sm leading-snug text-slate-600 dark:text-slate-300">
                {stat.label}
              </span>
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
