import React, { useState } from 'react';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { playPop } from '../utils/soundEffects';

export default function QuizScreen({ answers, onAnswer, onBack, onComplete }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  const question = QUIZ_QUESTIONS[currentIdx];
  const total = QUIZ_QUESTIONS.length;
  const progressPercent = Math.round(((currentIdx + 1) / total) * 100);

  const currentAnswer = answers[question.id];

  const handleSelect = (optionId) => {
    playPop();
    setSelectedOptionId(optionId);
    onAnswer(question.id, optionId);

    // Micro-delay for tactile feedback before advancing
    setTimeout(() => {
      setSelectedOptionId(null);
      if (currentIdx < total - 1) {
        setCurrentIdx(prev => prev + 1);
      } else {
        onComplete();
      }
    }, 240);
  };

  const handlePrev = () => {
    playPop();
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-4 md:py-6 animate-fadeIn">
      {/* Top Header: Back Button & Progress */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-[#8C7265]">
          <button
            type="button"
            onClick={handlePrev}
            className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg text-[#78350F] hover:bg-[#F3E8DF] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center gap-1.5">
            <span className="font-heading font-bold text-[#C05621]">Question {currentIdx + 1}</span>
            <span>of {total}</span>
          </div>
        </div>

        {/* Smooth Animated Progress Bar */}
        <div className="w-full h-2 rounded-full bg-[#EFE3D3] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#C05621] to-[#F59E0B] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Header Card */}
      <div className="mb-6 text-left">
        <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#2B1810] tracking-tight leading-snug mb-2">
          {question.title}
        </h2>
        {question.subtitle && (
          <p className="text-sm text-[#7D6354] leading-relaxed">
            {question.subtitle}
          </p>
        )}
      </div>

      {/* Answer Option Cards */}
      <div className="space-y-3" role="radiogroup" aria-label={question.title}>
        {question.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id || currentAnswer === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleSelect(opt.id)}
              className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 group cursor-pointer ${
                isSelected
                  ? 'bg-[#FFF7ED] border-[#C05621] shadow-md shadow-[#C05621]/10 ring-2 ring-[#C05621]/20'
                  : 'bg-white border-[#EADDD0] hover:border-[#D6BCA8] hover:bg-[#FAF6F1] shadow-xs'
              }`}
            >
              {/* Option Icon / Emoji */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform group-hover:scale-110 ${
                isSelected ? 'bg-[#FFEDD5]' : 'bg-[#FAF3EB]'
              }`}>
                {opt.icon}
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center justify-between">
                  <h3 className={`font-heading font-bold text-base ${
                    isSelected ? 'text-[#9A3412]' : 'text-[#2D1B13]'
                  }`}>
                    {opt.label}
                  </h3>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#C05621] text-white flex items-center justify-center shrink-0 ml-2 animate-scaleIn">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
                {opt.description && (
                  <p className="text-xs text-[#7A6457] mt-0.5 leading-relaxed">
                    {opt.description}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
