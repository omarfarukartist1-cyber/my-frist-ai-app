import React from 'react';
import { CurrencyCode, SupportedLanguage } from '../types';
import { translations } from '../translations';
import { CheckCircle2, Droplets, Wallet, Wind, Sparkles } from 'lucide-react';

interface HeroDailySummaryProps {
  currentLang: SupportedLanguage;
  habitsCompletedCount: number;
  totalHabitsCount: number;
  waterConsumedMl: number;
  waterGoalMl: number;
  budgetLimit: number;
  budgetSpent: number;
  currency: CurrencyCode;
  onNavigateTab: (tabId: string) => void;
}

export const HeroDailySummary: React.FC<HeroDailySummaryProps> = ({
  currentLang,
  habitsCompletedCount,
  totalHabitsCount,
  waterConsumedMl,
  waterGoalMl,
  budgetLimit,
  budgetSpent,
  currency,
  onNavigateTab,
}) => {
  const t = translations[currentLang];
  const now = new Date();
  const currentHour = now.getHours();

  let greeting = t.greetings.morning;
  if (currentHour >= 12 && currentHour < 17) {
    greeting = t.greetings.afternoon;
  } else if (currentHour >= 17 && currentHour < 21) {
    greeting = t.greetings.evening;
  } else if (currentHour >= 21 || currentHour < 5) {
    greeting = t.greetings.night;
  }

  // Daily wisdom selection
  const dayIndex = now.getDate() % t.dailyWisdom.length;
  const wisdom = t.dailyWisdom[dayIndex] || t.dailyWisdom[0];

  const habitsPercent = totalHabitsCount > 0 ? Math.round((habitsCompletedCount / totalHabitsCount) * 100) : 0;
  const waterPercent = Math.min(100, Math.round((waterConsumedMl / waterGoalMl) * 100));
  const budgetRemaining = Math.max(0, budgetLimit - budgetSpent);

  const currencySymbols: Record<CurrencyCode, string> = {
    BDT: '৳',
    SAR: '﷼',
    AED: 'د.إ',
    USD: '$',
    EUR: '€',
    INR: '₹',
  };

  const currSymbol = currencySymbols[currency] || '$';

  // Format today's human readable date
  const localeMap: Record<SupportedLanguage, string> = {
    bn: 'bn-BD',
    ar: 'ar-SA',
    en: 'en-US',
    es: 'es-ES',
  };

  const formattedDate = new Intl.DateTimeFormat(localeMap[currentLang], {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(now);

  return (
    <div className="space-y-6">
      {/* Hero Visual Card with High-Res Image & Scrim */}
      <div className="relative overflow-hidden rounded-2xl bg-stone-900 border border-stone-800 shadow-sm min-h-[220px] sm:min-h-[260px] flex flex-col justify-end">
        <img
          src="/src/assets/images/daily_mindfulness_sunrise_1792596591766.jpg"
          alt="Serene sunrise horizon"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        {/* Measured scrim for 4.5:1 text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent" />

        <div className="relative z-10 p-5 sm:p-8 max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-stone-300 font-medium">
            <span>{formattedDate}</span>
            <span aria-hidden="true" className="text-stone-500">·</span>
            <span className="text-amber-400">{greeting}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {t.tagline}
          </h1>

          {/* Daily Wisdom Quote */}
          <div className="pt-2 text-stone-300 text-xs sm:text-sm leading-relaxed border-t border-white/10 flex items-start gap-2 max-w-2xl">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="italic">“{wisdom.quote}”</p>
              <p className="text-[11px] text-stone-400 mt-0.5">— {wisdom.author}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Column KPI / Daily Progress Strip (Desktop & Mobile) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Habits Completed */}
        <button
          onClick={() => onNavigateTab('habits')}
          className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-xs hover:border-amber-400 transition-colors text-left flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-500">{t.tabs.habits}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-mono-num text-stone-900">
              {habitsCompletedCount} / {totalHabitsCount}
            </div>
            <div className="mt-1.5 w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${habitsPercent}%` }}
              />
            </div>
          </div>
        </button>

        {/* Metric 2: Water Hydration */}
        <button
          onClick={() => onNavigateTab('hydration')}
          className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-xs hover:border-sky-400 transition-colors text-left flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-500">{t.tabs.hydration}</span>
            <Droplets className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-mono-num text-stone-900">
              {waterConsumedMl} <span className="text-xs font-normal text-stone-500">/ {waterGoalMl} ml</span>
            </div>
            <div className="mt-1.5 w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-sky-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${waterPercent}%` }}
              />
            </div>
          </div>
        </button>

        {/* Metric 3: Pocket Budget Remaining */}
        <button
          onClick={() => onNavigateTab('budget')}
          className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-xs hover:border-amber-400 transition-colors text-left flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-500">{t.tabs.budget}</span>
            <Wallet className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold font-mono-num text-stone-900">
              {currSymbol} {budgetRemaining.toLocaleString()}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              {t.budget.todaySpent}: {currSymbol} {budgetSpent.toLocaleString()}
            </p>
          </div>
        </button>

        {/* Metric 4: Guided Breathing & Calm */}
        <button
          onClick={() => onNavigateTab('peace')}
          className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-xs hover:border-teal-400 transition-colors text-left flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-500">{t.tabs.peace}</span>
            <Wind className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-3">
            <div className="text-lg font-bold text-stone-900 line-clamp-1">
              {t.peace.boxTechnique}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              {t.peace.startBreathing} →
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};
