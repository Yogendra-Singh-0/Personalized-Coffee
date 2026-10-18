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
import { ScrollReveal3D, Tilt3D } from './ScrollReveal3D';
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
        customs.push(c);
      }
    });

    return { calculatedPrice: base, customizationList: customs };
  }, [activeItem, selectedAddons]);

  // Generate dynamic barista script with natural phrasing for customizations
  const dynamicCafeScript = useMemo(() => {
    const defaultScript =
      activeItem.cafeScript ||
      recipe.cafeScript ||
      `“Hi! Could I please get the ${activeItem.name}, please?”`;

    if (customizationList.length === 0) {
      return defaultScript;
    }

    const phrases = customizationList.map(c => c.scriptPhrase || c.title || c.name);
    let joined = '';
    if (phrases.length === 1) {
      joined = phrases[0];
    } else if (phrases.length === 2) {
      joined = `${phrases[0]} and ${phrases[1]}`;
    } else {
      joined = `${phrases.slice(0, -1).join(', ')}, and ${phrases[phrases.length - 1]}`;
    }

    const trimmed = defaultScript.trim();
    if (trimmed.endsWith('?”') || trimmed.endsWith('?')) {
      return trimmed.replace(/\?["”]?$/, `, with ${joined}, please?”`);
    } else if (trimmed.endsWith('!”') || trimmed.endsWith('!')) {
      return trimmed.replace(/!["”]?$/, `, with ${joined}, please!”`);
    } else if (trimmed.endsWith('”') || trimmed.endsWith('"')) {
      return trimmed.replace(/["”]$/, `, with ${joined}, please!”`);
    }
    return `“Hi! Could I please get the ${activeItem.name} with ${joined}, please?”`;
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
    <div className="max-w-xl mx-auto px-4 py-4 md:py-8 animate-fadeIn pb-20 w-full overflow-x-hidden">
      
      {/* Top Header: Persona + Café Menu Badge */}
      <ScrollReveal3D direction="down" duration={650} delay={0}>
        <div className="text-center mb-3">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
            {/* Persona Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-xs font-bold tracking-wider uppercase shadow-2xs card-3d">
              <span>{persona.emoji}</span>
              <span>{persona.badge}</span>
            </div>

            {/* Authentic Menu Category & Price Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E6] border border-[#E5D2BC] text-[#78350F] text-xs font-bold tracking-wide card-3d">
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
          <div className="mt-3 px-4 py-2.5 rounded-xl bg-[#FFF8EE] border border-[#ECD9C6] max-w-md mx-auto card-3d">
            <p className="text-xs sm:text-sm text-[#7D5A44] italic font-medium">
              "{activeItem.description}"
            </p>
          </div>
        </div>
      </ScrollReveal3D>

      {/* Layered Cup Illustration with 3D Pop entrance and Interactive Tilt */}
      <ScrollReveal3D direction="pop" duration={800} delay={80}>
        <div className="my-3 relative flex flex-col items-center justify-center w-full overflow-visible">
          <div className="w-64 h-64 rounded-full bg-radial from-[#FDE68A]/35 to-transparent absolute inset-0 m-auto filter blur-xl -z-10 pointer-events-none" />
          <LayeredCupGraphic ingredients={ingredients} isIced={isIced} size="large" />
        </div>
      </ScrollReveal3D>

      {/* "Why this coffee fits you" Story Card (PRD Section 6.4) */}
      <ScrollReveal3D direction="up" duration={700} delay={120} distance={30}>
        <div className="bg-[#FFFDF9] rounded-2xl border border-[#EADBCE] p-4 sm:p-5 mb-5 shadow-xs text-left card-3d">
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
      </ScrollReveal3D>

      {/* Flavour Profile Meter (PRD Section 6.4) */}
      <ScrollReveal3D direction="up" duration={700} delay={160} distance={30}>
        <div className="bg-[#FFFDF9] rounded-2xl border border-[#EADBCE] p-4 sm:p-5 mb-5 shadow-xs text-left card-3d">
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
                    className={`h-full ${bar.color} rounded-full transition-all duration-700 ease-out`}
                    style={{ width: `${bar.val * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal3D>

      {/* DUAL VIEW SECTION: ☕ Café Counter Script vs 🏠 Home Brewer Recipe */}
      <ScrollReveal3D direction="up" duration={750} delay={200} distance={35}>
        <div className="bg-[#FFFDF9] rounded-2xl border border-[#EADBCE] overflow-hidden shadow-xs mb-5 text-left card-3d">
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
              {/* Header with Icon and Live Estimated Total */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-[#F0E4D5]">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-[#FAF0E6] border border-[#E5D2BC] text-[#78350F] flex items-center justify-center text-sm shadow-2xs shrink-0 card-3d">
                    ☕
                  </span>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#2B1810] tracking-wide uppercase">
                      Ready to Order at the Counter
                    </h3>
                    <p className="text-[11px] text-[#7D6354]">
                      Authentic barista script tailored for this café’s menu
                    </p>
                  </div>
                </div>

                {/* Dynamic Estimated Total Pill */}
                <div className="flex items-center sm:flex-col sm:items-end justify-between bg-[#FEF3C7] sm:bg-transparent px-3 py-1.5 sm:p-0 rounded-xl border border-[#FDE68A] sm:border-0 shrink-0">
                  <span className="text-[10px] font-bold text-[#8C7265] uppercase tracking-wider">
                    Est. Total
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-[#92400E]">
                    ₹{calculatedPrice}
                  </span>
                </div>
              </div>

              {/* Script Speech Card with Integrated Action */}
              <Tilt3D maxTilt={5} scale={1.01} glare={true} className="w-full">
                <div className="relative rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EB] to-[#F5ECE1] border border-[#E4D1BF] shadow-xs group transition-all">
                  {/* Header inside script bubble */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/90 border border-[#E8D5C4] text-[10px] font-bold text-[#78350F] uppercase tracking-wider shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C05621] animate-pulse" />
                      <span>Say this to the Barista</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyScript}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95 shrink-0 ${
                        copiedScript
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#78350F] hover:bg-[#5C270A] text-white'
                      }`}
                      title="Copy script to clipboard"
                    >
                      {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedScript ? 'Copied!' : 'Copy Script'}</span>
                    </button>
                  </div>

                  {/* Spoken Quote */}
                  <p className="font-heading font-medium text-base sm:text-lg text-[#2B1810] italic leading-relaxed sm:leading-loose">
                    {dynamicCafeScript}
                  </p>

                  {/* Helpful footer inside bubble */}
                  <div className="mt-3.5 pt-2.5 border-t border-[#E8D5C4]/70 flex flex-wrap items-center justify-between gap-1 text-[11px] text-[#8C7265]">
                    <span className="flex items-center gap-1">
                      <span>💡</span>
                      <span>Show screen or read aloud directly at the counter</span>
                    </span>
                    <span className="font-semibold text-[#78350F]">
                      {activeItem.categoryName} • {activeItem.name}
                    </span>
                  </div>
                </div>
              </Tilt3D>

              {/* In-Menu Customizations (Decaf +₹50, Alt Milk +₹80, Protein +₹120, etc.) */}
              <div className="pt-1">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-[#C05621]" />
                    <span className="text-xs sm:text-sm font-bold text-[#2B1810]">
                      Customize Your Order (Café Add-ons)
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-[#8C7265] bg-[#F5ECE1] px-2.5 py-0.5 rounded-full">
                    Tap to add
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 w-full max-w-full">
                  {ESPRESSO_CUSTOMIZATIONS.map(custom => {
                    const isChecked = !!selectedAddons[custom.id];
                    return (
                      <button
                        key={custom.id}
                        type="button"
                        onClick={() => toggleAddon(custom.id)}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between min-h-[82px] card-3d ${
                          isChecked
                            ? 'bg-[#FEF3C7] border-[#D97706] shadow-xs ring-1 ring-[#D97706]/40'
                            : 'bg-white hover:bg-[#FAF4EC] border-[#E8D5C4] hover:border-[#D6BFA8]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1.5 w-full">
                          <div className="min-w-0 pr-1">
                            <div className="font-bold text-xs text-[#2B1810] leading-snug">
                              {custom.title || custom.name}
                            </div>
                            <div className="text-[11px] text-[#7D6354] leading-tight mt-0.5 line-clamp-1">
                              {custom.subtitle || custom.name}
                            </div>
                          </div>
                          <div
                            className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isChecked
                                ? 'bg-[#D97706] border-[#D97706] text-white'
                                : 'border-[#C8B3A0] bg-white'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>

                        <div className="mt-2.5 flex items-center justify-between">
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-md transition-colors ${
                              isChecked
                                ? 'bg-[#78350F] text-white'
                                : 'bg-[#F5ECE1] text-[#78350F]'
                            }`}
                          >
                            {custom.text}
                          </span>
                          {isChecked && (
                            <span className="text-[10px] font-medium text-[#92400E]">
                              Added to script
                            </span>
                          )}
                        </div>
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
      </ScrollReveal3D>

      {/* EXPLORE THE FULL CAFÉ MENU SECTION (Collapsible / Interactive Browser) */}
      <ScrollReveal3D direction="up" duration={750} delay={240} distance={35}>
        <div className="bg-[#FFFDF9] rounded-2xl border border-[#EADBCE] p-3.5 sm:p-5 mb-5 shadow-xs text-left w-full max-w-full overflow-hidden card-3d">
          <button
            type="button"
            onClick={() => {
              playPop();
              setShowFullMenu(!showFullMenu);
            }}
            className="w-full flex items-center justify-between text-left cursor-pointer group gap-2"
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-xl bg-[#FEF3C7] flex items-center justify-center text-[#92400E] shrink-0 card-3d">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-heading font-bold text-sm sm:text-base text-[#2B1810] group-hover:text-[#78350F] transition-colors truncate">
                  Explore The Full Café Menu
                </h3>
                <p className="text-xs text-[#7D6354] line-clamp-1">
                  Browse all physical menu categories & tap any drink to reveal
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-[#78350F] shrink-0">
              <span className="hidden sm:inline">{showFullMenu ? 'Hide Menu' : `View Menu (${CAFE_MENU_ITEMS.length} drinks)`}</span>
              <span className="sm:hidden">{showFullMenu ? 'Hide' : `View (${CAFE_MENU_ITEMS.length})`}</span>
              {showFullMenu ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {showFullMenu && (
            <div className="mt-4 pt-4 border-t border-[#F0E4D5] animate-fadeIn space-y-4 w-full max-w-full min-w-0">
              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none w-full max-w-full touch-pan-x">
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
                <div className="bg-[#FAF5EE] rounded-xl p-3 border border-[#E5D2BC] w-full max-w-full overflow-hidden">
                  <div className="text-[11px] font-bold text-[#78350F] uppercase tracking-wider mb-1.5 flex flex-wrap items-center justify-between gap-1">
                    <span>Espresso Based Recipe Legend</span>
                    <span className="text-[10px] text-[#A89082]">From physical menu</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs font-semibold text-[#5C381E]">
                    <span className="inline-flex items-center gap-1 shrink-0"><span className="w-2 h-2 rounded-full bg-[#382216]"></span> Espresso</span>
                    <span className="text-[#DAC7B5]">•</span>
                    <span className="inline-flex items-center gap-1 shrink-0"><span className="w-2 h-2 rounded-full bg-[#38BDF8]"></span> Water</span>
                    <span className="text-[#DAC7B5]">•</span>
                    <span className="inline-flex items-center gap-1 shrink-0"><span className="w-2 h-2 rounded-full bg-[#E5D5C5]"></span> Steamed Milk</span>
                    <span className="text-[#DAC7B5]">•</span>
                    <span className="inline-flex items-center gap-1 shrink-0"><span className="w-2 h-2 rounded-full bg-[#FAF5EE] border border-[#DAC7B5]"></span> Milk Foam</span>
                    <span className="text-[#DAC7B5]">•</span>
                    <span className="inline-flex items-center gap-1 shrink-0"><span className="w-2 h-2 rounded-full bg-[#58240D]"></span> Chocolate</span>
                  </div>
                </div>
              )}

              {/* 2. Manual Brew Fruity to Intense Spectrum (Image 3) */}
              {(activeMenuCategory === 'all' || activeMenuCategory === 'manual_brew') && (
                <div className="bg-[#FAF5EE] rounded-xl p-3 border border-[#E5D2BC] w-full max-w-full overflow-hidden">
                  <div className="text-[11px] font-bold text-[#78350F] uppercase tracking-wider mb-1">
                    Manual Brew Extraction Spectrum
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#C05621] mb-2">
                    <span>← Fruity Clarity</span>
                    <span>Rich Intensity →</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5 text-center text-[11px] w-full max-w-full">
                    {MANUAL_BREW_METHODS.map(m => (
                      <div key={m.id} className="p-2 sm:p-1.5 rounded-lg bg-white border border-[#E5D2BC] text-[#5C381E] min-w-0 card-3d">
                        <div className="font-bold text-[#78350F] truncate">{m.name}</div>
                        <div className="text-[9px] text-[#8C7265] leading-tight mt-0.5 line-clamp-2">{m.style}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-[#E8DACB] flex flex-wrap gap-1.5 text-[11px] w-full max-w-full">
                    {MANUAL_BREW_PRICING.map(p => (
                      <span key={p.name} className="px-2 py-0.5 rounded bg-white text-[#78350F] font-semibold border border-[#E5D2BC] shrink-0 text-[10px] sm:text-[11px]">
                        {p.name}: <strong>{p.price}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Protein Menu Banner (Image 2) */}
              {(activeMenuCategory === 'all' || activeMenuCategory === 'protein_menu') && (
                <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 flex flex-wrap items-center justify-between gap-2 w-full max-w-full">
                  <span className="flex-1 min-w-[200px]">💪 <strong>Protein Add-On:</strong> Add 20g clean protein to any drink</span>
                  <span className="font-bold text-blue-800 bg-white px-2 py-0.5 rounded-md border border-blue-200 shrink-0 text-xs">
                    +₹120 (79 kcal)
                  </span>
                </div>
              )}

              {/* Drink Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[460px] overflow-y-auto pr-1 w-full max-w-full">
                {filteredMenuItems.map(item => {
                  const isSelected = activeItem.id === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`p-3 rounded-xl border transition-all text-left flex flex-col justify-between min-w-0 w-full card-3d ${
                        isSelected
                          ? 'bg-[#FEF3C7] border-[#F59E0B] ring-2 ring-[#F59E0B]/30'
                          : 'bg-white hover:bg-[#FAF8F5] border-[#E8D5C4]'
                      }`}
                    >
                      <div className="min-w-0 w-full">
                        <div className="flex items-start justify-between gap-1 mb-1">
                          <h4 className="font-heading font-bold text-sm text-[#2B1810] break-words flex-1 min-w-0 pr-1">
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

                      <div className="flex items-center justify-between pt-2 border-t border-[#F5ECE1] gap-1.5 flex-wrap">
                        <div className="flex flex-wrap gap-1 text-[10px] min-w-0 flex-1">
                          {item.calories && (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold shrink-0">
                              {item.calories}
                            </span>
                          )}
                          {item.dietary?.includes('vegan') && (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold shrink-0">
                              🌱 Vegan
                            </span>
                          )}
                          {item.dietary?.includes('vo') && (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold shrink-0">
                              🥛 VO
                            </span>
                          )}
                          {item.dietary?.includes('nut') && (
                            <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 font-semibold shrink-0">
                              🥜 Nut
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleSelectMenuItem(item)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
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
      </ScrollReveal3D>

      {/* "Try a Variation" Section (PRD Section 6.6) */}
      <ScrollReveal3D direction="up" duration={750} delay={280} distance={35}>
        <div className="bg-white/90 rounded-2xl border border-[#EADBCE] p-4 mb-5 shadow-xs text-left card-3d">
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
              className="px-3 py-1.5 rounded-xl bg-[#FAF3EB] hover:bg-[#F3E7D8] text-[#78350F] text-xs font-semibold border border-[#E5D2BC] flex items-center gap-1 transition-all cursor-pointer card-3d active:scale-95"
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
              className="px-3 py-1.5 rounded-xl bg-[#FAF3EB] hover:bg-[#F3E7D8] text-[#78350F] text-xs font-semibold border border-[#E5D2BC] flex items-center gap-1 transition-all cursor-pointer card-3d active:scale-95"
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
              className="px-3 py-1.5 rounded-xl bg-[#FAF3EB] hover:bg-[#F3E7D8] text-[#78350F] text-xs font-semibold border border-[#E5D2BC] flex items-center gap-1 transition-all cursor-pointer card-3d active:scale-95"
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
              className="px-3 py-1.5 rounded-xl bg-[#FAF3EB] hover:bg-[#F3E7D8] text-[#78350F] text-xs font-semibold border border-[#E5D2BC] flex items-center gap-1 transition-all cursor-pointer card-3d active:scale-95"
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
              className="px-3 py-1.5 rounded-xl bg-[#FAF3EB] hover:bg-[#F3E7D8] text-[#78350F] text-xs font-semibold border border-[#E5D2BC] flex items-center gap-1 transition-all cursor-pointer card-3d active:scale-95"
            >
              <span>🕊️ Mellow Decaf</span>
            </button>
          </div>
        </div>
      </ScrollReveal3D>

      {/* Primary Actions: Share Card & Print */}
      <ScrollReveal3D direction="up" duration={750} delay={320} distance={35}>
        <div className="space-y-2.5 mb-6">
          <button
            type="button"
            onClick={() => {
              playPop();
              setShowShareModal(true);
            }}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#78350F] to-[#B45309] hover:from-[#5C270A] hover:to-[#92400E] text-white font-heading font-bold text-base shadow-lg shadow-[#78350F]/25 hover:shadow-xl transition-all btn-3d flex items-center justify-center gap-2 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Coffee Persona Card</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#FAF4EC] text-[#78350F] text-xs font-semibold border border-[#E2D2C2] flex items-center justify-center gap-1.5 transition-all cursor-pointer card-3d"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Save / Print Recipe</span>
            </button>

            <button
              type="button"
              onClick={onRetakeQuiz}
              className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#FAF4EC] text-[#78350F] text-xs font-semibold border border-[#E2D2C2] flex items-center justify-center gap-1.5 transition-all cursor-pointer card-3d"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>
      </ScrollReveal3D>

      {/* Result Satisfaction Feedback Widget (PRD Section 12: result_satisfaction) */}
      <ScrollReveal3D direction="up" duration={750} delay={360} distance={35}>
        <div className="bg-[#FAF3EB] rounded-2xl border border-[#EADBCE] p-4 text-center mb-5 card-3d">
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
                className="px-4 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all card-3d active:scale-95"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Spot on!</span>
              </button>
              <button
                type="button"
                onClick={() => handleFeedback('negative')}
                className="px-4 py-1.5 rounded-xl bg-white hover:bg-rose-50 text-rose-700 text-xs font-semibold border border-rose-200 flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all card-3d active:scale-95"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
                <span>Try another</span>
              </button>
            </div>
          )}
        </div>
      </ScrollReveal3D>

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
