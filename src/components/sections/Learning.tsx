import { currentlyLearning } from '../../data/learning';
import { getIcon } from '../../lib/icons';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

export function Learning() {
  if (currentlyLearning.length === 0) return null;

  return (
    <Section
      id="learning"
      title="What I am learning right now"
      subtitle="Updated as I go. These are the things currently taking up my evenings."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {currentlyLearning.map((item, index) => {
          const Icon = getIcon(item.icon);
          return (
            <Reveal as="li" key={item.topic} delay={index * 60}>
              <div className="card card-interactive flex h-full gap-4 p-5">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-text">{item.topic}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.note}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
