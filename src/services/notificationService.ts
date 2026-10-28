import { NotificationSettings } from '../types';
import { audioService } from './audioService';

const DEFAULT_SETTINGS: NotificationSettings = {
  enabled: true,
  time: '08:00',
  days: [0, 1, 2, 3, 4, 5, 6],
  sound: true,
};

export const getNotificationSettings = (uid: string): NotificationSettings => {
  try {
    const raw = localStorage.getItem(`bodyforge_notifications_${uid || 'guest'}`);
    if (raw) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.warn('Error reading notification settings', err);
  }
  return DEFAULT_SETTINGS;
};

export const saveNotificationSettings = (uid: string, settings: NotificationSettings): void => {
  try {
    localStorage.setItem(`bodyforge_notifications_${uid || 'guest'}`, JSON.stringify(settings));
  } catch (err) {
    console.warn('Error saving notification settings', err);
  }
};

export const isNotificationSupported = (): boolean => {
  return typeof window !== 'undefined' && 'Notification' in window;
};

export const getNotificationPermission = (): NotificationPermission => {
  if (!isNotificationSupported()) return 'denied';
  return Notification.permission;
};

export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!isNotificationSupported()) return 'denied';
  try {
    const result = await Notification.requestPermission();
    return result;
  } catch (err) {
    console.warn('Notification permission request error', err);
    return 'denied';
  }
};

export const isWorkoutCompletedToday = (lastWorkoutDate: string | null): boolean => {
  if (!lastWorkoutDate) return false;
  const today = new Date().toISOString().split('T')[0];
  const lastDate = lastWorkoutDate.split('T')[0];
  return today === lastDate;
};

export const sendSystemNotification = (
  title: string, 
  body: string, 
  sound: boolean = true,
  onInAppAlert?: (msg: string) => void
): boolean => {
  let sentSystem = false;

  if (isNotificationSupported() && Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'bodyforge-reminder'
      });
      sentSystem = true;
    } catch (err) {
      console.warn('System Notification dispatch error', err);
    }
  }

  if (sound) {
    audioService.playStartChime();
  }

  // Always invoke in-app visual alert banner so the user sees it even if browser push is minimized
  if (onInAppAlert) {
    onInAppAlert(body);
  }

  return sentSystem;
};

export const checkAndTriggerDailyReminder = (
  uid: string,
  lastWorkoutDate: string | null,
  onInAppAlert?: (msg: string) => void
): { triggered: boolean; message: string } => {
  const settings = getNotificationSettings(uid);
  if (!settings.enabled) {
    return { triggered: false, message: 'Reminders are disabled in settings.' };
  }

  const todayStr = new Date().toISOString().split('T')[0];

  // 1. Check if workout has already been completed today
  if (isWorkoutCompletedToday(lastWorkoutDate)) {
    return { triggered: false, message: 'Today’s workout is already completed! Reminders paused for the day.' };
  }

  // 2. Check if already notified today
  if (settings.lastNotifiedDate === todayStr) {
    return { triggered: false, message: 'Reminder already delivered for today.' };
  }

  // 3. Check if current time has reached preferred time
  const now = new Date();
  const [prefHour, prefMinute] = settings.time.split(':').map(Number);
  const scheduledTime = new Date();
  scheduledTime.setHours(prefHour, prefMinute, 0, 0);

  // If now is at or past the scheduled time
  if (now.getTime() >= scheduledTime.getTime()) {
    sendSystemNotification(
      'BODYFORGE Daily Training Alert 💪',
      'Time to train! You haven’t completed today’s workout yet. Keep your athletic streak alive!',
      settings.sound,
      onInAppAlert
    );

    // Save that we notified today
    saveNotificationSettings(uid, {
      ...settings,
      lastNotifiedDate: todayStr
    });

    return { triggered: true, message: 'Daily reminder delivered!' };
  }

  return { triggered: false, message: `Scheduled for ${settings.time}.` };
};

export const triggerTestReminder = (
  settings: NotificationSettings,
  onInAppAlert?: (msg: string) => void
): void => {
  sendSystemNotification(
    'BODYFORGE Alert: Test Reminder ⚡',
    'Your daily workout notifications are active! We will remind you at ' + settings.time + ' if you haven’t trained yet today.',
    settings.sound,
    onInAppAlert
  );
};
