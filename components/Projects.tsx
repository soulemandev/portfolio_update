import { additionalProjects, featuredProjects, type Project } from "@/lib/data";
import Reveal from "./Reveal";

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col border border-space-line bg-space-surface transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-1.5 border-b border-space-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-space-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-space-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-space-line" />
        <span className="ml-3 truncate font-mono text-[11px] text-ink-dim">
          {project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] text-ink-dim">{project.dates}</p>
        <h3 className="mt-2 font-display text-lg font-medium text-ink">{project.name}</h3>
        <p className="prose-body mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
          {project.description}
        </p>
        {project.status && (
          <p className="mt-3 font-mono text-[11px] text-teal">{project.status}</p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border border-space-line px-2 py-1 font-mono text-[10px] text-ink-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="work" className="border-b border-space-line">
      <div className="mx-auto max-w-content px-6 py-20 sm:px-10 sm:py-28">
        <Reveal className="mb-14 max-w-xl">
          <p className="section-heading">Selected work</p>
          <h2 className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">
            Products shipped for teams of one to a global sports league
          </h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.name} delay={Math.min(i, 5) * 70}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <p className="section-heading mb-6">Additional projects</p>
          <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {additionalProjects.map((project) => (
              <div key={project.name} className="border-t border-space-line pt-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="font-display text-base font-medium text-ink">
                    {project.name}
                  </h4>
                  <span className="font-mono text-[11px] text-ink-dim">{project.dates}</span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {project.description}
                </p>
                {project.status && (
                  <p className="mt-1.5 font-mono text-[11px] text-teal">{project.status}</p>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
