import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Flame,
  Snowflake,
  Zap,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Mail,
  Printer,
  Coffee,
  Info
} from 'lucide-react';
import LayeredCupGraphic from './LayeredCupGraphic';
import ShareCardModal from './ShareCardModal';
import { playPop, playClink } from '../utils/soundEffects';

export default function CoffeeRevealScreen({
  revealData,
  onApplyVariation,
  onRetakeQuiz
}) {
  const [activeRecipeTab, setActiveRecipeTab] = useState('home'); // 'home' | 'cafe'
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(null); // 'positive' | 'negative' | null
  const [emailInput, setEmailInput] = useState('');
  const [emailConsent, setEmailConsent] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const {
    coffeeName,
    persona,
    ingredients,
    flavourProfile,
    recipe,
    personaStory,
    userName
  } = revealData;

  const isIced = recipe?.servingTemp?.toLowerCase().includes('chill') || recipe?.servingTemp?.toLowerCase().includes('ice');

  // Handle Copy Café Order Script
  const handleCopyScript = () => {
    playPop();
    navigator.clipboard.writeText(recipe.cafeScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2400);
  };

  // Handle Feedback
  const handleFeedback = (type) => {
    playClink();
    setFeedbackGiven(type);
  };

  // Handle Email Submission
  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!emailInput || !emailConsent) return;
    playClink();
    setEmailSent(true);
  };

  // Handle Print
  const handlePrint = () => {
    playPop();
    window.print();
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-4 md:py-8 animate-fadeIn pb-16">
      {/* Top Persona Badge */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-xs font-bold tracking-wider uppercase mb-2 shadow-2xs">
          <span>{persona.emoji}</span>
          <span>{persona.badge}</span>
        </div>

        {/* Coffee Title */}
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2B1810] tracking-tight leading-tight">
          {coffeeName}
        </h1>

        {/* Tagline */}
        <p className="text-sm text-[#7D6354] mt-1 italic font-medium">
          "{persona.tagline}"
        </p>
      </div>

      {/* Layered Cup Illustration */}
      <div className="my-6 relative flex flex-col items-center">
        <div className="w-56 h-56 rounded-full bg-radial from-[#FDE68A]/40 to-transparent absolute -inset-2 animate-glow filter blur-md -z-10"></div>
        <div className="animate-float">
          <LayeredCupGraphic ingredients={ingredients} isIced={isIced} size="large" />
        </div>
      </div>

      {/* "Why this coffee fits you" Story Card (PRD Section 6.4) */}
      <div className="bg-[#FFFDF9] rounded-2xl border border-[#EADBCE] p-4 sm:p-5 mb-5 shadow-xs text-left">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#C05621]" />
          <h2 className="font-heading font-bold text-base text-[#2B1810]">
            Why this coffee fits you
          </h2>
        </div>
        <p className="text-sm text-[#6C5346] leading-relaxed mb-3">
          {personaStory}
        </p>
        <p className="text-xs text-[#8C7265] italic border-t border-[#F3E8DB] pt-2">
          {persona.description}
        </p>
      </div>

      {/* Flavour Profile Meter (PRD Section 6.4) */}
      <div className="bg-[#FFFDF9] rounded-2xl border border-[#EADBCE] p-4 sm:p-5 mb-5 shadow-xs text-left">
        <h2 className="font-heading font-bold text-base text-[#2B1810] mb-3 flex items-center justify-between">
          <span>Flavour Profile Breakdown</span>
          <span className="text-xs font-normal text-[#8C7265]">Calibrated 1–10</span>
        </h2>

        <div className="space-y-3 text-xs font-semibold">
          {[
            { label: 'Sweetness', val: flavourProfile.sweetness, color: 'bg-[#F59E0B]' },
            { label: 'Boldness / Bitterness', val: flavourProfile.bitterness, color: 'bg-[#78350F]' },
            { label: 'Creaminess', val: flavourProfile.creaminess, color: 'bg-[#D97706]' },
            { label: 'Warmth / Spice', val: flavourProfile.spice, color: 'bg-[#EA580C]' },
            { label: 'Caffeine Kick', val: flavourProfile.caffeine, color: 'bg-[#DC2626]' }
          ].map((bar) => (
            <div key={bar.label}>
              <div className="flex justify-between text-[#5C381E] mb-1">
                <span>{bar.label}</span>
                <span className="font-bold text-[#78350F]">{bar.val}/10</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#EFE3D3] overflow-hidden">
                <div
                  className={`h-full ${bar.color} rounded-full transition-all duration-500`}
                  style={{ width: `${bar.val * 10}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recipe Section with Dual View Toggle (PRD Section 6.4 & Open Question 3) */}
      <div className="bg-[#FFFDF9] rounded-2xl border border-[#EADBCE] overflow-hidden shadow-xs mb-5 text-left">
        {/* Toggle Bar */}
        <div className="grid grid-cols-2 bg-[#F5ECE1] p-1 border-b border-[#EADBCE]">
          <button
            type="button"
            onClick={() => {
              playPop();
              setActiveRecipeTab('home');
            }}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeRecipeTab === 'home'
                ? 'bg-white text-[#78350F] shadow-xs'
                : 'text-[#8C7265] hover:text-[#5C3317]'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Home Brewer Recipe</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playPop();
              setActiveRecipeTab('cafe');
            }}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeRecipeTab === 'cafe'
                ? 'bg-white text-[#78350F] shadow-xs'
                : 'text-[#8C7265] hover:text-[#5C3317]'
            }`}
          >
            <span>☕ Café Order Script</span>
          </button>
        </div>

        {/* Tab 1: Home Brewer Recipe */}
        {activeRecipeTab === 'home' && (
          <div className="p-4 sm:p-5 space-y-4 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#F0E4D5] text-xs">
              <span className="font-semibold text-[#78350F]">
                🌡️ Serving: <strong className="text-[#2B1810]">{recipe.servingTemp}</strong>
              </span>
              <span className="font-semibold text-[#78350F]">
                ⏱️ Prep Time: <strong className="text-[#2B1810]">{recipe.prepTime}</strong>
              </span>
            </div>

            {/* Ingredients list with measurements */}
            <div>
              <h3 className="font-heading font-bold text-sm text-[#2B1810] mb-2">
                Ingredients & Exact Measurements:
              </h3>
              <ul className="space-y-1.5 text-xs text-[#5C381E]">
                <li className="flex items-center justify-between py-1 border-b border-[#F5ECE1]">
                  <span>• <strong>Base:</strong> {ingredients.base?.name}</span>
                  <span className="font-bold text-[#8C4A27]">{ingredients.base?.measure}</span>
                </li>
                <li className="flex items-center justify-between py-1 border-b border-[#F5ECE1]">
                  <span>• <strong>Milk:</strong> {ingredients.milk?.name}</span>
                  <span className="font-bold text-[#8C4A27]">{ingredients.milk?.measure}</span>
                </li>
                <li className="flex items-center justify-between py-1 border-b border-[#F5ECE1]">
                  <span>• <strong>Sweetener:</strong> {ingredients.sweetener?.name}</span>
                  <span className="font-bold text-[#8C4A27]">{ingredients.sweetener?.measure}</span>
                </li>
                <li className="flex items-center justify-between py-1 border-b border-[#F5ECE1]">
                  <span>• <strong>Flavour Accent:</strong> {ingredients.flavour?.name}</span>
                  <span className="font-bold text-[#8C4A27]">{ingredients.flavour?.measure}</span>
                </li>
                <li className="flex items-center justify-between py-1">
                  <span>• <strong>Topping Garnish:</strong> {ingredients.topping?.name}</span>
                  <span className="font-bold text-[#8C4A27]">{ingredients.topping?.measure}</span>
                </li>
              </ul>
            </div>

            {/* Step-by-step instructions */}
            <div>
              <h3 className="font-heading font-bold text-sm text-[#2B1810] mb-2">
                Equipment-Aware Preparation Steps:
              </h3>
              <ol className="space-y-2 text-xs text-[#6C5346]">
                {recipe.steps.map((step) => (
                  <li key={step.step} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#FAF3EB] text-[#8C4A27] font-bold flex items-center justify-center shrink-0 mt-0.5 border border-[#EADBCE]">
                      {step.step}
                    </span>
                    <span className="leading-relaxed">{step.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {/* Tab 2: Café Order Script */}
        {activeRecipeTab === 'cafe' && (
          <div className="p-4 sm:p-5 space-y-3 animate-fadeIn">
            <p className="text-xs text-[#7D6354] leading-relaxed">
              Visiting a specialty café or coffee shop? Order with complete confidence by reading or showing this barista script:
            </p>

            <div className="bg-[#FAF3EB] border border-[#E8D5C4] rounded-2xl p-4 relative">
              <p className="font-medium text-sm text-[#2B1810] italic leading-relaxed">
                {recipe.cafeScript}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyScript}
              className="w-full py-2.5 px-4 rounded-xl bg-[#78350F] hover:bg-[#5C270A] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              {copiedScript ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedScript ? 'Order Script Copied to Clipboard!' : 'Copy Script for Barista'}</span>
            </button>
          </div>
        )}
      </div>

      {/* "Try a Variation" Section (PRD Section 6.6) */}
      <div className="bg-white/90 rounded-2xl border border-[#EADBCE] p-4 mb-5 shadow-xs text-left">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#78350F] mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-[#C05621]" />
          <span>Try a Variation (subtly adjust your cup):</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              playPop();
              onApplyVariation('spicier');
            }}
            className="px-3 py-1.5 rounded-xl bg-[#FAF3EB] hover:bg-[#F3E7D8] text-[#78350F] text-xs font-semibold border border-[#E5D2BC] flex items-center gap-1 transition-all cursor-pointer"
          >
            <Flame className="w-3.5 h-3.5 text-orange-600" />
            <span>Make it Spicier</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playPop();
              onApplyVariation('sweeter');
            }}
            className="px-3 py-1.5 rounded-xl bg-[#FAF3EB] hover:bg-[#F3E7D8] text-[#78350F] text-xs font-semibold border border-[#E5D2BC] flex items-center gap-1 transition-all cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 text-amber-600" />
            <span>Make it Sweeter</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playPop();
              onApplyVariation('iced');
            }}
            className="px-3 py-1.5 rounded-xl bg-[#FAF3EB] hover:bg-[#F3E7D8] text-[#78350F] text-xs font-semibold border border-[#E5D2BC] flex items-center gap-1 transition-all cursor-pointer"
          >
            <Snowflake className="w-3.5 h-3.5 text-blue-500" />
            <span>Make it Iced</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playPop();
              onApplyVariation('turbo');
            }}
            className="px-3 py-1.5 rounded-xl bg-[#FAF3EB] hover:bg-[#F3E7D8] text-[#78350F] text-xs font-semibold border border-[#E5D2BC] flex items-center gap-1 transition-all cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-red-500" />
            <span>Turbo Caffeine</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playPop();
              onApplyVariation('decaf');
            }}
            className="px-3 py-1.5 rounded-xl bg-[#FAF3EB] hover:bg-[#F3E7D8] text-[#78350F] text-xs font-semibold border border-[#E5D2BC] flex items-center gap-1 transition-all cursor-pointer"
          >
            <span>🕊️ Mellow Decaf</span>
          </button>
        </div>
      </div>

      {/* Primary Actions: Share Card & Print */}
      <div className="space-y-2.5 mb-6">
        <button
          type="button"
          onClick={() => {
            playPop();
            setShowShareModal(true);
          }}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#78350F] to-[#B45309] hover:from-[#5C270A] hover:to-[#92400E] text-white font-heading font-bold text-base shadow-lg shadow-[#78350F]/25 hover:shadow-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Coffee Persona Card</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#FAF4EC] text-[#78350F] text-xs font-semibold border border-[#E2D2C2] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Save / Print Recipe</span>
          </button>

          <button
            type="button"
            onClick={onRetakeQuiz}
            className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#FAF4EC] text-[#78350F] text-xs font-semibold border border-[#E2D2C2] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Quiz</span>
          </button>
        </div>
      </div>

      {/* Result Satisfaction Feedback Widget (PRD Section 12: result_satisfaction) */}
      <div className="bg-[#FAF3EB] rounded-2xl border border-[#EADBCE] p-4 text-center mb-5">
        <h3 className="text-xs font-bold text-[#78350F] mb-1">
          Does this coffee feel like you?
        </h3>
        {feedbackGiven ? (
          <p className="text-xs text-emerald-700 font-semibold animate-fadeIn mt-1">
            {feedbackGiven === 'positive'
              ? '✨ Thank you! We have tuned our aroma weights.'
              : '🙏 Thanks for your feedback! Try tapping "Try a variation" above to refine.'}
          </p>
        ) : (
          <div className="flex items-center justify-center gap-3 mt-2">
            <button
              type="button"
              onClick={() => handleFeedback('positive')}
              className="px-4 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all active:scale-95"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Absolutely!</span>
            </button>
            <button
              type="button"
              onClick={() => handleFeedback('negative')}
              className="px-4 py-1.5 rounded-xl bg-white hover:bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200 flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all active:scale-95"
            >
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>Not quite</span>
            </button>
          </div>
        )}
      </div>

      {/* Optional Email Capture with GDPR / DPDP Consent (PRD Section 6.6 & 10) */}
      <div className="bg-white rounded-2xl border border-[#EADBCE] p-4 text-left shadow-xs">
        <div className="flex items-center gap-2 mb-1.5">
          <Mail className="w-4 h-4 text-[#C05621]" />
          <h3 className="font-heading font-bold text-sm text-[#2B1810]">
            Send me my recipe card
          </h3>
        </div>
        <p className="text-xs text-[#7D6354] mb-3">
          Get your persona card and brewing guide sent directly to your inbox so you never lose it.
        </p>

        {emailSent ? (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
            ✅ Recipe card sent! Check your inbox for your signature brew.
          </div>
        ) : (
          <form onSubmit={handleSendEmail} className="space-y-2.5">
            <div className="flex gap-2">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="you@domain.com"
                className="flex-1 px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#DAC7B5] text-xs text-[#2B1810] placeholder-[#A89082] focus:outline-none focus:ring-1 focus:ring-[#C05621]"
              />
              <button
                type="submit"
                disabled={!emailConsent}
                className={`px-4 py-2 rounded-xl font-semibold text-xs transition-all ${
                  emailConsent
                    ? 'bg-[#78350F] text-white hover:bg-[#5C270A] cursor-pointer'
                    : 'bg-[#EAE1D5] text-[#A89082] cursor-not-allowed'
                }`}
              >
                Send
              </button>
            </div>

            <label className="flex items-start gap-2 text-[11px] text-[#8C7265] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={emailConsent}
                onChange={(e) => setEmailConsent(e.target.checked)}
                className="mt-0.5 rounded text-[#C05621] focus:ring-0"
              />
              <span>
                I agree to receive my recipe and occasional coffee tips. (DPDP Act & GDPR compliant, unsubscribe anytime).
              </span>
            </label>
          </form>
        )}
      </div>

      {/* Share Card Modal */}
      {showShareModal && (
        <ShareCardModal
          result={revealData}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
}
