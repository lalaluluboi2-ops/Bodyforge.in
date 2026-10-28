import React, { useState } from 'react';
import { Workout } from '../types';
import { Search, Filter, Clock, Flame, Info } from 'lucide-react';
import { AdSlot } from '../components/AdSlot';

interface WorkoutLibraryViewProps {
  workouts: Workout[];
  onSelectWorkout: (workout: Workout) => void;
}

export const WorkoutLibraryView: React.FC<WorkoutLibraryViewProps> = ({ workouts, onSelectWorkout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Weight Management',
    'Six-Pack & Core',
    'Muscle Building',
    'Full Body',
    'Cardio & Conditioning',
    'Home Workouts',
    'Gym & Athletic Workouts',
    'Strength Training',
    'Yoga & Flexibility'
  ];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredWorkouts = workouts.filter((w) => {
    const matchesSearch = w.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          w.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDiff = selectedDifficulty === 'All' || w.difficulty === selectedDifficulty;
    const matchesCat = selectedCategory === 'All' || w.category === selectedCategory;
    return matchesSearch && matchesDiff && matchesCat;
  });

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-5 pb-28 text-gray-100">
      <div>
        <span className="text-[11px] font-mono tracking-widest text-forge-lime uppercase font-bold">
          CALISTHENICS DATABASE
        </span>
        <h1 className="text-2xl md:text-3xl font-black text-white">Workout Library</h1>
        <p className="text-xs text-gray-400 mt-1">Zero gym equipment, zero bands, pure biomechanical bodyweight routines.</p>
      </div>

      {/* Science Disclaimer Banner regarding Fat Loss */}
      <div className="p-3.5 rounded-xl bg-charcoal-900 border border-charcoal-700 flex items-start gap-2.5 text-xs text-gray-300">
        <Info className="w-4 h-4 text-forge-cyan shrink-0 mt-0.5" />
        <p>
          <strong className="text-white">Evidence Note:</strong> Exercise builds muscular strength and cardiovascular stamina. Scientific research confirms fat loss occurs systemically across the entire body through a caloric deficit, rather than localized "spot reduction" from a single body part.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search chest, pushups, mobility, 15-minute core, morning..."
          className="w-full bg-charcoal-900 border border-charcoal-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-forge-lime"
        />
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === c
                ? 'bg-forge-lime text-black font-bold'
                : 'bg-charcoal-900 border border-charcoal-800 text-gray-400 hover:text-white'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Difficulty Filter */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-gray-400 flex items-center gap-1"><Filter className="w-3.5 h-3.5" /> Level:</span>
        {difficulties.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDifficulty(d)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium ${
              selectedDifficulty === d
                ? 'bg-charcoal-800 text-forge-lime border border-forge-lime'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Workout Library Responsive Banner Ad */}
      <AdSlot placement="library_banner" />

      {/* Workouts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {filteredWorkouts.length === 0 ? (
          <div className="col-span-full p-8 text-center bg-charcoal-900 rounded-2xl border border-charcoal-800">
            <p className="text-sm text-gray-300 font-bold">No routines match your current filter</p>
            <p className="text-xs text-gray-500 mt-1">Try resetting the category or search keywords.</p>
          </div>
        ) : (
          filteredWorkouts.map((w) => (
            <div
              key={w.id}
              onClick={() => onSelectWorkout(w)}
              className="p-5 rounded-2xl bg-charcoal-900 border border-charcoal-800 hover:border-forge-lime/50 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-forge-lime font-bold">
                    {w.category}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400 bg-charcoal-950 px-2 py-0.5 rounded border border-charcoal-800">
                    {w.difficulty}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-forge-lime transition-colors">
                  {w.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{w.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-charcoal-800 flex items-center justify-between text-xs text-gray-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-forge-lime" /> {w.estimatedMinutes} Mins
                </span>
                <span className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-forge-cyan" /> {w.exercises.length} Movements
                </span>
                <span className="text-forge-lime font-semibold">Start &rarr;</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
