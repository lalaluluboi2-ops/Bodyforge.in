import React, { useState } from 'react';
import { Workout } from '../types';
import { Search, Filter, Clock, Flame, Info, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono tracking-widest text-forge-lime uppercase font-bold">
            CALISTHENICS DATABASE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-forge-lime animate-pulse" />
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-0.5">Workout Library</h1>
        <p className="text-xs text-gray-400 mt-1">Zero gym equipment, zero bands, pure biomechanical bodyweight routines.</p>
      </div>

      {/* Science Disclaimer Banner regarding Fat Loss */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-3.5 rounded-2xl bg-charcoal-900/90 border border-charcoal-800 flex items-start gap-2.5 text-xs text-gray-300 shadow-sm"
      >
        <Info className="w-4 h-4 text-forge-cyan shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Evidence Note:</strong> Exercise builds muscular strength and cardiovascular stamina. Scientific research confirms fat loss occurs systemically across the entire body through a caloric deficit, rather than localized "spot reduction" from a single body part.
        </p>
      </motion.div>

      {/* Search Bar with Focus Animation */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search chest, pushups, mobility, 15-minute core, morning..."
          className="w-full bg-charcoal-900/90 border border-charcoal-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-forge-lime focus:ring-1 focus:ring-forge-lime/50 transition-all shadow-sm"
        />
      </div>

      {/* Category Pills with Smooth Sliding Spring Indicator */}
      <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar">
        {categories.map((c) => {
          const isSelected = selectedCategory === c;
          return (
            <motion.button
              key={c}
              onClick={() => setSelectedCategory(c)}
              whileTap={{ scale: 0.95 }}
              className={`relative px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors duration-200 z-10 cursor-pointer ${
                isSelected
                  ? 'text-black font-extrabold'
                  : 'text-gray-400 hover:text-white bg-charcoal-900/80 border border-charcoal-800'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-forge-lime rounded-xl -z-10 shadow-forge-glow"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              {c}
            </motion.button>
          );
        })}
      </div>

      {/* Difficulty Filter */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-gray-400 flex items-center gap-1"><Filter className="w-3.5 h-3.5" /> Level:</span>
        <div className="flex items-center gap-1.5">
          {difficulties.map((d) => {
            const isDiff = selectedDifficulty === d;
            return (
              <motion.button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                whileTap={{ scale: 0.94 }}
                className={`px-3 py-1 rounded-lg text-[11px] font-mono font-medium transition-all cursor-pointer ${
                  isDiff
                    ? 'bg-charcoal-800 text-forge-lime border border-forge-lime/60 shadow-subtle-glow'
                    : 'text-gray-400 hover:text-white hover:bg-charcoal-900'
                }`}
              >
                {d}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Workout Library Responsive Banner Ad */}
      <AdSlot placement="library_banner" />

      {/* Workouts Grid with Animated Layout Transitions */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <AnimatePresence mode="popLayout">
          {filteredWorkouts.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="col-span-full p-8 text-center bg-charcoal-900/90 rounded-2xl border border-charcoal-800 shadow-sm"
            >
              <p className="text-sm text-gray-300 font-bold">No routines match your current filter</p>
              <p className="text-xs text-gray-500 mt-1">Try resetting the category or search keywords.</p>
            </motion.div>
          ) : (
            filteredWorkouts.map((w, index) => (
              <motion.div
                key={w.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ 
                  duration: 0.25, 
                  delay: Math.min(index * 0.04, 0.24),
                  ease: [0.16, 1, 0.3, 1] 
                }}
                whileHover={{ y: -5, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectWorkout(w)}
                className="p-5 rounded-2xl bg-charcoal-900/90 border border-charcoal-800 hover:border-forge-lime/50 transition-colors cursor-pointer flex flex-col justify-between group shadow-sm kinetic-sheen-container"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-forge-lime font-bold">
                      {w.category}
                    </span>
                    <span className="text-[10px] font-mono text-gray-300 bg-charcoal-950 px-2 py-0.5 rounded-md border border-charcoal-800">
                      {w.difficulty}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-forge-lime transition-colors">
                    {w.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">{w.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-charcoal-800 flex items-center justify-between text-xs text-gray-400 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-forge-lime" /> {w.estimatedMinutes} Mins
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-forge-cyan" /> {w.exercises.length} Movements
                  </span>
                  <span className="text-forge-lime font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    Start <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default WorkoutLibraryView;

