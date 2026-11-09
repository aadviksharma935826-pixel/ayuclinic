import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const TridoshaLogo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  showText = true 
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const titleSizes = {
    sm: 'text-base font-bold',
    md: 'text-xl font-bold',
    lg: 'text-2xl font-extrabold',
    xl: 'text-3xl font-extrabold',
  };

  const subtitleSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs',
    xl: 'text-sm',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative ${iconSizes[size]} flex-shrink-0 flex items-center justify-center`}>
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm transition-transform duration-300 hover:rotate-6"
        >
          {/* Subtle Outer Sacred Trinity Arc */}
          <circle cx="50" cy="50" r="46" stroke="#c49a45" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" />
          
          {/* Tridosha Harmonizing Rings */}
          {/* Vata Arc (Upper Left - Air/Ether) */}
          <path 
            d="M 50 8 A 42 42 0 0 1 86 50" 
            stroke="#6366f1" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            opacity="0.85"
          />
          {/* Pitta Arc (Upper Right/Bottom - Fire/Water) */}
          <path 
            d="M 86 50 A 42 42 0 0 1 30 87" 
            stroke="#ea580c" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            opacity="0.85"
          />
          {/* Kapha Arc (Bottom Left - Earth/Water) */}
          <path 
            d="M 30 87 A 42 42 0 0 1 50 8" 
            stroke="#059669" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            opacity="0.85"
          />

          {/* Golden Amrita Kalasha (Dhanvantari Sacred Pot) Base */}
          <path 
            d="M 35 68 C 35 76 65 76 65 68 L 60 52 C 57 48 43 48 40 52 Z" 
            fill="url(#goldGradient)" 
            stroke="#996515" 
            strokeWidth="1"
          />

          {/* Central Sacred Bilva / Ayurvedic Leaf */}
          <path 
            d="M 50 20 C 34 32 32 50 50 62 C 68 50 66 32 50 20 Z" 
            fill="url(#leafGradient)" 
            stroke="#1c4d36" 
            strokeWidth="1.5"
          />

          {/* Leaf Central Vein (Sushumna / Nadi line) */}
          <path 
            d="M 50 22 L 50 60" 
            stroke="#fcfaf5" 
            strokeWidth="1.2" 
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Subtle Sun / Fire Bindu at Top */}
          <circle cx="50" cy="18" r="3" fill="#d4af37" />

          {/* Definitions for Gradients */}
          <defs>
            <linearGradient id="goldGradient" x1="35" y1="52" x2="65" y2="76" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f5e6ca" />
              <stop offset="0.5" stopColor="#d4af37" />
              <stop offset="1" stopColor="#996515" />
            </linearGradient>
            <linearGradient id="leafGradient" x1="50" y1="20" x2="50" y2="62" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2d6a4f" />
              <stop offset="1" stopColor="#153a27" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span className={`tracking-wider text-ayur-deep font-serif uppercase ${titleSizes[size]}`}>
              Ayu<span className="text-ayur-accent">Clinic</span>
            </span>
            <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest bg-ayur-deep text-ayur-gold rounded">
              AI
            </span>
          </div>
          <span className={`text-ayur-muted font-medium tracking-tight ${subtitleSizes[size]}`}>
            Classical Ayurvedic Clinical Assessment & CDSS
          </span>
        </div>
      )}
    </div>
  );
};
