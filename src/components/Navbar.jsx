import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Volume2, VolumeX, RotateCcw, Info, Coffee, X } from 'lucide-react';
import { isAudioEnabled, setAudioEnabled, playPop } from '../utils/soundEffects';

export default function Navbar({ onReset, showReset = false }) {
  const [soundOn, setSoundOn] = useState(isAudioEnabled());
  const [showInfo, setShowInfo] = useState(false);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setAudioEnabled(next);
  };

  const handleOpenInfo = () => {
    playPop();
    setShowInfo(true);
  };

  const handleCloseInfo = () => {
    playPop();
    setShowInfo(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FAF6F0]/85 border-b border-[#EFE5D8]/80 transition-all">
      <div className="max-w-xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={showReset ? onReset : undefined}
          className={`flex items-center gap-2 select-none ${showReset ? 'cursor-pointer hover:opacity-80' : ''}`}
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#78350F] to-[#B45309] flex items-center justify-center text-white shadow-sm shadow-[#78350F]/20">
            <Coffee className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-[#3E2114]">
            Brew you<span className="text-[#C05621]">.</span>
          </span>
        </div>

        {/* Right utility buttons */}
        <div className="flex items-center gap-1.5">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundOn ? "Mute audio" : "Enable sound effects"}
            className="p-2 rounded-xl text-[#78350F] hover:bg-[#F3E8DF] transition-colors relative cursor-pointer"
            title={soundOn ? "Mute sounds" : "Enable sounds"}
          >
            {soundOn ? (
              <Volume2 className="w-4 h-4 text-[#C05621]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#A89082]" />
            )}
            {soundOn && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#C05621]" />
            )}
          </button>

          {/* Info Modal Trigger */}
          <button
            type="button"
            onClick={handleOpenInfo}
            aria-label="About Brew You"
            className="p-2 rounded-xl text-[#78350F] hover:bg-[#F3E8DF] transition-colors cursor-pointer"
            title="About Brew You"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Restart Quiz Button (when beyond landing) */}
          {showReset && (
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#EFE3D3] text-[#5C3317] hover:bg-[#E5D2BC] transition-all ml-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Retake</span>
            </button>
          )}
        </div>
      </div>

      {/* Info Modal rendered via Portal directly to body to avoid header containing-block clipping */}
      {showInfo && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn"
          onClick={handleCloseInfo}
        >
          <div
            className="bg-[#FFFDF9] border border-[#E8D5C4] rounded-2xl max-w-sm w-full p-5 sm:p-6 shadow-2xl relative text-left my-auto max-h-[90vh] overflow-y-auto animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={handleCloseInfo}
              className="absolute top-4 right-4 p-1 rounded-lg text-[#8C7265] hover:text-[#2B1810] hover:bg-[#F5ECE1] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3 pr-6">
              <span className="text-2xl">☕</span>
              <h3 className="font-heading font-bold text-lg text-[#3E2114]">About Brew You</h3>
            </div>

            <p className="text-xs sm:text-sm text-[#6C5346] leading-relaxed mb-3">
              Most people drink the same coffee out of habit. <strong>Brew You</strong> is a playful discovery game that pairs your mood, personality, and taste cues to a bespoke coffee persona and reproducible barista recipe.
            </p>

            <div className="bg-[#FAF4EC] rounded-xl p-3 text-xs text-[#78350F] mb-4 space-y-1.5 border border-[#EADBCE]">
              <p>⏱️ <strong>Fast:</strong> 2-minute quick quiz</p>
              <p>🔒 <strong>Private:</strong> Anonymous, no sign-up required</p>
              <p>🏠 <strong>Practical:</strong> Real home brew ratios & café scripts</p>
            </div>

            <button
              type="button"
              onClick={handleCloseInfo}
              className="w-full py-2.5 rounded-xl bg-[#78350F] text-white font-semibold text-sm hover:bg-[#5C270A] transition-colors cursor-pointer shadow-sm active:scale-[0.99]"
            >
              Got it, let's brew!
            </button>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
