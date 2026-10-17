// 8 Coffee Personas defined by vector clusters and personality archetypes
// Aligned with PRD Section 6.4 & 7.3

export const PERSONAS = [
  {
    id: 'cosy_dreamer',
    badge: 'The Cosy Dreamer',
    tagline: 'Light, comforting, gently sweet & aromatic',
    emoji: '🧸',
    gradient: 'from-[#D97706] to-[#B45309]',
    cardTheme: {
      bg: '#FDFBF7',
      accent: '#C05621',
      border: '#E8D5C4',
      badgeBg: '#FEEBC8',
      badgeText: '#7B341E'
    },
    vectorCenter: { sweetness: 6, bitterness: 3, creaminess: 8, fruitiness: 2, spice: 8, caffeine: 4, adventurousness: 4 },
    defaultName: 'Cinnamon Daydream',
    nameTemplates: [
      "{name}'s Cinnamon Daydream",
      "Honey Cardamom Velvet",
      "{name}'s Spiced Cloud Latte",
      "Vanilla Oat Whisper"
    ],
    description: "You believe coffee is not a mere fuel source, but an intimate daily ritual. You treat mornings like gentle poetry, savoring velvety microfoam, fragrant bakery spices, and slow peaceful moments before the world wakes up.",
    storyFormula: (answers) => 
      `Your slow mornings and craving for comforting warmth inspired this blend. We married velvety steamed oat milk with rich espresso, kissed with fragrant Ceylon cinnamon and raw demerara to wrap your morning in pure comfort.`,
    homeBrewTemplate: (equipment, ingredients) => {
      if (equipment === 'machine') {
        return [
          { step: 1, text: `Pull a double shot of espresso (60 ml) directly over your ${ingredients.sweetener.name}.` },
          { step: 2, text: `Stir until the sweetener dissolves and releases warm aromatics.` },
          { step: 3, text: `Steam ${ingredients.milk.name} (140 ml) until silky microfoam forms at ~62°C.` },
          { step: 4, text: `Slowly pour milk into espresso in circular motions, then top with a generous dusting of ${ingredients.topping.name}.` }
        ];
      }
      if (equipment === 'manual') {
        return [
          { step: 1, text: `Brew 90 ml of concentrated coffee in your Moka pot or AeroPress.` },
          { step: 2, text: `Whisk in ${ingredients.sweetener.name} along with a pinch of ${ingredients.flavour.name}.` },
          { step: 3, text: `Warm ${ingredients.milk.name} on the stovetop and froth with a hand-whisk or French press plunger.` },
          { step: 4, text: `Combine gently in your favorite ceramic mug and dust with ${ingredients.topping.name}.` }
        ];
      }
      return [
        { step: 1, text: `Dissolve craft coffee concentrate or strong instant in 60 ml boiling water.` },
        { step: 2, text: `Stir in ${ingredients.sweetener.name} and ${ingredients.flavour.name}.` },
        { step: 3, text: `Warm ${ingredients.milk.name} in the microwave for 45s, then shake in a jar until frothy.` },
        { step: 4, text: `Pour over your coffee base and garnish with ${ingredients.topping.name}.` }
      ];
    },
    cafeOrderScript: (ingredients) => 
      `"Hi! Could I please get a double-shot flat white with ${ingredients.milk.name.toLowerCase().includes('oat') ? 'oat milk' : 'regular milk'}, a pump of ${ingredients.sweetener.name.split('&')[0].trim().toLowerCase()}, and a light dusting of cinnamon on top?"`
  },

  {
    id: 'bold_achiever',
    badge: 'The Bold Achiever',
    tagline: 'Intense, uncompromised, razor-sharp & energising',
    emoji: '⚡',
    gradient: 'from-[#451A03] to-[#2B1810]',
    cardTheme: {
      bg: '#FAF5EE',
      accent: '#78350F',
      border: '#DAC7B5',
      badgeBg: '#F3E8DF',
      badgeText: '#431407'
    },
    vectorCenter: { sweetness: 1, bitterness: 9, creaminess: 2, fruitiness: 2, spice: 2, caffeine: 9, adventurousness: 4 },
    defaultName: 'Midnight Obsidian',
    nameTemplates: [
      "{name}'s Midnight Obsidian",
      "Double Forge Crema",
      "{name}'s High-Voltage Ristretto",
      "Apex Black Reserve"
    ],
    description: "Unapologetic, relentless, and sharply focused. You appreciate clean, concentrated extraction that hits like lightning. Heavy syrups only slow your momentum—you savor deep dark cocoa notes, dense golden crema, and pure unmasked coffee power.",
    storyFormula: (answers) => 
      `Your productive mindset and craving for pure, unmasked intensity shaped this brew. We calibrated high-pressure extraction to yield maximum dissolved solids with notes of dark cacao and zero unnecessary dilution.`,
    homeBrewTemplate: (equipment, ingredients) => [
      { step: 1, text: `Grind 18.5g of freshly roasted dark roast beans to a fine espresso powder.` },
      { step: 2, text: `Tamp evenly and extract a concentrated 50 ml double shot in 28 seconds.` },
      { step: 3, text: `Swirl the cup to integrate the rich hazelnut-flecked crema.` },
      { step: 4, text: `Serve immediately at 68°C alongside a small glass of sparkling mineral water.` }
    ],
    cafeOrderScript: (ingredients) => 
      `"Hi! Could I get a double espresso (or long black with just an ounce of hot water), extracted short with maximum crema, please."`
  },

  {
    id: 'sweet_explorer',
    badge: 'The Sweet Explorer',
    tagline: 'Decadent, creamy, bakery-sweet & playful',
    emoji: '🍯',
    gradient: 'from-[#D97706] to-[#EA580C]',
    cardTheme: {
      bg: '#FFFDF7',
      accent: '#D97706',
      border: '#FDE68A',
      badgeBg: '#FEF3C7',
      badgeText: '#92400E'
    },
    vectorCenter: { sweetness: 9, bitterness: 3, creaminess: 8, fruitiness: 2, spice: 4, caffeine: 5, adventurousness: 6 },
    defaultName: 'Salted Caramel Cloud',
    nameTemplates: [
      "{name}'s Salted Caramel Cloud",
      "Golden Honeycomb Velvet",
      "{name}'s Vanilla Glaze Affogato",
      "Toffee Brioche Latte"
    ],
    description: "You believe everyday life deserves a dessert-worthy celebration. Your coffee is a joyous canvas of warm Madagascar vanilla, buttery caramel, and pillowy sweet foam that turns your afternoon into an occasion.",
    storyFormula: (answers) => 
      `Your love of bakery treats and sweet, playful moments inspired this creation. We balanced espresso with decadent vanilla bean sweetness and silky cream, crowned with crunchy sweet flakes.`,
    homeBrewTemplate: (equipment, ingredients) => [
      { step: 1, text: `Coat the bottom and inner sides of your glass with ${ingredients.sweetener.name}.` },
      { step: 2, text: `Brew a rich double shot of espresso (60 ml) and pour directly over the syrup.` },
      { step: 3, text: `Froth 130 ml of warm ${ingredients.milk.name} until dense and pour over the espresso.` },
      { step: 4, text: `Garnish with a pillowy dollop of foam and sprinkle ${ingredients.topping.name} on top.` }
    ],
    cafeOrderScript: (ingredients) => 
      `"Hi! Can I please get a caramel or vanilla latte with extra velvety microfoam, oat milk, and a sprinkle of raw sugar or cocoa on top?"`
  },

  {
    id: 'minimalist_purist',
    badge: 'The Minimalist Purist',
    tagline: 'Crisp, floral, single-origin clarity & elegance',
    emoji: '🌱',
    gradient: 'from-[#047857] to-[#065F46]',
    cardTheme: {
      bg: '#F9FAF8',
      accent: '#059669',
      border: '#D1FAE5',
      badgeBg: '#ECFDF5',
      badgeText: '#064E3B'
    },
    vectorCenter: { sweetness: 3, bitterness: 4, creaminess: 1, fruitiness: 8, spice: 1, caffeine: 6, adventurousness: 7 },
    defaultName: 'Ethiopian Sunset Pour-Over',
    nameTemplates: [
      "{name}'s Ethiopian Sunset Pour-Over",
      "Nordic Reserve Americano",
      "{name}'s Jasmine Blossom Filter",
      "Geisha Clarity Extraction"
    ],
    description: "Clarity over clutter. You cherish the unadorned bean: the delicate floral aroma, bright bergamot sparkle, and nuanced acidity of high-altitude single-origin terroir. No syrups, no milk clouds—just pure origin poetry.",
    storyFormula: (answers) => 
      `Your appreciation for clean, fruity notes and mindful brewing shaped this selection. We highlighted light-roasted origin characteristics with zero added fat or sugar to keep every floral note crystal clear.`,
    homeBrewTemplate: (equipment, ingredients) => [
      { step: 1, text: `Rinse paper filter with boiling water to remove papery taste; discard rinse water.` },
      { step: 2, text: `Add 15g medium-coarse single-origin grounds. Pour 45g hot water (93°C) and let bloom for 40s.` },
      { step: 3, text: `Pour remaining water in slow concentric spirals up to 250g total weight.` },
      { step: 4, text: `Swirl the carafe and sip as it cools down to reveal bright stone-fruit notes.` }
    ],
    cafeOrderScript: (ingredients) => 
      `"Hi! Do you have a single-origin pour-over or batch filter on brew today? I'd love to try it black, with no milk or sugar."`
  },

  {
    id: 'sunlit_optimist',
    badge: 'The Sunlit Optimist',
    tagline: 'Bright, refreshing, iced & uplifting',
    emoji: '☀️',
    gradient: 'from-[#F59E0B] to-[#D97706]',
    cardTheme: {
      bg: '#FFFDF5',
      accent: '#D97706',
      border: '#FDE68A',
      badgeBg: '#FEF3C7',
      badgeText: '#78350F'
    },
    vectorCenter: { sweetness: 6, bitterness: 4, creaminess: 5, fruitiness: 6, spice: 2, caffeine: 6, adventurousness: 5 },
    defaultName: 'Vanilla Sky Cold Foam',
    nameTemplates: [
      "{name}'s Vanilla Sky Cold Foam",
      "Citrus Spark Shakerato",
      "{name}'s Golden Hour Iced Brew",
      "Amber Breeze Tonic"
    ],
    description: "Radiant, sociable, and forever on the sunny side of life. You love crisp, iced refreshment with clinking cubes, smooth cold brew, and a sweet vanilla cold foam halo that makes every afternoon café hop feel like a vacation.",
    storyFormula: (answers) => 
      `Your sunny perspective and preference for chilled, lively coffee guided this recipe. We paired low-acid steeped cold brew with a splash of sweet vanilla foam for the ultimate pick-me-up.`,
    homeBrewTemplate: (equipment, ingredients) => [
      { step: 1, text: `Fill a tall glass to the brim with clear ice cubes.` },
      { step: 2, text: `Pour 120 ml of steeped cold brew concentrate over the ice.` },
      { step: 3, text: `In a small frother or jar, shake 40 ml cold milk with a dash of ${ingredients.sweetener.name} until frothy.` },
      { step: 4, text: `Gently float the cold foam over the coffee and watch the gorgeous cascading ribbons.` }
    ],
    cafeOrderScript: (ingredients) => 
      `"Hi! Could I please get an iced cold brew (or iced Americano) topped with vanilla sweet cold foam, please!"`
  },

  {
    id: 'midnight_alchemist',
    badge: 'The Midnight Alchemist',
    tagline: 'Complex, dark cacao, spiced & enchanting',
    emoji: '🌙',
    gradient: 'from-[#581C87] to-[#3B0764]',
    cardTheme: {
      bg: '#FBF8FD',
      accent: '#7E22CE',
      border: '#E9D5FF',
      badgeBg: '#F3E8FF',
      badgeText: '#581C87'
    },
    vectorCenter: { sweetness: 4, bitterness: 7, creaminess: 6, fruitiness: 2, spice: 9, caffeine: 7, adventurousness: 8 },
    defaultName: 'Spiced Aztec Mocha',
    nameTemplates: [
      "{name}'s Spiced Aztec Mocha",
      "Nocturne Cardamom Cortado",
      "{name}'s Smoked Cacao Velvet",
      "Eclipse Dark Brew"
    ],
    description: "Introspective, deep-thinking, and drawn to nocturnal creativity. You relish mysterious flavor intersections: single-origin dark cocoa, warm green cardamom, Ceylon cinnamon, and rich espresso with a whisper of molten sea salt.",
    storyFormula: (answers) => 
      `Your creative flair and adventurous taste for deep spices shaped this nocturnal brew. We fused bittersweet dark chocolate with exotic warming spices and dense espresso.`,
    homeBrewTemplate: (equipment, ingredients) => [
      { step: 1, text: `In your mug, whisk 1 tsp dark cocoa powder with a pinch of crushed cardamom and cinnamon.` },
      { step: 2, text: `Extract a hot double shot of espresso directly over the spice blend and whisk till glossy.` },
      { step: 3, text: `Steam 100 ml of ${ingredients.milk.name} to a tight microfoam and pour into the spiced espresso.` },
      { step: 4, text: `Finish with a pinch of flaky sea salt and raw cocoa nibs on top.` }
    ],
    cafeOrderScript: (ingredients) => 
      `"Hi! Could I get a mocha made with dark chocolate, oat milk, and if you have ground cinnamon or cardamom, a dusting in the shot?"`
  },

  {
    id: 'zen_artisan',
    badge: 'The Zen Artisan',
    tagline: 'Smooth, nutty, harmonious & grounded',
    emoji: '🎋',
    gradient: 'from-[#78350F] to-[#5C381E]',
    cardTheme: {
      bg: '#FAF7F2',
      accent: '#92400E',
      border: '#E2D3BE',
      badgeBg: '#F5EBE1',
      badgeText: '#5A260C'
    },
    vectorCenter: { sweetness: 4, bitterness: 5, creaminess: 7, fruitiness: 2, spice: 6, caffeine: 5, adventurousness: 4 },
    defaultName: 'Toasted Hazelnut Flat White',
    nameTemplates: [
      "{name}'s Toasted Hazelnut Flat White",
      "Almond Silk Macchiato",
      "{name}'s Sesame Biscuit Latte",
      "Warm Hearth Cortado"
    ],
    description: "Grounded, mindful, and in love with timeless craftsmanship. You appreciate balanced proportions, tactile ceramic mugs, and the comforting resonance of toasted hazelnuts and silky oat foam.",
    storyFormula: (answers) => 
      `Your balanced tempo and love of nutty aromas inspired this harmony. We balanced espresso with toasted hazelnut notes and silky microfoam poured to exact flat white proportions.`,
    homeBrewTemplate: (equipment, ingredients) => [
      { step: 1, text: `Preheat your ceramic cup with boiling water, then discard water.` },
      { step: 2, text: `Extract a double shot of espresso (60 ml) with hazelnut essence in the cup.` },
      { step: 3, text: `Steam 120 ml of ${ingredients.milk.name} with minimal aeration for a wet, glossy microfoam.` },
      { step: 4, text: `Pour steadily from 3 inches high, then lower pitcher close to surface to draw a crisp rosetta.` }
    ],
    cafeOrderScript: (ingredients) => 
      `"Hi! Could I please get a double-shot flat white with oat milk and a hint of hazelnut, served in a ceramic cup if staying in?"`
  },

  {
    id: 'wild_pioneer',
    badge: 'The Wild Pioneer',
    tagline: 'Bold, unexpected, botanical & boundary-pushing',
    emoji: '🚀',
    gradient: 'from-[#BE185D] to-[#881337]',
    cardTheme: {
      bg: '#FDF7FA',
      accent: '#BE185D',
      border: '#FBCFE8',
      badgeBg: '#FCE7F3',
      badgeText: '#831843'
    },
    vectorCenter: { sweetness: 5, bitterness: 5, creaminess: 4, fruitiness: 8, spice: 7, caffeine: 7, adventurousness: 10 },
    defaultName: 'Orange Blossom Shakerato',
    nameTemplates: [
      "{name}'s Orange Blossom Shakerato",
      "Botanical Cardamom Fizz",
      "{name}'s Rosemary Tonic Extraction",
      "Nordic Cloudberry Cold Brew"
    ],
    description: "Bored by the ordinary, you are a fearless flavour pioneer. You want unexpected flavour collisions: fresh citrus oils, fragrant botanical essences, and sparkling coffee textures that spark conversation.",
    storyFormula: (answers) => 
      `Your fearless curiosity and desire for surprises guided this avant-garde creation. We infused bright espresso with fresh citrus peel oils and exotic botanical spices.`,
    homeBrewTemplate: (equipment, ingredients) => [
      { step: 1, text: `In a cocktail shaker, add a double espresso shot, 1 strip of fresh orange peel, and 1 tsp sweetener.` },
      { step: 2, text: `Fill shaker with 5 large ice cubes and shake vigorously for 15 seconds until thick foam forms.` },
      { step: 3, text: `Strain into a chilled coupe glass, holding back the ice cubes.` },
      { step: 4, text: `Twist a fresh orange peel over the glass to express the fragrant oils, and serve immediately.` }
    ],
    cafeOrderScript: (ingredients) => 
      `"Hi! Do you make an espresso shakerato or espresso tonic? If so, I'd love it with an expressed orange peel twist!"`
  }
];
