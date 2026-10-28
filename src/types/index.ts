export type MuscleGroup = 
  | 'Full Body' 
  | 'Chest' 
  | 'Arms & Triceps' 
  | 'Shoulders' 
  | 'Back' 
  | 'Abs & Core' 
  | 'Legs & Glutes' 
  | 'Neck & Posture';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type GoalCategory = 
  | 'Weight Management'
  | 'Six-Pack & Core'
  | 'Muscle Building'
  | 'Full Body'
  | 'Cardio & Conditioning'
  | 'Home Workouts'
  | 'Gym & Athletic Workouts'
  | 'Strength Training'
  | 'Yoga & Flexibility'
  | 'Seasonal Programs' 
  | 'Facial Fitness';

export interface ExerciseItem {
  id: string;
  name: string;
  targetMuscles: MuscleGroup[];
  sets?: number;
  durationSeconds?: number;
  reps?: number;
  restSeconds: number;
  instructions: string[];
  formCues: string[];
  mistakesToAvoid: string[];
  beginnerModification: string;
  animationType: 
    | 'pushup' 
    | 'squat' 
    | 'plank' 
    | 'jumping-jack' 
    | 'mountain-climber' 
    | 'lunge' 
    | 'chin-tuck' 
    | 'face-stretch' 
    | 'cat-cow' 
    | 'wrist-stretch' 
    | 'glute-stretch' 
    | 'diaphragm-breath'
    | 'burpee'
    | 'crunch'
    | 'dips'
    | 'high-knees'
    | 'cobra-stretch'
    | 'warrior-pose'
    | 'leg-raise'
    | 'pullup'
    | 'pike-pushup'
    | 'jump-squat'
    | 'calf-raise'
    | 'wall-sit'
    | 'side-plank'
    | 'bicycle-crunch'
    | 'bird-dog'
    | 'dead-bug'
    | 'child-pose'
    | 'butterfly-stretch'
    | 'skater-jump';
}

export interface Workout {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: GoalCategory;
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  targetMuscles: MuscleGroup[];
  exercises: ExerciseItem[];
  bannerGradient: string;
  isSeasonal?: 'summer' | 'winter';
  precautions?: string[];
  postureCues?: string[];
  breathingInstructions?: string;
  warmupMinutes?: number;
  cooldownMinutes?: number;
  whenToStopWarnings?: string[];
}

export interface CompletedWorkoutRecord {
  id: string;
  workoutId: string;
  workoutTitle: string;
  date: string;
  durationSeconds: number;
  exercisesCompleted: number;
  caloriesBurnedEstimate: number;
  userRating?: number;
  notes?: string;
}

export interface NotificationSettings {
  enabled: boolean;
  time: string; // HH:mm format, e.g. "08:00"
  days: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
  sound: boolean;
  lastNotifiedDate?: string; // YYYY-MM-DD
}

export interface WorkoutReview {
  id: string;
  workoutId: string;
  workoutTitle?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string; // ISO string
  difficultyFelt?: DifficultyLevel;
  likes?: number;
  isReported?: boolean;
}

export interface ChatSession {
  id: string;
  userId: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];
}

export interface UserFitnessProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL?: string | null;
  experienceLevel: DifficultyLevel;
  mainGoal: string;
  preferredDurationMinutes: number;
  daysAvailablePerWeek: number;
  streakDays: number;
  lastWorkoutDate: string | null;
  totalWorkouts: number;
  totalMinutes: number;
  completedWellnessRoutines?: string[];
  wellnessGoalsConsent?: boolean;
  notificationSettings?: NotificationSettings;
}

// FOOD & NUTRITION TYPES
export interface NutritionMeal {
  id: string;
  title: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  dietType: 'vegetarian' | 'non-vegetarian';
  goal: 'muscle-building' | 'weight-management' | 'six-pack' | 'endurance' | 'general';
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  prepMinutes: number;
  ingredients: string[];
  instructions: string[];
  benefits: string[];
}

export interface NutritionGuideline {
  id: string;
  title: string;
  iconName: string;
  summary: string;
  keyPoints: string[];
}

// WELLNESS, PAIN & EDUCATION TYPES
export type WellnessCategory = 
  | 'glow-up'
  | 'hair-scalp' 
  | 'weight-management' 
  | 'skin-care' 
  | 'pain-mobility' 
  | 'posture' 
  | 'sleep' 
  | 'stress' 
  | 'flexibility' 
  | 'nutrition' 
  | 'habits';

export interface EvidenceCitation {
  sourceName: string;
  organization: string;
  url?: string;
  year?: number;
}

export interface WellnessArticle {
  id: string;
  category: WellnessCategory;
  title: string;
  subtitle: string;
  summary: string;
  readingMinutes: number;
  reviewDate: string;
  reviewedBy: string;
  heroGradient: string;
  motionType?: ExerciseItem['animationType'];
  keyTakeaways: string[];
  sections: {
    heading: string;
    paragraphs: string[];
    bulletPoints?: string[];
    calloutNotice?: {
      type: 'info' | 'warning' | 'clinical';
      text: string;
    };
  }[];
  sources: EvidenceCitation[];
}

export interface PainAreaScreening {
  id: string;
  bodyRegion: string;
  commonComplaints: string[];
  redFlagWarnings: string[];
  screeningQuestions: {
    question: string;
    dangerTriggerIfYes: boolean;
  }[];
  safeMovements: ExerciseItem[];
  whenToSeeDoctor: string[];
  reviewDate: string;
}

export interface WorkoutMediaItem {
  type: 'image' | 'video';
  exerciseType: ExerciseItem['animationType'];
  title: string;
  cues: string[];
  muscles: string[];
  imageUrl?: string;
}

export interface CreatorProfile {
  name: string;
  role: string;
  image: string;
  tagline?: string;
  badge?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: number;
  suggestedAction?: {
    label: string;
    tabTarget?: string;
    routineId?: string;
  };
  mediaContent?: WorkoutMediaItem;
  creatorProfile?: CreatorProfile;
  isEmergencyAlert?: boolean;
}

export interface GlowUpHabit {
  id: string;
  title: string;
  category: 'posture' | 'skin' | 'movement' | 'sleep' | 'hydration';
  description: string;
  completed: boolean;
}

export type SupportedLanguage = 'en' | 'hi' | 'bn';
