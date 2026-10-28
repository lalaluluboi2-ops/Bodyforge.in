import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, Info, X } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });
  const [showReconnected, setShowReconnected] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      const timer = setTimeout(() => setShowReconnected(false), 4500);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showReconnected) {
    return null;
  }

  if (showReconnected) {
    return (
      <aside 
        aria-label="Network status notification"
        className="fixed top-16 md:top-20 inset-x-4 md:inset-x-auto md:right-6 z-50 max-w-md bg-emerald-950/95 border border-emerald-500/80 text-emerald-100 rounded-2xl p-3.5 shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 animate-bounce"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Wifi className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Back Online</h4>
            <p className="text-[11px] text-emerald-200/80">Internet restored. Cloud sync and live BodyBuddy AI are available.</p>
          </div>
        </div>
        <button 
          onClick={() => setShowReconnected(false)}
          className="text-emerald-400 hover:text-white p-1"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </aside>
    );
  }

  return (
    <aside 
      aria-label="Network status notification"
      className="fixed top-16 md:top-20 inset-x-4 md:inset-x-auto md:right-6 z-50 max-w-md bg-amber-950/95 border border-amber-500/80 text-amber-100 rounded-2xl p-4 shadow-2xl backdrop-blur-md space-y-2.5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 animate-pulse">
            <WifiOff className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Offline Mode Active</span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 uppercase">
                Zero Interruption
              </span>
            </h4>
            <p className="text-[11px] text-amber-200/80 mt-0.5">
              No internet connection detected. You can continue training without pause!
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-amber-300 underline font-mono shrink-0 hover:text-white"
        >
          {isExpanded ? 'Hide' : 'Details'}
        </button>
      </div>

      {isExpanded && (
        <div className="pt-2 border-t border-amber-800/60 text-[10px] space-y-1 font-mono text-amber-200/90">
          <p className="text-forge-lime font-bold">🟢 Fully working offline:</p>
          <p>• All workouts & live timer countdowns</p>
          <p>• Animated biomechanical motion demos</p>
          <p>• Offline workout history & streak saves</p>
          <p>• Full food & nutrition meal plans</p>
          <p className="text-amber-400 font-bold mt-1.5">🟡 Requires reconnect:</p>
          <p>• Live Gemini streaming & cloud Firestore sync</p>
        </div>
      )}
    </aside>
  );
};
