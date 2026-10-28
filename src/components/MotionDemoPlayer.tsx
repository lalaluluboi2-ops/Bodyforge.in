import React, { useState, useEffect, useRef } from 'react';
import { ExerciseItem } from '../types';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  ShieldCheck, 
  Activity, 
  Eye, 
  Zap,
  Gauge,
  Box
} from 'lucide-react';
import { audioService } from '../services/audioService';

interface MotionDemoPlayerProps {
  exercise: ExerciseItem;
  videoUrl?: string;
  onStepComplete?: () => void;
  className?: string;
  showDetails?: boolean;
}

export const MotionDemoPlayer: React.FC<MotionDemoPlayerProps> = ({
  exercise,
  videoUrl,
  onStepComplete,
  className = '',
  showDetails = true
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [speed, setSpeed] = useState<number>(1); // 0.5, 1, 1.5
  const [viewMode, setViewMode] = useState<'3d-character' | 'muscles'>('3d-character');
  const [phase, setPhase] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(exercise.durationSeconds || 30);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    setSecondsRemaining(exercise.durationSeconds || 30);
    setIsPlaying(true);
  }, [exercise]);

  // Kinetic sine cycle for smooth 60fps movement simulation with speed modifier
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setPhase((prev) => (prev + 0.05 * speed) % (Math.PI * 2));
    }, 30);
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  // Routine countdown timer
  useEffect(() => {
    if (!isPlaying || secondsRemaining <= 0) return;
    const timer = setInterval(() => {
      setSecondsRemaining((s) => {
        if (s <= 1) {
          if (!isMuted) audioService.playVictoryFanfare();
          if (onStepComplete) onStepComplete();
          return 0;
        }
        if (s <= 4 && !isMuted) audioService.playBeep(600, 0.06);
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, secondsRemaining, isMuted, onStepComplete]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleRestart = () => {
    setSecondsRemaining(exercise.durationSeconds || 30);
    setPhase(0);
    setIsPlaying(true);
    if (!isMuted) audioService.playStartChime();
  };

  const cycle = (Math.sin(phase) + 1) / 2; // 0 to 1 smooth cycle
  const animType = exercise.animationType || 'pushup';

  // Helper renderers for 3D character components
  const isMuscleMode = viewMode === 'muscles';

  // Color palletes for 3D character
  const nearLimbStroke = isMuscleMode ? '#00F0FF' : 'url(#char3dLimbNear)';
  const farLimbStroke = isMuscleMode ? '#0284C7' : 'url(#char3dLimbFar)';
  const activeMuscleStroke = isMuscleMode ? '#D4FF00' : 'url(#char3dLimbNear)';

  return (
    <div 
      ref={containerRef}
      className={`rounded-2xl bg-charcoal-900 border border-charcoal-800 overflow-hidden flex flex-col justify-between p-4 shadow-xl select-none ${className}`}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-charcoal-800 text-xs">
        <div className="flex items-center gap-2 font-mono text-forge-lime font-bold uppercase tracking-wider">
          <Box className="w-4 h-4 text-forge-lime animate-pulse" />
          <span>3D Motion Demonstration</span>
        </div>
        
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="bg-charcoal-950 border border-charcoal-800 p-0.5 rounded-lg flex items-center text-[10px]">
            <button
              onClick={() => setViewMode('3d-character')}
              className={`px-2 py-0.5 rounded-md transition-all font-medium ${
                viewMode === '3d-character' ? 'bg-forge-lime text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              3D Figure
            </button>
            <button
              onClick={() => setViewMode('muscles')}
              className={`px-2 py-0.5 rounded-md transition-all font-medium ${
                viewMode === 'muscles' ? 'bg-forge-cyan text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              Anatomy
            </button>
          </div>

          {/* Speed Selector */}
          <div className="bg-charcoal-950 border border-charcoal-800 p-0.5 rounded-lg flex items-center text-[10px] font-mono">
            {[0.5, 1, 1.5].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-1.5 py-0.5 rounded-md transition-all ${
                  speed === s ? 'bg-charcoal-800 text-forge-lime font-bold' : 'text-gray-400 hover:text-white'
                }`}
                title={`Playback speed ${s}x`}
              >
                {s}x
              </button>
            ))}
          </div>

          <div className="font-mono text-gray-300 text-xs pl-1">
            {secondsRemaining > 0 ? `${secondsRemaining}s` : 'Done'}
          </div>
        </div>
      </div>

      {/* Screen Display Area: 3D Animated Character Studio */}
      <div className="relative w-full h-64 sm:h-80 my-3 rounded-xl bg-charcoal-950 flex items-center justify-center overflow-hidden border border-charcoal-850">
        {videoUrl && !videoFailed ? (
          <video
            src={videoUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onError={() => setVideoFailed(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          /* High-Definition 3D Biomechanical Character Engine */
          <svg viewBox="0 0 440 260" className="w-full h-full max-w-md drop-shadow-forge-glow">
            <defs>
              {/* Volumetric Floor Shadow */}
              <radialGradient id="char3dFloorShadow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#0B0E11" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#0B0E11" stopOpacity="0" />
              </radialGradient>

              {/* Near Limb Volumetric 3D Gradient */}
              <linearGradient id="char3dLimbNear" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E6FF55" />
                <stop offset="35%" stopColor="#D4FF00" />
                <stop offset="80%" stopColor="#7DA800" />
                <stop offset="100%" stopColor="#3C5200" />
              </linearGradient>

              {/* Far Limb Depth Gradient (Darker for depth cueing) */}
              <linearGradient id="char3dLimbFar" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="40%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#082F49" />
              </linearGradient>

              {/* 3D Torso / Chest Muscular Volume */}
              <linearGradient id="char3dTorso" x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="35%" stopColor="#1E293B" />
                <stop offset="70%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>

              {/* 3D Head Spherical Shading */}
              <radialGradient id="char3dHead" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#D4FF00" />
                <stop offset="70%" stopColor="#658200" />
                <stop offset="100%" stopColor="#1E293B" />
              </radialGradient>

              {/* Neon Glow Filter */}
              <filter id="forgeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 3D Perspective Studio Floor Grid */}
            <g opacity="0.35">
              <line x1="30" y1="215" x2="410" y2="215" stroke="#1E293B" strokeWidth="2" />
              <line x1="60" y1="225" x2="380" y2="225" stroke="#1E293B" strokeWidth="1.5" strokeDasharray="6 4" />
              <line x1="90" y1="235" x2="350" y2="235" stroke="#1E293B" strokeWidth="1" strokeDasharray="4 6" />
              {/* Perspective angled lines */}
              <line x1="80" y1="215" x2="40" y2="245" stroke="#1E293B" strokeWidth="1" />
              <line x1="160" y1="215" x2="135" y2="245" stroke="#1E293B" strokeWidth="1" />
              <line x1="240" y1="215" x2="245" y2="245" stroke="#1E293B" strokeWidth="1" />
              <line x1="320" y1="215" x2="350" y2="245" stroke="#1E293B" strokeWidth="1" />
              <line x1="380" y1="215" x2="420" y2="245" stroke="#1E293B" strokeWidth="1" />
            </g>

            {/* ============================================================== */}
            {/* 1. SQUAT / AIR SQUAT (Connected Kinematics) */}
            {/* ============================================================== */}
            {animType === 'squat' && (() => {
              const hipDrop = cycle * 42;
              const hipX = 180 - cycle * 10;
              const hipY = 125 + hipDrop;
              const kneeX = 228 + cycle * 8;
              const kneeY = 175 - cycle * 4;
              const ankleX = 215;
              const ankleY = 218;
              const chestX = hipX + 22;
              const chestY = hipY - 50;
              const headX = chestX + 6;
              const headY = chestY - 18;
              const armReachX = 255 + cycle * 20;

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={205} cy={220} rx={45 + cycle * 15} ry={10} fill="url(#char3dFloorShadow)" />

                  {/* FAR LEG */}
                  <line x1={hipX - 10} y1={hipY} x2={kneeX - 10} y2={kneeY} stroke={farLimbStroke} strokeWidth="11" strokeLinecap="round" />
                  <circle cx={kneeX - 10} cy={kneeY} r="6" fill="#0284C7" />
                  <line x1={kneeX - 10} y1={kneeY} x2={ankleX - 15} y2={ankleY} stroke={farLimbStroke} strokeWidth="9" strokeLinecap="round" />
                  <ellipse cx={ankleX - 15} cy={ankleY} rx="8" ry="4" fill="#0284C7" />

                  {/* FAR ARM */}
                  <line x1={chestX - 6} y1={chestY + 6} x2={armReachX - 12} y2={chestY + 3} stroke={farLimbStroke} strokeWidth="7" strokeLinecap="round" />
                  <circle cx={armReachX - 12} cy={chestY + 3} r="4" fill="#0284C7" />

                  {/* 3D TORSO */}
                  <line x1={hipX} y1={hipY} x2={chestX} y2={chestY} stroke="url(#char3dTorso)" strokeWidth="18" strokeLinecap="round" />
                  <line x1={hipX} y1={hipY} x2={chestX} y2={chestY} stroke={isMuscleMode ? '#00F0FF' : '#475569'} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={hipX} cy={hipY} r="9" fill="#1E293B" />
                  <circle cx={chestX} cy={chestY} r="9" fill="#1E293B" />

                  {/* 3D HEAD & VISOR */}
                  <circle cx={headX} cy={headY} r="14" fill="url(#char3dHead)" />
                  <path d={`M ${headX + 4} ${headY - 2} L ${headX + 13} ${headY + 1} L ${headX + 4} ${headY + 6}`} stroke="#00F0FF" strokeWidth="2.5" fill="none" />

                  {/* NEAR LEG */}
                  <line x1={hipX} y1={hipY} x2={kneeX} y2={kneeY} stroke={activeMuscleStroke} strokeWidth="13" strokeLinecap="round" />
                  <circle cx={kneeX} cy={kneeY} r="7" fill="#D4FF00" />
                  <line x1={kneeX} y1={kneeY} x2={ankleX} y2={ankleY} stroke={nearLimbStroke} strokeWidth="10" strokeLinecap="round" />
                  <circle cx={ankleX} cy={ankleY} r="5" fill="#D4FF00" />
                  <ellipse cx={ankleX + 4} cy={ankleY} rx="10" ry="4" fill="#D4FF00" />

                  {/* NEAR ARM */}
                  <line x1={chestX} y1={chestY + 6} x2={armReachX} y2={chestY} stroke={nearLimbStroke} strokeWidth="8" strokeLinecap="round" />
                  <circle cx={armReachX} cy={chestY} r="5" fill="#D4FF00" />

                  {isMuscleMode && (
                    <g className="animate-pulse">
                      <text x="95" y={hipY - 5} fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">GLUTEUS MAX (90° PEAK)</text>
                      <text x="245" y={kneeY - 12} fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">QUADRICEPS ECCENTRIC</text>
                    </g>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 2. PUSHUP / PECTORAL ARMOR (Connected Kinematics) */}
            {/* ============================================================== */}
            {animType === 'pushup' && (() => {
              const drop = cycle * 38;
              const shoulderY = 125 + drop;
              const hipY = 145 + drop * 0.65;
              const elbowX = 285 + cycle * 12;
              const elbowY = 148 + drop * 0.45;
              const headX = 315;
              const headY = shoulderY - 15;
              const footX = 95;
              const footY = 200;

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={200} cy={212} rx={110 + cycle * 20} ry={8 + cycle * 5} fill="url(#char3dFloorShadow)" />

                  {/* FAR LEG */}
                  <line x1={footX - 5} y1={footY} x2="180" y2={hipY} stroke={farLimbStroke} strokeWidth="11" strokeLinecap="round" />
                  <circle cx={footX - 5} cy={footY} r="6" fill="#0284C7" />

                  {/* FAR ARM */}
                  <line x1="275" y1={shoulderY - 5} x2={elbowX - 10} y2={elbowY - 5} stroke={farLimbStroke} strokeWidth="8" strokeLinecap="round" />
                  <circle cx={elbowX - 10} cy={elbowY - 5} r="5" fill="#0284C7" />
                  <line x1={elbowX - 10} y1={elbowY - 5} x2="275" y2="200" stroke={farLimbStroke} strokeWidth="8" strokeLinecap="round" />
                  <ellipse cx="275" cy="200" rx="7" ry="4" fill="#0284C7" />

                  {/* 3D RIGID TORSO PLANK */}
                  <line x1="185" y1={hipY} x2="285" y2={shoulderY} stroke="url(#char3dTorso)" strokeWidth="18" strokeLinecap="round" />
                  <line x1="185" y1={hipY} x2="285" y2={shoulderY} stroke={isMuscleMode ? '#00F0FF' : '#475569'} strokeWidth="12" strokeLinecap="round" />
                  <circle cx="185" cy={hipY} r="9" fill="#1E293B" />
                  <circle cx="285" cy={shoulderY} r="9" fill="#1E293B" />

                  {/* 3D HEAD WITH FORWARD GAZE */}
                  <circle cx={headX} cy={headY} r="14" fill="url(#char3dHead)" />
                  <path d={`M ${headX + 4} ${headY} L ${headX + 12} ${headY + 2}`} stroke="#00F0FF" strokeWidth="2.5" />

                  {/* NEAR LEG */}
                  <line x1={footX} y1={footY + 2} x2="190" y2={hipY} stroke={nearLimbStroke} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={footX} cy={footY + 2} r="6" fill="#D4FF00" />
                  <circle cx="190" cy={hipY} r="7" fill="#D4FF00" />

                  {/* NEAR ARM (Shoulder -> Elbow -> Wrist) */}
                  <line x1="285" y1={shoulderY} x2={elbowX} y2={elbowY} stroke={activeMuscleStroke} strokeWidth="10" strokeLinecap="round" />
                  <circle cx={elbowX} cy={elbowY} r="6" fill="#D4FF00" />
                  <line x1={elbowX} y1={elbowY} x2="285" y2="202" stroke={nearLimbStroke} strokeWidth="9" strokeLinecap="round" />
                  <circle cx="285" cy="202" r="5" fill="#D4FF00" />
                  <ellipse cx="285" cy="202" rx="9" ry="4" fill="#00F0FF" />

                  {isMuscleMode && (
                    <g className="animate-pulse">
                      <text x="205" y={shoulderY - 14} fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">PECTORALIS MAJOR</text>
                      <text x="295" y={elbowY - 8} fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">TRICEPS 45°</text>
                    </g>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 3. PLANK / ISOMETRIC CORE (Connected Kinematics) */}
            {/* ============================================================== */}
            {animType === 'plank' && (() => {
              const microBreathe = Math.sin(phase * 2) * 2;
              const hipY = 152 + microBreathe;

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={210} cy={210} rx={115} ry={10} fill="url(#char3dFloorShadow)" />

                  {/* FAR LEG */}
                  <circle cx="95" cy="198" r="6" fill="#0284C7" />
                  <line x1="95" y1="198" x2="185" y2={hipY} stroke={farLimbStroke} strokeWidth="11" strokeLinecap="round" />

                  {/* FAR FOREARM */}
                  <line x1="280" y1="152" x2="280" y2="198" stroke={farLimbStroke} strokeWidth="8" strokeLinecap="round" />
                  <line x1="280" y1="198" x2="310" y2="198" stroke="#0284C7" strokeWidth="7" strokeLinecap="round" />

                  {/* 3D RIGID CORE BEAM */}
                  <line x1="190" y1={hipY} x2="290" y2="152" stroke="url(#char3dTorso)" strokeWidth="18" strokeLinecap="round" />
                  <line x1="190" y1={hipY} x2="290" y2="152" stroke={isMuscleMode ? '#00F0FF' : '#475569'} strokeWidth="12" strokeLinecap="round" />
                  <circle cx="190" cy={hipY} r="8" fill="#1E293B" />
                  <circle cx="290" cy="152" r="8" fill="#1E293B" />

                  {/* 3D HEAD */}
                  <circle cx="325" cy="138" r="14" fill="url(#char3dHead)" />

                  {/* NEAR LEG */}
                  <line x1="102" y1="200" x2="192" y2={hipY} stroke={nearLimbStroke} strokeWidth="12" strokeLinecap="round" />
                  <circle cx="102" cy="200" r="6" fill="#D4FF00" />
                  <circle cx="192" cy={hipY} r="7" fill="#D4FF00" />

                  {/* NEAR FOREARM (Stacked elbow & forearm flat) */}
                  <line x1="290" y1="152" x2="290" y2="200" stroke={nearLimbStroke} strokeWidth="9" strokeLinecap="round" />
                  <circle cx="290" cy="200" r="6" fill="#D4FF00" />
                  <line x1="290" y1="200" x2="320" y2="200" stroke="#00F0FF" strokeWidth="8" strokeLinecap="round" />
                  <ellipse cx="320" cy="200" rx="6" ry="3" fill="#D4FF00" />

                  {/* Transverse Abdominis Ring Pulse */}
                  <circle cx="235" cy={hipY} r={16 + microBreathe * 2} fill="none" stroke="#D4FF00" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.85" />

                  {isMuscleMode && (
                    <g className="animate-pulse">
                      <text x="165" y={hipY - 14} fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">TRANSVERSE ABDOMINIS (100% BRACE)</text>
                      <text x="245" y="215" fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">SERRATUS ANTERIOR</text>
                    </g>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 4. CHAIR / BENCH TRICEP DIPS (Connected Kinematics) */}
            {/* ============================================================== */}
            {animType === 'dips' && (() => {
              const dipY = cycle * 42;
              const benchX = 265;
              const hipY = 145 + dipY;
              const elbowX = 248 + dipY * 0.12;
              const elbowY = 120 + dipY * 0.9;
              const shoulderY = 110 + dipY;
              const headY = 92 + dipY;
              const kneeX = 180;
              const kneeY = 175 + dipY * 0.2;
              const footX = 135;
              const footY = 215;

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={200} cy={218} rx={75} ry={10} fill="url(#char3dFloorShadow)" />

                  {/* 3D Bench Structure */}
                  <rect x={benchX} y="130" width="70" height="85" rx="8" fill="#1E293B" stroke="#334155" strokeWidth="2.5" />
                  <rect x={benchX - 5} y="125" width="80" height="12" rx="4" fill="#334155" />

                  {/* FAR LEG */}
                  <line x1="220" y1={hipY} x2={kneeX - 10} y2={kneeY} stroke={farLimbStroke} strokeWidth="10" strokeLinecap="round" />
                  <circle cx={kneeX - 10} cy={kneeY} r="5" fill="#0284C7" />
                  <line x1={kneeX - 10} y1={kneeY} x2={footX - 10} y2={footY} stroke={farLimbStroke} strokeWidth="9" strokeLinecap="round" />

                  {/* 3D Vertical Torso */}
                  <line x1="225" y1={hipY} x2="230" y2={shoulderY} stroke="url(#char3dTorso)" strokeWidth="18" strokeLinecap="round" />
                  <line x1="225" y1={hipY} x2="230" y2={shoulderY} stroke={isMuscleMode ? '#00F0FF' : '#475569'} strokeWidth="12" strokeLinecap="round" />
                  <circle cx="225" cy={hipY} r="9" fill="#1E293B" />
                  <circle cx="230" cy={shoulderY} r="9" fill="#1E293B" />

                  {/* 3D Head */}
                  <circle cx="230" cy={headY} r="14" fill="url(#char3dHead)" />

                  {/* NEAR LEG */}
                  <line x1="225" y1={hipY} x2={kneeX} y2={kneeY} stroke={nearLimbStroke} strokeWidth="11" strokeLinecap="round" />
                  <circle cx={kneeX} cy={kneeY} r="6" fill="#D4FF00" />
                  <line x1={kneeX} y1={kneeY} x2={footX} y2={footY} stroke={nearLimbStroke} strokeWidth="10" strokeLinecap="round" />
                  <circle cx={footX} cy={footY} r="6" fill="#D4FF00" />
                  <ellipse cx={footX - 4} cy={footY} rx="8" ry="4" fill="#D4FF00" />

                  {/* 3D Articulated Arm (Shoulder -> Elbow -> Bench Hand) */}
                  <line x1="230" y1={shoulderY} x2={elbowX} y2={elbowY} stroke={activeMuscleStroke} strokeWidth="9" strokeLinecap="round" />
                  <circle cx={elbowX} cy={elbowY} r="6" fill="#D4FF00" />
                  <line x1={elbowX} y1={elbowY} x2={benchX} y2="125" stroke={nearLimbStroke} strokeWidth="9" strokeLinecap="round" />
                  <circle cx={benchX} cy="125" r="5" fill="#00F0FF" />

                  {isMuscleMode && (
                    <g className="animate-pulse">
                      <text x="140" y="100" fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">TRICEPS LONG & LATERAL HEAD</text>
                      <text x="130" y={hipY - 10} fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">ANTERIOR DELTOID</text>
                    </g>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 5. LUNGE / ALTERNATING STRIDE (Connected Kinematics) */}
            {/* ============================================================== */}
            {animType === 'lunge' && (() => {
              const dropY = cycle * 38;
              const hipY = 125 + dropY;
              const frontKneeX = 265;
              const frontKneeY = 150 + dropY * 0.35;
              const frontAnkleX = 265;
              const frontAnkleY = 215;
              const rearKneeX = 145;
              const rearKneeY = 165 + dropY * 0.85;
              const rearAnkleX = 115;
              const rearAnkleY = 215;
              const chestY = 70 + dropY;
              const headY = 50 + dropY;

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={205} cy={218} rx={80} ry={10} fill="url(#char3dFloorShadow)" />

                  {/* REAR LEG */}
                  <line x1="200" y1={hipY} x2={rearKneeX} y2={rearKneeY} stroke={farLimbStroke} strokeWidth="11" strokeLinecap="round" />
                  <circle cx={rearKneeX} cy={rearKneeY} r="6" fill="#0284C7" />
                  <line x1={rearKneeX} y1={rearKneeY} x2={rearAnkleX} y2={rearAnkleY} stroke={farLimbStroke} strokeWidth="9" strokeLinecap="round" />
                  <ellipse cx={rearAnkleX} cy={rearAnkleY} rx="7" ry="4" fill="#0284C7" />

                  {/* 3D TALL TORSO */}
                  <line x1="200" y1={hipY} x2="200" y2={chestY} stroke="url(#char3dTorso)" strokeWidth="18" strokeLinecap="round" />
                  <line x1="200" y1={hipY} x2="200" y2={chestY} stroke={isMuscleMode ? '#00F0FF' : '#475569'} strokeWidth="12" strokeLinecap="round" />
                  <circle cx="200" cy={hipY} r="9" fill="#1E293B" />
                  <circle cx="200" cy={chestY} r="9" fill="#1E293B" />

                  {/* 3D HEAD */}
                  <circle cx="200" cy={headY} r="14" fill="url(#char3dHead)" />

                  {/* ARMS AT SIDES / HIPS */}
                  <line x1="200" y1={chestY + 10} x2="185" y2={chestY + 35} stroke={farLimbStroke} strokeWidth="7" strokeLinecap="round" />
                  <line x1="200" y1={chestY + 10} x2="215" y2={chestY + 35} stroke={nearLimbStroke} strokeWidth="8" strokeLinecap="round" />
                  <circle cx="215" cy={chestY + 35} r="4" fill="#D4FF00" />

                  {/* FRONT LEG (Vertical shin 90°) */}
                  <line x1="200" y1={hipY} x2={frontKneeX} y2={frontKneeY} stroke={activeMuscleStroke} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={frontKneeX} cy={frontKneeY} r="7" fill="#D4FF00" />
                  <line x1={frontKneeX} y1={frontKneeY} x2={frontAnkleX} y2={frontAnkleY} stroke={nearLimbStroke} strokeWidth="10" strokeLinecap="round" />
                  <circle cx={frontAnkleX} cy={frontAnkleY} r="6" fill="#D4FF00" />
                  <ellipse cx={frontAnkleX + 4} cy={frontAnkleY} rx="9" ry="4" fill="#D4FF00" />

                  {isMuscleMode && (
                    <g className="animate-pulse">
                      <text x="215" y={frontKneeY - 12} fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">FRONT QUAD & GLUTE (90°)</text>
                      <text x="80" y={rearKneeY - 10} fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">HIP FLEXOR STRETCH</text>
                    </g>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 6. CRUNCH / ABDOMINAL CURL (Connected Kinematics) */}
            {/* ============================================================== */}
            {animType === 'crunch' && (() => {
              const curl = cycle * 26;
              const hipX = 175;
              const hipY = 198;
              const kneeX = 220;
              const kneeY = 145;
              const footX = 265;
              const footY = 200;
              const chestX = 105 - curl * 0.5;
              const chestY = 155 - curl;
              const headX = 85 - curl * 0.5;
              const headY = 140 - curl;

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={210} cy={210} rx={110} ry={8} fill="url(#char3dFloorShadow)" />

                  {/* Bent Knees Grounded */}
                  <circle cx={hipX} cy={hipY} r="9" fill="#0284C7" />
                  <line x1={hipX} y1={hipY} x2={kneeX} y2={kneeY} stroke={nearLimbStroke} strokeWidth="11" strokeLinecap="round" />
                  <circle cx={kneeX} cy={kneeY} r="7" fill="#D4FF00" />
                  <line x1={kneeX} y1={kneeY} x2={footX} y2={footY} stroke={nearLimbStroke} strokeWidth="10" strokeLinecap="round" />
                  <circle cx={footX} cy={footY} r="7" fill="#D4FF00" />

                  {/* 3D Curving Torso */}
                  <path 
                    d={`M ${hipX} ${hipY} Q ${135 - curl * 0.3} ${185 - curl * 0.7} ${chestX} ${chestY}`} 
                    fill="none" 
                    stroke="url(#char3dTorso)" 
                    strokeWidth="18" 
                    strokeLinecap="round" 
                  />
                  <path 
                    d={`M ${hipX} ${hipY} Q ${135 - curl * 0.3} ${185 - curl * 0.7} ${chestX} ${chestY}`} 
                    fill="none" 
                    stroke={isMuscleMode ? '#D4FF00' : '#475569'} 
                    strokeWidth="12" 
                    strokeLinecap="round" 
                  />
                  <circle cx={chestX} cy={chestY} r="9" fill="#1E293B" />

                  {/* 3D Head */}
                  <circle cx={headX} cy={headY} r="14" fill="url(#char3dHead)" />

                  {/* Hands cradled behind head (No pulling neck) */}
                  <line x1={chestX} y1={chestY} x2={headX - 12} y2={headY - 6} stroke="#00F0FF" strokeWidth="7" strokeLinecap="round" />
                  <circle cx={headX - 12} cy={headY - 6} r="4" fill="#D4FF00" />

                  {isMuscleMode && (
                    <g className="animate-pulse">
                      <text x="60" y="105" fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">RECTUS ABDOMINIS [PEAK FLEXION]</text>
                    </g>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 7. LEG RAISE / LOWER ABS (Connected Kinematics) */}
            {/* ============================================================== */}
            {animType === 'leg-raise' && (() => {
              const angleDeg = cycle * 72;
              const rad = (angleDeg * Math.PI) / 180;
              const hipX = 180;
              const hipY = 198;
              const legLen = 95;
              const legEndX = hipX - Math.cos(rad) * legLen;
              const legEndY = hipY - Math.sin(rad) * legLen;
              const kneeX = hipX - Math.cos(rad) * (legLen * 0.52);
              const kneeY = hipY - Math.sin(rad) * (legLen * 0.52);

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={220} cy={210} rx={115} ry={8} fill="url(#char3dFloorShadow)" />

                  {/* Torso lying flat on back */}
                  <line x1={hipX} y1={hipY} x2="280" y2={hipY} stroke="url(#char3dTorso)" strokeWidth="18" strokeLinecap="round" />
                  <line x1={hipX} y1={hipY} x2="280" y2={hipY} stroke={isMuscleMode ? '#00F0FF' : '#475569'} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={hipX} cy={hipY} r="9" fill="#1E293B" />
                  <circle cx="280" cy={hipY} r="9" fill="#1E293B" />
                  <circle cx="305" cy={hipY - 5} r="14" fill="url(#char3dHead)" />

                  {/* Hands flat beside hips for stability */}
                  <line x1="210" y1="202" x2="255" y2="202" stroke="#00F0FF" strokeWidth="7" strokeLinecap="round" />
                  <circle cx="210" cy="202" r="4" fill="#D4FF00" />

                  {/* 3D LEGS RAISING TOGETHER (Connected Hip -> Knee -> Ankle) */}
                  <line x1={hipX} y1={hipY} x2={kneeX} y2={kneeY} stroke={activeMuscleStroke} strokeWidth="13" strokeLinecap="round" />
                  <circle cx={kneeX} cy={kneeY} r="7" fill="#D4FF00" />
                  <line x1={kneeX} y1={kneeY} x2={legEndX} y2={legEndY} stroke={activeMuscleStroke} strokeWidth="11" strokeLinecap="round" />
                  <circle cx={legEndX} cy={legEndY} r="6" fill="#D4FF00" />

                  {isMuscleMode && (
                    <g className="animate-pulse">
                      <text x="110" y={legEndY - 12} fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">LOWER RECTUS & HIP FLEXOR TENSION</text>
                    </g>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 8. JUMPING JACK / CARDIO BOUNCE (Connected Kinematics) */}
            {/* ============================================================== */}
            {animType === 'jumping-jack' && (() => {
              const legSpread = cycle * 42;
              const armAngle = cycle * 75;
              const bounceY = Math.sin(phase * 2) * 8;
              const torsoTopY = 75 - bounceY;
              const hipY = 145 - bounceY;

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={220} cy={218} rx={35 + legSpread} ry={8} fill="url(#char3dFloorShadow)" />

                  {/* 3D Athletic Torso */}
                  <line x1="220" y1={torsoTopY} x2="220" y2={hipY} stroke="url(#char3dTorso)" strokeWidth="18" strokeLinecap="round" />
                  <line x1="220" y1={torsoTopY} x2="220" y2={hipY} stroke={isMuscleMode ? '#00F0FF' : '#475569'} strokeWidth="12" strokeLinecap="round" />
                  <circle cx="220" cy={torsoTopY} r="9" fill="#1E293B" />
                  <circle cx="220" cy={hipY} r="9" fill="#1E293B" />

                  {/* 3D Head */}
                  <circle cx="220" cy={torsoTopY - 20} r="14" fill="url(#char3dHead)" />

                  {/* Left Leg (Hip -> Knee -> Ankle) */}
                  <line x1="220" y1={hipY} x2={210 - legSpread * 0.5} y2={180 - bounceY * 0.5} stroke={nearLimbStroke} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={210 - legSpread * 0.5} cy={180 - bounceY * 0.5} r="6" fill="#D4FF00" />
                  <line x1={210 - legSpread * 0.5} y1={180 - bounceY * 0.5} x2={200 - legSpread} y2="215" stroke={nearLimbStroke} strokeWidth="10" strokeLinecap="round" />
                  <circle cx={200 - legSpread} cy="215" r="6" fill="#D4FF00" />

                  {/* Right Leg (Hip -> Knee -> Ankle) */}
                  <line x1="220" y1={hipY} x2={230 + legSpread * 0.5} y2={180 - bounceY * 0.5} stroke={nearLimbStroke} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={230 + legSpread * 0.5} cy={180 - bounceY * 0.5} r="6" fill="#D4FF00" />
                  <line x1={230 + legSpread * 0.5} y1={180 - bounceY * 0.5} x2={240 + legSpread} y2="215" stroke={nearLimbStroke} strokeWidth="10" strokeLinecap="round" />
                  <circle cx={240 + legSpread} cy="215" r="6" fill="#D4FF00" />

                  {/* Left Arm Sweeping */}
                  <line x1="220" y1={torsoTopY + 10} x2={190 - legSpread * 0.4} y2={torsoTopY + 30 - armAngle * 0.5} stroke={activeMuscleStroke} strokeWidth="8" strokeLinecap="round" />
                  <circle cx={190 - legSpread * 0.4} cy={torsoTopY + 30 - armAngle * 0.5} r="5" fill="#D4FF00" />
                  <line x1={190 - legSpread * 0.4} y1={torsoTopY + 30 - armAngle * 0.5} x2={160 - legSpread * 0.8} y2={torsoTopY + 45 - armAngle} stroke={activeMuscleStroke} strokeWidth="7" strokeLinecap="round" />
                  <circle cx={160 - legSpread * 0.8} cy={torsoTopY + 45 - armAngle} r="4" fill="#00F0FF" />

                  {/* Right Arm Sweeping */}
                  <line x1="220" y1={torsoTopY + 10} x2={250 + legSpread * 0.4} y2={torsoTopY + 30 - armAngle * 0.5} stroke={activeMuscleStroke} strokeWidth="8" strokeLinecap="round" />
                  <circle cx={250 + legSpread * 0.4} cy={torsoTopY + 30 - armAngle * 0.5} r="5" fill="#D4FF00" />
                  <line x1={250 + legSpread * 0.4} y1={torsoTopY + 30 - armAngle * 0.5} x2={280 + legSpread * 0.8} y2={torsoTopY + 45 - armAngle} stroke={activeMuscleStroke} strokeWidth="7" strokeLinecap="round" />
                  <circle cx={280 + legSpread * 0.8} cy={torsoTopY + 45 - armAngle} r="4" fill="#00F0FF" />

                  {isMuscleMode && (
                    <text x="145" y={110} fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">FULL BODY CARDIOVASCULAR</text>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 9. BURPEE / SMOOTH 4-PHASE PROGRESSION (Zero Teleport Snap!) */}
            {/* ============================================================== */}
            {animType === 'burpee' && (() => {
              // Normalized time 0 to 1
              const t = (phase / (Math.PI * 2)) % 1;
              
              // Keyframe interpolator for smooth non-snapping trajectory
              // Phase 0: Stand (0.0) -> Squat down (0.25) -> Plank pushup (0.50) -> Snap in (0.75) -> Jump (1.0/0.0)
              let hipX = 220, hipY = 135, chestX = 220, chestY = 75, footX = 220, footY = 215, armEndX = 220, armEndY = 35;
              let shadowR = 40;

              if (t < 0.25) {
                // Standing to deep squat
                const p = t / 0.25;
                const ease = (1 - Math.cos(p * Math.PI)) / 2;
                hipX = 220 - ease * 25;
                hipY = 135 + ease * 40;
                chestX = 220 + ease * 15;
                chestY = 75 + ease * 80;
                footX = 205;
                footY = 215;
                armEndX = 220 + ease * 45;
                armEndY = 110 + ease * 95;
                shadowR = 40 + ease * 20;
              } else if (t < 0.50) {
                // Deep squat to pushup plank kickout
                const p = (t - 0.25) / 0.25;
                const ease = (1 - Math.cos(p * Math.PI)) / 2;
                hipX = 195 - ease * 25;
                hipY = 175 - ease * 20;
                chestX = 235 + ease * 45;
                chestY = 155 - ease * 15;
                footX = 205 - ease * 95;
                footY = 215 - ease * 15;
                armEndX = 265 + ease * 15;
                armEndY = 205;
                shadowR = 60 + ease * 40;
              } else if (t < 0.75) {
                // Plank to squat snap-in
                const p = (t - 0.50) / 0.25;
                const ease = (1 - Math.cos(p * Math.PI)) / 2;
                hipX = 170 + ease * 25;
                hipY = 155 + ease * 20;
                chestX = 280 - ease * 45;
                chestY = 140 + ease * 15;
                footX = 110 + ease * 95;
                footY = 200 + ease * 15;
                armEndX = 280 - ease * 15;
                armEndY = 205;
                shadowR = 100 - ease * 40;
              } else {
                // Squat snap-in to explosive overhead jump
                const p = (t - 0.75) / 0.25;
                const jumpSine = Math.sin(p * Math.PI);
                hipX = 195 + (220 - 195) * p;
                hipY = 175 - jumpSine * 65 - p * 40;
                chestX = 235 + (220 - 235) * p;
                chestY = 155 - jumpSine * 75 - p * 80;
                footX = 205 + 15 * p;
                footY = 215 - jumpSine * 35;
                armEndX = 265 - 45 * p;
                armEndY = 205 - jumpSine * 170 - p * 95;
                shadowR = 60 - jumpSine * 35;
              }

              const kneeX = (hipX + footX) / 2 + 10;
              const kneeY = (hipY + footY) / 2;
              const elbowX = (chestX + armEndX) / 2 + 8;
              const elbowY = (chestY + armEndY) / 2;

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={220} cy={218} rx={shadowR} ry={8} fill="url(#char3dFloorShadow)" />

                  {/* 3D TORSO */}
                  <line x1={hipX} y1={hipY} x2={chestX} y2={chestY} stroke="url(#char3dTorso)" strokeWidth="18" strokeLinecap="round" />
                  <line x1={hipX} y1={hipY} x2={chestX} y2={chestY} stroke={isMuscleMode ? '#00F0FF' : '#475569'} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={hipX} cy={hipY} r="8" fill="#1E293B" />
                  <circle cx={chestX} cy={chestY} r="8" fill="#1E293B" />

                  {/* 3D HEAD */}
                  <circle cx={chestX + 6} cy={chestY - 18} r="13" fill="url(#char3dHead)" />

                  {/* CONNECTED LEGS */}
                  <line x1={hipX} y1={hipY} x2={kneeX} y2={kneeY} stroke={activeMuscleStroke} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={kneeX} cy={kneeY} r="6" fill="#D4FF00" />
                  <line x1={kneeX} y1={kneeY} x2={footX} y2={footY} stroke={nearLimbStroke} strokeWidth="10" strokeLinecap="round" />
                  <circle cx={footX} cy={footY} r="6" fill="#D4FF00" />

                  {/* CONNECTED ARMS */}
                  <line x1={chestX} y1={chestY} x2={elbowX} y2={elbowY} stroke="#00F0FF" strokeWidth="9" strokeLinecap="round" />
                  <circle cx={elbowX} cy={elbowY} r="5" fill="#D4FF00" />
                  <line x1={elbowX} y1={elbowY} x2={armEndX} y2={armEndY} stroke="#00F0FF" strokeWidth="8" strokeLinecap="round" />
                  <circle cx={armEndX} cy={armEndY} r="5" fill="#00F0FF" />

                  {isMuscleMode && (
                    <text x="140" y={40} fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">EXPLOSIVE ANAEROBIC POWER</text>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 10. HIGH KNEES / RAPID DRIVE (Connected Kinematics) */}
            {/* ============================================================== */}
            {animType === 'high-knees' && (() => {
              const drive = Math.sin(phase);
              const bounce = Math.abs(drive) * 7;
              const hipY = 145 - bounce;
              const chestY = 80 - bounce;
              const headY = 60 - bounce;

              // Alternating thighs and shins
              const leftKneeY = 145 - Math.max(0, drive) * 45;
              const leftKneeX = 195 - Math.max(0, drive) * 15;
              const leftAnkleY = leftKneeY + 45;
              const leftAnkleX = leftKneeX;

              const rightKneeY = 145 - Math.max(0, -drive) * 45;
              const rightKneeX = 245 + Math.max(0, -drive) * 15;
              const rightAnkleY = rightKneeY + 45;
              const rightAnkleX = rightKneeX;

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={220} cy={218} rx={45} ry={8} fill="url(#char3dFloorShadow)" />

                  {/* 3D Upright Torso */}
                  <line x1="220" y1={chestY} x2="220" y2={hipY} stroke="url(#char3dTorso)" strokeWidth="18" strokeLinecap="round" />
                  <line x1="220" y1={chestY} x2="220" y2={hipY} stroke={isMuscleMode ? '#00F0FF' : '#475569'} strokeWidth="12" strokeLinecap="round" />
                  <circle cx="220" cy={chestY} r="9" fill="#1E293B" />
                  <circle cx="220" cy={hipY} r="9" fill="#1E293B" />
                  <circle cx="220" cy={headY} r="14" fill="url(#char3dHead)" />

                  {/* LEFT LEG (Rigid Hip -> Knee -> Ankle) */}
                  <line x1="220" y1={hipY} x2={leftKneeX} y2={leftKneeY} stroke={activeMuscleStroke} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={leftKneeX} cy={leftKneeY} r="7" fill="#D4FF00" />
                  <line x1={leftKneeX} y1={leftKneeY} x2={leftAnkleX} y2={leftAnkleY} stroke={nearLimbStroke} strokeWidth="10" strokeLinecap="round" />
                  <circle cx={leftAnkleX} cy={leftAnkleY} r="6" fill="#D4FF00" />

                  {/* RIGHT LEG (Rigid Hip -> Knee -> Ankle) */}
                  <line x1="220" y1={hipY} x2={rightKneeX} y2={rightKneeY} stroke={farLimbStroke} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={rightKneeX} cy={rightKneeY} r="7" fill="#0284C7" />
                  <line x1={rightKneeX} y1={rightKneeY} x2={rightAnkleX} y2={rightAnkleY} stroke={farLimbStroke} strokeWidth="10" strokeLinecap="round" />
                  <circle cx={rightAnkleX} cy={rightAnkleY} r="6" fill="#0284C7" />

                  {/* OPPOSING RUNNER ARMS (Shoulder -> Elbow -> Hand) */}
                  <line x1="220" y1={chestY + 8} x2="185" y2={chestY + 25 + drive * 20} stroke="#00F0FF" strokeWidth="8" strokeLinecap="round" />
                  <circle cx="185" cy={chestY + 25 + drive * 20} r="5" fill="#D4FF00" />
                  <line x1="185" y1={chestY + 25 + drive * 20} x2="175" y2={chestY + 8 + drive * 25} stroke="#00F0FF" strokeWidth="7" strokeLinecap="round" />

                  <line x1="220" y1={chestY + 8} x2="255" y2={chestY + 25 - drive * 20} stroke="#00F0FF" strokeWidth="8" strokeLinecap="round" />
                  <circle cx="255" cy={chestY + 25 - drive * 20} r="5" fill="#D4FF00" />
                  <line x1="255" y1={chestY + 25 - drive * 20} x2="265" y2={chestY + 8 - drive * 25} stroke="#00F0FF" strokeWidth="7" strokeLinecap="round" />

                  {isMuscleMode && (
                    <text x="140" y={110} fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">HIP FLEXORS & NEUROMUSCULAR CADENCE</text>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 11. MOUNTAIN CLIMBER / CORE SPRINT (Connected Kinematics) */}
            {/* ============================================================== */}
            {animType === 'mountain-climber' && (() => {
              const drive = Math.sin(phase);
              const leftKneeX = 180 + Math.max(0, drive) * 55;
              const leftKneeY = 150 + Math.max(0, drive) * 15;
              const rightKneeX = 180 + Math.max(0, -drive) * 55;
              const rightKneeY = 150 + Math.max(0, -drive) * 15;

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={210} cy={210} rx={110} ry={8} fill="url(#char3dFloorShadow)" />

                  {/* Arms Planted Rigidly */}
                  <line x1="285" y1="140" x2="285" y2="200" stroke="#00F0FF" strokeWidth="9" strokeLinecap="round" />
                  <circle cx="285" cy="200" r="6" fill="#D4FF00" />

                  {/* 3D Torso */}
                  <line x1="180" y1="150" x2="285" y2="140" stroke="url(#char3dTorso)" strokeWidth="18" strokeLinecap="round" />
                  <line x1="180" y1="150" x2="285" y2="140" stroke={isMuscleMode ? '#00F0FF' : '#475569'} strokeWidth="12" strokeLinecap="round" />
                  <circle cx="180" cy="150" r="8" fill="#1E293B" />
                  <circle cx="285" cy="140" r="8" fill="#1E293B" />
                  <circle cx="310" cy="128" r="14" fill="url(#char3dHead)" />

                  {/* RIGHT BACK LEG */}
                  <line x1="180" y1="150" x2={rightKneeX} y2={rightKneeY} stroke={farLimbStroke} strokeWidth="11" strokeLinecap="round" />
                  <circle cx={rightKneeX} cy={rightKneeY} r="6" fill="#0284C7" />
                  <line x1={rightKneeX} y1={rightKneeY} x2="105" y2="200" stroke={farLimbStroke} strokeWidth="9" strokeLinecap="round" />
                  <circle cx="105" cy="200" r="5" fill="#0284C7" />

                  {/* LEFT DRIVING FRONT KNEE */}
                  <line x1="180" y1="150" x2={leftKneeX} y2={leftKneeY} stroke={activeMuscleStroke} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={leftKneeX} cy={leftKneeY} r="7" fill="#D4FF00" />
                  <line x1={leftKneeX} y1={leftKneeY} x2={leftKneeX - 35} y2="195" stroke={nearLimbStroke} strokeWidth="10" strokeLinecap="round" />
                  <circle cx={leftKneeX - 35} cy="195" r="6" fill="#D4FF00" />

                  {isMuscleMode && (
                    <text x="150" y={115} fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">DYNAMIC TRANSVERSE CORE DRIVE</text>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 12. PULLUP / LATS & UPPER BACK (Connected Kinematics) */}
            {/* ============================================================== */}
            {animType === 'pullup' && (() => {
              const pullY = cycle * 45;
              const headY = 95 - pullY;
              const barY = 40;
              const shoulderLeftX = 185;
              const shoulderRightX = 255;
              const elbowLeftX = 165 - pullY * 0.35;
              const elbowLeftY = headY + 30;
              const elbowRightX = 275 + pullY * 0.35;
              const elbowRightY = headY + 30;

              return (
                <g filter="url(#forgeGlow)">
                  {/* Metallic Overhead Pullup Bar */}
                  <line x1="90" y1={barY} x2="350" y2={barY} stroke="#475569" strokeWidth="8" strokeLinecap="round" />
                  <line x1="90" y1={barY} x2="350" y2={barY} stroke="#00F0FF" strokeWidth="3" strokeDasharray="12 4" />

                  {/* Hands Gripped over Bar */}
                  <circle cx={shoulderLeftX} cy={barY} r="7" fill="#D4FF00" />
                  <circle cx={shoulderRightX} cy={barY} r="7" fill="#D4FF00" />

                  {/* 3D Articulated Arms (Bar -> Elbow -> Shoulder) */}
                  <line x1={shoulderLeftX} y1={barY} x2={elbowLeftX} y2={elbowLeftY} stroke={activeMuscleStroke} strokeWidth="10" strokeLinecap="round" />
                  <circle cx={elbowLeftX} cy={elbowLeftY} r="6" fill="#D4FF00" />
                  <line x1={elbowLeftX} y1={elbowLeftY} x2="210" y2={headY + 22} stroke={activeMuscleStroke} strokeWidth="10" strokeLinecap="round" />

                  <line x1={shoulderRightX} y1={barY} x2={elbowRightX} y2={elbowRightY} stroke={activeMuscleStroke} strokeWidth="10" strokeLinecap="round" />
                  <circle cx={elbowRightX} cy={elbowRightY} r="6" fill="#D4FF00" />
                  <line x1={elbowRightX} y1={elbowRightY} x2="230" y2={headY + 22} stroke={activeMuscleStroke} strokeWidth="10" strokeLinecap="round" />

                  {/* 3D Head */}
                  <circle cx="220" cy={headY} r="14" fill="url(#char3dHead)" />

                  {/* 3D V-Taper Torso & Lats */}
                  <line x1="220" y1={headY + 18} x2="220" y2={headY + 95} stroke="url(#char3dTorso)" strokeWidth="20" strokeLinecap="round" />
                  <line x1="220" y1={headY + 18} x2="220" y2={headY + 95} stroke={isMuscleMode ? '#00F0FF' : '#475569'} strokeWidth="14" strokeLinecap="round" />
                  <circle cx="220" cy={headY + 95} r="9" fill="#1E293B" />

                  {/* Lower Legs (Hip -> Knee -> Ankle crossed behind) */}
                  <line x1="220" y1={headY + 95} x2="215" y2={headY + 130} stroke={nearLimbStroke} strokeWidth="11" strokeLinecap="round" />
                  <circle cx="215" cy={headY + 130} r="6" fill="#D4FF00" />
                  <line x1="215" y1={headY + 130} x2="210" y2={headY + 160} stroke={nearLimbStroke} strokeWidth="9" strokeLinecap="round" />
                  <circle cx="210" cy={headY + 160} r="5" fill="#D4FF00" />

                  {isMuscleMode && (
                    <text x="135" y={headY + 45} fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">LATISSIMUS DORSI & BICEPS PEAK</text>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 13. PIKE PUSHUP / SHOULDER ARMOR (Connected Kinematics) */}
            {/* ============================================================== */}
            {animType === 'pike-pushup' && (() => {
              const dip = cycle * 32;
              const hipX = 185;
              const hipY = 95;
              const handX = 275;
              const handY = 205;
              const footX = 120;
              const footY = 205;
              const shoulderX = 245 + dip * 0.25;
              const shoulderY = 150 + dip * 0.7;
              const elbowX = 285 + dip * 0.35;
              const elbowY = 165 + dip * 0.45;
              const headX = shoulderX + 18;
              const headY = shoulderY - 8;

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={200} cy={215} rx={95} ry={8} fill="url(#char3dFloorShadow)" />

                  {/* Legs from Feet to High Pike Hips */}
                  <circle cx={footX} cy={footY} r="7" fill="#0284C7" />
                  <line x1={footX} y1={footY} x2="155" y2="150" stroke={farLimbStroke} strokeWidth="11" strokeLinecap="round" />
                  <circle cx="155" cy="150" r="6" fill="#0284C7" />
                  <line x1="155" y1="150" x2={hipX} y2={hipY} stroke={nearLimbStroke} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={hipX} cy={hipY} r="9" fill="#1E293B" />

                  {/* Inverted Torso (Hips down to Shoulders) */}
                  <line x1={hipX} y1={hipY} x2={shoulderX} y2={shoulderY} stroke="url(#char3dTorso)" strokeWidth="18" strokeLinecap="round" />
                  <line x1={hipX} y1={hipY} x2={shoulderX} y2={shoulderY} stroke={isMuscleMode ? '#00F0FF' : '#475569'} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={shoulderX} cy={shoulderY} r="9" fill="#1E293B" />

                  {/* Head angling toward floor */}
                  <circle cx={headX} cy={headY} r="14" fill="url(#char3dHead)" />

                  {/* 3D Arms (Shoulder -> Elbow -> Planted Floor Hands) */}
                  <line x1={shoulderX} y1={shoulderY} x2={elbowX} y2={elbowY} stroke={activeMuscleStroke} strokeWidth="10" strokeLinecap="round" />
                  <circle cx={elbowX} cy={elbowY} r="6" fill="#D4FF00" />
                  <line x1={elbowX} y1={elbowY} x2={handX} y2={handY} stroke={nearLimbStroke} strokeWidth="9" strokeLinecap="round" />
                  <circle cx={handX} cy={handY} r="6" fill="#00F0FF" />

                  {isMuscleMode && (
                    <g className="animate-pulse">
                      <text x="210" y="80" fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">ANTERIOR DELTOID & TRICEPS</text>
                      <text x="75" y="140" fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">HAMSTRING EXTENSION</text>
                    </g>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 14. JUMP SQUAT / EXPLOSIVE VERTICAL (Connected Kinematics) */}
            {/* ============================================================== */}
            {animType === 'jump-squat' && (() => {
              // 0 to 0.5: deep squat descent, 0.5 to 1.0: explosive jump into air
              const isJumping = cycle > 0.5;
              const jumpP = isJumping ? (cycle - 0.5) * 2 : 0;
              const squatP = !isJumping ? cycle * 2 : 0;

              const hipY = 125 + squatP * 40 - jumpP * 35;
              const kneeX = 228 + squatP * 8;
              const kneeY = 175 - squatP * 5 - jumpP * 35;
              const ankleY = 218 - jumpP * 35;
              const chestY = hipY - 50;
              const headY = chestY - 18;
              const armY = chestY - (isJumping ? 30 : 0);
              const shadowScale = isJumping ? 25 : 55;

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={205} cy={220} rx={shadowScale} ry={8} fill="url(#char3dFloorShadow)" />

                  {/* 3D Torso */}
                  <line x1="180" y1={hipY} x2="202" y2={chestY} stroke="url(#char3dTorso)" strokeWidth="18" strokeLinecap="round" />
                  <line x1="180" y1={hipY} x2="202" y2={chestY} stroke={isMuscleMode ? '#00F0FF' : '#475569'} strokeWidth="12" strokeLinecap="round" />
                  <circle cx="180" cy={hipY} r="8" fill="#1E293B" />
                  <circle cx="202" cy={chestY} r="8" fill="#1E293B" />
                  <circle cx="208" cy={headY} r="14" fill="url(#char3dHead)" />

                  {/* ARMS (Reaching high in jump) */}
                  <line x1="202" y1={chestY + 5} x2="245" y2={armY} stroke="#00F0FF" strokeWidth="8" strokeLinecap="round" />
                  <circle cx="245" cy={armY} r="5" fill="#D4FF00" />

                  {/* LEGS (Connected Thigh & Shin) */}
                  <line x1="180" y1={hipY} x2={kneeX} y2={kneeY} stroke={activeMuscleStroke} strokeWidth="13" strokeLinecap="round" />
                  <circle cx={kneeX} cy={kneeY} r="7" fill="#D4FF00" />
                  <line x1={kneeX} y1={kneeY} x2="215" y2={ankleY} stroke={nearLimbStroke} strokeWidth="10" strokeLinecap="round" />
                  <circle cx="215" cy={ankleY} r="6" fill="#D4FF00" />

                  {isMuscleMode && (
                    <text x="135" y="45" fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">FAST-TWITCH PLYOMETRIC MOTOR UNITS</text>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 15. CALF RAISE / SOLEUS & GASTROC (Connected Kinematics) */}
            {/* ============================================================== */}
            {animType === 'calf-raise' && (() => {
              const rise = cycle * 24;
              const heelY = 215 - rise;
              const kneeY = 150 - rise;
              const hipY = 105 - rise;
              const chestY = 65 - rise;
              const headY = 48 - rise;

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={220} cy={220} rx={45} ry={8} fill="url(#char3dFloorShadow)" />

                  {/* Ball of foot contact */}
                  <ellipse cx="230" cy="216" rx="10" ry="4" fill="#00F0FF" />

                  {/* Upright Torso */}
                  <line x1="215" y1={chestY} x2="215" y2={hipY} stroke="url(#char3dTorso)" strokeWidth="18" strokeLinecap="round" />
                  <line x1="215" y1={chestY} x2="215" y2={hipY} stroke={isMuscleMode ? '#00F0FF' : '#475569'} strokeWidth="12" strokeLinecap="round" />
                  <circle cx="215" cy={chestY} r="9" fill="#1E293B" />
                  <circle cx="215" cy={hipY} r="9" fill="#1E293B" />
                  <circle cx="215" cy={headY} r="14" fill="url(#char3dHead)" />

                  {/* Thigh (Hip -> Knee) */}
                  <line x1="215" y1={hipY} x2="218" y2={kneeY} stroke={nearLimbStroke} strokeWidth="12" strokeLinecap="round" />
                  <circle cx="218" cy={kneeY} r="7" fill="#D4FF00" />

                  {/* Bulging Gastrocnemius / Shin (Knee -> Ankle -> Ball of Foot) */}
                  <line x1="218" y1={kneeY} x2="225" y2={heelY} stroke={activeMuscleStroke} strokeWidth={11 + cycle * 3} strokeLinecap="round" />
                  <circle cx="225" cy={heelY} r={6 + cycle * 2} fill="#D4FF00" />
                  <line x1="225" y1={heelY} x2="232" y2="216" stroke="#00F0FF" strokeWidth="8" strokeLinecap="round" />

                  {isMuscleMode && (
                    <g className="animate-pulse">
                      <text x="240" y={heelY - 10} fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">GASTROCNEMIUS & SOLEUS PEAK</text>
                    </g>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 16. WALL SIT / ISOMETRIC QUAD BRACE (Connected Kinematics) */}
            {/* ============================================================== */}
            {animType === 'wall-sit' && (() => {
              const microPulse = Math.sin(phase * 3) * 2;
              const wallX = 145;
              const hipX = 152;
              const hipY = 148;
              const kneeX = 225;
              const kneeY = 148;
              const ankleX = 225;
              const ankleY = 215;
              const chestY = 95;
              const headY = 75;

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={200} cy={220} rx={65} ry={8} fill="url(#char3dFloorShadow)" />

                  {/* Studio Wall Grid */}
                  <line x1={wallX} y1="35" x2={wallX} y2="225" stroke="#334155" strokeWidth="4" />
                  <line x1={wallX} y1="75" x2={wallX + 15} y2="75" stroke="#1E293B" strokeWidth="1" />
                  <line x1={wallX} y1="120" x2={wallX + 15} y2="120" stroke="#1E293B" strokeWidth="1" />

                  {/* Back Flat Against Wall */}
                  <line x1={hipX} y1={hipY} x2={hipX} y2={chestY} stroke="url(#char3dTorso)" strokeWidth="18" strokeLinecap="round" />
                  <line x1={hipX} y1={hipY} x2={hipX} y2={chestY} stroke={isMuscleMode ? '#00F0FF' : '#475569'} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={hipX} cy={hipY} r="8" fill="#1E293B" />
                  <circle cx={hipX} cy={chestY} r="8" fill="#1E293B" />
                  <circle cx={hipX + 5} cy={headY} r="14" fill="url(#char3dHead)" />

                  {/* Horizontal Thigh (90° Knee Flexion) */}
                  <line x1={hipX} y1={hipY} x2={kneeX} y2={kneeY} stroke={activeMuscleStroke} strokeWidth="13" strokeLinecap="round" />
                  <circle cx={kneeX} cy={kneeY} r="8" fill="#D4FF00" />

                  {/* Vertical Shin to Floor (90° Stacked) */}
                  <line x1={kneeX} y1={kneeY} x2={ankleX} y2={ankleY} stroke={nearLimbStroke} strokeWidth="10" strokeLinecap="round" />
                  <circle cx={ankleX} cy={ankleY} r="6" fill="#D4FF00" />
                  <ellipse cx={ankleX + 5} cy={ankleY} rx="9" ry="4" fill="#D4FF00" />

                  {/* Arms resting on thighs */}
                  <line x1={hipX} y1={chestY + 10} x2="190" y2="140" stroke="#00F0FF" strokeWidth="7" strokeLinecap="round" />

                  {/* Quad heatwave pulse */}
                  <circle cx="185" cy={kneeY} r={14 + microPulse * 2} fill="none" stroke="#D4FF00" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.85" />

                  {isMuscleMode && (
                    <text x="140" y="130" fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">ISOMETRIC QUADRICEPS BURN (90°)</text>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 17. SIDE PLANK / LATERAL CORE (Connected Kinematics) */}
            {/* ============================================================== */}
            {animType === 'side-plank' && (() => {
              const microPulse = Math.sin(phase * 2) * 2;
              const elbowX = 265;
              const elbowY = 195;
              const shoulderX = 265;
              const shoulderY = 145 + microPulse;
              const hipX = 185;
              const hipY = 165 + microPulse;
              const footX = 105;
              const footY = 195;

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={200} cy={210} rx={105} ry={8} fill="url(#char3dFloorShadow)" />

                  {/* Grounded Elbow Support */}
                  <line x1={shoulderX} y1={shoulderY} x2={elbowX} y2={elbowY} stroke="#00F0FF" strokeWidth="9" strokeLinecap="round" />
                  <circle cx={elbowX} cy={elbowY} r="6" fill="#D4FF00" />
                  <line x1={elbowX} y1={elbowY} x2={elbowX + 25} y2={elbowY} stroke="#00F0FF" strokeWidth="7" strokeLinecap="round" />

                  {/* Rigid Diagonal Torso Beam */}
                  <line x1={footX} y1={footY} x2={hipX} y2={hipY} stroke={nearLimbStroke} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={hipX} cy={hipY} r="8" fill="#1E293B" />
                  <line x1={hipX} y1={hipY} x2={shoulderX} y2={shoulderY} stroke="url(#char3dTorso)" strokeWidth="18" strokeLinecap="round" />
                  <line x1={hipX} y1={hipY} x2={shoulderX} y2={shoulderY} stroke={isMuscleMode ? '#D4FF00' : '#475569'} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={shoulderX} cy={shoulderY} r="8" fill="#1E293B" />
                  <circle cx={footX} cy={footY} r="7" fill="#0284C7" />

                  {/* 3D Head */}
                  <circle cx={shoulderX + 22} cy={shoulderY - 10} r="14" fill="url(#char3dHead)" />

                  {/* Top Arm Reaching to Sky */}
                  <line x1={shoulderX} y1={shoulderY} x2={shoulderX} y2={shoulderY - 55} stroke="#00F0FF" strokeWidth="8" strokeLinecap="round" />
                  <circle cx={shoulderX} cy={shoulderY - 55} r="5" fill="#D4FF00" />

                  {isMuscleMode && (
                    <text x="130" y={hipY - 15} fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">INTERNAL & EXTERNAL OBLIQUES</text>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 18. BICYCLE CRUNCH / OBLIQUE ROTATION (Connected Kinematics) */}
            {/* ============================================================== */}
            {animType === 'bicycle-crunch' && (() => {
              const rot = Math.sin(phase);
              const hipX = 180;
              const hipY = 195;
              const chestX = 120 - Math.abs(rot) * 8;
              const chestY = 160 - Math.abs(rot) * 12;
              const headX = chestX - 18;
              const headY = chestY - 12;

              // Left leg extending, right leg tucking
              const leftKneeX = 135 - rot * 40;
              const leftKneeY = 165 - rot * 25;
              const leftFootX = leftKneeX - 55;
              const leftFootY = leftKneeY + 15;

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={200} cy={212} rx={110} ry={8} fill="url(#char3dFloorShadow)" />

                  {/* Torso Curling Upward with Oblique Twist */}
                  <line x1={hipX} y1={hipY} x2={chestX} y2={chestY} stroke="url(#char3dTorso)" strokeWidth="18" strokeLinecap="round" />
                  <line x1={hipX} y1={hipY} x2={chestX} y2={chestY} stroke={isMuscleMode ? '#D4FF00' : '#475569'} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={hipX} cy={hipY} r="8" fill="#1E293B" />
                  <circle cx={chestX} cy={chestY} r="8" fill="#1E293B" />
                  <circle cx={headX} cy={headY} r="14" fill="url(#char3dHead)" />

                  {/* Hands cradled, opposite elbow rotating to knee */}
                  <line x1={chestX} y1={chestY} x2={chestX + 25 * rot} y2={chestY + 15} stroke="#00F0FF" strokeWidth="8" strokeLinecap="round" />
                  <circle cx={chestX + 25 * rot} cy={chestY + 15} r="5" fill="#D4FF00" />

                  {/* Articulated Bicycling Legs */}
                  <line x1={hipX} y1={hipY} x2={leftKneeX} y2={leftKneeY} stroke={activeMuscleStroke} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={leftKneeX} cy={leftKneeY} r="6" fill="#D4FF00" />
                  <line x1={leftKneeX} y1={leftKneeY} x2={leftFootX} y2={leftFootY} stroke={nearLimbStroke} strokeWidth="10" strokeLinecap="round" />
                  <circle cx={leftFootX} cy={leftFootY} r="5" fill="#D4FF00" />

                  {isMuscleMode && (
                    <text x="80" y="115" fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">ROTATIONAL CORE & OBLIQUE CROSS-TENSION</text>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 19. BIRD-DOG / POSTURAL CROSS-BODY STABILIZATION */}
            {/* ============================================================== */}
            {animType === 'bird-dog' && (() => {
              const reach = cycle * 35;
              const hipX = 160;
              const hipY = 155;
              const shoulderX = 265;
              const shoulderY = 155;

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={210} cy={210} rx={110} ry={8} fill="url(#char3dFloorShadow)" />

                  {/* Grounded Supporting Knee & Arm */}
                  <line x1={hipX} y1={hipY} x2={hipX - 15} y2="200" stroke={farLimbStroke} strokeWidth="10" strokeLinecap="round" />
                  <circle cx={hipX - 15} cy="200" r="6" fill="#0284C7" />
                  <line x1={shoulderX} y1={shoulderY} x2={shoulderX} y2="200" stroke={farLimbStroke} strokeWidth="9" strokeLinecap="round" />
                  <circle cx={shoulderX} cy="200" r="6" fill="#0284C7" />

                  {/* Neutral Spine Beam */}
                  <line x1={hipX} y1={hipY} x2={shoulderX} y2={shoulderY} stroke="url(#char3dTorso)" strokeWidth="18" strokeLinecap="round" />
                  <line x1={hipX} y1={hipY} x2={shoulderX} y2={shoulderY} stroke={isMuscleMode ? '#00F0FF' : '#475569'} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={hipX} cy={hipY} r="8" fill="#1E293B" />
                  <circle cx={shoulderX} cy={shoulderY} r="8" fill="#1E293B" />
                  <circle cx={shoulderX + 22} cy={shoulderY - 10} r="14" fill="url(#char3dHead)" />

                  {/* Extended Opposite Leg Straight Back */}
                  <line x1={hipX} y1={hipY} x2={hipX - 45 - reach} y2={hipY - reach * 0.2} stroke={activeMuscleStroke} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={hipX - 45 - reach} cy={hipY - reach * 0.2} r="6" fill="#D4FF00" />

                  {/* Extended Opposite Arm Straight Forward */}
                  <line x1={shoulderX} y1={shoulderY} x2={shoulderX + 45 + reach} y2={shoulderY - reach * 0.2} stroke="#00F0FF" strokeWidth="8" strokeLinecap="round" />
                  <circle cx={shoulderX + 45 + reach} cy={shoulderY - reach * 0.2} r="5" fill="#D4FF00" />

                  {isMuscleMode && (
                    <text x="120" y="115" fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">POSTERIOR CHAIN MULTIFIDUS & GLUTE STABILITY</text>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 20. DEAD BUG / LUMBAR INTEGRITY */}
            {/* ============================================================== */}
            {animType === 'dead-bug' && (() => {
              const reach = cycle * 45;
              const hipX = 185;
              const hipY = 195;
              const shoulderX = 265;
              const shoulderY = 195;

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={220} cy={210} rx={115} ry={8} fill="url(#char3dFloorShadow)" />

                  {/* Flat Spine Pinned to Mat */}
                  <line x1={hipX} y1={hipY} x2={shoulderX} y2={shoulderY} stroke="url(#char3dTorso)" strokeWidth="18" strokeLinecap="round" />
                  <line x1={hipX} y1={hipY} x2={shoulderX} y2={shoulderY} stroke={isMuscleMode ? '#00F0FF' : '#475569'} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={hipX} cy={hipY} r="8" fill="#1E293B" />
                  <circle cx={shoulderX} cy={shoulderY} r="8" fill="#1E293B" />
                  <circle cx={shoulderX + 25} cy={shoulderY - 5} r="14" fill="url(#char3dHead)" />

                  {/* Stationary Right Leg (90/90) */}
                  <line x1={hipX} y1={hipY} x2={hipX} y2="140" stroke={farLimbStroke} strokeWidth="11" strokeLinecap="round" />
                  <line x1={hipX} y1="140" x2={hipX - 40} y2="140" stroke={farLimbStroke} strokeWidth="9" strokeLinecap="round" />

                  {/* Extending Left Leg Downward */}
                  <line x1={hipX} y1={hipY} x2={hipX - 35 - reach * 0.8} y2={hipY - 40 + reach * 0.6} stroke={activeMuscleStroke} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={hipX - 35 - reach * 0.8} cy={hipY - 40 + reach * 0.6} r="6" fill="#D4FF00" />

                  {/* Extending Opposite Arm Overhead */}
                  <line x1={shoulderX} y1={shoulderY} x2={shoulderX + 15 + reach * 0.7} y2={shoulderY - 40 + reach * 0.6} stroke="#00F0FF" strokeWidth="8" strokeLinecap="round" />
                  <circle cx={shoulderX + 15 + reach * 0.7} cy={shoulderY - 40 + reach * 0.6} r="5" fill="#D4FF00" />

                  {isMuscleMode && (
                    <text x="120" y="115" fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">DEEP TRANSVERSE BRACE (NO ARCHING)</text>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 21. CHILD'S POSE / RESTORATIVE DECOMPRESSION */}
            {/* ============================================================== */}
            {animType === 'child-pose' && (() => {
              const breathe = Math.sin(phase) * 3;
              const heelX = 130;
              const heelY = 195;
              const hipX = 150;
              const hipY = 185;
              const chestX = 240;
              const chestY = 185 + breathe;
              const handX = 310;
              const handY = 195;

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={220} cy={210} rx={115} ry={8} fill="url(#char3dFloorShadow)" />

                  {/* Folded Lower Legs on Ground */}
                  <line x1={heelX} y1={heelY} x2={hipX + 35} y2={heelY} stroke={farLimbStroke} strokeWidth="12" strokeLinecap="round" />
                  <line x1={hipX + 35} y1={heelY} x2={hipX} y2={hipY} stroke={nearLimbStroke} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={hipX} cy={hipY} r="8" fill="#1E293B" />

                  {/* Lengthening Torso toward Floor */}
                  <line x1={hipX} y1={hipY} x2={chestX} y2={chestY} stroke="url(#char3dTorso)" strokeWidth="16" strokeLinecap="round" />
                  <line x1={hipX} y1={hipY} x2={chestX} y2={chestY} stroke={isMuscleMode ? '#00F0FF' : '#475569'} strokeWidth="11" strokeLinecap="round" />
                  <circle cx={chestX} cy={chestY} r="8" fill="#1E293B" />

                  {/* Head resting peacefully */}
                  <circle cx={chestX + 16} cy={chestY + 4} r="13" fill="url(#char3dHead)" />

                  {/* Arms Reaching Flat Along Ground */}
                  <line x1={chestX} y1={chestY} x2={handX} y2={handY} stroke="#00F0FF" strokeWidth="8" strokeLinecap="round" />
                  <circle cx={handX} cy={handY} r="5" fill="#D4FF00" />

                  {isMuscleMode && (
                    <text x="140" y="145" fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">LUMBAR & LATISSIMUS RELAXATION</text>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 22. BUTTERFLY STRETCH / ADDUCTOR MOBILITY */}
            {/* ============================================================== */}
            {animType === 'butterfly-stretch' && (() => {
              const gentleFlutter = Math.sin(phase * 2) * 6;
              const hipX = 220;
              const hipY = 185;
              const chestX = 220;
              const chestY = 120 + cycle * 10;
              const feetX = 220;
              const feetY = 200;

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={220} cy={215} rx={85} ry={8} fill="url(#char3dFloorShadow)" />

                  {/* Seated Upright Torso */}
                  <line x1={hipX} y1={hipY} x2={chestX} y2={chestY} stroke="url(#char3dTorso)" strokeWidth="18" strokeLinecap="round" />
                  <line x1={hipX} y1={hipY} x2={chestX} y2={chestY} stroke={isMuscleMode ? '#00F0FF' : '#475569'} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={hipX} cy={hipY} r="9" fill="#1E293B" />
                  <circle cx={chestX} cy={chestY} r="9" fill="#1E293B" />
                  <circle cx={chestX} cy={chestY - 18} r="14" fill="url(#char3dHead)" />

                  {/* Left Knee Wing Opening */}
                  <line x1={hipX} y1={hipY} x2={165} y2={185 + gentleFlutter} stroke={activeMuscleStroke} strokeWidth="11" strokeLinecap="round" />
                  <circle cx={165} cy={185 + gentleFlutter} r="6" fill="#D4FF00" />
                  <line x1={165} y1={185 + gentleFlutter} x2={feetX} y2={feetY} stroke={nearLimbStroke} strokeWidth="9" strokeLinecap="round" />

                  {/* Right Knee Wing Opening */}
                  <line x1={hipX} y1={hipY} x2={275} y2={185 + gentleFlutter} stroke={activeMuscleStroke} strokeWidth="11" strokeLinecap="round" />
                  <circle cx={275} cy={185 + gentleFlutter} r="6" fill="#D4FF00" />
                  <line x1={275} y1={185 + gentleFlutter} x2={feetX} y2={feetY} stroke={nearLimbStroke} strokeWidth="9" strokeLinecap="round" />

                  {/* Soles of Feet Joined */}
                  <circle cx={feetX} cy={feetY} r="8" fill="#00F0FF" />

                  {/* Hands holding feet */}
                  <line x1={chestX} y1={chestY + 15} x2={feetX} y2={feetY} stroke="#00F0FF" strokeWidth="7" strokeLinecap="round" />

                  {isMuscleMode && (
                    <text x="140" y="95" fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">HIP ADDUCTOR & GROIN OPENER</text>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 23. SKATER JUMP / LATERAL PLYOMETRICS */}
            {/* ============================================================== */}
            {animType === 'skater-jump' && (() => {
              const lateral = Math.sin(phase);
              const hipX = 220 + lateral * 45;
              const hipY = 145 - Math.abs(lateral) * 15;
              const chestX = hipX + lateral * 12;
              const chestY = hipY - 50;

              // Planted bounding leg
              const plantFootX = hipX + (lateral > 0 ? 15 : -15);
              const plantFootY = 215;

              // Trailing curtsy sweep leg
              const sweepFootX = hipX - lateral * 45;
              const sweepFootY = 210;

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={plantFootX} cy={218} rx={45} ry={8} fill="url(#char3dFloorShadow)" />

                  {/* 3D Torso Angling with Stride */}
                  <line x1={hipX} y1={hipY} x2={chestX} y2={chestY} stroke="url(#char3dTorso)" strokeWidth="18" strokeLinecap="round" />
                  <line x1={hipX} y1={hipY} x2={chestX} y2={chestY} stroke={isMuscleMode ? '#00F0FF' : '#475569'} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={hipX} cy={hipY} r="8" fill="#1E293B" />
                  <circle cx={chestX} cy={chestY} r="8" fill="#1E293B" />
                  <circle cx={chestX} cy={chestY - 18} r="14" fill="url(#char3dHead)" />

                  {/* Bounding Primary Leg */}
                  <line x1={hipX} y1={hipY} x2={(hipX + plantFootX) / 2 + 10} y2="180" stroke={activeMuscleStroke} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={(hipX + plantFootX) / 2 + 10} cy="180" r="6" fill="#D4FF00" />
                  <line x1={(hipX + plantFootX) / 2 + 10} y1="180" x2={plantFootX} y2={plantFootY} stroke={nearLimbStroke} strokeWidth="10" strokeLinecap="round" />
                  <circle cx={plantFootX} cy={plantFootY} r="6" fill="#D4FF00" />

                  {/* Trailing Cross Sweep Leg */}
                  <line x1={hipX} y1={hipY} x2={sweepFootX} y2={sweepFootY} stroke={farLimbStroke} strokeWidth="10" strokeLinecap="round" />
                  <circle cx={sweepFootX} cy={sweepFootY} r="5" fill="#0284C7" />

                  {/* Counter-Swinging Skater Arms */}
                  <line x1={chestX} y1={chestY + 10} x2={chestX - lateral * 35} y2={chestY + 30} stroke="#00F0FF" strokeWidth="8" strokeLinecap="round" />
                  <circle cx={chestX - lateral * 35} cy={chestY + 30} r="5" fill="#D4FF00" />

                  {isMuscleMode && (
                    <text x="130" y="70" fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">GLUTEUS MEDIUS & LATERAL FORCE ABSORPTION</text>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 24. CAT-COW / SPINAL MOBILIZATION (Connected Kinematics) */}
            {/* ============================================================== */}
            {animType === 'cat-cow' && (() => {
              const spineCurve = (cycle - 0.5) * 45;
              const kneeX = 135;
              const kneeY = 198;
              const hipX = 175;
              const hipY = 160;
              const handX = 290;
              const handY = 200;
              const shoulderX = 290;
              const shoulderY = 148;
              const headX = 315;
              const headY = 138 - spineCurve * 0.4;

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={210} cy={210} rx={110} ry={8} fill="url(#char3dFloorShadow)" />

                  {/* Knees on Ground */}
                  <circle cx={kneeX} cy={kneeY} r="8" fill="#0284C7" />
                  <line x1={kneeX} y1={kneeY} x2={hipX} y2={hipY} stroke={farLimbStroke} strokeWidth="11" strokeLinecap="round" />
                  <circle cx={hipX} cy={hipY} r="8" fill="#1E293B" />

                  {/* Dynamic Curving Spine */}
                  <path 
                    d={`M ${hipX} ${hipY} Q 230 ${140 + spineCurve} ${shoulderX} ${shoulderY}`} 
                    fill="none" 
                    stroke="url(#char3dTorso)" 
                    strokeWidth="18" 
                    strokeLinecap="round" 
                  />
                  <path 
                    d={`M ${hipX} ${hipY} Q 230 ${140 + spineCurve} ${shoulderX} ${shoulderY}`} 
                    fill="none" 
                    stroke={isMuscleMode ? '#00F0FF' : '#D4FF00'} 
                    strokeWidth="12" 
                    strokeLinecap="round" 
                  />
                  <circle cx={shoulderX} cy={shoulderY} r="8" fill="#1E293B" />

                  {/* Arms Supporting Floor */}
                  <line x1={shoulderX} y1={shoulderY} x2={handX} y2={handY} stroke={nearLimbStroke} strokeWidth="9" strokeLinecap="round" />
                  <circle cx={handX} cy={handY} r="6" fill="#D4FF00" />

                  {/* 3D Head Tilting */}
                  <circle cx={headX} cy={headY} r="14" fill="url(#char3dHead)" />

                  {isMuscleMode && (
                    <text x="140" y={115} fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">THORACOLUMBAR ARTICULATION</text>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 25. COBRA STRETCH / PRONE EXTENSION (Connected Kinematics) */}
            {/* ============================================================== */}
            {animType === 'cobra-stretch' && (() => {
              const arch = cycle * 24;
              const feetX = 90;
              const feetY = 200;
              const hipX = 190;
              const hipY = 200;
              const shoulderX = 280;
              const shoulderY = 135 - arch * 1.4;
              const handX = 265;
              const handY = 200;

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={210} cy={210} rx={115} ry={8} fill="url(#char3dFloorShadow)" />

                  {/* Grounded Lower Body */}
                  <line x1={feetX} y1={feetY} x2={hipX} y2={hipY} stroke={nearLimbStroke} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={feetX} cy={feetY} r="6" fill="#0284C7" />
                  <circle cx={hipX} cy={hipY} r="8" fill="#1E293B" />

                  {/* Arching Spine */}
                  <path 
                    d={`M ${hipX} ${hipY} Q 240 ${175 - arch} ${shoulderX} ${shoulderY}`} 
                    fill="none" 
                    stroke="url(#char3dTorso)" 
                    strokeWidth="18" 
                    strokeLinecap="round" 
                  />
                  <path 
                    d={`M ${hipX} ${hipY} Q 240 ${175 - arch} ${shoulderX} ${shoulderY}`} 
                    fill="none" 
                    stroke={isMuscleMode ? '#00F0FF' : '#D4FF00'} 
                    strokeWidth="12" 
                    strokeLinecap="round" 
                  />
                  <circle cx={shoulderX} cy={shoulderY} r="8" fill="#1E293B" />

                  {/* Supporting Hands & Arms */}
                  <line x1={shoulderX} y1={shoulderY} x2={handX} y2={handY} stroke="#00F0FF" strokeWidth="8" strokeLinecap="round" />
                  <circle cx={handX} cy={handY} r="6" fill="#D4FF00" />

                  {/* 3D Head Proud */}
                  <circle cx={shoulderX + 15} cy={shoulderY - 18} r="14" fill="url(#char3dHead)" />

                  {isMuscleMode && (
                    <text x="160" y={100} fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">CHEST & ANTERIOR FASCIA OPENER</text>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 26. WARRIOR POSE / YOGA BALANCE (Connected Kinematics) */}
            {/* ============================================================== */}
            {animType === 'warrior-pose' && (() => {
              const breathe = Math.sin(phase) * 4;
              const hipX = 210;
              const hipY = 135 + breathe;
              const chestY = 65 + breathe;
              const headY = 48 + breathe;
              const frontKneeX = 280;
              const frontKneeY = 160;
              const rearFootX = 125;
              const rearFootY = 215;

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={220} cy={218} rx={95} ry={10} fill="url(#char3dFloorShadow)" />

                  {/* Rear Straight Leg */}
                  <line x1={hipX} y1={hipY} x2={rearFootX} y2={rearFootY} stroke={farLimbStroke} strokeWidth="11" strokeLinecap="round" />
                  <ellipse cx={rearFootX} cy={rearFootY} rx="9" ry="4" fill="#0284C7" />

                  {/* 3D Torso (Upright centered) */}
                  <line x1={hipX} y1={hipY} x2={hipX} y2={chestY} stroke="url(#char3dTorso)" strokeWidth="18" strokeLinecap="round" />
                  <line x1={hipX} y1={hipY} x2={hipX} y2={chestY} stroke={isMuscleMode ? '#00F0FF' : '#475569'} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={hipX} cy={hipY} r="8" fill="#1E293B" />
                  <circle cx={hipX} cy={chestY} r="8" fill="#1E293B" />
                  <circle cx={hipX} cy={headY} r="14" fill="url(#char3dHead)" />

                  {/* Front Bent Knee (90°) */}
                  <line x1={hipX} y1={hipY} x2={frontKneeX} y2={frontKneeY} stroke={activeMuscleStroke} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={frontKneeX} cy={frontKneeY} r="7" fill="#D4FF00" />
                  <line x1={frontKneeX} y1={frontKneeY} x2={frontKneeX} y2="215" stroke={nearLimbStroke} strokeWidth="10" strokeLinecap="round" />
                  <circle cx={frontKneeX} cy="215" r="6" fill="#D4FF00" />
                  <ellipse cx={frontKneeX + 3} cy="215" rx="9" ry="4" fill="#D4FF00" />

                  {/* Outstretched Arms */}
                  <line x1="120" y1={80 + breathe} x2="305" y2={80 + breathe} stroke="#00F0FF" strokeWidth="8" strokeLinecap="round" />
                  <circle cx="120" cy={80 + breathe} r="5" fill="#00F0FF" />
                  <circle cx="305" cy={80 + breathe} r="5" fill="#00F0FF" />

                  {isMuscleMode && (
                    <text x="140" y={110} fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">ISOMETRIC QUAD & ADDUCTOR HOLD</text>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 27. CHIN TUCK & GLOW-UP JAWLINE (Complete Profile Athlete) */}
            {/* ============================================================== */}
            {(animType === 'chin-tuck' || animType === 'face-stretch') && (() => {
              const alignment = cycle * 18;
              const hipX = 180;
              const hipY = 195;
              const chestX = 210;
              const chestY = 135;
              const neckX = 215 - alignment;
              const neckY = 100;
              const headX = 222 - alignment;
              const headY = 82;

              return (
                <g filter="url(#forgeGlow)">
                  {/* Vertical Plumb Line Guide */}
                  <line x1="210" y1="25" x2="210" y2="225" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                  <text x="216" y="38" fill="#64748B" fontSize="8" fontFamily="monospace">CERVICAL PLUMB LINE</text>

                  {/* Seated Pelvis & Legs */}
                  <ellipse cx={190} cy={215} rx={60} ry={8} fill="url(#char3dFloorShadow)" />
                  <line x1={hipX} y1={hipY} x2={hipX + 50} y2={hipY} stroke={nearLimbStroke} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={hipX} cy={hipY} r="8" fill="#1E293B" />

                  {/* Erect Thoracic Spine */}
                  <line x1={hipX} y1={hipY} x2={chestX} y2={chestY} stroke="url(#char3dTorso)" strokeWidth="18" strokeLinecap="round" />
                  <line x1={hipX} y1={hipY} x2={chestX} y2={chestY} stroke={isMuscleMode ? '#00F0FF' : '#475569'} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={chestX} cy={chestY} r="8" fill="#1E293B" />

                  {/* Arm resting on knee */}
                  <line x1={chestX} y1={chestY} x2={hipX + 45} y2={hipY - 10} stroke="#00F0FF" strokeWidth="7" strokeLinecap="round" />

                  {/* Cervical Retraction Glide */}
                  <line x1={chestX} y1={chestY} x2={neckX} y2={neckY} stroke={nearLimbStroke} strokeWidth="10" strokeLinecap="round" />
                  <circle cx={headX} cy={headY} r="22" fill="url(#char3dHead)" />

                  {/* Jawline Definition Line */}
                  <path d={`M ${headX + 10} ${headY + 6} L ${headX + 22} ${headY + 10} L ${headX + 10} ${headY + 18}`} fill="none" stroke="#00F0FF" strokeWidth="3.5" strokeLinecap="round" />

                  {isMuscleMode && (
                    <g className="animate-pulse">
                      <text x="80" y="110" fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">DEEP CERVICAL FLEXORS</text>
                      <text x="245" y={headY} fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">HYOID RETRACTION</text>
                    </g>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 28. WRIST MOBILITY (Complete Body & Forearm Articulation) */}
            {/* ============================================================== */}
            {animType === 'wrist-stretch' && (() => {
              const flexAngle = (cycle - 0.5) * 55;
              const chestX = 180;
              const chestY = 120;
              const elbowX = 240;
              const elbowY = 120;
              const wristX = 295;
              const wristY = 120;

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={200} cy={215} rx={60} ry={8} fill="url(#char3dFloorShadow)" />

                  {/* Seated athlete torso & head */}
                  <line x1="170" y1="195" x2={chestX} y2={chestY} stroke="url(#char3dTorso)" strokeWidth="18" strokeLinecap="round" />
                  <circle cx={chestX} cy={chestY} r="8" fill="#1E293B" />
                  <circle cx={chestX} cy={chestY - 22} r="14" fill="url(#char3dHead)" />

                  {/* Extended Arm (Shoulder -> Elbow -> Wrist) */}
                  <line x1={chestX} y1={chestY} x2={elbowX} y2={elbowY} stroke={nearLimbStroke} strokeWidth="10" strokeLinecap="round" />
                  <circle cx={elbowX} cy={elbowY} r="6" fill="#D4FF00" />
                  <line x1={elbowX} y1={elbowY} x2={wristX} y2={wristY} stroke={nearLimbStroke} strokeWidth="9" strokeLinecap="round" />
                  <circle cx={wristX} cy={wristY} r="6" fill="#00F0FF" />

                  {/* Hand Flexing gently under opposite hand guidance */}
                  <g transform={`rotate(${flexAngle}, ${wristX}, ${wristY})`}>
                    <line x1={wristX} y1={wristY} x2={wristX + 35} y2={wristY} stroke={activeMuscleStroke} strokeWidth="8" strokeLinecap="round" />
                    <circle cx={wristX + 35} cy={wristY} r="5" fill="#D4FF00" />
                  </g>

                  {isMuscleMode && (
                    <text x="170" y="80" fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">CARPAL TUNNEL & FOREARM FLEXORS</text>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 29. GLUTE STRETCH / FIGURE 4 (Connected Kinematics) */}
            {/* ============================================================== */}
            {animType === 'glute-stretch' && (() => {
              const pull = cycle * 18;
              const hipX = 185;
              const hipY = 195;
              const leftKneeX = 195 - pull * 0.5;
              const leftKneeY = 145 - pull;
              const leftFootX = 245;
              const leftFootY = 185;

              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={210} cy={210} rx={110} ry={8} fill="url(#char3dFloorShadow)" />

                  {/* Torso Flat on Back */}
                  <line x1={hipX} y1={hipY} x2="275" y2={hipY} stroke="url(#char3dTorso)" strokeWidth="18" strokeLinecap="round" />
                  <circle cx={hipX} cy={hipY} r="8" fill="#1E293B" />
                  <circle cx="275" cy={hipY} r="8" fill="#1E293B" />
                  <circle cx="298" cy={hipY - 5} r="14" fill="url(#char3dHead)" />

                  {/* Base Leg (Hip -> Knee -> Foot) */}
                  <line x1={hipX} y1={hipY} x2={leftKneeX} y2={leftKneeY} stroke={farLimbStroke} strokeWidth="11" strokeLinecap="round" />
                  <circle cx={leftKneeX} cy={leftKneeY} r="6" fill="#0284C7" />
                  <line x1={leftKneeX} y1={leftKneeY} x2={leftFootX} y2={leftFootY} stroke={farLimbStroke} strokeWidth="9" strokeLinecap="round" />

                  {/* Crossed Ankle over Opposite Knee (Figure 4) */}
                  <line x1={hipX} y1={hipY} x2={leftKneeX + 35} y2={leftKneeY + 20} stroke={activeMuscleStroke} strokeWidth="12" strokeLinecap="round" />
                  <circle cx={leftKneeX + 35} cy={leftKneeY + 20} r="7" fill="#D4FF00" />
                  <line x1={leftKneeX + 35} y1={leftKneeY + 20} x2={leftKneeX} y2={leftKneeY} stroke={activeMuscleStroke} strokeWidth="10" strokeLinecap="round" />
                  <circle cx={leftKneeX} cy={leftKneeY} r="7" fill="#00F0FF" />

                  {/* Arms Clasping Hamstring to Gently Pull */}
                  <line x1="275" y1={hipY - 5} x2={leftKneeX} y2={leftKneeY} stroke="#00F0FF" strokeWidth="7" strokeLinecap="round" />

                  {isMuscleMode && (
                    <text x="110" y="115" fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">PIRIFORMIS & GLUTEUS MEDIUS DECOMPRESSION</text>
                  )}
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 30. DIAPHRAGM BREATH / PARASYMPATHETIC RESET */}
            {/* ============================================================== */}
            {animType === 'diaphragm-breath' && (() => {
              const expand = cycle * 14;
              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={220} cy={215} rx={75} ry={8} fill="url(#char3dFloorShadow)" />

                  {/* Meditative Crossed Legs Base */}
                  <ellipse cx="220" cy="195" rx="55" ry="12" fill="#1E293B" stroke="#334155" strokeWidth="2" />
                  <circle cx="165" cy="195" r="7" fill="#0284C7" />
                  <circle cx="275" cy="195" r="7" fill="#0284C7" />

                  {/* Tall Mindful Torso */}
                  <line x1="220" y1="190" x2="220" y2="105" stroke="url(#char3dTorso)" strokeWidth="20" strokeLinecap="round" />
                  <circle cx="220" cy="105" r="9" fill="#1E293B" />
                  <circle cx="220" cy="85" r="14" fill="url(#char3dHead)" />

                  {/* Hands resting peacefully on lower belly */}
                  <line x1="220" y1="120" x2="195" y2="155" stroke="#00F0FF" strokeWidth="7" strokeLinecap="round" />
                  <line x1="220" y1="120" x2="245" y2="155" stroke="#00F0FF" strokeWidth="7" strokeLinecap="round" />
                  <circle cx="220" cy="160" r="5" fill="#D4FF00" />

                  {/* Glowing 3D Diaphragm Expansion Sphere */}
                  <circle cx="220" cy="145" r={16 + expand} fill="none" stroke="#D4FF00" strokeWidth="2" strokeDasharray="4 3" opacity="0.8" />
                  <circle cx="220" cy="145" r={8 + expand * 0.5} fill="#D4FF00" opacity="0.2" />

                  <text x="140" y="55" fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">VAGUS NERVE PARASYMPATHETIC ACTIVATION</text>
                </g>
              );
            })()}

            {/* ============================================================== */}
            {/* 31. DEFAULT ATHLETIC CALISTHENIC POSE (Connected Fallback) */}
            {/* ============================================================== */}
            {!['squat', 'pushup', 'plank', 'dips', 'lunge', 'crunch', 'leg-raise', 'jumping-jack', 'burpee', 'high-knees', 'mountain-climber', 'pullup', 'pike-pushup', 'jump-squat', 'calf-raise', 'wall-sit', 'side-plank', 'bicycle-crunch', 'bird-dog', 'dead-bug', 'child-pose', 'butterfly-stretch', 'skater-jump', 'cat-cow', 'cobra-stretch', 'warrior-pose', 'chin-tuck', 'face-stretch', 'wrist-stretch', 'glute-stretch', 'diaphragm-breath'].includes(animType) && (() => {
              const micro = Math.sin(phase * 2) * 3;
              return (
                <g filter="url(#forgeGlow)">
                  <ellipse cx={220} cy={218} rx={60} ry={8} fill="url(#char3dFloorShadow)" />
                  <circle cx="100" cy="202" r="7" fill="#0284C7" />
                  <line x1="100" y1="202" x2="190" y2={150 + micro} stroke={farLimbStroke} strokeWidth="11" strokeLinecap="round" />
                  <circle cx="190" cy={150 + micro} r="8" fill="#1E293B" />
                  <line x1="190" y1={150 + micro} x2="280" y2={140 + micro} stroke="url(#char3dTorso)" strokeWidth="18" strokeLinecap="round" />
                  <circle cx="280" cy={140 + micro} r="8" fill="#1E293B" />
                  <circle cx="305" cy={130 + micro} r="14" fill="url(#char3dHead)" />
                  <line x1="280" y1={140 + micro} x2="280" y2="202" stroke={nearLimbStroke} strokeWidth="9" strokeLinecap="round" />
                  <circle cx="280" cy="202" r="6" fill="#D4FF00" />
                </g>
              );
            })()}
          </svg>
        )}

        {/* Real-Time Cadence HUD */}
        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-charcoal-950/90 border border-charcoal-700 text-[10px] text-forge-lime font-mono tracking-wider uppercase flex items-center gap-1.5 shadow-md">
          <Activity className="w-3.5 h-3.5 text-forge-lime animate-pulse" />
          <span>{isPlaying ? `${speed}x 3D Video Feed` : 'Paused'}</span>
        </div>

        {/* Real-Time Phase Indicator */}
        <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-charcoal-950/90 border border-charcoal-700 text-[10px] text-forge-cyan font-mono tracking-wider uppercase">
          {Math.cos(phase) < 0 ? 'Concentric (Drive)' : 'Eccentric (Control)'}
        </div>
      </div>

      {/* Control Bar: Play/Pause, Restart, Sound, Fullscreen */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2.5 rounded-xl bg-forge-lime text-black font-bold hover:bg-forge-lime-hover active:scale-95 transition-all shadow-forge-glow"
            aria-label={isPlaying ? 'Pause demonstration' : 'Play demonstration'}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
          </button>

          <button
            onClick={handleRestart}
            className="p-2.5 rounded-xl bg-charcoal-800 text-gray-300 hover:text-white hover:bg-charcoal-700 active:scale-95 transition-all"
            title="Replay step from beginning"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2.5 rounded-xl bg-charcoal-800 text-gray-300 hover:text-white hover:bg-charcoal-700 active:scale-95 transition-all"
            title={isMuted ? 'Unmute chimes' : 'Mute chimes'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-forge-lime" />}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-gray-400 hidden sm:inline">
            Form Cadence: <strong className="text-forge-lime">{speed === 0.5 ? 'Slow-Mo' : speed === 1.5 ? 'Fast Tempo' : 'Strict 1:1'}</strong>
          </span>

          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl bg-charcoal-800 text-gray-300 hover:text-white hover:bg-charcoal-700 active:scale-95 transition-all"
            title="Expand Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Exercise Details Accordion (Shown if enabled) */}
      {showDetails && (
        <div className="mt-3 pt-3 border-t border-charcoal-800 text-xs space-y-1.5">
          <div className="flex items-center justify-between text-gray-400">
            <span>Primary Focus:</span>
            <span className="font-semibold text-white">{exercise.targetMuscles.join(', ')}</span>
          </div>
          {exercise.formCues && exercise.formCues.length > 0 && (
            <div className="text-[11px] text-gray-300">
              <span className="text-forge-lime font-bold">Key Cue:</span> {exercise.formCues[0]}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
