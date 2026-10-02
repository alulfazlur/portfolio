import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { StaggerItem } from "@/components/motion/StaggerItem";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CodeCard } from "@/components/ui/CodeCard";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile } from "@/content/profile";
import { getT } from "@/lib/i18n";

export async function Hero() {
  const t = await getT();
  const stats = t("hero.stats", { returnObjects: true });

  return (
    <section
      id="top"
      aria-label={t("hero.label")}
      className="relative isolate overflow-x-clip"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-48 left-1/4 size-[38rem] rounded-full bg-teal-200/50 blur-3xl dark:bg-teal-500/10" />
        <div className="absolute top-10 -right-40 size-[32rem] rounded-full bg-sky-200/50 blur-3xl dark:bg-sky-500/10" />
        <div className="absolute -bottom-40 -left-24 size-[28rem] rounded-full bg-emerald-100/60 blur-3xl dark:bg-emerald-500/5" />
      </div>

      <Container className="grid gap-16 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-12">
        <Stagger>
          <StaggerItem
            as="p"
            className="mb-7 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-3.5 py-1.5 font-mono text-xs text-slate-700 backdrop-blur sm:rounded-full dark:border-slate-700/60 dark:bg-slate-800/70 dark:text-slate-300"
          >
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full bg-linear-to-r from-accent to-accent-3"
            />
            {profile.role} · {t("profile.location")}
          </StaggerItem>
          <StaggerItem>
            <h1 className="text-5xl font-semibold tracking-tighter text-balance text-slate-900 sm:text-6xl xl:text-7xl dark:text-slate-50">
              {profile.name}{" "}
              <span className="bg-linear-to-r from-accent to-accent-2 bg-clip-text text-transparent dark:from-accent-soft dark:to-accent-2-soft">
                ({profile.nickname})
              </span>
            </h1>
          </StaggerItem>
          <StaggerItem
            as="p"
            className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-slate-600 sm:text-xl dark:text-slate-300"
          >
            {t("profile.tagline")}
          </StaggerItem>
          <StaggerItem className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href="#projects" arrow="right">
              {t("hero.viewProjects")}
            </ButtonLink>
            <ButtonLink href={profile.cvHref} variant="secondary" download>
              {t("hero.downloadCv")}
            </ButtonLink>
            <div className="-ml-2.5 sm:ml-0">
              <SocialLinks />
            </div>
          </StaggerItem>
        </Stagger>

        <Reveal delay={0.2} className="relative lg:pl-6">
          <div className="transition-transform duration-500 ease-out hover:-translate-y-1 lg:rotate-1 lg:hover:rotate-0">
            <CodeCard
              fileName={`${profile.nickname.toLowerCase()}.ts`}
              name={profile.name}
              role={profile.role}
              location={t("profile.location")}
              stack={profile.stack}
            />
          </div>
          {stats.map((stat) => (
            <p
              key={stat.label}
              className="relative mt-4 inline-flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-xl ring-1 shadow-slate-900/10 ring-slate-200 lg:absolute lg:right-4 lg:-bottom-8 lg:mt-0 dark:bg-slate-800 dark:shadow-slate-950/40 dark:ring-slate-700/60"
            >
              <span className="bg-linear-to-r from-accent to-accent-2 bg-clip-text text-4xl font-semibold tracking-tight text-transparent dark:from-accent-soft dark:to-accent-2-soft">
                {stat.value}
              </span>
              <span className="max-w-28 text-sm leading-snug text-slate-600 dark:text-slate-300">
                {stat.label}
              </span>
            </p>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
