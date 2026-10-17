// 10 Curated Quiz Questions aligned with PRD Section 6.2 & Section 7.1
export const QUIZ_QUESTIONS = [
  {
    id: 'morning_routine',
    order: 1,
    title: 'What does your ideal morning look like?',
    subtitle: 'Be honest — this sets your coffee energy baseline.',
    dimensionInfluences: ['caffeine', 'creaminess', 'spice'],
    options: [
      {
        id: 'slow_quiet',
        label: 'Slow and quiet',
        description: 'Reading, mindful moments, serene stillness',
        icon: '🌅',
        weights: { creaminess: 3, spice: 2, caffeine: 1, sweetness: 1 }
      },
      {
        id: 'fast_productive',
        label: 'Fast and productive',
        description: 'Up and conquering the to-do list at 7 AM',
        icon: '⚡',
        weights: { caffeine: 4, bitterness: 2, creaminess: -1 }
      },
      {
        id: 'spontaneous',
        label: 'Spontaneous & playful',
        description: 'Whatever inspiration strikes when I wake up',
        icon: '🎈',
        weights: { adventurousness: 3, fruitiness: 2, sweetness: 2 }
      },
      {
        id: 'not_morning',
        label: 'I am NOT a morning person',
        description: 'Do not speak to me until my second cup',
        icon: '😴',
        weights: { caffeine: 5, sweetness: 2, bitterness: 2 }
      }
    ]
  },
  {
    id: 'weekend_vibe',
    order: 2,
    title: 'Pick your ultimate weekend vibe.',
    subtitle: 'Where does your mind wander on Saturday morning?',
    dimensionInfluences: ['creaminess', 'spice', 'fruitiness', 'adventurousness'],
    options: [
      {
        id: 'cosy_home',
        label: 'Cosy at home',
        description: 'Oversized blanket, warm book, acoustic playlist',
        icon: '🛋️',
        weights: { creaminess: 4, spice: 3, sweetness: 2 }
      },
      {
        id: 'outdoors',
        label: 'Adventure outdoors',
        description: 'Hiking trails, fresh mountain air, sunrise trek',
        icon: '🌲',
        weights: { fruitiness: 3, adventurousness: 2, bitterness: 2 }
      },
      {
        id: 'cafe_hopping',
        label: 'Friends & café-hopping',
        description: 'Lively chatter, avocado toast, trying new roasts',
        icon: '☕',
        weights: { sweetness: 2, creaminess: 3, adventurousness: 2 }
      },
      {
        id: 'creative_project',
        label: 'Deep creative project',
        description: 'Painting, writing, coding, lost in flow state',
        icon: '🎨',
        weights: { caffeine: 3, bitterness: 3, adventurousness: 2 }
      }
    ]
  },
  {
    id: 'flavor_profile',
    order: 3,
    title: 'How do you like your flavours?',
    subtitle: 'The compass for your taste buds.',
    dimensionInfluences: ['sweetness', 'bitterness', 'fruitiness', 'spice'],
    options: [
      {
        id: 'sweet_indulgent',
        label: 'Sweet & indulgent',
        description: 'Rich caramel, velvety vanilla, dessert vibes',
        icon: '🍯',
        weights: { sweetness: 5, creaminess: 3, bitterness: -2 }
      },
      {
        id: 'bold_bitter',
        label: 'Bold & bitter',
        description: 'Dark, smoky, uncompromised, intense cacao',
        icon: '☕',
        weights: { bitterness: 5, caffeine: 2, sweetness: -3 }
      },
      {
        id: 'fruity_bright',
        label: 'Fruity & vibrant',
        description: 'Bright citrus acidity, berries, floral jasmine',
        icon: '🍓',
        weights: { fruitiness: 5, bitterness: 1, creaminess: -2 }
      },
      {
        id: 'nutty_warm',
        label: 'Nutty & warm',
        description: 'Toasted hazelnut, warm almond, comforting biscuit',
        icon: '🌰',
        weights: { spice: 4, creaminess: 3, sweetness: 1 }
      },
      {
        id: 'spicy_curious',
        label: 'Spiced & curious',
        description: 'Ceylon cinnamon, cardamom, hint of clove or chili',
        icon: '🌶️',
        weights: { spice: 5, adventurousness: 4, bitterness: 1 }
      }
    ]
  },
  {
    id: 'temperature_preference',
    order: 4,
    title: 'Hot or cold brew?',
    subtitle: 'The sacred temperature debate.',
    dimensionInfluences: ['temperature'],
    options: [
      {
        id: 'always_hot',
        label: 'Always steaming hot',
        description: 'A soothing warm mug held in both hands',
        icon: '♨️',
        temperature: 'hot',
        weights: { creaminess: 2, spice: 2 }
      },
      {
        id: 'always_iced',
        label: 'Always iced',
        description: 'Clinking ice cubes, even in the dead of winter',
        icon: '🧊',
        temperature: 'iced',
        weights: { sweetness: 1, fruitiness: 2, creaminess: 1 }
      },
      {
        id: 'depends_weather',
        label: 'Depends on the weather',
        description: 'Sunny afternoon iced, chilly rainy morning hot',
        icon: '⛅',
        temperature: 'flexible',
        weights: { adventurousness: 1 }
      }
    ]
  },
  {
    id: 'caffeine_kick',
    order: 5,
    title: 'How strong do you want your caffeine kick?',
    subtitle: 'From gentle breeze to rocket launcher.',
    dimensionInfluences: ['caffeine'],
    options: [
      {
        id: 'gentle',
        label: 'Gentle & mellow',
        description: 'Just a whisper of energy, or decaf-friendly',
        icon: '🕊️',
        weights: { caffeine: 1 },
        constraints: { lowCaffeine: true }
      },
      {
        id: 'medium',
        label: 'Balanced & steady',
        description: 'Smooth, focus-enhancing, no afternoon jitters',
        icon: '⚖️',
        weights: { caffeine: 5 }
      },
      {
        id: 'maximum',
        label: 'Maximum rocket fuel',
        description: 'Double espresso punch to awaken my ancestors',
        icon: '🚀',
        weights: { caffeine: 10, bitterness: 3 }
      }
    ]
  },
  {
    id: 'pick_dessert',
    order: 6,
    title: 'Pick a dessert from the bakery counter.',
    subtitle: 'Your dessert choice reveals your subtle aroma cravings.',
    dimensionInfluences: ['sweetness', 'spice', 'fruitiness'],
    options: [
      {
        id: 'new_york_cheesecake',
        label: 'New York Cheesecake',
        price: '₹260',
        description: 'A timeless New York style cheesecake with a luscious cream cheese filling and a golden buttery crust (Add Nutella / Blueberry / Biscoff +₹60)',
        icon: '🍰',
        weights: { creaminess: 4, sweetness: 3 }
      },
      {
        id: 'classic_tiramisu',
        label: 'Classic Tiramisu',
        price: '₹300',
        description: 'Layers of espresso-soaked biscuits, silky mascarpone cream, and a generous dusting of rich cocoa for a timeless Italian classic',
        icon: '☕',
        weights: { creaminess: 4, bitterness: 2, sweetness: 3 }
      },
      {
        id: 'mocha_fudge_cake',
        label: 'Mocha Fudge Cake',
        price: '₹300',
        description: 'Decadent chocolate sponge layered with luscious mocha fudge for a rich and satisfying coffee chocolate indulgence',
        icon: '🍫',
        weights: { bitterness: 3, sweetness: 4, creaminess: 2 }
      },
      {
        id: 'almond_tea_cake',
        label: 'Almond Cake',
        price: '₹160 (2 pcs)',
        description: 'Moist chocolate tea cake studded with roasted almonds and baked fresh in-house.',
        icon: '🌰',
        weights: { spice: 3, sweetness: 2, creaminess: 2 }
      },
      {
        id: 'lemon_tea_cake',
        label: 'Lemon Tea Cake',
        price: '₹160 (2 pcs)',
        description: 'A soft, buttery tea cake infused with fresh lemon, offering a bright citrus flavour and a light, moist crumb.',
        icon: '🍋',
        weights: { fruitiness: 5, sweetness: 2, creaminess: 1 }
      }
    ]
  },
  {
    id: 'dairy_preference',
    order: 7,
    title: 'What is your dairy / milk preference?',
    subtitle: 'We will calibrate texture and dietary compatibility.',
    dimensionInfluences: ['creaminess', 'constraints'],
    options: [
      {
        id: 'dairy_regular',
        label: 'Fresh whole dairy milk',
        description: 'Rich, classic velvety microfoam texture',
        icon: '🥛',
        weights: { creaminess: 4 },
        constraints: { milk: 'dairy' }
      },
      {
        id: 'plant_oat',
        label: 'Barista oat or plant-based',
        description: 'Naturally sweet, toasted oats, eco-friendly',
        icon: '🌾',
        weights: { creaminess: 4, spice: 1 },
        constraints: { milk: 'oat', vegan: true, lactoseFree: true }
      },
      {
        id: 'no_milk_black',
        label: 'No milk (Pure black coffee)',
        description: 'Unmasked, direct bean profile and clarity',
        icon: '🖤',
        weights: { creaminess: 0, bitterness: 3, fruitiness: 2 },
        constraints: { milk: 'none', vegan: true, lactoseFree: true, dairyFree: true }
      }
    ]
  },
  {
    id: 'adventurousness',
    order: 8,
    title: 'How adventurous are you with new tastes?',
    subtitle: 'How far outside your comfort zone do you want to explore?',
    dimensionInfluences: ['adventurousness'],
    options: [
      {
        id: 'stick_to_known',
        label: 'Stick to what I know',
        description: 'Reliable classics, comfort is key',
        icon: '🛡️',
        weights: { adventurousness: 1 }
      },
      {
        id: 'open_to_twist',
        label: 'Open to a subtle twist',
        description: 'A classic with a surprise spice or syrup',
        icon: '🌟',
        weights: { adventurousness: 5 }
      },
      {
        id: 'surprise_me',
        label: 'Surprise me completely!',
        description: 'Wild botanical infusions, cardamom, sea salt creams',
        icon: '✨',
        weights: { adventurousness: 9, spice: 2, fruitiness: 2 }
      }
    ]
  },
  {
    id: 'soundtrack',
    order: 9,
    title: 'Pick your background soundtrack.',
    subtitle: 'The rhythm that matches your coffee sipping tempo.',
    dimensionInfluences: ['creaminess', 'bitterness', 'adventurousness'],
    options: [
      {
        id: 'lofi',
        label: 'Lo-fi chillhop & rain',
        description: 'Mellow vinyl crackles, laid-back jazzy beats',
        icon: '🎧',
        weights: { creaminess: 3, spice: 2 }
      },
      {
        id: 'pop',
        label: 'Feel-good pop & indie',
        description: 'Upbeat sunshine rhythms to sing along to',
        icon: '🎵',
        weights: { sweetness: 3, fruitiness: 2 }
      },
      {
        id: 'rock_electric',
        label: 'Alt-rock / High energy',
        description: 'Distorted guitars, driving basslines, intensity',
        icon: '⚡',
        weights: { bitterness: 3, caffeine: 3 }
      },
      {
        id: 'jazz',
        label: 'Warm jazz & soul',
        description: 'Smoky saxophones, acoustic double bass, vintage lounge',
        icon: '🎷',
        weights: { creaminess: 3, spice: 3, adventurousness: 2 }
      },
      {
        id: 'classical',
        label: 'Neoclassical & piano',
        description: 'Ludovico Einaudi, deep focus, elegant harmony',
        icon: '🎻',
        weights: { fruitiness: 3, bitterness: 2 }
      }
    ]
  },
  {
    id: 'brewing_method',
    order: 10,
    title: 'How do you prefer to make coffee?',
    subtitle: 'We will tailor your home recipe to the tools you actually own.',
    dimensionInfluences: ['equipment', 'bitterness'],
    options: [
      {
        id: 'no_equipment',
        label: 'No special equipment',
        description: 'Mason jar cold brew, instant craft, simple immersion',
        icon: '🫙',
        equipment: 'no_equipment',
        weights: { sweetness: 1 }
      },
      {
        id: 'espresso_machine',
        label: 'Espresso or capsule machine',
        description: 'High-pressure crema extraction, steam wand',
        icon: '☕',
        equipment: 'machine',
        weights: { bitterness: 2, creaminess: 2 }
      },
      {
        id: 'manual_brewer',
        label: 'Manual brewer (AeroPress / French press / Moka / Pour-over)',
        description: 'Hands-on brewing ritual, mindful measurement',
        icon: '🧪',
        equipment: 'manual',
        weights: { fruitiness: 3, adventurousness: 2 }
      },
      {
        id: 'cafe_order',
        label: "I'll order it at a café!",
        description: 'Give me the secret barista script to order like a pro',
        icon: '🏪',
        equipment: 'cafe',
        weights: { sweetness: 2, creaminess: 2 }
      }
    ]
  }
];
