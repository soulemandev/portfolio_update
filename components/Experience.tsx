import { experience } from "@/lib/data";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="border-b border-space-line">
      <div className="mx-auto max-w-content px-6 py-20 sm:px-10 sm:py-28">
        <Reveal className="mb-14 max-w-xl">
          <p className="section-heading">Experience</p>
          <h2 className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">
            Where the work happened
          </h2>
        </Reveal>

        <ol className="relative border-l border-space-line pl-8 sm:pl-10">
          {experience.map((job, i) => (
            <Reveal
              as="li"
              key={`${job.company}-${job.dates}`}
              delay={Math.min(i, 4) * 60}
              className="relative pb-14 last:pb-0"
            >
              <span
                className="absolute -left-[calc(2rem+5px+4px)] top-1 h-[17px] w-[17px] rounded-full bg-amber/10 sm:-left-[calc(2.5rem+5px+4px)]"
                aria-hidden="true"
              />
              <span
                className="absolute -left-[calc(2rem+5px)] top-1.5 h-[9px] w-[9px] animate-pulse-ring rounded-full bg-amber sm:-left-[calc(2.5rem+5px)]"
                aria-hidden="true"
              />
              <p className="font-mono text-xs text-ink-dim">{job.dates}</p>
              <h3 className="mt-2 font-display text-xl font-medium text-ink sm:text-2xl">
                {job.title}
              </h3>
              <p className="mt-1 text-sm text-amber">
                {job.company} <span className="text-ink-muted">· {job.location}</span>
              </p>
              <ul className="prose-body mt-4 max-w-2xl space-y-2 text-[15px] leading-relaxed text-ink-muted">
                {job.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-space-line" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
