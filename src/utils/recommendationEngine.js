// Pure logic recommendation engine driven by JSON configuration
// Aligned with PRD Section 7: Recommendation Logic & Quality Rules
// Integrated with authentic in-house physical Café Menu

import { INGREDIENTS_CATALOG } from '../data/ingredientsData';
import { PERSONAS } from '../data/personasData';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { CAFE_MENU_ITEMS, matchDrinkFromMenu } from '../data/cafeMenuData';

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

// Convert Menu Item cup design to standard ingredients structure for LayeredCupGraphic
function createIngredientsFromMenuItem(menuItem) {
  const cd = menuItem.cupDesign || {};
  return {
    base: {
      id: `${menuItem.id}_base`,
      name: cd.baseName || menuItem.name,
      measure: menuItem.category === 'matcha_bar' ? '60 ml whisked' : menuItem.temp === 'Iced' ? '90 ml chilled' : '60 ml double shot',
      visualColor: cd.baseColor || '#382216',
      vector: menuItem.vector
    },
    milk: {
      id: `${menuItem.id}_milk`,
      name: cd.milkName || 'Steamed Milk',
      measure: cd.milkColor === 'transparent' ? 'None (Clean Pour)' : '140 ml microfoam',
      visualColor: cd.milkColor || '#F3EBD8',
      vector: menuItem.vector
    },
    sweetener: {
      id: `${menuItem.id}_sweet`,
      name: cd.flavourName || 'Natural Balance',
      measure: 'Carefully Balanced',
      visualColor: '#D97706',
      vector: menuItem.vector
    },
    flavour: {
      id: `${menuItem.id}_flavour`,
      name: cd.flavourName || 'In-House Extraction',
      measure: 'House Infusion',
      visualColor: cd.toppingColor || '#A0522D',
      vector: menuItem.vector
    },
    topping: {
      id: `${menuItem.id}_topping`,
      name: cd.toppingName || 'Artisanal Finish',
      measure: 'Barista Garnish',
      visualColor: cd.toppingColor || '#B85D32',
      vector: menuItem.vector
    }
  };
}

// Generate the complete recipe and persona reveal object (PRD 6.4)
export function generateCoffeeReveal({ userName, answers, dietaryFilters = {}, customIngredients = null }) {
  const profile = calculateTasteProfile(answers, dietaryFilters);
  const persona = assignPersona(profile.vector);

  // 1. Match authentic drink from the physical Café Menu
  const matchedMenuItem = matchDrinkFromMenu(
    persona.id,
    profile.vector,
    profile.constraints,
    profile.temperature
  );

  // 2. Ingredients setup
  const ingredients = customIngredients || createIngredientsFromMenuItem(matchedMenuItem);

  // 3. Dynamic Coffee Title
  const cleanName = (userName && userName.trim()) ? userName.trim() : '';
  const coffeeName = cleanName ? `${cleanName}'s ${matchedMenuItem.name}` : matchedMenuItem.name;

  // 4. Calibrate Flavour Profile Breakdown (1-10)
  const flavourProfile = {
    sweetness: Math.min(10, Math.max(1, Math.round(matchedMenuItem.vector.sweetness))),
    bitterness: Math.min(10, Math.max(1, Math.round(matchedMenuItem.vector.bitterness))),
    creaminess: Math.min(10, Math.max(1, Math.round(matchedMenuItem.vector.creaminess))),
    spice: Math.min(10, Math.max(1, Math.round(matchedMenuItem.vector.spice))),
    caffeine: Math.min(10, Math.max(1, Math.round(matchedMenuItem.vector.caffeine)))
  };

  const steps = matchedMenuItem.homeSteps || persona.homeBrewTemplate(profile.equipment, ingredients);
  const cafeScript = matchedMenuItem.cafeScript || persona.cafeOrderScript(ingredients);
  const personaStory = persona.storyFormula(answers);

  const isIcedDrink = matchedMenuItem.temp.toLowerCase().includes('iced') && !matchedMenuItem.temp.toLowerCase().includes('hot')
    ? true
    : profile.temperature === 'iced';

  return {
    id: `brew_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    userName: cleanName,
    coffeeName,
    matchedMenuItem,
    persona,
    ingredients,
    flavourProfile,
    recipe: {
      servingTemp: isIcedDrink ? 'Chilled over ice (3°C)' : 'Steaming Hot (65°C / 150°F)',
      prepTime: '3-4 mins',
      difficulty: 'Barista Craft',
      steps,
      cafeScript
    },
    personaStory,
    profile,
    createdAt: new Date().toISOString()
  };
}

// User selects any drink from the full menu browser
export function selectMenuItemForReveal(currentReveal, menuItem) {
  const updated = JSON.parse(JSON.stringify(currentReveal));
  const cleanName = currentReveal.userName || '';

  updated.matchedMenuItem = menuItem;
  updated.coffeeName = cleanName ? `${cleanName}'s ${menuItem.name}` : menuItem.name;
  updated.ingredients = createIngredientsFromMenuItem(menuItem);

  const isIcedDrink = menuItem.temp.toLowerCase().includes('iced') && !menuItem.temp.toLowerCase().includes('hot');

  updated.recipe = {
    ...updated.recipe,
    servingTemp: isIcedDrink ? 'Chilled over ice (3°C)' : 'Steaming Hot (65°C)',
    steps: menuItem.homeSteps || updated.recipe.steps,
    cafeScript: menuItem.cafeScript || updated.recipe.cafeScript
  };

  updated.flavourProfile = {
    sweetness: Math.min(10, Math.max(1, menuItem.vector.sweetness)),
    bitterness: Math.min(10, Math.max(1, menuItem.vector.bitterness)),
    creaminess: Math.min(10, Math.max(1, menuItem.vector.creaminess)),
    spice: Math.min(10, Math.max(1, menuItem.vector.spice)),
    caffeine: Math.min(10, Math.max(1, menuItem.vector.caffeine))
  };

  return updated;
}

// "Try a variation" handler mapped to menu drinks (PRD 6.6)
export function applyVariation(currentReveal, variationType) {
  const cleanName = currentReveal.userName || '';
  let targetMenuId = null;

  if (variationType === 'spicier') {
    targetMenuId = currentReveal.matchedMenuItem?.id === 'rose_cardamom_latte' ? 'guava_heatwave' : 'rose_cardamom_latte';
  } else if (variationType === 'sweeter') {
    targetMenuId = currentReveal.matchedMenuItem?.id === 'cloudy_caramel_latte' ? 'tiramisu_cortado' : 'cloudy_caramel_latte';
  } else if (variationType === 'iced') {
    targetMenuId = currentReveal.matchedMenuItem?.id === 'bourbon_whiskey' ? 'coconut_iced_coffee' : 'bourbon_whiskey';
  } else if (variationType === 'turbo') {
    targetMenuId = currentReveal.matchedMenuItem?.id === 'dirty_matcha' ? 'espresso_martini' : 'dirty_matcha';
  } else if (variationType === 'decaf') {
    targetMenuId = 'americano_classic';
  }

  const foundItem = CAFE_MENU_ITEMS.find(m => m.id === targetMenuId);
  if (foundItem) {
    return selectMenuItemForReveal(currentReveal, foundItem);
  }

  // Fallback to ingredient tweaking
  const updated = JSON.parse(JSON.stringify(currentReveal));
  if (variationType === 'spicier') {
    updated.flavourProfile.spice = Math.min(10, updated.flavourProfile.spice + 3);
    updated.coffeeName = `Spiced ${updated.coffeeName}`;
  } else if (variationType === 'sweeter') {
    updated.flavourProfile.sweetness = Math.min(10, updated.flavourProfile.sweetness + 3);
    updated.coffeeName = `Sweet ${updated.coffeeName}`;
  } else if (variationType === 'iced') {
    updated.recipe.servingTemp = 'Chilled over ice (3°C)';
    updated.coffeeName = `Iced ${updated.coffeeName}`;
  } else if (variationType === 'turbo') {
    updated.flavourProfile.caffeine = 10;
    updated.coffeeName = `Turbo ${updated.coffeeName}`;
  } else if (variationType === 'decaf') {
    updated.flavourProfile.caffeine = 1;
    updated.coffeeName = `Mellow Decaf ${updated.coffeeName}`;
  }

  return updated;
}
