import React, { useEffect, useState } from 'react';
import LayeredCupGraphic from './LayeredCupGraphic';
import { playClink, playChime } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

export default function BrewingAnimationScreen({ userName, ingredients, isIced, onFinish }) {
  const [stageIndex, setStageIndex] = useState(0);

  const stages = [
    { text: 'Grinding freshly roasted single-origin beans...', icon: '🫘' },
    { text: 'Pulling extraction at 9 bars of pressure...', icon: '☕' },
    { text: `Frothing ${ingredients?.milk?.name || 'velvety foam'} to perfection...`, icon: '🥛' },
    { text: `Infusing ${ingredients?.flavour?.name || 'warm bakery spices'}...`, icon: '✨' },
    { text: 'Revealing your custom coffee persona...', icon: '🎉' }
  ];

  useEffect(() => {
    playClink();

    const interval = setInterval(() => {
      setStageIndex((prev) => {
        if (prev < stages.length - 1) {
          playClink();
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 550);

    const finishTimeout = setTimeout(() => {
      playChime();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#D97706', '#B45309', '#F59E0B', '#78350F']
        });
      } catch (e) {
        // Safe fallback
      }
      onFinish();
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(finishTimeout);
    };
  }, []);

  const currentStage = stages[stageIndex];
  const progressPercent = Math.min(100, Math.round(((stageIndex + 1) / stages.length) * 100));

  return (
    <div className="max-w-md mx-auto px-4 py-12 flex flex-col items-center justify-center text-center animate-fadeIn min-h-[70vh]">
      {/* Title */}
      <div className="mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C05621]">
          Crafting Your Cup
        </span>
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2B1810] mt-1">
          {userName ? `Brewing ${userName}'s Coffee...` : 'Brewing your coffee...'}
        </h2>
      </div>

      {/* Animated Visual Cup with Filling Effect */}
      <div className="my-4 relative flex items-center justify-center w-full overflow-visible">
        <div className="w-56 h-56 rounded-full bg-radial from-[#FEEBC8]/60 to-transparent absolute inset-0 m-auto filter blur-lg -z-10 pointer-events-none"></div>
        <LayeredCupGraphic ingredients={ingredients} isIced={isIced} size="large" />
      </div>

      {/* Stage Status & Micro-step */}
      <div className="w-full max-w-xs space-y-3">
        <div className="flex items-center justify-center gap-2 text-sm font-semibold text-[#5C3317] h-6">
          <span className="text-lg animate-bounce">{currentStage.icon}</span>
          <span className="transition-all duration-300">{currentStage.text}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 rounded-full bg-[#EFE3D3] overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-[#C05621] via-[#D97706] to-[#F59E0B] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="text-[11px] text-[#A89082]">
          Analyzing 7 taste dimensions & matching 8 persona clusters
        </p>
      </div>
    </div>
  );
}
