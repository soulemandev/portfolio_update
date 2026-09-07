import Image from "next/image";
import { profile } from "@/lib/data";
import StarField from "./StarField";
import Reveal from "./Reveal";
import { MailIcon } from "./icons";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-space-line">
      <StarField />
      <div className="relative z-10 mx-auto grid max-w-content gap-14 px-6 pb-20 pt-16 sm:px-10 sm:pb-28 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <p className="section-heading animate-fade-up">
            {profile.role} · {profile.location}
          </p>

          <h1 className="mt-6 max-w-3xl animate-fade-up font-display text-4xl font-medium leading-[1.08] text-ink [animation-delay:80ms] sm:text-6xl">
            Eight years turning client requirements into shipped, scalable
            <span className="text-amber"> web products.</span>
          </h1>

          <p className="prose-body mt-7 max-w-xl animate-fade-up text-[15px] leading-relaxed text-ink-muted [animation-delay:160ms] sm:text-base">
            <span>
              Full stack engineer and owner of Astronauts and Aliens
              Technology Consulting. Recent work includes evaluating
              AI-generated JavaScript and building a platform that unifies a
              gamer&apos;s stats across every platform in one place.
            </span>
          </p>

          <div className="mt-10 flex animate-fade-up flex-wrap items-center gap-4 [animation-delay:240ms]">
            <a
              href="#work"
              className="rounded-none border border-amber bg-amber px-5 py-2.5 font-mono text-[13px] font-medium text-space-bg transition-colors hover:bg-transparent hover:text-amber"
            >
              View the work
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center gap-2.5 border border-space-line py-1.5 pl-1.5 pr-5 font-mono text-[13px] text-ink transition-colors hover:border-amber hover:text-amber"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-space-line bg-space-surface text-ink-muted transition-colors group-hover:border-amber group-hover:text-amber">
                <MailIcon className="h-3.5 w-3.5" />
              </span>
              {profile.email}
            </a>
          </div>

          <dl className="mt-16 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-space-line pt-8 sm:grid-cols-3">
            <div>
              <dt className="section-heading">Based in</dt>
              <dd className="mt-1 text-sm text-ink">{profile.location}</dd>
            </div>
            <div>
              <dt className="section-heading">Focus</dt>
              <dd className="mt-1 text-sm text-ink">JavaScript, React, Next.js</dd>
            </div>
            <div>
              <dt className="section-heading">Notable clients</dt>
              <dd className="mt-1 text-sm text-ink">PGA Tour, NFL, Modere</dd>
            </div>
          </dl>
        </div>

        <Reveal delay={120} className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative border border-space-line bg-space-surface p-3">
            <div className="flex items-center gap-1.5 pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-space-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-space-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-space-line" />
              <span className="ml-2 font-mono text-[11px] text-ink-dim">
                douglas-soule.jpg
              </span>
            </div>
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/images/profile-photo.png"
                alt="Douglas Soule standing in an office, with a city skyline behind him"
                fill
                priority
                sizes="(min-width: 1024px) 32rem, 90vw"
                className="object-cover object-top grayscale-[15%]"
              />
            </div>
          </div>
          <span
            className="absolute -bottom-3 -right-3 h-16 w-16 border border-amber/40"
            aria-hidden="true"
          />
        </Reveal>
      </div>
    </section>
  );
}
