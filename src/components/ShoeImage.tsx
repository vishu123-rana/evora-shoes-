import React, { useState, useEffect, useRef } from 'react';
import sneakersImgFallback from '../assets/images/evora_premium_sneakers_advertisement.png';
import runnerImgFallback from '../assets/images/regenerated_image_1791177634545.png';
import sandalsImgFallback from '../assets/images/evora_mens_sandals_comfort_in_every_step.png';
import walkingCategoryImg from '../assets/images/gemini_generated_image_r5rvafr5rvafr5rv.png';

const walkingImgFallback = walkingCategoryImg;

interface ShoeImageProps {
  src: string;
  alt: string;
  className?: string;
  category?: string;
  colorHex?: string;
  priority?: boolean;
}

export const ShoeImage: React.FC<ShoeImageProps> = ({
  src,
  alt,
  className = '',
  category = 'Sneakers',
  colorHex = '#27272a',
  priority = false,
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Determine appropriate high-res fallback asset based on category
  const getCategoryFallback = () => {
    const cat = category?.toLowerCase() || '';
    if (cat.includes('walk')) return walkingImgFallback;
    if (cat.includes('sandal')) return sandalsImgFallback;
    if (cat.includes('run') || cat.includes('sport')) return runnerImgFallback;
    return sneakersImgFallback;
  };

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [imgSrc]);

  const handleError = () => {
    const fallback = getCategoryFallback();
    if (imgSrc !== fallback) {
      // First attempt fallback to bundled high-res category image
      setImgSrc(fallback);
      setIsLoaded(false);
    } else {
      // If even fallback fails, use vector silhouette
      setHasError(true);
    }
  };

  // If the image fails completely, render clean vector silhouette
  const renderSvgSilhouette = () => {
    const isRetroHigh = category?.toLowerCase().includes('retro') || category?.toLowerCase().includes('high') || category?.toLowerCase().includes('jordan') || alt?.toLowerCase().includes('retro') || alt?.toLowerCase().includes('high');
    const isBoot = !isRetroHigh && category?.toLowerCase().includes('boot');
    const isFormal = !isRetroHigh && (category?.toLowerCase().includes('formal') || category?.toLowerCase().includes('loafer'));
    const isSandal = !isRetroHigh && category?.toLowerCase().includes('sandal');
    const isRunner = !isRetroHigh && (category?.toLowerCase().includes('running') || category?.toLowerCase().includes('sports') || category?.toLowerCase().includes('walking'));

    return (
      <div 
        className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#F5FAF6] to-[#E8F3EB] relative overflow-hidden select-none"
        aria-label={alt}
      >
        <div className="absolute w-44 h-14 bg-[#183C2B]/[0.05] rounded-full blur-md bottom-8 transform -skew-x-12" />

        <div className="relative z-10 w-full max-w-[240px] flex items-center justify-center">
          {isRetroHigh ? (
            <svg viewBox="0 0 320 220" className="w-full h-auto drop-shadow-xl">
              {/* High Top Ankle Collar - Black */}
              <path d="M 65 75 C 65 40 100 25 145 35 C 160 38 170 58 165 90 L 130 100 L 65 85 Z" fill="#18181B" />
              {/* Ankle Collar Overlay - Primary Color */}
              <path d="M 58 85 C 58 60 85 45 138 55 C 152 58 160 78 152 102 L 110 118 L 58 100 Z" fill={colorHex} stroke="#991B1B" strokeWidth="1.5" />
              {/* Rear Heel Counter - Primary Color */}
              <path d="M 42 110 C 38 90 58 82 90 102 L 88 175 C 65 178 45 165 40 138 Z" fill={colorHex} />
              {/* Quarter Panel - Clean White */}
              <path d="M 88 105 L 165 115 L 172 175 L 86 175 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
              {/* Eyestay Panel - Black */}
              <path d="M 125 88 L 205 135 L 190 168 L 150 120 Z" fill="#18181B" />
              {/* White Laces */}
              <line x1="135" y1="96" x2="150" y2="108" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              <line x1="148" y1="108" x2="165" y2="120" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              <line x1="160" y1="120" x2="180" y2="132" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              <line x1="172" y1="132" x2="192" y2="144" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              {/* Swoosh Side Sweep - Black */}
              <path d="M 82 130 C 112 134 168 138 205 95 C 198 130 148 162 115 164 C 92 165 78 150 82 130 Z" fill="#111111" />
              {/* Perforated Toe Box - White */}
              <path d="M 190 145 L 285 162 C 295 170 295 180 285 185 L 185 182 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
              {/* Front Mudguard - Primary Color */}
              <path d="M 205 168 L 290 174 C 302 180 298 190 280 192 L 200 188 Z" fill={colorHex} stroke="#991B1B" strokeWidth="1" />
              {/* Stitched White Midsole */}
              <path d="M 36 175 L 298 184 C 302 195 288 200 245 200 L 38 198 C 34 198 32 188 36 175 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
              {/* Outsole - Primary Color */}
              <path d="M 38 198 L 288 200 C 285 208 260 210 230 210 L 40 206 C 35 206 35 202 38 198 Z" fill={colorHex} />
            </svg>
          ) : isBoot ? (
            <svg viewBox="0 0 300 200" className="w-full h-auto drop-shadow-md">
              <path
                d="M 50 140 C 50 110 70 70 85 45 C 90 35 120 35 130 45 L 135 100 C 150 95 180 95 210 115 C 235 130 255 135 260 145 C 265 155 240 160 210 160 L 55 160 Z"
                fill={colorHex}
                opacity="0.88"
              />
              <path d="M 50 160 L 265 160 C 265 172 250 178 200 178 L 60 178 C 50 178 50 170 50 160 Z" fill="#1C1917" />
              <line x1="90" y1="55" x2="120" y2="65" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
              <line x1="95" y1="75" x2="125" y2="85" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
              <line x1="100" y1="95" x2="130" y2="105" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
              <text x="170" y="145" fill="#FFFFFF" fontSize="9" fontWeight="700" letterSpacing="2" opacity="0.45">EVORA</text>
            </svg>
          ) : isFormal ? (
            <svg viewBox="0 0 300 180" className="w-full h-auto drop-shadow-md">
              <path
                d="M 40 120 C 40 90 80 85 110 80 C 145 75 190 85 225 105 C 255 120 270 125 270 135 C 270 145 240 150 180 150 L 45 150 Z"
                fill={colorHex}
                opacity="0.9"
              />
              <path d="M 40 150 L 90 150 L 90 162 L 40 162 Z" fill="#18181B" />
              <path d="M 100 150 L 270 150 C 270 158 250 160 200 160 L 100 155 Z" fill="#27272A" />
              <path d="M 70 100 Q 150 95 230 118" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.4" />
              <text x="140" y="130" fill="#FFFFFF" fontSize="8" fontWeight="700" letterSpacing="2" opacity="0.5">EVORA CRAFT</text>
            </svg>
          ) : isSandal ? (
            <svg viewBox="0 0 300 180" className="w-full h-auto drop-shadow-sm">
              <path d="M 45 140 C 45 135 150 135 265 140 C 265 155 245 160 150 160 C 50 160 45 155 45 140 Z" fill="#292524" />
              <path d="M 70 140 C 70 100 110 100 120 140" stroke={colorHex} strokeWidth="14" strokeLinecap="round" fill="none" />
              <path d="M 170 140 C 170 105 220 105 230 140" stroke={colorHex} strokeWidth="14" strokeLinecap="round" fill="none" />
              <text x="135" y="152" fill="#FFFFFF" fontSize="8" fontWeight="700" letterSpacing="1.5" opacity="0.7">EVORA</text>
            </svg>
          ) : isRunner ? (
            <svg viewBox="0 0 300 180" className="w-full h-auto drop-shadow-lg">
              <path
                d="M 45 125 C 45 95 75 75 110 70 C 135 67 165 80 195 100 C 235 115 265 118 275 128 C 280 136 260 142 220 142 L 50 142 Z"
                fill={colorHex}
                opacity="0.9"
              />
              <path
                d="M 38 140 C 70 138 150 138 230 140 C 265 142 285 140 282 154 C 275 164 240 166 180 162 C 120 160 60 165 40 158 C 34 153 34 144 38 140 Z"
                fill="#F8FAFC"
                stroke="#E2E8F0"
                strokeWidth="1.5"
              />
              <path d="M 50 156 C 120 158 200 156 265 152" stroke="#E11D48" strokeWidth="2.5" fill="none" />
              <path d="M 100 75 L 145 98" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
              <path d="M 115 82 L 155 104" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
              <circle cx="175" cy="115" r="3" fill="#FFFFFF" opacity="0.6" />
              <text x="75" y="118" fill="#FFFFFF" fontSize="8" fontWeight="700" letterSpacing="2" opacity="0.6">EVORA AIR</text>
            </svg>
          ) : (
            <svg viewBox="0 0 300 180" className="w-full h-auto drop-shadow-md">
              <path
                d="M 45 128 C 45 96 75 80 115 78 C 145 78 180 92 215 110 C 248 122 268 126 270 134 C 270 142 250 146 200 146 L 50 146 Z"
                fill={colorHex}
                opacity="0.92"
              />
              <path
                d="M 42 144 L 272 144 C 274 155 260 158 220 158 L 50 158 C 42 158 40 152 42 144 Z"
                fill="#FAFAFA"
                stroke="#E4E4E7"
                strokeWidth="1"
              />
              <path d="M 45 115 C 45 100 65 95 72 110 L 70 130 L 45 130 Z" fill="#18181B" opacity="0.4" />
              <line x1="120" y1="88" x2="155" y2="108" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
              <line x1="130" y1="96" x2="165" y2="116" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
              <text x="185" y="135" fill="#FFFFFF" fontSize="7" fontWeight="800" letterSpacing="1.5" opacity="0.6">EVORA</text>
            </svg>
          )}
        </div>

        <div className="absolute top-3 left-3 text-[10px] tracking-wider uppercase text-[#587064] font-medium">
          EVORA · {category}
        </div>
      </div>
    );
  };

  return (
    <div className={`relative overflow-hidden bg-[#F5FAF6] ${className}`}>
      {hasError ? (
        renderSvgSilhouette()
      ) : (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 bg-[#E8F3EB] flex items-center justify-center">
              <span className="text-xs uppercase tracking-widest text-[#A8D5BA] font-semibold">EVORA</span>
            </div>
          )}

          <img
            ref={imgRef}
            src={imgSrc}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            referrerPolicy="no-referrer"
            onError={handleError}
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover object-center ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </>
      )}
    </div>
  );
};
