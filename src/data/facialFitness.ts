import { Workout } from '../types';

export const FACIAL_POSTURE_WORKOUT: Workout = {
  id: 'jawline-neck-posture-routine',
  title: 'Cervical Posture & Jawline Alignment',
  subtitle: 'Neck Decompression & Tongue Posture Guidance',
  description: 'Gentle facial tension release and cervical spine alignment. Note: Facial bone contours and jaw shape are heavily dictated by genetics and skeletal maturity. Mewing has limited scientific evidence for altering adult jaw bone architecture. Never forcefully clench teeth; discontinue if TMJ pain occurs.',
  category: 'Facial Fitness',
  difficulty: 'Beginner',
  estimatedMinutes: 8,
  targetMuscles: ['Neck & Posture'],
  bannerGradient: 'from-indigo-600/30 to-charcoal-900',
  exercises: [
    {
      id: 'cervical-chin-tuck',
      name: 'Cervical Retraction (Chin Tucks)',
      targetMuscles: ['Neck & Posture'],
      reps: 10,
      restSeconds: 20,
      instructions: [
        'Sit or stand tall with eyes looking straight ahead at eye level.',
        'Gently draw your chin straight back as if making a subtle double chin.',
        'Hold for 3 seconds to stretch the suboccipital muscles and engage deep neck flexors.',
        'Release gently to neutral without letting head tilt forward.'
      ],
      formCues: ['Do not tilt head down; glide head straight backward horizontally', 'Keep jaw relaxed without clenching'],
      mistakesToAvoid: ['Jamming chin into chest', 'Shrugging shoulders'],
      beginnerModification: 'Perform while leaning against a flat wall for head feedback.',
      animationType: 'chin-tuck'
    },
    {
      id: 'mewing-rest-posture',
      name: 'Neutral Tongue Palate Placement (Mewing Rest)',
      targetMuscles: ['Neck & Posture'],
      durationSeconds: 45,
      restSeconds: 20,
      instructions: [
        'Swallow softly and allow the entire surface of your tongue (including posterior third) to suction against the roof of your mouth.',
        'Lips remain softly closed with teeth lightly touching or resting millimeters apart.',
        'Breathe exclusively through your nose without straining facial muscles.'
      ],
      formCues: ['Rest tongue like a suction cup behind upper front teeth', 'Zero forceful clenching'],
      mistakesToAvoid: ['Pushing tongue against the front teeth (causes dental flare)', 'Clenching teeth tightly together'],
      beginnerModification: 'Make the sound "N" or swallow to locate correct palate contact.',
      animationType: 'face-stretch'
    },
    {
      id: 'masseter-relaxation',
      name: 'Gentle Masseter & Temple Release',
      targetMuscles: ['Neck & Posture'],
      durationSeconds: 40,
      restSeconds: 15,
      instructions: [
        'Place fingertips on your jaw muscles right beneath cheekbones.',
        'Open mouth slightly and massage downward in gentle circular motions.',
        'Release chronic clenching tension in the temporomandibular region.'
      ],
      formCues: ['Apply light to medium pressure only', 'Breathe slowly and rhythmically'],
      mistakesToAvoid: ['Pressing hard on painful knots', 'Jerking the jaw sideways'],
      beginnerModification: 'Rest warmth from palms over cheeks.',
      animationType: 'face-stretch'
    }
  ]
};
