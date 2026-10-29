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
        const dipY = cycle * 36;
        const benchX = 250;
        const hipY = 150 + dipY;
        const shoulderY = 118 + dipY;
        const elbowX = 242 + dipY * 0.15;
        const elbowY = 126 + dipY * 0.85;
        const kneeY = 175 + dipY * 0.2;
        return (
          <g>
            {/* Ground */}
            <line x1="50" y1="210" x2="350" y2="210" stroke="#1F2631" strokeWidth="3" strokeDasharray="6 4" />
            
            {/* Bench */}
            <rect x={benchX} y="135" width="60" height="75" rx="6" fill="#1A222D" stroke="#2C3545" strokeWidth="2" />
            <rect x={benchX - 6} y="130" width="70" height="10" rx="3" fill="#334155" />

            {/* FAR LEG */}
            <line x1="215" y1={hipY} x2="175" y2={kneeY} stroke="#0284C7" strokeWidth="8" strokeLinecap="round" />
            <circle cx="175" cy={kneeY} r="4.5" fill="#0284C7" />
            <line x1="175" y1={kneeY} x2="135" y2="208" stroke="#0284C7" strokeWidth="7" strokeLinecap="round" />
            <circle cx="135" cy="208" r="4" fill="#0284C7" />

            {/* FAR ARM on Bench */}
            <line x1="222" y1={shoulderY} x2={elbowX - 8} y2={elbowY} stroke="#0284C7" strokeWidth="7" strokeLinecap="round" />
            <circle cx={elbowX - 8} cy={elbowY} r="4.5" fill="#0284C7" />
            <line x1={elbowX - 8} y1={elbowY} x2={benchX} y2="132" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
            <circle cx={benchX} cy="132" r="3.5" fill="#0284C7" />

            {/* TORSO */}
            <line 
              x1="220" 
              y1={hipY} 
              x2="224" 
              y2={shoulderY} 
              stroke={viewMode === 'muscles' ? '#00F0FF' : '#D4FF00'} 
              strokeWidth={viewMode === 'muscles' ? '12' : '10'} 
              strokeLinecap="round" 
            />
            <circle cx="220" cy={hipY} r="7" fill="#1F2631" />
            <circle cx="224" cy={shoulderY} r="7" fill="#1F2631" />

            {/* HEAD */}
            <circle cx="224" cy={shoulderY - 18} r="13" fill="#D4FF00" />

            {/* NEAR LEG */}
            <line x1="220" y1={hipY} x2="180" y2={kneeY} stroke="#D4FF00" strokeWidth="9" strokeLinecap="round" />
            <circle cx="180" cy={kneeY} r="5" fill="#D4FF00" />
            <line x1="180" y1={kneeY} x2="140" y2="208" stroke="#D4FF00" strokeWidth="8" strokeLinecap="round" />
            <circle cx="140" cy="208" r="5" fill="#00F0FF" />

            {/* NEAR ARM on Bench */}
            <line x1="224" y1={shoulderY} x2={elbowX} y2={elbowY} stroke={viewMode === 'muscles' ? '#00F0FF' : '#D4FF00'} strokeWidth="8" strokeLinecap="round" />
            <circle cx={elbowX} cy={elbowY} r="5" fill="#D4FF00" />
            <line x1={elbowX} y1={elbowY} x2={benchX + 4} y2="132" stroke="#00F0FF" strokeWidth="7" strokeLinecap="round" />
            <circle cx={benchX + 4} cy="132" r="4" fill="#00F0FF" />

            {viewMode === 'muscles' && (
              <text x="110" y="95" fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                TRICEPS BRACHII & ANTERIOR DELTOID
              </text>
            )}
          </g>
        );
      }

      case 'crunch': {
        const curl = cycle * 28;
        const hipX = 180;
        const hipY = 195;
        const chestX = 135 - curl * 0.4;
        const chestY = 180 - curl;
        const headX = chestX - 16;
        const headY = chestY - 14;

        return (
          <g>
            <line x1="40" y1="205" x2="360" y2="205" stroke="#1F2631" strokeWidth="3" />

            {/* FAR LEG (Bent 90/90 on Floor) */}
            <line x1={hipX} y1={hipY} x2="225" y2="145" stroke="#0284C7" strokeWidth="9" strokeLinecap="round" />
            <circle cx="225" cy="145" r="5" fill="#0284C7" />
            <line x1="225" y1="145" x2="265" y2="198" stroke="#0284C7" strokeWidth="8" strokeLinecap="round" />
            <circle cx="265" cy="198" r="4.5" fill="#0284C7" />

            {/* FAR ARM Cradling Head */}
            <line x1={chestX} y1={chestY} x2={chestX - 6} y2={chestY - 16} stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
            <circle cx={chestX - 6} cy={chestY - 16} r="4" fill="#0284C7" />
            <line x1={chestX - 6} y1={chestY - 16} x2={headX} y2={headY + 2} stroke="#0284C7" strokeWidth="5" strokeLinecap="round" />

            {/* TORSO CURL */}
            <line 
              x1={hipX} 
              y1={hipY} 
              x2={chestX} 
              y2={chestY} 
              stroke={viewMode === 'muscles' ? '#00F0FF' : '#D4FF00'} 
              strokeWidth={viewMode === 'muscles' ? '12' : '10'} 
              strokeLinecap="round" 
            />
            <circle cx={hipX} cy={hipY} r="7" fill="#1F2631" />
            <circle cx={chestX} cy={chestY} r="7" fill="#1F2631" />

            {/* HEAD */}
            <circle cx={headX} cy={headY} r="13" fill="#D4FF00" />

            {/* NEAR LEG */}
            <line x1={hipX} y1={hipY} x2="230" y2="148" stroke="#D4FF00" strokeWidth="10" strokeLinecap="round" />
            <circle cx="230" cy="148" r="5" fill="#D4FF00" />
            <line x1="230" y1="148" x2="270" y2="200" stroke="#D4FF00" strokeWidth="9" strokeLinecap="round" />
            <circle cx="270" cy="200" r="5" fill="#00F0FF" />

            {/* NEAR ARM Cradling Head */}
            <line x1={chestX} y1={chestY} x2={chestX} y2={chestY - 18} stroke="#00F0FF" strokeWidth="7" strokeLinecap="round" />
            <circle cx={chestX} cy={chestY - 18} r="4.5" fill="#D4FF00" />
            <line x1={chestX} y1={chestY - 18} x2={headX} y2={headY} stroke="#00F0FF" strokeWidth="6" strokeLinecap="round" />

            {viewMode === 'muscles' && (
              <text x="130" y="110" fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                RECTUS ABDOMINIS [CONCENTRIC CRUNCH]
              </text>
            )}
          </g>
        );
      }

      case 'leg-raise': {
        const angle = cycle * (Math.PI / 2.3); // 0 to ~78 degrees
        const hipX = 180;
        const hipY = 195;
        const shoulderX = 265;
        const shoulderY = 195;
        const headX = 290;
        const headY = 192;
        const legLength = 85;
        const footX = hipX - Math.cos(angle) * legLength;
        const footY = hipY - Math.sin(angle) * legLength;
        const kneeX = hipX - Math.cos(angle) * (legLength * 0.55);
        const kneeY = hipY - Math.sin(angle) * (legLength * 0.55);

        return (
          <g>
            <line x1="40" y1="205" x2="360" y2="205" stroke="#1F2631" strokeWidth="3" />

            {/* FAR ARM on Mat */}
            <line x1={shoulderX} y1={shoulderY} x2="220" y2="198" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
            <circle cx="220" cy="198" r="4" fill="#0284C7" />

            {/* FAR LEG (Raising Behind) */}
            <line x1={hipX} y1={hipY} x2={kneeX - 4} y2={kneeY - 2} stroke="#0284C7" strokeWidth="9" strokeLinecap="round" />
            <circle cx={kneeX - 4} cy={kneeY - 2} r="4.5" fill="#0284C7" />
            <line x1={kneeX - 4} y1={kneeY - 2} x2={footX - 4} y2={footY - 2} stroke="#0284C7" strokeWidth="8" strokeLinecap="round" />
            <circle cx={footX - 4} cy={footY - 2} r="4" fill="#0284C7" />

            {/* TORSO FLAT ON MAT */}
            <line 
              x1={hipX} 
              y1={hipY} 
              x2={shoulderX} 
              y2={shoulderY} 
              stroke={viewMode === 'muscles' ? '#00F0FF' : '#D4FF00'} 
              strokeWidth={viewMode === 'muscles' ? '12' : '10'} 
              strokeLinecap="round" 
            />
            <circle cx={hipX} cy={hipY} r="7" fill="#1F2631" />
            <circle cx={shoulderX} cy={shoulderY} r="7" fill="#1F2631" />

            {/* HEAD */}
            <circle cx={headX} cy={headY} r="13" fill="#D4FF00" />

            {/* NEAR ARM Planted on Mat */}
            <line x1={shoulderX} y1={shoulderY} x2="225" y2="200" stroke="#00F0FF" strokeWidth="7" strokeLinecap="round" />
            <circle cx="225" cy="200" r="4.5" fill="#00F0FF" />

            {/* NEAR LEG (Raising In Synchrony) */}
            <line x1={hipX} y1={hipY} x2={kneeX} y2={kneeY} stroke="#D4FF00" strokeWidth="10" strokeLinecap="round" />
            <circle cx={kneeX} cy={kneeY} r="5" fill="#D4FF00" />
            <line x1={kneeX} y1={kneeY} x2={footX} y2={footY} stroke="#D4FF00" strokeWidth="9" strokeLinecap="round" />
            <circle cx={footX} cy={footY} r="5" fill="#00F0FF" />

            {viewMode === 'muscles' && (
              <text x="120" y="100" fill="#D4FF00" fontSize="9" fontFamily="monospace" fontWeight="bold">
                LOWER RECTUS ABDOMINIS & PSOAS
              </text>
            )}
          </g>
        );
      }

      case 'jumping-jack': {
        const spread = cycle * 35;
        const armAngle = cycle * 65;
        const hipY = 135 - cycle * 8;
        const shoulderY = 85 - cycle * 8;
        return (
          <g>
            <line x1="50" y1="210" x2="350" y2="210" stroke="#1F2631" strokeWidth="3" strokeDasharray="6 4" />
            
            {/* HEAD */}
            <circle cx="200" cy={shoulderY - 22} r="14" fill="#D4FF00" />

            {/* TORSO */}
            <line 
              x1="200" 
              y1={shoulderY} 
              x2="200" 
              y2={hipY} 
              stroke={viewMode === 'muscles' ? '#00F0FF' : '#D4FF00'} 
              strokeWidth={viewMode === 'muscles' ? '12' : '10'} 
              strokeLinecap="round" 
            />
            <circle cx="200" cy={shoulderY} r="7" fill="#1F2631" />
            <circle cx="200" cy={hipY} r="7" fill="#1F2631" />

            {/* LEFT LEG */}
            <line x1="200" y1={hipY} x2={180 - spread * 0.5} y2="175" stroke="#D4FF00" strokeWidth="9" strokeLinecap="round" />
            <circle cx={180 - spread * 0.5} cy="175" r="5" fill="#D4FF00" />
            <line x1={180 - spread * 0.5} y1="175" x2={165 - spread} y2="208" stroke="#D4FF00" strokeWidth="8" strokeLinecap="round" />
            <circle cx={165 - spread} cy="208" r="5" fill="#00F0FF" />

            {/* RIGHT LEG */}
            <line x1="200" y1={hipY} x2={220 + spread * 0.5} y2="175" stroke="#D4FF00" strokeWidth="9" strokeLinecap="round" />
            <circle cx={220 + spread * 0.5} cy="175" r="5" fill="#D4FF00" />
            <line x1={220 + spread * 0.5} y1="175" x2={235 + spread} y2="208" stroke="#D4FF00" strokeWidth="8" strokeLinecap="round" />
            <circle cx={235 + spread} cy="208" r="5" fill="#00F0FF" />

            {/* LEFT ARM */}
            <line x1="200" y1={shoulderY} x2={160 - spread * 0.6} y2={110 - armAngle * 0.5} stroke="#00F0FF" strokeWidth="8" strokeLinecap="round" />
            <circle cx={160 - spread * 0.6} cy={110 - armAngle * 0.5} r="4.5" fill="#00F0FF" />
            <line x1={160 - spread * 0.6} y1={110 - armAngle * 0.5} x2={145 - spread * 0.8} y2={100 - armAngle} stroke="#00F0FF" strokeWidth="7" strokeLinecap="round" />
            <circle cx={145 - spread * 0.8} cy={100 - armAngle} r="4.5" fill="#D4FF00" />

            {/* RIGHT ARM */}
            <line x1="200" y1={shoulderY} x2={240 + spread * 0.6} y2={110 - armAngle * 0.5} stroke="#00F0FF" strokeWidth="8" strokeLinecap="round" />
            <circle cx={240 + spread * 0.6} cy={110 - armAngle * 0.5} r="4.5" fill="#00F0FF" />
            <line x1={240 + spread * 0.6} y1={110 - armAngle * 0.5} x2={255 + spread * 0.8} y2={100 - armAngle} stroke="#00F0FF" strokeWidth="7" strokeLinecap="round" />
            <circle cx={255 + spread * 0.8} cy={100 - armAngle} r="4.5" fill="#D4FF00" />

            {viewMode === 'muscles' && (
              <text x="130" y="55" fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                CALVES, DELTOIDS & CARDIOVASCULAR
              </text>
            )}
          </g>
        );
      }

      case 'burpee': {
        const p = (phase / (Math.PI * 2)) % 1;
        let hipX = 200, hipY = 145, shoulderX = 200, shoulderY = 85;
        let kneeX = 200, kneeY = 175, footX = 200, footY = 205;
        let elbowX = 180, elbowY = 110, handX = 170, handY = 135;

        if (p < 0.25) {
          // Standing to squat drop
          const t = p / 0.25;
          hipY = 120 + t * 45;
          shoulderY = 65 + t * 45;
          kneeX = 215 + t * 15;
          kneeY = 165;
          handY = 115 + t * 85;
        } else if (p < 0.5) {
          // Plank kickout
          hipX = 180; hipY = 155;
          shoulderX = 275; shoulderY = 145;
          kneeX = 140; kneeY = 175;
          footX = 105; footY = 200;
          elbowX = 275; elbowY = 172;
          handX = 275; handY = 200;
        } else if (p < 0.75) {
          // Pushup on floor
          const t = (p - 0.5) / 0.25;
          const drop = Math.sin(t * Math.PI) * 20;
          hipX = 180; hipY = 155 + drop * 0.6;
          shoulderX = 275; shoulderY = 145 + drop;
          kneeX = 140; kneeY = 175;
          footX = 105; footY = 200;
          elbowX = 290 + drop * 0.3; elbowY = 160 + drop * 0.4;
          handX = 275; handY = 200;
        } else {
          // Jump up
          const t = (p - 0.75) / 0.25;
          const jump = Math.sin(t * Math.PI) * 40;
          hipX = 200; hipY = 135 - jump;
          shoulderX = 200; shoulderY = 80 - jump;
          kneeX = 200; kneeY = 170 - jump;
          footX = 200; footY = 205 - jump;
          elbowX = 220; elbowY = 70 - jump;
          handX = 225; handY = 50 - jump;
        }

        return (
          <g>
            <line x1="50" y1="205" x2="350" y2="205" stroke="#1F2631" strokeWidth="3" strokeDasharray="6 4" />

            {/* FAR LEG */}
            <line x1={hipX} y1={hipY} x2={kneeX - 6} y2={kneeY} stroke="#0284C7" strokeWidth="8" strokeLinecap="round" />
            <circle cx={kneeX - 6} cy={kneeY} r="4.5" fill="#0284C7" />
            <line x1={kneeX - 6} y1={kneeY} x2={footX - 6} y2={footY} stroke="#0284C7" strokeWidth="7" strokeLinecap="round" />

            {/* FAR ARM */}
            <line x1={shoulderX} y1={shoulderY} x2={elbowX - 6} y2={elbowY} stroke="#0284C7" strokeWidth="7" strokeLinecap="round" />
            <circle cx={elbowX - 6} cy={elbowY} r="4" fill="#0284C7" />
            <line x1={elbowX - 6} y1={elbowY} x2={handX - 6} y2={handY} stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />

            {/* TORSO */}
            <line 
              x1={hipX} 
              y1={hipY} 
              x2={shoulderX} 
              y2={shoulderY} 
              stroke={viewMode === 'muscles' ? '#00F0FF' : '#D4FF00'} 
              strokeWidth={viewMode === 'muscles' ? '12' : '10'} 
              strokeLinecap="round" 
            />
            <circle cx={hipX} cy={hipY} r="7" fill="#1F2631" />
            <circle cx={shoulderX} cy={shoulderY} r="7" fill="#1F2631" />

            {/* HEAD */}
            <circle cx={shoulderX + (shoulderX > hipX ? 20 : 0)} cy={shoulderY - 18} r="13" fill="#D4FF00" />

            {/* NEAR LEG */}
            <line x1={hipX} y1={hipY} x2={kneeX} y2={kneeY} stroke="#D4FF00" strokeWidth="9" strokeLinecap="round" />
            <circle cx={kneeX} cy={kneeY} r="5" fill="#D4FF00" />
            <line x1={kneeX} y1={kneeY} x2={footX} y2={footY} stroke="#D4FF00" strokeWidth="8" strokeLinecap="round" />
            <circle cx={footX} cy={footY} r="5" fill="#00F0FF" />

            {/* NEAR ARM */}
            <line x1={shoulderX} y1={shoulderY} x2={elbowX} y2={elbowY} stroke="#00F0FF" strokeWidth="8" strokeLinecap="round" />
            <circle cx={elbowX} cy={elbowY} r="4.5" fill="#D4FF00" />
            <line x1={elbowX} y1={elbowY} x2={handX} y2={handY} stroke="#00F0FF" strokeWidth="7" strokeLinecap="round" />
            <circle cx={handX} cy={handY} r="4.5" fill="#00F0FF" />

            {viewMode === 'muscles' && (
              <text x="120" y="45" fill="#00F0FF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                ANAEROBIC FULL-BODY EXPLOSION
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
