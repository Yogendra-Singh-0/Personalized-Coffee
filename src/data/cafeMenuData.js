// Authentic Café Menu Database extracted from physical menu cards
// Categories: Barista Crafts, Classic Coffees, Protein Menu, Matcha Bar, Manual Brew, Specialty Teas

export const CAFE_CATEGORIES = [
  { id: 'barista_crafts', name: 'Barista Crafts', icon: '✨', subtitle: 'Signature In-House Creations' },
  { id: 'classic_coffees', name: 'Classic Coffees', icon: '☕', subtitle: 'Espresso-Based Foundations' },
  { id: 'protein_menu', name: 'Protein Menu', icon: '💪', subtitle: 'Powered by Only What\'s Needed' },
  { id: 'matcha_bar', name: 'Matcha Bar', icon: '🍵', subtitle: 'Ceremonial Japanese Uji Matcha' },
  { id: 'manual_brew', name: 'Manual Brew', icon: '⚗️', subtitle: 'Fruity to Intense Extraction' },
  { id: 'specialty_teas', name: 'Specialty Teas', icon: '🫖', subtitle: 'Classic & Herbal Tisanes' },
  { id: 'desserts', name: 'Desserts & Tea Cakes', icon: '🍰', subtitle: 'Freshly Baked In-House' }
];

export const ESPRESSO_CUSTOMIZATIONS = [
  { id: 'single_origin', name: 'Single-Origin Coffee', price: 30, text: '+₹30' },
  { id: 'decaf', name: 'Decaf Espresso', price: 50, text: '+₹50' },
  { id: 'extra_shot', name: 'Extra Espresso Shot (20ml)', price: 50, text: '+₹50' },
  { id: 'alt_milk', name: 'Alternative Milk (Oat / Coconut / Almond)', price: 80, text: '+₹80' },
  { id: 'protein_addon', name: 'Add On Protein 20g (Only What\'s Needed)', price: 120, text: '+₹120 (79 kcal)' },
  { id: 'syrups', name: 'Add On Syrups (Vanilla / Caramel / Jaggery / Hazelnut / Choc)', price: 40, text: '+₹40' }
];

export const MANUAL_BREW_METHODS = [
  { id: 'v60', name: 'V60', style: 'Fruity & Floral Clarity', position: 1 },
  { id: 'chemex', name: 'Chemex', style: 'Crisp & Clean Body', position: 2 },
  { id: 'aeropress', name: 'Aeropress', style: 'Smooth & Balanced', position: 3 },
  { id: 'french_press', name: 'French Press', style: 'Rich & Textured', position: 4 },
  { id: 'cold_brew', name: 'Cold Brew', style: 'Low Acid & Refreshing', position: 5 },
  { id: 'moka_pot', name: 'Moka Pot', style: 'Intense & Crema-Rich', position: 6 }
];

export const MANUAL_BREW_PRICING = [
  { name: 'Micro-Lot', price: '₹280', priceNum: 280, note: 'Hot / Iced' },
  { name: 'Nano-Lot', price: '₹320', priceNum: 320, note: 'Hot / Iced' },
  { name: 'Barrel Aged', price: '₹330', priceNum: 330, note: 'Iced only' },
  { name: 'International', price: '₹400/450', priceNum: 400, note: 'Hot / Iced' }
];

export const CAFE_MENU_ITEMS = [
  // ==========================================
  // BARISTA CRAFTS (Image 4)
  // ==========================================
  {
    id: 'rose_cardamom_latte',
    name: 'Rose Cardamom Latte',
    category: 'barista_crafts',
    categoryName: 'Barista Crafts',
    price: '₹280/300',
    priceNum: 280,
    priceIced: 300,
    temp: 'Hot / Iced',
    defaultTemp: 'hot',
    dietary: ['vo'],
    description: 'Cardamom infused Espresso, combined with sweet rose milk',
    vector: { sweetness: 6, bitterness: 4, creaminess: 8, fruitiness: 3, spice: 8, caffeine: 5, adventurousness: 5 },
    personas: ['cosy_dreamer', 'midnight_alchemist'],
    cupDesign: {
      baseColor: '#432616',
      milkColor: '#FAD2E1',
      toppingColor: '#D97706',
      baseName: 'Cardamom Infused Espresso',
      milkName: 'Sweet Rose Milk',
      flavourName: 'Green Cardamom & Rose',
      toppingName: 'Candied Rose Petals & Spices'
    },
    homeSteps: [
      { step: 1, text: 'Gently crush 2 green cardamom pods directly into your ground coffee portafilter or brewer.' },
      { step: 2, text: 'Extract a concentrated double shot of espresso (60 ml) infused with aromatic cardamom oils.' },
      { step: 3, text: 'Warm 140 ml of milk with a teaspoon of artisanal rose syrup until velvety microfoam forms.' },
      { step: 4, text: 'Pour milk into espresso in smooth circular motions; top with a pinch of cardamom and edible rose petals.' }
    ],
    cafeScript: '“Hi! Could I please get the Rose Cardamom Latte, hot with oat milk, and a sprinkle of cardamom on top?”'
  },
  {
    id: 'cloudy_caramel_latte',
    name: 'Cloudy Caramel Latte',
    category: 'barista_crafts',
    categoryName: 'Barista Crafts',
    price: '₹280/300',
    priceNum: 280,
    priceIced: 300,
    temp: 'Hot / Iced',
    defaultTemp: 'hot',
    dietary: [],
    description: 'In house caramel sauce with biscoff espresso and milk',
    vector: { sweetness: 9, bitterness: 3, creaminess: 8, fruitiness: 2, spice: 4, caffeine: 5, adventurousness: 6 },
    personas: ['sweet_explorer', 'cosy_dreamer'],
    cupDesign: {
      baseColor: '#3B1F11',
      milkColor: '#F7EDDA',
      toppingColor: '#D97706',
      baseName: 'Biscoff-Kissed Espresso',
      milkName: 'Steamed Whole / Oat Milk',
      flavourName: 'In-House Caramel Sauce',
      toppingName: 'Crushed Lotus Biscoff Crumbles'
    },
    homeSteps: [
      { step: 1, text: 'Drizzle 1 tbsp of rich homemade caramel sauce around the interior of your warm glass.' },
      { step: 2, text: 'Stir 1 tsp melted Lotus Biscoff spread into a hot double espresso shot until glossy.' },
      { step: 3, text: 'Steam 140 ml milk to 62°C to achieve a glossy, sweet microfoam.' },
      { step: 4, text: 'Pour milk gently into the glass and garnish with crushed Biscoff biscuit crumbs.' }
    ],
    cafeScript: '“Hi! Can I please get the Cloudy Caramel Latte with biscoff espresso, extra velvety microfoam?”'
  },
  {
    id: 'bourbon_whiskey',
    name: 'Bourbon Whiskey',
    category: 'barista_crafts',
    categoryName: 'Barista Crafts',
    price: '₹350 (Iced)',
    priceNum: 350,
    temp: 'Iced',
    defaultTemp: 'iced',
    dietary: ['vegan'],
    description: '48-hour brewed whiskey barrel-aged coffee infused with cocoa-nibs',
    vector: { sweetness: 2, bitterness: 9, creaminess: 2, fruitiness: 3, spice: 6, caffeine: 9, adventurousness: 8 },
    personas: ['bold_achiever', 'midnight_alchemist'],
    cupDesign: {
      baseColor: '#1A0C06',
      milkColor: 'transparent',
      toppingColor: '#582C12',
      baseName: '48hr Whiskey Barrel Cold Brew',
      milkName: 'None (Pure Extraction)',
      flavourName: 'Roasted Cocoa Nibs & Oak',
      toppingName: 'Cocoa Nib Dust & Clear Ice'
    },
    homeSteps: [
      { step: 1, text: 'Cold steep coarse whiskey barrel-aged coffee beans for 36–48 hours in cold filtered water.' },
      { step: 2, text: 'Double-filter through unbleached paper to clarify oils and maintain rich oak body.' },
      { step: 3, text: 'Pour 150 ml over a single large artisanal ice sphere in an Old Fashioned glass.' },
      { step: 4, text: 'Crush toasted cocoa nibs over the surface for deep aromatic dark-chocolate notes.' }
    ],
    cafeScript: '“Hi! Could I please get the Bourbon Whiskey Barrel-Aged Cold Brew over a large rock of ice?”'
  },
  {
    id: 'tiramisu_cortado',
    name: 'Tiramisu Cortado',
    category: 'barista_crafts',
    categoryName: 'Barista Crafts',
    price: '₹280 (Iced)',
    priceNum: 280,
    temp: 'Iced',
    defaultTemp: 'iced',
    dietary: [],
    description: 'Equal parts milk and espresso, tiramisu cream, cocoa, ladyfinger',
    vector: { sweetness: 7, bitterness: 5, creaminess: 8, fruitiness: 1, spice: 3, caffeine: 7, adventurousness: 7 },
    personas: ['sweet_explorer', 'zen_artisan'],
    cupDesign: {
      baseColor: '#2F1A10',
      milkColor: '#F6E7D2',
      toppingColor: '#4A2311',
      baseName: 'Rich Espresso Ristretto (1:1)',
      milkName: 'Cold Whole / Oat Milk',
      flavourName: 'Whipped Tiramisu Cream',
      toppingName: 'Dutch Cocoa & Ladyfinger Sponge'
    },
    homeSteps: [
      { step: 1, text: 'Pull a dense 45 ml espresso ristretto and let it cool slightly over 2 ice cubes.' },
      { step: 2, text: 'Add 45 ml chilled milk for the authentic 1:1 cortado balance.' },
      { step: 3, text: 'Whisk 2 tbsp mascarpone cream with a drop of vanilla until a luxurious thick cold cream forms.' },
      { step: 4, text: 'Float tiramisu cream on top, dust heavily with Dutch cocoa, and rest a crisp ladyfinger on the rim.' }
    ],
    cafeScript: '“Hi! I’d love the Iced Tiramisu Cortado with tiramisu cream and cocoa on top, please.”'
  },
  {
    id: 'green_cut',
    name: 'Green Cut',
    category: 'barista_crafts',
    categoryName: 'Barista Crafts',
    price: '₹350 (Iced)',
    priceNum: 350,
    temp: 'Iced',
    defaultTemp: 'iced',
    dietary: ['vegan'],
    description: 'Juniper berries, lemon and tonic brewed with our nano-lot cold brew',
    vector: { sweetness: 4, bitterness: 6, creaminess: 1, fruitiness: 7, spice: 6, caffeine: 7, adventurousness: 10 },
    personas: ['wild_pioneer', 'minimalist_purist'],
    cupDesign: {
      baseColor: '#2B1B12',
      milkColor: 'transparent',
      toppingColor: '#F59E0B',
      baseName: 'Nano-Lot Specialty Cold Brew',
      milkName: 'None (Sparkling Tonic Base)',
      flavourName: 'Wild Juniper & Fresh Lemon',
      toppingName: 'Lemon Twist & Fresh Juniper Berries'
    },
    homeSteps: [
      { step: 1, text: 'Muddle 4 fresh juniper berries with 15 ml fresh Sicilian lemon juice in a tall Collins glass.' },
      { step: 2, text: 'Pack the glass with clear ice cubes and pour in 100 ml premium Indian tonic water.' },
      { step: 3, text: 'Slowly float 60 ml of nano-lot cold brew concentrate over the tonic using the back of a spoon.' },
      { step: 4, text: 'Garnish with an expressed lemon peel spiral and bruised juniper berries.' }
    ],
    cafeScript: '“Hi! Can I please get the Green Cut iced tonic with your nano-lot cold brew?”'
  },
  {
    id: 'van_orange',
    name: 'Van Orange',
    category: 'barista_crafts',
    categoryName: 'Barista Crafts',
    price: '₹320 (Iced)',
    priceNum: 320,
    temp: 'Iced',
    defaultTemp: 'iced',
    dietary: [],
    description: 'Condensed milk, espresso, cold foam, orange zest & orange smoke',
    vector: { sweetness: 6, bitterness: 5, creaminess: 7, fruitiness: 7, spice: 4, caffeine: 7, adventurousness: 9 },
    personas: ['wild_pioneer', 'sunlit_optimist'],
    cupDesign: {
      baseColor: '#30180B',
      milkColor: '#FFF3DB',
      toppingColor: '#EA580C',
      baseName: 'Double Espresso on Ice',
      milkName: 'Sweet Condensed Milk Base',
      flavourName: 'Orange Smoke & Cold Foam',
      toppingName: 'Fresh Orange Zest Ribbon'
    },
    homeSteps: [
      { step: 1, text: 'Line the base of a tumbler with 20 ml rich condensed milk.' },
      { step: 2, text: 'Add ice and pull a freshly extracted hot double espresso shot directly over the cubes.' },
      { step: 3, text: 'Whip 40 ml cold milk with a dash of vanilla into a dense, velvety cold foam cap.' },
      { step: 4, text: 'Float cold foam, express fresh orange peel oils over the surface, and dust with fine orange zest.' }
    ],
    cafeScript: '“Hi! Could I please get the Van Orange iced espresso with orange cold foam and orange zest?”'
  },
  {
    id: 'coconut_iced_coffee',
    name: 'Coconut Iced Coffee',
    category: 'barista_crafts',
    categoryName: 'Barista Crafts',
    price: '₹280',
    priceNum: 280,
    temp: 'Iced',
    defaultTemp: 'iced',
    dietary: ['vegan'],
    description: 'Coconut water, blue pea tea, espresso cold foam',
    vector: { sweetness: 5, bitterness: 4, creaminess: 4, fruitiness: 6, spice: 1, caffeine: 6, adventurousness: 8 },
    personas: ['sunlit_optimist', 'wild_pioneer'],
    cupDesign: {
      baseColor: '#3B82F6',
      milkColor: '#F0F9FF',
      toppingColor: '#382216',
      baseName: 'Tender Coconut Water & Blue Pea Tea',
      milkName: 'Coconut Hydration Layer',
      flavourName: 'Blue Butterfly Pea Flower',
      toppingName: 'Rich Espresso Cold Foam Cap'
    },
    homeSteps: [
      { step: 1, text: 'Brew 50 ml blue butterfly pea flower tea until vibrant royal indigo and chill.' },
      { step: 2, text: 'In a tall glass filled with ice, mix 100 ml fresh tender coconut water and the blue pea tea.' },
      { step: 3, text: 'Froth 40 ml chilled espresso with 1 tsp simple syrup and plant milk until a golden foam forms.' },
      { step: 4, text: 'Pour the espresso foam over the blue coconut water for a dramatic two-tone tropical cascade.' }
    ],
    cafeScript: '“Hi! Could I get the Coconut Iced Coffee with the blue pea tea and espresso cold foam?”'
  },
  {
    id: 'apple_cinnamon_tonic',
    name: 'Apple Cinnamon Tonic',
    category: 'barista_crafts',
    categoryName: 'Barista Crafts',
    price: '₹300 (Iced)',
    priceNum: 300,
    temp: 'Iced',
    defaultTemp: 'iced',
    dietary: ['vegan'],
    description: 'Apple juice, cinnamon infused espresso and tonic water',
    vector: { sweetness: 6, bitterness: 4, creaminess: 1, fruitiness: 8, spice: 7, caffeine: 6, adventurousness: 8 },
    personas: ['wild_pioneer', 'cosy_dreamer'],
    cupDesign: {
      baseColor: '#3E2213',
      milkColor: 'transparent',
      toppingColor: '#D97706',
      baseName: 'Cinnamon-Infused Espresso',
      milkName: 'None (Crisp Tonic & Apple)',
      flavourName: 'Crisp Apple Juice & Spices',
      toppingName: 'Cinnamon Stick & Dehydrated Apple'
    },
    homeSteps: [
      { step: 1, text: 'Pull a double espresso shot directly over half a Ceylon cinnamon stick.' },
      { step: 2, text: 'Fill a highball glass with ice, pour 60 ml crisp cloudy apple juice and 80 ml tonic water.' },
      { step: 3, text: 'Strain and float the cinnamon espresso gently on top.' },
      { step: 4, text: 'Garnish with a thin dehydrated red apple wheel and cinnamon stick.' }
    ],
    cafeScript: '“Hi! I would like the Apple Cinnamon Tonic iced espresso, please!”'
  },
  {
    id: 'cocoa_almond_latte',
    name: 'Cocoa Almond Latte',
    category: 'barista_crafts',
    categoryName: 'Barista Crafts',
    price: '₹280/300',
    priceNum: 280,
    priceIced: 300,
    temp: 'Hot / Iced',
    defaultTemp: 'hot',
    dietary: ['nut'],
    description: 'Chocolate and vanilla with milk & espresso, topped with roasted almonds',
    vector: { sweetness: 6, bitterness: 5, creaminess: 8, fruitiness: 2, spice: 3, caffeine: 6, adventurousness: 5 },
    personas: ['zen_artisan', 'midnight_alchemist'],
    cupDesign: {
      baseColor: '#301B11',
      milkColor: '#EFE5D7',
      toppingColor: '#92400E',
      baseName: 'Espresso + Artisanal Chocolate',
      milkName: 'Silky Almond / Whole Milk',
      flavourName: 'Madagascar Vanilla Bean',
      toppingName: 'Toasted Roasted Almond Flakes'
    },
    homeSteps: [
      { step: 1, text: 'Whisk 1 tbsp dark melted cocoa and 1 pump vanilla syrup with a fresh double espresso.' },
      { step: 2, text: 'Steam 140 ml almond or oat milk until glossy microfoam develops.' },
      { step: 3, text: 'Pour milk slowly into the cocoa espresso with a steady center pour.' },
      { step: 4, text: 'Generously crown with oven-roasted, fragrant almond slivers.' }
    ],
    cafeScript: '“Hi! Could I please get the Cocoa Almond Latte with almond milk, hot, topped with roasted almonds?”'
  },
  {
    id: 'guava_heatwave',
    name: 'Guava Heatwave',
    category: 'barista_crafts',
    categoryName: 'Barista Crafts',
    price: '₹300 (Iced)',
    priceNum: 300,
    temp: 'Iced',
    defaultTemp: 'iced',
    dietary: ['vegan'],
    description: 'Guava juice, ginger ale, chilli, cold brew',
    vector: { sweetness: 5, bitterness: 5, creaminess: 1, fruitiness: 9, spice: 9, caffeine: 7, adventurousness: 10 },
    personas: ['wild_pioneer'],
    cupDesign: {
      baseColor: '#2B160C',
      milkColor: 'transparent',
      toppingColor: '#E11D48',
      baseName: 'Concentrated Cold Brew',
      milkName: 'None (Effervescent Guava)',
      flavourName: 'Ruby Guava & Fiery Chilli',
      toppingName: 'Chilli Salt Rim & Lime Wheel'
    },
    homeSteps: [
      { step: 1, text: 'Rim a glass with pink Himalayan salt and Kashmiri red chilli powder.' },
      { step: 2, text: 'Fill with ice, add 80 ml pink guava nectar and 60 ml fiery ginger ale.' },
      { step: 3, text: 'Top with 60 ml bold steeped cold brew concentrate.' },
      { step: 4, text: 'Stir once gently and sip for a sweet, fizzy, spicy, coffee kick.' }
    ],
    cafeScript: '“Hi! Can I get the Guava Heatwave with cold brew and chilli rim, please!”'
  },
  {
    id: 'nostalgia',
    name: 'Nostalgia',
    category: 'barista_crafts',
    categoryName: 'Barista Crafts',
    price: '₹300 (Iced)',
    priceNum: 300,
    temp: 'Iced',
    defaultTemp: 'iced',
    dietary: ['vegan'],
    description: 'Pineapple juice, cold brew, vegan pineapple pastry foam',
    vector: { sweetness: 7, bitterness: 4, creaminess: 4, fruitiness: 9, spice: 2, caffeine: 6, adventurousness: 8 },
    personas: ['sweet_explorer', 'sunlit_optimist'],
    cupDesign: {
      baseColor: '#2C160B',
      milkColor: '#FEF08A',
      toppingColor: '#CA8A04',
      baseName: 'Steeped Cold Brew',
      milkName: 'Pineapple Pastry Foam',
      flavourName: 'Tropical Pineapple Juice',
      toppingName: 'Dehydrated Pineapple Crisp'
    },
    homeSteps: [
      { step: 1, text: 'Pour 80 ml fresh sweet pineapple juice over ice in a tall glass.' },
      { step: 2, text: 'Gently float 80 ml cold brew coffee over the pineapple base.' },
      { step: 3, text: 'Froth oat milk with a hint of vanilla and pineapple puree into a fluffy pastry foam.' },
      { step: 4, text: 'Spoon the pineapple pastry foam over the top and enjoy the retro cake-like sweetness.' }
    ],
    cafeScript: '“Hi! I’d love the Nostalgia iced coffee with the vegan pineapple pastry foam!”'
  },
  {
    id: 'espresso_martini',
    name: 'Espresso Martini',
    category: 'barista_crafts',
    categoryName: 'Barista Crafts',
    price: '₹350',
    priceNum: 350,
    temp: 'Iced',
    defaultTemp: 'iced',
    dietary: [],
    description: 'A rich velvety espresso martini with deep chocolate, warm spice and subtle rum barrel notes.',
    vector: { sweetness: 5, bitterness: 8, creaminess: 5, fruitiness: 2, spice: 7, caffeine: 9, adventurousness: 9 },
    personas: ['midnight_alchemist', 'bold_achiever'],
    cupDesign: {
      baseColor: '#170B06',
      milkColor: '#C49767',
      toppingColor: '#3E1F11',
      baseName: 'Fresh Hot Espresso Double Shot',
      milkName: 'Velvety Crema Head',
      flavourName: 'Dark Chocolate & Rum Barrel Notes',
      toppingName: 'Three Roasted Coffee Beans'
    },
    homeSteps: [
      { step: 1, text: 'Extract a hot, syrupy double espresso shot (60 ml).' },
      { step: 2, text: 'In a shaker with plenty of ice, combine espresso, 15 ml rich demerara syrup, and dark cacao notes.' },
      { step: 3, text: 'Shake with high vigor for 20 seconds to aerate and build a thick, velvety golden crema.' },
      { step: 4, text: 'Double strain into a chilled coupe glass; float three coffee beans representing health, wealth, and happiness.' }
    ],
    cafeScript: '“Hi! Could I please get the Espresso Martini craft coffee, shaken extra velvety?”'
  },
  {
    id: 'juniper_latte',
    name: 'Juniper Latte',
    category: 'barista_crafts',
    categoryName: 'Barista Crafts',
    price: '₹260/280',
    priceNum: 260,
    priceIced: 280,
    temp: 'Hot / Iced',
    defaultTemp: 'hot',
    dietary: ['vo'],
    description: 'Milk, double espresso and our in-house juniper berries syrup',
    vector: { sweetness: 5, bitterness: 5, creaminess: 7, fruitiness: 4, spice: 6, caffeine: 7, adventurousness: 7 },
    personas: ['zen_artisan', 'wild_pioneer'],
    cupDesign: {
      baseColor: '#3A2013',
      milkColor: '#F5EBE1',
      toppingColor: '#4338CA',
      baseName: 'Double Espresso Extraction',
      milkName: 'Steamed Whole or Oat Milk',
      flavourName: 'In-House Juniper Berry Syrup',
      toppingName: 'Crushed Forest Botanicals'
    },
    homeSteps: [
      { step: 1, text: 'Simmer crushed juniper berries in raw cane sugar and water to yield botanical syrup.' },
      { step: 2, text: 'Pull a double espresso directly over 15 ml of the juniper berry syrup.' },
      { step: 3, text: 'Steam 140 ml milk to 65°C with delicate microfoam.' },
      { step: 4, text: 'Pour milk slowly and dust with botanical juniper aromatics.' }
    ],
    cafeScript: '“Hi! Can I please get the Juniper Latte with oat milk, hot, please!”'
  },

  // ==========================================
  // PROTEIN MENU (Image 2)
  // ==========================================
  {
    id: 'protein_iced_latte',
    name: 'Protein Iced Latte',
    category: 'protein_menu',
    categoryName: 'Protein Menu (Only What\'s Needed)',
    price: '₹360',
    priceNum: 360,
    temp: 'Iced',
    defaultTemp: 'iced',
    calories: '175 kcal',
    dietary: ['protein'],
    description: 'Specialty espresso shaken over ice with pure whey / plant protein and silky milk (175 kcal)',
    vector: { sweetness: 4, bitterness: 6, creaminess: 7, fruitiness: 1, spice: 2, caffeine: 8, adventurousness: 4 },
    personas: ['bold_achiever', 'zen_artisan'],
    cupDesign: {
      baseColor: '#2C170E',
      milkColor: '#F2E8DC',
      toppingColor: '#84532B',
      baseName: 'Double Espresso Shot',
      milkName: 'High-Protein Fortified Milk',
      flavourName: 'Clean Natural Vanilla',
      toppingName: 'Protein Micro-Froth'
    },
    homeSteps: [
      { step: 1, text: 'Extract a concentrated 50 ml double shot of dark-roast espresso.' },
      { step: 2, text: 'In a shaker, blend 150 ml skim or oat milk with 1 scoop (20g) unflavoured protein.' },
      { step: 3, text: 'Add ice cubes and shake vigorously for 15 seconds until chilled and frothy.' },
      { step: 4, text: 'Pour into a tall glass over ice for an instant 20g protein morning boost.' }
    ],
    cafeScript: '“Hi! Could I please get the Protein Iced Latte (175 kcal) with oat milk?”'
  },
  {
    id: 'praline_cold_brew_protein',
    name: 'Praline Cold Brew with Protein Cold Foam',
    category: 'protein_menu',
    categoryName: 'Protein Menu (Only What\'s Needed)',
    price: '₹360',
    priceNum: 360,
    temp: 'Iced',
    defaultTemp: 'iced',
    calories: '186 kcal',
    dietary: ['protein', 'nut'],
    description: 'Praline infused cold brew topped with decadent, whipped protein cold foam (186 kcal)',
    vector: { sweetness: 5, bitterness: 6, creaminess: 7, fruitiness: 2, spice: 4, caffeine: 8, adventurousness: 6 },
    personas: ['bold_achiever', 'sunlit_optimist'],
    cupDesign: {
      baseColor: '#1E0E08',
      milkColor: '#FFFBF5',
      toppingColor: '#9A5B32',
      baseName: '18hr Steeped Praline Cold Brew',
      milkName: 'Whipped Protein Cold Foam (20g)',
      flavourName: 'Caramelized Roasted Praline',
      toppingName: 'Toasted Pecan Praline Crumbs'
    },
    homeSteps: [
      { step: 1, text: 'Steep cold brew coffee with toasted crushed pecans or praline essence.' },
      { step: 2, text: 'Fill a glass with clear ice and pour 140 ml of the praline cold brew.' },
      { step: 3, text: 'Froth 50 ml non-fat milk with 15g vanilla protein powder until a velvety foam floats.' },
      { step: 4, text: 'Gently layer the protein cold foam over the dark coffee.' }
    ],
    cafeScript: '“Hi! Can I please get the Praline Cold Brew with Protein Cold Foam (186 kcal)?”'
  },
  {
    id: 'dark_mocha_protein_latte',
    name: 'Dark Mocha Protein Latte',
    category: 'protein_menu',
    categoryName: 'Protein Menu (Only What\'s Needed)',
    price: '₹400',
    priceNum: 400,
    temp: 'Hot / Iced',
    defaultTemp: 'hot',
    calories: '260 kcal',
    dietary: ['protein'],
    description: 'Bittersweet dark chocolate, double espresso and 20g pure protein boost (260 kcal)',
    vector: { sweetness: 5, bitterness: 7, creaminess: 8, fruitiness: 1, spice: 3, caffeine: 8, adventurousness: 5 },
    personas: ['bold_achiever', 'midnight_alchemist'],
    cupDesign: {
      baseColor: '#241209',
      milkColor: '#EADBCE',
      toppingColor: '#451D0C',
      baseName: 'Espresso + 70% Dark Cacao',
      milkName: 'Steamed Protein-Enriched Milk',
      flavourName: 'Bittersweet Cocoa Infusion',
      toppingName: 'Raw Dark Chocolate Curls'
    },
    homeSteps: [
      { step: 1, text: 'Melt 1 tbsp 70% dark chocolate or unsweetened Dutch cocoa in a splash of hot water.' },
      { step: 2, text: 'Pull a double espresso directly over the melted chocolate.' },
      { step: 3, text: 'Warm 150 ml milk with 20g chocolate protein powder and whisk to froth.' },
      { step: 4, text: 'Combine with the espresso base and top with shaved dark chocolate.' }
    ],
    cafeScript: '“Hi! Could I please get the Dark Mocha Protein Latte (260 kcal) with oat milk?”'
  },
  {
    id: 'date_jaggery_iced_latte',
    name: 'Date Jaggery Iced Latte',
    category: 'protein_menu',
    categoryName: 'Protein Menu (Only What\'s Needed)',
    price: '₹400',
    priceNum: 400,
    temp: 'Iced',
    defaultTemp: 'iced',
    calories: '288 kcal',
    dietary: ['protein'],
    description: 'Whole organic date puree and unrefined jaggery with chilled espresso & protein (288 kcal)',
    vector: { sweetness: 7, bitterness: 4, creaminess: 7, fruitiness: 5, spice: 4, caffeine: 6, adventurousness: 6 },
    personas: ['cosy_dreamer', 'sweet_explorer'],
    cupDesign: {
      baseColor: '#351C0F',
      milkColor: '#F6EEDF',
      toppingColor: '#B45309',
      baseName: 'Double Shot Espresso',
      milkName: 'Protein Milk Blend',
      flavourName: 'Medjool Date & Organic Jaggery',
      toppingName: 'Caramelized Jaggery Crumbs'
    },
    homeSteps: [
      { step: 1, text: 'Blend 2 soft Medjool dates with 1 tsp warm organic jaggery syrup and a splash of milk.' },
      { step: 2, text: 'Pour date reduction into the bottom of an ice-filled tumbler.' },
      { step: 3, text: 'Add 120 ml protein-fortified milk and top with a freshly pulled double espresso.' },
      { step: 4, text: 'Stir to integrate the caramel-rich date sweetness.' }
    ],
    cafeScript: '“Hi! Can I please get the Date Jaggery Iced Latte (288 kcal) with oat milk?”'
  },
  {
    id: 'bounty_hunter',
    name: 'Bounty Hunter',
    category: 'protein_menu',
    categoryName: 'Protein Menu (Only What\'s Needed)',
    price: '₹400',
    priceNum: 400,
    temp: 'Iced',
    defaultTemp: 'iced',
    calories: '250 kcal',
    dietary: ['protein', 'vegan'],
    description: 'Coconut milk, rich dark cacao, protein cold foam and toasted coconut shavings (250 kcal)',
    vector: { sweetness: 6, bitterness: 6, creaminess: 8, fruitiness: 4, spice: 2, caffeine: 7, adventurousness: 7 },
    personas: ['sweet_explorer', 'sunlit_optimist'],
    cupDesign: {
      baseColor: '#25130A',
      milkColor: '#FAF7F2',
      toppingColor: '#D97706',
      baseName: 'Rich Cocoa Espresso',
      milkName: 'Creamy Coconut Milk',
      flavourName: 'Tropical Coconut & Dark Cacao',
      toppingName: 'Toasted Golden Coconut Flakes'
    },
    homeSteps: [
      { step: 1, text: 'Whisk dark cocoa powder into hot espresso and chill over ice.' },
      { step: 2, text: 'Add 120 ml chilled coconut milk.' },
      { step: 3, text: 'Whip 40 ml coconut cream with 15g vanilla protein into cold foam.' },
      { step: 4, text: 'Spoon foam over top and garnish with toasted coconut chips.' }
    ],
    cafeScript: '“Hi! I’d love the Bounty Hunter (250 kcal) iced protein coffee with toasted coconut!”'
  },
  {
    id: 'almond_butter_iced_latte',
    name: 'Almond Butter Iced Latte / Matcha',
    category: 'protein_menu',
    categoryName: 'Protein Menu (Only What\'s Needed)',
    price: '₹420',
    priceNum: 420,
    temp: 'Iced',
    defaultTemp: 'iced',
    calories: '265 kcal',
    dietary: ['protein', 'nut'],
    description: 'Stone-ground slow roasted almond butter with espresso or matcha and protein (265 kcal)',
    vector: { sweetness: 5, bitterness: 5, creaminess: 9, fruitiness: 2, spice: 3, caffeine: 7, adventurousness: 6 },
    personas: ['zen_artisan', 'bold_achiever'],
    cupDesign: {
      baseColor: '#3A2114',
      milkColor: '#EFE7DA',
      toppingColor: '#8C4D26',
      baseName: 'Espresso or Ceremonial Matcha',
      milkName: 'Almond Butter Swirled Milk',
      flavourName: 'Stone-Ground Roasted Almond',
      toppingName: 'Almond Butter Drizzle'
    },
    homeSteps: [
      { step: 1, text: 'Swirl 1 tbsp creamy stone-ground almond butter around the glass walls.' },
      { step: 2, text: 'Shake 130 ml milk with protein powder and pour over ice.' },
      { step: 3, text: 'Extract espresso shot or whisk matcha and pour over the milk.' },
      { step: 4, text: 'Stir for a thick, nutty, satisfying sip.' }
    ],
    cafeScript: '“Hi! Can I please get the Almond Butter Iced Latte (265 kcal) with oat milk?”'
  },

  // ==========================================
  // MATCHA BAR (Image 1)
  // ==========================================
  {
    id: 'oat_matcha_latte',
    name: 'Oat Matcha Latte',
    category: 'matcha_bar',
    categoryName: 'Matcha Bar',
    price: '₹360/380',
    priceNum: 360,
    priceIced: 380,
    temp: 'Hot / Iced',
    defaultTemp: 'hot',
    dietary: ['vegan'],
    description: 'Oat milk and ceremonial matcha whisked to silky perfection',
    vector: { sweetness: 4, bitterness: 4, creaminess: 8, fruitiness: 3, spice: 2, caffeine: 5, adventurousness: 4 },
    personas: ['zen_artisan', 'minimalist_purist'],
    cupDesign: {
      baseColor: '#4D7C0F',
      milkColor: '#F3EBD8',
      toppingColor: '#65A30D',
      baseName: 'First-Harvest Ceremonial Matcha',
      milkName: 'Barista Steamed Oat Milk',
      flavourName: 'Subtle Umami & Grassy Notes',
      toppingName: 'Vibrant Green Matcha Dust'
    },
    homeSteps: [
      { step: 1, text: 'Sift 2g (1 tsp) ceremonial Japanese matcha into a shallow bowl.' },
      { step: 2, text: 'Add 60 ml 80°C hot water and whisk in a "W" motion with a bamboo whisk until frothy.' },
      { step: 3, text: 'Steam 140 ml barista oat milk to 60°C until glossy microfoam forms.' },
      { step: 4, text: 'Pour oat milk into a ceramic bowl and dust with fine ceremonial matcha.' }
    ],
    cafeScript: '“Hi! Could I please get the Oat Matcha Latte, hot, with no extra sweetener, please?”'
  },
  {
    id: 'coconut_iced_matcha',
    name: 'Coconut Iced Matcha',
    category: 'matcha_bar',
    categoryName: 'Matcha Bar',
    price: '₹340',
    priceNum: 340,
    temp: 'Iced',
    defaultTemp: 'iced',
    dietary: ['vegan'],
    description: 'Coconut water, blue pea tea, matcha cold foam',
    vector: { sweetness: 5, bitterness: 3, creaminess: 5, fruitiness: 5, spice: 1, caffeine: 5, adventurousness: 8 },
    personas: ['sunlit_optimist', 'wild_pioneer'],
    cupDesign: {
      baseColor: '#2563EB',
      milkColor: '#EFF6FF',
      toppingColor: '#4D7C0F',
      baseName: 'Blue Pea Flower & Coconut Water',
      milkName: 'Hydrating Coconut Layer',
      flavourName: 'Tender Coconut & Floral Tea',
      toppingName: 'Velvety Matcha Cold Foam'
    },
    homeSteps: [
      { step: 1, text: 'Brew butterfly pea flower tea and combine with chilled fresh coconut water.' },
      { step: 2, text: 'Fill glass with ice and pour the blue coconut tea.' },
      { step: 3, text: 'Whisk ceremonial matcha with oat milk and a drop of agave into a rich cold foam.' },
      { step: 4, text: 'Float matcha foam on top for a stunning green-over-blue visual contrast.' }
    ],
    cafeScript: '“Hi! Could I please get the Coconut Iced Matcha with blue pea tea and matcha cold foam?”'
  },
  {
    id: 'tiramisu_matcha',
    name: 'Tiramisu Matcha',
    category: 'matcha_bar',
    categoryName: 'Matcha Bar',
    price: '₹380 (Iced)',
    priceNum: 380,
    temp: 'Iced',
    defaultTemp: 'iced',
    dietary: [],
    description: 'Matcha, oat milk, tiramisu cream, ladyfinger',
    vector: { sweetness: 7, bitterness: 3, creaminess: 9, fruitiness: 2, spice: 2, caffeine: 5, adventurousness: 7 },
    personas: ['sweet_explorer', 'cosy_dreamer'],
    cupDesign: {
      baseColor: '#4D7C0F',
      milkColor: '#F7EEDD',
      toppingColor: '#65A30D',
      baseName: 'Iced Ceremonial Matcha',
      milkName: 'Chilled Oat Milk',
      flavourName: 'Whipped Mascarpone Tiramisu Cream',
      toppingName: 'Crisp Ladyfinger & Matcha Dust'
    },
    homeSteps: [
      { step: 1, text: 'Whisk 2g ceremonial matcha with cold water and pour over ice with oat milk.' },
      { step: 2, text: 'Whip mascarpone cream with powdered sugar and vanilla into a thick cloud.' },
      { step: 3, text: 'Spoon the tiramisu cream over the green matcha layer.' },
      { step: 4, text: 'Dust generously with matcha powder and dip a sweet Italian ladyfinger.' }
    ],
    cafeScript: '“Hi! I would love the Tiramisu Matcha with tiramisu cream and ladyfinger, please!”'
  },
  {
    id: 'dirty_matcha',
    name: 'Dirty Matcha',
    category: 'matcha_bar',
    categoryName: 'Matcha Bar',
    price: '₹360/380',
    priceNum: 360,
    priceIced: 380,
    temp: 'Hot / Iced',
    defaultTemp: 'hot',
    dietary: ['vo'],
    description: 'Matcha, espresso, choice of milk for a dual-caffeine harmony',
    vector: { sweetness: 3, bitterness: 7, creaminess: 7, fruitiness: 2, spice: 3, caffeine: 9, adventurousness: 7 },
    personas: ['bold_achiever', 'midnight_alchemist'],
    cupDesign: {
      baseColor: '#382216',
      milkColor: '#F1E9DB',
      toppingColor: '#4D7C0F',
      baseName: 'Single Shot Espresso Base',
      milkName: 'Choice of Steamed Milk',
      flavourName: 'Ceremonial Matcha Shot',
      toppingName: 'Dual Swirl Matcha & Espresso Crema'
    },
    homeSteps: [
      { step: 1, text: 'Whisk 1.5g ceremonial matcha in 40 ml warm water and pour into cup.' },
      { step: 2, text: 'Add 100 ml steamed milk gently.' },
      { step: 3, text: 'Extract a fresh 30 ml espresso shot and pour directly into the center.' },
      { step: 4, text: 'Sip without stirring to experience the distinct layers of coffee boldness and umami.' }
    ],
    cafeScript: '“Hi! Can I please get the Dirty Matcha with oat milk, hot?”'
  },
  {
    id: 'berry_matcha_lemonade',
    name: 'Berry Matcha Lemonade',
    category: 'matcha_bar',
    categoryName: 'Matcha Bar',
    price: '₹380 (Iced)',
    priceNum: 380,
    temp: 'Iced',
    defaultTemp: 'iced',
    dietary: ['vegan'],
    description: 'Blueberry, lemon, mint, fizz, matcha',
    vector: { sweetness: 6, bitterness: 3, creaminess: 1, fruitiness: 9, spice: 3, caffeine: 5, adventurousness: 9 },
    personas: ['wild_pioneer', 'sunlit_optimist'],
    cupDesign: {
      baseColor: '#6D28D9',
      milkColor: 'transparent',
      toppingColor: '#4D7C0F',
      baseName: 'Crushed Wild Blueberries & Lemon',
      milkName: 'None (Sparkling Lemonade)',
      flavourName: 'Fresh Mint & Citrus Fizz',
      toppingName: 'Floating Chilled Ceremonial Matcha'
    },
    homeSteps: [
      { step: 1, text: 'Muddle fresh blueberries, lemon juice, and torn mint leaves with agave in a tall glass.' },
      { step: 2, text: 'Fill with ice and top with sparkling soda water.' },
      { step: 3, text: 'Whisk ceremonial matcha with cold water and float over the berry lemonade.' },
      { step: 4, text: 'Garnish with a sprig of fresh mint and whole blueberries.' }
    ],
    cafeScript: '“Hi! Could I get the Berry Matcha Lemonade iced, please!”'
  },

  // ==========================================
  // CLASSIC COFFEES (Image 3)
  // ==========================================
  {
    id: 'flat_white',
    name: 'Flat White',
    category: 'classic_coffees',
    categoryName: 'Classic Coffees',
    price: '₹250',
    priceNum: 250,
    temp: 'Hot',
    defaultTemp: 'hot',
    dietary: ['vo'],
    description: 'Double ristretto with micro-textured velvety steamed milk (Espresso + Steamed Milk)',
    vector: { sweetness: 4, bitterness: 6, creaminess: 7, fruitiness: 2, spice: 2, caffeine: 8, adventurousness: 3 },
    personas: ['zen_artisan', 'bold_achiever'],
    cupDesign: {
      baseColor: '#361E12',
      milkColor: '#F5ECE1',
      toppingColor: '#C49767',
      baseName: 'Double Ristretto Espresso',
      milkName: 'Velvety Micro-Textured Milk',
      flavourName: 'Pure Specialty Coffee Notes',
      toppingName: 'Delicate Barista Rosetta'
    },
    homeSteps: [
      { step: 1, text: 'Extract a double ristretto shot (40 ml) in 22 seconds for sweet, concentrated extraction.' },
      { step: 2, text: 'Steam 130 ml milk with minimal aeration for silky, glossy wet microfoam.' },
      { step: 3, text: 'Pour steadily from 3 inches high, then bring pitcher close to surface to draw a crisp rosetta.' },
      { step: 4, text: 'Serve immediately in a preheated 160 ml ceramic cup.' }
    ],
    cafeScript: '“Hi! Could I please get a Flat White with oat milk, served in a ceramic cup?”'
  },
  {
    id: 'cortado_classic',
    name: 'Cortado',
    category: 'classic_coffees',
    categoryName: 'Classic Coffees',
    price: '₹180',
    priceNum: 180,
    temp: 'Hot',
    defaultTemp: 'hot',
    dietary: ['vo'],
    description: 'Equal parts double espresso and silky steamed milk (1:1 ratio)',
    vector: { sweetness: 3, bitterness: 7, creaminess: 5, fruitiness: 2, spice: 2, caffeine: 8, adventurousness: 3 },
    personas: ['zen_artisan', 'bold_achiever'],
    cupDesign: {
      baseColor: '#311A0E',
      milkColor: '#EADBCE',
      toppingColor: '#B45309',
      baseName: 'Double Espresso (50%)',
      milkName: 'Steamed Milk (50%)',
      flavourName: 'Balanced Espresso & Warm Dairy',
      toppingName: 'Velvety Espresso Crema Ring'
    },
    homeSteps: [
      { step: 1, text: 'Pull 50 ml double shot espresso into a small Gibraltar glass.' },
      { step: 2, text: 'Steam 50 ml milk to 60°C.' },
      { step: 3, text: 'Cut the espresso acidity by pouring milk in a 1:1 proportion.' },
      { step: 4, text: 'Enjoy the punchy espresso mouthfeel softened by sweet warm milk.' }
    ],
    cafeScript: '“Hi! Can I please get a Cortado in a Gibraltar glass?”'
  },
  {
    id: 'cappuccino_classic',
    name: 'Cappuccino',
    category: 'classic_coffees',
    categoryName: 'Classic Coffees',
    price: '₹220',
    priceNum: 220,
    temp: 'Hot',
    defaultTemp: 'hot',
    dietary: ['vo'],
    description: 'Espresso, steamed milk, and a dense luxurious cushion of milk foam',
    vector: { sweetness: 4, bitterness: 6, creaminess: 8, fruitiness: 2, spice: 2, caffeine: 7, adventurousness: 3 },
    personas: ['cosy_dreamer', 'zen_artisan'],
    cupDesign: {
      baseColor: '#3A2013',
      milkColor: '#F5ECE1',
      toppingColor: '#D97706',
      baseName: 'Full Espresso Shot',
      milkName: 'Steamed Milk Layer',
      flavourName: 'Warm Coffee Aromatics',
      toppingName: 'Dense Pillowy Milk Foam Cap'
    },
    homeSteps: [
      { step: 1, text: 'Extract 30 ml rich espresso into a warm cup.' },
      { step: 2, text: 'Aerate milk with your steam wand to double its volume with dense microfoam.' },
      { step: 3, text: 'Pour milk slowly and crown with a plush 1.5cm dome of glossy foam.' },
      { step: 4, text: 'Optionally dust with cocoa powder or raw demerara.' }
    ],
    cafeScript: '“Hi! Could I please get a hot Cappuccino with oat milk, extra fluffy foam?”'
  },
  {
    id: 'americano_classic',
    name: 'Americano',
    category: 'classic_coffees',
    categoryName: 'Classic Coffees',
    price: '₹180/190',
    priceNum: 180,
    priceIced: 190,
    temp: 'Hot / Iced',
    defaultTemp: 'hot',
    dietary: ['vegan'],
    description: 'Double espresso pulled over hot filtered water or crisp ice (Espresso + Water)',
    vector: { sweetness: 2, bitterness: 7, creaminess: 1, fruitiness: 4, spice: 1, caffeine: 8, adventurousness: 2 },
    personas: ['minimalist_purist', 'bold_achiever'],
    cupDesign: {
      baseColor: '#2B160B',
      milkColor: 'transparent',
      toppingColor: '#8C4A27',
      baseName: 'Double Espresso Extraction',
      milkName: 'None (Pure Water Dilution)',
      flavourName: 'Single-Origin Bean Terroir',
      toppingName: 'Intact Golden Espresso Crema'
    },
    homeSteps: [
      { step: 1, text: 'Fill your mug with 150 ml of 90°C filtered water (or ice cubes for iced).' },
      { step: 2, text: 'Pull a double espresso shot directly over the water to preserve the crema.' },
      { step: 3, text: 'Swirl cup gently and inhale the roast aromas.' }
    ],
    cafeScript: '“Hi! Could I get an Americano (hot/iced) with an extra shot, please?”'
  },
  {
    id: 'cafe_mocha_classic',
    name: 'Cafe Mocha',
    category: 'classic_coffees',
    categoryName: 'Classic Coffees',
    price: '₹260',
    priceNum: 260,
    temp: 'Hot',
    defaultTemp: 'hot',
    dietary: [],
    description: 'Layered melted chocolate, espresso, steamed milk, and sweet milk foam',
    vector: { sweetness: 8, bitterness: 4, creaminess: 8, fruitiness: 2, spice: 3, caffeine: 7, adventurousness: 4 },
    personas: ['sweet_explorer', 'cosy_dreamer'],
    cupDesign: {
      baseColor: '#220E06',
      milkColor: '#F5ECE1',
      toppingColor: '#58240D',
      baseName: 'Double Espresso + Melted Chocolate',
      milkName: 'Steamed Sweetened Milk',
      flavourName: 'Belgian Cocoa Melt',
      toppingName: 'Cocoa Powder Dusting'
    },
    homeSteps: [
      { step: 1, text: 'Stir 20g chocolate ganache or dark cocoa into 60 ml hot espresso until completely melted.' },
      { step: 2, text: 'Steam 140 ml milk until sweet microfoam forms.' },
      { step: 3, text: 'Pour milk into chocolate espresso; garnish with cocoa powder.' }
    ],
    cafeScript: '“Hi! Can I please get the Cafe Mocha with oat milk, hot?”'
  },

  // ==========================================
  // MANUAL BREW (Image 3)
  // ==========================================
  {
    id: 'manual_brew_pour_over',
    name: 'Manual Brew (V60 / Chemex)',
    category: 'manual_brew',
    categoryName: 'Manual Brew',
    price: '₹280/320',
    priceNum: 280,
    temp: 'Hot / Iced',
    defaultTemp: 'hot',
    dietary: ['vegan'],
    description: 'Precision filter brew highlighting single-origin floral clarity and fruit acidity',
    vector: { sweetness: 3, bitterness: 4, creaminess: 1, fruitiness: 9, spice: 2, caffeine: 7, adventurousness: 7 },
    personas: ['minimalist_purist'],
    cupDesign: {
      baseColor: '#4A2A16',
      milkColor: 'transparent',
      toppingColor: '#D97706',
      baseName: 'Single-Origin Nano-Lot Grounds',
      milkName: 'None (Pure Clarity Extraction)',
      flavourName: 'Jasmine, Bergamot & Stone Fruit',
      toppingName: 'Crystal Clear Amber Cup'
    },
    homeSteps: [
      { step: 1, text: 'Rinse paper filter with boiling water to remove papery taste; discard water.' },
      { step: 2, text: 'Add 15g medium-coarse grounds. Pour 45g hot water (93°C) and let bloom for 40 seconds.' },
      { step: 3, text: 'Pour remaining water in slow concentric spirals up to 250g total weight.' },
      { step: 4, text: 'Swirl carafe and sip as it cools to experience evolving floral and fruit notes.' }
    ],
    cafeScript: '“Hi! What Nano-Lot or Micro-Lot coffees do you have on V60 or Chemex today?”'
  },

  // ==========================================
  // SPECIALTY TEAS (Image 1)
  // ==========================================
  {
    id: 'hibiscus_tea',
    name: 'Hibiscus Tisane',
    category: 'specialty_teas',
    categoryName: 'Specialty Teas (Herbal Tisane)',
    price: '₹180/220',
    priceNum: 180,
    priceIced: 220,
    temp: 'Hot / Iced',
    defaultTemp: 'iced',
    dietary: ['vegan'],
    description: 'Tart, ruby-red floral tisane packed with antioxidants (Ask for seasonal tea)',
    vector: { sweetness: 5, bitterness: 2, creaminess: 1, fruitiness: 9, spice: 3, caffeine: 1, adventurousness: 6 },
    personas: ['sunlit_optimist', 'minimalist_purist'],
    cupDesign: {
      baseColor: '#BE123C',
      milkColor: 'transparent',
      toppingColor: '#FB7185',
      baseName: 'Whole Dried Hibiscus Flowers',
      milkName: 'None (Ruby Red Tisane)',
      flavourName: 'Tart Cranberry & Wild Rose',
      toppingName: 'Dehydrated Orange Wheel & Mint'
    },
    homeSteps: [
      { step: 1, text: 'Steep 2 tbsp dried organic hibiscus flowers in 200 ml boiling water for 5 minutes.' },
      { step: 2, text: 'Strain over ice and sweeten with a spoon of raw wildflower honey if desired.' },
      { step: 3, text: 'Garnish with a slice of fresh orange and mint.' }
    ],
    cafeScript: '“Hi! Could I please get the Hibiscus Tisane iced, with a slice of orange?”'
  },
  {
    id: 'earl_grey_black_tea',
    name: 'Earl Grey Black Tea',
    category: 'specialty_teas',
    categoryName: 'Specialty Teas (Classic)',
    price: '₹180/200',
    priceNum: 180,
    priceIced: 200,
    temp: 'Hot / Iced',
    defaultTemp: 'hot',
    dietary: ['vegan'],
    description: 'High grown black tea scented with oil of bergamot citrus (Hot / Iced)',
    vector: { sweetness: 3, bitterness: 4, creaminess: 1, fruitiness: 6, spice: 4, caffeine: 4, adventurousness: 3 },
    personas: ['minimalist_purist', 'zen_artisan'],
    cupDesign: {
      baseColor: '#602B11',
      milkColor: 'transparent',
      toppingColor: '#D97706',
      baseName: 'Bergamot-Scented Black Tea',
      milkName: 'Optional Steamed Milk',
      flavourName: 'Citrus Bergamot & Malt',
      toppingName: 'Lemon Twist'
    },
    homeSteps: [
      { step: 1, text: 'Steep 3g Earl Grey loose leaf in 95°C water for 3.5 minutes.' },
      { step: 2, text: 'Strain into a warm porcelain cup.' },
      { step: 3, text: 'Enjoy clean with a twist of lemon or a dash of warm oat milk.' }
    ],
    cafeScript: '“Hi! Could I please get an Earl Grey black tea, hot, with a slice of lemon?”'
  },

  // ==========================================
  // DESSERTS & TEA CAKES (Physical Menu)
  // ==========================================
  {
    id: 'menu_ny_cheesecake',
    name: 'New York Cheesecake',
    category: 'desserts',
    categoryName: 'Desserts',
    price: '\u20b9260',
    priceNum: 260,
    temp: 'Room Temp',
    defaultTemp: 'hot',
    dietary: [],
    description: 'A timeless New York style cheesecake with a luscious cream cheese filling and a golden buttery crust. Add-on: Nutella / Blueberry / Biscoff +\u20b960',
    vector: { sweetness: 8, bitterness: 1, creaminess: 9, fruitiness: 2, spice: 1, caffeine: 1, adventurousness: 3 },
    personas: ['sweet_explorer', 'cosy_dreamer'],
    cupDesign: {
      baseColor: '#F4EDDC',
      milkColor: '#FAF5EE',
      toppingColor: '#DAA520',
      baseName: 'Golden Buttery Biscuit Crust',
      milkName: 'Luscious Cream Cheese Filling',
      flavourName: 'Vanilla Bean & Lemon Zest',
      toppingName: 'Nutella / Blueberry / Biscoff Add-on'
    },
    homeSteps: [
      { step: 1, text: 'Allow the cheesecake to come to room temperature for 15 minutes before serving.' },
      { step: 2, text: 'Slice cleanly with a warm knife for a pristine presentation.' },
      { step: 3, text: 'Optionally drizzle warm Nutella, blueberry compote, or crushed Biscoff on top.' },
      { step: 4, text: 'Pair with a flat white or cortado for the perfect cafe experience.' }
    ],
    cafeScript: '"Hi! Could I please get a slice of the New York Cheesecake with a Blueberry topping?"'
  },
  {
    id: 'menu_classic_tiramisu',
    name: 'Classic Tiramisu',
    category: 'desserts',
    categoryName: 'Desserts',
    price: '\u20b9300',
    priceNum: 300,
    temp: 'Chilled',
    defaultTemp: 'iced',
    dietary: [],
    description: 'Layers of espresso-soaked biscuits, silky mascarpone cream, and a generous dusting of rich cocoa for a timeless Italian classic.',
    vector: { sweetness: 7, bitterness: 4, creaminess: 9, fruitiness: 1, spice: 2, caffeine: 5, adventurousness: 5 },
    personas: ['cosy_dreamer', 'zen_artisan', 'midnight_alchemist'],
    cupDesign: {
      baseColor: '#2E1608',
      milkColor: '#FDFAF5',
      toppingColor: '#4A2311',
      baseName: 'Espresso-Soaked Savoiardi Biscuits',
      milkName: 'Silky Mascarpone Cream',
      flavourName: 'Dark Espresso & Cocoa',
      toppingName: 'Generous Dutch Cocoa Dusting'
    },
    homeSteps: [
      { step: 1, text: 'Brew a strong double espresso and let it cool to room temperature.' },
      { step: 2, text: 'Quickly dip ladyfinger biscuits in espresso and layer in a serving dish.' },
      { step: 3, text: 'Whip mascarpone with egg yolks and sugar until velvety, then layer over biscuits.' },
      { step: 4, text: 'Refrigerate 4 hours then finish with a heavy dusting of fine cocoa powder.' }
    ],
    cafeScript: '"Hi! Could I please get the Classic Tiramisu?"'
  },
  {
    id: 'menu_mocha_fudge_cake',
    name: 'Mocha Fudge Cake',
    category: 'desserts',
    categoryName: 'Desserts',
    price: '\u20b9300',
    priceNum: 300,
    temp: 'Room Temp',
    defaultTemp: 'hot',
    dietary: [],
    description: 'Decadent chocolate sponge layered with luscious mocha fudge for a rich and satisfying coffee chocolate indulgence.',
    vector: { sweetness: 8, bitterness: 5, creaminess: 7, fruitiness: 1, spice: 2, caffeine: 6, adventurousness: 4 },
    personas: ['sweet_explorer', 'midnight_alchemist', 'bold_achiever'],
    cupDesign: {
      baseColor: '#1A0A04',
      milkColor: '#3E1E0E',
      toppingColor: '#7B3F00',
      baseName: 'Dark Chocolate Sponge Layers',
      milkName: 'Mocha Fudge Filling',
      flavourName: 'Espresso & Belgian Cocoa',
      toppingName: 'Glossy Chocolate Ganache'
    },
    homeSteps: [
      { step: 1, text: 'Mix dark cocoa, flour, sugar, and a double shot of cooled espresso for the sponge.' },
      { step: 2, text: 'Bake at 175\u00b0C for 30 minutes then cool completely.' },
      { step: 3, text: 'Melt dark chocolate with butter and cream then stir in espresso for mocha fudge.' },
      { step: 4, text: 'Layer and frost generously, then refrigerate for an hour before slicing.' }
    ],
    cafeScript: '"Hi! Could I please get a slice of the Mocha Fudge Cake?"'
  },
  {
    id: 'menu_almond_cake',
    name: 'Almond Cake',
    category: 'desserts',
    categoryName: 'Tea Cakes',
    price: '\u20b9160 (2 pcs)',
    priceNum: 160,
    temp: 'Room Temp',
    defaultTemp: 'hot',
    dietary: ['nut'],
    description: 'Moist chocolate tea cake studded with roasted almonds and baked fresh in-house.',
    vector: { sweetness: 6, bitterness: 3, creaminess: 5, fruitiness: 1, spice: 3, caffeine: 2, adventurousness: 3 },
    personas: ['zen_artisan', 'cosy_dreamer'],
    cupDesign: {
      baseColor: '#5C2E12',
      milkColor: '#C8A882',
      toppingColor: '#8B4513',
      baseName: 'Chocolate Tea Cake Batter',
      milkName: 'Light Moist Crumb',
      flavourName: 'Roasted Whole Almonds',
      toppingName: 'Toasted Almond Flake Crown'
    },
    homeSteps: [
      { step: 1, text: 'Fold crushed roasted almonds into a buttery chocolate muffin batter.' },
      { step: 2, text: 'Spoon into lined cake tins and crown with whole almonds.' },
      { step: 3, text: 'Bake at 170\u00b0C for 20 minutes until a skewer comes out clean.' },
      { step: 4, text: 'Enjoy warm alongside a flat white or cortado.' }
    ],
    cafeScript: '"Hi! Could I please get 2 pieces of the Almond Cake?"'
  },
  {
    id: 'menu_lemon_tea_cake',
    name: 'Lemon Tea Cake',
    category: 'desserts',
    categoryName: 'Tea Cakes',
    price: '\u20b9160 (2 pcs)',
    priceNum: 160,
    temp: 'Room Temp',
    defaultTemp: 'hot',
    dietary: ['vegan'],
    description: 'A soft, buttery tea cake infused with fresh lemon, offering a bright citrus flavour and a light, moist crumb.',
    vector: { sweetness: 6, bitterness: 1, creaminess: 4, fruitiness: 8, spice: 2, caffeine: 1, adventurousness: 4 },
    personas: ['sunlit_optimist', 'minimalist_purist', 'wild_pioneer'],
    cupDesign: {
      baseColor: '#E8D44D',
      milkColor: '#FFFDE7',
      toppingColor: '#FFC107',
      baseName: 'Lemon-Zested Buttery Batter',
      milkName: 'Soft Moist Crumb',
      flavourName: 'Fresh Sicilian Lemon Juice & Zest',
      toppingName: 'Thin Lemon Sugar Glaze'
    },
    homeSteps: [
      { step: 1, text: 'Cream butter and sugar until pale, then fold in flour, lemon zest, and fresh lemon juice.' },
      { step: 2, text: 'Pour into small loaf or muffin tins lined with baking paper.' },
      { step: 3, text: 'Bake at 170\u00b0C for 18\u201322 minutes until golden and springy to touch.' },
      { step: 4, text: 'Drizzle with a thin lemon sugar glaze while still warm for a glossy citrus finish.' }
    ],
    cafeScript: '"Hi! Could I please get 2 pieces of the Lemon Tea Cake?"'
  }
];

// Helper to find drink by persona and constraints
export function matchDrinkFromMenu(personaId, vector, constraints = {}, preferredTemp = 'flexible') {
  let candidates = [...CAFE_MENU_ITEMS];

  // 1. Dietary filters
  if (constraints.vegan) {
    candidates = candidates.filter(item => 
      item.dietary.includes('vegan') || item.dietary.includes('vo')
    );
  }

  // 2. Score candidates by vector distance and persona match
  const scored = candidates.map(item => {
    let score = 0;

    // Persona match bonus
    if (item.personas.includes(personaId)) {
      score += 25;
    }

    // Temperature preference
    if (preferredTemp === 'iced' && (item.temp === 'Iced' || item.temp === 'Hot / Iced')) {
      score += 10;
      if (item.defaultTemp === 'iced') score += 5;
    } else if (preferredTemp === 'hot' && (item.temp === 'Hot' || item.temp === 'Hot / Iced')) {
      score += 10;
      if (item.defaultTemp === 'hot') score += 5;
    }

    // Vector proximity
    let dist = 0;
    const keys = ['sweetness', 'bitterness', 'creaminess', 'fruitiness', 'spice', 'caffeine', 'adventurousness'];
    keys.forEach(k => {
      const diff = (vector[k] || 5) - (item.vector[k] || 5);
      dist += diff * diff;
    });
    score -= Math.sqrt(dist) * 2;

    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.item || CAFE_MENU_ITEMS[0];
}
