import React from 'react';
import { X, Key, ShieldCheck } from 'lucide-react';
import { isFirebaseConfigured } from '../services/firebase';

interface FirebaseSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUseGuestMode: () => void;
}

export const FirebaseSetupModal: React.FC<FirebaseSetupModalProps> = ({
  isOpen,
  onClose,
  onUseGuestMode
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-charcoal-900 border border-charcoal-700 rounded-3xl p-6 text-gray-100 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-forge-lime">
            <Key className="w-5 h-5" />
            <h3 className="font-bold text-base text-white">Firebase & Google Auth Setup</h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg text-gray-400 hover:text-white"
            aria-label="Close setup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed">
          {isFirebaseConfigured
            ? "Firebase configuration found in your environment. You can sign in with your Google account."
            : "BODYFORGE is currently operating in Local Dev Mode with local storage persistence because Firebase environment variables are not yet present in your deployment."}
        </p>

        <div className="bg-charcoal-950 p-3.5 rounded-xl border border-charcoal-800 text-[11px] font-mono text-gray-400 space-y-1">
          <p className="text-forge-lime font-bold">To connect your live Firebase project:</p>
          <p>1. Open Google Firebase Console & create a project.</p>
          <p>2. Enable Google Authentication & Cloud Firestore.</p>
          <p>3. Add credentials to your <code className="text-white">.env</code> file:</p>
          <div className="p-2 bg-charcoal-900 rounded border border-charcoal-800 text-[10px] text-gray-300 mt-2 space-y-0.5 overflow-x-auto">
            <p>VITE_FIREBASE_API_KEY=your_key</p>
            <p>VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com</p>
            <p>VITE_FIREBASE_PROJECT_ID=your_project</p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => {
              onUseGuestMode();
              onClose();
            }}
            className="flex-1 py-3 rounded-xl bg-forge-lime hover:bg-forge-lime-hover text-black font-extrabold uppercase text-xs tracking-wider transition-all"
          >
            Continue in Active Offline/Dev Mode
          </button>
        </div>
      </div>
    </div>
  );
};
