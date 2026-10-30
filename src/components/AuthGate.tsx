import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Dumbbell, 
  Sparkles, 
  Flame, 
  Bell, 
  Utensils, 
  ArrowRight, 
  Key,
  CheckCircle2,
  Lock,
  UserCheck
} from 'lucide-react';
import { signInWithGoogle, isFirebaseConfigured } from '../services/firebase';

interface AuthGateProps {
  onLoginSuccess: (userObj: { uid: string; displayName: string; email: string; photoURL?: string }) => void;
  onOpenFirebaseSetup: () => void;
}

export const AuthGate: React.FC<AuthGateProps> = ({
  onLoginSuccess,
  onOpenFirebaseSetup
}) => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setErrorMsg(null);
    try {
      if (isFirebaseConfigured) {
        const user = await signInWithGoogle();
        if (user) {
          onLoginSuccess({
            uid: user.uid,
            displayName: user.displayName || 'Forge Athlete',
            email: user.email || 'athlete@google.com',
            photoURL: user.photoURL || undefined
          });
          return;
        }
      } else {
        // If Firebase is not yet provisioned in environment variables, trigger smooth preview login
        onLoginSuccess({
          uid: 'google_athlete_' + Date.now().toString(36),
          displayName: 'Google Verified Athlete',
          email: 'athlete.user@gmail.com'
        });
      }
    } catch (err: any) {
      console.warn('Google Sign-In caught error:', err);
      // If popup was blocked or Firebase error, provide helpful guidance
      setErrorMsg('Google sign-in popup was blocked or Firebase configuration is needed. You can use the Quick Athlete Login below to enter immediately.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleDemoLogin = (profileNum: number) => {
    if (profileNum === 1) {
      onLoginSuccess({
        uid: 'user_alex_runner',
        displayName: 'Alex Thorne',
        email: 'alex.thorne@gmail.com'
      });
    } else {
      onLoginSuccess({
        uid: 'user_maya_strength',
        displayName: 'Maya Lin',
        email: 'maya.lin@gmail.com'
      });
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-950 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden text-gray-100 selection:bg-forge-lime selection:text-black">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-forge-lime/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-forge-cyan/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Card */}
      <div className="w-full max-w-md bg-charcoal-900/90 border border-charcoal-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-charcoal-950 border border-charcoal-800 p-2 shadow-forge-glow mb-1">
            <img 
              src="/logo.png" 
              alt="Bodyforge Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              BODY<span className="text-forge-lime">FORGE</span>
            </h1>
            <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mt-1">
              Personal Calisthenics & Wellness
            </p>
          </div>
        </div>

        {/* Welcome Pitch */}
        <div className="p-4 rounded-2xl bg-charcoal-950/70 border border-charcoal-850 space-y-2 text-xs text-gray-300">
          <div className="flex items-center gap-1.5 text-forge-lime font-bold uppercase tracking-wider text-[10px] font-mono">
            <Lock className="w-3.5 h-3.5" />
            <span>Mandatory Athlete Authentication</span>
          </div>
          <p className="leading-relaxed">
            Sign in with your Google account to access your private dashboard, track daily workouts, set custom notifications, and save your personal chat history.
          </p>
          <div className="pt-2 border-t border-charcoal-800/60 flex items-center justify-between text-[10px] font-mono text-gray-400">
            <span>Created by Debojyoti Karmakar</span>
            <span className="text-forge-cyan">Zero Equipment</span>
          </div>
        </div>

        {/* Error notification if any */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-amber-950/80 border border-amber-500/50 text-amber-200 text-xs leading-relaxed space-y-1">
            <p>{errorMsg}</p>
          </div>
        )}

        {/* Primary Google Login Button */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleSignIn}
            disabled={isSigningIn}
            className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-gray-100 text-charcoal-950 font-bold text-sm flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-[0.98] transition-all cursor-pointer group"
          >
            {/* Google G Logo SVG */}
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{isSigningIn ? 'Signing In...' : 'Continue with Google'}</span>
          </button>

          {/* Quick Demo Athlete Login Options (Guarantees multi-user testability in iframe) */}
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px flex-1 bg-charcoal-800" />
              <span className="text-[10px] font-mono uppercase text-gray-500">Or Preview User Isolation</span>
              <div className="h-px flex-1 bg-charcoal-800" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleDemoLogin(1)}
                className="py-2.5 px-3 rounded-xl bg-charcoal-950 border border-charcoal-800 hover:border-forge-lime text-left text-xs transition-all group"
              >
                <div className="flex items-center gap-1.5 text-white font-bold group-hover:text-forge-lime">
                  <UserCheck className="w-3.5 h-3.5 text-forge-lime" />
                  <span>Alex T.</span>
                </div>
                <span className="text-[9px] text-gray-500 font-mono">alex.thorne@gmail.com</span>
              </button>

              <button
                onClick={() => handleDemoLogin(2)}
                className="py-2.5 px-3 rounded-xl bg-charcoal-950 border border-charcoal-800 hover:border-forge-cyan text-left text-xs transition-all group"
              >
                <div className="flex items-center gap-1.5 text-white font-bold group-hover:text-forge-cyan">
                  <UserCheck className="w-3.5 h-3.5 text-forge-cyan" />
                  <span>Maya L.</span>
                </div>
                <span className="text-[9px] text-gray-500 font-mono">maya.lin@gmail.com</span>
              </button>
            </div>
          </div>
        </div>

        {/* Features Checklist */}
        <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-400 font-medium pt-1">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-forge-lime shrink-0" />
            <span>Motion Video Demos</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-forge-lime shrink-0" />
            <span>Smart Notifications</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-forge-lime shrink-0" />
            <span>Goal-Based Food Plans</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-forge-lime shrink-0" />
            <span>Private Chat History</span>
          </div>
        </div>

        {/* Firebase Config Link */}
        <div className="pt-2 text-center">
          <button
            onClick={onOpenFirebaseSetup}
            className="text-[10px] text-gray-500 hover:text-gray-300 font-mono underline inline-flex items-center gap-1"
          >
            <Key className="w-3 h-3" />
            <span>Configure Live Firebase Credentials</span>
          </button>
        </div>
      </div>
    </div>
  );
};
