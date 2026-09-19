import { useState } from 'react';
import type { FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Mail, MapPin, Send } from 'lucide-react';
import type { AnyIcon } from '../../lib/icons';
import { Github, Linkedin } from '../ui/BrandIcons';
import { siteConfig } from '../../data/site';
import { isUsableLink, mailtoLink } from '../../lib/utils';
import { ExternalLink } from '../ui/ExternalLink';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

/**
 * Public form endpoint (Formspree, Web3Forms, Getform), read at build time.
 * VITE_ variables are bundled into the client JavaScript, so never put a
 * private key here.
 */
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT ?? '';

type FormState = 'idle' | 'sending' | 'sent' | 'error';

export function Contact() {
  const hasEmail = isUsableLink(siteConfig.email);

  /* The right-hand column only has something to show once there is either an
     email address or a form endpoint. Without one, the layout collapses to a
     single column rather than leaving an empty half. */
  const hasRightColumn = Boolean(CONTACT_ENDPOINT) || hasEmail;

  return (
    <Section
      id="contact"
      title="Get in touch"
      subtitle="If you are hiring for a software or Python developer role, or just want to point out something I got wrong on this site, I would like to hear from you."
    >
      <div
        className={
          hasRightColumn ? 'grid gap-5 lg:grid-cols-[0.9fr_1.1fr]' : 'grid max-w-xl gap-5'
        }
      >
        <Reveal className="space-y-3">
          {hasEmail && (
            <ContactCard
              Icon={Mail}
              label="Email"
              value={siteConfig.email}
              href={mailtoLink(siteConfig.email, `Hello ${siteConfig.name}`)}
              newTab={false}
            />
          )}
          {isUsableLink(siteConfig.links.linkedin) && (
            <ContactCard
              Icon={Linkedin}
              label="LinkedIn"
              value="Connect with me"
              href={siteConfig.links.linkedin}
            />
          )}
          {isUsableLink(siteConfig.links.github) && (
            <ContactCard
              Icon={Github}
              label="GitHub"
              value={
                /_HERE/i.test(siteConfig.githubUsername)
                  ? 'See my repositories'
                  : `@${siteConfig.githubUsername}`
              }
              href={siteConfig.links.github}
            />
          )}
          {siteConfig.location && (
            <ContactCard Icon={MapPin} label="Location" value={siteConfig.location} />
          )}

          {!hasEmail && (
            <p className="card p-4 text-sm text-muted">
              No email address configured yet — add one to{' '}
              <code className="font-mono text-accent">src/data/site.ts</code>.
            </p>
          )}
        </Reveal>

        {hasRightColumn && (
          <Reveal delay={100}>
            {CONTACT_ENDPOINT ? <ContactForm endpoint={CONTACT_ENDPOINT} /> : <EmailCta />}
          </Reveal>
        )}
      </div>
    </Section>
  );
}

interface ContactCardProps {
  Icon: AnyIcon;
  label: string;
  value: string;
  href?: string;
  newTab?: boolean;
}

function ContactCard({ Icon, label, value, href, newTab = true }: ContactCardProps) {
  const body = (
    <>
      <span
        aria-hidden="true"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent"
      >
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[0.6875rem] tracking-wider text-muted uppercase">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-sm font-medium text-text">{value}</span>
      </span>
    </>
  );

  if (!isUsableLink(href)) {
    return <div className="card flex items-center gap-3.5 p-4">{body}</div>;
  }

  return (
    <ExternalLink
      href={href}
      newTab={newTab}
      ariaLabel={`${label}: ${value}`}
      className="card card-interactive flex items-center gap-3.5 p-4"
    >
      {body}
    </ExternalLink>
  );
}

/** Shown when an email is configured but no form service is. */
function EmailCta() {
  return (
    <div className="card flex h-full flex-col justify-center gap-5 p-6 text-center sm:p-10">
      <div>
        <h3 className="text-xl font-bold text-text">The quickest way to reach me</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
          Email goes straight to me and I read everything. I usually reply within a day or
          two.
        </p>
      </div>
      <a
        href={mailtoLink(siteConfig.email, `Hello ${siteConfig.name}`)}
        className="btn btn-primary mx-auto"
      >
        <Mail aria-hidden="true" className="h-4 w-4" />
        Send me an email
      </a>
      <p className="font-mono text-xs break-all text-muted">{siteConfig.email}</p>
    </div>
  );
}

/** Shown only when VITE_CONTACT_ENDPOINT is set. */
function ContactForm({ endpoint }: { endpoint: string }) {
  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    /* Honeypot: real people leave this hidden field empty; bots fill it in.
       We pretend the send succeeded so the bot does not retry. */
    if (data.get('company')) {
      setState('sent');
      form.reset();
      return;
    }

    setState('sending');
    setErrorMessage('');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });

      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

      setState('sent');
      form.reset();
    } catch {
      setState('error');
      setErrorMessage(
        'The message could not be sent. Please email me directly instead — the address is on the left.',
      );
    }
  }

  if (state === 'sent') {
    return (
      <div className="card flex h-full flex-col items-center justify-center gap-3 p-10 text-center">
        <CheckCircle2 aria-hidden="true" className="h-10 w-10 text-accent" />
        <h3 className="text-lg font-semibold text-text">Message sent</h3>
        <p className="max-w-xs text-sm text-muted">
          Thanks for getting in touch — I will reply as soon as I can.
        </p>
        <button
          type="button"
          onClick={() => setState('idle')}
          className="btn btn-secondary mt-1"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-6" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Your name" type="text" autoComplete="name" />
        <Field id="email" label="Your email" type="email" autoComplete="email" />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-text">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-y rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-text transition-colors placeholder:text-muted/60 focus:border-accent focus:outline-none"
          placeholder="What role are you hiring for?"
        />
      </div>

      {/* Honeypot — hidden from people and from screen readers. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="company">Company (leave this empty)</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state === 'error' && (
        <p
          role="alert"
          className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="btn btn-primary w-full disabled:opacity-60"
      >
        {state === 'sending' ? (
          <>
            <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send aria-hidden="true" className="h-4 w-4" />
            Send message
          </>
        )}
      </button>

      <p aria-live="polite" className="sr-only">
        {state === 'sending' ? 'Sending your message' : ''}
      </p>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  type: string;
  autoComplete?: string;
}

function Field({ id, label, type, autoComplete }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-text">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-text transition-colors placeholder:text-muted/60 focus:border-accent focus:outline-none"
      />
    </div>
  );
}
