import { Download, FileText } from 'lucide-react';
import { siteConfig } from '../../data/site';
import { cn, isUsableLink } from '../../lib/utils';

interface ResumeButtonsProps {
  className?: string;
  /** Show only the download button (used in the navbar). */
  compact?: boolean;
}

export function ResumeButtons({ className, compact = false }: ResumeButtonsProps) {
  if (!isUsableLink(siteConfig.resume)) return null;

  /* Slugify the name so the downloaded file is called e.g. Faaiz-Ali-Resume.pdf */
  const downloadName = `${siteConfig.name.replace(/\s+/g, '-')}-Resume.pdf`;

  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      <a
        href={siteConfig.resume}
        download={downloadName}
        className="btn btn-primary"
        aria-label={`Download ${siteConfig.name}'s resume as a PDF`}
      >
        <Download aria-hidden="true" className="h-4 w-4" />
        Download resume
      </a>
      {!compact && (
        <a
          href={siteConfig.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
          aria-label="Open the resume in a new tab"
        >
          <FileText aria-hidden="true" className="h-4 w-4" />
          View in browser
        </a>
      )}
    </div>
  );
}
