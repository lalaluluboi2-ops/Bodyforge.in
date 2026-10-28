import React from 'react';
import { Home, Dumbbell, Sun, User, Sparkles, HeartPulse, LogOut, LogIn, Utensils, Bell } from 'lucide-react';
import { motion } from 'motion/react';

interface NavigationProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  isAuthenticated: boolean;
  onAuthAction: () => void;
  displayName: string | null;
  onOpenNotifications?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  isAuthenticated,
  onAuthAction,
  displayName,
  onOpenNotifications
}) => {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'library', label: 'Workouts', icon: Dumbbell },
    { id: 'nutrition', label: 'Nutrition', icon: Utensils },
    { id: 'wellness', label: 'Wellness', icon: HeartPulse },
    { id: 'seasonal', label: 'Programs', icon: Sun },
    { id: 'facial', label: 'Glow-Up', icon: Sparkles },
    { id: 'progress', label: 'Progress', icon: User },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar with Smooth Indicator */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-charcoal-950/95 backdrop-blur-lg border-t border-charcoal-800 z-40 px-1 py-1.5 flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              whileTap={{ scale: 0.92 }}
              className={`relative flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-colors duration-200 ${
                isActive ? 'text-forge-lime font-bold' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="mobileActiveTabIndicator"
                  className="absolute inset-0 bg-forge-lime/10 border border-forge-lime/30 rounded-xl -z-10 shadow-subtle-glow"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[9px] mt-0.5 font-sans leading-none">{tab.label}</span>
            </motion.button>
          );
        })}
        {onOpenNotifications && (
          <motion.button
            onClick={onOpenNotifications}
            whileTap={{ scale: 0.92 }}
            className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-gray-400 hover:text-forge-lime transition-colors duration-200 relative"
            title="Daily Reminder Settings"
          >
            <Bell className="w-4 h-4 stroke-2" />
            <span className="text-[9px] mt-0.5 font-sans leading-none">Alerts</span>
            <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-forge-lime animate-pulse" />
          </motion.button>
        )}
      </nav>

      {/* Desktop Top Header Bar with Smooth Sliding Layout Pill */}
      <header className="hidden md:flex items-center justify-between px-8 py-3.5 bg-charcoal-950/90 backdrop-blur-md border-b border-charcoal-800 sticky top-0 z-40">
        <motion.div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => onSelectTab('dashboard')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="w-9 h-9 rounded-xl bg-forge-lime flex items-center justify-center text-black font-black text-xl shadow-forge-glow transition-transform duration-300 group-hover:rotate-3">
            B
          </div>
          <span className="text-xl font-black text-white tracking-tight">
            BODY<span className="text-forge-lime">FORGE</span>
          </span>
        </motion.div>

        {/* Desktop Sliding Navigation Pill Container */}
        <div className="flex items-center gap-1 bg-charcoal-900/90 border border-charcoal-800 p-1 rounded-2xl relative backdrop-blur-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                whileTap={{ scale: 0.96 }}
                className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors duration-200 z-10 ${
                  isActive 
                    ? 'text-forge-lime font-bold' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="desktopActiveTabIndicator"
                    className="absolute inset-0 bg-charcoal-800 border border-charcoal-700 rounded-xl shadow-md -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'scale-105' : ''}`} />
                <span>{tab.label}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="flex items-center gap-2.5">
          {onOpenNotifications && (
            <motion.button
              onClick={onOpenNotifications}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="p-2 rounded-xl bg-charcoal-900 border border-charcoal-800 text-gray-300 hover:text-forge-lime hover:border-charcoal-700 transition-all relative group"
              title="Daily Workout Reminders"
            >
              <Bell className="w-4 h-4 transition-transform group-hover:rotate-12" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-forge-lime shadow-forge-glow animate-pulse" />
            </motion.button>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-3 pl-1">
              <span className="text-xs text-gray-300 font-mono">{displayName || 'Athlete'}</span>
              <motion.button
                onClick={onAuthAction}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="p-2 rounded-xl bg-charcoal-900 border border-charcoal-800 text-gray-400 hover:text-red-400 hover:border-red-500/30 transition-all"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </motion.button>
            </div>
          ) : (
            <motion.button
              onClick={onAuthAction}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 rounded-xl bg-forge-lime text-black font-bold text-xs flex items-center gap-1.5 shadow-forge-glow hover:bg-forge-lime-hover transition-all"
            >
              <LogIn className="w-4 h-4" /> Sign In
            </motion.button>
          )}
        </div>
      </header>
    </>
  );
};
export default Navigation;
