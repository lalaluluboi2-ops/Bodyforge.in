import { PainAreaScreening } from '../types';

export const PAIN_MOBILITY_AREAS: PainAreaScreening[] = [
  {
    id: 'neck-shoulder',
    bodyRegion: 'Neck & Shoulder Discomfort',
    commonComplaints: [
      'Stiffness from desk work or computer screen strain',
      'Upper trapezius tightness and knot sensations',
      'Limited cervical rotation when checking blind spots'
    ],
    redFlagWarnings: [
      'Pain radiating down the arm into fingers with numbness or tingling',
      'Sudden loss of grip strength or dropping objects',
      'Neck stiffness accompanied by high fever or sensitivity to bright light (meningismus sign)',
      'Pain following acute high-impact collision or traumatic fall'
    ],
    screeningQuestions: [
      { question: 'Did this discomfort begin following a traumatic accident, collision, or hard fall?', dangerTriggerIfYes: true },
      { question: 'Do you feel sharp electrical shooting pain, numbness, or tingling down your arm into your hand?', dangerTriggerIfYes: true },
      { question: 'Do you currently have a fever, sudden severe headache, or sensitivity to light with this neck stiffness?', dangerTriggerIfYes: true },
      { question: 'Is the discomfort primarily mild-to-moderate muscular tightness or postural fatigue?', dangerTriggerIfYes: false }
    ],
    safeMovements: [
      {
        id: 'cervical-glide',
        name: 'Gentle Chin Retraction & Lateral Glide',
        targetMuscles: ['Neck & Posture'],
        reps: 8,
        restSeconds: 20,
        instructions: [
          'Sit tall with shoulders relaxed down.',
          'Gently glide chin backward as if making a small double chin.',
          'Hold for 2 seconds, then slowly tilt right ear toward right shoulder until a gentle stretch is felt in left trapezius.',
          'Return to center and switch sides.'
        ],
        formCues: ['Stay strictly within pain-free range', 'Never bounce or force the stretch'],
        mistakesToAvoid: ['Yanking the neck with hands', 'Elevating shoulders toward ears'],
        beginnerModification: 'Perform only the horizontal chin tuck without lateral head tilt.',
        animationType: 'chin-tuck'
      },
      {
        id: 'shoulder-blade-pinch',
        name: 'Scapular Squeeze & Depress',
        targetMuscles: ['Shoulders', 'Back'],
        reps: 10,
        restSeconds: 20,
        instructions: [
          'Keep arms relaxed by your sides with elbows bent 90 degrees.',
          'Draw your shoulder blades backward toward each other and slightly downward.',
          'Hold the contraction for 3 seconds, feeling the mid-back engage, then release.'
        ],
        formCues: ['Breathe steadily', 'Keep neck long and relaxed'],
        mistakesToAvoid: ['Shrugging shoulders upward toward ears'],
        beginnerModification: 'Rest back against a chair for spinal feedback.',
        animationType: 'cat-cow'
      }
    ],
    whenToSeeDoctor: [
      'Discomfort lasting longer than 10 to 14 days without noticeable improvement',
      'Progressive muscle weakness in either arm or shoulder',
      'Constant pain that disrupts sleep regardless of sleeping position',
      'Unexplained dizziness, nausea, or visual disturbances'
    ],
    reviewDate: 'October 2026'
  },
  {
    id: 'upper-lower-back',
    bodyRegion: 'Upper & Lower Back Discomfort',
    commonComplaints: [
      'Dull aching after prolonged sitting or standing',
      'Thoracic stiffness between shoulder blades',
      'Mild lumbar tightness upon waking'
    ],
    redFlagWarnings: [
      'Loss of bladder or bowel control or numbness in the saddle/groin area (Emergency Cauda Equina Red Flag)',
      'Progressive numbness, "pins and needles", or foot drop (inability to lift toes)',
      'Back pain accompanied by unexplained fever, chills, or sudden unexplained weight loss',
      'Severe unremitting pain that does not change whether resting, lying down, or moving'
    ],
    screeningQuestions: [
      { question: 'Have you experienced any loss of bladder or bowel control, or numbness between your legs/groin?', dangerTriggerIfYes: true },
      { question: 'Do you have numbness, tingling, or weakness shooting down past your knee into your foot?', dangerTriggerIfYes: true },
      { question: 'Did this pain start immediately following a fall, accident, or heavy lift with a sudden "pop"?', dangerTriggerIfYes: true },
      { question: 'Is the sensation a dull, posture-related ache or muscular tightness in the back?', dangerTriggerIfYes: false }
    ],
    safeMovements: [
      {
        id: 'cat-cow-spinal',
        name: 'Supported Quadruped Cat-Cow',
        targetMuscles: ['Back', 'Neck & Posture'],
        durationSeconds: 45,
        restSeconds: 20,
        instructions: [
          'Begin on all fours with hands directly below shoulders, knees under hips.',
          'Slowly inhale, lifting sit-bones and gently lowering belly toward floor.',
          'Exhale, gently arching spine upward, tucking pelvis and dropping crown.',
          'Stop immediately if you feel sharp, pinching, or shooting pain.'
        ],
        formCues: ['Move fluidly like a wave', 'Keep movement gentle and pain-free'],
        mistakesToAvoid: ['Forcing the arch past comfortable threshold'],
        beginnerModification: 'Perform seated in a sturdy chair with hands on thighs.',
        animationType: 'cat-cow'
      },
      {
        id: 'glute-bridge-activation',
        name: 'Gentle Supine Glute Bridge',
        targetMuscles: ['Legs & Glutes', 'Abs & Core'],
        reps: 10,
        restSeconds: 25,
        instructions: [
          'Lie on back with knees bent and feet flat on the floor, hip-width apart.',
          'Flatten lower back lightly against floor by engaging lower abdominal muscles.',
          'Press through heels and squeeze glutes to lift hips into a straight line from knees to shoulders.',
          'Lower down with control.'
        ],
        formCues: ['Lift with glutes, not lower back arching'],
        mistakesToAvoid: ['Hyperextending lumbar spine at the top'],
        beginnerModification: 'Perform small 2-inch lifts focusing only on glute contraction.',
        animationType: 'glute-stretch'
      }
    ],
    whenToSeeDoctor: [
      'Back pain persisting past 2 weeks despite gentle activity and rest',
      'History of cancer, osteoporosis, or long-term steroid medication use',
      'Pain accompanied by fever or severe night sweats',
      'Inability to walk or perform daily self-care due to severe pain'
    ],
    reviewDate: 'October 2026'
  },
  {
    id: 'wrist-hand-finger',
    bodyRegion: 'Wrist, Hand & Finger Discomfort',
    commonComplaints: [
      'Forearm and wrist tightness from mouse and keyboard use',
      'Stiffness when opening and closing fingers in the morning',
      'Mild palm or thumb-base fatigue from mobile phone scrolling'
    ],
    redFlagWarnings: [
      'Persistent numbness or tingling in thumb, index, and middle fingers waking you from sleep (Carpal Tunnel sign)',
      'Severe swelling, redness, and heat over a joint',
      'Inability to move a finger or visible deformity after an impact injury'
    ],
    screeningQuestions: [
      { question: 'Is there visible deformity, severe swelling, or inability to move a finger after an injury?', dangerTriggerIfYes: true },
      { question: 'Do you have constant numbness or burning in your fingers that interferes with daily tasks?', dangerTriggerIfYes: true },
      { question: 'Is the discomfort predominantly mild strain or tightness after typing/phone use?', dangerTriggerIfYes: false }
    ],
    safeMovements: [
      {
        id: 'wrist-flexor-extensor',
        name: 'Gentle Wrist Flexor & Extensor Mobility',
        targetMuscles: ['Arms & Triceps'],
        durationSeconds: 40,
        restSeconds: 15,
        instructions: [
          'Extend one arm in front of you with elbow straight, palm facing away.',
          'With other hand, gently draw fingers back toward body until a light stretch is felt along forearm.',
          'Hold 15 seconds, then point fingers down toward floor and apply light stretch.',
          'Repeat on other arm.'
        ],
        formCues: ['Apply very light, smooth pressure', 'No pinching in wrist joint'],
        mistakesToAvoid: ['Aggressive pulling', 'Locking elbow painfully'],
        beginnerModification: 'Perform with elbow bent at 90 degrees.',
        animationType: 'wrist-stretch'
      }
    ],
    whenToSeeDoctor: [
      'Symptoms worsening despite ergonomic keyboard adjustments and rest',
      'Dropping cups or inability to button shirts due to thumb weakness',
      'Joints that are hot, red, or symmetrically swollen'
    ],
    reviewDate: 'October 2026'
  },
  {
    id: 'hip-joint',
    bodyRegion: 'Hip Discomfort & Mobility',
    commonComplaints: [
      'Tight hip flexors after prolonged desk sitting',
      'Deep glute ache (piriformis tension)',
      'Limited internal or external hip rotation'
    ],
    redFlagWarnings: [
      'Inability to bear weight on the affected leg following a slip or fall',
      'Groin pain accompanied by fever, chills, or sudden warmth over the joint',
      'Severe sharp "clicking" accompanied by the hip giving out or locking'
    ],
    screeningQuestions: [
      { question: 'Are you unable to stand or bear weight on your leg without severe pain?', dangerTriggerIfYes: true },
      { question: 'Did this start after a traumatic fall or direct blow to your hip?', dangerTriggerIfYes: true },
      { question: 'Is the discomfort primarily muscular tightness in the front of hip or outer glute?', dangerTriggerIfYes: false }
    ],
    safeMovements: [
      {
        id: 'figure-four-stretch',
        name: 'Gentle Seated Figure-4 Piriformis Stretch',
        targetMuscles: ['Legs & Glutes'],
        durationSeconds: 45,
        restSeconds: 20,
        instructions: [
          'Sit tall on the edge of a sturdy chair.',
          'Cross your right ankle over your left knee, creating a number 4 shape.',
          'Keep your spine straight and hinge forward gently from hips until a mild stretch is felt in outer right hip.',
          'Hold 20 seconds, breathe deeply, and switch sides.'
        ],
        formCues: ['Hinge from hips, do not round lower back', 'Flex the crossed foot slightly to protect knee'],
        mistakesToAvoid: ['Pushing down hard on the raised knee'],
        beginnerModification: 'Perform lying on back with knee supported.',
        animationType: 'glute-stretch'
      }
    ],
    whenToSeeDoctor: [
      'Hip pain causing a noticeable limp for more than 48 hours',
      'Pain that steadily worsens when walking on level ground',
      'Night pain waking you from sleep'
    ],
    reviewDate: 'October 2026'
  },
  {
    id: 'knee-joint',
    bodyRegion: 'Knee Discomfort & Alignment',
    commonComplaints: [
      'Dull ache around kneecap (patellofemoral tracking fatigue)',
      'Stiffness after sitting with bent knees for hours',
      'Mild tightness going up or down stairs'
    ],
    redFlagWarnings: [
      'Knee joint locks in place and physically cannot bend or straighten',
      'Knee "gives out" uncontrollably while walking',
      'Immediate rapid swelling ("grapefruit knee") within 2 hours of a twisting injury or pop',
      'Inability to bear weight or walk 4 steps'
    ],
    screeningQuestions: [
      { question: 'Did you hear or feel a loud "pop" followed by immediate swelling or instability?', dangerTriggerIfYes: true },
      { question: 'Does your knee physically lock so you cannot straighten it?', dangerTriggerIfYes: true },
      { question: 'Are you completely unable to walk or put weight on this knee?', dangerTriggerIfYes: true },
      { question: 'Is the feeling primarily mild stiffness or fatigue around the kneecap?', dangerTriggerIfYes: false }
    ],
    safeMovements: [
      {
        id: 'straight-leg-raise',
        name: 'Non-Weightbearing Quad Activation',
        targetMuscles: ['Legs & Glutes'],
        reps: 10,
        restSeconds: 20,
        instructions: [
          'Lie on back with one knee bent and foot flat, other leg extended straight.',
          'Tighten thigh muscle (quadriceps) of straight leg to lock knee.',
          'Slowly lift leg ~12 inches off floor, hold 2 seconds, lower down smoothly.'
        ],
        formCues: ['Keep knee locked completely straight as you lift'],
        mistakesToAvoid: ['Jerking the leg with lower back'],
        beginnerModification: 'Perform isometric quad sets pressing knee into a rolled towel.',
        animationType: 'squat'
      }
    ],
    whenToSeeDoctor: [
      'Significant swelling or fluid in the knee joint',
      'Persistent pain going down stairs that does not improve after 1 week of rest',
      'Fever with a hot, red, swollen knee'
    ],
    reviewDate: 'October 2026'
  },
  {
    id: 'ankle-foot',
    bodyRegion: 'Ankle & Foot Discomfort',
    commonComplaints: [
      'Plantar heel tightness during first steps in the morning',
      'Achilles tendon stiffness after workouts',
      'Ankle joint fatigue from uneven ground or long standing'
    ],
    redFlagWarnings: [
      'Inability to walk 4 steps immediately after an ankle roll or twisting injury',
      'Sudden sensation of being kicked or struck in the calf with inability to point toes (Achilles rupture sign)',
      'Severe focal bone tenderness directly over the malleolus (ankle bone) or 5th metatarsal base',
      'Cold, pale, or blue toes with absent pulses'
    ],
    screeningQuestions: [
      { question: 'Did you feel a sudden snap or kick in the back of your calf followed by weakness?', dangerTriggerIfYes: true },
      { question: 'Are you unable to take 4 steps right now due to pain?', dangerTriggerIfYes: true },
      { question: 'Is the sensation primarily morning heel tightness or general arch fatigue?', dangerTriggerIfYes: false }
    ],
    safeMovements: [
      {
        id: 'ankle-alphabet',
        name: 'Non-Weightbearing Ankle Alphabets',
        targetMuscles: ['Legs & Glutes'],
        durationSeconds: 45,
        restSeconds: 15,
        instructions: [
          'Sit comfortably with foot elevated off the floor.',
          'Trace the letters A through Z with your big toe, moving purely from the ankle joint.',
          'Keep movement gentle and fluid within pain-free boundaries.'
        ],
        formCues: ['Move ankle, not whole leg'],
        mistakesToAvoid: ['Pushing into sharp tendon pain'],
        beginnerModification: 'Trace simple circles (5 clockwise, 5 counter-clockwise).',
        animationType: 'lunge'
      }
    ],
    whenToSeeDoctor: [
      'Inability to bear weight after an injury',
      'Numbness or pins-and-needles in the foot or toes',
      'Pain that does not improve after 7 to 10 days of self-care'
    ],
    reviewDate: 'October 2026'
  }
];
