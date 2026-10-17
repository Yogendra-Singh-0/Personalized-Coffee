// Pure logic recommendation engine driven by JSON configuration
// Aligned with PRD Section 7: Recommendation Logic & Quality Rules

import { INGREDIENTS_CATALOG } from '../data/ingredientsData';
import { PERSONAS } from '../data/personasData';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';

// Compatibility matrix to prevent unpalatable clashing combinations (PRD 7.4)
const INCOMPATIBLE_PAIRS = [
  // High citrus acidity with whole dairy milk curdles
  { categoryA: 'flavour', idA: 'citrus_zest_twist', categoryB: 'milk', idB: 'whole_dairy' }
];

export function calculateTasteProfile(answers, dietaryFilters = {}) {
  // Baseline profile vector
  const vector = {
    sweetness: 4,
    bitterness: 4,
    creaminess: 4,
    fruitiness: 2,
    spice: 3,
    caffeine: 5,
    adventurousness: 3
  };

  let temperature = 'flexible';
  let equipment = 'machine';
  const constraints = {
    vegan: !!dietaryFilters.vegan,
    lactoseFree: !!dietaryFilters.lactoseFree,
    sugarFree: !!dietaryFilters.sugarFree,
    caffeineFree: !!dietaryFilters.caffeineFree
  };

  // Tally weights from each answered question
  Object.entries(answers).forEach(([questionId, optionId]) => {
    const question = QUIZ_QUESTIONS.find(q => q.id === questionId);
    if (!question) return;

    const option = question.options.find(o => o.id === optionId);
    if (!option) return;

    if (option.weights) {
      Object.entries(option.weights).forEach(([dim, val]) => {
        if (vector[dim] !== undefined) {
          vector[dim] += val;
        }
      });
    }

    if (option.temperature) {
      temperature = option.temperature;
    }

    if (option.equipment) {
      equipment = option.equipment;
    }

    if (option.constraints) {
      if (option.constraints.vegan) constraints.vegan = true;
      if (option.constraints.lactoseFree) constraints.lactoseFree = true;
      if (option.constraints.lowCaffeine) constraints.caffeineFree = true;
      if (option.constraints.dairyFree) constraints.lactoseFree = true;
    }
  });

  // Clamp vector scores between 0 and 10
  const normalizedVector = {};
  Object.keys(vector).forEach(key => {
    normalizedVector[key] = Math.max(0, Math.min(10, Math.round(vector[key])));
  });

  return {
    vector: normalizedVector,
    temperature,
    equipment,
    constraints
  };
}

// Vector Euclidean distance
function calculateDistance(vecA, vecB) {
  let sum = 0;
  const keys = ['sweetness', 'bitterness', 'creaminess', 'fruitiness', 'spice', 'caffeine', 'adventurousness'];
  keys.forEach(k => {
    const diff = (vecA[k] || 0) - (vecB[k] || 0);
    sum += diff * diff;
  });
  return Math.sqrt(sum);
}

// Match closest persona cluster (PRD 7.3)
export function assignPersona(userVector) {
  let closestPersona = PERSONAS[0];
  let minDistance = Infinity;

  PERSONAS.forEach(persona => {
    const distance = calculateDistance(userVector, persona.vectorCenter);
    if (distance < minDistance) {
      minDistance = distance;
      closestPersona = persona;
    }
  });

  return closestPersona;
}

// Select optimal ingredients per category respecting constraints & taste scores (PRD 7.2)
export function recommendIngredients(profile, persona) {
  const { vector, temperature, equipment, constraints } = profile;
  const result = {};

  const categories = ['base', 'milk', 'sweetener', 'flavour', 'topping'];

  categories.forEach(cat => {
    let items = [...INGREDIENTS_CATALOG[cat]];

    // 1. Apply dietary filters
    if (constraints.vegan) {
      items = items.filter(item => item.dietary && item.dietary.includes('vegan'));
    }
    if (constraints.lactoseFree) {
      items = items.filter(item => item.dietary && item.dietary.includes('lactoseFree'));
    }
    if (constraints.sugarFree) {
      items = items.filter(item => item.dietary && item.dietary.includes('sugarFree'));
    }
    if (constraints.caffeineFree) {
      if (cat === 'base') {
        const decaf = items.find(i => i.id === 'decaf_espresso');
        if (decaf) items = [decaf];
      }
    }

    // 2. Fallback if filtered out completely
    if (items.length === 0) {
      items = [...INGREDIENTS_CATALOG[cat]];
    }

    // 3. Score and rank items
    items.sort((a, b) => {
      let scoreA = -calculateDistance(vector, a.vector);
      let scoreB = -calculateDistance(vector, b.vector);

      // Temperature bonuses
      if (cat === 'base') {
        if (temperature === 'iced' && a.id === 'cold_brew') scoreA += 5;
        if (temperature === 'iced' && b.id === 'cold_brew') scoreB += 5;
        if (temperature === 'hot' && a.id === 'cold_brew') scoreA -= 5;
        if (temperature === 'hot' && b.id === 'cold_brew') scoreB -= 5;
        
        // Equipment bonuses
        if (equipment === 'manual' && a.id === 'moka_french_press') scoreA += 4;
        if (equipment === 'manual' && b.id === 'moka_french_press') scoreB += 4;
      }

      if (cat === 'milk' && vector.creaminess < 2) {
        if (a.id === 'no_milk_water') scoreA += 10;
        if (b.id === 'no_milk_water') scoreB += 10;
      }

      if (cat === 'sweetener' && vector.sweetness < 2) {
        if (a.id === 'no_sweetener') scoreA += 10;
        if (b.id === 'no_sweetener') scoreB += 10;
      }

      return scoreB - scoreA;
    });

    result[cat] = items[0];
  });

  // Quality Rules (PRD 7.4): compatibility check
  INCOMPATIBLE_PAIRS.forEach(rule => {
    if (result[rule.categoryA]?.id === rule.idA && result[rule.categoryB]?.id === rule.idB) {
      // Swap out the clashing milk or flavour to safe alternative
      const safeMilk = INGREDIENTS_CATALOG.milk.find(m => m.id === 'barista_oat' || m.id === 'no_milk_water');
      if (safeMilk) result.milk = safeMilk;
    }
  });

  return result;
}

// Generate the complete recipe and persona reveal object (PRD 6.4)
export function generateCoffeeReveal({ userName, answers, dietaryFilters = {}, customIngredients = null }) {
  const profile = calculateTasteProfile(answers, dietaryFilters);
  const persona = assignPersona(profile.vector);
  const ingredients = customIngredients || recommendIngredients(profile, persona);

  // Dynamic Coffee Name
  const cleanName = (userName && userName.trim()) ? userName.trim() : '';
  let coffeeName = persona.defaultName;

  if (cleanName) {
    coffeeName = persona.nameTemplates[0].replace('{name}', cleanName);
  } else {
    coffeeName = persona.defaultName;
  }

  // Visual meter data (Section 6.4: sweetness, bitterness, creaminess, strength, fruitiness/warmth)
  const flavourProfile = {
    sweetness: Math.min(10, Math.max(1, Math.round((profile.vector.sweetness + ingredients.sweetener.vector.sweetness) / 1.7))),
    bitterness: Math.min(10, Math.max(1, Math.round((profile.vector.bitterness + ingredients.base.vector.bitterness) / 1.8))),
    creaminess: Math.min(10, Math.max(1, Math.round((profile.vector.creaminess + ingredients.milk.vector.creaminess) / 1.7))),
    spice: Math.min(10, Math.max(1, Math.round((profile.vector.spice + ingredients.flavour.vector.spice) / 1.7))),
    caffeine: Math.min(10, Math.max(1, Math.round((profile.vector.caffeine + ingredients.base.vector.caffeine) / 1.7)))
  };

  const steps = persona.homeBrewTemplate(profile.equipment, ingredients);
  const cafeScript = persona.cafeOrderScript(ingredients);
  const personaStory = persona.storyFormula(answers);

  return {
    id: `brew_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    userName: cleanName,
    coffeeName,
    persona,
    ingredients,
    flavourProfile,
    recipe: {
      servingTemp: profile.temperature === 'iced' ? 'Chilled (3°C / 37°F)' : 'Steaming Hot (65°C / 150°F)',
      prepTime: '3-4 mins',
      difficulty: 'Easy Barista Craft',
      steps,
      cafeScript
    },
    personaStory,
    profile,
    createdAt: new Date().toISOString()
  };
}

// "Try a variation" handler (PRD 6.6)
export function applyVariation(currentReveal, variationType) {
  const updated = JSON.parse(JSON.stringify(currentReveal));

  if (variationType === 'spicier') {
    updated.ingredients.flavour = INGREDIENTS_CATALOG.flavour.find(f => f.id === 'cardamom_crush') || updated.ingredients.flavour;
    updated.ingredients.topping = INGREDIENTS_CATALOG.topping.find(t => t.id === 'cinnamon_dust') || updated.ingredients.topping;
    updated.flavourProfile.spice = Math.min(10, updated.flavourProfile.spice + 3);
    updated.coffeeName = updated.coffeeName.includes('Spiced') ? updated.coffeeName : `Spiced ${updated.coffeeName}`;
  } else if (variationType === 'sweeter') {
    updated.ingredients.sweetener = INGREDIENTS_CATALOG.sweetener.find(s => s.id === 'madagascar_vanilla') || updated.ingredients.sweetener;
    updated.flavourProfile.sweetener = Math.min(10, updated.flavourProfile.sweetness + 3);
    updated.coffeeName = updated.coffeeName.includes('Sweet') ? updated.coffeeName : `Sweet ${updated.coffeeName}`;
  } else if (variationType === 'iced') {
    updated.ingredients.base = INGREDIENTS_CATALOG.base.find(b => b.id === 'cold_brew') || updated.ingredients.base;
    updated.ingredients.topping = INGREDIENTS_CATALOG.topping.find(t => t.id === 'vanilla_cold_foam') || updated.ingredients.topping;
    updated.recipe.servingTemp = 'Chilled over ice (3°C)';
    updated.coffeeName = updated.coffeeName.includes('Iced') ? updated.coffeeName : `Iced ${updated.coffeeName}`;
  } else if (variationType === 'turbo') {
    updated.ingredients.base = INGREDIENTS_CATALOG.base.find(b => b.id === 'espresso_double') || updated.ingredients.base;
    updated.flavourProfile.caffeine = 10;
    updated.coffeeName = `Turbo ${updated.coffeeName}`;
  } else if (variationType === 'decaf') {
    updated.ingredients.base = INGREDIENTS_CATALOG.base.find(b => b.id === 'decaf_espresso') || updated.ingredients.base;
    updated.flavourProfile.caffeine = 1;
    updated.coffeeName = `Mellow Decaf ${updated.coffeeName}`;
  }

  return updated;
}
