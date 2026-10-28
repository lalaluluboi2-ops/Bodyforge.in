import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  deleteDoc,
  Firestore 
} from 'firebase/firestore';
import { 
  CompletedWorkoutRecord, 
  UserFitnessProfile, 
  ChatSession, 
  WorkoutReview 
} from '../types';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.authDomain && 
  firebaseConfig.projectId
);

let app: FirebaseApp | null = null;
let auth: ReturnType<typeof getAuth> | null = null;
let db: Firestore | null = null;

if (isFirebaseConfigured && !getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (err) {
    console.warn("BODYFORGE: Firebase initialization issue, using dev fallback.", err);
  }
}

export { auth, db };

// Google Authentication
export const signInWithGoogle = async (): Promise<User | null> => {
  if (!auth) throw new Error("FIREBASE_NOT_CONFIGURED");
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(auth, provider);
  return cred.user;
};

export const logoutUser = async (): Promise<void> => {
  if (auth) {
    await signOut(auth);
  }
};

// Profile & Workout Persistence
export const saveCompletedWorkout = async (
  uid: string, 
  record: CompletedWorkoutRecord
): Promise<void> => {
  if (db && uid && !uid.startsWith('guest_')) {
    const recordRef = doc(db, 'users', uid, 'workouts', record.id);
    await setDoc(recordRef, record);
    
    // Update profile stats
    const profileRef = doc(db, 'users', uid, 'profile', 'stats');
    const existingSnap = await getDoc(profileRef);
    const existing = (existingSnap.data() as Partial<UserFitnessProfile>) || {};
    
    const newStreak = calculateNewStreak(existing.lastWorkoutDate, record.date, existing.streakDays || 0);

    await setDoc(profileRef, {
      totalWorkouts: (existing.totalWorkouts || 0) + 1,
      totalMinutes: (existing.totalMinutes || 0) + Math.round(record.durationSeconds / 60),
      lastWorkoutDate: record.date,
      streakDays: newStreak,
    }, { merge: true });
  } else {
    // Local persistence fallback
    const storageKey = `bodyforge_history_${uid || 'guest'}`;
    const raw = localStorage.getItem(storageKey);
    const list: CompletedWorkoutRecord[] = raw ? JSON.parse(raw) : [];
    if (!list.some(r => r.id === record.id)) {
      list.unshift(record);
      localStorage.setItem(storageKey, JSON.stringify(list));
    }
  }
};

export const fetchWorkoutHistory = async (uid: string): Promise<CompletedWorkoutRecord[]> => {
  if (db && uid && !uid.startsWith('guest_')) {
    try {
      const q = query(collection(db, 'users', uid, 'workouts'), orderBy('date', 'desc'));
      const querySnap = await getDocs(q);
      return querySnap.docs.map(d => d.data() as CompletedWorkoutRecord);
    } catch (err) {
      console.warn("Error fetching from Firestore, falling back to local cache", err);
    }
  }
  const storageKey = `bodyforge_history_${uid || 'guest'}`;
  const raw = localStorage.getItem(storageKey);
  return raw ? JSON.parse(raw) : [];
};

export const saveWellnessRoutineProgress = async (uid: string, routineId: string): Promise<void> => {
  if (db && uid && !uid.startsWith('guest_')) {
    const profileRef = doc(db, 'users', uid, 'profile', 'wellness');
    const snap = await getDoc(profileRef);
    const existing = (snap.data() as { completed?: string[] }) || {};
    const setList = new Set(existing.completed || []);
    setList.add(routineId);
    await setDoc(profileRef, { completed: Array.from(setList) }, { merge: true });
  } else {
    const storageKey = `bodyforge_wellness_${uid || 'guest'}`;
    const raw = localStorage.getItem(storageKey);
    const list: string[] = raw ? JSON.parse(raw) : [];
    if (!list.includes(routineId)) {
      list.push(routineId);
      localStorage.setItem(storageKey, JSON.stringify(list));
    }
  }
};

export const fetchCompletedWellnessRoutines = async (uid: string): Promise<string[]> => {
  if (db && uid && !uid.startsWith('guest_')) {
    try {
      const profileRef = doc(db, 'users', uid, 'profile', 'wellness');
      const snap = await getDoc(profileRef);
      if (snap.exists()) {
        return (snap.data() as { completed?: string[] }).completed || [];
      }
    } catch (err) {
      console.warn("Error reading wellness progress", err);
    }
  }
  const storageKey = `bodyforge_wellness_${uid || 'guest'}`;
  const raw = localStorage.getItem(storageKey);
  return raw ? JSON.parse(raw) : [];
};

export const clearUserData = async (uid: string): Promise<void> => {
  if (db && uid && !uid.startsWith('guest_')) {
    try {
      // Delete user workout documents
      const q = query(collection(db, 'users', uid, 'workouts'));
      const snap = await getDocs(q);
      const deletes = snap.docs.map(d => deleteDoc(d.ref));
      await Promise.all(deletes);
      await deleteDoc(doc(db, 'users', uid, 'profile', 'stats'));
      await deleteDoc(doc(db, 'users', uid, 'profile', 'wellness'));
    } catch (e) {
      console.warn("Could not clear all firestore documents", e);
    }
  }
  localStorage.removeItem(`bodyforge_history_${uid || 'guest'}`);
  localStorage.removeItem(`bodyforge_wellness_${uid || 'guest'}`);
  localStorage.removeItem(`bodyforge_chats_${uid || 'guest'}`);
};

// CHAT HISTORY PERSISTENCE
export const saveChatSession = async (uid: string, session: ChatSession): Promise<void> => {
  if (db && uid && !uid.startsWith('guest_')) {
    try {
      const chatRef = doc(db, 'users', uid, 'chats', session.id);
      await setDoc(chatRef, session, { merge: true });
    } catch (err) {
      console.warn('Error saving chat to firestore', err);
    }
  }
  // Always update local cache for instant offline access
  const storageKey = `bodyforge_chats_${uid || 'guest'}`;
  const raw = localStorage.getItem(storageKey);
  let list: ChatSession[] = raw ? JSON.parse(raw) : [];
  const idx = list.findIndex(s => s.id === session.id);
  if (idx >= 0) {
    list[idx] = session;
  } else {
    list.unshift(session);
  }
  localStorage.setItem(storageKey, JSON.stringify(list));
};

export const fetchChatSessions = async (uid: string): Promise<ChatSession[]> => {
  if (db && uid && !uid.startsWith('guest_')) {
    try {
      const q = query(collection(db, 'users', uid, 'chats'), orderBy('updatedAt', 'desc'));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map(d => d.data() as ChatSession);
      }
    } catch (err) {
      console.warn('Error fetching chats from firestore', err);
    }
  }
  const storageKey = `bodyforge_chats_${uid || 'guest'}`;
  const raw = localStorage.getItem(storageKey);
  return raw ? JSON.parse(raw) : [];
};

export const deleteChatSession = async (uid: string, sessionId: string): Promise<void> => {
  if (db && uid && !uid.startsWith('guest_')) {
    try {
      await deleteDoc(doc(db, 'users', uid, 'chats', sessionId));
    } catch (err) {
      console.warn('Error deleting chat from firestore', err);
    }
  }
  const storageKey = `bodyforge_chats_${uid || 'guest'}`;
  const raw = localStorage.getItem(storageKey);
  if (raw) {
    const list: ChatSession[] = JSON.parse(raw);
    const filtered = list.filter(s => s.id !== sessionId);
    localStorage.setItem(storageKey, JSON.stringify(filtered));
  }
};

// WORKOUT REVIEWS PERSISTENCE
const DEFAULT_PRESEED_REVIEWS: WorkoutReview[] = [
  {
    id: 'rev-1',
    workoutId: 'chest-armor-foundations',
    workoutTitle: 'Pectoral Armor',
    userId: 'athlete_sarah',
    userName: 'Sarah Jenkins',
    rating: 5,
    comment: 'The 45-degree elbow cue completely eliminated my shoulder impingement. Loved the diamond push-up finisher!',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    difficultyFelt: 'Intermediate',
    likes: 14
  },
  {
    id: 'rev-2',
    workoutId: 'chest-armor-foundations',
    workoutTitle: 'Pectoral Armor',
    userId: 'athlete_marcus',
    userName: 'Marcus Thorne',
    rating: 5,
    comment: 'Great pump with zero equipment. Elevated pushups with feet on couch burned like crazy.',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    difficultyFelt: 'Advanced',
    likes: 8
  },
  {
    id: 'rev-3',
    workoutId: 'core-forge-iron',
    workoutTitle: 'Hollow Core Matrix',
    userId: 'athlete_elena',
    userName: 'Elena Rostova',
    rating: 5,
    comment: 'The posterior pelvic tilt cues helped me feel my deep transverse abs instead of stressing my hip flexors.',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    difficultyFelt: 'Beginner',
    likes: 19
  }
];

export const saveWorkoutReview = async (review: WorkoutReview): Promise<void> => {
  if (db) {
    try {
      const reviewRef = doc(db, 'workout_reviews', review.id);
      await setDoc(reviewRef, review);
    } catch (err) {
      console.warn('Error saving review to Firestore', err);
    }
  }
  const storageKey = `bodyforge_reviews_${review.workoutId}`;
  const raw = localStorage.getItem(storageKey);
  const list: WorkoutReview[] = raw ? JSON.parse(raw) : [];
  list.unshift(review);
  localStorage.setItem(storageKey, JSON.stringify(list));
};

export const fetchWorkoutReviews = async (workoutId: string): Promise<WorkoutReview[]> => {
  if (db) {
    try {
      const q = query(collection(db, 'workout_reviews'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      const docs = snap.docs.map(d => d.data() as WorkoutReview).filter(r => r.workoutId === workoutId);
      if (docs.length > 0) return docs;
    } catch (err) {
      console.warn('Error reading reviews from Firestore', err);
    }
  }
  const storageKey = `bodyforge_reviews_${workoutId}`;
  const raw = localStorage.getItem(storageKey);
  const localList: WorkoutReview[] = raw ? JSON.parse(raw) : [];
  
  // Combine with preseeded reviews if none exist
  const seeded = DEFAULT_PRESEED_REVIEWS.filter(r => r.workoutId === workoutId);
  const combined = [...localList];
  for (const s of seeded) {
    if (!combined.some(c => c.id === s.id)) {
      combined.push(s);
    }
  }
  return combined;
};

function calculateNewStreak(lastDateStr?: string | null, newDateStr?: string, currentStreak: number = 0): number {
  if (!lastDateStr || !newDateStr) return 1;
  const last = new Date(lastDateStr);
  const current = new Date(newDateStr);
  
  const lastLocal = `${last.getFullYear()}-${last.getMonth() + 1}-${last.getDate()}`;
  const currentLocal = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
  
  if (lastLocal === currentLocal) {
    return Math.max(1, currentStreak);
  }
  
  const diffDays = Math.round((current.getTime() - last.getTime()) / (1000 * 3600 * 24));
  if (diffDays <= 2) {
    return currentStreak + 1;
  }
  return 1;
}
