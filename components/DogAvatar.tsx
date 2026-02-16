import React, { useMemo } from 'react';

interface DogAvatarProps {
  mascotId: string;
  className?: string;
}

// Darkened 3D Color Palettes for better visibility
const PALETTES = [
  { name: 'golden', base: '#D97706', dark: '#92400E', light: '#F59E0B', snout: '#FDE68A' }, // Golden
  { name: 'brown', base: '#78350F', dark: '#451A03', light: '#92400E', snout: '#D6D3D1' }, // Brown
  { name: 'black', base: '#1F2937', dark: '#111827', light: '#374151', snout: '#4B5563' }, // Black/Grey
  { name: 'white', base: '#94A3B8', dark: '#475569', light: '#CBD5E1', snout: '#F1F5F9' }, // White
  { name: 'red', base: '#DC2626', dark: '#991B1B', light: '#EF4444', snout: '#FECACA' }, // Red
];

// Accessories colors
const COLLARS = ['#DC2626', '#2563EB', '#059669', '#D97706', '#7C3AED'];

export const DogAvatar: React.FC<DogAvatarProps> = ({ mascotId, className = "w-full h-full" }) => {
  const features = useMemo(() => {
    // Robust safety check: Ensure mascotId exists and is a string
    if (!mascotId || typeof mascotId !== 'string') {
       return {
        palette: PALETTES[0],
        type: 0,
        collarColor: COLLARS[0],
        hasSpot: false,
        eyeType: 0,
        animationDelay: 0
      };
    }

    let hash = 0;
    for (let i = 0; i < mascotId.length; i++) {
      hash = mascotId.charCodeAt(i) + ((hash << 5) - hash);
    }
    const safeHash = Math.abs(hash);
    
    return {
      palette: PALETTES[safeHash % PALETTES.length],
      type: safeHash % 3, // 0: Floppy, 1: Pointy, 2: Round
      collarColor: COLLARS[safeHash % COLLARS.length],
      hasSpot: (safeHash % 2) === 0,
      eyeType: (safeHash % 2), // 0: Open, 1: Happy
      animationDelay: (safeHash % 20) * 0.2 // Stagger animations for multiple dogs
    };
  }, [mascotId]);

  const { palette, type, collarColor, hasSpot, animationDelay } = features;

  const gradId = `grad-${mascotId ? mascotId.replace(/[^a-zA-Z0-9-]/g, '') : 'default'}`;
  
  return (
    <div className={`${className} flex items-center justify-center drop-shadow-xl`}>
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" style={{ filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.2))' }}>
        <defs>
          <radialGradient id={`${gradId}-head`} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor={palette.light} />
            <stop offset="100%" stopColor={palette.base} />
          </radialGradient>
          
          <linearGradient id={`${gradId}-ear`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={palette.base} />
            <stop offset="100%" stopColor={palette.dark} />
          </linearGradient>

          <radialGradient id={`${gradId}-snout`} cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor={palette.snout} />
          </radialGradient>

          <radialGradient id={`${gradId}-nose`} cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#444" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
        </defs>

        {/* Global Head Bob Animation */}
        <g className="animate-head-bob origin-bottom" style={{ animationDelay: `${animationDelay}s` }}>
          
          {/* Ear Wiggle Animations */}
          <g className="animate-ear-wiggle origin-center" style={{ animationDelay: `${animationDelay + 0.5}s` }}>
            {type === 1 && (
              <g>
                <path d="M 20,40 L 10,10 L 40,25 Z" fill={`url(#${gradId}-ear)`} stroke={palette.dark} strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M 80,40 L 90,10 L 60,25 Z" fill={`url(#${gradId}-ear)`} stroke={palette.dark} strokeWidth="1.5" strokeLinejoin="round" />
              </g>
            )}
            {type === 0 && (
              <g>
                  <path d="M 15,40 Q 5,45 5,60 Q 5,75 20,70" fill={`url(#${gradId}-ear)`} stroke={palette.dark} strokeWidth="1" />
                  <path d="M 85,40 Q 95,45 95,60 Q 95,75 80,70" fill={`url(#${gradId}-ear)`} stroke={palette.dark} strokeWidth="1" />
              </g>
            )}
            {type === 2 && (
              <g>
                  <circle cx="20" cy="30" r="10" fill={`url(#${gradId}-ear)`} />
                  <circle cx="80" cy="30" r="10" fill={`url(#${gradId}-ear)`} />
              </g>
            )}
          </g>

          {/* Main Head Shape */}
          {type === 0 && (
             <rect x="15" y="15" width="70" height="70" rx="35" fill={`url(#${gradId}-head)`} />
          )}
          {type === 1 && (
             <ellipse cx="50" cy="55" rx="35" ry="38" fill={`url(#${gradId}-head)`} />
          )}
          {type === 2 && (
             <rect x="18" y="25" width="64" height="60" rx="20" fill={`url(#${gradId}-head)`} />
          )}

          {hasSpot && (
             <circle cx="70" cy="35" r="15" fill={palette.dark} opacity="0.3" />
          )}

          {/* Snout and Mouth */}
          <ellipse cx="50" cy="62" rx={type === 2 ? 18 : 22} ry={type === 2 ? 14 : 16} fill={`url(#${gradId}-snout)`} />
          <ellipse cx="50" cy="58" rx="8" ry="6" fill={`url(#${gradId}-nose)`} />
          <ellipse cx="48" cy="56" rx="2" ry="1" fill="white" opacity="0.8" />

          <path d="M 50,64 L 50,70" stroke="#222" strokeWidth="2" strokeLinecap="round" />
          <path d="M 44,70 Q 50,75 56,70" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round" />
          
          {/* Tongue (Animation Removed) */}
          <path d="M 47,72 Q 50,78 53,72" fill="#F43F5E" />

          {/* Eye Blink Animation */}
          <g className="animate-blink origin-center" style={{ animationDelay: `${animationDelay + 1.2}s` }}>
            <circle cx="35" cy="48" r="8" fill="white" />
            <circle cx="65" cy="48" r="8" fill="white" />
            <circle cx="35" cy="48" r="4.5" fill="#000" />
            <circle cx="65" cy="48" r="4.5" fill="#000" />
            <circle cx="37" cy="46" r="2" fill="white" />
            <circle cx="67" cy="46" r="2" fill="white" />
          </g>

          <path d="M 25,80 Q 50,95 75,80" stroke={collarColor} strokeWidth="7" strokeLinecap="round" fill="none" />
          <circle cx="50" cy="88" r="5" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
          <text x="50" y="90" fontSize="4" textAnchor="middle" fill="#78350F" fontWeight="bold">ID</text>
        </g>

      </svg>
    </div>
  );
};