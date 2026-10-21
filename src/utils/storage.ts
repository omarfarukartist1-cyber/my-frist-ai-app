import { CurrencyCode, ExpenseItem, GratitudeEntry, Habit, HydrationLog, ScratchNote, SupportedLanguage, WorldCityTime } from '../types';

export const getTodayDateString = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getPastDateStr = (daysAgo: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const INITIAL_HABITS: Habit[] = [
  {
    id: 'habit_1',
    title: 'ঘুম থেকে উঠে ২ গ্লাস পানি পান (Morning Hydration)',
    category: 'morning',
    completedDays: [getPastDateStr(0), getPastDateStr(1), getPastDateStr(2), getPastDateStr(4), getPastDateStr(5), getPastDateStr(7)],
    streak: 3,
  },
  {
    id: 'habit_2',
    title: '১৫ মিনিট হালকা ব্যায়াম বা হাঁটা (Stretch & Walk)',
    category: 'health',
    completedDays: [getPastDateStr(0), getPastDateStr(1), getPastDateStr(2), getPastDateStr(3), getPastDateStr(6)],
    streak: 4,
  },
  {
    id: 'habit_3',
    title: '১০ মিনিট শান্তভাবে চিন্তা ও মন শান্ত রাখা (Mindfulness)',
    category: 'mind',
    completedDays: [getPastDateStr(0), getPastDateStr(1), getPastDateStr(3)],
    streak: 2,
  },
  {
    id: 'habit_4',
    title: 'দরকারি বিষয় বা বই ১৫ মিনিট পড়া (Learning/Reading)',
    category: 'mind',
    completedDays: [getPastDateStr(1), getPastDateStr(2), getPastDateStr(3), getPastDateStr(4), getPastDateStr(5)],
    streak: 5,
  },
  {
    id: 'habit_5',
    title: 'রাত ১১টার মধ্যে ফোন রেখে ঘুমাতে যাওয়া (Restful Sleep)',
    category: 'evening',
    completedDays: [getPastDateStr(0), getPastDateStr(2), getPastDateStr(4)],
    streak: 1,
  },
];

export const DEFAULT_CITIES: WorldCityTime[] = [
  { name: 'Dhaka', country: 'Bangladesh', timeZone: 'Asia/Dhaka', flag: '🇧🇩' },
  { name: 'Riyadh / Makkah', country: 'Saudi Arabia', timeZone: 'Asia/Riyadh', flag: '🇸🇦' },
  { name: 'Dubai', country: 'UAE', timeZone: 'Asia/Dubai', flag: '🇦🇪' },
  { name: 'London', country: 'United Kingdom', timeZone: 'Europe/London', flag: '🇬🇧' },
  { name: 'New York', country: 'United States', timeZone: 'America/New_York', flag: '🇺🇸' },
  { name: 'Cairo', country: 'Egypt', timeZone: 'Africa/Cairo', flag: '🇪🇬' },
];

export interface AppStateData {
  language: SupportedLanguage;
  currency: CurrencyCode;
  dailyBudgetLimit: number;
  dailyWaterGoalMl: number;
  habits: Habit[];
  hydrationLogs: Record<string, HydrationLog[]>; // keyed by YYYY-MM-DD
  expenses: Record<string, ExpenseItem[]>; // keyed by YYYY-MM-DD
  gratitudes: Record<string, GratitudeEntry>; // keyed by YYYY-MM-DD
  scratchNotes: ScratchNote[];
  customCities: WorldCityTime[];
  soundEnabled: boolean;
}

const STORAGE_KEY = 'hayat_universal_app_v1';

export const loadStoredData = (): AppStateData => {
  if (typeof window === 'undefined') {
    return getDefaultState();
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw);
    return {
      ...getDefaultState(),
      ...parsed,
    };
  } catch {
    return getDefaultState();
  }
};

export const saveStoredData = (data: AppStateData): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // LocalStorage full or private browsing catch
  }
};

export const getDefaultState = (): AppStateData => {
  return {
    language: 'bn', // Default to user's native Bengali as requested, with instant 1-tap Arab/English switcher
    currency: 'BDT',
    dailyBudgetLimit: 1500,
    dailyWaterGoalMl: 2500,
    habits: INITIAL_HABITS,
    hydrationLogs: {},
    expenses: {},
    gratitudes: {},
    scratchNotes: [
      { id: 'note_1', text: 'জরুরি ফলমূল ও শাকসবজি কেনা', checked: false, createdAt: new Date().toISOString() },
      { id: 'note_2', text: 'বিদ্যুৎ ও ইন্টারনেট বিল চেক করা', checked: true, createdAt: new Date().toISOString() },
    ],
    customCities: DEFAULT_CITIES,
    soundEnabled: true,
  };
};
