import { GraduationCap, Quote } from 'lucide-react';
import { education } from '../../data/education';
import { projects } from '../../data/projects';
import { siteConfig } from '../../data/site';
import { isPlaceholderText } from '../../lib/utils';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

const paragraphs = [
  'I am in the final year of my MCA at Amity University Rajasthan (CGPA 9.61), after finishing a BCA before that. I started out building software, and that is exactly what made me good at testing it: I know where developers cut corners, because I have cut them myself.',
  'I do manual, functional and API testing on platforms I have built and shipped. That means designing test cases, logging and tracking defects in JIRA, validating endpoints in Postman, and writing automated tests with Pytest. For ScamShield, a fintech-security tool that detects UPI and SMS scams, I wrote 430 tests and measured precision, recall and false alarms for each language.',
  'I work with the SDLC, STLC and the bug life cycle in an Agile/Scrum way, and I use MySQL queries to check that the data behind a feature is actually right. I am looking for a Junior QA / Software Tester role where I can keep finding bugs before users do, alongside people who have done it for longer.',
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
              I would rather show you a bug I found and how I proved it than a list of
              tools I have only read about.
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
