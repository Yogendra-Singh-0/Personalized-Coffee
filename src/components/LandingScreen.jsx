import React from 'react';
import { ArrowRight, Sparkles, Clock, ShieldCheck, Coffee } from 'lucide-react';
import CoffeeDrippingMug from './CoffeeDrippingMug';
import { playPop } from '../utils/soundEffects';

export default function LandingScreen({ userName, setUserName, onStartQuiz }) {
  const handleStart = (e) => {
    e.preventDefault();
    playPop();
    onStartQuiz();
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-3 sm:py-6 flex flex-col items-center text-center animate-fadeIn my-auto">
      {/* Eyebrow Pill */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EBE1] border border-[#E8D5C4] text-[#8C4A27] text-xs font-semibold mb-2.5 tracking-wide shadow-xs">
        <Sparkles className="w-3.5 h-3.5 text-[#C05621]" />
        <span>Make My Coffee</span>
      </div>

      {/* Main Headline (PRD Section 5: Hook line) */}
      <h1 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#2B1810] tracking-tight leading-[1.18] mb-2">
        What's your coffee, <span className="text-[#C05621] underline decoration-[#F4A261] decoration-wavy decoration-2">really?</span>
      </h1>

      <p className="text-xs sm:text-sm text-[#6C5346] max-w-sm mx-auto leading-relaxed mb-3 font-normal">
        Answer 10 playful questions about your morning mood and taste cravings. We'll brew your custom persona card and a real recipe to make or order today.
      </p>

      {/* Animated Hero Coffee Illustration: Dripping Drop by Drop into Mug */}
      <div className="my-1 relative">
        <CoffeeDrippingMug />
      </div>

      {/* Interactive Form: Optional Name + Primary CTA */}
      <form onSubmit={handleStart} className="w-full max-w-sm mt-3 space-y-2.5">
        <div className="relative text-left">
          <label htmlFor="user-name" className="block text-xs font-semibold text-[#78350F] mb-1 pl-1">
            Your name <span className="text-[#A89082] font-normal">(optional — so we can name your coffee!)</span>
          </label>
          <input
            id="user-name"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="e.g. Aarav, Maya, Jordan..."
            maxLength={32}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2D2C2] text-[#2D1B13] placeholder-[#A89082] font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C05621] focus:border-transparent transition-all shadow-xs"
          />
        </div>

        {/* Primary CTA Button */}
        <button
          type="submit"
          className="w-full group py-3 px-6 rounded-2xl bg-gradient-to-r from-[#78350F] to-[#B45309] hover:from-[#5C270A] hover:to-[#92400E] text-white font-heading font-bold text-sm sm:text-base shadow-lg shadow-[#78350F]/25 hover:shadow-xl hover:shadow-[#78350F]/35 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Find My Coffee</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        {/* Time estimate & trust indicators (PRD Section 5.1 & 6.1) */}
        <div className="pt-1 flex items-center justify-center gap-3 text-[11px] text-[#8C7265]">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#B45309]" />
            <span>2 minutes</span>
          </div>
          <span className="text-[#DAC8B6]">•</span>
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#B45309]" />
            <span>No sign-up needed</span>
          </div>
          <span className="text-[#DAC8B6]">•</span>
          <div className="flex items-center gap-1">
            <Coffee className="w-3 h-3 text-[#B45309]" />
            <span>Real recipes</span>
          </div>
        </div>
      </form>
    </div>
  );
}
