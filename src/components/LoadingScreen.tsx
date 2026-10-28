import React, { useState, useEffect } from 'react';
import { Flame, ShieldCheck } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [repCount, setRepCount] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 350);
          return 100;
        }
        const next = prev + 3;
        if (next === 24 || next === 48 || next === 72 || next === 96) {
          setRepCount((r) => r + 1);
        }
        return next;
      });
    }, 35);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Smooth continuous pushup phase for 3D character
  const pushupPhase = (progress % 24) / 24; // 0 to 1
  const cycle = (Math.sin(pushupPhase * Math.PI * 2) + 1) / 2;
  const drop = cycle * 28;
  const shoulderY = 100 + drop;
  const hipY = 118 + drop * 0.65;
  const elbowX = 205 + cycle * 10;
  const elbowY = 115 + drop * 0.45;
  const headY = shoulderY - 14;

  return (
    <div className="fixed inset-0 z-50 bg-charcoal-950 flex flex-col items-center justify-between p-6 select-none font-sans">
      {/* Brand Header */}
      <div className="pt-8 text-center animate-pulse">
        <div className="flex items-center justify-center gap-2 mb-1">
          <div className="w-10 h-10 rounded-xl bg-forge-lime flex items-center justify-center text-black font-black text-2xl shadow-forge-glow">
            B
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            BODY<span className="text-forge-lime">FORGE</span>
          </h1>
        </div>
        <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold font-mono">
          3D Calisthenics & Strength Engine
        </p>
      </div>

      {/* Animated 3D-Style Push-Up Athletic Character */}
      <div className="w-full max-w-sm flex flex-col items-center">
        <div className="w-72 h-52 relative">
          <svg viewBox="0 0 300 200" className="w-full h-full drop-shadow-forge-glow">
            <defs>
              <radialGradient id="loadShadow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#0B0E11" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="loadTorso" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="50%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
              <radialGradient id="loadHead" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="30%" stopColor="#D4FF00" />
                <stop offset="100%" stopColor="#4D6600" />
              </radialGradient>
              <linearGradient id="loadLimb" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E6FF55" />
                <stop offset="40%" stopColor="#D4FF00" />
                <stop offset="100%" stopColor="#658200" />
              </linearGradient>
            </defs>

            {/* 3D Floor Perspective Lines */}
            <g opacity="0.3">
              <line x1="20" y1="165" x2="280" y2="165" stroke="#334155" strokeWidth="2" />
              <line x1="40" y1="175" x2="260" y2="175" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 4" />
            </g>

            {/* Dynamic 3D Floor Contact Shadow */}
            <ellipse cx="145" cy="167" rx={65 + cycle * 15} ry={6 + cycle * 3} fill="url(#loadShadow)" />

            {/* Far Foot & Leg in Depth */}
            <circle cx="65" cy="160" r="5" fill="#0284C7" />
            <line x1="65" y1="160" x2="135" y2={hipY} stroke="#0284C7" strokeWidth="8" strokeLinecap="round" />

            {/* 3D Shaded Torso Beam */}
            <line x1="135" y1={hipY} x2="205" y2={shoulderY} stroke="url(#loadTorso)" strokeWidth="15" strokeLinecap="round" />
            <line x1="135" y1={hipY} x2="205" y2={shoulderY} stroke="#475569" strokeWidth="9" strokeLinecap="round" />

            {/* Near Leg (Highlighted Athletic Calisthenics) */}
            <line x1="68" y1="162" x2="138" y2={hipY} stroke="url(#loadLimb)" strokeWidth="9" strokeLinecap="round" />
            <circle cx="68" cy="162" r="5" fill="#D4FF00" />

            {/* 3D Head & Visor */}
            <circle cx="225" cy={headY} r="12" fill="url(#loadHead)" />
            <path d={`M 229 ${headY - 1} L 236 ${headY + 1}`} stroke="#00F0FF" strokeWidth="2" />

            {/* Articulated Near Arm (Shoulder -> Elbow -> Floor Hand) */}
            <line x1="205" y1={shoulderY} x2={elbowX} y2={elbowY} stroke="url(#loadLimb)" strokeWidth="8" strokeLinecap="round" />
            <circle cx={elbowX} cy={elbowY} r="5" fill="#D4FF00" />
            <line x1={elbowX} y1={elbowY} x2="205" y2="162" stroke="#00F0FF" strokeWidth="7" strokeLinecap="round" />
            <ellipse cx="205" cy="162" rx="6" ry="3" fill="#00F0FF" />
          </svg>
        </div>

        <div className="mt-2 flex items-center gap-2 px-3 py-1 bg-charcoal-900 border border-charcoal-800 rounded-full text-xs text-gray-300">
          <span className="w-2 h-2 rounded-full bg-forge-lime animate-ping" />
          <span>Warmup Reps: <strong className="text-forge-lime font-mono">{repCount}</strong></span>
        </div>

        <h2 className="mt-5 text-xl font-black tracking-tight text-white uppercase">
          Build Your Strength
        </h2>
        <p className="text-xs text-gray-400 mt-1 font-mono">Calibrating 3D biometric motion engine...</p>
      </div>

      {/* Progress Track */}
      <div className="w-full max-w-xs pb-10">
        <div className="flex justify-between text-xs text-gray-400 font-mono mb-2">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-forge-lime" /> ZERO EQUIPMENT
          </span>
          <span className="text-forge-lime font-bold">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-charcoal-800 rounded-full overflow-hidden p-0.5 border border-charcoal-700">
          <div 
            className="h-full bg-gradient-to-r from-forge-lime to-forge-cyan rounded-full transition-all duration-100 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>
    </div>
  );
};
