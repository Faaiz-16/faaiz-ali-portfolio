import { BadgeCheck, CircleDashed, ExternalLink as ExternalIcon } from 'lucide-react';
import { certifications } from '../../data/certifications';
import { cn, isPlaceholderText, isUsableLink } from '../../lib/utils';
import { ExternalLink } from '../ui/ExternalLink';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { SmartImage } from '../ui/SmartImage';

export function Certifications() {
  if (certifications.length === 0) return null;

  return (
    <Section
      id="certifications"
      title="Certifications & courses"
      subtitle="Courses I have completed, and the ones I am still working through, labelled honestly."
      muted
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((certification, index) => {
          const isCompleted = certification.status === 'completed';
          const StatusIcon = isCompleted ? BadgeCheck : CircleDashed;
          const hasImage = isUsableLink(certification.image);

          return (
            <Reveal as="li" key={certification.name} delay={index * 70}>
              <div className="card card-interactive flex h-full flex-col overflow-hidden">
                {hasImage && (
                  <SmartImage
                    src={certification.image}
                    alt={`${certification.name} certificate from ${certification.issuer}`}
                    wrapperClassName="aspect-16/10 border-b border-border"
                  />
                )}

                <div className="flex flex-1 flex-col p-5">
                  {/* Status: icon + text, so colour is never the only signal. */}
                  <span
                    className={cn(
                      'tag self-start',
                      isCompleted
                        ? '!border-accent/30 !bg-accent-soft !text-accent'
                        : undefined,
                    )}
                  >
                    <StatusIcon aria-hidden="true" className="h-3 w-3" />
                    {isCompleted ? 'Completed' : 'In progress'}
                  </span>

                  <h3 className="mt-3 text-base leading-snug font-semibold text-text">
                    {certification.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{certification.issuer}</p>

                  {certification.date && (
                    <p className="mt-1 font-mono text-xs text-muted">
                      {certification.date}
                    </p>
                  )}

                  {certification.summary && !isPlaceholderText(certification.summary) && (
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {certification.summary}
                    </p>
                  )}

                  <div className="mt-auto pt-4">
                    {certification.credentialId &&
                      !isPlaceholderText(certification.credentialId) && (
                        <p className="font-mono text-[0.6875rem] break-all text-muted">
                          ID: {certification.credentialId}
                        </p>
                      )}

                    <ExternalLink
                      href={certification.credentialUrl}
                      ariaLabel={`Verify the ${certification.name} credential`}
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                    >
                      Verify credential
                      <ExternalIcon aria-hidden="true" className="h-3.5 w-3.5" />
                    </ExternalLink>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
