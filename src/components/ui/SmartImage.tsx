import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { cn, isUsableLink } from '../../lib/utils';

interface SmartImageProps {
  src?: string;
  /** Required whenever an image is shown — it is what screen readers announce. */
  alt: string;
  className?: string;
  /** Wrapper classes, e.g. aspect ratio and rounding. */
  wrapperClassName?: string;
  /** Use 'eager' for above-the-fold images such as the profile photo. */
  loading?: 'lazy' | 'eager';
  /** Shown inside the fallback block. */
  fallbackLabel?: string;
}

export function SmartImage({
  src,
  alt,
  className,
  wrapperClassName,
  loading = 'lazy',
  fallbackLabel,
}: SmartImageProps) {
  const [hasFailed, setHasFailed] = useState(false);
  const showFallback = !isUsableLink(src) || hasFailed;

  if (showFallback) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-2 bg-surface-2 text-muted',
          wrapperClassName,
        )}
        role="img"
        aria-label={alt}
      >
        <ImageOff aria-hidden="true" className="h-6 w-6 opacity-50" />
        {fallbackLabel && (
          <span className="px-4 text-center font-mono text-xs opacity-70">
            {fallbackLabel}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn('overflow-hidden bg-surface-2', wrapperClassName)}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onError={() => setHasFailed(true)}
        className={cn('h-full w-full object-cover', className)}
      />
    </div>
  );
}
