import { Star } from 'lucide-react';

interface StarsProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  count?: number;
  className?: string;
}

export function Stars({ rating, size = 14, showValue = false, count, className = '' }: StarsProps) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < full;
          const half = i === full && hasHalf;
          return (
            <span key={i} className="relative inline-block">
              <Star size={size} className="text-ink-300 dark:text-ink-700" strokeWidth={1.2} />
              {(filled || half) && (
                <span className="absolute inset-0 overflow-hidden" style={{ width: half ? '50%' : '100%' }}>
                  <Star size={size} className="text-gold-500 fill-gold-500 dark:text-gold-400 dark:fill-gold-400" strokeWidth={1.2} />
                </span>
              )}
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs text-ink-500 dark:text-ink-400">
          {rating.toFixed(1)}{count != null ? ` (${count})` : ''}
        </span>
      )}
    </div>
  );
}
