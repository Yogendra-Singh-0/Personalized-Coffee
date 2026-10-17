// Comprehensive Ingredients Catalogue across 5 categories
// Aligned with PRD Section 6.3 & 7.2

export const INGREDIENTS_CATALOG = {
  base: [
    {
      id: 'espresso_double',
      category: 'base',
      name: 'Double Shot Espresso',
      measure: '60 ml (2 shots)',
      visualColor: '#382216',
      vector: { sweetness: 2, bitterness: 8, creaminess: 4, fruitiness: 3, spice: 2, caffeine: 8, adventurousness: 3 },
      dietary: ['vegan', 'lactoseFree', 'sugarFree', 'glutenFree'],
      temperature: 'hot',
      description: 'Rich, syrupy extraction with dense hazelnut crema.',
      rationale: 'Pairs with your productive drive and desire for authentic coffee depth.'
    },
    {
      id: 'cold_brew',
      category: 'base',
      name: 'Steeped Cold Brew',
      measure: '120 ml concentrate',
      visualColor: '#24150E',
      vector: { sweetness: 4, bitterness: 5, creaminess: 3, fruitiness: 4, spice: 1, caffeine: 7, adventurousness: 4 },
      dietary: ['vegan', 'lactoseFree', 'sugarFree', 'glutenFree'],
      temperature: 'iced',
      description: 'Slow-steeped for 18 hours, ultra-smooth and low in acidity.',
      rationale: 'Chosen for your love of refreshing chilled drinks and smooth body.'
    },
    {
      id: 'pour_over_filter',
      category: 'base',
      name: 'Single-Origin Pour-Over',
      measure: '180 ml clean brew',
      visualColor: '#5C381E',
      vector: { sweetness: 5, bitterness: 4, creaminess: 1, fruitiness: 8, spice: 2, caffeine: 6, adventurousness: 6 },
      dietary: ['vegan', 'lactoseFree', 'sugarFree', 'glutenFree'],
      temperature: 'hot',
      description: 'Delicate floral and berry notes extracted through paper filter.',
      rationale: 'Honors your appreciation for subtle fruity notes and mindful brewing.'
    },
    {
      id: 'moka_french_press',
      category: 'base',
      name: 'Moka Pot / Press Extraction',
      measure: '90 ml dense brew',
      visualColor: '#432616',
      vector: { sweetness: 2, bitterness: 7, creaminess: 3, fruitiness: 2, spice: 3, caffeine: 7, adventurousness: 4 },
      dietary: ['vegan', 'lactoseFree', 'sugarFree', 'glutenFree'],
      temperature: 'hot',
      description: 'Heavy body, tactile mouthfeel with rustic espresso intensity.',
      rationale: 'Matches your home brewing setup and love of full-bodied warmth.'
    },
    {
      id: 'decaf_espresso',
      category: 'base',
      name: 'Swiss Water Decaf Roast',
      measure: '60 ml (2 shots)',
      visualColor: '#4A2F1D',
      vector: { sweetness: 3, bitterness: 5, creaminess: 4, fruitiness: 4, spice: 2, caffeine: 1, adventurousness: 2 },
      dietary: ['vegan', 'lactoseFree', 'sugarFree', 'caffeineFree', 'glutenFree'],
      temperature: 'hot',
      description: '100% chemical-free decaffeination retaining full chocolate sweetness.',
      rationale: 'Tailored for your gentle caffeine preference so you can enjoy pure flavor anytime.'
    }
  ],

  milk: [
    {
      id: 'barista_oat',
      category: 'milk',
      name: 'Steamed Barista Oat Milk',
      measure: '140 ml silky microfoam',
      visualColor: '#F3EBD8',
      vector: { sweetness: 5, bitterness: 0, creaminess: 8, fruitiness: 1, spice: 3, caffeine: 0, adventurousness: 4 },
      dietary: ['vegan', 'lactoseFree', 'dairyFree'],
      description: 'Naturally sweet with toasty oat undertones and luxurious texture.',
      rationale: 'Provides a velvety, naturally sweet foam that cradles the coffee notes.'
    },
    {
      id: 'whole_dairy',
      category: 'milk',
      name: 'Farm Fresh Whole Milk',
      measure: '140 ml velvety foam',
      visualColor: '#FFFDF9',
      vector: { sweetness: 4, bitterness: 0, creaminess: 9, fruitiness: 0, spice: 0, caffeine: 0, adventurousness: 1 },
      dietary: ['glutenFree'],
      description: 'Classic rich creaminess that sweetens as it is steamed to 62°C.',
      rationale: 'Selected for that timeless, comforting coffeehouse body you love.'
    },
    {
      id: 'almond_milk',
      category: 'milk',
      name: 'Silky Roasted Almond Milk',
      measure: '130 ml light foam',
      visualColor: '#EFE7DA',
      vector: { sweetness: 3, bitterness: 1, creaminess: 6, fruitiness: 1, spice: 2, caffeine: 0, adventurousness: 5 },
      dietary: ['vegan', 'lactoseFree', 'dairyFree', 'glutenFree'],
      description: 'Nutty, light mouthfeel with toasted marzipan aromas.',
      rationale: 'Pairs seamlessly with your warm nutty flavor preferences.'
    },
    {
      id: 'coconut_cream_milk',
      category: 'milk',
      name: 'Coconut Cream Velvet',
      measure: '100 ml whipped foam',
      visualColor: '#FAF8F2',
      vector: { sweetness: 6, bitterness: 0, creaminess: 9, fruitiness: 4, spice: 1, caffeine: 0, adventurousness: 7 },
      dietary: ['vegan', 'lactoseFree', 'dairyFree', 'glutenFree'],
      description: 'Exotic tropical richness with an airy, pillowy mouthfeel.',
      rationale: 'Brings an adventurous dessert-like indulgence to your cup.'
    },
    {
      id: 'no_milk_water',
      category: 'milk',
      name: 'None (Pure Black / Mineral Water)',
      measure: '0 ml (or 90 ml hot water)',
      visualColor: 'transparent',
      vector: { sweetness: 0, bitterness: 3, creaminess: 0, fruitiness: 3, spice: 0, caffeine: 0, adventurousness: 3 },
      dietary: ['vegan', 'lactoseFree', 'sugarFree', 'caffeineFree', 'dairyFree', 'glutenFree'],
      description: 'Zero dilution, allowing the roasted origin notes to shine untamed.',
      rationale: 'Chosen because you prefer unclouded, pure coffee clarity.'
    }
  ],

  sweetener: [
    {
      id: 'brown_sugar_demerara',
      category: 'sweetener',
      name: 'Raw Demerara & Toffee Syrup',
      measure: '1.5 tsp (8 ml)',
      visualColor: '#B46B28',
      vector: { sweetness: 8, bitterness: 1, creaminess: 2, fruitiness: 0, spice: 2, caffeine: 0, adventurousness: 2 },
      dietary: ['vegan', 'lactoseFree', 'dairyFree', 'glutenFree'],
      description: 'Unrefined cane sugar with molasses notes and gentle crunch.',
      rationale: 'Delivers warm caramel undertones that match your cosy vibe.'
    },
    {
      id: 'madagascar_vanilla',
      category: 'sweetener',
      name: 'Madagascar Vanilla Bean Glaze',
      measure: '1 tsp (5 ml)',
      visualColor: '#E3B873',
      vector: { sweetness: 7, bitterness: 0, creaminess: 3, fruitiness: 1, spice: 3, caffeine: 0, adventurousness: 3 },
      dietary: ['vegan', 'lactoseFree', 'dairyFree', 'glutenFree'],
      description: 'Infused with real vanilla caviar for comforting bakery aromas.',
      rationale: 'Complements your sweet tooth with soothing, nostalgic aromatics.'
    },
    {
      id: 'wildflower_honey',
      category: 'sweetener',
      name: 'Wildflower Honey / Maple',
      measure: '1 tsp (7 g)',
      visualColor: '#D9822B',
      vector: { sweetness: 7, bitterness: 0, creaminess: 1, fruitiness: 3, spice: 3, caffeine: 0, adventurousness: 5 },
      dietary: ['lactoseFree', 'dairyFree', 'glutenFree'],
      description: 'Earthy floral honey that dissolves smoothly into hot espresso.',
      rationale: 'Offers a wholesome, natural sweetness with floral depth.'
    },
    {
      id: 'sugar_free_monkfruit',
      category: 'sweetener',
      name: 'Monkfruit Sweet Infusion',
      measure: '2 drops',
      visualColor: '#D3A163',
      vector: { sweetness: 6, bitterness: 0, creaminess: 0, fruitiness: 0, spice: 0, caffeine: 0, adventurousness: 3 },
      dietary: ['vegan', 'lactoseFree', 'sugarFree', 'dairyFree', 'glutenFree'],
      description: 'Zero glycemic index, clean natural sweetness without any aftertaste.',
      rationale: 'Keeps your cup delightfully sweet while keeping it completely sugar-free.'
    },
    {
      id: 'no_sweetener',
      category: 'sweetener',
      name: 'None (Unsweetened Purist)',
      measure: '0 g',
      visualColor: 'transparent',
      vector: { sweetness: 0, bitterness: 2, creaminess: 0, fruitiness: 2, spice: 0, caffeine: 0, adventurousness: 3 },
      dietary: ['vegan', 'lactoseFree', 'sugarFree', 'caffeineFree', 'dairyFree', 'glutenFree'],
      description: 'Letting the natural sweetness of roasted beans and milk do the talking.',
      rationale: 'Matches your bold palate that values raw espresso integrity over added sugar.'
    }
  ],

  flavour: [
    {
      id: 'ceylon_cinnamon',
      category: 'flavour',
      name: 'Ceylon Cinnamon & Nutmeg',
      measure: '1/3 tsp fresh ground',
      visualColor: '#9C4A26',
      vector: { sweetness: 3, bitterness: 1, creaminess: 2, fruitiness: 1, spice: 9, caffeine: 0, adventurousness: 4 },
      dietary: ['vegan', 'lactoseFree', 'sugarFree', 'caffeineFree', 'dairyFree', 'glutenFree'],
      description: 'Sweet, delicate real cinnamon bark kissed with aromatic nutmeg.',
      rationale: 'Chosen to wrap you in a cocoon of bakery-fresh comfort and gentle warmth.'
    },
    {
      id: 'dark_cocoa_blend',
      category: 'flavour',
      name: 'Single-Origin 70% Dark Cocoa',
      measure: '1 tsp dissolved',
      visualColor: '#3C1B10',
      vector: { sweetness: 2, bitterness: 6, creaminess: 4, fruitiness: 1, spice: 3, caffeine: 2, adventurousness: 3 },
      dietary: ['vegan', 'lactoseFree', 'sugarFree', 'dairyFree', 'glutenFree'],
      description: 'Bittersweet Ecuadorian cacao with fudgy notes.',
      rationale: 'Inspired by your pick of rich chocolate dessert and deep flavor palette.'
    },
    {
      id: 'toasted_hazelnut',
      category: 'flavour',
      name: 'Toasted Hazelnut Essence',
      measure: '1/2 tsp essence',
      visualColor: '#8C532B',
      vector: { sweetness: 4, bitterness: 2, creaminess: 5, fruitiness: 0, spice: 5, caffeine: 0, adventurousness: 3 },
      dietary: ['vegan', 'lactoseFree', 'sugarFree', 'caffeineFree', 'dairyFree', 'glutenFree'],
      description: 'Roasted nutty warmth reminiscent of European café pralines.',
      rationale: 'Selected for your appreciation of nutty, earthy, comforting notes.'
    },
    {
      id: 'cardamom_crush',
      category: 'flavour',
      name: 'Green Cardamom & Pod Crush',
      measure: 'Pinch of freshly ground pods',
      visualColor: '#5C5535',
      vector: { sweetness: 2, bitterness: 2, creaminess: 2, fruitiness: 3, spice: 9, caffeine: 0, adventurousness: 8 },
      dietary: ['vegan', 'lactoseFree', 'sugarFree', 'caffeineFree', 'dairyFree', 'glutenFree'],
      description: 'Fragrant, citrus-herbal spice beloved in Middle Eastern and Nordic brewing.',
      rationale: 'Celebrates your adventurous palate with an intoxicating royal aroma.'
    },
    {
      id: 'citrus_zest_twist',
      category: 'flavour',
      name: 'Sweet Orange Peel & Bergamot',
      measure: 'Expressed fresh peel',
      visualColor: '#E67E22',
      vector: { sweetness: 3, bitterness: 3, creaminess: 0, fruitiness: 9, spice: 4, caffeine: 0, adventurousness: 7 },
      dietary: ['vegan', 'lactoseFree', 'sugarFree', 'caffeineFree', 'dairyFree', 'glutenFree'],
      description: 'Bright essential oils that lift the espresso crema with crisp citrus vibrancy.',
      rationale: 'Echoes your lemon tart craving and love of lively, mood-lifting brightness.'
    }
  ],

  topping: [
    {
      id: 'cinnamon_dust',
      category: 'topping',
      name: 'Ceylon Cinnamon Dusting',
      measure: 'Aromatic dust',
      visualColor: '#B85D32',
      vector: { sweetness: 2, bitterness: 0, creaminess: 1, fruitiness: 0, spice: 8, caffeine: 0, adventurousness: 2 },
      dietary: ['vegan', 'lactoseFree', 'sugarFree', 'caffeineFree', 'dairyFree', 'glutenFree'],
      description: 'A fragrant golden dusting that greets your nose on the very first sip.',
      rationale: 'Adds an inviting fragrance that makes every sip feel like a hug.'
    },
    {
      id: 'cocoa_nibs_salt',
      category: 'topping',
      name: 'Crushed Cocoa Nibs & Sea Salt',
      measure: '1/2 tsp crunchy flakes',
      visualColor: '#361E14',
      vector: { sweetness: 1, bitterness: 5, creaminess: 1, fruitiness: 1, spice: 2, caffeine: 1, adventurousness: 6 },
      dietary: ['vegan', 'lactoseFree', 'sugarFree', 'dairyFree', 'glutenFree'],
      description: 'Satisfying crunchy texture with Maldon sea salt enhancing sweetness.',
      rationale: 'Provides a sophisticated bittersweet crunch that elevates the entire cup.'
    },
    {
      id: 'vanilla_cold_foam',
      category: 'topping',
      name: 'Silky Vanilla Cold Foam',
      measure: '30 ml whipped cloud',
      visualColor: '#FFFDF5',
      vector: { sweetness: 6, bitterness: 0, creaminess: 9, fruitiness: 0, spice: 2, caffeine: 0, adventurousness: 5 },
      dietary: ['glutenFree'],
      description: 'A dense, pillowy sweet cloud that slowly cascades through the coffee.',
      rationale: 'Creates an irresistible visual layer and heavenly creamy first sip.'
    },
    {
      id: 'microfoam_latte_art',
      category: 'topping',
      name: 'Silky Microfoam Rosetta',
      measure: 'Barista pour',
      visualColor: '#F5ECE1',
      vector: { sweetness: 2, bitterness: 0, creaminess: 6, fruitiness: 0, spice: 0, caffeine: 0, adventurousness: 1 },
      dietary: ['glutenFree'],
      description: 'Velvety smooth microfoam poured with classic café leaf art.',
      rationale: 'Gives you that picture-perfect, tactile coffeehouse feeling.'
    },
    {
      id: 'raw_sugar_crust',
      category: 'topping',
      name: 'Caramelized Raw Sugar Crust',
      measure: 'Pinch on crema',
      visualColor: '#C47B2B',
      vector: { sweetness: 7, bitterness: 0, creaminess: 1, fruitiness: 0, spice: 1, caffeine: 0, adventurousness: 4 },
      dietary: ['vegan', 'lactoseFree', 'dairyFree', 'glutenFree'],
      description: 'Golden crunchy granules floating on the crema like a brûlée.',
      rationale: 'Satisfies your sweet craving with delightful tactile crunch.'
    }
  ]
};
