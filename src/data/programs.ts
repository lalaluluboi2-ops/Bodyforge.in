import { Workout } from '../types';

export const SUMMER_ATHLETE_PROGRAM: Workout = {
  id: 'summer-athlete-circuit',
  title: 'Summer Athlete',
  subtitle: 'High-Tempo Conditioning & Core Striation',
  description: 'Designed for agility, outdoor readiness, core definition, and explosive athletic stamina requiring zero gear.',
  category: 'Seasonal Programs',
  difficulty: 'Intermediate',
  estimatedMinutes: 20,
  isSeasonal: 'summer',
  targetMuscles: ['Full Body', 'Abs & Core', 'Legs & Glutes'],
  bannerGradient: 'from-amber-500/30 via-orange-600/20 to-charcoal-900',
  exercises: [
    {
      id: 'summer-jj',
      name: 'Explosive Jumping Jacks',
      targetMuscles: ['Full Body'],
      durationSeconds: 45,
      restSeconds: 15,
      instructions: ['Wide arm sweeps', 'Land softly on balls of feet'],
      formCues: ['Core tight'],
      mistakesToAvoid: ['Stiff knees'],
      beginnerModification: 'Side step jacks without jumping',
      animationType: 'jumping-jack'
    },
    {
      id: 'summer-push',
      name: 'Tempo Push-Up Cadence',
      targetMuscles: ['Chest', 'Arms & Triceps'],
      reps: 14,
      restSeconds: 30,
      instructions: ['2 seconds down, explosive upward press'],
      formCues: ['Elbows at 45 degrees'],
      mistakesToAvoid: ['Dropping hips'],
      beginnerModification: 'Incline or knee push-ups',
      animationType: 'pushup'
    },
    {
      id: 'summer-climber',
      name: 'Sprint Mountain Climbers',
      targetMuscles: ['Abs & Core'],
      durationSeconds: 40,
      restSeconds: 25,
      instructions: ['Rapid knee drives while maintaining level hips'],
      formCues: ['Shoulders pinned over hands'],
      mistakesToAvoid: ['Bouncing hips in air'],
      beginnerModification: 'Elevated hand climbers against wall or couch',
      animationType: 'mountain-climber'
    }
  ]
};

export const WINTER_ATHLETE_PROGRAM: Workout = {
  id: 'winter-athlete-circuit',
  title: 'Winter Athlete',
  subtitle: 'Controlled Strength, Joint Armor & Stamina',
  description: 'Slow-tempo eccentric control, joint stability, and foundational endurance designed to maintain peak physical capacity indoors.',
  category: 'Seasonal Programs',
  difficulty: 'Intermediate',
  estimatedMinutes: 22,
  isSeasonal: 'winter',
  targetMuscles: ['Full Body', 'Legs & Glutes', 'Back'],
  bannerGradient: 'from-cyan-600/30 via-blue-700/20 to-charcoal-900',
  exercises: [
    {
      id: 'winter-squat-pause',
      name: 'Isometric 3-Second Pause Squats',
      targetMuscles: ['Legs & Glutes'],
      reps: 12,
      restSeconds: 35,
      instructions: ['Descend for 3 seconds', 'Hold at parallel for 3 full seconds', 'Drive up explosively'],
      formCues: ['Spine tall', 'Knees driving out'],
      mistakesToAvoid: ['Collapsing at the bottom'],
      beginnerModification: 'Regular tempo bodyweight squats onto a chair',
      animationType: 'squat'
    },
    {
      id: 'winter-plank-rock',
      name: 'Forearm Plank Rockers',
      targetMuscles: ['Abs & Core', 'Shoulders'],
      durationSeconds: 50,
      restSeconds: 25,
      instructions: ['In a stable plank, rock body forward on toes then push heels back'],
      formCues: ['Maintain rigid core cylinder'],
      mistakesToAvoid: ['Sagging lumbar back'],
      beginnerModification: 'Static forearm plank on knees',
      animationType: 'plank'
    },
    {
      id: 'winter-lunges',
      name: 'Controlled Alternating Reverse Lunges',
      targetMuscles: ['Legs & Glutes'],
      reps: 14,
      restSeconds: 30,
      instructions: ['Step back with precision, pause knee 1 inch from floor, return smoothly'],
      formCues: ['Drive through front heel'],
      mistakesToAvoid: ['Rushing the descent'],
      beginnerModification: 'Static split squats with chair support',
      animationType: 'lunge'
    }
  ]
};
