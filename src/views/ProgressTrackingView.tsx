import React, { useState } from 'react';
import { CompletedWorkoutRecord, UserFitnessProfile } from '../types';
import { 
  Award, 
  Flame, 
  Clock, 
  Trash2, 
  ShieldCheck, 
  HeartPulse, 
  CheckCircle2, 
  AlertCircle,
  FileCheck
} from 'lucide-react';

interface ProgressTrackingViewProps {
  history: CompletedWorkoutRecord[];
  profile: UserFitnessProfile;
  completedWellnessRoutines: string[];
  onClearAllData: () => void;
  onUpdateConsent: (granted: boolean) => void;
}

export const ProgressTrackingView: React.FC<ProgressTrackingViewProps> = ({
  history,
  profile,
  completedWellnessRoutines,
  onClearAllData,
  onUpdateConsent
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const totalBurn = history.reduce((sum, h) => sum + (h.caloriesBurnedEstimate || 0), 0);

  const badges = [
    { name: 'First Blood', desc: 'Completed 1 session', achieved: profile.totalWorkouts >= 1 },
    { name: '3-Day Fire', desc: 'Sustained 3-day streak', achieved: profile.streakDays >= 3 },
    { name: 'Century Volume', desc: 'Over 100 minutes trained', achieved: profile.totalMinutes >= 100 },
    { name: 'Holistic Scholar', desc: 'Completed 2 wellness guides', achieved: completedWellnessRoutines.length >= 2 },
    { name: 'Calisthenic Master', desc: '10 sessions logged', achieved: profile.totalWorkouts >= 10 },
  ];

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 pb-28 text-gray-100">
      <div>
        <span className="text-[11px] font-mono tracking-widest text-forge-lime uppercase font-bold">
          PERFORMANCE & WELLNESS LEDGER
        </span>
        <h1 className="text-2xl md:text-3xl font-black text-white">Progress & Consistency</h1>
        <p className="text-xs text-gray-400 mt-1">Data synced securely with your authenticated profile.</p>
      </div>

      {/* Primary Aggregate Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-800">
          <p className="text-xs text-gray-400">Total Workouts</p>
          <p className="text-2xl font-black text-white font-mono mt-1">{profile.totalWorkouts}</p>
        </div>
        <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-800">
          <p className="text-xs text-gray-400">Active Streak</p>
          <p className="text-2xl font-black text-forge-lime font-mono mt-1">{profile.streakDays} Days</p>
        </div>
        <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-800">
          <p className="text-xs text-gray-400">Workout Time</p>
          <p className="text-2xl font-black text-forge-cyan font-mono mt-1">{profile.totalMinutes} Mins</p>
        </div>
        <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-800">
          <p className="text-xs text-gray-400">Estimated Burn</p>
          <p className="text-2xl font-black text-forge-orange font-mono mt-1">{totalBurn} kcal</p>
        </div>
      </div>

      {/* Milestone Badges */}
      <div className="p-5 rounded-2xl bg-charcoal-900 border border-charcoal-800">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Athletic & Wellness Milestones</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {badges.map((b) => (
            <div
              key={b.name}
              className={`p-3.5 rounded-xl border text-center transition-all ${
                b.achieved
                  ? 'bg-forge-lime/10 border-forge-lime text-white'
                  : 'bg-charcoal-950 border-charcoal-800 text-gray-500 opacity-60'
              }`}
            >
              <Award className={`w-6 h-6 mx-auto mb-1.5 ${b.achieved ? 'text-forge-lime' : 'text-gray-600'}`} />
              <h4 className="text-xs font-bold truncate">{b.name}</h4>
              <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Wellness Guides */}
      <div className="p-5 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-forge-lime" />
            Saved Educational Routines ({completedWellnessRoutines.length})
          </h3>
          <span className="text-xs text-gray-400 font-mono">Self-Care Library</span>
        </div>

        {completedWellnessRoutines.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-4">
            No wellness routines bookmarked yet. Visit the "Wellness" section to save guides.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {completedWellnessRoutines.map(id => (
              <span key={id} className="px-3 py-1.5 rounded-xl bg-charcoal-950 border border-charcoal-700 text-xs text-forge-lime font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {id.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Workout History Table */}
      <div className="p-5 rounded-2xl bg-charcoal-900 border border-charcoal-800">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Completed Session Log</h3>
        {history.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-6">No entries yet. Complete a workout to populate your ledger.</p>
        ) : (
          <div className="space-y-2">
            {history.map((record) => (
              <div key={record.id} className="p-3.5 rounded-xl bg-charcoal-950 border border-charcoal-800 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-white">{record.workoutTitle}</h4>
                  <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                    {new Date(record.date).toLocaleString()} • {Math.round(record.durationSeconds / 60)} mins
                  </p>
                  {record.notes && (
                    <p className="text-[11px] text-gray-300 italic mt-1">"{record.notes}"</p>
                  )}
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-forge-lime">+{record.caloriesBurnedEstimate} kcal</span>
                  {record.userRating && (
                    <div className="text-[10px] text-amber-400 font-mono mt-0.5">{record.userRating}★</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Privacy, Consent & Data Management */}
      <div className="p-5 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <ShieldCheck className="w-4 h-4 text-forge-lime" />
          <span>Data Privacy & Consent Controls</span>
        </div>

        <div className="p-3.5 rounded-xl bg-charcoal-950 border border-charcoal-800 flex items-start justify-between gap-4 text-xs">
          <div>
            <h4 className="font-bold text-white">BodyBuddy Context Authorization</h4>
            <p className="text-gray-400 mt-0.5 leading-relaxed">
              Allow BodyBuddy AI to reference your workout goals and experience level to tailor suggestions.
            </p>
          </div>
          <button
            onClick={() => onUpdateConsent(!profile.wellnessGoalsConsent)}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold shrink-0 transition-all ${
              profile.wellnessGoalsConsent
                ? 'bg-forge-lime text-black'
                : 'bg-charcoal-800 text-gray-400'
            }`}
          >
            {profile.wellnessGoalsConsent ? 'Authorized' : 'Disabled'}
          </button>
        </div>

        {/* Delete All Data Confirmation */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-charcoal-800">
          <div>
            <h4 className="text-xs font-bold text-red-400">Erase Account Progress</h4>
            <p className="text-[11px] text-gray-500">Permanently clears workout sessions, streaks, and bookmarks.</p>
          </div>

          {showDeleteConfirm ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClearAllData();
                  setShowDeleteConfirm(false);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
              >
                Confirm Erase
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3 py-1.5 rounded-xl bg-charcoal-800 text-gray-300 text-xs"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-3.5 py-1.5 rounded-xl bg-charcoal-950 border border-red-900/60 text-red-400 hover:text-red-300 text-xs flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" /> Erase Saved Data
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
