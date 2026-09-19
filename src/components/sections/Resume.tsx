import { FileText } from 'lucide-react';
import { siteConfig } from '../../data/site';
import { isUsableLink } from '../../lib/utils';
import { Reveal } from '../ui/Reveal';
import { ResumeButtons } from '../ui/ResumeButtons';

export function Resume() {
  if (!isUsableLink(siteConfig.resume)) return null;

  return (
    <section
      id="resume"
      aria-labelledby="resume-heading"
      className="section !py-10 md:!py-14"
    >
      <div className="container-content">
        <Reveal>
          <div className="card relative overflow-hidden p-6 sm:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.07] to-transparent"
            />
            <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent"
                >
                  <FileText className="h-6 w-6" />
                </span>
                <div>
                  <h2
                    id="resume-heading"
                    className="text-xl font-bold text-text sm:text-2xl"
                  >
                    Prefer a one-page version?
                  </h2>
                  <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted">
                    My full resume covers the same ground in a format you can drop straight
                    into your process.
                  </p>
                </div>
              </div>

              <ResumeButtons className="shrink-0" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
