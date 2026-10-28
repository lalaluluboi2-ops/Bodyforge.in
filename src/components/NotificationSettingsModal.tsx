import React, { useState, useEffect } from 'react';
import { 
  X, 
  Bell, 
  BellOff, 
  Clock, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Sparkles, 
  Send,
  AlertCircle
} from 'lucide-react';
import { NotificationSettings } from '../types';
import { 
  getNotificationSettings, 
  saveNotificationSettings,
  requestNotificationPermission,
  getNotificationPermission,
  isWorkoutCompletedToday,
  triggerTestReminder
} from '../services/notificationService';

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  uid: string;
  lastWorkoutDate: string | null;
  onInAppAlert: (msg: string) => void;
}

export const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({
  isOpen,
  onClose,
  uid,
  lastWorkoutDate,
  onInAppAlert
}) => {
  const [settings, setSettings] = useState<NotificationSettings>(() => getNotificationSettings(uid));
  const [permission, setPermission] = useState<NotificationPermission>(() => getNotificationPermission());
  const [testSent, setTestSent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSettings(getNotificationSettings(uid));
      setPermission(getNotificationPermission());
    }
  }, [isOpen, uid]);

  if (!isOpen) return null;

  const handleToggleEnabled = async () => {
    const nextState = !settings.enabled;
    if (nextState && permission !== 'granted') {
      const result = await requestNotificationPermission();
      setPermission(result);
    }
    const updated: NotificationSettings = { ...settings, enabled: nextState };
    setSettings(updated);
    saveNotificationSettings(uid, updated);
  };

  const handleTimeChange = (newTime: string) => {
    const updated: NotificationSettings = { ...settings, time: newTime };
    setSettings(updated);
    saveNotificationSettings(uid, updated);
  };

  const handleToggleSound = () => {
    const updated: NotificationSettings = { ...settings, sound: !settings.sound };
    setSettings(updated);
    saveNotificationSettings(uid, updated);
  };

  const handleTestNotification = () => {
    triggerTestReminder(settings, onInAppAlert);
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  const isCompletedToday = isWorkoutCompletedToday(lastWorkoutDate);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-charcoal-900 border border-charcoal-700 rounded-3xl p-6 text-gray-100 shadow-2xl space-y-5 animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-forge-lime">
            <div className="w-9 h-9 rounded-xl bg-forge-lime/10 border border-forge-lime/30 flex items-center justify-center">
              <Bell className="w-5 h-5 text-forge-lime" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Daily Workout Reminders</h3>
              <p className="text-[11px] text-gray-400 font-mono">Smart training notification engine</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-charcoal-800 transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Today Status Badge */}
        <div className={`p-3.5 rounded-2xl border flex items-center gap-3 text-xs ${
          isCompletedToday 
            ? 'bg-emerald-950/40 border-emerald-600/40 text-emerald-200' 
            : 'bg-charcoal-950 border-charcoal-800 text-gray-300'
        }`}>
          <CheckCircle2 className={`w-5 h-5 shrink-0 ${isCompletedToday ? 'text-emerald-400' : 'text-gray-500'}`} />
          <div>
            <span className="font-bold text-white block">
              {isCompletedToday ? "Today's Workout Complete! 🎉" : "Today's Workout Pending"}
            </span>
            <span className="text-[11px] text-gray-400">
              {isCompletedToday 
                ? "Daily reminders are automatically paused for today." 
                : "You will receive an alert if not finished by your scheduled time."}
            </span>
          </div>
        </div>

        {/* Master Toggle */}
        <div className="p-4 rounded-2xl bg-charcoal-950 border border-charcoal-850 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-white">Enable Daily Notifications</h4>
            <p className="text-[10px] text-gray-400">System alert & sound cues</p>
          </div>
          <button
            onClick={handleToggleEnabled}
            className={`w-12 h-7 rounded-full p-1 transition-all ${
              settings.enabled ? 'bg-forge-lime' : 'bg-charcoal-800'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-black shadow-md transition-all ${
              settings.enabled ? 'translate-x-5' : 'translate-x-0 bg-gray-400'
            }`} />
          </button>
        </div>

        {/* Scheduled Time Picker */}
        <div className={`p-4 rounded-2xl bg-charcoal-950 border border-charcoal-850 space-y-2 transition-opacity ${
          settings.enabled ? 'opacity-100' : 'opacity-40 pointer-events-none'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-forge-lime" />
              <span>Preferred Reminder Time</span>
            </span>
            <input
              type="time"
              value={settings.time}
              onChange={(e) => handleTimeChange(e.target.value)}
              className="bg-charcoal-900 border border-charcoal-700 text-forge-lime font-mono text-sm font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-forge-lime"
            />
          </div>
          <p className="text-[10px] text-gray-400 leading-relaxed">
            BODYFORGE checks your activity at this time. If no workout was recorded today, you receive an athletic alert with zero noise.
          </p>
        </div>

        {/* Sound & Web Notification Permission Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 rounded-xl bg-charcoal-950 border border-charcoal-850 text-xs">
            <span className="flex items-center gap-2 text-gray-300">
              {settings.sound ? <Volume2 className="w-4 h-4 text-forge-cyan" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
              <span>Athletic Chime Tone</span>
            </span>
            <button
              onClick={handleToggleSound}
              className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold ${
                settings.sound ? 'bg-forge-cyan/20 text-forge-cyan border border-forge-cyan/40' : 'bg-charcoal-800 text-gray-400'
              }`}
            >
              {settings.sound ? 'ACTIVE' : 'MUTED'}
            </button>
          </div>

          {permission === 'denied' && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/40 text-red-200 text-[10px] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>Browser notifications are blocked in browser permissions. In-app alerts will be used instead.</span>
            </div>
          )}
        </div>

        {/* Test Alert Button */}
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={handleTestNotification}
            className="flex-1 py-3 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <Send className="w-3.5 h-3.5 text-forge-lime" />
            <span>{testSent ? 'Reminder Sent!' : 'Send Test Alert Now'}</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl bg-forge-lime hover:bg-forge-lime-hover text-black font-extrabold text-xs uppercase tracking-wider transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
