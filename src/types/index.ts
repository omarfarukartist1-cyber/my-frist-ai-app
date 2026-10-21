export type SupportedLanguage = 'bn' | 'ar' | 'en' | 'es';

export type CurrencyCode = 'BDT' | 'SAR' | 'USD' | 'AED' | 'EUR' | 'INR';

export interface Habit {
  id: string;
  title: string;
  category: 'morning' | 'health' | 'mind' | 'evening';
  completedDays: string[]; // ISO date strings YYYY-MM-DD
  timeOfDay?: string;
  streak: number;
}

export interface HydrationLog {
  id: string;
  amountMl: number;
  timestamp: string; // ISO time string
}

export interface ExpenseItem {
  id: string;
  title: string;
  amount: number;
  currency: CurrencyCode;
  category: 'food' | 'groceries' | 'transport' | 'bills' | 'health' | 'other';
  date: string; // YYYY-MM-DD
}

export interface GratitudeEntry {
  id: string;
  date: string;
  mood: 'great' | 'good' | 'neutral' | 'tired' | 'stressed';
  text: string;
}

export interface ScratchNote {
  id: string;
  text: string;
  checked: boolean;
  createdAt: string;
}

export interface WorldCityTime {
  name: string;
  country: string;
  timeZone: string;
  flag: string;
}

export interface EmergencyGuide {
  id: string;
  titleKey: string;
  iconName: string;
  urgency: 'high' | 'critical';
  stepsKeys: string[];
  tipsKey: string;
}
