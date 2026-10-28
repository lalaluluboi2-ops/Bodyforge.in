import { NutritionMeal, NutritionGuideline } from '../types';

export const NUTRITION_GUIDELINES: NutritionGuideline[] = [
  {
    id: 'guide-protein',
    title: 'Protein Density & Muscle Recovery',
    iconName: 'Flame',
    summary: 'Essential amino acids trigger muscle protein synthesis (MPS) after calisthenics tension.',
    keyPoints: [
      'Target 1.6 to 2.2 grams of protein per kilogram of bodyweight for muscle retention & growth.',
      'Distribute protein across 3 to 4 meals (approx 25–40g per meal) to maximize leucine thresholds.',
      'Quality plant sources: lentils, chickpeas, tofu, tempeh, edamame, and Greek yogurt.',
      'Quality animal sources: eggs, chicken breast, salmon, tuna, cottage cheese, and lean turkey.'
    ]
  },
  {
    id: 'guide-hydration',
    title: 'Cellular Hydration & Electrolytes',
    iconName: 'Droplet',
    summary: 'Even a 2% drop in hydration reduces muscular power output and slows recovery.',
    keyPoints: [
      'Daily baseline: 2.5 to 3.5 liters of clean water, adjusted for sweat rate.',
      'Replenish electrolytes (sodium, potassium, magnesium) naturally with pinch of salt & coconut water/citrus.',
      'Check urine clarity: pale straw yellow indicates optimal hydration status.',
      'Drink 400–500ml of water 30 minutes before training to prime blood volume.'
    ]
  },
  {
    id: 'guide-balance',
    title: 'The Calisthenics Balanced Plate',
    iconName: 'PieChart',
    summary: 'A sustainable plate architecture without extreme carb-cutting or unhealthy restriction.',
    keyPoints: [
      '1/2 Plate Colorful Vegetables & Fruits (fiber, polyphenols, gut microbiome diversity).',
      '1/4 Plate High-Quality Protein (tissue repair and high thermic effect of food).',
      '1/4 Plate Complex Carbohydrates (quinoa, sweet potatoes, oats, brown rice for glycogen).',
      '1–2 Thumbs Healthy Fats (avocado, extra virgin olive oil, walnuts, chia seeds for endocrine health).'
    ]
  },
  {
    id: 'guide-goals',
    title: 'Nutrition Matched to Your Goal',
    iconName: 'Target',
    summary: 'Adjust energy balance based on whether your primary objective is fat loss or mass.',
    keyPoints: [
      'Fat Loss / Leaning Out: Modest 300–400 kcal deficit, high protein (2g/kg), maintain strength.',
      'Muscle Building: Slight 200–300 kcal surplus, fueling progressive calisthenics overload.',
      'Core & Six-Pack Definition: Focus on nutrient density, eliminate liquid sugar, prioritize fiber.',
      'Mobility & Joint Longevity: Anti-inflammatory omega-3 fatty acids, turmeric, and dark berries.'
    ]
  }
];

export const NUTRITION_MEALS: NutritionMeal[] = [
  // BREAKFAST - VEGETARIAN
  {
    id: 'meal-oats-power',
    title: 'Athletic High-Protein Berry Oats',
    category: 'breakfast',
    dietType: 'vegetarian',
    goal: 'muscle-building',
    calories: 460,
    proteinGrams: 32,
    carbsGrams: 58,
    fatsGrams: 10,
    prepMinutes: 8,
    ingredients: [
      '60g rolled oats',
      '150g Greek yogurt (0% or 2%)',
      '1 scoop vanilla plant/whey protein powder',
      '1/2 cup wild blueberries or strawberries',
      '1 tbsp chia seeds',
      'Dash of cinnamon and splash of almond milk'
    ],
    instructions: [
      'Cook rolled oats in water or warm almond milk until creamy.',
      'Stir in protein powder and Greek yogurt thoroughly.',
      'Top with antioxidant-rich blueberries, chia seeds, and cinnamon.'
    ],
    benefits: [
      'Sustained complex carbohydrate energy for morning calisthenics.',
      'High leucine content from Greek yogurt to ignite protein synthesis.',
      'Anthocyanins in berries combat exercise-induced oxidative stress.'
    ]
  },

  // BREAKFAST - NON-VEGETARIAN
  {
    id: 'meal-eggs-avocado',
    title: 'Pasture Eggs, Sourdough & Avocado Plate',
    category: 'breakfast',
    dietType: 'non-vegetarian',
    goal: 'six-pack',
    calories: 420,
    proteinGrams: 26,
    carbsGrams: 32,
    fatsGrams: 18,
    prepMinutes: 10,
    ingredients: [
      '3 whole organic eggs',
      '1 slice toasted artisanal sourdough bread',
      '1/3 medium ripe avocado (mashed)',
      '1 cup fresh baby spinach (sautéed)',
      'Pinch of sea salt, black pepper & chili flakes'
    ],
    instructions: [
      'Whisk eggs with a splash of water and scramble gently over medium-low heat.',
      'Toast sourdough and spread mashed avocado on top.',
      'Quickly wilt spinach in the pan for 60 seconds.',
      'Plate together and season with chili flakes and sea salt.'
    ],
    benefits: [
      'Choline from egg yolks enhances neuromuscular firing and concentration.',
      'Healthy monounsaturated fats support testosterone and joint lubrication.',
      'Spinach delivers nitrates to promote vascular blood flow.'
    ]
  },

  // LUNCH - VEGETARIAN
  {
    id: 'meal-quinoa-tempeh',
    title: 'Mediterranean Quinoa & Crispy Tempeh Bowl',
    category: 'lunch',
    dietType: 'vegetarian',
    goal: 'weight-management',
    calories: 490,
    proteinGrams: 34,
    carbsGrams: 52,
    fatsGrams: 14,
    prepMinutes: 15,
    ingredients: [
      '150g cubed organic tempeh or baked tofu',
      '3/4 cup cooked rainbow quinoa',
      '1 cup steamed broccoli florets',
      '1/2 cup diced cucumber and cherry tomatoes',
      '2 tbsp tahini-lemon dressing',
      '1 tbsp toasted pumpkin seeds'
    ],
    instructions: [
      'Pan-sear cubed tempeh with low-sodium tamari until golden.',
      'Assemble warm quinoa base in a wide bowl.',
      'Add broccoli, cucumber, and cherry tomatoes.',
      'Drizzle with lemon-tahini dressing and garnish with pumpkin seeds.'
    ],
    benefits: [
      'Fermented tempeh provides complete bioavailable amino acids and prebiotics.',
      'Slow-digesting quinoa prevents afternoon energy slumps.',
      'Zinc and magnesium from pumpkin seeds support muscular contraction.'
    ]
  },

  // LUNCH - NON-VEGETARIAN
  {
    id: 'meal-chicken-sweet-potato',
    title: 'Herb-Grilled Chicken & Roasted Sweet Potato',
    category: 'lunch',
    dietType: 'non-vegetarian',
    goal: 'muscle-building',
    calories: 520,
    proteinGrams: 44,
    carbsGrams: 48,
    fatsGrams: 12,
    prepMinutes: 20,
    ingredients: [
      '180g lean chicken breast, sliced',
      '1 medium roasted sweet potato with skin',
      '1.5 cups steamed green beans or asparagus',
      '1 tsp extra virgin olive oil',
      'Rosemary, garlic powder, paprika, sea salt'
    ],
    instructions: [
      'Season chicken with olive oil, paprika, garlic, and rosemary.',
      'Grill or pan-sear for 5–6 minutes per side until thoroughly cooked (165°F).',
      'Bake or steam sweet potato until tender.',
      'Serve alongside steamed green beans for fiber and micronutrients.'
    ],
    benefits: [
      'Exceptional protein-to-calorie ratio with virtually zero saturated fat.',
      'Sweet potatoes replenish intramuscular glycogen stores depleted in workouts.',
      'Beta-carotene in sweet potato supports cellular repair.'
    ]
  },

  // DINNER - VEGETARIAN
  {
    id: 'meal-lentil-dahl',
    title: 'Spiced Red Lentil & Spinach Dahl with Basmati',
    category: 'dinner',
    dietType: 'vegetarian',
    goal: 'endurance',
    calories: 470,
    proteinGrams: 28,
    carbsGrams: 68,
    fatsGrams: 8,
    prepMinutes: 25,
    ingredients: [
      '1 cup dry red split lentils (rinsed)',
      '1/2 cup cooked fragrant basmati rice',
      '2 cups baby spinach leaves',
      '1/2 diced onion, 2 minced garlic cloves, 1 tsp grated ginger',
      'Turmeric, cumin, coriander, and light coconut milk (2 tbsp)'
    ],
    instructions: [
      'Sauté onion, garlic, and ginger with spices for 2 minutes until aromatic.',
      'Add lentils and 2.5 cups vegetable broth; simmer for 15 minutes until soft.',
      'Fold in spinach and light coconut milk until spinach wilts.',
      'Serve warm over a bed of basmati rice.'
    ],
    benefits: [
      'Curcumin from turmeric reduces systemic muscle soreness and joint inflammation.',
      'Soluble fiber stabilizes blood glucose and overnight recovery.',
      'High plant iron and folate content promotes red blood cell oxygenation.'
    ]
  },

  // DINNER - NON-VEGETARIAN
  {
    id: 'meal-salmon-asparagus',
    title: 'Wild Salmon Fillet with Garlic Asparagus',
    category: 'dinner',
    dietType: 'non-vegetarian',
    goal: 'weight-management',
    calories: 480,
    proteinGrams: 38,
    carbsGrams: 18,
    fatsGrams: 24,
    prepMinutes: 18,
    ingredients: [
      '170g wild-caught salmon fillet',
      '1 bundle fresh green asparagus stalks',
      '1/2 cup boiled baby potatoes (optional carb addition)',
      '1 tbsp olive oil, fresh lemon wedges',
      'Cracked black pepper, sea salt, fresh dill'
    ],
    instructions: [
      'Preheat oven to 400°F (200°C) or prepare a cast iron skillet.',
      'Place salmon skin-down and toss asparagus with olive oil, salt, and pepper.',
      'Bake for 12–14 minutes until salmon flakes gently with a fork.',
      'Finish with fresh squeezed lemon juice and dill.'
    ],
    benefits: [
      'EPA and DHA omega-3 fatty acids actively resolve inflammatory training stress.',
      'High in Vitamin D and B12 for cellular metabolic energy.',
      'Asparagus provides natural prebiotic inulin for digestive efficiency.'
    ]
  },

  // SNACK - VEGETARIAN
  {
    id: 'meal-cottage-apple',
    title: 'Cottage Cheese, Crisp Apple & Walnuts',
    category: 'snack',
    dietType: 'vegetarian',
    goal: 'six-pack',
    calories: 240,
    proteinGrams: 22,
    carbsGrams: 20,
    fatsGrams: 7,
    prepMinutes: 3,
    ingredients: [
      '150g low-fat cottage cheese',
      '1/2 crisp green apple (sliced)',
      '10g raw crushed walnuts',
      'Pinch of ground cinnamon'
    ],
    instructions: [
      'Spoon cottage cheese into a small bowl.',
      'Layer with sliced green apple and crushed walnuts.',
      'Dust with cinnamon and enjoy chilled.'
    ],
    benefits: [
      'Slow-digesting casein protein maintains steady amino acid release for hours.',
      'Pectin in green apple promotes satiety and prevents cravings.',
      'Alpha-linolenic acid (ALA) from walnuts nourishes brain and joint health.'
    ]
  }
];
