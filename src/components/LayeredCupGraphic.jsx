import React, { useState } from 'react';

export default function LayeredCupGraphic({ ingredients, isIced = false, size = 'default' }) {
  const [activeLayer, setActiveLayer] = useState(null);

  const base = ingredients?.base;
  const milk = ingredients?.milk;
  const flavour = ingredients?.flavour;
  const topping = ingredients?.topping;

  const hasMilk = milk && milk.id !== 'no_milk_water';
  const baseColor = base?.visualColor || '#382216';
  const milkColor = hasMilk ? (milk?.visualColor || '#F3EBD8') : 'transparent';
  const toppingColor = topping?.visualColor || '#B85D32';

  // Sizing variants
  const dims = size === 'large' 
    ? { width: 280, height: 320, scale: 1.2 }
    : size === 'compact'
    ? { width: 180, height: 210, scale: 0.8 }
    : { width: 220, height: 260, scale: 1.0 };

  return (
    <div className="relative flex flex-col items-center justify-center select-none group">
      {/* Steam Wisps (for hot drinks) */}
      {!isIced && (
        <div className="flex items-center justify-center gap-4 h-10 -mb-2 overflow-visible">
          <div className="w-1.5 h-8 bg-gradient-to-t from-[#B45309]/30 to-transparent rounded-full animate-steam"></div>
          <div className="w-2 h-10 bg-gradient-to-t from-[#B45309]/40 to-transparent rounded-full animate-steam-delayed"></div>
          <div className="w-1.5 h-7 bg-gradient-to-t from-[#B45309]/30 to-transparent rounded-full animate-steam"></div>
        </div>
      )}

      {/* Iced Condensation drops badge */}
      {isIced && (
        <div className="h-8 flex items-center justify-center -mb-2">
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100/80 text-blue-800 font-semibold tracking-wide border border-blue-200">
            🧊 Chilled over ice
          </span>
        </div>
      )}

      {/* SVG Cup Render */}
      <svg
        width={dims.width}
        height={dims.height}
        viewBox="0 0 240 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-105 filter drop-shadow-xl"
      >
        <defs>
          {/* Glass Gradient */}
          <linearGradient id="glassWall" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="15%" stopColor="#FFFFFF" stopOpacity="0.15" />
            <stop offset="85%" stopColor="#FFFFFF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.35" />
          </linearGradient>

          {/* Liquid Base Gradient */}
          <linearGradient id="baseLiquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={baseColor} stopOpacity="0.95" />
            <stop offset="100%" stopColor={baseColor} stopOpacity="1" />
          </linearGradient>

          {/* Milk Blended Gradient */}
          <linearGradient id="milkBlendGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={milkColor} stopOpacity="0.95" />
            <stop offset="100%" stopColor={baseColor} stopOpacity="0.85" />
          </linearGradient>

          {/* Cup Rim Highlight */}
          <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#E2D4C3" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.8" />
          </linearGradient>

          {/* Clip path for liquid inside cup */}
          <clipPath id="cupInnerClip">
            <path d="M 44 48 L 56 220 C 58 244 80 254 120 254 C 160 254 182 244 184 220 L 196 48 Z" />
          </clipPath>
        </defs>

        {/* Ambient Saucer Shadow */}
        <ellipse cx="120" cy="265" rx="90" ry="12" fill="#2E180E" fillOpacity="0.12" />

        {/* Ceramic / Glass Saucer */}
        <ellipse cx="120" cy="260" rx="82" ry="9" fill="#F4EDE4" stroke="#DAC8B6" strokeWidth="2.5" />
        <ellipse cx="120" cy="258" rx="55" ry="5" fill="#E8DBCB" fillOpacity="0.6" />

        {/* Mug Handle */}
        <path
          d="M 186 85 C 228 85 234 165 180 185"
          fill="none"
          stroke="#E5D6C5"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          d="M 186 85 C 224 85 230 165 180 185"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />

        {/* Liquid Container with Clip */}
        <g clipPath="url(#cupInnerClip)">
          {/* Base Coffee Layer */}
          <rect
            x="30"
            y={hasMilk ? "140" : "60"}
            width="180"
            height="130"
            fill="url(#baseLiquidGrad)"
            className="cursor-pointer transition-opacity hover:opacity-90"
            onMouseEnter={() => setActiveLayer('base')}
            onMouseLeave={() => setActiveLayer(null)}
          />

          {/* Milk Layer (if milk chosen) */}
          {hasMilk && (
            <rect
              x="30"
              y="60"
              width="180"
              height="90"
              fill="url(#milkBlendGrad)"
              className="cursor-pointer transition-opacity hover:opacity-90"
              onMouseEnter={() => setActiveLayer('milk')}
              onMouseLeave={() => setActiveLayer(null)}
            />
          )}

          {/* Flavour Swirl Effect */}
          {flavour && (
            <g opacity="0.35">
              <path
                d="M 60 150 Q 90 120 120 160 T 180 140"
                stroke={flavour.visualColor || '#A0522D'}
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 70 175 Q 110 145 150 180"
                stroke={flavour.visualColor || '#A0522D'}
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Ice Cubes (for iced coffee) */}
          {isIced && (
            <g opacity="0.75">
              <rect x="75" y="90" width="36" height="32" rx="6" fill="#FFFFFF" fillOpacity="0.4" stroke="#FFFFFF" strokeWidth="1.5" transform="rotate(-8 93 106)" />
              <rect x="130" y="105" width="34" height="30" rx="6" fill="#FFFFFF" fillOpacity="0.4" stroke="#FFFFFF" strokeWidth="1.5" transform="rotate(12 147 120)" />
              <rect x="95" y="145" width="32" height="28" rx="6" fill="#FFFFFF" fillOpacity="0.35" stroke="#FFFFFF" strokeWidth="1.5" transform="rotate(5 111 159)" />
            </g>
          )}

          {/* Top Crema / Microfoam Layer */}
          <ellipse
            cx="120"
            cy="60"
            rx="75"
            ry="14"
            fill={hasMilk ? milkColor : '#8E4A1E'}
            stroke="#D6C1AA"
            strokeWidth="1"
          />

          {/* Microfoam Rosetta Latte Art / Cream Swirl */}
          {hasMilk && (
            <path
              d="M 120 54 Q 128 58 120 62 Q 112 58 120 54 M 120 63 Q 132 66 120 70 M 120 50 L 120 71"
              stroke="#B45309"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.45"
            />
          )}

          {/* Topping Sprinkles / Dusting */}
          {topping && topping.id !== 'none' && (
            <g opacity="0.85">
              <circle cx="95" cy="58" r="2.5" fill={toppingColor} />
              <circle cx="108" cy="62" r="2" fill={toppingColor} />
              <circle cx="118" cy="56" r="3" fill={toppingColor} />
              <circle cx="132" cy="61" r="2" fill={toppingColor} />
              <circle cx="145" cy="57" r="2.5" fill={toppingColor} />
              <circle cx="125" cy="65" r="1.5" fill={toppingColor} />
              <circle cx="85" cy="62" r="1.5" fill={toppingColor} />
              <circle cx="152" cy="63" r="1.5" fill={toppingColor} />
            </g>
          )}
        </g>

        {/* Glass Cup Outer Walls */}
        <path
          d="M 44 48 L 56 220 C 58 244 80 254 120 254 C 160 254 182 244 184 220 L 196 48 Z"
          fill="url(#glassWall)"
          stroke="#E5D6C5"
          strokeWidth="3.5"
        />

        {/* Cup Lip / Top Rim */}
        <ellipse cx="120" cy="48" rx="76" ry="12" fill="none" stroke="url(#rimGrad)" strokeWidth="4" />
        <ellipse cx="120" cy="48" rx="74" ry="10" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.7" />

        {/* Glass Glare Highlights */}
        <path
          d="M 58 60 L 68 215"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          strokeOpacity="0.45"
        />
        <path
          d="M 68 65 L 74 180"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.25"
        />
      </svg>

      {/* Layer Tooltip / Legend */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 max-w-xs text-[11px] font-medium text-[#78350F]">
        {topping && topping.id !== 'none' && (
          <span className="px-2 py-0.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E]">
            ✨ {topping.name}
          </span>
        )}
        {hasMilk && (
          <span className="px-2 py-0.5 rounded-full bg-[#F3EBD8] border border-[#E5D7BE] text-[#78350F]">
            🥛 {milk.name}
          </span>
        )}
        {base && (
          <span className="px-2 py-0.5 rounded-full bg-[#EFE3D3] border border-[#D8C2AA] text-[#451A03]">
            ☕ {base.name}
          </span>
        )}
      </div>
    </div>
  );
}
