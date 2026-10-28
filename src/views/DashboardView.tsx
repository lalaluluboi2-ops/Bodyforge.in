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
  Stethoscope
} from 'lucide-react';
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
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 pb-28 text-gray-100">
      {/* Top Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-forge-lime uppercase font-bold">
            CALISTHENICS & HOLISTIC WELLNESS
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            Welcome back, {profile.displayName || 'Athlete'}
          </h1>
        </div>
        <div className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-charcoal-900 border border-charcoal-800 flex items-center gap-2">
          <Flame className="w-4 h-4 text-forge-lime animate-pulse" />
          <span className="font-mono text-xs font-bold text-white">{profile.streakDays} Day Streak</span>
        </div>
      </div>

      {/* Daily Principle Callout */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-forge-lime/10 to-forge-cyan/10 border border-charcoal-800 flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-forge-lime shrink-0" />
        <p className="text-xs text-gray-300">
          <strong className="text-white">Daily Principle:</strong> Master the leverage of your own body. No equipment beats disciplined mechanical tension, joint alignment, and restorative sleep.
        </p>
      </div>

      {/* Core Activity Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-800">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs">Workouts</span>
            <Award className="w-4 h-4 text-forge-lime" />
          </div>
          <p className="text-2xl font-black text-white font-mono mt-2">{profile.totalWorkouts}</p>
          <span className="text-[10px] text-gray-500">Persistent sessions</span>
        </div>

        <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-800">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs">Minutes</span>
            <Clock className="w-4 h-4 text-forge-cyan" />
          </div>
          <p className="text-2xl font-black text-white font-mono mt-2">{profile.totalMinutes}</p>
          <span className="text-[10px] text-gray-500">Time under tension</span>
        </div>

        <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-800">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs">Consistency</span>
            <Activity className="w-4 h-4 text-forge-orange" />
          </div>
          <p className="text-2xl font-black text-white font-mono mt-2">
            {profile.streakDays >= 3 ? 'Strong' : 'Building'}
          </p>
          <span className="text-[10px] text-gray-500">{profile.streakDays} active days</span>
        </div>

        <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-800">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs">Focus</span>
            <Calendar className="w-4 h-4 text-gray-300" />
          </div>
          <p className="text-sm font-bold text-forge-lime font-mono mt-2 truncate">{profile.mainGoal}</p>
          <span className="text-[10px] text-gray-500">Level: {profile.experienceLevel}</span>
        </div>
      </div>

      {/* Featured Daily Routine Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-charcoal-850 to-charcoal-900 border border-charcoal-800 p-6 shadow-forge-glow">
        <div className="relative z-10 max-w-md">
          <span className="px-2.5 py-1 rounded-md bg-forge-lime text-black font-mono text-[10px] font-black uppercase tracking-wider">
            RECOMMENDED FOR TODAY
          </span>
          <h2 className="text-2xl font-black text-white mt-2">{dailyWorkout.title}</h2>
          <p className="text-xs text-gray-300 mt-1 line-clamp-2">{dailyWorkout.description}</p>
          
          <div className="flex items-center gap-4 mt-4 text-xs font-mono text-gray-400">
            <span>{dailyWorkout.estimatedMinutes} Mins</span>
            <span>•</span>
            <span>{dailyWorkout.exercises.length} Exercises</span>
            <span>•</span>
            <span className="text-forge-lime font-semibold">Zero Equipment</span>
          </div>

          <button
            onClick={() => onSelectWorkout(dailyWorkout)}
            className="mt-5 px-6 py-3 rounded-xl bg-forge-lime hover:bg-forge-lime-hover text-black font-extrabold uppercase tracking-wide flex items-center gap-2 text-xs transition-all shadow-forge-glow"
          >
            <Play className="w-4 h-4 fill-black" /> Start Session Now
          </button>
        </div>
      </div>

      {/* Body & Wellness Spotlight Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Wellness Educational Feature Card */}
        <div 
          onClick={() => onSelectArticle(featuredArticle)}
          className="p-5 rounded-2xl bg-charcoal-900 border border-charcoal-800 hover:border-forge-lime/50 transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-forge-lime font-bold flex items-center gap-1">
                <HeartPulse className="w-3 h-3" /> WELLNESS SPOTLIGHT
              </span>
              <span className="text-[10px] font-mono text-gray-500">Evidence Review</span>
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-forge-lime transition-colors">
              {featuredArticle.title}
            </h3>
            <p className="text-xs text-gray-400 mt-1 line-clamp-2">{featuredArticle.summary}</p>
          </div>

          <div className="mt-4 pt-3 border-t border-charcoal-800 flex items-center justify-between text-xs text-gray-400">
            <span className="font-mono text-[11px] text-gray-500">{featuredArticle.readingMinutes} min read</span>
            <span className="text-forge-lime font-bold flex items-center gap-1">
              Read Guide <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Joint Discomfort Screening Action */}
        <div 
          onClick={onOpenPainLibrary}
          className="p-5 rounded-2xl bg-charcoal-900 border border-charcoal-800 hover:border-forge-cyan/50 transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-forge-cyan font-bold flex items-center gap-1">
                <Stethoscope className="w-3 h-3" /> SAFETY & MOBILITY
              </span>
              <span className="text-[10px] font-mono text-gray-500">Triage screening</span>
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-forge-cyan transition-colors">
              Joint Stiffness or Pain?
            </h3>
            <p className="text-xs text-gray-400 mt-1 line-clamp-2">
              Screen for dangerous red flags and access gentle, non-harmful movement protocols for back, neck, knees, and hips.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-charcoal-800 flex items-center justify-between text-xs text-gray-400">
            <span className="font-mono text-[11px] text-gray-500">9 Body Regions</span>
            <span className="text-forge-cyan font-bold flex items-center gap-1">
              Safety Triage <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Weekly Schedule Heat Tracker */}
      <div className="p-5 rounded-2xl bg-charcoal-900 border border-charcoal-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Weekly Schedule Consistency</h3>
          <span className="text-xs font-mono text-forge-lime">Day {todayIdx + 1} of 7</span>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((d, idx) => {
            const isToday = idx === todayIdx;
            const isCompleted = idx <= todayIdx && profile.streakDays > (todayIdx - idx);
            return (
              <div 
                key={d} 
                className={`py-3 rounded-xl flex flex-col items-center justify-center border text-center transition-all ${
                  isCompleted 
                    ? 'bg-forge-lime/10 border-forge-lime text-forge-lime' 
                    : isToday 
                      ? 'bg-charcoal-800 border-gray-600 text-white' 
                      : 'bg-charcoal-950 border-charcoal-850 text-gray-500'
                }`}
              >
                <span className="text-[10px] font-bold uppercase">{d}</span>
                <div className={`w-2 h-2 rounded-full mt-1.5 ${isCompleted ? 'bg-forge-lime' : 'bg-charcoal-700'}`} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Policy-Compliant Dashboard Banner Ad */}
      <AdSlot placement="dashboard_banner" />

      {/* Recent History or Empty State */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Completed Sessions</h3>
          <button onClick={onOpenLibrary} className="text-xs text-forge-lime hover:underline flex items-center gap-1">
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
            <div key={item.id} className="p-3.5 rounded-xl bg-charcoal-900 border border-charcoal-800 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white">{item.workoutTitle}</h4>
                <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                  {new Date(item.date).toLocaleDateString()} • {Math.round(item.durationSeconds / 60)} mins • {item.exercisesCompleted} movements
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-forge-cyan">
                +{item.caloriesBurnedEstimate} kcal
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
