import { Calendar, GraduationCap, MapPin } from 'lucide-react';
import { education } from '../../data/education';
import { withoutPlaceholders } from '../../lib/utils';
import { Section } from '../ui/Section';
import { Timeline, TimelineItem } from '../ui/Timeline';

export function Education() {
  if (education.length === 0) return null;

  return (
    <Section
      id="education"
      title="Education"
      subtitle="My academic background in computer applications."
    >
      <Timeline>
        {education.map((item, index) => {
          const coursework = withoutPlaceholders(item.coursework);
          return (
            <TimelineItem
              key={item.degree}
              delay={index * 80}
              active={Boolean(item.current)}
            >
              <div className="card p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-text">{item.degree}</h3>
                    <p className="mt-1 flex items-center gap-2 text-sm font-medium text-accent">
                      <GraduationCap aria-hidden="true" className="h-4 w-4 shrink-0" />
                      {item.institution}
                    </p>
                  </div>
                  {item.current && (
                    <span className="tag !border-accent/30 !bg-accent-soft !text-accent">
                      In progress
                    </span>
                  )}
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
                  {item.grade && <span className="font-mono">{item.grade}</span>}
                </div>

                {item.description && (
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                )}

                {coursework.length > 0 && (
                  <div className="mt-4">
                    <p className="font-mono text-[0.6875rem] tracking-wider text-muted uppercase">
                      Relevant coursework
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {coursework.map((subject) => (
                        <li key={subject} className="tag">
                          {subject}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Section>
  );
}
