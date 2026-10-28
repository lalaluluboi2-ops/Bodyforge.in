import { Workout } from '../types';

export const WORKOUT_DATABASE: Workout[] = [
  // 1. CHEST / FULL BODY HYPERTROPHY
  {
    id: 'chest-armor-foundations',
    title: 'Pectoral Armor',
    subtitle: 'Chest & Tricep Hypertrophy',
    description: 'A focused bodyweight chest sculpt using biomechanically matched incline and standard push-up cadences. No benches or weights needed.',
    category: 'Muscle Building',
    difficulty: 'Intermediate',
    estimatedMinutes: 16,
    targetMuscles: ['Chest', 'Arms & Triceps', 'Shoulders'],
    bannerGradient: 'from-amber-600/30 to-charcoal-900',
    precautions: [
      'Maintain continuous core tension to protect the lumbar spine.',
      'Stop if you experience anterior shoulder impingement or wrist pinching.'
    ],
    postureCues: [
      'Lock hips and glutes in a straight neutral plank.',
      'Maintain a neutral cervical spine (eyes on the floor, not looking forward).'
    ],
    breathingInstructions: 'Inhale steadily on the descent (eccentric); exhale forcefully through pursed lips on the press (concentric).',
    warmupMinutes: 3,
    cooldownMinutes: 2,
    whenToStopWarnings: [
      'Sudden sharp or burning shoulder joint pain.',
      'Wrist sharp compression or numbness in fingers.',
      'Lightheadedness or dizziness.'
    ],
    exercises: [
      {
        id: 'std-pushup-1',
        name: 'Standard Form Push-Ups',
        targetMuscles: ['Chest', 'Arms & Triceps', 'Shoulders'],
        sets: 3,
        reps: 12,
        restSeconds: 30,
        instructions: [
          'Place hands slightly wider than shoulder-width, fingers spread forward.',
          'Brace glutes and core so your spine forms an unbroken straight beam.',
          'Lower chest under control until 2 inches above the ground with elbows at a 45-degree angle.',
          'Drive firmly through your palms to return to the locked out top position.'
        ],
        formCues: ['Screw palms into the floor', 'Keep neck neutral, do not tuck chin to chest'],
        mistakesToAvoid: ['Flaring elbows 90 degrees out', 'Sagging hips'],
        beginnerModification: 'Perform with knees resting on floor, maintaining straight hips.',
        animationType: 'pushup'
      },
      {
        id: 'diamond-pushup',
        name: 'Close-Grip Diamond Press',
        targetMuscles: ['Arms & Triceps', 'Chest'],
        sets: 3,
        reps: 10,
        restSeconds: 30,
        instructions: [
          'Bring index fingers and thumbs together under the center of your chest.',
          'Lower down slowly, keeping elbows tucked close against your ribs.',
          'Press upwards focusing on contracting the tricep heads at the apex.'
        ],
        formCues: ['Keep elbows tucked', 'Maintain rigid abdominal tension'],
        mistakesToAvoid: ['Hyperextending lower back', 'Letting hands shift above head'],
        beginnerModification: 'Place hands 6 inches apart instead of touching.',
        animationType: 'pushup'
      },
      {
        id: 'bench-dips-1',
        name: 'Chair / Bench Tricep Dips',
        targetMuscles: ['Arms & Triceps', 'Shoulders'],
        sets: 3,
        reps: 12,
        restSeconds: 30,
        instructions: [
          'Place palms on edge of a chair or couch with fingers facing forward.',
          'Walk feet out with knees bent (or straight legs for advanced resistance).',
          'Lower hips by bending elbows to 90 degrees, keeping back close to chair.',
          'Drive through palms to full arm extension.'
        ],
        formCues: ['Keep shoulders depressed down, away from ears', 'Track elbows straight back'],
        mistakesToAvoid: ['Flaring elbows wide', 'Shrugging shoulders upward'],
        beginnerModification: 'Keep knees bent at 90 degrees with feet flat on floor.',
        animationType: 'dips'
      }
    ]
  },

  // 2. SIX-PACK & CORE STRENGTHENING
  {
    id: 'core-forge-iron',
    title: 'Six-Pack Matrix & Deep Core',
    subtitle: 'Abdominal Definition & Transverse Control',
    description: 'Stabilize your lower back, improve pelvic tilt, and build an athletic six-pack with targeted isometric holds and rotational control.',
    category: 'Six-Pack & Core',
    difficulty: 'Beginner',
    estimatedMinutes: 14,
    targetMuscles: ['Abs & Core'],
    bannerGradient: 'from-emerald-600/30 to-charcoal-900',
    precautions: [
      'Do not yank on the neck during crunches.',
      'Press lower back into the floor during leg raises to eliminate shear load.'
    ],
    postureCues: [
      'Active posterior pelvic tilt (flatten lower back toward floor).',
      'Draw navel inward to brace the transverse abdominis.'
    ],
    breathingInstructions: 'Exhale completely at the top of contraction; inhale deeply during the eccentric lowering phase.',
    warmupMinutes: 2,
    cooldownMinutes: 2,
    whenToStopWarnings: [
      'Sharp pain in the lower lumbar vertebrae.',
      'Groin pinching or hip clicking accompanied by pain.'
    ],
    exercises: [
      {
        id: 'forearm-plank',
        name: 'Elbow Plank Stabilization',
        targetMuscles: ['Abs & Core', 'Shoulders'],
        sets: 3,
        durationSeconds: 45,
        restSeconds: 25,
        instructions: [
          'Rest on forearms with elbows directly under shoulders.',
          'Tuck pelvis into posterior tilt, squeezing glutes tightly.',
          'Breathe deeply while pulling elbows toward toes isometrically.'
        ],
        formCues: ['Squeeze glutes', 'Push floor away through shoulder blades'],
        mistakesToAvoid: ['Dropping lower back', 'Piking hips into the air'],
        beginnerModification: 'Hold for 20 seconds, rest 10 seconds, then hold for 20 seconds.',
        animationType: 'plank'
      },
      {
        id: 'hollow-crunches',
        name: 'Controlled Abdominal Crunches',
        targetMuscles: ['Abs & Core'],
        sets: 3,
        reps: 15,
        restSeconds: 25,
        instructions: [
          'Lie on back with knees bent at 90 degrees and feet flat.',
          'Place fingertips lightly behind ears without pulling neck.',
          'Curl ribcage toward pelvis by contracting the rectus abdominis.',
          'Hold peak contraction for 1 second before lowering slowly.'
        ],
        formCues: ['Look up toward the ceiling', 'Initiate from ribs, not neck'],
        mistakesToAvoid: ['Pulling head with hands', 'Arching lower back off floor'],
        beginnerModification: 'Place hands on thighs and slide them toward knees.',
        animationType: 'crunch'
      },
      {
        id: 'hanging-leg-raise-floor',
        name: 'Floor Leg Raises',
        targetMuscles: ['Abs & Core'],
        sets: 3,
        reps: 12,
        restSeconds: 30,
        instructions: [
          'Lie flat on back with palms pressed firmly beside hips.',
          'Keep legs straight and raise them together until perpendicular to floor.',
          'Lower legs under control until heels hover 2 inches above the ground.'
        ],
        formCues: ['Glue lower back into the mat', 'Control the 3-second descent'],
        mistakesToAvoid: ['Letting lower back arch off floor', 'Swinging legs with momentum'],
        beginnerModification: 'Perform with bent knees (reverse knee tucks).',
        animationType: 'leg-raise'
      }
    ]
  },

  // 3. WEIGHT MANAGEMENT / METABOLIC CONDITIONING
  {
    id: 'metabolic-fat-burn',
    title: 'Metabolic Fat-Burn Engine',
    subtitle: 'High-Calorie Calisthenics Circuit',
    description: 'Dynamic full-body intervals designed to elevate heart rate, increase oxygen consumption, and maximize post-exercise caloric expenditure.',
    category: 'Weight Management',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    targetMuscles: ['Full Body', 'Legs & Glutes', 'Abs & Core'],
    bannerGradient: 'from-orange-600/30 to-charcoal-900',
    precautions: [
      'Pace your cadence early so you can complete all rounds with clean form.',
      'Ensure adequate hydration before and during training.'
    ],
    postureCues: [
      'Land softly on the balls of your feet during plyometric movements.',
      'Maintain an athletic tall chest during lunges and squats.'
    ],
    breathingInstructions: 'Maintain rhythmic, deep nasal-oral breathing. Do not hold your breath during rapid reps.',
    warmupMinutes: 3,
    cooldownMinutes: 3,
    whenToStopWarnings: [
      'Chest tightness, fluttering, or shortness of breath out of proportion to effort.',
      'Feeling dizzy, nauseated, or clammy.'
    ],
    exercises: [
      {
        id: 'jumping-jacks-hiit',
        name: 'Athletic Jumping Jacks',
        targetMuscles: ['Full Body', 'Legs & Glutes'],
        sets: 3,
        durationSeconds: 45,
        restSeconds: 20,
        instructions: [
          'Start standing tall with feet together and arms at sides.',
          'Jump feet outwards while raising arms smoothly overhead.',
          'Jump back to starting position in a steady rhythmic cadence.'
        ],
        formCues: ['Land lightly on midfoot', 'Keep knees slightly soft'],
        mistakesToAvoid: ['Heavy heel stomping', 'Slouching forward'],
        beginnerModification: 'Step one foot out to the side at a time without jumping.',
        animationType: 'jumping-jack'
      },
      {
        id: 'burpee-interval',
        name: 'Full-Body Burpee Surge',
        targetMuscles: ['Full Body', 'Chest', 'Legs & Glutes', 'Abs & Core'],
        sets: 3,
        reps: 10,
        restSeconds: 35,
        instructions: [
          'From standing, drop into a squat and plant palms on the floor.',
          'Kick feet back into a pushup plank position.',
          'Hop feet back up to hands and explosively stand tall with arms reaching upward.'
        ],
        formCues: ['Keep core tight in plank', 'Jump smoothly without jarring knees'],
        mistakesToAvoid: ['Sagging lower back in plank', 'Dropping head'],
        beginnerModification: 'Step back into plank one foot at a time without the final jump.',
        animationType: 'burpee'
      },
      {
        id: 'mountain-climbers-fast',
        name: 'Rapid Mountain Climbers',
        targetMuscles: ['Abs & Core', 'Legs & Glutes', 'Shoulders'],
        sets: 3,
        durationSeconds: 40,
        restSeconds: 25,
        instructions: [
          'Begin in strong high plank position with hands under shoulders.',
          'Drive knees rhythmically toward chest like sprinting in place.',
          'Keep hips level and spine rigid.'
        ],
        formCues: ['Do not let hips hike into the air', 'Press floor away through palms'],
        mistakesToAvoid: ['Bouncing hips up and down', 'Holding breath'],
        beginnerModification: 'Perform at half speed with deliberate knee tucks.',
        animationType: 'mountain-climber'
      }
    ]
  },

  // 4. CARDIO & CONDITIONING
  {
    id: 'cardio-hiit-storm',
    title: 'Aerobic Cardio Storm',
    subtitle: 'Heart-Rate & Stamina Elevation',
    description: 'High-cadence bodyweight cardio intervals to boost VO2 max, athletic conditioning, and cardiovascular resilience without machines.',
    category: 'Cardio & Conditioning',
    difficulty: 'Intermediate',
    estimatedMinutes: 15,
    targetMuscles: ['Full Body', 'Legs & Glutes'],
    bannerGradient: 'from-rose-600/30 to-charcoal-900',
    precautions: [
      'Wear supportive athletic shoes or train on a non-slip mat.',
      'Check heart rate and take extra rest if recovery feels sluggish.'
    ],
    postureCues: [
      'Stay light on your feet; avoid heel jarring.',
      'Pump arms rhythmically in coordination with knee drives.'
    ],
    breathingInstructions: 'Focus on 2-step inhale and 2-step exhale cadence.',
    warmupMinutes: 2,
    cooldownMinutes: 3,
    whenToStopWarnings: [
      'Chest pressure or radiation into jaw or left arm (seek emergency care).',
      'Loss of coordination or blurry vision.'
    ],
    exercises: [
      {
        id: 'high-knees-cardio',
        name: 'High Knee Sprint Drive',
        targetMuscles: ['Legs & Glutes', 'Abs & Core'],
        sets: 3,
        durationSeconds: 35,
        restSeconds: 25,
        instructions: [
          'Stand in place and drive knees up toward hip level alternately.',
          'Pump arms aggressively in opposition to leg drive.',
          'Stay on the balls of your feet with active core engagement.'
        ],
        formCues: ['Chest remains proud and upright', 'Thighs reach parallel to floor'],
        mistakesToAvoid: ['Leaning backward excessively', 'Slapping feet down heavily'],
        beginnerModification: 'Perform marching high knees without jumping.',
        animationType: 'high-knees'
      },
      {
        id: 'squat-pulse-cardio',
        name: 'Deep Squat Tempo Burner',
        targetMuscles: ['Legs & Glutes'],
        sets: 3,
        reps: 18,
        restSeconds: 30,
        instructions: [
          'Feet shoulder-width apart, toes slightly flared.',
          'Descend smoothly to parallel depth, hold for a half second.',
          'Drive up forcefully through midfoot to full standing lockout.'
        ],
        formCues: ['Knees track over pinky toes', 'Keep torso steady'],
        mistakesToAvoid: ['Knees collapsing inward', 'Heels lifting'],
        beginnerModification: 'Squat to bench depth.',
        animationType: 'squat'
      }
    ]
  },

  // 5. HOME WORKOUTS (ZERO EQUIPMENT)
  {
    id: 'home-zero-equipment',
    title: 'Living Room Sovereign',
    subtitle: '100% Floor & Bodyweight Blueprint',
    description: 'Designed specifically for home spaces with limited room. Compact movements targeting legs, core, and upper torso with zero clatter.',
    category: 'Home Workouts',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    targetMuscles: ['Full Body', 'Chest', 'Legs & Glutes', 'Abs & Core'],
    bannerGradient: 'from-cyan-600/30 to-charcoal-900',
    precautions: [
      'Ensure a clear 6x6 foot area free of furniture edges.',
      'Use a yoga mat or carpet to cushion wrists and elbows.'
    ],
    postureCues: [
      'Maintain continuous body alignment from cranium to heels.'
    ],
    breathingInstructions: 'Breathe through the nose into the lower ribs to maintain parasympathetic calm.',
    warmupMinutes: 2,
    cooldownMinutes: 2,
    whenToStopWarnings: ['Sharp joint pinch in knees or lower back.'],
    exercises: [
      {
        id: 'home-pushups',
        name: 'Quiet Floor Push-Ups',
        targetMuscles: ['Chest', 'Arms & Triceps', 'Shoulders'],
        sets: 3,
        reps: 10,
        restSeconds: 30,
        instructions: [
          'Place palms beneath shoulders with elbows tucked at 45 degrees.',
          'Lower smoothly for 2 seconds, pause, then press upward.'
        ],
        formCues: ['Keep spine rigid like an iron bar'],
        mistakesToAvoid: ['Arching lower back'],
        beginnerModification: 'Perform incline pushups against a wall or couch.',
        animationType: 'pushup'
      },
      {
        id: 'home-lunges',
        name: 'Alternating Reverse Lunges',
        targetMuscles: ['Legs & Glutes'],
        sets: 3,
        reps: 14,
        restSeconds: 25,
        instructions: [
          'Step one foot straight back, dropping rear knee toward the floor.',
          'Ensure front shin stays vertical and front heel stays planted.',
          'Drive through front heel to return to standing.'
        ],
        formCues: ['Keep torso tall', 'Front knee stays behind front toes'],
        mistakesToAvoid: ['Banging back knee against the floor'],
        beginnerModification: 'Hold a wall or chair for balance support.',
        animationType: 'lunge'
      },
      {
        id: 'home-plank',
        name: 'Pencil Plank Hold',
        targetMuscles: ['Abs & Core'],
        sets: 3,
        durationSeconds: 40,
        restSeconds: 25,
        instructions: [
          'Support body on elbows and toes with glutes clenched hard.',
          'Pull navel toward spine and breathe steadily.'
        ],
        formCues: ['Push shoulders down and back'],
        mistakesToAvoid: ['Holding breath'],
        beginnerModification: 'Rest knees on floor while keeping straight hips.',
        animationType: 'plank'
      }
    ]
  },

  // 6. GYM & ATHLETIC WORKOUTS
  {
    id: 'gym-athletic-strength',
    title: 'Gym & Calisthenics Strength',
    subtitle: 'Max-Tension Compound Movement',
    description: 'High-intensity athletic progressions utilizing mechanical leverage changes to trigger maximal motor unit recruitment and dense muscle growth.',
    category: 'Gym & Athletic Workouts',
    difficulty: 'Advanced',
    estimatedMinutes: 22,
    targetMuscles: ['Chest', 'Arms & Triceps', 'Shoulders', 'Legs & Glutes', 'Abs & Core'],
    bannerGradient: 'from-purple-600/30 to-charcoal-900',
    precautions: [
      'Warm up shoulders thoroughly with arm circles before max sets.',
      'Control the 3-second eccentric tempo on every repetition.'
    ],
    postureCues: [
      'Full body irradiation: squeeze unworked muscles to amplify neural drive.'
    ],
    breathingInstructions: 'Inhale and brace diaphragm on descent; exhale powerfully past the sticking point.',
    warmupMinutes: 4,
    cooldownMinutes: 3,
    whenToStopWarnings: [
      'Sudden popping or tearing sensation in tendon insertions.',
      'Loss of control during eccentric descent.'
    ],
    exercises: [
      {
        id: 'gym-diamond-press',
        name: 'Tempo Diamond Press',
        targetMuscles: ['Arms & Triceps', 'Chest'],
        sets: 4,
        reps: 12,
        restSeconds: 45,
        instructions: [
          'Thumbs and index fingers touching directly beneath mid-sternum.',
          'Lower down for 3 seconds, pause 1 second at bottom.',
          'Press up explosively with full tricep lockout.'
        ],
        formCues: ['Elbows glide past ribcage'],
        mistakesToAvoid: ['Bouncing off chest'],
        beginnerModification: 'Standard push-ups on floor.',
        animationType: 'pushup'
      },
      {
        id: 'gym-deep-squat',
        name: 'Full Depth Pistol/Deep Squat',
        targetMuscles: ['Legs & Glutes'],
        sets: 4,
        reps: 15,
        restSeconds: 40,
        instructions: [
          'Descend into complete below-parallel squat with upright torso.',
          'Drive through mid-foot and engage glutes at the peak.'
        ],
        formCues: ['Chest high', 'Knees tracking outside'],
        mistakesToAvoid: ['Heels rising'],
        beginnerModification: 'Squat to 90 degrees with chair behind.',
        animationType: 'squat'
      },
      {
        id: 'gym-burpee-strike',
        name: 'Power Burpee Thrust',
        targetMuscles: ['Full Body'],
        sets: 3,
        reps: 12,
        restSeconds: 40,
        instructions: [
          'Drop to chest-to-deck pushup, snap feet forward, jump high.'
        ],
        formCues: ['Explosive vertical jump'],
        mistakesToAvoid: ['Landing with stiff locked knees'],
        beginnerModification: 'Omit pushup and perform standard up-downs.',
        animationType: 'burpee'
      }
    ]
  },

  // 7. YOGA & FLEXIBILITY
  {
    id: 'yoga-spinal-flow',
    title: 'Spinal Decompression & Warrior Flow',
    subtitle: 'Mobility, Flexibility & Vagus Relaxation',
    description: 'Restore joint freedom, lengthen tight hip flexors and pectorals, and recalibrate your autonomic nervous system after hard training.',
    category: 'Yoga & Flexibility',
    difficulty: 'Beginner',
    estimatedMinutes: 16,
    targetMuscles: ['Back', 'Neck & Posture', 'Legs & Glutes'],
    bannerGradient: 'from-teal-600/30 to-charcoal-900',
    precautions: [
      'Move only into comfortable stretch ranges—never force joints into pain.',
      'Maintain fluid breathing throughout all posture holds.'
    ],
    postureCues: [
      'Elongate the crown of the head away from the tailbone.',
      'Keep shoulder blades gliding smoothly down the back.'
    ],
    breathingInstructions: 'Slow 4-second nasal inhalation followed by relaxed 6-second exhalation to stimulate vagal tone.',
    warmupMinutes: 2,
    cooldownMinutes: 2,
    whenToStopWarnings: [
      'Numbness, tingling, or electric sensations radiating down limbs.',
      'Sharp spinal pinching during extension.'
    ],
    exercises: [
      {
        id: 'cat-cow-flow',
        name: 'Cat-Cow Spinal Articulation',
        targetMuscles: ['Back', 'Neck & Posture'],
        sets: 3,
        durationSeconds: 50,
        restSeconds: 20,
        instructions: [
          'On hands and knees, inhale as you tilt pelvis up and arch spine down (Cow).',
          'Exhale as you tuck chin to chest and round spine toward ceiling (Cat).',
          'Flow continuously in synchronization with your breath.'
        ],
        formCues: ['Segmental spinal motion', 'Relax neck completely in Cat'],
        mistakesToAvoid: ['Forceful hyperextension', 'Locking elbows stiffly'],
        beginnerModification: 'Reduce range of motion and move slowly.',
        animationType: 'cat-cow'
      },
      {
        id: 'cobra-stretch-flow',
        name: 'Prone Cobra Chest & Spine Opener',
        targetMuscles: ['Back', 'Chest', 'Neck & Posture'],
        sets: 3,
        durationSeconds: 45,
        restSeconds: 20,
        instructions: [
          'Lie prone on stomach with palms planted beside lower ribs.',
          'Gently press through hands to lift head and chest off the floor.',
          'Keep pelvis grounded and pull shoulder blades down and together.'
        ],
        formCues: ['Lengthen neck', 'Squeeze upper back muscles'],
        mistakesToAvoid: ['Over-compressing lower lumbar spine'],
        beginnerModification: 'Rest on forearms (Sphinx pose).',
        animationType: 'cobra-stretch'
      },
      {
        id: 'warrior-pose-flow',
        name: 'Warrior II Balance & Hip Opener',
        targetMuscles: ['Legs & Glutes', 'Shoulders'],
        sets: 2,
        durationSeconds: 40,
        restSeconds: 20,
        instructions: [
          'Step feet wide apart. Turn front foot forward 90 degrees and back foot 45 degrees.',
          'Bend front knee to 90 degrees while keeping back leg straight.',
          'Extend arms out parallel to floor and gaze calmly over front fingertips.'
        ],
        formCues: ['Front knee tracks over second toe', 'Keep torso centered between legs'],
        mistakesToAvoid: ['Leaning forward over front leg', 'Collapsing back arch'],
        beginnerModification: 'Reduce stance width and bend knee shallower.',
        animationType: 'warrior-pose'
      }
    ]
  },

  // 8. PURE STRENGTH TRAINING
  {
    id: 'pure-bodyweight-strength',
    title: 'Absolute Calisthenics Strength',
    subtitle: 'Low-Rep High-Tension Power',
    description: 'Master strict leverage and maximize muscular recruitment. Built for athletes who want real pound-for-pound bodyweight strength.',
    category: 'Strength Training',
    difficulty: 'Advanced',
    estimatedMinutes: 20,
    targetMuscles: ['Chest', 'Arms & Triceps', 'Back', 'Legs & Glutes', 'Abs & Core'],
    bannerGradient: 'from-red-600/30 to-charcoal-900',
    precautions: [
      'Take full prescribed rest periods between heavy strength efforts.',
      'Ensure warm-up is completed before working sets.'
    ],
    postureCues: [
      'Full body tension on every rep: squeeze hands, core, quads, and glutes.'
    ],
    breathingInstructions: 'Inhale before starting descent; hold brief valsalva brace through bottom; exhale on ascent.',
    warmupMinutes: 4,
    cooldownMinutes: 3,
    whenToStopWarnings: ['Any sharp joint click with acute pain or joint instability.'],
    exercises: [
      {
        id: 'pause-pushup',
        name: 'Dead-Stop Paused Push-Ups',
        targetMuscles: ['Chest', 'Arms & Triceps', 'Shoulders'],
        sets: 4,
        reps: 8,
        restSeconds: 50,
        instructions: [
          'Lower chest all the way to floor, lift hands for a fraction of a second to eliminate elastic stretch recoil.',
          'Plant palms and press explosively back to full lockout.'
        ],
        formCues: ['Zero momentum', 'Body rises as one solid unit'],
        mistakesToAvoid: ['Snaking hips up before chest'],
        beginnerModification: 'Perform standard slow push-ups.',
        animationType: 'pushup'
      },
      {
        id: 'lunge-pulse-strength',
        name: 'Isometric Lunge Holds',
        targetMuscles: ['Legs & Glutes'],
        sets: 3,
        durationSeconds: 35,
        restSeconds: 40,
        instructions: [
          'Drop into a deep lunge with back knee hovering 1 inch off floor.',
          'Hold static tension without shifting or rising.'
        ],
        formCues: ['Keep front heel crushed into floor', 'Torso perpendicular to ground'],
        mistakesToAvoid: ['Resting rear knee on floor'],
        beginnerModification: 'Hold for 15 seconds per side.',
        animationType: 'lunge'
      },
      {
        id: 'plank-max-tension',
        name: 'RKC Hardstyle Tension Plank',
        targetMuscles: ['Abs & Core'],
        sets: 3,
        durationSeconds: 30,
        restSeconds: 40,
        instructions: [
          'In forearm plank, actively drag elbows toward toes and pull toes toward elbows with 100% effort.',
          'Clench fists into balls and squeeze glutes like stone.'
        ],
        formCues: ['Full maximum muscular contraction'],
        mistakesToAvoid: ['Relaxing core or sagging lower back'],
        beginnerModification: 'Standard 30-second plank.',
        animationType: 'plank'
      }
    ]
  },

  // 9. SPARTAN SHOULDER ARMOR & PIKE HYPERTROPHY
  {
    id: 'spartan-shoulder-pike-armor',
    title: 'Spartan Shoulder & Pike Armor',
    subtitle: 'Overhead Press & Deltoid Calisthenics',
    description: 'Transform your anterior and lateral deltoids using pure bodyweight leverage angles. Bridges the gap to handstand pushup prowess.',
    category: 'Muscle Building',
    difficulty: 'Intermediate',
    estimatedMinutes: 18,
    targetMuscles: ['Shoulders', 'Arms & Triceps', 'Chest'],
    bannerGradient: 'from-amber-500/30 via-red-600/20 to-charcoal-900',
    precautions: [
      'Warm up wrists and rotator cuffs before vertical pressing efforts.',
      'Maintain an unbroken cervical line—do not crane your neck backward.'
    ],
    postureCues: [
      'Elevate hips high over shoulders to shift resistance onto the deltoids.',
      'Lock triceps and push the floor away at lockout.'
    ],
    breathingInstructions: 'Inhale smoothly as your crown lowers toward the floor; exhale forcefully as you drive through your palms.',
    warmupMinutes: 3,
    cooldownMinutes: 2,
    whenToStopWarnings: [
      'Sharp impingement or pinching sensation in the subacromial shoulder space.',
      'Wrist sharp compression or tingling fingers.'
    ],
    exercises: [
      {
        id: 'spartan-pike-pushups',
        name: 'A-Frame Pike Push-Ups',
        targetMuscles: ['Shoulders', 'Arms & Triceps'],
        sets: 4,
        reps: 10,
        restSeconds: 40,
        instructions: [
          'Begin in a high downward-dog / A-frame with hips pushed high into the air.',
          'Lower your head forward in an equilateral triangle between and in front of your hands.',
          'Drive through the heels of your palms to push back up and return your head through your shoulders.'
        ],
        formCues: ['Track elbows back at 45 degrees', 'Stay high on toes to keep hips stacked over hands'],
        mistakesToAvoid: ['Flaring elbows straight out to sides', 'Sagging hips into standard pushup'],
        beginnerModification: 'Perform standard pushups with hands elevated on a bench or wall.',
        animationType: 'pike-pushup'
      },
      {
        id: 'spartan-diamond-lockout',
        name: 'Diamond Tricep Lockouts',
        targetMuscles: ['Arms & Triceps', 'Chest'],
        sets: 3,
        reps: 12,
        restSeconds: 35,
        instructions: [
          'Form a diamond aperture with thumbs and index fingers beneath the center of your chest.',
          'Lower chest under strict control, feeling full tricep stretch.',
          'Press up forcefully to absolute tricep extension.'
        ],
        formCues: ['Keep elbows glued close to ribcage', 'Tighten glutes like stone'],
        mistakesToAvoid: ['Hips lagging behind shoulders'],
        beginnerModification: 'Perform with knees grounded.',
        animationType: 'pushup'
      },
      {
        id: 'spartan-chair-dips',
        name: 'Deep Vertical Tricep Dips',
        targetMuscles: ['Arms & Triceps', 'Shoulders'],
        sets: 3,
        reps: 12,
        restSeconds: 35,
        instructions: [
          'Grip the edge of a chair or stable bench with arms extended.',
          'Descend until elbows reach clean 90 degrees.',
          'Drive down through your palms to achieve complete tricep contraction.'
        ],
        formCues: ['Depress shoulders down, away from ears', 'Keep spine close to chair'],
        mistakesToAvoid: ['Shrugging shoulders upward into neck'],
        beginnerModification: 'Bend knees at 90 degrees with feet flat on the floor.',
        animationType: 'dips'
      }
    ]
  },

  // 10. TITAN LEG HYPERTROPHY & PLYOMETRIC JUMP ENGINE
  {
    id: 'titan-leg-jump-engine',
    title: 'Titan Leg Hypertrophy & Jump Engine',
    subtitle: 'Quad Sweep, Glute Power & Plyo Drive',
    description: 'Build dense, athletic lower-body power without barbells. Combines deep eccentric tension, isometric burns, and explosive fast-twitch plyometrics.',
    category: 'Muscle Building',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    targetMuscles: ['Legs & Glutes', 'Full Body'],
    bannerGradient: 'from-blue-600/30 via-indigo-700/20 to-charcoal-900',
    precautions: [
      'Land softly on the midfoot with knees tracking over toes—never stiff-legged.',
      'Stop immediately if you experience sharp anterior patellar tendon pain.'
    ],
    postureCues: [
      'Drive weight evenly through tripod foot contact (heel, big toe, pinky toe).',
      'Keep your chest proud and spine neutral during every squat descent.'
    ],
    breathingInstructions: 'Inhale deeply on descent into bottom squat; exhale explosively on the vertical drive.',
    warmupMinutes: 3,
    cooldownMinutes: 3,
    whenToStopWarnings: [
      'Sharp stabbing pain behind kneecap or ankle joint.',
      'Loss of knee valgus stability (knees violently caving inward).'
    ],
    exercises: [
      {
        id: 'titan-jump-squats',
        name: 'Explosive Plyometric Jump Squats',
        targetMuscles: ['Legs & Glutes'],
        sets: 3,
        reps: 12,
        restSeconds: 45,
        instructions: [
          'Stand with feet shoulder-width apart, sink into a deep below-parallel squat.',
          'Explosively extend ankles, knees, and hips to launch vertically into the air.',
          'Land softly and immediately absorb into the next repetition without jarring knees.'
        ],
        formCues: ['Land like a feather', 'Use arm swing to maximize vertical acceleration'],
        mistakesToAvoid: ['Landing with stiff, locked knees', 'Letting knees cave inward'],
        beginnerModification: 'Perform standard air squats without the jumping phase.',
        animationType: 'jump-squat'
      },
      {
        id: 'titan-wall-sit',
        name: 'Isometric 90-Degree Wall Sit',
        targetMuscles: ['Legs & Glutes'],
        sets: 3,
        durationSeconds: 45,
        restSeconds: 35,
        instructions: [
          'Slide back down against a flat wall until thighs are parallel to the floor.',
          'Ensure knees are bent at clean 90 degrees directly above ankles.',
          'Hold static tension without resting hands on thighs.'
        ],
        formCues: ['Back flat against wall', 'Calm rhythmic breathing while quads burn'],
        mistakesToAvoid: ['Letting hips slide below knee level', 'Pushing hands on knees'],
        beginnerModification: 'Hold for 20-25 seconds at a higher 120-degree knee angle.',
        animationType: 'wall-sit'
      },
      {
        id: 'titan-calf-raises',
        name: 'Tibial & Gastrocnemius Calf Peaks',
        targetMuscles: ['Legs & Glutes'],
        sets: 4,
        reps: 20,
        restSeconds: 25,
        instructions: [
          'Stand tall with feet hip-width apart.',
          'Drive up onto the balls of both feet as high as humanly possible.',
          'Hold the peak contraction for 1.5 seconds, then lower down under control for 2 seconds.'
        ],
        formCues: ['Squeeze calves at the very top', 'Control the stretch at the bottom'],
        mistakesToAvoid: ['Bouncing fast with momentum', 'Rolling onto outer edges of feet'],
        beginnerModification: 'Hold a wall or chair lightly for balance.',
        animationType: 'calf-raise'
      },
      {
        id: 'titan-stride-lunges',
        name: 'Walking Deceleration Lunges',
        targetMuscles: ['Legs & Glutes'],
        sets: 3,
        reps: 16,
        restSeconds: 35,
        instructions: [
          'Take a controlled stride forward, lowering until front thigh is parallel to ground.',
          'Rear knee hovers 1 inch off the floor with vertical front shin.',
          'Drive through front heel to step directly into the next stride.'
        ],
        formCues: ['Front knee tracks over second toe', 'Keep torso tall and steady'],
        mistakesToAvoid: ['Slamming rear knee into the floor'],
        beginnerModification: 'Perform stationary reverse lunges in place.',
        animationType: 'lunge'
      }
    ]
  },

  // 11. V-CUT OBLIQUE & DEEP CORE MATRIX
  {
    id: 'v-cut-oblique-deep-core',
    title: 'V-Cut Obliques & Deep Core Matrix',
    subtitle: 'Rotational Strength, Lateral Bracing & Taper',
    description: 'Sculpt the anatomical V-line, strengthen internal and external obliques, and lock down rotational pelvic stability with pure calisthenics.',
    category: 'Six-Pack & Core',
    difficulty: 'Intermediate',
    estimatedMinutes: 16,
    targetMuscles: ['Abs & Core'],
    bannerGradient: 'from-emerald-500/30 via-teal-600/20 to-charcoal-900',
    precautions: [
      'Do not crank your neck with your hands during rotational crunches.',
      'Maintain an unbroken straight diagonal line during side planks.'
    ],
    postureCues: [
      'Initiate rotation from the thoracic ribcage, not the cervical neck.',
      'Lock pelvic tilt so lower lumbar spine does not hyperextend.'
    ],
    breathingInstructions: 'Exhale sharply on every rotational twist; inhale as you transition across center.',
    warmupMinutes: 2,
    cooldownMinutes: 2,
    whenToStopWarnings: [
      'Sharp pain in lower lumbar facet joints.',
      'Herniated disc radiating symptoms down either leg.'
    ],
    exercises: [
      {
        id: 'vcut-bicycle-crunches',
        name: 'Rotational Bicycle Crunches',
        targetMuscles: ['Abs & Core'],
        sets: 3,
        reps: 20,
        restSeconds: 25,
        instructions: [
          'Lie on back with fingertips lightly at temples, knees raised at 90 degrees.',
          'Rotate right shoulder and elbow across to meet left knee while extending right leg straight.',
          'Smoothly alternate sides in a continuous, controlled pedaling motion.'
        ],
        formCues: ['Rotate through ribs, not elbows', 'Hold 1-second squeeze on each crossover'],
        mistakesToAvoid: ['Yanking neck forward with hands', 'Speeding through reps with zero tension'],
        beginnerModification: 'Keep resting foot on the floor between repetitions.',
        animationType: 'bicycle-crunch'
      },
      {
        id: 'vcut-side-plank',
        name: 'Isometric Lateral Side Plank',
        targetMuscles: ['Abs & Core', 'Shoulders'],
        sets: 3,
        durationSeconds: 35,
        restSeconds: 30,
        instructions: [
          'Lie on side propped on bottom elbow directly beneath your shoulder.',
          'Elevate hips until your entire body forms a rigid, unbroken diagonal beam.',
          'Extend top arm straight toward the ceiling and breathe steadily.'
        ],
        formCues: ['Do not let bottom hip sag toward floor', 'Keep head neutral with spine'],
        mistakesToAvoid: ['Rolling shoulders forward', 'Hips dropping'],
        beginnerModification: 'Bend bottom knee at 90 degrees resting on the floor.',
        animationType: 'side-plank'
      },
      {
        id: 'vcut-leg-raise-tuck',
        name: 'Floor Leg Raises with Hip Lift',
        targetMuscles: ['Abs & Core'],
        sets: 3,
        reps: 12,
        restSeconds: 30,
        instructions: [
          'Lie flat on back with palms pressed firmly beside hips for anchor.',
          'Raise straight legs together until vertical, then give a micro-lift of hips off floor.',
          'Lower legs slowly over 3 seconds, hovering heels 2 inches above ground.'
        ],
        formCues: ['Press lower back into mat throughout', 'Control the descent'],
        mistakesToAvoid: ['Arching lower back off the floor', 'Swinging legs'],
        beginnerModification: 'Perform with bent knees (reverse crunches).',
        animationType: 'leg-raise'
      }
    ]
  },

  // 12. SILENT APARTMENT STEALTH CALISTHENICS (ZERO NOISE, HIGH BURN)
  {
    id: 'stealth-apartment-calisthenics',
    title: 'Stealth Apartment Calisthenics',
    subtitle: 'Zero Noise, High Burn & Pure Tension',
    description: 'Designed specifically for late nights, thin floors, and small spaces. Zero jumping, zero equipment, 100% muscle activation and caloric burn.',
    category: 'Home Workouts',
    difficulty: 'Beginner',
    estimatedMinutes: 16,
    targetMuscles: ['Full Body', 'Chest', 'Legs & Glutes', 'Abs & Core'],
    bannerGradient: 'from-cyan-600/30 via-sky-700/20 to-charcoal-900',
    precautions: [
      'Use a yoga mat or carpet to cushion your joints.',
      'Focus on slow tempo (3-second eccentric descent) to maximize muscle recruitment without noise.'
    ],
    postureCues: [
      'Maintain continuous total-body tension.',
      'Control every millimeter of movement.'
    ],
    breathingInstructions: 'Maintain calm, rhythmic nasal breathing throughout all isometric holds.',
    warmupMinutes: 2,
    cooldownMinutes: 2,
    whenToStopWarnings: ['Any sharp joint pain or dizziness.'],
    exercises: [
      {
        id: 'stealth-wall-sit',
        name: 'Silent Isometric Wall Sit',
        targetMuscles: ['Legs & Glutes'],
        sets: 3,
        durationSeconds: 40,
        restSeconds: 30,
        instructions: [
          'Sit against a flat wall with thighs strictly parallel to the floor.',
          'Keep feet planted firmly without moving an inch.',
          'Breathe deeply through the nose while quads hold static tension.'
        ],
        formCues: ['90-degree knee bend', 'Back pinned flat to wall'],
        mistakesToAvoid: ['Resting forearms on knees'],
        beginnerModification: 'Hold at a 120-degree angle for 20 seconds.',
        animationType: 'wall-sit'
      },
      {
        id: 'stealth-tempo-pushups',
        name: 'Dead-Stop Floor Push-Ups',
        targetMuscles: ['Chest', 'Arms & Triceps', 'Shoulders'],
        sets: 3,
        reps: 10,
        restSeconds: 35,
        instructions: [
          'Lower down over 3 slow seconds until chest touches floor.',
          'Briefly lift palms half an inch off floor to eliminate recoil, plant them, and press up smoothly.'
        ],
        formCues: ['Body moves as a single rigid board', 'Elbows track at 45 degrees'],
        mistakesToAvoid: ['Sagging lower back'],
        beginnerModification: 'Perform on knees with straight hips.',
        animationType: 'pushup'
      },
      {
        id: 'stealth-pencil-plank',
        name: 'Pencil Plank Isometric Hold',
        targetMuscles: ['Abs & Core'],
        sets: 3,
        durationSeconds: 40,
        restSeconds: 25,
        instructions: [
          'Rest on forearms and toes with body locked in an unbroken straight beam.',
          'Actively contract glutes and draw belly button inward toward spine.'
        ],
        formCues: ['Shoulders depressed down away from ears', 'Glutes squeezed tight'],
        mistakesToAvoid: ['Hips piking or sagging'],
        beginnerModification: 'Rest knees on mat.',
        animationType: 'plank'
      },
      {
        id: 'stealth-slow-squats',
        name: 'Slow Tempo Air Squats (3-1-1)',
        targetMuscles: ['Legs & Glutes'],
        sets: 3,
        reps: 15,
        restSeconds: 30,
        instructions: [
          'Take 3 full seconds to descend into deep parallel squat.',
          'Pause for 1 second at the bottom, then stand smoothly without stomping or jumping.'
        ],
        formCues: ['Keep heels glued to the floor', 'Chest upright'],
        mistakesToAvoid: ['Dropping fast into bottom'],
        beginnerModification: 'Squat to chair height.',
        animationType: 'squat'
      }
    ]
  },

  // 13. DESK WORKER POSTURAL ANTIDOTE & THORACIC MOBILITY
  {
    id: 'desk-worker-postural-antidote',
    title: 'Desk Worker Postural Antidote',
    subtitle: 'Thoracic Extension, Glute Wake-Up & Spinal Health',
    description: 'Reverse the damage of long sitting hours. Decompresses the lumbar spine, relieves anterior neck tension, and reactivates dormant glutes.',
    category: 'Yoga & Flexibility',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    targetMuscles: ['Back', 'Neck & Posture', 'Abs & Core', 'Legs & Glutes'],
    bannerGradient: 'from-amber-600/30 via-orange-600/20 to-charcoal-900',
    precautions: [
      'Move slowly and mindfully through all spinal movements—never force a stiff joint.',
      'Keep core braced during quadrupedal reaches to prevent lower back hyperextension.'
    ],
    postureCues: [
      'Elongate your neck and draw shoulder blades gently down your back.',
      'Think of reaching long from fingertips to toes.'
    ],
    breathingInstructions: 'Coordinate every extension with an expansive inhalation; coordinate every flex with a relaxing exhalation.',
    warmupMinutes: 2,
    cooldownMinutes: 2,
    whenToStopWarnings: [
      'Numbness, tingling, or sharp electric shooting sensations down arms or legs.',
      'Acute localized pain in spinal vertebrae.'
    ],
    exercises: [
      {
        id: 'desk-bird-dog',
        name: 'Bird-Dog Cross-Body Extension',
        targetMuscles: ['Back', 'Abs & Core', 'Legs & Glutes'],
        sets: 3,
        reps: 12,
        restSeconds: 25,
        instructions: [
          'Start on hands and knees with hands under shoulders and knees under hips.',
          'Extend right arm straight forward and left leg straight back until parallel to floor.',
          'Hold peak extension for 2 seconds with level hips, then return and switch sides.'
        ],
        formCues: ['Do not let hips tilt or lower back arch', 'Keep neck neutral gazing at mat'],
        mistakesToAvoid: ['Swinging limbs with momentum', 'Over-arching spine'],
        beginnerModification: 'Extend only the leg first, keeping both hands on floor.',
        animationType: 'bird-dog'
      },
      {
        id: 'desk-dead-bug',
        name: 'Dead Bug Anti-Extension Hold',
        targetMuscles: ['Abs & Core'],
        sets: 3,
        reps: 12,
        restSeconds: 25,
        instructions: [
          'Lie on back with arms pointing to ceiling and knees raised at 90/90 degrees.',
          'Slowly lower right arm overhead and left leg toward floor while pressing lower back firmly into mat.',
          'Return to starting point and alternate opposite limbs smoothly.'
        ],
        formCues: ['Glue lower back into floor with zero daylight beneath', 'Move with control'],
        mistakesToAvoid: ['Letting lower back arch off mat'],
        beginnerModification: 'Keep knees bent and tap heels to floor instead of extending legs straight.',
        animationType: 'dead-bug'
      },
      {
        id: 'desk-cat-cow',
        name: 'Segmental Cat-Cow Flow',
        targetMuscles: ['Back', 'Neck & Posture'],
        sets: 3,
        durationSeconds: 45,
        restSeconds: 20,
        instructions: [
          'On hands and knees, inhale as you tilt pelvis upward and allow spine to arch gently into Cow.',
          'Exhale as you tuck tailbone, dome thoracic spine toward ceiling, and relax neck into Cat.'
        ],
        formCues: ['Move vertebra by vertebra', 'Never force past joint comfort'],
        mistakesToAvoid: ['Overextending cervical neck'],
        beginnerModification: 'Reduce range of movement and move slowly.',
        animationType: 'cat-cow'
      },
      {
        id: 'desk-chin-tucks',
        name: 'Cervical Retraction Plumb Line Tucks',
        targetMuscles: ['Neck & Posture'],
        sets: 3,
        reps: 15,
        restSeconds: 20,
        instructions: [
          'Sit tall with shoulders relaxed down.',
          'Gently glide chin horizontally straight backward like making a subtle double chin.',
          'Hold peak retraction for 2 seconds feeling the deep flexors behind your throat engage, then release.'
        ],
        formCues: ['Glide chin straight back horizontally—do not tilt head up or down', 'Keep jaw relaxed'],
        mistakesToAvoid: ['Tilting head downward into chest'],
        beginnerModification: 'Perform with back of head resting against a wall.',
        animationType: 'chin-tuck'
      }
    ]
  },

  // 14. DEEP PARASYMPATHETIC SLEEP & MOBILITY DOWN-REGULATION
  {
    id: 'parasympathetic-sleep-mobility',
    title: 'Parasympathetic Down-Regulation & Sleep Flow',
    subtitle: 'Vagus Nerve Activation, Hip Freedom & Restorative Calm',
    description: 'Calm an overstimulated nervous system, lower cortisol, release tight hips, and transition into deep, restorative recovery.',
    category: 'Yoga & Flexibility',
    difficulty: 'Beginner',
    estimatedMinutes: 16,
    targetMuscles: ['Back', 'Legs & Glutes', 'Neck & Posture'],
    bannerGradient: 'from-indigo-600/30 via-purple-700/20 to-charcoal-900',
    precautions: [
      'This routine is designed for deep relaxation—avoid pushing into intense stretch discomfort.',
      'Dim lights and maintain deep 4-second nasal inhalations and 6-second exhalations.'
    ],
    postureCues: [
      'Let gravity do the work; soften your facial muscles and jaw.',
      'Allow hips and shoulders to melt toward the floor on every exhalation.'
    ],
    breathingInstructions: 'Inhale through nose into belly for 4 counts; exhale slowly through mouth or nose for 6-8 counts.',
    warmupMinutes: 1,
    cooldownMinutes: 2,
    whenToStopWarnings: ['Any sharp joint pain or dizziness.'],
    exercises: [
      {
        id: 'sleep-child-pose',
        name: "Extended Child's Pose (Balasana)",
        targetMuscles: ['Back', 'Legs & Glutes'],
        sets: 2,
        durationSeconds: 60,
        restSeconds: 20,
        instructions: [
          'Kneel on mat with big toes touching and knees opened wide.',
          'Sink hips all the way back onto heels, walk hands forward, and rest forehead on the floor.',
          'Breathe deeply into your lower back and latissimus muscles, letting tension dissolve.'
        ],
        formCues: ['Lengthen through armpits', 'Let chest melt toward mat'],
        mistakesToAvoid: ['Holding tension in neck or shoulders'],
        beginnerModification: 'Place a folded blanket or pillow between hips and heels.',
        animationType: 'child-pose'
      },
      {
        id: 'sleep-butterfly-stretch',
        name: 'Seated Butterfly Hip Opener (Baddha Konasana)',
        targetMuscles: ['Legs & Glutes'],
        sets: 2,
        durationSeconds: 50,
        restSeconds: 20,
        instructions: [
          'Sit tall on floor and bring soles of your feet together in front of you.',
          'Allow knees to fall open naturally to the sides without forcing.',
          'Grasp ankles and gently hinge forward from the hips with a long spine.'
        ],
        formCues: ['Elongate spine before folding forward', 'Relax adductor muscles on every exhale'],
        mistakesToAvoid: ['Rounding spine aggressively', 'Bouncing knees violently'],
        beginnerModification: 'Sit on a cushion to elevate hips.',
        animationType: 'butterfly-stretch'
      },
      {
        id: 'sleep-cobra-flow',
        name: 'Gentle Prone Cobra Opener',
        targetMuscles: ['Chest', 'Back', 'Neck & Posture'],
        sets: 2,
        durationSeconds: 45,
        restSeconds: 20,
        instructions: [
          'Lie prone on stomach with palms planted lightly beside ribs.',
          'Gently press through hands to raise chest off floor, keeping pelvis grounded.',
          'Open chest and breathe calmly into your sternum.'
        ],
        formCues: ['Pull shoulder blades down your back', 'Keep glutes relaxed'],
        mistakesToAvoid: ['Pinching lower back'],
        beginnerModification: 'Rest on forearms (Sphinx pose).',
        animationType: 'cobra-stretch'
      },
      {
        id: 'sleep-diaphragm-breath',
        name: '4-7-8 Parasympathetic Diaphragmatic Reset',
        targetMuscles: ['Neck & Posture', 'Abs & Core'],
        sets: 2,
        durationSeconds: 60,
        restSeconds: 15,
        instructions: [
          'Sit comfortably or lie flat with one hand on chest and one on belly.',
          'Inhale quietly through nose for 4 seconds, feeling belly rise.',
          'Hold breath calmly for 7 seconds, then exhale completely through mouth with a whoosh for 8 seconds.'
        ],
        formCues: ['Chest remains still while belly expands', 'Relax shoulders completely on exhale'],
        mistakesToAvoid: ['Shallow chest breathing'],
        beginnerModification: 'Use simple 4-second in, 4-second out cadence if 4-7-8 feels strenuous.',
        animationType: 'diaphragm-breath'
      }
    ]
  },

  // 15. ATHLETIC PLYO & AGILITY SKATER BURNER
  {
    id: 'athletic-plyo-skater-burner',
    title: 'Athletic Agility & Plyo Skater Burner',
    subtitle: 'Lateral Power, Reactive Speed & Conditioning',
    description: 'Develop lateral agility, joint deceleration resilience, and high-octane metabolic stamina. Bridges sports performance with explosive calisthenics.',
    category: 'Cardio & Conditioning',
    difficulty: 'Intermediate',
    estimatedMinutes: 18,
    targetMuscles: ['Full Body', 'Legs & Glutes', 'Abs & Core'],
    bannerGradient: 'from-rose-500/30 via-pink-600/20 to-charcoal-900',
    precautions: [
      'Perform on a non-slip athletic surface or mat.',
      'Focus on landing silently and absorbing momentum before launching into the next bound.'
    ],
    postureCues: [
      'Maintain an athletic low center of gravity throughout lateral hops.',
      'Coordinate arm swings to counterbalance each bounding step.'
    ],
    breathingInstructions: 'Breathe rhythmically in 2-stride cycles to avoid anaerobic depletion.',
    warmupMinutes: 3,
    cooldownMinutes: 3,
    whenToStopWarnings: [
      'Acute sharp twist or sprain sensation in ankle or knee.',
      'Chest tightness or disproportionate dizziness.'
    ],
    exercises: [
      {
        id: 'plyo-skater-jumps',
        name: 'Lateral Plyometric Skater Bounds',
        targetMuscles: ['Legs & Glutes', 'Abs & Core'],
        sets: 3,
        durationSeconds: 40,
        restSeconds: 30,
        instructions: [
          'Start on right leg, push laterally off floor to leap sideways onto left foot.',
          'Land softly on left foot, sweeping right leg behind in a curtsy motion while counterbalancing with arms.',
          'Immediately push off left foot to bound back to the right side.'
        ],
        formCues: ['Absorb force through knee and hip hinge', 'Land like a stealth panther'],
        mistakesToAvoid: ['Landing with stiff locked knee', 'Letting knee cave inward on landing'],
        beginnerModification: 'Step sideways without jumping.',
        animationType: 'skater-jump'
      },
      {
        id: 'plyo-high-knees',
        name: 'Neuromuscular High Knee Sprints',
        targetMuscles: ['Legs & Glutes', 'Abs & Core'],
        sets: 3,
        durationSeconds: 35,
        restSeconds: 25,
        instructions: [
          'Drive knees up alternately to hip level (90 degrees).',
          'Pump bent elbows rhythmically in opposition to leg drives.',
          'Stay light on the balls of your feet with rapid ground contact.'
        ],
        formCues: ['Torso stays tall and upright', 'Thighs achieve parallel'],
        mistakesToAvoid: ['Leaning backward excessively'],
        beginnerModification: 'Perform marching high knees in place.',
        animationType: 'high-knees'
      },
      {
        id: 'plyo-mountain-climbers',
        name: 'Piston Mountain Climbers',
        targetMuscles: ['Abs & Core', 'Shoulders', 'Legs & Glutes'],
        sets: 3,
        durationSeconds: 40,
        restSeconds: 25,
        instructions: [
          'In high pushup plank, drive knees forward toward chest alternately in rapid succession.',
          'Keep hips level and palms screwed firmly into the floor.'
        ],
        formCues: ['Do not let hips bounce up and down', 'Maintain hollow-body core brace'],
        mistakesToAvoid: ['Arching lower back'],
        beginnerModification: 'Perform at deliberate half-speed.',
        animationType: 'mountain-climber'
      },
      {
        id: 'plyo-burpee-strike',
        name: 'Explosive Burpee Strike',
        targetMuscles: ['Full Body', 'Chest', 'Legs & Glutes'],
        sets: 3,
        reps: 10,
        restSeconds: 40,
        instructions: [
          'Squat down, plant palms, kick feet back to plank, perform pushup, snap feet forward, and explode into vertical jump.'
        ],
        formCues: ['Jump as high as possible at apex', 'Land softly absorbing into squat'],
        mistakesToAvoid: ['Landing stiffly'],
        beginnerModification: 'Perform without pushup or jump.',
        animationType: 'burpee'
      }
    ]
  },

  // 16. BEGINNER FULL-BODY FOUNDATION STARTER
  {
    id: 'beginner-fullbody-starter',
    title: 'Beginner Full-Body Foundation Starter',
    subtitle: 'Zero Intimidation, Safe Progression & Form Mastery',
    description: 'The definitive on-ramp for anyone starting or restarting their fitness journey. Safe joint angles, progressive resistance, and posture cues.',
    category: 'Full Body',
    difficulty: 'Beginner',
    estimatedMinutes: 14,
    targetMuscles: ['Full Body', 'Chest', 'Legs & Glutes', 'Abs & Core'],
    bannerGradient: 'from-teal-600/30 via-emerald-700/20 to-charcoal-900',
    precautions: [
      'Listen to your body—it is always okay to take extra rest between movements.',
      'Focus purely on clean movement quality rather than rushing reps.'
    ],
    postureCues: [
      'Maintain an upright spine and engaged core on all exercises.',
      'Never hold your breath.'
    ],
    breathingInstructions: 'Exhale during effort (pushing or standing up); inhale during recovery (lowering down).',
    warmupMinutes: 2,
    cooldownMinutes: 2,
    whenToStopWarnings: ['Any sharp joint pain or lightheadedness.'],
    exercises: [
      {
        id: 'starter-squats',
        name: 'Controlled Bodyweight Squats',
        targetMuscles: ['Legs & Glutes'],
        sets: 3,
        reps: 12,
        restSeconds: 30,
        instructions: [
          'Stand with feet shoulder-width apart, toes turned slightly out.',
          'Hinge hips back and bend knees to lower down as if sitting in a sturdy chair.',
          'Press through midfoot to stand tall, gently squeezing glutes at the top.'
        ],
        formCues: ['Knees track over toes', 'Keep chest proud'],
        mistakesToAvoid: ['Heels lifting off the ground', 'Knees buckling inward'],
        beginnerModification: 'Squat to the surface of a chair or sofa.',
        animationType: 'squat'
      },
      {
        id: 'starter-pushup-progression',
        name: 'Incline / Floor Push-Ups',
        targetMuscles: ['Chest', 'Arms & Triceps', 'Shoulders'],
        sets: 3,
        reps: 8,
        restSeconds: 35,
        instructions: [
          'Place hands on floor or elevated on a table/countertop slightly wider than shoulders.',
          'Lower chest under control with elbows tracking back at 45 degrees.',
          'Press firmly back to full arm extension.'
        ],
        formCues: ['Keep body straight like a plank', 'Do not let hips sag'],
        mistakesToAvoid: ['Flaring elbows out at 90 degrees'],
        beginnerModification: 'Perform against a wall or high kitchen counter.',
        animationType: 'pushup'
      },
      {
        id: 'starter-glute-figure4',
        name: 'Gentle Figure-4 Glute Stretch',
        targetMuscles: ['Legs & Glutes'],
        sets: 2,
        durationSeconds: 35,
        restSeconds: 20,
        instructions: [
          'Lie on back with knees bent. Cross right ankle over left thigh.',
          'Gently grasp behind left hamstring and draw leg toward chest until feeling a comfortable stretch in outer hip.',
          'Hold calmly, breathing deeply, then switch sides.'
        ],
        formCues: ['Relax head and shoulders on mat', 'Gentle tension only'],
        mistakesToAvoid: ['Forcing the stretch past comfortable sensation'],
        beginnerModification: 'Keep bottom foot resting on the floor or a wall.',
        animationType: 'glute-stretch'
      },
      {
        id: 'starter-plank-hold',
        name: 'Foundation Forearm Plank Hold',
        targetMuscles: ['Abs & Core'],
        sets: 3,
        durationSeconds: 25,
        restSeconds: 30,
        instructions: [
          'Rest on elbows and toes (or knees) with straight spine.',
          'Gently pull belly button inward and hold steady while breathing naturally.'
        ],
        formCues: ['Elbows directly beneath shoulders', 'Neutral neck looking down'],
        mistakesToAvoid: ['Sagging lower back', 'Holding breath'],
        beginnerModification: 'Rest knees on mat.',
        animationType: 'plank'
      }
    ]
  }
];
