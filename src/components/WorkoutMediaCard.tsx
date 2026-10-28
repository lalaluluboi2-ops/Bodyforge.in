import React, { useState, useEffect } from 'react';
import { WorkoutMediaItem } from '../types';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Video, 
  Image as ImageIcon, 
  CheckCircle2, 
  Layers, 
  Zap,
  Gauge,
  Eye,
  Activity
} from 'lucide-react';

interface WorkoutMediaCardProps {
  media: WorkoutMediaItem;
}

export const WorkoutMediaCard: React.FC<WorkoutMediaCardProps> = ({ media }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<number>(1); // 0.5, 1, 1.5
  const [viewMode, setViewMode] = useState<'standard' | 'muscles'>('standard');
  const [phase, setPhase] = useState(0);

  // Kinetic animation cycle
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setPhase((prev) => (prev + 0.05 * speed) % (Math.PI * 2));
    }, 30);
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const cycle = (Math.sin(phase) + 1) / 2; // 0 to 1
  const isEccentric = Math.cos(phase) < 0; // descent vs ascent phase

  // Exercise definitions for animation and anatomical mapping
  const exerciseKey = media.exerciseType || 'pushup';

  const renderAnimationContent = () => {
    switch (exerciseKey) {
      case 'squat': {
        const hipY = 135 + cycle * 35;
        const kneeY = 170 - cycle * 5;
        const kneeX = 225 + cycle * 12;
        return (
          <g>
            {/* Ground */}
            <line x1="60" y1="210" x2="340" y2="210" stroke="#1F2631" strokeWidth="3" strokeDasharray="6 4" />
            
            {/* Feet */}
            <circle cx="210" cy="208" r="6" fill="#D4FF00" />
            {/* Lower Leg */}
            <line x1="210" y1="208" x2={kneeX} y2={kneeY} stroke="#D4FF00" strokeWidth="8" strokeLinecap="round" />
            {/* Thigh (Quadriceps Highlight) */}
            <line 
              x1={kneeX} 
              y1={kneeY} 
              x2="175" 
              y2={hipY} 
              stroke={viewMode === 'muscles' ? '#00F0FF' : '#D4FF00'} 
              strokeWidth={viewMode === 'muscles' ? '12' : '9'} 
              strokeLinecap="round" 
            />
            {/* Torso & Spine */}
            <line x1="175" y1={hipY} x2="190" y2={hipY - 45} stroke="#D4FF00" strokeWidth="10" strokeLinecap="round" />
            {/* Head */}
            <circle cx="195" cy={hipY - 60} r="13" fill="#D4FF00" />
            {/* Arms balanced in front */}
            <line x1="190" y1={hipY - 40} x2="235" y2={hipY - 35} stroke="#00F0FF" strokeWidth="6" strokeLinecap="round" />

            {/* Muscle highlight labels if in muscle mode */}
            {viewMode === 'muscles' && (
              <g className="animate-pulse">
                <text x="110" y={hipY + 5} fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  GLUTE MAX [HIGH LOAD]
                </text>
                <text x="235" y={kneeY - 15} fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  QUADS 90°
                </text>
              </g>
            )}
          </g>
        );
      }

      case 'chin-tuck':
      case 'face-stretch': {
        const retraction = cycle * 18;
        return (
          <g>
            {/* Vertical plumb line guide */}
            <line x1="200" y1="25" x2="200" y2="215" stroke="#1F2631" strokeWidth="2" strokeDasharray="4 4" />
            <text x="206" y="40" fill="#64748B" fontSize="8" fontFamily="monospace">NEUTRAL PLUMB LINE</text>
            
            {/* Shoulder / Collarbone */}
            <path d="M 150 195 Q 200 180 250 195" stroke="#00F0FF" strokeWidth="9" fill="none" strokeLinecap="round" />
            {/* Upper Torso */}
            <line x1="200" y1="185" x2="200" y2="135" stroke="#D4FF00" strokeWidth="8" strokeLinecap="round" />
            {/* Cervical Spine (Strengthening Deep Neck Flexors) */}
            <line 
              x1="200" 
              y1="135" 
              x2={208 - retraction} 
              y2="100" 
              stroke={viewMode === 'muscles' ? '#00F0FF' : '#D4FF00'} 
              strokeWidth={viewMode === 'muscles' ? '10' : '7'} 
              strokeLinecap="round" 
            />
            {/* Cranium & Head Profile */}
            <circle cx={208 - retraction} cy="82" r="22" fill="#1F2631" stroke="#D4FF00" strokeWidth="4" />
            {/* Crisp Jawline / Mandible Angle Indicator */}
            <path 
              d={`M ${218 - retraction} 88 L ${228 - retraction} 91 L ${218 - retraction} 100`} 
              fill="none" 
              stroke={viewMode === 'muscles' ? '#D4FF00' : '#00F0FF'} 
              strokeWidth="3.5" 
              strokeLinecap="round" 
            />

            {/* Target Retraction Indicator Ring */}
            <circle cx="198" cy="82" r="26" fill="none" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

            {viewMode === 'muscles' && (
              <g className="animate-pulse">
                <text x="75" y="115" fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  DEEP CERVICAL FLEXORS
                </text>
                <text x="235" y="92" fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  MANDIBULAR ANGLE
                </text>
              </g>
            )}
          </g>
        );
      }

      case 'plank': {
        const microBreathe = cycle * 4;
        return (
          <g>
            {/* Ground */}
            <line x1="50" y1="180" x2="350" y2="180" stroke="#1F2631" strokeWidth="3" strokeDasharray="6 4" />
            {/* Forearm & Elbow */}
            <line x1="280" y1="140" x2="280" y2="175" stroke="#D4FF00" strokeWidth="8" strokeLinecap="round" />
            <line x1="280" y1="175" x2="305" y2="175" stroke="#00F0FF" strokeWidth="6" strokeLinecap="round" />
            {/* Head */}
            <circle cx="310" cy="125" r="13" fill="#D4FF00" />
            {/* Torso & Core Beam */}
            <line 
              x1="120" 
              y1="150 + microBreathe" 
              x2="280" 
              y2="140" 
              stroke={viewMode === 'muscles' ? '#00F0FF' : '#D4FF00'} 
              strokeWidth={viewMode === 'muscles' ? '12' : '9'} 
              strokeLinecap="round" 
            />
            {/* Legs */}
            <line x1="90" y1="175" x2="120" y2="150" stroke="#D4FF00" strokeWidth="8" strokeLinecap="round" />
            <circle cx="90" cy="175" r="6" fill="#00F0FF" />

            {viewMode === 'muscles' && (
              <g className="animate-pulse">
                <text x="140" y="125" fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  TRANSVERSE ABDOMINIS (BRACED)
                </text>
                <text x="120" y="170" fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  GLUTEUS TENSION 100%
                </text>
              </g>
            )}
          </g>
        );
      }

      case 'cat-cow': {
        const spineCurve = (cycle - 0.5) * 45;
        return (
          <g>
            <line x1="40" y1="200" x2="360" y2="200" stroke="#1F2631" strokeWidth="3" strokeDasharray="6 4" />
            <circle cx="110" cy="195" r="7" fill="#D4FF00" />
            <line x1="110" y1="195" x2="160" y2="155" stroke="#D4FF00" strokeWidth="9" strokeLinecap="round" />
            <path 
              d={`M 160 155 Q 220 ${140 + spineCurve} 280 145`} 
              fill="none" 
              stroke={viewMode === 'muscles' ? '#00F0FF' : '#D4FF00'} 
              strokeWidth={viewMode === 'muscles' ? '12' : '10'} 
              strokeLinecap="round" 
            />
            <line x1="280" y1="145" x2="280" y2="195" stroke="#D4FF00" strokeWidth="8" strokeLinecap="round" />
            <circle cx="280" cy="195" r="6" fill="#00F0FF" />
            <circle cx="305" cy={135 - spineCurve * 0.4} r="14" fill="#D4FF00" />
          </g>
        );
      }

      case 'dips': {
        const dipY = cycle * 35;
        return (
          <g>
            <rect x="240" y="145" width="55" height="55" rx="6" fill="#1A222D" stroke="#2C3545" strokeWidth="2" />
            <circle cx="240" cy="143" r="5" fill="#00F0FF" />
            <line x1="240" y1="143" x2={225 + dipY * 0.2} y2={120 + dipY} stroke="#00F0FF" strokeWidth="7" strokeLinecap="round" />
            <line 
              x1={225 + dipY * 0.2} 
              y1={120 + dipY} 
              x2="200" 
              y2={155 + dipY} 
              stroke={viewMode === 'muscles' ? '#00F0FF' : '#D4FF00'} 
              strokeWidth={viewMode === 'muscles' ? '12' : '9'} 
              strokeLinecap="round" 
            />
            <circle cx={225 + dipY * 0.2} cy={95 + dipY} r="13" fill="#D4FF00" />
            <line x1="200" y1={155 + dipY} x2="120" y2="195" stroke="#D4FF00" strokeWidth="8" strokeLinecap="round" />
            {viewMode === 'muscles' && (
              <text x="130" y="100" fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                TRICEPS BRACHII 100%
              </text>
            )}
          </g>
        );
      }

      case 'crunch':
      case 'leg-raise': {
        const curl = cycle * 24;
        return (
          <g>
            <line x1="40" y1="195" x2="360" y2="195" stroke="#1F2631" strokeWidth="3" />
            <circle cx="160" cy="190" r="10" fill="#D4FF00" />
            <line x1="160" y1="190" x2="195" y2="145" stroke="#D4FF00" strokeWidth="8" strokeLinecap="round" />
            <line x1="195" y1="145" x2="235" y2="190" stroke="#D4FF00" strokeWidth="8" strokeLinecap="round" />
            <path 
              d={`M 160 190 Q ${120 - curl * 0.3} ${170 - curl} ${95 - curl * 0.5} ${150 - curl}`} 
              fill="none" 
              stroke={viewMode === 'muscles' ? '#00F0FF' : '#D4FF00'} 
              strokeWidth={viewMode === 'muscles' ? '12' : '10'} 
              strokeLinecap="round" 
            />
            <circle cx={80 - curl * 0.5} cy={140 - curl} r="13" fill="#D4FF00" />
            <line x1={95 - curl * 0.5} y1={150 - curl} x2={70 - curl * 0.5} y2={135 - curl} stroke="#00F0FF" strokeWidth="5" strokeLinecap="round" />
            {viewMode === 'muscles' && (
              <text x="140" y="130" fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                RECTUS ABDOMINIS
              </text>
            )}
          </g>
        );
      }

      case 'lunge': {
        const dropY = cycle * 30;
        return (
          <g>
            <line x1="60" y1="210" x2="340" y2="210" stroke="#1F2631" strokeWidth="3" strokeDasharray="6 4" />
            <circle cx="200" cy={55 + dropY} r="13" fill="#D4FF00" />
            <line x1="200" y1={70 + dropY} x2="200" y2={130 + dropY} stroke="#D4FF00" strokeWidth="9" strokeLinecap="round" />
            <line 
              x1="200" 
              y1={130 + dropY} 
              x2="250" 
              y2={145 + dropY * 0.4} 
              stroke={viewMode === 'muscles' ? '#00F0FF' : '#D4FF00'} 
              strokeWidth={viewMode === 'muscles' ? '11' : '9'} 
              strokeLinecap="round" 
            />
            <line x1="250" y1={145 + dropY * 0.4} x2="250" y2="200" stroke="#D4FF00" strokeWidth="8" strokeLinecap="round" />
            <line x1="200" y1={130 + dropY} x2="140" y2={175 + dropY * 0.7} stroke="#00F0FF" strokeWidth="8" strokeLinecap="round" />
            <line x1="140" y1={175 + dropY * 0.7} x2="110" y2="200" stroke="#00F0FF" strokeWidth="7" strokeLinecap="round" />
            {viewMode === 'muscles' && (
              <text x="170" y="110" fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                GLUTE & QUAD CHAIN
              </text>
            )}
          </g>
        );
      }

      case 'jumping-jack':
      case 'burpee': {
        const legSpread = cycle * 35;
        const armAngle = cycle * 60;
        return (
          <g>
            <circle cx="200" cy="55" r="14" fill="#D4FF00" />
            <line 
              x1="200" 
              y1="70" 
              x2="200" 
              y2="135" 
              stroke={viewMode === 'muscles' ? '#00F0FF' : '#D4FF00'} 
              strokeWidth={viewMode === 'muscles' ? '12' : '10'} 
              strokeLinecap="round" 
            />
            <line x1="200" y1="135" x2={180 - legSpread} y2="200" stroke="#D4FF00" strokeWidth="8" strokeLinecap="round" />
            <line x1="200" y1="135" x2={220 + legSpread} y2="200" stroke="#D4FF00" strokeWidth="8" strokeLinecap="round" />
            <line x1="200" y1="80" x2={150 - legSpread * 0.8} y2={120 - armAngle} stroke="#00F0FF" strokeWidth="7" strokeLinecap="round" />
            <line x1="200" y1="80" x2={250 + legSpread * 0.8} y2={120 - armAngle} stroke="#00F0FF" strokeWidth="7" strokeLinecap="round" />
            {viewMode === 'muscles' && (
              <text x="130" y="100" fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                METABOLIC FULL BODY
              </text>
            )}
          </g>
        );
      }

      case 'pike-pushup': {
        const dip = cycle * 28;
        const hipX = 180;
        const hipY = 100;
        const shoulderX = 240 + dip * 0.2;
        const shoulderY = 150 + dip * 0.6;
        const elbowX = 275 + dip * 0.3;
        const elbowY = 160 + dip * 0.4;
        return (
          <g>
            <line x1="50" y1="210" x2="350" y2="210" stroke="#1F2631" strokeWidth="3" strokeDasharray="6 4" />
            <circle cx="110" cy="205" r="6" fill="#00F0FF" />
            <line x1="110" y1="205" x2={hipX} y2={hipY} stroke="#D4FF00" strokeWidth="9" strokeLinecap="round" />
            <circle cx={hipX} cy={hipY} r="7" fill="#D4FF00" />
            <line x1={hipX} y1={hipY} x2={shoulderX} y2={shoulderY} stroke="url(#mediaGlow)" strokeWidth="12" strokeLinecap="round" />
            <line x1={hipX} y1={hipY} x2={shoulderX} y2={shoulderY} stroke={viewMode === 'muscles' ? '#00F0FF' : '#D4FF00'} strokeWidth="10" strokeLinecap="round" />
            <circle cx={shoulderX} cy={shoulderY} r="7" fill="#D4FF00" />
            <circle cx={shoulderX + 16} cy={shoulderY - 10} r="13" fill="#D4FF00" />
            <line x1={shoulderX} y1={shoulderY} x2={elbowX} y2={elbowY} stroke="#00F0FF" strokeWidth="8" strokeLinecap="round" />
            <circle cx={elbowX} cy={elbowY} r="5" fill="#D4FF00" />
            <line x1={elbowX} y1={elbowY} x2="265" y2="205" stroke="#00F0FF" strokeWidth="8" strokeLinecap="round" />
            <circle cx="265" cy="205" r="5" fill="#00F0FF" />
            {viewMode === 'muscles' && (
              <text x="190" y="80" fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">DELTOID & TRICEP LOAD</text>
            )}
          </g>
        );
      }

      case 'jump-squat': {
        const isJumping = cycle > 0.5;
        const jumpP = isJumping ? (cycle - 0.5) * 2 : 0;
        const squatP = !isJumping ? cycle * 2 : 0;
        const hipY = 135 + squatP * 35 - jumpP * 30;
        const kneeX = 225 + squatP * 10;
        const kneeY = 170 - squatP * 5 - jumpP * 30;
        const ankleY = 208 - jumpP * 30;
        return (
          <g>
            <line x1="60" y1="210" x2="340" y2="210" stroke="#1F2631" strokeWidth="3" strokeDasharray="6 4" />
            <circle cx="210" cy={ankleY} r="6" fill="#D4FF00" />
            <line x1="210" y1={ankleY} x2={kneeX} y2={kneeY} stroke="#D4FF00" strokeWidth="8" strokeLinecap="round" />
            <circle cx={kneeX} cy={kneeY} r="6" fill="#D4FF00" />
            <line x1={kneeX} y1={kneeY} x2="175" y2={hipY} stroke={viewMode === 'muscles' ? '#00F0FF' : '#D4FF00'} strokeWidth="10" strokeLinecap="round" />
            <circle cx="175" cy={hipY} r="7" fill="#D4FF00" />
            <line x1="175" y1={hipY} x2="190" y2={hipY - 45} stroke="#D4FF00" strokeWidth="10" strokeLinecap="round" />
            <circle cx="195" cy={hipY - 60} r="13" fill="#D4FF00" />
            <line x1="190" y1={hipY - 40} x2="235" y2={hipY - (isJumping ? 65 : 35)} stroke="#00F0FF" strokeWidth="7" strokeLinecap="round" />
            {viewMode === 'muscles' && (
              <text x="120" y="55" fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">FAST-TWITCH PLYOMETRIC RECRUITMENT</text>
            )}
          </g>
        );
      }

      case 'wall-sit': {
        return (
          <g>
            <line x1="50" y1="210" x2="350" y2="210" stroke="#1F2631" strokeWidth="3" strokeDasharray="6 4" />
            <line x1="140" y1="30" x2="140" y2="210" stroke="#334155" strokeWidth="4" />
            {/* Back flat against wall */}
            <line x1="148" y1="145" x2="148" y2="85" stroke="#D4FF00" strokeWidth="11" strokeLinecap="round" />
            <circle cx="148" cy="145" r="7" fill="#D4FF00" />
            <circle cx="152" cy="70" r="13" fill="#D4FF00" />
            {/* Thigh horizontal at 90 deg */}
            <line x1="148" y1="145" x2="220" y2="145" stroke={viewMode === 'muscles' ? '#00F0FF' : '#D4FF00'} strokeWidth="11" strokeLinecap="round" />
            <circle cx="220" cy="145" r="7" fill="#D4FF00" />
            {/* Shin vertical at 90 deg */}
            <line x1="220" y1="145" x2="220" y2="205" stroke="#D4FF00" strokeWidth="9" strokeLinecap="round" />
            <circle cx="220" cy="205" r="6" fill="#00F0FF" />
            {viewMode === 'muscles' && (
              <text x="140" y="125" fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">QUADRICEPS ISOMETRIC TIME-UNDER-TENSION</text>
            )}
          </g>
        );
      }

      case 'side-plank': {
        const micro = Math.sin(phase * 2) * 2;
        return (
          <g>
            <line x1="50" y1="205" x2="350" y2="205" stroke="#1F2631" strokeWidth="3" strokeDasharray="6 4" />
            <circle cx="100" cy="195" r="6" fill="#00F0FF" />
            <line x1="100" y1="195" x2="185" y2={165 + micro} stroke="#D4FF00" strokeWidth="10" strokeLinecap="round" />
            <circle cx="185" cy={165 + micro} r="7" fill="#D4FF00" />
            <line x1="185" y1={165 + micro} x2="265" y2={145 + micro} stroke={viewMode === 'muscles' ? '#00F0FF' : '#D4FF00'} strokeWidth="12" strokeLinecap="round" />
            <circle cx="265" cy={145 + micro} r="7" fill="#D4FF00" />
            <circle cx="285" cy={135 + micro} r="13" fill="#D4FF00" />
            <line x1="265" y1={145 + micro} x2="265" y2="195" stroke="#00F0FF" strokeWidth="8" strokeLinecap="round" />
            <circle cx="265" cy="195" r="5" fill="#D4FF00" />
            <line x1="265" y1={145 + micro} x2="265" y2="90" stroke="#00F0FF" strokeWidth="7" strokeLinecap="round" />
            <circle cx="265" cy="90" r="4" fill="#D4FF00" />
            {viewMode === 'muscles' && (
              <text x="135" y="145" fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">LATERAL OBLIQUE RIGID BRACE</text>
            )}
          </g>
        );
      }

      case 'pushup':
      default: {
        // Standard Pushup
        const hipY = 145 + cycle * 24;
        const shoulderY = 125 + cycle * 36;
        const elbowX = 265 + cycle * 14;
        const elbowY = 150 + cycle * 16;
        return (
          <g>
            {/* Ground reference */}
            <line x1="60" y1="180" x2="340" y2="180" stroke="#1F2631" strokeWidth="3" strokeDasharray="6 4" />

            {/* Feet */}
            <circle cx="90" cy="172" r="6" fill="#D4FF00" />
            {/* Legs */}
            <line x1="90" y1="172" x2="180" y2={hipY} stroke="#D4FF00" strokeWidth="8" strokeLinecap="round" />
            {/* Torso */}
            <line 
              x1="180" 
              y1={hipY} 
              x2="270" 
              y2={shoulderY} 
              stroke={viewMode === 'muscles' ? '#00F0FF' : '#D4FF00'} 
              strokeWidth={viewMode === 'muscles' ? '12' : '10'} 
              strokeLinecap="round" 
            />
            {/* Head */}
            <circle cx="295" cy={110 + cycle * 36} r="14" fill="#D4FF00" />
            {/* Arm: Shoulder to Elbow */}
            <line 
              x1="270" 
              y1={shoulderY} 
              x2={elbowX} 
              y2={elbowY} 
              stroke="#00F0FF" 
              strokeWidth="7" 
              strokeLinecap="round" 
            />
            {/* Arm: Elbow to Hand on Floor */}
            <line x1={elbowX} y1={elbowY} x2="270" y2="175" stroke="#00F0FF" strokeWidth="7" strokeLinecap="round" />
            <circle cx="270" cy="175" r="5" fill="#D4FF00" />

            {viewMode === 'muscles' && (
              <g className="animate-pulse">
                <text x="210" y={shoulderY - 12} fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  PECTORALIS MAJOR
                </text>
                <text x="280" y={elbowY + 4} fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  TRICEPS 45°
                </text>
              </g>
            )}
          </g>
        );
      }
    }
  };

  return (
    <div className="mt-3 rounded-2xl bg-charcoal-950 border border-charcoal-800 overflow-hidden shadow-xl text-white">
      {/* Media Header Banner */}
      <div className="px-3.5 py-2.5 bg-charcoal-900/90 border-b border-charcoal-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {media.type === 'video' ? (
            <span className="p-1 rounded-md bg-forge-lime/20 text-forge-lime">
              <Video className="w-3.5 h-3.5" />
            </span>
          ) : (
            <span className="p-1 rounded-md bg-forge-cyan/20 text-forge-cyan">
              <ImageIcon className="w-3.5 h-3.5" />
            </span>
          )}
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>{media.title}</span>
              <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-charcoal-800 text-forge-lime uppercase">
                {media.type === 'video' ? 'Kinetic 60FPS Video' : 'Form Infographic'}
              </span>
            </h4>
          </div>
        </div>

        {/* View mode toggle */}
        <button
          onClick={() => setViewMode(prev => prev === 'standard' ? 'muscles' : 'standard')}
          className={`px-2 py-1 rounded-lg text-[10px] font-mono flex items-center gap-1 transition-all ${
            viewMode === 'muscles'
              ? 'bg-forge-cyan text-black font-bold'
              : 'bg-charcoal-800 text-gray-400 hover:text-white'
          }`}
          title="Toggle Anatomical Muscle Highlight"
        >
          <Layers className="w-3 h-3" />
          <span className="hidden sm:inline">{viewMode === 'muscles' ? 'Heatmap Active' : 'Heatmap'}</span>
        </button>
      </div>

      {/* Screen / Canvas Area */}
      <div className="relative w-full h-52 bg-gradient-to-b from-charcoal-950 via-charcoal-900 to-charcoal-950 flex items-center justify-center overflow-hidden border-b border-charcoal-850">
        <svg viewBox="0 0 400 240" className="w-full h-full max-w-sm drop-shadow-forge-glow select-none">
          <defs>
            <filter id="mediaGlow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#mediaGlow)">
            {renderAnimationContent()}
          </g>
        </svg>

        {/* Watermark / HUD Badge */}
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-charcoal-950/80 border border-charcoal-800 text-[9px] font-mono text-gray-400 flex items-center gap-1 backdrop-blur-sm">
          <Activity className="w-3 h-3 text-forge-lime animate-pulse" />
          <span>BODYFORGE AI DEMO</span>
        </div>

        {/* Eccentric / Concentric live indicator */}
        {media.type === 'video' && (
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-charcoal-950/80 border border-charcoal-800 text-[9px] font-mono text-forge-lime flex items-center gap-1 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-forge-lime animate-ping" />
            <span>{isEccentric ? 'ECCENTRIC (DOWN)' : 'CONCENTRIC (DRIVE)'}</span>
          </div>
        )}
      </div>

      {/* Media Video Controls */}
      {media.type === 'video' && (
        <div className="px-3 py-2 bg-charcoal-900/70 border-b border-charcoal-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-white transition-colors"
              aria-label={isPlaying ? 'Pause demonstration' : 'Play demonstration'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
            </button>
            <button
              onClick={() => setPhase(0)}
              className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-gray-400 hover:text-white transition-colors"
              aria-label="Restart animation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 font-mono text-[10px]">
            <span className="text-gray-500 mr-1 flex items-center gap-0.5">
              <Gauge className="w-3 h-3" /> Speed:
            </span>
            {[0.5, 1, 1.5].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-1.5 py-0.5 rounded ${speed === s ? 'bg-forge-lime text-black font-bold' : 'text-gray-400 hover:text-white'}`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Target Muscles & Form Checklist */}
      <div className="p-3 space-y-2.5">
        {/* Muscle Tags */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1">
            <Zap className="w-3 h-3 text-forge-lime" /> Target:
          </span>
          {media.muscles.map((m, i) => (
            <span
              key={i}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-charcoal-800 text-gray-300 border border-charcoal-700"
            >
              {m}
            </span>
          ))}
        </div>

        {/* Biomechanical Cues */}
        <div className="space-y-1 pt-1">
          {media.cues.map((cue, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-[11px] text-gray-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-forge-lime shrink-0 mt-0.5" />
              <span>{cue}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
