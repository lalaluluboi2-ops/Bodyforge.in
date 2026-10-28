import React, { useState } from 'react';
import { Workout, ExerciseItem } from '../types';
import { MotionDemoPlayer } from '../components/MotionDemoPlayer';
import { WorkoutReviewsSection } from '../components/WorkoutReviewsSection';
import { 
  ArrowLeft, 
  Clock, 
  Flame, 
  Shield, 
  Play, 
  AlertTriangle, 
  CheckCircle2, 
  Wind, 
  Eye, 
  Heart,
  Activity
} from 'lucide-react';
import { AdSlot } from '../components/AdSlot';

interface WorkoutDetailViewProps {
  workout: Workout;
  onBack: () => void;
  onStart: (workout: Workout) => void;
  currentUserId?: string;
  currentUserName?: string;
}

export const WorkoutDetailView: React.FC<WorkoutDetailViewProps> = ({ 
  workout, 
  onBack, 
  onStart,
  currentUserId = 'athlete_user',
  currentUserName = 'Athlete'
}) => {
  const [activePreviewExercise, setActivePreviewExercise] = useState<ExerciseItem>(workout.exercises[0]);

  return (
    <div className="min-h-screen bg-charcoal-950 pb-36 text-gray-100 animate-in fade-in duration-200">
      {/* Top Banner Navigation */}
      <div className="relative p-4 md:p-6 bg-gradient-to-b from-charcoal-850 to-charcoal-950 border-b border-charcoal-800">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-charcoal-900/80 border border-charcoal-700 text-gray-300 hover:text-white flex items-center gap-2 mb-4 text-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Library
        </button>

        <span className="text-[10px] uppercase font-mono tracking-widest text-forge-lime font-bold">
          {workout.category}
        </span>
        <h1 className="text-2xl md:text-3xl font-black text-white mt-1">{workout.title}</h1>
        <p className="text-xs md:text-sm text-gray-400 mt-1 max-w-xl leading-relaxed">{workout.description}</p>

        {/* Quick Specs Pill Grid */}
        <div className="flex flex-wrap items-center gap-2 mt-4 text-xs">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-charcoal-900 border border-charcoal-800 text-gray-300 font-mono">
            <Clock className="w-3.5 h-3.5 text-forge-lime" /> {workout.estimatedMinutes} Mins
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-charcoal-900 border border-charcoal-800 text-gray-300 font-mono">
            <Flame className="w-3.5 h-3.5 text-forge-cyan" /> {workout.difficulty}
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-charcoal-900 border border-charcoal-800 text-forge-lime font-medium">
            <Shield className="w-3.5 h-3.5" /> 100% Zero Equipment
          </span>
          {workout.warmupMinutes && (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-charcoal-900 border border-charcoal-800 text-gray-400 text-[11px] font-mono">
              Warmup: {workout.warmupMinutes}m • Cooldown: {workout.cooldownMinutes}m
            </span>
          )}
        </div>
      </div>

      <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-6">
        {/* Animated Exercise Motion Demonstration Player */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs uppercase font-mono tracking-wider text-forge-lime font-bold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-forge-lime" />
              <span>Step-by-Step Motion Demonstration: {activePreviewExercise.name}</span>
            </p>
            <span className="text-[10px] text-gray-400 font-mono">Interactive Vector Engine</span>
          </div>
          <MotionDemoPlayer exercise={activePreviewExercise} showDetails={true} />
        </div>

        {/* Workout Safety, Precautions & Recovery Advice */}
        <div className="p-4 sm:p-5 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-3.5">
          <div className="flex items-center gap-2 text-forge-cyan text-xs font-bold uppercase tracking-wider font-mono">
            <Shield className="w-4 h-4 text-forge-cyan" />
            <span>Safety Guidelines, Posture & Recovery Protocol</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {/* Breathing Cues */}
            {workout.breathingInstructions && (
              <div className="p-3 rounded-xl bg-charcoal-950 border border-charcoal-850 space-y-1">
                <span className="text-[10px] text-forge-lime font-mono uppercase font-bold flex items-center gap-1">
                  <Wind className="w-3 h-3" /> Breathing Rhythm
                </span>
                <p className="text-gray-300 text-[11px] leading-relaxed">
                  {workout.breathingInstructions}
                </p>
              </div>
            )}

            {/* Posture Alignment */}
            {workout.postureCues && workout.postureCues.length > 0 && (
              <div className="p-3 rounded-xl bg-charcoal-950 border border-charcoal-850 space-y-1">
                <span className="text-[10px] text-forge-cyan font-mono uppercase font-bold flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Posture Alignment
                </span>
                <ul className="text-gray-300 text-[11px] space-y-0.5">
                  {workout.postureCues.map((cue, i) => (
                    <li key={i}>• {cue}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* When to Stop Exercising Warning */}
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/40 text-red-200 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-red-400 font-bold uppercase text-[10px] font-mono">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>When To Stop Immediately & Seek Medical Advice</span>
            </div>
            <p className="text-[11px] leading-relaxed text-red-300">
              Immediately cease training if you encounter: sudden sharp joint pinching, chest tightness or radiating ache, shortness of breath disproportionate to exertion, or dizziness. Consult a licensed medical provider before resuming.
            </p>
          </div>
        </div>

        {/* Exercise Sequence Breakdown with One-Tap Preview Switcher */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm uppercase tracking-wider font-bold text-white">
              Exercise Circuit ({workout.exercises.length})
            </h3>
            <span className="text-xs text-gray-400">Tap any exercise to view demonstration</span>
          </div>

          <div className="space-y-3">
            {workout.exercises.map((ex, idx) => {
              const isSelected = activePreviewExercise.id === ex.id;
              return (
                <div 
                  key={ex.id}
                  onClick={() => setActivePreviewExercise(ex)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isSelected 
                      ? 'bg-charcoal-850 border-forge-lime shadow-md' 
                      : 'bg-charcoal-900 border-charcoal-800 hover:border-gray-700'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                    isSelected ? 'bg-forge-lime text-black border-forge-lime' : 'bg-charcoal-800 border-charcoal-700 text-forge-lime'
                  }`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className={`text-sm font-bold ${isSelected ? 'text-forge-lime' : 'text-white'}`}>
                        {ex.name}
                      </h4>
                      <span className="text-xs font-mono font-semibold text-forge-lime shrink-0">
                        {ex.durationSeconds ? `${ex.durationSeconds}s` : `${ex.reps} reps`}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-1">
                      {ex.targetMuscles.map(m => (
                        <span key={m} className="text-[10px] text-gray-400 bg-charcoal-950 px-1.5 py-0.5 rounded border border-charcoal-800">
                          {m}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                      {ex.instructions[0]}
                    </p>

                    <div className="mt-2 text-[11px] font-mono text-gray-400 flex items-center gap-1.5">
                      <span className="text-forge-lime">Focus:</span> {ex.formCues[0]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Community Reviews & Ratings Section */}
        <WorkoutReviewsSection 
          workoutId={workout.id}
          workoutTitle={workout.title}
          currentUserId={currentUserId}
          currentUserName={currentUserName}
        />

        {/* Workout Detail Content Ad */}
        <AdSlot placement="workout_detail_bottom" className="my-8" />

        {/* Fixed Action Button for Mobile & Desktop */}
        <div className="fixed bottom-0 inset-x-0 p-4 bg-charcoal-950/95 backdrop-blur-md border-t border-charcoal-800 flex justify-center z-30">
          <button
            onClick={() => onStart(workout)}
            className="w-full max-w-md py-4 rounded-xl bg-forge-lime hover:bg-forge-lime-hover text-black font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-forge-glow transition-all"
          >
            <Play className="w-5 h-5 fill-black" /> Start Live Workout Session
          </button>
        </div>
      </div>
    </div>
  );
};
