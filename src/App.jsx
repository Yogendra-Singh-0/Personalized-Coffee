import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingScreen from './components/LandingScreen';
import QuizScreen from './components/QuizScreen';
import IngredientSuggestionScreen from './components/IngredientSuggestionScreen';
import BrewingAnimationScreen from './components/BrewingAnimationScreen';
import CoffeeRevealScreen from './components/CoffeeRevealScreen';
import {
  calculateTasteProfile,
  recommendIngredients,
  generateCoffeeReveal,
  applyVariation
} from './utils/recommendationEngine';
import { PERSONAS } from './data/personasData';
import { INGREDIENTS_CATALOG } from './data/ingredientsData';

export default function App() {
  const [screen, setScreen] = useState('landing'); // 'landing' | 'quiz' | 'ingredients' | 'brewing' | 'reveal'
  const [userName, setUserName] = useState('');
  const [answers, setAnswers] = useState({});
  const [dietaryFilters, setDietaryFilters] = useState({
    vegan: false,
    lactoseFree: false,
    sugarFree: false,
    caffeineFree: false
  });
  const [customIngredients, setCustomIngredients] = useState(null);
  const [revealData, setRevealData] = useState(null);

  // Restore session state or check for shared URL parameters on initial load
  useEffect(() => {
    // 1. Check URL parameters for shared results (PRD Section 6.5)
    try {
      const params = new URLSearchParams(window.location.search);
      const sharedPersonaId = params.get('persona');
      if (sharedPersonaId) {
        const foundPersona = PERSONAS.find(p => p.id === sharedPersonaId);
        if (foundPersona) {
          const sharedName = params.get('name') || '';
          const baseId = params.get('base') || 'espresso_double';
          const milkId = params.get('milk') || 'barista_oat';
          const sweetId = params.get('sweet') || 'brown_sugar_demerara';
          const flavId = params.get('flav') || 'ceylon_cinnamon';
          const topId = params.get('top') || 'cinnamon_dust';

          const sharedIngredients = {
            base: INGREDIENTS_CATALOG.base.find(b => b.id === baseId) || INGREDIENTS_CATALOG.base[0],
            milk: INGREDIENTS_CATALOG.milk.find(m => m.id === milkId) || INGREDIENTS_CATALOG.milk[0],
            sweetener: INGREDIENTS_CATALOG.sweetener.find(s => s.id === sweetId) || INGREDIENTS_CATALOG.sweetener[0],
            flavour: INGREDIENTS_CATALOG.flavour.find(f => f.id === flavId) || INGREDIENTS_CATALOG.flavour[0],
            topping: INGREDIENTS_CATALOG.topping.find(t => t.id === topId) || INGREDIENTS_CATALOG.topping[0]
          };

          const reconstructed = generateCoffeeReveal({
            userName: sharedName,
            answers: {},
            dietaryFilters: {},
            customIngredients: sharedIngredients
          });
          reconstructed.persona = foundPersona;
          setRevealData(reconstructed);
          setUserName(sharedName);
          setScreen('reveal');
          return;
        }
      }
    } catch (e) {
      // Ignore URL parsing errors
    }

    // 2. Otherwise restore from sessionStorage (PRD Section 6.2)
    try {
      const savedAnswers = sessionStorage.getItem('siolim_answers') || sessionStorage.getItem('brewyou_answers');
      const savedName = sessionStorage.getItem('siolim_name') || sessionStorage.getItem('brewyou_name');
      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers));
      }
      if (savedName) {
        setUserName(savedName);
      }
    } catch (e) {
      // Ignore storage errors
    }
  }, []);

  // Sync answers and name to sessionStorage
  const handleAnswer = (questionId, optionId) => {
    setAnswers((prev) => {
      const updated = { ...prev, [questionId]: optionId };
      try {
        sessionStorage.setItem('siolim_answers', JSON.stringify(updated));
      } catch (e) { }
      return updated;
    });
  };

  const handleUpdateName = (name) => {
    setUserName(name);
    try {
      sessionStorage.setItem('siolim_name', name);
    } catch (e) { }
  };

  // Transition from Quiz to Ingredient Suggestion
  const handleQuizComplete = () => {
    const profile = calculateTasteProfile(answers, dietaryFilters);
    const persona = PERSONAS[0];
    const initialIngredients = recommendIngredients(profile, persona);
    setCustomIngredients(initialIngredients);
    setScreen('ingredients');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Swapping an ingredient in IngredientSuggestionScreen
  const handleUpdateIngredient = (categoryKey, newIngredient) => {
    setCustomIngredients((prev) => ({
      ...prev,
      [categoryKey]: newIngredient
    }));
  };

  // Toggle dietary filter
  const handleToggleDietaryFilter = (filterKey) => {
    const updatedFilters = {
      ...dietaryFilters,
      [filterKey]: !dietaryFilters[filterKey]
    };
    setDietaryFilters(updatedFilters);

    const profile = calculateTasteProfile(answers, updatedFilters);
    const persona = PERSONAS[0];
    const refreshedIngredients = recommendIngredients(profile, persona);
    setCustomIngredients(refreshedIngredients);
  };

  // Proceed to Brewing Animation
  const handleProceedToBrew = () => {
    setScreen('brewing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Brewing animation completes -> Reveal Screen
  const handleBrewingFinish = () => {
    const reveal = generateCoffeeReveal({
      userName,
      answers,
      dietaryFilters,
      customIngredients
    });

    setRevealData(reveal);
    setScreen('reveal');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update URL with shareable parameters (PRD Section 6.5)
    try {
      const params = new URLSearchParams();
      if (userName) params.set('name', userName);
      if (reveal.persona?.id) params.set('persona', reveal.persona.id);
      if (reveal.ingredients?.base?.id) params.set('base', reveal.ingredients.base.id);
      if (reveal.ingredients?.milk?.id) params.set('milk', reveal.ingredients.milk.id);
      if (reveal.ingredients?.sweetener?.id) params.set('sweet', reveal.ingredients.sweetener.id);
      if (reveal.ingredients?.flavour?.id) params.set('flav', reveal.ingredients.flavour.id);
      if (reveal.ingredients?.topping?.id) params.set('top', reveal.ingredients.topping.id);

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, '', newUrl);
    } catch (e) { }
  };

  // Variations Handler (PRD Section 6.6)
  const handleApplyVariation = (variationType) => {
    if (!revealData) return;
    const updated = applyVariation(revealData, variationType);
    setRevealData(updated);
  };

  // Restart / Reset
  const handleReset = () => {
    setAnswers({});
    setCustomIngredients(null);
    setRevealData(null);
    try {
      sessionStorage.removeItem('siolim_answers');
      sessionStorage.removeItem('brewyou_answers');
      window.history.replaceState({}, '', window.location.pathname);
    } catch (e) { }
    setScreen('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-[#2D1B13] w-full max-w-full overflow-x-hidden">
      <Navbar onReset={handleReset} showReset={screen !== 'landing'} />

      <main className="flex-1 flex flex-col justify-start w-full max-w-full overflow-x-hidden">
        {screen === 'landing' && (
          <LandingScreen
            userName={userName}
            setUserName={handleUpdateName}
            onStartQuiz={() => {
              setScreen('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {screen === 'quiz' && (
          <QuizScreen
            answers={answers}
            onAnswer={handleAnswer}
            onBack={() => setScreen('landing')}
            onComplete={handleQuizComplete}
          />
        )}

        {screen === 'ingredients' && customIngredients && (
          <IngredientSuggestionScreen
            ingredients={customIngredients}
            onUpdateIngredient={handleUpdateIngredient}
            dietaryFilters={dietaryFilters}
            onToggleDietaryFilter={handleToggleDietaryFilter}
            onProceedToBrew={handleProceedToBrew}
            onBackToQuiz={() => setScreen('quiz')}
          />
        )}

        {screen === 'brewing' && (
          <BrewingAnimationScreen
            userName={userName}
            ingredients={customIngredients}
            isIced={answers.temperature_preference === 'always_iced'}
            onFinish={handleBrewingFinish}
          />
        )}

        {screen === 'reveal' && revealData && (
          <CoffeeRevealScreen
            revealData={revealData}
            onApplyVariation={handleApplyVariation}
            onRetakeQuiz={handleReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-xs text-[#A89082] border-t border-[#EFE5D8]">
        <div className="max-w-xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <img
              src="/siolim-logo.svg"
              alt="Siolim Logo"
              className="w-6 h-6 object-contain"
            />
            <span className="font-semibold text-[#78350F]">siolim<span className="text-[#C05621]">.</span></span>
            <span>— Personalized Coffee Persona</span>
          </div>
          <span className="text-[11px] text-[#A89082]">
            Crafted for curious home brewers & café lovers
          </span>
        </div>
      </footer>
    </div>
  );
}
