import React, { useState, useEffect, useCallback } from 'react';
import { 
  auth, 
  signInWithGoogle, 
  logoutUser, 
  isFirebaseConfigured, 
  saveCompletedWorkout, 
  fetchWorkoutHistory,
  saveWellnessRoutineProgress,
  fetchCompletedWellnessRoutines,
  clearUserData
} from './services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { 
  Workout, 
  CompletedWorkoutRecord, 
  UserFitnessProfile, 
  WellnessArticle 
} from './types';
import { WORKOUT_DATABASE } from './data/workouts';
import { WELLNESS_ARTICLES } from './data/wellnessContent';
import { LoadingScreen } from './components/LoadingScreen';
import { AuthGate } from './components/AuthGate';
import { OfflineBanner } from './components/OfflineBanner';
import { NotificationSettingsModal } from './components/NotificationSettingsModal';
import { Navigation } from './components/Navigation';
import { FirebaseSetupModal } from './components/FirebaseSetupModal';
import { BodyBuddyChat } from './components/BodyBuddyChat';
import { DashboardView } from './views/DashboardView';
import { WorkoutLibraryView } from './views/WorkoutLibraryView';
import { WorkoutDetailView } from './views/WorkoutDetailView';
import { LiveWorkoutPlayerView } from './views/LiveWorkoutPlayerView';
import { NutritionView } from './views/NutritionView';
import { SeasonalProgramsView } from './views/SeasonalProgramsView';
import { FacialFitnessView } from './views/FacialFitnessView';
import { ProgressTrackingView } from './views/ProgressTrackingView';
import { WellnessHubView } from './views/WellnessHubView';
import { WellnessArticleView } from './views/WellnessArticleView';
import { PainMobilityView } from './views/PainMobilityView';
import { checkAndTriggerDailyReminder } from './services/notificationService';
import { Bell, Flame, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentTab, setCurrentTab] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam && ['dashboard', 'library', 'nutrition', 'wellness', 'seasonal', 'facial', 'progress'].includes(tabParam)) {
        return tabParam;
      }
    }
    return 'dashboard';
  });
  
  // Active deep views
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [isPlayingWorkout, setIsPlayingWorkout] = useState<Workout | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<WellnessArticle | null>(null);
  const [isViewingPainLibrary, setIsViewingPainLibrary] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('view') === 'pain-library';
    }
    return false;
  });
  
  // Modals and Alerts
  const [showConfigModal, setShowConfigModal] = useState<boolean>(false);
  const [showNotificationModal, setShowNotificationModal] = useState<boolean>(false);
  const [inAppAlertMessage, setInAppAlertMessage] = useState<string | null>(null);

  const [workoutHistory, setWorkoutHistory] = useState<CompletedWorkoutRecord[]>([]);
  const [savedWellnessRoutines, setSavedWellnessRoutines] = useState<string[]>([]);

  // User Fitness & Wellness Profile
  const [profile, setProfile] = useState<UserFitnessProfile>({
    uid: 'guest_athlete',
    displayName: 'Athlete',
    email: null,
    experienceLevel: 'Intermediate',
    mainGoal: 'Bodyweight Strength & Posture',
    preferredDurationMinutes: 20,
    daysAvailablePerWeek: 4,
    streakDays: 3,
    lastWorkoutDate: new Date(Date.now() - 86400000).toISOString(),
    totalWorkouts: 8,
    totalMinutes: 145,
    wellnessGoalsConsent: true,
  });

  const handleLoginSuccess = useCallback(async (userObj: { uid: string; displayName: string; email: string; photoURL?: string }) => {
    const syntheticUser = {
      uid: userObj.uid,
      displayName: userObj.displayName,
      email: userObj.email,
      photoURL: userObj.photoURL || null,
    } as unknown as User;

    setCurrentUser(syntheticUser);
    setProfile((prev) => ({
      ...prev,
      uid: userObj.uid,
      displayName: userObj.displayName || 'Forge Athlete',
      email: userObj.email,
    }));

    try {
      localStorage.setItem('bodyforge_current_user', JSON.stringify({
        uid: userObj.uid,
        displayName: userObj.displayName,
        email: userObj.email,
        photoURL: userObj.photoURL
      }));
    } catch (e) {
      console.warn('Could not store session locally', e);
    }

    const records = await fetchWorkoutHistory(userObj.uid);
    setWorkoutHistory(records);
    const wellness = await fetchCompletedWellnessRoutines(userObj.uid);
    setSavedWellnessRoutines(wellness);
  }, []);

  // Listen to Firebase Auth state or restore saved athlete session
  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setCurrentUser(user);
          setProfile((prev) => ({
            ...prev,
            uid: user.uid,
            displayName: user.displayName || 'Forge Athlete',
            email: user.email,
          }));
          const records = await fetchWorkoutHistory(user.uid);
          setWorkoutHistory(records);
          const wellness = await fetchCompletedWellnessRoutines(user.uid);
          setSavedWellnessRoutines(wellness);
        } else {
          // Check if local cache has an active session
          try {
            const cached = localStorage.getItem('bodyforge_current_user');
            if (cached) {
              const parsed = JSON.parse(cached);
              handleLoginSuccess(parsed);
            } else {
              setCurrentUser(null);
            }
          } catch {
            setCurrentUser(null);
          }
        }
      });
      return () => unsubscribe();
    } else {
      // Restore cached verified session if any
      try {
        const cached = localStorage.getItem('bodyforge_current_user');
        if (cached) {
          const parsed = JSON.parse(cached);
          handleLoginSuccess(parsed);
        }
      } catch {
        // no cached user
      }
    }
  }, [handleLoginSuccess]);

  // Daily reminder background checker (runs every 60s)
  useEffect(() => {
    if (!currentUser) return;
    
    // Check right after user is confirmed
    const checkTimer = setTimeout(() => {
      checkAndTriggerDailyReminder(profile.uid, profile.lastWorkoutDate, (msg) => {
        setInAppAlertMessage(msg);
      });
    }, 3000);

    const interval = setInterval(() => {
      checkAndTriggerDailyReminder(profile.uid, profile.lastWorkoutDate, (msg) => {
        setInAppAlertMessage(msg);
      });
    }, 60000);

    return () => {
      clearTimeout(checkTimer);
      clearInterval(interval);
    };
  }, [currentUser, profile.uid, profile.lastWorkoutDate]);

  const handleAuthAction = async () => {
    if (currentUser) {
      await logoutUser();
      localStorage.removeItem('bodyforge_current_user');
      setCurrentUser(null);
      setProfile((prev) => ({ ...prev, uid: 'guest_athlete', displayName: 'Athlete', email: null }));
    } else {
      if (isFirebaseConfigured && auth) {
        try {
          await signInWithGoogle();
        } catch {
          setShowConfigModal(true);
        }
      } else {
        setShowConfigModal(true);
      }
    }
  };

  const handleWorkoutFinished = async (record: CompletedWorkoutRecord) => {
    setWorkoutHistory((prev) => [record, ...prev]);
    setProfile((prev) => ({
      ...prev,
      totalWorkouts: prev.totalWorkouts + 1,
      totalMinutes: prev.totalMinutes + Math.round(record.durationSeconds / 60),
      streakDays: prev.streakDays + 1,
      lastWorkoutDate: record.date
    }));

    await saveCompletedWorkout(profile.uid, record);
    setIsPlayingWorkout(null);
    setSelectedWorkout(null);
    setCurrentTab('progress');
  };

  const handleSaveWellnessRoutine = async (articleId: string) => {
    setSavedWellnessRoutines((prev) => {
      if (!prev.includes(articleId)) {
        return [...prev, articleId];
      }
      return prev;
    });
    await saveWellnessRoutineProgress(profile.uid, articleId);
  };

  const handleClearAllData = async () => {
    await clearUserData(profile.uid);
    setWorkoutHistory([]);
    setSavedWellnessRoutines([]);
    setProfile((prev) => ({
      ...prev,
      totalWorkouts: 0,
      totalMinutes: 0,
      streakDays: 0,
      lastWorkoutDate: null
    }));
  };

  const handleNavigateTab = (tab: string) => {
    setSelectedWorkout(null);
    setSelectedArticle(null);
    setIsViewingPainLibrary(false);
    setCurrentTab(tab);
    if (typeof window !== 'undefined' && window.history) {
      const newUrl = tab === 'dashboard' ? window.location.pathname : `${window.location.pathname}?tab=${tab}`;
      window.history.replaceState(null, '', newUrl);
    }
  };

  const handleOpenPainLibrary = () => {
    setSelectedWorkout(null);
    setSelectedArticle(null);
    setIsViewingPainLibrary(true);
    if (typeof window !== 'undefined' && window.history) {
      window.history.replaceState(null, '', `${window.location.pathname}?view=pain-library`);
    }
  };

  const handleClosePainLibrary = () => {
    setIsViewingPainLibrary(false);
    if (typeof window !== 'undefined' && window.history) {
      const newUrl = currentTab === 'dashboard' ? window.location.pathname : `${window.location.pathname}?tab=${currentTab}`;
      window.history.replaceState(null, '', newUrl);
    }
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  // 1. Mandatory Google Account Login Gate
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-charcoal-950 text-gray-100 flex flex-col font-sans">
        <OfflineBanner />
        <AuthGate 
          onLoginSuccess={handleLoginSuccess}
          onOpenFirebaseSetup={() => setShowConfigModal(true)}
        />
        <FirebaseSetupModal
          isOpen={showConfigModal}
          onClose={() => setShowConfigModal(false)}
          onUseGuestMode={() => {
            setShowConfigModal(false);
            handleLoginSuccess({
              uid: 'athlete_' + Date.now().toString(36),
              displayName: 'Preview Athlete',
              email: 'athlete.preview@bodyforge.app'
            });
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-950 text-gray-100 flex flex-col font-sans selection:bg-forge-lime selection:text-black">
      {/* Network Offline Alert Banner */}
      <OfflineBanner />

      {/* In-App Daily Reminder Notification Banner */}
      {inAppAlertMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-gradient-to-r from-forge-lime/20 via-forge-lime/10 to-charcoal-900 border-b border-forge-lime/30 px-4 py-2.5 flex items-center justify-between z-30"
        >
          <div className="flex items-center gap-2.5 text-xs text-white">
            <span className="p-1 rounded-lg bg-forge-lime text-black font-bold">
              <Bell className="w-3.5 h-3.5" />
            </span>
            <span className="font-medium">{inAppAlertMessage}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedWorkout(WORKOUT_DATABASE[0]);
                setInAppAlertMessage(null);
              }}
              className="px-2.5 py-1 rounded-lg bg-forge-lime text-black font-bold text-[11px] flex items-center gap-1 hover:bg-forge-lime-hover transition-colors cursor-pointer"
            >
              <Flame className="w-3 h-3" /> Train Now <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => setInAppAlertMessage(null)}
              className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-charcoal-800 transition-colors cursor-pointer"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Main Responsive Navigation - shown when not in deep fullscreen workout player or subviews */}
      {!isPlayingWorkout && !selectedWorkout && !selectedArticle && !isViewingPainLibrary && (
        <Navigation
          currentTab={currentTab}
          onSelectTab={handleNavigateTab}
          isAuthenticated={Boolean(currentUser)}
          onAuthAction={handleAuthAction}
          displayName={profile.displayName}
          onOpenNotifications={() => setShowNotificationModal(true)}
        />
      )}

      <main className="flex-1 pb-16 md:pb-6 relative">
        <AnimatePresence mode="wait">
          {isPlayingWorkout ? (
            <motion.div
              key={`player-${isPlayingWorkout.id}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="min-h-screen bg-charcoal-950"
            >
              <LiveWorkoutPlayerView
                workout={isPlayingWorkout}
                uid={profile.uid}
                onExit={() => setIsPlayingWorkout(null)}
                onFinished={handleWorkoutFinished}
              />
            </motion.div>
          ) : selectedWorkout ? (
            <motion.div
              key={`detail-${selectedWorkout.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="min-h-screen bg-charcoal-950"
            >
              <WorkoutDetailView
                workout={selectedWorkout}
                onBack={() => setSelectedWorkout(null)}
                onStart={(w) => setIsPlayingWorkout(w)}
                currentUserId={profile.uid}
                currentUserName={profile.displayName || 'Athlete'}
              />
            </motion.div>
          ) : selectedArticle ? (
            <motion.div
              key={`article-${selectedArticle.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="min-h-screen bg-charcoal-950"
            >
              <WellnessArticleView
                article={selectedArticle}
                onBack={() => setSelectedArticle(null)}
                onSaveRoutine={handleSaveWellnessRoutine}
                isSaved={savedWellnessRoutines.includes(selectedArticle.id)}
              />
            </motion.div>
          ) : isViewingPainLibrary ? (
            <motion.div
              key="pain-library"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="min-h-screen bg-charcoal-950"
            >
              <PainMobilityView
                onBack={handleClosePainLibrary}
              />
            </motion.div>
          ) : (
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 8, scale: 0.996 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.996 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              {currentTab === 'dashboard' && (
                <DashboardView
                  profile={profile}
                  history={workoutHistory}
                  dailyWorkout={WORKOUT_DATABASE[0]}
                  featuredArticle={WELLNESS_ARTICLES[0]}
                  onSelectWorkout={(w) => setSelectedWorkout(w)}
                  onOpenLibrary={() => setCurrentTab('library')}
                  onOpenWellness={() => setCurrentTab('wellness')}
                  onSelectArticle={(a) => setSelectedArticle(a)}
                  onOpenPainLibrary={handleOpenPainLibrary}
                />
              )}

              {currentTab === 'library' && (
                <WorkoutLibraryView
                  workouts={WORKOUT_DATABASE}
                  onSelectWorkout={(w) => setSelectedWorkout(w)}
                />
              )}

              {currentTab === 'nutrition' && (
                <NutritionView />
              )}

              {currentTab === 'wellness' && (
                <WellnessHubView
                  onSelectArticle={(a) => setSelectedArticle(a)}
                  onOpenPainLibrary={handleOpenPainLibrary}
                />
              )}

              {currentTab === 'seasonal' && (
                <SeasonalProgramsView
                  onStartProgram={(w) => setSelectedWorkout(w)}
                />
              )}

              {currentTab === 'facial' && (
                <FacialFitnessView
                  onStartRoutine={(w) => setSelectedWorkout(w)}
                />
              )}

              {currentTab === 'progress' && (
                <ProgressTrackingView
                  history={workoutHistory}
                  profile={profile}
                  completedWellnessRoutines={savedWellnessRoutines}
                  onClearAllData={handleClearAllData}
                  onUpdateConsent={(consent) => setProfile(p => ({ ...p, wellnessGoalsConsent: consent }))}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating BodyBuddy AI Assistant available everywhere with persistent multi-session chat history */}
      <BodyBuddyChat
        userProfile={profile}
        onNavigateTab={handleNavigateTab}
      />

      {/* Smart Daily Workout Notification Settings Modal */}
      <NotificationSettingsModal
        isOpen={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
        uid={profile.uid}
        lastWorkoutDate={profile.lastWorkoutDate}
        onInAppAlert={(msg) => setInAppAlertMessage(msg)}
      />

      {/* Firebase Provisioning / Info Modal */}
      <FirebaseSetupModal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        onUseGuestMode={() => {
          setShowConfigModal(false);
        }}
      />
    </div>
  );
};

export default App;
