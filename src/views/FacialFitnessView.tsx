import React from 'react';
import { Workout } from '../types';
import { FACIAL_POSTURE_WORKOUT } from '../data/facialFitness';
import { Play, CheckCircle2, AlertTriangle } from 'lucide-react';
import { AdSlot } from '../components/AdSlot';

interface FacialFitnessViewProps {
  onStartRoutine: (workout: Workout) => void;
}

export const FacialFitnessView: React.FC<FacialFitnessViewProps> = ({ onStartRoutine }) => {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6 pb-28 text-gray-100">
      <div>
        <span className="text-[11px] font-mono tracking-widest text-forge-cyan uppercase font-bold">
          CERVICAL & CRANIAL POSTURE
        </span>
        <h1 className="text-2xl md:text-3xl font-black text-white">Jawline & Facial Alignment</h1>
        <p className="text-xs text-gray-400 mt-1">
          Posture decompression, suboccipital release, and evidence-based tongue posture education.
        </p>
      </div>

      {/* Mandatory Evidence & Safety Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-600/40 text-amber-200 text-xs space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-400">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>Scientific Reality & Safety Disclaimer</span>
        </div>
        <p className="leading-relaxed">
          Adult jaw bone dimensions are predominantly determined by genetics, developmental orthodontics, and skeletal structure. Mewing has limited clinical evidence for reshaping adult facial bones.
        </p>
        <p className="leading-relaxed">
          <strong className="text-white">Safety Rule:</strong> Never forcefully clench your teeth or bite hard objects. Discontinue immediately if you experience jaw clicking, popping, or temporomandibular (TMJ) joint soreness.
        </p>
      </div>

      {/* Active Guided Routine Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-charcoal-850 to-charcoal-900 border border-charcoal-800 shadow-cyan-glow">
        <span className="px-2.5 py-1 rounded-md bg-forge-cyan text-black font-mono text-[10px] font-black uppercase tracking-wider">
          GUIDED CALISTHENIC FLOW
        </span>
        <h2 className="text-xl font-black text-white mt-2">{FACIAL_POSTURE_WORKOUT.title}</h2>
        <p className="text-xs text-gray-300 mt-1">{FACIAL_POSTURE_WORKOUT.description}</p>

        <div className="flex items-center gap-4 mt-3 text-xs font-mono text-gray-400">
          <span>Duration: 8 Mins</span>
          <span>•</span>
          <span>Equipment: None</span>
          <span>•</span>
          <span className="text-forge-cyan font-bold">Gentle Intensity</span>
        </div>

        <button
          onClick={() => onStartRoutine(FACIAL_POSTURE_WORKOUT)}
          className="mt-5 px-6 py-3 rounded-xl bg-forge-cyan hover:bg-cyan-400 text-black font-extrabold uppercase tracking-wide flex items-center gap-2 text-xs transition-all shadow-cyan-glow"
        >
          <Play className="w-4 h-4 fill-black" /> Begin Gentle Posture Routine
        </button>
      </div>

      {/* In-Content Ad Space */}
      <AdSlot placement="educational_incontent" customMinHeight={120} />

      {/* Educational Fundamentals Breakdown */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Cervical Alignment Principles</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-800">
            <h4 className="text-xs font-bold text-forge-lime flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Nasal Respiration
            </h4>
            <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">
              Breathing through the nose supports optimal palate posture and diaphragmatic stability, avoiding chronic mouth-breathing jaw slack.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-800">
            <h4 className="text-xs font-bold text-forge-cyan flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Neutral Plumb Line
            </h4>
            <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">
              Forward head posture drops the hyoid bone, exaggerating double chins. Retracting ears over shoulders restores visible jawline tension naturally.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-800">
            <h4 className="text-xs font-bold text-forge-orange flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Zero Tooth Clenching
            </h4>
            <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">
              Teeth should rest slightly separated when at rest. Chronic grinding wears enamel and causes painful masseter hypertrophy without aesthetic benefits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
