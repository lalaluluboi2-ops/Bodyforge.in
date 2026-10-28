import React, { useState } from 'react';
import { 
  Utensils, 
  Flame, 
  Droplets, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Filter, 
  ChevronRight, 
  Apple, 
  Target, 
  Plus, 
  Minus,
  Leaf,
  Beef,
  PieChart
} from 'lucide-react';
import { NUTRITION_GUIDELINES, NUTRITION_MEALS } from '../data/nutritionData';
import { NutritionMeal } from '../types';

export const NutritionView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDiet, setSelectedDiet] = useState<'all' | 'vegetarian' | 'non-vegetarian'>('all');
  const [selectedGoal, setSelectedGoal] = useState<string>('all');
  const [activeMeal, setActiveMeal] = useState<NutritionMeal | null>(null);

  // Daily Hydration Tracker (stored locally)
  const [glassesDrank, setGlassesDrank] = useState<number>(() => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const saved = localStorage.getItem(`bodyforge_hydration_${today}`);
      return saved ? parseInt(saved, 10) : 4;
    } catch {
      return 4;
    }
  });

  const handleUpdateGlasses = (delta: number) => {
    const today = new Date().toISOString().split('T')[0];
    setGlassesDrank(prev => {
      const updated = Math.max(0, Math.min(16, prev + delta));
      try {
        localStorage.setItem(`bodyforge_hydration_${today}`, updated.toString());
      } catch {}
      return updated;
    });
  };

  const filteredMeals = NUTRITION_MEALS.filter(meal => {
    const matchCat = selectedCategory === 'all' || meal.category === selectedCategory;
    const matchDiet = selectedDiet === 'all' || meal.dietType === selectedDiet;
    const matchGoal = selectedGoal === 'all' || meal.goal === selectedGoal;
    return matchCat && matchDiet && matchGoal;
  });

  const targetGlasses = 10;
  const hydrationPct = Math.min(100, Math.round((glassesDrank / targetGlasses) * 100));

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-7 pb-28 text-gray-100 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-forge-lime uppercase flex items-center gap-1.5 font-bold">
            <Utensils className="w-4 h-4 text-forge-lime" />
            ATHLETIC NOURISHMENT PLATFORM
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white mt-1">
            Food & Nutrition Fuel
          </h1>
          <p className="text-xs text-gray-400 mt-1 max-w-xl leading-relaxed">
            Science-backed meals, protein density, and smart hydration tailored to fuel zero-equipment calisthenics, lean muscle retention, and daily vitality.
          </p>
        </div>
      </div>

      {/* Daily Hydration Counter Widget */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-charcoal-900 to-charcoal-950 border border-cyan-800/40 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-forge-cyan">
              <Droplets className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">Daily Hydration Tracker</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-forge-cyan text-black font-extrabold">
                  {hydrationPct}% of Goal
                </span>
              </div>
              <p className="text-xs text-gray-400">
                {glassesDrank * 250} ml / {targetGlasses * 250} ml (approx. 2.5 Liters baseline)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              onClick={() => handleUpdateGlasses(-1)}
              disabled={glassesDrank <= 0}
              className="p-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Decrease water glass"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-lg font-mono font-black text-forge-cyan px-1">
              {glassesDrank} <span className="text-xs font-normal text-gray-400">glasses</span>
            </span>
            <button
              onClick={() => handleUpdateGlasses(1)}
              className="p-2 rounded-xl bg-forge-cyan text-black hover:bg-cyan-400 transition-all font-bold shadow-forge-glow"
              aria-label="Increase water glass"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-charcoal-800 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-forge-cyan via-cyan-400 to-forge-lime transition-all duration-500 rounded-full"
            style={{ width: `${hydrationPct}%` }}
          />
        </div>
      </div>

      {/* Core Nutritional Guidelines Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {NUTRITION_GUIDELINES.map((guide) => (
          <div
            key={guide.id}
            className="p-5 rounded-2xl bg-charcoal-900 border border-charcoal-800 hover:border-charcoal-700 transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-forge-lime" />
                <span>{guide.title}</span>
              </h3>
              <span className="text-[10px] font-mono text-gray-500 uppercase">Core Principle</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">{guide.summary}</p>
            <ul className="space-y-1.5 pt-1 border-t border-charcoal-850">
              {guide.keyPoints.map((pt, i) => (
                <li key={i} className="text-[11px] text-gray-300 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forge-lime shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <Filter className="w-4 h-4 text-forge-lime" />
            <span>Filter Meals by Goal & Diet</span>
          </div>
          <span className="text-[10px] font-mono text-gray-400">
            {filteredMeals.length} recipes matched
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {/* Meal Category Filter */}
          <div className="flex items-center gap-1 bg-charcoal-950 p-1 rounded-xl border border-charcoal-800">
            {[
              { id: 'all', label: 'All Meals' },
              { id: 'breakfast', label: 'Breakfast' },
              { id: 'lunch', label: 'Lunch' },
              { id: 'dinner', label: 'Dinner' },
              { id: 'snack', label: 'Snack' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-forge-lime text-black font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Diet Filter */}
          <div className="flex items-center gap-1 bg-charcoal-950 p-1 rounded-xl border border-charcoal-800">
            <button
              onClick={() => setSelectedDiet('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedDiet === 'all' ? 'bg-charcoal-800 text-white font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              All Diets
            </button>
            <button
              onClick={() => setSelectedDiet('vegetarian')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                selectedDiet === 'vegetarian' ? 'bg-emerald-900/60 text-emerald-300 font-bold border border-emerald-600/40' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Leaf className="w-3 h-3 text-emerald-400" />
              <span>Vegetarian</span>
            </button>
            <button
              onClick={() => setSelectedDiet('non-vegetarian')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                selectedDiet === 'non-vegetarian' ? 'bg-amber-900/60 text-amber-300 font-bold border border-amber-600/40' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Beef className="w-3 h-3 text-amber-400" />
              <span>Non-Vegetarian</span>
            </button>
          </div>
        </div>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMeals.map((meal) => (
          <div
            key={meal.id}
            onClick={() => setActiveMeal(meal)}
            className="p-5 rounded-2xl bg-charcoal-900 border border-charcoal-800 hover:border-forge-lime/50 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] uppercase font-mono tracking-wider font-bold px-2 py-0.5 rounded ${
                  meal.dietType === 'vegetarian' 
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60' 
                    : 'bg-amber-950 text-amber-300 border border-amber-800/60'
                }`}>
                  {meal.dietType} • {meal.category}
                </span>
                <span className="text-[10px] font-mono text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {meal.prepMinutes} mins
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-forge-lime transition-colors">
                {meal.title}
              </h3>

              {/* Macro Nutrients Pills */}
              <div className="grid grid-cols-4 gap-2 mt-3 p-2.5 rounded-xl bg-charcoal-950 border border-charcoal-850 text-center font-mono">
                <div>
                  <span className="text-[9px] text-gray-500 uppercase block">Cals</span>
                  <span className="text-xs font-bold text-white">{meal.calories}</span>
                </div>
                <div>
                  <span className="text-[9px] text-forge-lime uppercase block">Protein</span>
                  <span className="text-xs font-bold text-forge-lime">{meal.proteinGrams}g</span>
                </div>
                <div>
                  <span className="text-[9px] text-forge-cyan uppercase block">Carbs</span>
                  <span className="text-xs font-bold text-forge-cyan">{meal.carbsGrams}g</span>
                </div>
                <div>
                  <span className="text-[9px] text-amber-400 uppercase block">Fats</span>
                  <span className="text-xs font-bold text-amber-400">{meal.fatsGrams}g</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-charcoal-800 flex items-center justify-between text-xs text-gray-400">
              <span className="text-[11px] text-gray-400 truncate max-w-[200px]">
                Goal: <strong className="text-white capitalize">{meal.goal.replace('-', ' ')}</strong>
              </span>
              <span className="text-forge-lime font-bold flex items-center gap-1">
                View Recipe &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Meal Detail Modal */}
      {activeMeal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-charcoal-900 border border-charcoal-700 rounded-3xl p-6 text-gray-100 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-forge-lime font-bold">
                  {activeMeal.dietType} • {activeMeal.category}
                </span>
                <h3 className="text-xl font-black text-white mt-0.5">{activeMeal.title}</h3>
              </div>
              <button
                onClick={() => setActiveMeal(null)}
                className="p-1 rounded-xl text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Macros Bar */}
            <div className="grid grid-cols-4 gap-2 p-3 rounded-2xl bg-charcoal-950 border border-charcoal-800 text-center font-mono">
              <div>
                <span className="text-[10px] text-gray-500 uppercase block">Calories</span>
                <span className="text-sm font-black text-white">{activeMeal.calories}</span>
              </div>
              <div>
                <span className="text-[10px] text-forge-lime uppercase block">Protein</span>
                <span className="text-sm font-black text-forge-lime">{activeMeal.proteinGrams}g</span>
              </div>
              <div>
                <span className="text-[10px] text-forge-cyan uppercase block">Carbohydrates</span>
                <span className="text-sm font-black text-forge-cyan">{activeMeal.carbsGrams}g</span>
              </div>
              <div>
                <span className="text-[10px] text-amber-400 uppercase block">Healthy Fats</span>
                <span className="text-sm font-black text-amber-400">{activeMeal.fatsGrams}g</span>
              </div>
            </div>

            {/* Ingredients */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Ingredients</h4>
              <ul className="space-y-1 bg-charcoal-950 p-3 rounded-xl border border-charcoal-850">
                {activeMeal.ingredients.map((ing, i) => (
                  <li key={i} className="text-xs text-gray-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-forge-lime" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Preparation Steps</h4>
              <ol className="space-y-1.5 bg-charcoal-950 p-3 rounded-xl border border-charcoal-850">
                {activeMeal.instructions.map((step, idx) => (
                  <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                    <span className="text-forge-lime font-mono font-bold">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Athletic Benefits */}
            <div className="p-3 rounded-xl bg-forge-lime/10 border border-forge-lime/30 text-xs space-y-1">
              <h4 className="text-forge-lime font-bold font-mono text-[11px] uppercase">Athletic Body Impact</h4>
              {activeMeal.benefits.map((b, i) => (
                <p key={i} className="text-gray-200 text-[11px]">• {b}</p>
              ))}
            </div>

            <button
              onClick={() => setActiveMeal(null)}
              className="w-full py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-white font-bold text-xs transition-all"
            >
              Close Recipe
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
