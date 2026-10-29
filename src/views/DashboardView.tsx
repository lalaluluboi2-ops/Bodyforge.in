import React from 'react';
import { Workout, CompletedWorkoutRecord, UserFitnessProfile, WellnessArticle } from '../types';
import { 
  Flame, 
  Clock, 
  Award, 
  Play, 
  ChevronRight, 
  Sparkles, 
  Calendar, 
  Activity, 
  HeartPulse, 
  ShieldCheck,
  Stethoscope,
  Crosshair,
  Zap,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AdSlot } from '../components/AdSlot';

interface DashboardViewProps {
  profile: UserFitnessProfile;
  history: CompletedWorkoutRecord[];
  dailyWorkout: Workout;
  featuredArticle: WellnessArticle;
  onSelectWorkout: (workout: Workout) => void;
  onOpenLibrary: () => void;
  onOpenWellness: () => void;
  onSelectArticle: (article: WellnessArticle) => void;
  onOpenPainLibrary: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring' as const, stiffness: 380, damping: 28 }
  }
};

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  history,
  dailyWorkout,
  featuredArticle,
  onSelectWorkout,
  onOpenLibrary,
  onOpenWellness,
  onSelectArticle,
  onOpenPainLibrary
}) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const todayIdx = (new Date().getDay() + 6) % 7;

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 pb-28 text-gray-100"
    >
      {/* Top Greeting with Kinetic Telemetry */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-widest text-forge-lime uppercase font-bold">
              CALISTHENICS & HOLISTIC WELLNESS
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-forge-lime animate-ping" />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-0.5">
            Welcome back, {profile.displayName || 'Athlete'}
          </h1>
        </div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="self-start sm:self-auto px-4 py-2 rounded-2xl bg-charcoal-900/90 border border-charcoal-800 flex items-center gap-2.5 shadow-md backdrop-blur-sm"
        >
          <div className="relative">
            <Flame className="w-4 h-4 text-forge-lime animate-pulse" />
            <span className="absolute -inset-1 bg-forge-lime/20 rounded-full blur-xs -z-10" />
          </div>
          <span className="font-mono text-xs font-bold text-white">{profile.streakDays} Day Streak</span>
        </motion.div>
      </motion.div>

      {/* Daily Principle Callout with Smooth Sheen */}
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        className="p-3.5 rounded-2xl bg-gradient-to-r from-forge-lime/10 via-charcoal-900 to-forge-cyan/10 border border-charcoal-800/80 flex items-center gap-3 backdrop-blur-sm shadow-subtle-glow kinetic-sheen-container"
      >
        <div className="w-8 h-8 rounded-xl bg-forge-lime/15 border border-forge-lime/30 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-forge-lime" />
        </div>
        <p className="text-xs text-gray-300 leading-relaxed">
          <strong className="text-white">Daily Principle:</strong> Master the leverage of your own body. No equipment beats disciplined mechanical tension, joint alignment, and restorative sleep.
        </p>
      </motion.div>

      {/* Core Activity Stats Grid with Spring Physics */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <motion.div 
          whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
          className="p-4 rounded-2xl bg-charcoal-900/90 border border-charcoal-800 hover:border-charcoal-700 transition-colors shadow-sm group"
        >
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-medium">Workouts</span>
            <Award className="w-4 h-4 text-forge-lime group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-2xl font-black text-white font-mono mt-2 tracking-tight">{profile.totalWorkouts}</p>
          <div className="flex items-center gap-1.5 mt-1 text-[10px] text-gray-500 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-forge-lime" /> Persistent sessions
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
          className="p-4 rounded-2xl bg-charcoal-900/90 border border-charcoal-800 hover:border-charcoal-700 transition-colors shadow-sm group"
        >
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-medium">Minutes</span>
            <Clock className="w-4 h-4 text-forge-cyan group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-2xl font-black text-white font-mono mt-2 tracking-tight">{profile.totalMinutes}</p>
          <div className="flex items-center gap-1.5 mt-1 text-[10px] text-gray-500 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-forge-cyan" /> Time under tension
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
          className="p-4 rounded-2xl bg-charcoal-900/90 border border-charcoal-800 hover:border-charcoal-700 transition-colors shadow-sm group"
        >
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-medium">Consistency</span>
            <Activity className="w-4 h-4 text-forge-orange group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-2xl font-black text-white font-mono mt-2 tracking-tight">
            {profile.streakDays >= 3 ? 'Strong' : 'Building'}
          </p>
          <div className="flex items-center gap-1.5 mt-1 text-[10px] text-gray-500 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-forge-orange" /> {profile.streakDays} active days
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
          className="p-4 rounded-2xl bg-charcoal-900/90 border border-charcoal-800 hover:border-charcoal-700 transition-colors shadow-sm group"
        >
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-medium">Focus</span>
            <Calendar className="w-4 h-4 text-gray-300 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-sm font-bold text-forge-lime font-mono mt-2 truncate">{profile.mainGoal}</p>
          <div className="flex items-center gap-1.5 mt-1 text-[10px] text-gray-500 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-forge-lime/80" /> Level: {profile.experienceLevel}
          </div>
        </motion.div>
      </motion.div>

      {/* Featured Daily Routine Card with Dynamic Biomechanical Motion Graphics */}
      <motion.div 
        variants={itemVariants}
        whileHover={{ y: -2 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-charcoal-850 via-charcoal-900 to-charcoal-950 border border-charcoal-800 p-6 md:p-8 shadow-forge-glow group"
      >
        {/* Background Kinetic Radar & Biomechanical Graphic Rings */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none opacity-20 sm:opacity-30 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-dashed border-forge-lime animate-reticle" />
          <div className="w-44 h-44 rounded-full border border-forge-cyan/40 animate-reticle-rev" />
          <div className="w-24 h-24 rounded-full border border-forge-lime/30 animate-pulse" />
          <Crosshair className="w-10 h-10 text-forge-lime animate-pulse" />
        </div>

        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-forge-lime text-black font-mono text-[10px] font-black uppercase tracking-wider shadow-sm">
              RECOMMENDED FOR TODAY
            </span>
            <span className="text-[10px] font-mono text-forge-cyan uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3 h-3 text-forge-cyan" /> 100% Calisthenic Flow
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-2.5 tracking-tight">{dailyWorkout.title}</h2>
          <p className="text-xs text-gray-300 mt-2 line-clamp-2 leading-relaxed">{dailyWorkout.description}</p>
          
          <div className="flex items-center gap-4 mt-5 text-xs font-mono text-gray-400">
            <span className="flex items-center gap-1.5 text-white">
              <Clock className="w-3.5 h-3.5 text-forge-lime" /> {dailyWorkout.estimatedMinutes} Mins
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-white">
              <Activity className="w-3.5 h-3.5 text-forge-cyan" /> {dailyWorkout.exercises.length} Exercises
            </span>
            <span>•</span>
            <span className="text-forge-lime font-bold">Zero Equipment</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(212, 255, 0, 0.45)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelectWorkout(dailyWorkout)}
            className="mt-6 px-6 py-3 rounded-xl bg-forge-lime hover:bg-forge-lime-hover text-black font-extrabold uppercase tracking-wide flex items-center gap-2 text-xs transition-all shadow-forge-glow cursor-pointer"
          >
            <Play className="w-4 h-4 fill-black" /> Start Session Now
          </motion.button>
        </div>
      </motion.div>

      {/* Body & Wellness Spotlight Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Wellness Educational Feature Card */}
        <motion.div 
          whileHover={{ y: -5, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectArticle(featuredArticle)}
          className="p-5 rounded-2xl bg-charcoal-900/90 border border-charcoal-800 hover:border-forge-lime/50 transition-colors cursor-pointer flex flex-col justify-between group shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-forge-lime font-bold flex items-center gap-1">
                <HeartPulse className="w-3.5 h-3.5 text-forge-lime" /> WELLNESS SPOTLIGHT
              </span>
              <span className="text-[10px] font-mono text-gray-500">Evidence Review</span>
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-forge-lime transition-colors">
              {featuredArticle.title}
            </h3>
            <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">{featuredArticle.summary}</p>
          </div>

          <div className="mt-4 pt-3 border-t border-charcoal-800 flex items-center justify-between text-xs text-gray-400">
            <span className="font-mono text-[11px] text-gray-500">{featuredArticle.readingMinutes} min read</span>
            <span className="text-forge-lime font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Read Guide <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </motion.div>

        {/* Joint Discomfort Screening Action */}
        <motion.div 
          whileHover={{ y: -5, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenPainLibrary}
          className="p-5 rounded-2xl bg-charcoal-900/90 border border-charcoal-800 hover:border-forge-cyan/50 transition-colors cursor-pointer flex flex-col justify-between group shadow-sm"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-forge-cyan font-bold flex items-center gap-1">
                <Stethoscope className="w-3.5 h-3.5 text-forge-cyan" /> SAFETY & MOBILITY
              </span>
              <span className="text-[10px] font-mono text-gray-500">Triage screening</span>
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-forge-cyan transition-colors">
              Joint Stiffness or Pain?
            </h3>
            <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
              Screen for dangerous red flags and access gentle, non-harmful movement protocols for back, neck, knees, and hips.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-charcoal-800 flex items-center justify-between text-xs text-gray-400">
            <span className="font-mono text-[11px] text-gray-500">9 Body Regions</span>
            <span className="text-forge-cyan font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Safety Triage <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Weekly Schedule Heat Tracker with Animated Day Cells */}
      <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-charcoal-900/90 border border-charcoal-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Weekly Schedule Consistency</h3>
            <span className="w-1.5 h-1.5 rounded-full bg-forge-lime animate-pulse" />
          </div>
          <span className="text-xs font-mono text-forge-lime font-bold">Day {todayIdx + 1} of 7</span>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((d, idx) => {
            const isToday = idx === todayIdx;
            const isCompleted = idx <= todayIdx && profile.streakDays > (todayIdx - idx);
            return (
              <motion.div 
                key={d} 
                whileHover={{ scale: 1.06, y: -2 }}
                className={`py-3 rounded-xl flex flex-col items-center justify-center border text-center transition-all cursor-default ${
                  isCompleted 
                    ? 'bg-forge-lime/10 border-forge-lime text-forge-lime shadow-subtle-glow' 
                    : isToday 
                      ? 'bg-charcoal-800 border-gray-600 text-white' 
                      : 'bg-charcoal-950 border-charcoal-850 text-gray-500'
                }`}
              >
                <span className="text-[10px] font-bold uppercase">{d}</span>
                <div className={`w-2 h-2 rounded-full mt-1.5 transition-all ${isCompleted ? 'bg-forge-lime shadow-forge-glow' : 'bg-charcoal-700'}`} />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Policy-Compliant Dashboard Banner Ad */}
      <motion.div variants={itemVariants}>
        <AdSlot placement="dashboard_banner" />
      </motion.div>

      {/* Recent History or Empty State with Smooth Motion */}
      <motion.div variants={itemVariants} className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Completed Sessions</h3>
          <button onClick={onOpenLibrary} className="text-xs text-forge-lime hover:underline flex items-center gap-1 cursor-pointer">
            Browse All <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {history.length === 0 ? (
          <div className="p-6 rounded-2xl bg-charcoal-900 border border-dashed border-charcoal-800 text-center">
            <Award className="w-8 h-8 text-gray-500 mx-auto mb-2" />
            <p className="text-sm font-bold text-white">No sessions recorded yet</p>
            <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
              Complete your first bodyweight workout to begin your persistent streak and log activity.
            </p>
          </div>
        ) : (
          history.slice(0, 3).map((item) => (
            <motion.div 
              key={item.id} 
              whileHover={{ x: 4, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
              className="p-3.5 rounded-xl bg-charcoal-900/90 border border-charcoal-800 hover:border-charcoal-700 transition-colors flex items-center justify-between"
            >
              <div>
                <h4 className="text-xs font-bold text-white">{item.workoutTitle}</h4>
                <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                  {new Date(item.date).toLocaleDateString()} • {Math.round(item.durationSeconds / 60)} mins • {item.exercisesCompleted} movements
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-forge-cyan">
                +{item.caloriesBurnedEstimate} kcal
              </span>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
};

export default DashboardView;

