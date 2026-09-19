import { GraduationCap, Quote } from 'lucide-react';
import { education } from '../../data/education';
import { projects } from '../../data/projects';
import { siteConfig } from '../../data/site';
import { isPlaceholderText } from '../../lib/utils';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

const paragraphs = [
  'I am in the final year of my MCA at Amity University Rajasthan, after finishing a BCA before that. Most of what I know has come from building things and then finding out what I got wrong, which is still how I prefer to learn.',
  'My main language is Python, and I use it for backend work, automation and small tools. Alongside that I work with Java and SQL, and I am gradually moving from writing standalone scripts to building full applications: a frontend, an API behind it and a database underneath.',
  'Right now I am focused on getting properly good at the fundamentals by writing readable code, using Git the way a team would, and understanding how an application actually runs once it leaves my laptop. I am looking for a role where I can do that alongside people who have done it for longer.',
];

export function About() {
  const currentDegree = education.find((entry) => entry.current);

  const facts = siteConfig.facts.filter(
    (fact) => !isPlaceholderText(fact.value) && !isPlaceholderText(fact.detail),
  );

  return (
    <Section
      id="about"
      title="A bit about me"
      subtitle="No buzzwords ~ just where I am and what I am working towards."
    >
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
        <Reveal className="space-y-5">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="text-base leading-relaxed text-muted"
            >
              {paragraph}
            </p>
          ))}

          <blockquote className="mt-8 flex gap-3 rounded-card border-l-2 border-accent bg-surface-2/60 py-4 pr-5 pl-4">
            <Quote aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent" />
            <p className="text-sm leading-relaxed text-muted italic">
              I would rather show you a project I can explain line by line than a list of
              technologies I have only read about.
            </p>
          </blockquote>
        </Reveal>

        <Reveal delay={100}>
          <dl className="grid grid-cols-2 gap-3">
            {facts.map((fact) => (
              <div key={fact.label} className="card p-4">
                <dt className="font-mono text-[0.6875rem] tracking-wider text-muted uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-xl font-bold text-text">{fact.value}</dd>
                <dd className="mt-0.5 text-xs leading-snug text-muted">{fact.detail}</dd>
              </div>
            ))}

            <div className="card p-4">
              <dt className="font-mono text-[0.6875rem] tracking-wider text-muted uppercase">
                Projects
              </dt>
              <dd className="mt-1.5 text-xl font-bold text-text">{projects.length}</dd>
              <dd className="mt-0.5 text-xs leading-snug text-muted">
                Listed on this site
              </dd>
            </div>
          </dl>

          {currentDegree && (
            <div className="card mt-3 flex items-start gap-3 p-4">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent"
              >
                <GraduationCap className="h-[18px] w-[18px]" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-text">{currentDegree.degree}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {currentDegree.institution} · {currentDegree.period}
                </p>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
