import React, { useState } from 'react';
import { WellnessArticle, ExerciseItem } from '../types';
import { MotionDemoPlayer } from '../components/MotionDemoPlayer';
import { ArrowLeft, Clock, ShieldCheck, Bookmark, Check, ExternalLink, AlertTriangle, Info } from 'lucide-react';
import { AdSlot } from '../components/AdSlot';

interface WellnessArticleViewProps {
  article: WellnessArticle;
  onBack: () => void;
  onSaveRoutine?: (articleId: string) => void;
  isSaved?: boolean;
}

export const WellnessArticleView: React.FC<WellnessArticleViewProps> = ({
  article,
  onBack,
  onSaveRoutine,
  isSaved = false
}) => {
  const [saved, setSaved] = useState(isSaved);

  const handleToggleSave = () => {
    setSaved(!saved);
    if (onSaveRoutine) {
      onSaveRoutine(article.id);
    }
  };

  // Build a demonstration movement item based on the article's motionType
  const demoExercise: ExerciseItem = {
    id: `demo_${article.id}`,
    name: `${article.title} - Form Demonstration`,
    targetMuscles: ['Full Body', 'Neck & Posture'],
    durationSeconds: 45,
    restSeconds: 15,
    instructions: [
      'Maintain steady rhythmic breathing and neutral spinal alignment.',
      'Perform this gentle routine once daily to reinforce healthy mobility.'
    ],
    formCues: ['Move with control', 'Never force into discomfort'],
    mistakesToAvoid: ['Holding your breath', 'Rushing repetitions'],
    beginnerModification: 'Perform while comfortably seated.',
    animationType: article.motionType || 'diaphragm-breath'
  };

  return (
    <div className="min-h-screen bg-charcoal-950 pb-28 text-gray-100">
      {/* Article Header Banner */}
      <div className={`p-4 md:p-8 bg-gradient-to-b ${article.heroGradient} border-b border-charcoal-800`}>
        <div className="max-w-3xl mx-auto space-y-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-charcoal-900/80 border border-charcoal-700 text-gray-300 hover:text-white flex items-center gap-2 text-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Body & Wellness
          </button>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-forge-lime text-black font-mono text-[10px] font-black uppercase tracking-wider">
              {article.category.replace('-', ' ')}
            </span>
            <span className="text-xs text-gray-300 font-mono flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.readingMinutes} min read
            </span>
            <span className="text-xs text-gray-400 font-mono">
              Reviewed: {article.reviewDate}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
            {article.title}
          </h1>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed">
            {article.subtitle}
          </p>

          <div className="pt-2 flex items-center justify-between text-xs text-gray-400 border-t border-charcoal-800">
            <span>By: <strong className="text-white">{article.reviewedBy}</strong></span>
            <button
              onClick={handleToggleSave}
              className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all text-xs ${
                saved
                  ? 'bg-forge-lime/20 border-forge-lime text-forge-lime font-bold'
                  : 'bg-charcoal-900 border-charcoal-700 text-gray-300 hover:text-white'
              }`}
            >
              {saved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span>{saved ? 'Saved in Profile' : 'Save Routine'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
        {/* Key Takeaways Card */}
        <div className="p-5 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-2.5 shadow-lg">
          <div className="flex items-center gap-2 text-forge-lime font-bold text-xs uppercase tracking-wider font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>Core Evidence Summary</span>
          </div>
          <ul className="space-y-2">
            {article.keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-gray-200 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-forge-lime shrink-0 mt-1.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Biomechanical Motion Demonstration Player */}
        <div className="my-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs uppercase font-mono tracking-wider text-gray-400 font-bold">
              Guided Kinetic Demonstration
            </h3>
            <span className="text-[11px] text-forge-lime font-mono">Real-Time Simulation</span>
          </div>
          <MotionDemoPlayer exercise={demoExercise} />
        </div>

        {/* Detailed Sections */}
        <div className="space-y-6 text-xs md:text-sm text-gray-300 leading-relaxed">
          {article.sections.map((sec, i) => (
            <div key={i} className="space-y-3">
              <h2 className="text-base md:text-lg font-bold text-white pt-2 border-b border-charcoal-800 pb-1">
                {sec.heading}
              </h2>

              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="leading-relaxed">{p}</p>
              ))}

              {sec.bulletPoints && (
                <ul className="space-y-1.5 pl-3 border-l-2 border-charcoal-700 my-2">
                  {sec.bulletPoints.map((bp, bIdx) => (
                    <li key={bIdx} className="text-gray-300">{bp}</li>
                  ))}
                </ul>
              )}

              {sec.calloutNotice && (
                <div className={`p-4 rounded-xl border my-3 text-xs ${
                  sec.calloutNotice.type === 'warning'
                    ? 'bg-amber-950/40 border-amber-600/50 text-amber-200'
                    : sec.calloutNotice.type === 'clinical'
                    ? 'bg-cyan-950/40 border-cyan-700/50 text-cyan-200'
                    : 'bg-charcoal-900 border-charcoal-700 text-gray-300'
                }`}>
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    {sec.calloutNotice.type === 'warning' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Info className="w-4 h-4 text-cyan-400" />
                    )}
                    <span>{sec.calloutNotice.type === 'warning' ? 'Clinical Precautions' : 'Practice Boundary Note'}</span>
                  </div>
                  <p className="leading-relaxed">{sec.calloutNotice.text}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Safe Advertisement Slot */}
        <AdSlot placement="educational_incontent" customMinHeight={120} />

        {/* Verified Medical Sources & Review Notice */}
        <div className="p-5 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider">
            <ExternalLink className="w-4 h-4 text-forge-cyan" />
            <span>Verified Scientific References</span>
          </div>
          <div className="space-y-2">
            {article.sources.map((src, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-charcoal-950 border border-charcoal-800">
                <p className="font-bold text-gray-200">{src.sourceName} ({src.year})</p>
                <p className="text-[11px] text-gray-400">{src.organization}</p>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-gray-500 italic pt-2">
            Clinical Disclaimer: BODYFORGE provides evidence-aware health education. It is not an individualized medical diagnosis. Always consult a physician or physical therapist for persistent or worsening symptoms.
          </p>
        </div>
      </div>
    </div>
  );
};
