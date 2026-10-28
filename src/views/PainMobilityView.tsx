import React, { useState } from 'react';
import { PainAreaScreening, ExerciseItem } from '../types';
import { PAIN_MOBILITY_AREAS } from '../data/painMobilityData';
import { PainTriageModal } from '../components/PainTriageModal';
import { MotionDemoPlayer } from '../components/MotionDemoPlayer';
import { 
  Stethoscope, 
  AlertTriangle, 
  ShieldAlert, 
  ArrowLeft, 
  CheckCircle2, 
  PhoneCall, 
  ShieldCheck,
  ChevronRight,
  Activity
} from 'lucide-react';
import { AdSlot } from '../components/AdSlot';

interface PainMobilityViewProps {
  onBack: () => void;
}

export const PainMobilityView: React.FC<PainMobilityViewProps> = ({ onBack }) => {
  const [selectedArea, setSelectedArea] = useState<PainAreaScreening>(PAIN_MOBILITY_AREAS[0]);
  const [triageTargetArea, setTriageTargetArea] = useState<PainAreaScreening | null>(null);
  const [clearedAreas, setClearedAreas] = useState<Record<string, boolean>>({});
  const [activeExerciseIdx, setActiveExerciseIdx] = useState<number>(0);

  const isAreaCleared = Boolean(clearedAreas[selectedArea.id]);

  const handleOpenTriage = (area: PainAreaScreening) => {
    setTriageTargetArea(area);
  };

  const handleTriageCleared = () => {
    if (triageTargetArea) {
      setClearedAreas(prev => ({ ...prev, [triageTargetArea.id]: true }));
      setSelectedArea(triageTargetArea);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-950 pb-28 text-gray-100 p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-charcoal-900 border border-charcoal-800 text-gray-300 hover:text-white flex items-center gap-2 text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <span className="text-[10px] font-mono uppercase tracking-widest text-forge-cyan font-bold flex items-center gap-1.5">
          <Stethoscope className="w-3.5 h-3.5" />
          CLINICAL SAFETY PROTOCOL
        </span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white">Body Pain & Joint Mobility Library</h1>
        <p className="text-xs text-gray-400 mt-1 max-w-2xl leading-relaxed">
          Pre-activity safety screening, red flag triage, and gentle evidence-based mobility movements. Never stretch through sharp, severe, or worsening discomfort.
        </p>
      </div>

      {/* Emergency Red Flag Universal Callout */}
      <div className="p-4 rounded-2xl bg-red-950/30 border border-red-600/40 text-red-200 text-xs space-y-2">
        <div className="flex items-center gap-2 font-bold text-red-400 text-sm">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>Immediate Emergency Triage Warning</span>
        </div>
        <p className="leading-relaxed">
          If you are experiencing <strong>acute chest pressure, shortness of breath, sudden facial drooping or arm weakness, loss of bowel or bladder control with back pain, or a major traumatic injury</strong>, do not perform exercises. Seek urgent emergency clinical medical care immediately (call 911 / 999 / 112).
        </p>
      </div>

      {/* Joint Region Selector Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {PAIN_MOBILITY_AREAS.map((area) => {
          const isSelected = selectedArea.id === area.id;
          const isCleared = clearedAreas[area.id];
          return (
            <button
              key={area.id}
              onClick={() => {
                setSelectedArea(area);
                setActiveExerciseIdx(0);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-forge-cyan text-black font-bold'
                  : 'bg-charcoal-900 border border-charcoal-800 text-gray-300 hover:text-white'
              }`}
            >
              <span>{area.bodyRegion.split(' ')[0]}</span>
              {isCleared && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
            </button>
          );
        })}
      </div>

      {/* Selected Body Region Card */}
      <div className="bg-charcoal-900 border border-charcoal-800 rounded-3xl p-5 md:p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-forge-cyan font-bold">
              REGIONAL SAFETY EVALUATION
            </span>
            <h2 className="text-xl font-bold text-white mt-0.5">{selectedArea.bodyRegion}</h2>
          </div>

          <button
            onClick={() => handleOpenTriage(selectedArea)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              isAreaCleared
                ? 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-300'
                : 'bg-forge-cyan text-black hover:bg-cyan-400 shadow-cyan-glow'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isAreaCleared ? 'Safety Screening Passed' : 'Take Safety Screening'}</span>
          </button>
        </div>

        {/* Common Complaints & Red Flags Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-charcoal-950 border border-charcoal-800">
            <h3 className="font-bold text-gray-200 mb-2 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-forge-lime" /> Common Postural Complaints
            </h3>
            <ul className="space-y-1.5 text-gray-400">
              {selectedArea.commonComplaints.map((c, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-forge-lime shrink-0 mt-1" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40">
            <h3 className="font-bold text-amber-300 mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Clinical Red Flags (Contraindications)
            </h3>
            <ul className="space-y-1.5 text-amber-200/90">
              {selectedArea.redFlagWarnings.map((w, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gentle Corrective Movements Section */}
        {isAreaCleared ? (
          <div className="pt-2 space-y-4">
            <div className="flex items-center justify-between border-t border-charcoal-800 pt-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Gentle Movement Protocol ({selectedArea.safeMovements.length})
                </h3>
                <p className="text-[11px] text-gray-400">Perform slowly within comfortable, pain-free range.</p>
              </div>

              {/* Movement Tab Selector */}
              <div className="flex gap-1.5">
                {selectedArea.safeMovements.map((m, idx) => (
                  <button
                    key={m.id}
                    onClick={() => setActiveExerciseIdx(idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${
                      activeExerciseIdx === idx
                        ? 'bg-forge-lime text-black'
                        : 'bg-charcoal-800 text-gray-400'
                    }`}
                  >
                    Ex {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {selectedArea.safeMovements[activeExerciseIdx] && (
              <div className="space-y-4">
                <MotionDemoPlayer exercise={selectedArea.safeMovements[activeExerciseIdx]} />

                <div className="p-4 rounded-xl bg-charcoal-950 border border-charcoal-800 text-xs space-y-2">
                  <h4 className="font-bold text-white text-sm">
                    {selectedArea.safeMovements[activeExerciseIdx].name}
                  </h4>
                  <div className="space-y-1 text-gray-300">
                    {selectedArea.safeMovements[activeExerciseIdx].instructions.map((step, sIdx) => (
                      <p key={sIdx}>{sIdx + 1}. {step}</p>
                    ))}
                  </div>
                  <div className="pt-2 text-[11px] text-gray-400 border-t border-charcoal-850">
                    <strong className="text-forge-lime">Scale down:</strong> {selectedArea.safeMovements[activeExerciseIdx].beginnerModification}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-charcoal-950 border border-dashed border-charcoal-800 text-center space-y-3">
            <ShieldAlert className="w-8 h-8 text-forge-cyan mx-auto" />
            <h3 className="text-sm font-bold text-white">Safety Screening Required Before Movement</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto">
              To protect your joints and prevent aggravating injuries, please verify you have no clinical red flags.
            </p>
            <button
              onClick={() => handleOpenTriage(selectedArea)}
              className="px-5 py-2.5 rounded-xl bg-forge-cyan hover:bg-cyan-400 text-black font-extrabold text-xs uppercase tracking-wide transition-all shadow-cyan-glow"
            >
              Start 30-Second Screening
            </button>
          </div>
        )}

        {/* When to see a doctor checklist */}
        <div className="pt-3 border-t border-charcoal-800 text-xs space-y-2">
          <h4 className="font-bold text-gray-300 flex items-center gap-1.5">
            <PhoneCall className="w-3.5 h-3.5 text-forge-lime" /> When to Consult a Medical Professional:
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-400">
            {selectedArea.whenToSeeDoctor.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-forge-lime font-mono">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Safety Screening Modal */}
      {triageTargetArea && (
        <PainTriageModal
          area={triageTargetArea}
          isOpen={Boolean(triageTargetArea)}
          onClose={() => setTriageTargetArea(null)}
          onCleared={handleTriageCleared}
        />
      )}

      {/* Ad placement */}
      <AdSlot placement="educational_incontent" customMinHeight={120} />
    </div>
  );
};
