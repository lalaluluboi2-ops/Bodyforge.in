import React, { useState } from 'react';
import { PainAreaScreening } from '../types';
import { AlertTriangle, ShieldAlert, CheckCircle2, X, PhoneCall, ChevronRight } from 'lucide-react';

interface PainTriageModalProps {
  area: PainAreaScreening;
  isOpen: boolean;
  onClose: () => void;
  onCleared: () => void;
}

export const PainTriageModal: React.FC<PainTriageModalProps> = ({
  area,
  isOpen,
  onClose,
  onCleared
}) => {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [hasEmergencyRedFlag, setHasEmergencyRedFlag] = useState<boolean>(false);
  const [screeningCompleted, setScreeningCompleted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSelectAnswer = (idx: number, isYes: boolean, dangerTrigger: boolean) => {
    const updated = { ...answers, [idx]: isYes };
    setAnswers(updated);

    if (isYes && dangerTrigger) {
      setHasEmergencyRedFlag(true);
    }
  };

  const handleEvaluate = () => {
    const anyDangerTriggered = area.screeningQuestions.some((q, idx) => {
      return answers[idx] === true && q.dangerTriggerIfYes;
    });

    if (anyDangerTriggered) {
      setHasEmergencyRedFlag(true);
    } else {
      setHasEmergencyRedFlag(false);
      onCleared();
      onClose();
    }
    setScreeningCompleted(true);
  };

  const allAnswered = area.screeningQuestions.every((_, idx) => answers[idx] !== undefined);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-charcoal-900 border border-charcoal-700 rounded-3xl p-6 text-gray-100 shadow-2xl space-y-4 my-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                Clinical Safety Screening
              </span>
              <h3 className="font-bold text-base text-white">{area.bodyRegion}</h3>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg text-gray-400 hover:text-white"
            aria-label="Close safety screening"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {hasEmergencyRedFlag ? (
          /* RED FLAG EMERGENCY GUIDANCE SCREEN */
          <div className="p-4 rounded-2xl bg-red-950/40 border border-red-600 text-red-200 text-xs space-y-3">
            <div className="flex items-center gap-2 text-red-400 font-black text-sm uppercase tracking-wide">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>Urgent Medical Assessment Advised</span>
            </div>
            <p className="leading-relaxed">
              Based on the symptoms you reported (such as neurological numbness, sudden progressive weakness, bowel/bladder changes, or traumatic injury), <strong>exercise or stretching is unsafe and contraindicated</strong>.
            </p>
            <p className="leading-relaxed font-semibold text-white">
              Do not attempt home workouts or physical resistance. Please contact an emergency health provider, urgent care clinic, or local medical helpline immediately.
            </p>

            <div className="p-3 bg-red-900/40 rounded-xl border border-red-700/60 flex items-center gap-2.5 text-white">
              <PhoneCall className="w-4 h-4 text-red-400 shrink-0" />
              <span>Emergency Services: <strong>911 / 999 / 112</strong> or your local emergency room</span>
            </div>

            <button
              onClick={onClose}
              className="w-full mt-2 py-3 rounded-xl bg-charcoal-950 border border-charcoal-700 text-gray-300 hover:text-white font-bold text-xs"
            >
              Close and Seek Professional Assessment
            </button>
          </div>
        ) : (
          /* SCREENING QUESTIONNAIRE */
          <div className="space-y-4">
            <p className="text-xs text-gray-300 leading-relaxed">
              Before viewing gentle movement suggestions, please answer these brief safety screening questions to rule out underlying clinical emergencies:
            </p>

            <div className="space-y-3">
              {area.screeningQuestions.map((q, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-charcoal-950 border border-charcoal-800 text-xs space-y-2">
                  <p className="font-semibold text-white">{idx + 1}. {q.question}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSelectAnswer(idx, true, q.dangerTriggerIfYes)}
                      className={`flex-1 py-1.5 rounded-lg font-mono font-bold text-xs transition-all ${
                        answers[idx] === true 
                          ? (q.dangerTriggerIfYes ? 'bg-red-600 text-white' : 'bg-forge-lime text-black')
                          : 'bg-charcoal-900 text-gray-400 border border-charcoal-800'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleSelectAnswer(idx, false, q.dangerTriggerIfYes)}
                      className={`flex-1 py-1.5 rounded-lg font-mono font-bold text-xs transition-all ${
                        answers[idx] === false 
                          ? 'bg-forge-lime text-black' 
                          : 'bg-charcoal-900 text-gray-400 border border-charcoal-800'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              disabled={!allAnswered}
              onClick={handleEvaluate}
              className={`w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 ${
                allAnswered 
                  ? 'bg-forge-lime hover:bg-forge-lime-hover text-black shadow-forge-glow' 
                  : 'bg-charcoal-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              Verify Safety & View Gentle Exercises <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
