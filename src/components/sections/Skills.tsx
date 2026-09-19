import { skillCategories } from '../../data/skills';
import type { SkillLevel } from '../../data/types';
import { getIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';
import { EmptyState } from '../ui/EmptyState';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

/* Level → dot colour. A written label always accompanies the dot, so no
   information is carried by colour alone. */
const levelStyles: Record<SkillLevel, string> = {
  Learning: 'bg-muted/50',
  Familiar: 'bg-accent/40',
  'Working knowledge': 'bg-accent/70',
  Comfortable: 'bg-accent',
};

const legend: Array<{ level: SkillLevel; meaning: string }> = [
  { level: 'Comfortable', meaning: 'I use it regularly and can work without help' },
  { level: 'Working knowledge', meaning: 'I have built things with it' },
  { level: 'Familiar', meaning: 'I have used it, but not extensively' },
  { level: 'Learning', meaning: 'Actively studying it right now' },
];

export function Skills() {
  if (skillCategories.length === 0) {
    return (
      <Section id="skills" eyebrow="02 / Skills" title="Technical skills">
        <EmptyState
          title="No skills listed yet"
          description="Add them in src/data/skills.ts."
        />
      </Section>
    );
  }

  return (
    <Section
      id="skills"
      title="Technical skills"
      subtitle="What I work with, described honestly rather than scored out of ten."
      muted
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => {
          const Icon = getIcon(category.icon);
          return (
            <Reveal as="li" key={category.name} delay={index * 60}>
              <div className="card card-interactive h-full p-5">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-semibold text-text">{category.name}</h3>
                </div>

                {category.description && (
                  <p className="mt-3 text-sm leading-snug text-muted">
                    {category.description}
                  </p>
                )}

                <ul className="mt-4 space-y-1.5">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-surface-2"
                    >
                      <span className="font-mono text-sm text-text">{skill.name}</span>
                      {skill.level && (
                        <span className="flex shrink-0 items-center gap-1.5 text-[0.6875rem] text-muted">
                          <span
                            aria-hidden="true"
                            className={cn('h-2 w-2 rounded-full', levelStyles[skill.level])}
                          />
                          {skill.level}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </ul>

      <Reveal delay={120}>
        <dl className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted">
          {legend.map(({ level, meaning }) => (
            <div key={level} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={cn('h-2 w-2 shrink-0 rounded-full', levelStyles[level])}
              />
              <dt className="font-medium text-text">{level}</dt>
              <dd>~ {meaning}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
