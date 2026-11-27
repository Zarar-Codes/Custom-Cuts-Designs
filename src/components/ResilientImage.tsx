import { useState } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  fallbackLabel?: string;
}

export function ResilientImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = 'relative overflow-hidden bg-[#303431]',
  loading = 'lazy',
  fetchPriority = 'auto',
  fallbackLabel,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={containerClassName}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding={loading === 'eager' ? 'sync' : 'async'}
          fetchPriority={fetchPriority}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className={className}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="w-full h-full min-h-[220px] flex flex-col items-center justify-center gap-3 p-6 text-center bg-gradient-to-br from-[#202322] via-[#303431] to-[#3B2A22] text-[#E9E2D7]"
        >
          <Layers className="w-6 h-6 text-[#A65335]" aria-hidden="true" />
          <p className="text-sm font-medium tracking-tight max-w-xs">
            {fallbackLabel || alt}
          </p>
        </div>
      )}
    </div>
  );
}
