import Image from "next/image";
import { education, profile } from "@/lib/data";
import Reveal from "./Reveal";

const stack = [
  "JavaScript / TypeScript",
  "React & React Native",
  "Next.js",
  "Angular",
  "Node.js",
  "AWS Lambda & Azure Functions",
  "GraphQL",
  "Shopify & BigCommerce",
  ".NET Core",
  "Go",
];

export default function About() {
  return (
    <section id="about" className="border-b border-space-line">
      <div className="mx-auto grid max-w-content gap-16 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <p className="section-heading">About</p>
          <h2 className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">
            Business owner and engineer, same person
          </h2>
          <div className="prose-body mt-6 max-w-xl text-[15px] leading-relaxed text-ink-muted">
            <p>{profile.summary}</p>
            <p>{profile.summary2}</p>
          </div>

          <div className="mt-10">
            <p className="section-heading mb-4">Stack</p>
            <ul className="flex flex-wrap gap-2">
              {stack.map((item) => (
                <li
                  key={item}
                  className="border border-space-line px-3 py-1.5 font-mono text-[12px] text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <p className="section-heading mb-4">Certifications</p>
            <ul className="space-y-1 text-sm text-ink">
              {profile.certifications.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="border border-space-line bg-space-surface p-3">
            <div className="flex items-center gap-1.5 pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-space-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-space-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-space-line" />
              <span className="ml-2 font-mono text-[11px] text-ink-dim">
                at-the-desk.jpg
              </span>
            </div>
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src="/images/workspace.png"
                alt="Douglas Soule at his desk, working on a React codebase"
                fill
                sizes="(min-width: 1024px) 32rem, 90vw"
                className="object-cover"
              />
            </div>
          </div>

          <p className="section-heading mt-10">Education</p>
          <ul className="mt-4 space-y-6">
            {education.map((item) => (
              <li key={item.school} className="border-t border-space-line pt-4">
                <p className="font-display text-base font-medium text-ink">{item.school}</p>
                <p className="mt-1 text-sm text-ink-muted">{item.program}</p>
                <p className="mt-1 font-mono text-[11px] text-ink-dim">{item.dates}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
