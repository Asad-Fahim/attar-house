interface BottleProps {
  color: string;
  size?: number;
  className?: string;
  variant?: 'flask' | 'square' | 'round' | 'tall';
}

export function Bottle({ color, size = 200, className = '', variant = 'flask' }: BottleProps) {
  const id = `b-${color.replace('#', '')}-${variant}`;
  const gradId = `${id}-grad`;
  const shineId = `${id}-shine`;
  const gradUrl = `url(#${gradId})`;
  const shineUrl = `url(#${shineId})`;

  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 200 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Perfume bottle"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.85" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id={shineId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {variant === 'flask' && (
        <>
          <rect x="82" y="8" width="36" height="28" rx="3" fill="#1a1612" />
          <rect x="78" y="32" width="44" height="10" rx="2" fill="#2a241e" />
          <rect x="88" y="40" width="24" height="18" fill={gradUrl} />
          <path
            d="M60 70 Q60 58 72 58 L128 58 Q140 58 140 70 L140 220 Q140 240 120 240 L80 240 Q60 240 60 220 Z"
            fill={gradUrl}
          />
          <path
            d="M70 75 Q70 65 78 65 L92 65 L92 230 L80 230 Q70 230 70 220 Z"
            fill={shineUrl}
          />
          <rect x="78" y="130" width="44" height="60" fill="rgba(255,255,255,0.12)" />
          <line x1="86" y1="145" x2="114" y2="145" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
          <text x="100" y="160" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="6" fontFamily="Georgia, serif" fontStyle="italic">M.L</text>
          <line x1="86" y1="175" x2="114" y2="175" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
        </>
      )}

      {variant === 'square' && (
        <>
          <rect x="80" y="10" width="40" height="24" rx="2" fill="#1a1612" />
          <rect x="92" y="32" width="16" height="14" fill={gradUrl} />
          <rect x="55" y="46" width="90" height="190" rx="4" fill={gradUrl} />
          <rect x="62" y="52" width="20" height="178" rx="2" fill={shineUrl} />
          <rect x="75" y="120" width="50" height="50" fill="rgba(255,255,255,0.1)" />
          <text x="100" y="150" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7" fontFamily="Georgia, serif" fontStyle="italic">M.L</text>
        </>
      )}

      {variant === 'round' && (
        <>
          <rect x="84" y="8" width="32" height="26" rx="3" fill="#1a1612" />
          <rect x="90" y="32" width="20" height="16" fill={gradUrl} />
          <ellipse cx="100" cy="150" rx="70" ry="90" fill={gradUrl} />
          <ellipse cx="78" cy="120" rx="14" ry="40" fill={shineUrl} />
          <ellipse cx="100" cy="150" rx="40" ry="40" fill="rgba(255,255,255,0.08)" />
          <text x="100" y="158" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="Georgia, serif" fontStyle="italic">M.L</text>
        </>
      )}

      {variant === 'tall' && (
        <>
          <rect x="86" y="6" width="28" height="30" rx="3" fill="#1a1612" />
          <rect x="90" y="34" width="20" height="20" fill={gradUrl} />
          <path
            d="M70 54 L130 54 L130 70 Q135 80 135 100 L135 230 Q135 244 121 244 L79 244 Q65 244 65 230 L65 100 Q65 80 70 70 Z"
            fill={gradUrl}
          />
          <path
            d="M75 60 L88 60 L88 238 L79 238 Q70 238 70 228 L70 105 Q70 82 75 72 Z"
            fill={shineUrl}
          />
          <rect x="80" y="130" width="40" height="70" fill="rgba(255,255,255,0.1)" />
          <line x1="88" y1="145" x2="112" y2="145" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
          <text x="100" y="165" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="Georgia, serif" fontStyle="italic">M.L</text>
          <line x1="88" y1="185" x2="112" y2="185" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
        </>
      )}
    </svg>
  );
}
