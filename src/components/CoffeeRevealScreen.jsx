import React, { useState, useMemo } from 'react';
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
  BookOpen,
  ChevronDown,
  ChevronUp,
  Plus,
  ArrowRight,
  ShieldCheck,
  Utensils
} from 'lucide-react';
import LayeredCupGraphic from './LayeredCupGraphic';
import ShareCardModal from './ShareCardModal';
import { playPop, playClink } from '../utils/soundEffects';
import {
  CAFE_CATEGORIES,
  CAFE_MENU_ITEMS,
  ESPRESSO_CUSTOMIZATIONS,
  MANUAL_BREW_METHODS,
  MANUAL_BREW_PRICING
} from '../data/cafeMenuData';
import { selectMenuItemForReveal } from '../utils/recommendationEngine';

export default function CoffeeRevealScreen({
  revealData: initialRevealData,
  onApplyVariation,
  onRetakeQuiz
}) {
  const [currentReveal, setCurrentReveal] = useState(initialRevealData);
  const [activeRecipeTab, setActiveRecipeTab] = useState('cafe'); // 'cafe' | 'home'
  const [showFullMenu, setShowFullMenu] = useState(false);
  const [activeMenuCategory, setActiveMenuCategory] = useState('all');
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState({});
  const [feedbackGiven, setFeedbackGiven] = useState(null);
  const [emailInput, setEmailInput] = useState('');
  const [emailConsent, setEmailConsent] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Sync if parent updates revealData
  React.useEffect(() => {
    setCurrentReveal(initialRevealData);
  }, [initialRevealData]);

  const {
    coffeeName,
    matchedMenuItem,
    persona,
    ingredients,
    flavourProfile,
    recipe,
    personaStory,
    userName
  } = currentReveal;

  // Derive drink item (fallback to matchedMenuItem or first craft item)
  const activeItem = matchedMenuItem || CAFE_MENU_ITEMS[0];
  const isIced = activeItem.temp?.toLowerCase().includes('iced') && !activeItem.temp?.toLowerCase().includes('hot')
    ? true
    : recipe?.servingTemp?.toLowerCase().includes('chill') || recipe?.servingTemp?.toLowerCase().includes('ice');

  // Toggle Customization Addon
  const toggleAddon = (addonId) => {
    playPop();
    setSelectedAddons(prev => ({
      ...prev,
      [addonId]: !prev[addonId]
    }));
  };

  // Calculate dynamic price based on selected add-ons
  const { calculatedPrice, customizationList } = useMemo(() => {
    let base = activeItem.priceNum || 280;
    const customs = [];

    ESPRESSO_CUSTOMIZATIONS.forEach(c => {
      if (selectedAddons[c.id]) {
        base += c.price;
        customs.push(c.name);
      }
    });

    return { calculatedPrice: base, customizationList: customs };
  }, [activeItem, selectedAddons]);

  // Generate dynamic barista script with customizations
  const dynamicCafeScript = useMemo(() => {
    let script = activeItem.cafeScript || recipe.cafeScript;
    if (customizationList.length > 0) {
      const customNotes = customizationList.join(', ');
      script = script.replace('?”', `, with ${customNotes}?”`).replace('!”', `, with ${customNotes}!”`);
      if (!script.includes(customNotes)) {
        script = `“Hi! Could I please get the ${activeItem.name} with ${customNotes}, please?”`;
      }
    }
    return script;
  }, [activeItem, customizationList, recipe.cafeScript]);

  // Handle Copy Café Order Script
  const handleCopyScript = () => {
    playPop();
    navigator.clipboard.writeText(dynamicCafeScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2400);
  };

  // Handle selecting a drink from the in-app café menu
  const handleSelectMenuItem = (menuItem) => {
    playPop();
    const updated = selectMenuItemForReveal(currentReveal, menuItem);
    setCurrentReveal(updated);
    setSelectedAddons({});
    window.scrollTo({ top: 120, behavior: 'smooth' });
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

  // Filtered menu items
  const filteredMenuItems = useMemo(() => {
    if (activeMenuCategory === 'all') return CAFE_MENU_ITEMS;
    return CAFE_MENU_ITEMS.filter(item => item.category === activeMenuCategory);
  }, [activeMenuCategory]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 md:py-8 animate-fadeIn pb-20">
      
      {/* Top Header: Persona + Café Menu Badge */}
      <div className="text-center mb-3">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
          {/* Persona Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-xs font-bold tracking-wider uppercase shadow-2xs">
            <span>{persona.emoji}</span>
            <span>{persona.badge}</span>
          </div>

          {/* Authentic Menu Category & Price Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E6] border border-[#E5D2BC] text-[#78350F] text-xs font-bold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{activeItem.categoryName}</span>
            <span className="text-[#C05621]">•</span>
            <span>{activeItem.price}</span>
            {activeItem.calories && (
              <span className="text-emerald-700 bg-emerald-100/70 px-1.5 py-0.2 rounded text-[11px] font-semibold">
                {activeItem.calories}
              </span>
            )}
          </div>
        </div>

        {/* Coffee Title */}
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2B1810] tracking-tight leading-tight">
          {coffeeName}
        </h1>

        {/* Dietary / Feature Tags from Physical Menu */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2">
          {activeItem.temp && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#EFE6DA] text-[#6B4423]">
              {activeItem.temp.includes('Iced') && !activeItem.temp.includes('Hot') ? '🧊 Iced' : activeItem.temp === 'Hot' ? '♨️ Hot' : '♨️ Hot / 🧊 Iced'}
            </span>
          )}
          {activeItem.dietary?.includes('vegan') && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              🌱 Vegan
            </span>
          )}
          {activeItem.dietary?.includes('vo') && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              🥛 VO (Vegan Option Available)
            </span>
          )}
          {activeItem.dietary?.includes('nut') && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-100 text-amber-900 border border-amber-200">
              🥜 Nut Allergen
            </span>
          )}
          {activeItem.category === 'protein_menu' && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-100 text-blue-900 border border-blue-200">
              💪 Powered by Only What's Needed
            </span>
          )}
        </div>

        {/* Authentic Café Description Callout */}
        <div className="mt-3 px-4 py-2.5 rounded-xl bg-[#FFF8EE] border border-[#ECD9C6] max-w-md mx-auto">
          <p className="text-xs sm:text-sm text-[#7D5A44] italic font-medium">
            "{activeItem.description}"
          </p>
        </div>
      </div>

      {/* Layered Cup Illustration */}
      <div className="my-5 relative flex flex-col items-center">
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
            Why this coffee fits your persona
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

      {/* DUAL VIEW SECTION: ☕ Café Counter Script vs 🏠 Home Brewer Recipe */}
      <div className="bg-[#FFFDF9] rounded-2xl border border-[#EADBCE] overflow-hidden shadow-xs mb-5 text-left">
        {/* Toggle Bar */}
        <div className="grid grid-cols-2 bg-[#F5ECE1] p-1 border-b border-[#EADBCE]">
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
            <span>☕ Café Counter Script</span>
          </button>

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
            <span>Home Barista Recipe</span>
          </button>
        </div>

        {/* Tab 1: Café Counter Script (with Add-on Customizations from Image 3 & 2) */}
        {activeRecipeTab === 'cafe' && (
          <div className="p-4 sm:p-5 space-y-4 animate-fadeIn">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-[#78350F] uppercase tracking-wider">
                  Ready to Order at the Counter
                </span>
                <span className="text-xs font-extrabold text-[#92400E] bg-[#FEF3C7] px-2.5 py-0.5 rounded-full border border-[#FDE68A]">
                  Est. Total: ₹{calculatedPrice}
                </span>
              </div>
              <p className="text-xs text-[#7D6354] leading-relaxed">
                Show or read this authentic barista order script calibrated directly for this café’s menu:
              </p>
            </div>

            {/* Script Speech Bubble */}
            <div className="bg-[#FAF3EB] border border-[#E8D5C4] rounded-2xl p-4 relative shadow-2xs">
              <p className="font-heading font-medium text-sm sm:text-base text-[#2B1810] italic leading-relaxed">
                {dynamicCafeScript}
              </p>
            </div>

            {/* Quick Copy Button */}
            <button
              type="button"
              onClick={handleCopyScript}
              className="w-full py-2.5 px-4 rounded-xl bg-[#78350F] hover:bg-[#5C270A] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-[0.99]"
            >
              {copiedScript ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedScript ? 'Order Script Copied to Clipboard!' : 'Copy Script for Barista'}</span>
            </button>

            {/* In-Menu Customizations (Images 2 & 3: Decaf +₹50, Alt Milk +₹80, Protein +₹120, etc.) */}
            <div className="border-t border-[#F0E4D5] pt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#2B1810] flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5 text-[#C05621]" />
                  <span>Customize Your Espresso (Official Menu Add-ons):</span>
                </span>
                <span className="text-[11px] text-[#8C7265]">Tap to include</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ESPRESSO_CUSTOMIZATIONS.map(custom => {
                  const isChecked = !!selectedAddons[custom.id];
                  return (
                    <button
                      key={custom.id}
                      type="button"
                      onClick={() => toggleAddon(custom.id)}
                      className={`p-2 rounded-xl text-left border transition-all text-xs cursor-pointer flex flex-col justify-between ${
                        isChecked
                          ? 'bg-[#FEF3C7] border-[#F59E0B] text-[#78350F] shadow-2xs'
                          : 'bg-white hover:bg-[#FAF4EC] border-[#E8D5C4] text-[#5C381E]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="font-medium text-[11px] leading-tight line-clamp-2">
                          {custom.name}
                        </span>
                        {isChecked && <Check className="w-3.5 h-3.5 text-[#B45309] shrink-0" />}
                      </div>
                      <span className="font-bold text-[11px] text-[#C05621] mt-1">
                        {custom.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Home Brewer Recipe */}
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

            {/* Ingredients breakdown */}
            <div>
              <h3 className="font-heading font-bold text-sm text-[#2B1810] mb-2">
                Ingredients & Layer Breakdown:
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
                  <span>• <strong>Flavour Infusion:</strong> {ingredients.flavour?.name}</span>
                  <span className="font-bold text-[#8C4A27]">{ingredients.flavour?.measure}</span>
                </li>
                <li className="flex items-center justify-between py-1">
                  <span>• <strong>Garnish / Foam:</strong> {ingredients.topping?.name}</span>
                  <span className="font-bold text-[#8C4A27]">{ingredients.topping?.measure}</span>
                </li>
              </ul>
            </div>

            {/* Step-by-step instructions */}
            <div>
              <h3 className="font-heading font-bold text-sm text-[#2B1810] mb-2">
                Step-by-Step Preparation:
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
      </div>

      {/* EXPLORE THE FULL CAFÉ MENU SECTION (Collapsible / Interactive Browser) */}
      <div className="bg-[#FFFDF9] rounded-2xl border border-[#EADBCE] p-4 sm:p-5 mb-5 shadow-xs text-left">
        <button
          type="button"
          onClick={() => {
            playPop();
            setShowFullMenu(!showFullMenu);
          }}
          className="w-full flex items-center justify-between text-left cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FEF3C7] flex items-center justify-center text-[#92400E]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-[#2B1810] group-hover:text-[#78350F] transition-colors">
                Explore The Full Café Menu
              </h3>
              <p className="text-xs text-[#7D6354]">
                Browse all physical menu categories & tap any drink to reveal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#78350F]">
            <span>{showFullMenu ? 'Hide Menu' : 'View Menu (46 items)'}</span>
            {showFullMenu ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showFullMenu && (
          <div className="mt-4 pt-4 border-t border-[#F0E4D5] animate-fadeIn space-y-4">
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              <button
                type="button"
                onClick={() => {
                  playPop();
                  setActiveMenuCategory('all');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  activeMenuCategory === 'all'
                    ? 'bg-[#78350F] text-white shadow-2xs'
                    : 'bg-[#F5ECE1] text-[#78350F] hover:bg-[#EADBCE]'
                }`}
              >
                All Categories
              </button>

              {CAFE_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    playPop();
                    setActiveMenuCategory(cat.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1 ${
                    activeMenuCategory === cat.id
                      ? 'bg-[#78350F] text-white shadow-2xs'
                      : 'bg-[#F5ECE1] text-[#78350F] hover:bg-[#EADBCE]'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Special Section Highlights based on Category */}
            {/* 1. Classic Coffees Visual Legend (Image 3) */}
            {(activeMenuCategory === 'all' || activeMenuCategory === 'classic_coffees') && (
              <div className="bg-[#FAF5EE] rounded-xl p-3 border border-[#E5D2BC]">
                <div className="text-[11px] font-bold text-[#78350F] uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>Espresso Based Recipe Legend</span>
                  <span className="text-[10px] text-[#A89082]">From physical menu</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#5C381E]">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#382216]"></span> Espresso</span>
                  <span>|</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#38BDF8]"></span> Water</span>
                  <span>|</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#E5D5C5]"></span> Steamed Milk</span>
                  <span>|</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#FAF5EE] border border-[#DAC7B5]"></span> Milk Foam</span>
                  <span>|</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#58240D]"></span> Chocolate</span>
                </div>
              </div>
            )}

            {/* 2. Manual Brew Fruity to Intense Spectrum (Image 3) */}
            {(activeMenuCategory === 'all' || activeMenuCategory === 'manual_brew') && (
              <div className="bg-[#FAF5EE] rounded-xl p-3 border border-[#E5D2BC]">
                <div className="text-[11px] font-bold text-[#78350F] uppercase tracking-wider mb-1">
                  Manual Brew Extraction Spectrum
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold text-[#C05621] mb-1">
                  <span>← Fruity Clarity</span>
                  <span>Rich Intensity →</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 text-center text-[11px]">
                  {MANUAL_BREW_METHODS.map(m => (
                    <div key={m.id} className="p-1.5 rounded-lg bg-white border border-[#E5D2BC] text-[#5C381E]">
                      <div className="font-bold text-[#78350F]">{m.name}</div>
                      <div className="text-[9px] text-[#8C7265] leading-tight">{m.style}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-[#E8DACB] flex flex-wrap gap-2 text-[11px]">
                  {MANUAL_BREW_PRICING.map(p => (
                    <span key={p.name} className="px-2 py-0.5 rounded bg-white text-[#78350F] font-semibold border border-[#E5D2BC]">
                      {p.name}: <strong>{p.price}</strong>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Protein Menu Banner (Image 2) */}
            {(activeMenuCategory === 'all' || activeMenuCategory === 'protein_menu') && (
              <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 flex items-center justify-between">
                <span>💪 <strong>Protein Add-On:</strong> Add 20g clean protein to any drink</span>
                <span className="font-bold text-blue-800 bg-white px-2 py-0.5 rounded-md border border-blue-200">
                  +₹120 (79 kcal)
                </span>
              </div>
            )}

            {/* Drink Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[460px] overflow-y-auto pr-1">
              {filteredMenuItems.map(item => {
                const isSelected = activeItem.id === item.id;
                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-xl border transition-all text-left flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#FEF3C7] border-[#F59E0B] ring-2 ring-[#F59E0B]/30'
                        : 'bg-white hover:bg-[#FAF8F5] border-[#E8D5C4]'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <h4 className="font-heading font-bold text-sm text-[#2B1810]">
                          {item.name}
                        </h4>
                        <span className="font-extrabold text-xs text-[#92400E] shrink-0">
                          {item.price}
                        </span>
                      </div>

                      <p className="text-[11px] text-[#6C5346] line-clamp-2 mb-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#F5ECE1]">
                      <div className="flex flex-wrap gap-1 text-[10px]">
                        {item.calories && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                            {item.calories}
                          </span>
                        )}
                        {item.dietary?.includes('vegan') && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                            🌱 Vegan
                          </span>
                        )}
                        {item.dietary?.includes('vo') && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                            🥛 VO
                          </span>
                        )}
                        {item.dietary?.includes('nut') && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 font-semibold">
                            🥜 Nut
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSelectMenuItem(item)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                          isSelected
                            ? 'bg-[#78350F] text-white shadow-2xs'
                            : 'bg-[#F5ECE1] hover:bg-[#78350F] text-[#78350F] hover:text-white'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Revealed</span>
                          </>
                        ) : (
                          <>
                            <span>Select</span>
                            <ArrowRight className="w-3 h-3" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* "Try a Variation" Section (PRD Section 6.6) */}
      <div className="bg-white/90 rounded-2xl border border-[#EADBCE] p-4 mb-5 shadow-xs text-left">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#78350F] mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-[#C05621]" />
          <span>Try a Variation (swaps to relevant menu drink):</span>
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
          Does this menu recommendation fit you?
        </h3>
        {feedbackGiven ? (
          <p className="text-xs text-emerald-700 font-semibold animate-fadeIn mt-1">
            {feedbackGiven === 'positive'
              ? '✨ Thank you! We have tuned our aroma weights.'
              : '🙏 Thanks for your feedback! Try tapping "Explore Full Café Menu" above to pick your ideal brew.'}
          </p>
        ) : (
          <div className="flex items-center justify-center gap-3 mt-2">
            <button
              type="button"
              onClick={() => handleFeedback('positive')}
              className="px-4 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all active:scale-95"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Spot on!</span>
            </button>
            <button
              type="button"
              onClick={() => handleFeedback('negative')}
              className="px-4 py-1.5 rounded-xl bg-white hover:bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200 flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all active:scale-95"
            >
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>Try another</span>
            </button>
          </div>
        )}
      </div>

      {/* Optional Email Capture with GDPR / DPDP Consent (PRD Section 6.6 & 10) */}
      <div className="bg-white rounded-2xl border border-[#EADBCE] p-4 text-left shadow-xs">
        <div className="flex items-center gap-2 mb-1.5">
          <Mail className="w-4 h-4 text-[#C05621]" />
          <h3 className="font-heading font-bold text-sm text-[#2B1810]">
            Send me my recipe card & café discount
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
          result={currentReveal}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
}
