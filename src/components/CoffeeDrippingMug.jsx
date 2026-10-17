import React, { useState } from 'react';
import { playPop } from '../utils/soundEffects';

export default function CoffeeDrippingMug({ onMugClick }) {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount((c) => c + 1);
    playPop();
    if (onMugClick) onMugClick();
  };

  return (
    <div
      onClick={handleClick}
      className="relative flex flex-col items-center justify-center select-none cursor-pointer group py-1"
      title="Tap the mug to make a drop splash!"
    >
      {/* Ambient Warm Golden Glow behind the mug */}
      <div className="absolute inset-0 w-64 h-64 mx-auto rounded-full bg-radial from-[#FDE68A]/35 via-[#F59E0B]/10 to-transparent filter blur-xl transform scale-110 pointer-events-none -z-10 animate-glow"></div>

      {/* SVG Canvas for Dripping Coffee into Mug */}
      <svg
        width="240"
        height="260"
        viewBox="0 0 240 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-105 filter drop-shadow-lg"
      >
        <defs>
          {/* Dripper Chrome Gradient */}
          <linearGradient id="dripperMetal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4A3E38" />
            <stop offset="35%" stopColor="#8A7B70" />
            <stop offset="50%" stopColor="#B8ADA3" />
            <stop offset="65%" stopColor="#786B60" />
            <stop offset="100%" stopColor="#3E342F" />
          </linearGradient>

          {/* Espresso Liquid Dark Gradient */}
          <linearGradient id="espressoLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3E1E12" />
            <stop offset="50%" stopColor="#29120A" />
            <stop offset="100%" stopColor="#1A0A05" />
          </linearGradient>

          {/* Golden Crema Surface Gradient */}
          <linearGradient id="cremaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C68A4C" />
            <stop offset="30%" stopColor="#E2A862" />
            <stop offset="70%" stopColor="#D89953" />
            <stop offset="100%" stopColor="#B3753B" />
          </linearGradient>

          {/* Rich Drop Gradient */}
          <linearGradient id="coffeeDropGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6C3518" />
            <stop offset="60%" stopColor="#431E0E" />
            <stop offset="100%" stopColor="#291107" />
          </linearGradient>

          {/* Glass Wall Gradient */}
          <linearGradient id="mugGlassWall" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="12%" stopColor="#FFFFFF" stopOpacity="0.18" />
            <stop offset="88%" stopColor="#FFFFFF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.4" />
          </linearGradient>

          {/* Inner Cup Clipping Mask */}
          <clipPath id="innerMugClip">
            <path d="M 52 118 L 60 216 C 62 235 78 244 120 244 C 162 244 178 235 180 216 L 188 118 Z" />
          </clipPath>
        </defs>

        {/* =================================================== */}
        {/* TOP: Espresso Portafilter Spout / Coffee Dripper     */}
        {/* =================================================== */}
        <g id="spout-assembly">
          {/* Upper Machine Mount Base */}
          <rect x="96" y="8" width="48" height="10" rx="3" fill="#3D322C" />
          <rect x="100" y="9" width="40" height="3" rx="1.5" fill="#807268" fillOpacity="0.6" />

          {/* Dual Spout Neck tapering down */}
          <path
            d="M 104 18 L 114 36 L 126 36 L 136 18 Z"
            fill="url(#dripperMetal)"
            stroke="#2B221D"
            strokeWidth="1"
          />

          {/* Nozzle tip */}
          <rect x="114" y="36" width="12" height="6" rx="2" fill="#5A4E45" stroke="#2B221D" strokeWidth="1" />
          <ellipse cx="120" cy="42" rx="4.5" ry="1.8" fill="#1E140E" />

          {/* Coffee accumulating at spout nozzle */}
          <circle cx="120" cy="42" r="3.2" fill="#542512" className="animate-drip-bead" />
        </g>

        {/* =================================================== */}
        {/* STEAM WISPS (Floating softly above the hot mug)    */}
        {/* =================================================== */}
        <g id="steam-wisps" opacity="0.65">
          <path
            d="M 88 100 C 84 85 94 72 88 56"
            stroke="url(#cremaGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            className="animate-steam"
          />
          <path
            d="M 152 102 C 156 86 148 72 154 55"
            stroke="url(#cremaGrad)"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
            className="animate-steam-delayed"
          />
        </g>

        {/* =================================================== */}
        {/* FALLING COFFEE DROPLETS (Drop by Drop Animation)   */}
        {/* =================================================== */}
        {/* Drop 1 (Primary Droplet) */}
        <g id="dripping-drop-1" className="coffee-drop-1">
          <path
            d="M 120 42 C 117.5 46 116 49 116 52 C 116 54.8 117.8 57 120 57 C 122.2 57 124 54.8 124 52 C 124 49 122.5 46 120 42 Z"
            fill="url(#coffeeDropGrad)"
            stroke="#632F15"
            strokeWidth="0.6"
          />
          {/* Drop shine */}
          <ellipse cx="118.5" cy="51" rx="1.2" ry="2" fill="#FFFFFF" fillOpacity="0.6" />
        </g>

        {/* Drop 2 (Secondary rhythmic droplet with delayed cadence) */}
        <g id="dripping-drop-2" className="coffee-drop-2">
          <path
            d="M 120 42 C 117.5 46 116 49 116 52 C 116 54.8 117.8 57 120 57 C 122.2 57 124 54.8 124 52 C 124 49 122.5 46 120 42 Z"
            fill="url(#coffeeDropGrad)"
            stroke="#632F15"
            strokeWidth="0.6"
          />
          <ellipse cx="118.5" cy="51" rx="1.2" ry="2" fill="#FFFFFF" fillOpacity="0.6" />
        </g>

        {/* Micro-splash droplets bouncing off the surface on impact */}
        <g id="splash-droplets">
          <circle cx="120" cy="126" r="2" fill="#934D25" className="splash-dot-left" />
          <circle cx="120" cy="126" r="2.2" fill="#C68A4C" className="splash-dot-right" />
          <circle cx="120" cy="126" r="1.5" fill="#78350F" className="splash-dot-center" />
        </g>

        {/* =================================================== */}
        {/* BOTTOM: Saucer & Shadow                             */}
        {/* =================================================== */}
        {/* Soft Saucer Shadow */}
        <ellipse cx="120" cy="252" rx="78" ry="8" fill="#2E180E" fillOpacity="0.14" />

        {/* Saucer Outer & Rim */}
        <ellipse cx="120" cy="248" rx="72" ry="7" fill="#F4EDE4" stroke="#DAC8B6" strokeWidth="2" />
        <ellipse cx="120" cy="246" rx="48" ry="4.5" fill="#E8DBCB" fillOpacity="0.6" />

        {/* Mug Handle */}
        <path
          d="M 178 136 C 214 136 218 200 174 212"
          fill="none"
          stroke="#E5D6C5"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M 178 136 C 210 136 214 200 174 212"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeLinecap="round"
          strokeOpacity="0.65"
        />

        {/* =================================================== */}
        {/* MUG BODY & LIQUID CONTENT (Inside clip)             */}
        {/* =================================================== */}
        <g clipPath="url(#innerMugClip)">
          {/* Deep Dark Espresso Base */}
          <rect x="40" y="122" width="160" height="130" fill="url(#espressoLiquid)" />

          {/* Rich Crema Layer with animated level breathing */}
          <rect
            x="40"
            y="120"
            width="160"
            height="26"
            fill="url(#cremaGrad)"
            className="animate-crema-pulse"
          />

          {/* Surface Ripples Expanding as Droplets Hit */}
          <g id="surface-ripples">
            {/* Ripple 1 */}
            <ellipse
              cx="120"
              cy="126"
              rx="12"
              ry="4"
              fill="none"
              stroke="#FFF1DC"
              strokeWidth="2"
              className="drop-ripple-1"
            />
            {/* Ripple 2 */}
            <ellipse
              cx="120"
              cy="126"
              rx="12"
              ry="4"
              fill="none"
              stroke="#FFE8C2"
              strokeWidth="2"
              className="drop-ripple-2"
            />
            {/* Subtle secondary outer wave */}
            <ellipse
              cx="120"
              cy="126"
              rx="24"
              ry="7"
              fill="none"
              stroke="#D89953"
              strokeWidth="1.5"
              className="drop-ripple-3"
            />
          </g>

          {/* Crema swirl / latte marbling textures */}
          <path
            d="M 72 132 Q 95 125 120 131 T 168 128"
            stroke="#A35F28"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.45"
          />
          <path
            d="M 80 138 Q 110 132 140 139 T 162 134"
            stroke="#632F15"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.35"
          />
        </g>

        {/* =================================================== */}
        {/* MUG GLASS SHELL & HIGHLIGHTS                        */}
        {/* =================================================== */}
        {/* Outer Glass Wall */}
        <path
          d="M 52 118 L 60 216 C 62 235 78 244 120 244 C 162 244 178 235 180 216 L 188 118 Z"
          fill="url(#mugGlassWall)"
          stroke="#E5D6C5"
          strokeWidth="3"
        />

        {/* Rim of Mug */}
        <ellipse cx="120" cy="118" rx="68" ry="11" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeOpacity="0.85" />
        <ellipse cx="120" cy="118" rx="66" ry="9" fill="none" stroke="#D8C5B2" strokeWidth="1.5" strokeOpacity="0.6" />

        {/* Vertical Glass Glare Streaks */}
        <path
          d="M 64 128 L 72 215"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeOpacity="0.5"
        />
        <path
          d="M 72 134 L 77 190"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.3"
        />
      </svg>

      {/* Chic Pill Label beneath the mug */}
      <div className="mt-1 flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF2E8] border border-[#ECD9C6] text-[#78350F] text-xs font-semibold tracking-wide shadow-2xs group-hover:border-[#D8B48D] transition-all">
        <span className="w-2 h-2 rounded-full bg-[#B45309] animate-ping"></span>
        <span>Extracting fresh • Drop by drop</span>
      </div>
    </div>
  );
}
