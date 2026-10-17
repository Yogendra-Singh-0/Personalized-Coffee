import React, { useState } from 'react';
import { ArrowRight, RefreshCw, Check, Sparkles, Filter, X, Info } from 'lucide-react';
import { INGREDIENTS_CATALOG } from '../data/ingredientsData';
import { playPop, playClink } from '../utils/soundEffects';

export default function IngredientSuggestionScreen({
  ingredients,
  onUpdateIngredient,
  dietaryFilters,
  onToggleDietaryFilter,
  onProceedToBrew,
  onBackToQuiz
}) {
  const [activeSwapCategory, setActiveSwapCategory] = useState(null);

  const categories = [
    { key: 'base', label: 'Coffee Base', icon: '☕' },
    { key: 'milk', label: 'Milk / Body', icon: '🥛' },
    { key: 'sweetener', label: 'Sweetener', icon: '🍯' },
    { key: 'flavour', label: 'Flavour Accent', icon: '✨' },
    { key: 'topping', label: 'Garnish / Finish', icon: '🍫' }
  ];

  const handleOpenSwap = (catKey) => {
    playPop();
    setActiveSwapCategory(catKey);
  };

  const handleSelectAlternative = (item) => {
    playClink();
    onUpdateIngredient(activeSwapCategory, item);
    setActiveSwapCategory(null);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-4 md:py-6 animate-fadeIn pb-12">
      {/* Top Header */}
      <div className="text-left mb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
          <span>Curated Recipe Blueprint</span>
        </div>
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2B1810] tracking-tight">
          Your tailored ingredients
        </h2>
        <p className="text-xs sm:text-sm text-[#7D6354] mt-1 leading-relaxed">
          We balanced these 5 components around your personality and taste scores. Feel free to swap any item before we brew!
        </p>
      </div>

      {/* Dietary Filters Pill Row (PRD Section 6.3) */}
      <div className="bg-white/80 backdrop-blur-xs rounded-2xl border border-[#EADBCE] p-3.5 mb-5 shadow-xs">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#78350F] mb-2">
          <Filter className="w-3.5 h-3.5" />
          <span>Dietary Preferences & Filters:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'vegan', label: '🌱 Vegan' },
            { key: 'lactoseFree', label: '🥛 Lactose-Free' },
            { key: 'sugarFree', label: '🍃 Sugar-Free' },
            { key: 'caffeineFree', label: '🕊️ Decaf Friendly' }
          ].map(filter => {
            const isActive = dietaryFilters[filter.key];
            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => {
                  playPop();
                  onToggleDietaryFilter(filter.key);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#78350F] text-white shadow-xs'
                    : 'bg-[#FAF3EB] text-[#78350F] hover:bg-[#F0E4D5]'
                }`}
              >
                <span>{filter.label}</span>
                {isActive && <Check className="w-3 h-3 stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5 Category Cards */}
      <div className="space-y-3 mb-6">
        {categories.map(({ key, label, icon }) => {
          const item = ingredients[key];
          if (!item) return null;

          return (
            <div
              key={key}
              className="bg-white rounded-2xl border border-[#EADDD0] p-4 shadow-xs transition-all hover:border-[#D6BCA8]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF3EB] border border-[#F0E4D5] flex items-center justify-center text-xl shrink-0">
                    {icon}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#92400E]">
                      {label}
                    </span>
                    <h3 className="font-heading font-bold text-base text-[#2B1810]">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#8C7265] mt-0.5 font-medium">
                      {item.measure}
                    </p>
                  </div>
                </div>

                {/* Swap Button (PRD Section 6.3) */}
                <button
                  type="button"
                  onClick={() => handleOpenSwap(key)}
                  className="px-3 py-1.5 rounded-xl bg-[#FAF4EC] hover:bg-[#F3E7D8] text-[#78350F] text-xs font-semibold border border-[#E5D2BC] transition-all flex items-center gap-1 shrink-0 cursor-pointer shadow-2xs"
                >
                  <RefreshCw className="w-3 h-3 text-[#C05621]" />
                  <span>Swap</span>
                </button>
              </div>

              {/* Rationale tied to user's answers (PRD Section 6.3) */}
              <div className="mt-2.5 pt-2.5 border-t border-[#F5ECE3] flex items-start gap-1.5 text-xs text-[#7A6457]">
                <Info className="w-3.5 h-3.5 text-[#C05621] shrink-0 mt-0.5" />
                <p className="italic leading-relaxed">
                  {item.rationale || 'Matched specifically to balance your custom aroma profile.'}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 sticky bottom-4 z-20">
        <button
          type="button"
          onClick={() => {
            playPop();
            onProceedToBrew();
          }}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#78350F] to-[#B45309] hover:from-[#5C270A] hover:to-[#92400E] text-white font-heading font-bold text-base shadow-lg shadow-[#78350F]/25 hover:shadow-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Brew My Coffee</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onBackToQuiz}
          className="w-full py-2 text-xs font-semibold text-[#8C7265] hover:text-[#5C3317] transition-colors"
        >
          ← Retake or tweak quiz answers
        </button>
      </div>

      {/* Swap Modal Drawer */}
      {activeSwapCategory && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/45 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FFFDF9] border border-[#E8D5C4] rounded-t-3xl sm:rounded-3xl max-w-md w-full max-h-[85vh] overflow-y-auto p-5 shadow-2xl relative text-left animate-slideUp">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0E4D5]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C05621]">
                  Swap {categories.find(c => c.key === activeSwapCategory)?.label}
                </span>
                <h3 className="font-heading font-bold text-lg text-[#2B1810]">
                  Choose an alternative
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveSwapCategory(null)}
                className="p-1.5 rounded-full hover:bg-[#F3E8DF] text-[#78350F] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Alternatives List */}
            <div className="py-3 space-y-2.5">
              {INGREDIENTS_CATALOG[activeSwapCategory].map((alt) => {
                const isCurrent = ingredients[activeSwapCategory]?.id === alt.id;

                return (
                  <button
                    key={alt.id}
                    type="button"
                    onClick={() => handleSelectAlternative(alt)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isCurrent
                        ? 'bg-[#FEF3C7] border-[#D97706] ring-1 ring-[#D97706]'
                        : 'bg-white border-[#EADDD0] hover:bg-[#FAF5EF]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-sm text-[#2B1810]">
                          {alt.name}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F59E0B] text-white">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#785E50] mt-0.5">
                        {alt.description}
                      </p>
                      <span className="text-[11px] font-semibold text-[#B45309] mt-1 inline-block">
                        Measure: {alt.measure}
                      </span>
                    </div>

                    {isCurrent ? (
                      <Check className="w-5 h-5 text-[#B45309] shrink-0 mt-1" />
                    ) : (
                      <span className="text-xs font-bold text-[#C05621] shrink-0 mt-1 hover:underline">
                        Select
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
