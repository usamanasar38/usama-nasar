import type { ExperienceItemType } from '@/components/work-experience';
import { WorkExperience } from '@/components/work-experience';
import { DATA } from '@/data/resume';

const EXPERIENCES: ExperienceItemType[] = DATA.work.map((job, index) => ({
  companyName: job.company,
  companyWebsite: job.href,
  id: job.company,
  isCurrentEmployer: job.end === 'Present',
  positions: [
    {
      description: job.description,
      employmentPeriod: {
        end: job.end === 'Present' ? undefined : job.end,
        start: job.start,
      },
      employmentType: 'Full-time',
      id: '1',
      isExpanded: index === 0,
      skills: [...job.technologiesUsed],
      title: job.title,
    },
  ],
}));

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-20">
      <h2 className="ml-4 py-3 font-heading text-3xl font-semibold tracking-tight">
        Experience
      </h2>
      <WorkExperience className="bg-transparent" experiences={EXPERIENCES} />
    </section>
  );
}
