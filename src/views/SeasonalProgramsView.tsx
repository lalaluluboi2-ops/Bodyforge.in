import React from 'react';
import { Workout } from '../types';
import { SUMMER_ATHLETE_PROGRAM, WINTER_ATHLETE_PROGRAM } from '../data/programs';
import { Sun, Snowflake, Play, ShieldCheck } from 'lucide-react';

interface SeasonalProgramsViewProps {
  onStartProgram: (workout: Workout) => void;
}

export const SeasonalProgramsView: React.FC<SeasonalProgramsViewProps> = ({ onStartProgram }) => {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 pb-28 text-gray-100">
      <div>
        <span className="text-[11px] font-mono tracking-widest text-forge-lime uppercase font-bold">
          PERIODIZED BODYWEIGHT ATHLETICISM
        </span>
        <h1 className="text-2xl md:text-3xl font-black text-white">Seasonal Training Modules</h1>
        <p className="text-xs text-gray-400 mt-1">
          Two targeted zero-equipment calisthenic systems adapted for high-tempo conditioning or controlled joint stability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Summer Athlete */}
        <div className="rounded-3xl bg-gradient-to-br from-amber-600/20 via-charcoal-900 to-charcoal-950 border border-amber-500/30 p-6 flex flex-col justify-between shadow-forge-glow">
          <div>
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md bg-amber-500 text-black font-mono text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                <Sun className="w-3 h-3 fill-black" /> SUMMER ATHLETE
              </span>
              <span className="text-xs font-mono text-amber-300">High Tempo</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-3">{SUMMER_ATHLETE_PROGRAM.title}</h2>
            <p className="text-xs text-gray-300 mt-1 leading-relaxed">{SUMMER_ATHLETE_PROGRAM.description}</p>
            
            <div className="mt-4 space-y-2 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Explosive full-body kinetic circuits
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Core striation and rotational stabilization
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-charcoal-800 flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400">20 Mins • Zero Gear</span>
            <button
              onClick={() => onStartProgram(SUMMER_ATHLETE_PROGRAM)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-wider text-xs flex items-center gap-1.5 transition-all shadow-md"
            >
              <Play className="w-3.5 h-3.5 fill-black" /> Launch Routine
            </button>
          </div>
        </div>

        {/* Winter Athlete */}
        <div className="rounded-3xl bg-gradient-to-br from-cyan-600/20 via-charcoal-900 to-charcoal-950 border border-cyan-500/30 p-6 flex flex-col justify-between shadow-cyan-glow">
          <div>
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md bg-forge-cyan text-black font-mono text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                <Snowflake className="w-3 h-3 fill-black" /> WINTER ATHLETE
              </span>
              <span className="text-xs font-mono text-cyan-300">Eccentric Control</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-3">{WINTER_ATHLETE_PROGRAM.title}</h2>
            <p className="text-xs text-gray-300 mt-1 leading-relaxed">{WINTER_ATHLETE_PROGRAM.description}</p>
            
            <div className="mt-4 space-y-2 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Slow isometric pauses for joint resilience
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Deep tendon armor & indoor stamina
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-charcoal-800 flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400">22 Mins • Zero Gear</span>
            <button
              onClick={() => onStartProgram(WINTER_ATHLETE_PROGRAM)}
              className="px-4 py-2.5 rounded-xl bg-forge-cyan hover:bg-cyan-400 text-black font-bold uppercase tracking-wider text-xs flex items-center gap-1.5 transition-all shadow-md"
            >
              <Play className="w-3.5 h-3.5 fill-black" /> Launch Routine
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
