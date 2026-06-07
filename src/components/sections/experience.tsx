import { Badge } from '@/components/ui/badge';
import { DATA } from '@/data/resume';

type Job = (typeof DATA.work)[number];

function ExperienceItem({ job }: { job: Job }) {
  return (
    <div>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div>
          <h3 className="font-semibold text-foreground">{job.title}</h3>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-sm text-muted-foreground">
            <a
              href={job.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {job.company}
            </a>
            <span aria-hidden>·</span>
            <span>{job.location}</span>
          </div>
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">
          {job.start} – {job.end}
        </span>
      </div>
      <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
        {job.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {job.technologiesUsed.map((tech) => (
          <Badge key={tech} variant="outline" className="font-normal">
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-20">
      <h2 className="text-balance text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Experience
      </h2>
      <div className="mt-8 flex flex-col gap-10">
        {DATA.work.map((job) => (
          <ExperienceItem key={job.company} job={job} />
        ))}
      </div>
    </section>
  );
}
