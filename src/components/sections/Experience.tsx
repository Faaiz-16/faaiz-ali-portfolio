import { Award, Briefcase, Calendar, MapPin } from 'lucide-react';
import { experiences } from '../../data/experience';
import { withoutPlaceholders } from '../../lib/utils';
import { ExternalLink } from '../ui/ExternalLink';
import { Section } from '../ui/Section';
import { Timeline, TimelineItem } from '../ui/Timeline';

export function Experience() {
  if (experiences.length === 0) return null;

  return (
    <Section
      id="experience"
      title="Experience"
      subtitle="Where I have worked so far. Short, but real."
      muted
    >
      <Timeline>
        {experiences.map((item, index) => {
          const highlights = withoutPlaceholders(item.highlights);
          return (
            <TimelineItem
              key={`${item.company}-${item.role}`}
              delay={index * 80}
              active={index === 0}
            >
              <div className="card p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-text">{item.role}</h3>
                    <p className="mt-1 flex items-center gap-2 text-sm font-medium text-accent">
                      <Briefcase aria-hidden="true" className="h-4 w-4 shrink-0" />
                      {item.company}
                    </p>
                  </div>
                  {item.type && <span className="tag shrink-0">{item.type}</span>}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                  <span className="flex items-center gap-1.5">
                    <Calendar aria-hidden="true" className="h-3.5 w-3.5" />
                    {item.period}
                  </span>
                  {item.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                      {item.location}
                    </span>
                  )}
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>

                {highlights.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2.5 text-sm text-muted">
                        <span
                          aria-hidden="true"
                          className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-accent"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}

                {item.technologies && item.technologies.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {item.technologies.map((tech) => (
                      <li key={tech} className="tag">
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}

                <ExternalLink
                  href={item.certificateUrl}
                  ariaLabel={`View the certificate for the ${item.role} role at ${item.company}`}
                  className="btn btn-secondary mt-5 !min-h-[2.25rem] !px-3.5 !text-sm"
                >
                  <Award aria-hidden="true" className="h-4 w-4" />
                  View certificate
                </ExternalLink>
              </div>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Section>
  );
}
