import React, { useState } from 'react';
import { WellnessArticle, WellnessCategory } from '../types';
import { WELLNESS_ARTICLES } from '../data/wellnessContent';
import { 
  HeartPulse, 
  Search, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Activity, 
  Moon, 
  Sun, 
  Apple, 
  Compass, 
  CheckCircle2,
  Stethoscope
} from 'lucide-react';
import { AdSlot } from '../components/AdSlot';

interface WellnessHubViewProps {
  onSelectArticle: (article: WellnessArticle) => void;
  onOpenPainLibrary: () => void;
}

export const WellnessHubView: React.FC<WellnessHubViewProps> = ({
  onSelectArticle,
  onOpenPainLibrary
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Interactive Glow-Up Habits state with persistence
  const [habits, setHabits] = useState(() => {
    try {
      const saved = localStorage.getItem('bodyforge_glowup_habits');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { id: 'cervical', title: 'Cervical Retraction (Ear-over-Shoulder)', category: 'posture', cue: '30s chin retractions to counteract tech neck & sculpt jawline', done: false },
      { id: 'sunlight', title: '15-Min Circadian Light', category: 'sleep', cue: 'Natural morning photons set cortisol & reduce under-eye puffiness', done: false },
      { id: 'hydrate', title: 'Optimal Hydration (2.5L+)', category: 'hydration', cue: 'Plumps skin cells and flushes metabolic waste', done: false },
      { id: 'sweat-rinse', title: 'Post-Workout Sweat Rinse', category: 'skin', cue: 'Lukewarm rinse within 15 mins to prevent acne mechanica', done: false },
      { id: 'v-taper', title: 'V-Taper Scapular Activation', category: 'movement', cue: 'Squeeze shoulder blades to widen shoulders and open chest', done: false }
    ];
  });

  const toggleHabit = (id: string) => {
    setHabits((prev: any[]) => {
      const updated = prev.map((h: any) => h.id === id ? { ...h, done: !h.done } : h);
      try {
        localStorage.setItem('bodyforge_glowup_habits', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const completedCount = habits.filter((h: any) => h.done).length;
  const glowPercentage = Math.round((completedCount / habits.length) * 100);

  const categories = [
    { id: 'all', label: 'All Wellness' },
    { id: 'glow-up', label: '✨ Athletic Glow-Up' },
    { id: 'skin-care', label: 'Skin & Sweat Care' },
    { id: 'hair-scalp', label: 'Hair & Scalp' },
    { id: 'weight-management', label: 'Weight & Energy' },
    { id: 'sleep', label: 'Sleep & Recovery' },
    { id: 'posture', label: 'Spine & Posture' },
    { id: 'stress', label: 'Stress & Vagus' }
  ];

  const filteredArticles = WELLNESS_ARTICLES.filter(art => {
    const matchesSearch = 
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || art.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 pb-28 text-gray-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-forge-lime uppercase flex items-center gap-1.5 font-bold">
            <HeartPulse className="w-4 h-4 text-forge-lime" />
            BODY & WELLNESS PLATFORM
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white mt-1">Holistic Health, Glow-Up & Self-Care</h1>
          <p className="text-xs text-gray-400 mt-1 max-w-xl">
            Evidence-based guides on natural jawline definition, bodyweight V-taper aesthetics, athlete skincare, restorative sleep, and joint longevity.
          </p>
        </div>

        {/* Quick Launch Pain & Mobility Button */}
        <button
          onClick={onOpenPainLibrary}
          className="self-start md:self-auto px-4 py-2.5 rounded-2xl bg-charcoal-900 border border-charcoal-700 hover:border-forge-cyan text-xs font-bold text-forge-cyan flex items-center gap-2 shadow-sm transition-all"
        >
          <Stethoscope className="w-4 h-4" />
          <span>Pain & Mobility Library</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Daily Glow-Up Habit Tracker Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-charcoal-900 via-charcoal-950 to-charcoal-900 border border-forge-lime/30 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-forge-lime/20 border border-forge-lime/40 flex items-center justify-center text-forge-lime">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">Daily Athletic Glow-Up Checklist</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-forge-lime text-black font-extrabold">
                  {glowPercentage}% Radiance
                </span>
              </div>
              <p className="text-xs text-gray-400">Science-backed habits for cervical jawline definition, skin radiance, and posture</p>
            </div>
          </div>
          <div className="text-xs font-mono text-gray-400 flex items-center gap-1.5 self-end sm:self-auto">
            <span>{completedCount} of {habits.length} Complete</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-charcoal-800 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-forge-lime via-forge-cyan to-forge-lime transition-all duration-500 rounded-full"
            style={{ width: `${glowPercentage}%` }}
          />
        </div>

        {/* Habit Checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
          {habits.map((h: any) => (
            <button
              key={h.id}
              onClick={() => toggleHabit(h.id)}
              className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 group ${
                h.done 
                  ? 'bg-forge-lime/10 border-forge-lime text-white' 
                  : 'bg-charcoal-900/90 border-charcoal-800 text-gray-300 hover:border-gray-700'
              }`}
            >
              <div className={`w-4 h-4 rounded-md mt-0.5 border flex items-center justify-center shrink-0 transition-colors ${
                h.done ? 'bg-forge-lime border-forge-lime text-black' : 'border-gray-600 group-hover:border-forge-lime'
              }`}>
                {h.done && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <div className="space-y-0.5 min-w-0">
                <h4 className={`text-xs font-bold leading-tight ${h.done ? 'text-forge-lime line-through opacity-80' : 'text-white'}`}>
                  {h.title}
                </h4>
                <p className="text-[10px] text-gray-400 leading-snug line-clamp-2">
                  {h.cue}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Prominent Clinical Disclaimer */}
      <div className="p-3.5 rounded-xl bg-charcoal-900 border border-charcoal-800 flex items-start gap-3 text-xs text-gray-300">
        <ShieldCheck className="w-4 h-4 text-forge-lime shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Evidence-Based Education:</strong> BODYFORGE health content is compiled from verified peer-reviewed publications and public health guidance (NHS, WHO, CDC, AAD). This is educational self-care and never replaces personalized medical diagnosis from a licensed healthcare provider.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search scalp care, sleep hygiene, walking habits, posture, neck relief..."
          className="w-full bg-charcoal-900 border border-charcoal-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-forge-lime"
        />
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === c.id
                ? 'bg-forge-lime text-black font-bold'
                : 'bg-charcoal-900 border border-charcoal-800 text-gray-400 hover:text-white'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Featured Joint Triage Banner */}
      <div 
        onClick={onOpenPainLibrary}
        className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-charcoal-900 to-charcoal-950 border border-cyan-800/40 hover:border-forge-cyan transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
      >
        <div className="space-y-1">
          <span className="px-2 py-0.5 rounded bg-forge-cyan/20 text-forge-cyan font-mono text-[10px] font-bold uppercase tracking-wider">
            Symptom Screening
          </span>
          <h3 className="text-base font-bold text-white group-hover:text-forge-cyan transition-colors">
            Experiencing Joint or Muscle Discomfort?
          </h3>
          <p className="text-xs text-gray-400 max-w-lg">
            Screen for red flag warning signs before starting exercises. Access gentle mobility protocols for neck, back, knees, and hips.
          </p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-forge-cyan text-black font-extrabold text-xs uppercase tracking-wider shrink-0 flex items-center gap-1.5">
          Run Safety Screening <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Educational Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className="p-5 rounded-2xl bg-charcoal-900 border border-charcoal-800 hover:border-forge-lime/50 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-mono tracking-wider text-forge-lime font-bold">
                  {article.category.replace('-', ' ')}
                </span>
                <span className="text-[10px] font-mono text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {article.readingMinutes} min read
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-forge-lime transition-colors">
                {article.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">{article.summary}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-charcoal-800 flex items-center justify-between text-xs text-gray-400">
              <span className="text-[10px] text-gray-500 font-mono">Reviewed: {article.reviewDate}</span>
              <span className="text-forge-lime font-bold flex items-center gap-1">
                Read Guide &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Educational Ad Placement */}
      <AdSlot placement="educational_incontent" customMinHeight={140} />
    </div>
  );
};
