/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  CurrencyCode,
  ExpenseItem,
  GratitudeEntry,
  Habit,
  HydrationLog,
  SupportedLanguage,
  WorldCityTime,
} from './types';
import { translations } from './translations';
import {
  AppStateData,
  getTodayDateString,
  loadStoredData,
  saveStoredData,
  getDefaultState,
} from './utils/storage';
import { sounds } from './utils/sound';

import { Header } from './components/Header';
import { HeroDailySummary } from './components/HeroDailySummary';
import { HabitsModule } from './components/HabitsModule';
import { HydrationModule } from './components/HydrationModule';
import { BudgetModule } from './components/BudgetModule';
import { BreathingPeaceModule } from './components/BreathingPeaceModule';
import { WorldClockSolarModule } from './components/WorldClockSolarModule';
import { ToolsConverterModule } from './components/ToolsConverterModule';
import { EmergencyGuideModule } from './components/EmergencyGuideModule';
import { DailyNotesModule } from './components/DailyNotesModule';
import { IslamicRhythmModule } from './components/IslamicRhythmModule';
import { PublishAndMonetizeModule } from './components/PublishAndMonetizeModule';

import {
  LayoutDashboard,
  CheckCircle2,
  Droplets,
  Wallet,
  Wind,
  Globe2,
  Sliders,
  ShieldAlert,
  Download,
  RotateCcw,
  Moon,
  Smartphone,
} from 'lucide-react';

export default function App() {
  const [data, setData] = useState<AppStateData>(loadStoredData);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const todayStr = getTodayDateString();

  // Keep storage in sync
  useEffect(() => {
    saveStoredData(data);
  }, [data]);

  // Synchronize sounds enabled setting
  useEffect(() => {
    sounds.setSoundEnabled(data.soundEnabled);
  }, [data.soundEnabled]);

  // Update HTML document dir and lang attribute
  useEffect(() => {
    const isRtl = translations[data.language].common.direction === 'rtl';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = data.language;
  }, [data.language]);

  const t = translations[data.language];
  const todayHydrationLogs = data.hydrationLogs[todayStr] || [];
  const todayExpenses = data.expenses[todayStr] || [];
  const todayGratitude = data.gratitudes[todayStr];

  // Habits Handlers
  const handleToggleHabit = (habitId: string, targetDateStr?: string) => {
    const dateToToggle = targetDateStr || todayStr;
    setData((prev) => {
      const updated = prev.habits.map((h) => {
        if (h.id !== habitId) return h;
        const isDone = h.completedDays.includes(dateToToggle);
        const newCompleted = isDone
          ? h.completedDays.filter((d) => d !== dateToToggle)
          : [...h.completedDays, dateToToggle];

        // Dynamically compute streak
        let streak = 0;
        const cursor = new Date();
        while (true) {
          const y = cursor.getFullYear();
          const m = String(cursor.getMonth() + 1).padStart(2, '0');
          const d = String(cursor.getDate()).padStart(2, '0');
          const dStr = `${y}-${m}-${d}`;

          if (newCompleted.includes(dStr)) {
            streak++;
            cursor.setDate(cursor.getDate() - 1);
          } else {
            // If today is not done yet, check if yesterday was done to keep streak intact
            if (streak === 0 && dStr === todayStr) {
              cursor.setDate(cursor.getDate() - 1);
              const yy = cursor.getFullYear();
              const mm = String(cursor.getMonth() + 1).padStart(2, '0');
              const dd = String(cursor.getDate()).padStart(2, '0');
              const yStr = `${yy}-${mm}-${dd}`;
              if (newCompleted.includes(yStr)) {
                continue;
              }
            }
            break;
          }
        }

        return {
          ...h,
          completedDays: newCompleted,
          streak,
        };
      });
      return { ...prev, habits: updated };
    });
    sounds.playHabitCheck();
  };

  const handleAddHabit = (
    title: string,
    category: 'morning' | 'health' | 'mind' | 'evening'
  ) => {
    const newHabit: Habit = {
      id: `habit_${Date.now()}`,
      title,
      category,
      completedDays: [],
      streak: 0,
    };
    setData((prev) => ({
      ...prev,
      habits: [newHabit, ...prev.habits],
    }));
  };

  const handleDeleteHabit = (habitId: string) => {
    setData((prev) => ({
      ...prev,
      habits: prev.habits.filter((h) => h.id !== habitId),
    }));
  };

  // Hydration Handlers
  const handleAddWater = (amountMl: number) => {
    const newLog: HydrationLog = {
      id: `drink_${Date.now()}`,
      amountMl,
      timestamp: new Date().toISOString(),
    };
    setData((prev) => ({
      ...prev,
      hydrationLogs: {
        ...prev.hydrationLogs,
        [todayStr]: [...(prev.hydrationLogs[todayStr] || []), newLog],
      },
    }));
  };

  const handleRemoveWaterLog = (logId: string) => {
    setData((prev) => ({
      ...prev,
      hydrationLogs: {
        ...prev.hydrationLogs,
        [todayStr]: (prev.hydrationLogs[todayStr] || []).filter(
          (l) => l.id !== logId
        ),
      },
    }));
  };

  const handleResetTodayWater = () => {
    setData((prev) => ({
      ...prev,
      hydrationLogs: {
        ...prev.hydrationLogs,
        [todayStr]: [],
      },
    }));
  };

  const handleUpdateWaterGoal = (newGoal: number) => {
    setData((prev) => ({
      ...prev,
      dailyWaterGoalMl: newGoal,
    }));
  };

  // Budget Handlers
  const handleAddExpense = (item: Omit<ExpenseItem, 'id' | 'date'>) => {
    const newExpense: ExpenseItem = {
      ...item,
      id: `exp_${Date.now()}`,
      date: todayStr,
    };
    setData((prev) => ({
      ...prev,
      expenses: {
        ...prev.expenses,
        [todayStr]: [newExpense, ...(prev.expenses[todayStr] || [])],
      },
    }));
  };

  const handleDeleteExpense = (expenseId: string) => {
    setData((prev) => ({
      ...prev,
      expenses: {
        ...prev.expenses,
        [todayStr]: (prev.expenses[todayStr] || []).filter(
          (e) => e.id !== expenseId
        ),
      },
    }));
  };

  const handleUpdateDailyLimit = (limit: number) => {
    setData((prev) => ({
      ...prev,
      dailyBudgetLimit: limit,
    }));
  };

  const handleUpdateCurrency = (curr: CurrencyCode) => {
    setData((prev) => ({
      ...prev,
      currency: curr,
    }));
  };

  // Peace & Gratitude Handlers
  const handleSaveGratitude = (
    mood: GratitudeEntry['mood'],
    text: string
  ) => {
    const entry: GratitudeEntry = {
      id: `grat_${Date.now()}`,
      date: todayStr,
      mood,
      text,
    };
    setData((prev) => ({
      ...prev,
      gratitudes: {
        ...prev.gratitudes,
        [todayStr]: entry,
      },
    }));
  };

  // World Clocks Handlers
  const handleAddCity = (city: WorldCityTime) => {
    setData((prev) => ({
      ...prev,
      customCities: [...prev.customCities, city],
    }));
  };

  const handleRemoveCity = (cityName: string) => {
    setData((prev) => ({
      ...prev,
      customCities: prev.customCities.filter((c) => c.name !== cityName),
    }));
  };

  // Scratch Notes Handlers
  const handleAddNote = (text: string) => {
    setData((prev) => ({
      ...prev,
      scratchNotes: [
        {
          id: `note_${Date.now()}`,
          text,
          checked: false,
          createdAt: new Date().toISOString(),
        },
        ...prev.scratchNotes,
      ],
    }));
  };

  const handleToggleNote = (id: string) => {
    setData((prev) => ({
      ...prev,
      scratchNotes: prev.scratchNotes.map((n) =>
        n.id === id ? { ...n, checked: !n.checked } : n
      ),
    }));
  };

  const handleDeleteNote = (id: string) => {
    setData((prev) => ({
      ...prev,
      scratchNotes: prev.scratchNotes.filter((n) => n.id !== id),
    }));
  };

  const handleClearCompletedNotes = () => {
    setData((prev) => ({
      ...prev,
      scratchNotes: prev.scratchNotes.filter((n) => !n.checked),
    }));
  };

  // Language & Sound Settings
  const handleLanguageChange = (lang: SupportedLanguage) => {
    setData((prev) => ({
      ...prev,
      language: lang,
    }));
  };

  const handleToggleSound = () => {
    setData((prev) => {
      const next = !prev.soundEnabled;
      sounds.setSoundEnabled(next);
      return { ...prev, soundEnabled: next };
    });
  };

  // Export / Backup data
  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `hayat_backup_${todayStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetAllData = () => {
    if (window.confirm('Reset all saved data to default? This will clear logs.')) {
      setData(getDefaultState());
    }
  };

  // Compute Overview stats
  const habitsCompletedToday = data.habits.filter((h) =>
    h.completedDays.includes(todayStr)
  ).length;

  const totalWaterConsumedToday = todayHydrationLogs.reduce(
    (acc, cur) => acc + cur.amountMl,
    0
  );

  const totalBudgetSpentToday = todayExpenses.reduce(
    (acc, cur) => acc + cur.amount,
    0
  );

  return (
    <div
      className={`min-h-screen bg-stone-50 text-stone-900 pb-20 md:pb-12 ${
        data.language === 'ar' ? 'font-arabic' : data.language === 'bn' ? 'font-bengali' : ''
      }`}
    >
      {/* Top Bar following Top Bar Contract */}
      <Header
        currentLang={data.language}
        onLanguageChange={handleLanguageChange}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        soundEnabled={data.soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Container - 1440px wide presence */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
        {/* OVERVIEW / DAILY PULSE TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Visual Hero & 4-Column KPI Bar */}
            <HeroDailySummary
              currentLang={data.language}
              habitsCompletedCount={habitsCompletedToday}
              totalHabitsCount={data.habits.length}
              waterConsumedMl={totalWaterConsumedToday}
              waterGoalMl={data.dailyWaterGoalMl}
              budgetLimit={data.dailyBudgetLimit}
              budgetSpent={totalBudgetSpentToday}
              currency={data.currency}
              onNavigateTab={setActiveTab}
            />

            {/* Split 2-Column Grid: Daily Habits & Quick Modules */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Left 2 Cols: Today's Habits Checklist */}
              <div className="lg:col-span-2 space-y-6">
                <HabitsModule
                  currentLang={data.language}
                  habits={data.habits}
                  onToggleHabit={handleToggleHabit}
                  onAddHabit={handleAddHabit}
                  onDeleteHabit={handleDeleteHabit}
                />
              </div>

              {/* Right 1 Col: Quick Notes / Scratchpad & Solar glimpse */}
              <div className="space-y-6">
                <DailyNotesModule
                  currentLang={data.language}
                  notes={data.scratchNotes}
                  onAddNote={handleAddNote}
                  onToggleNote={handleToggleNote}
                  onDeleteNote={handleDeleteNote}
                  onClearCompleted={handleClearCompletedNotes}
                />

                {/* Quick First Aid / Emergency Quick Launch Banner */}
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-rose-950">{t.emergency.title}</h4>
                      <p className="text-[11px] text-rose-700">CPR, Heimlich & 999/911/997</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('emergency')}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-semibold text-xs hover:bg-rose-700 transition-colors shrink-0 shadow-xs"
                  >
                    {t.common.today}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HABITS TAB */}
        {activeTab === 'habits' && (
          <div className="max-w-4xl mx-auto">
            <HabitsModule
              currentLang={data.language}
              habits={data.habits}
              onToggleHabit={handleToggleHabit}
              onAddHabit={handleAddHabit}
              onDeleteHabit={handleDeleteHabit}
            />
          </div>
        )}

        {/* HYDRATION TAB */}
        {activeTab === 'hydration' && (
          <div className="max-w-4xl mx-auto">
            <HydrationModule
              currentLang={data.language}
              logs={todayHydrationLogs}
              waterGoalMl={data.dailyWaterGoalMl}
              onAddWater={handleAddWater}
              onRemoveLog={handleRemoveWaterLog}
              onResetToday={handleResetTodayWater}
              onUpdateGoal={handleUpdateWaterGoal}
            />
          </div>
        )}

        {/* BUDGET TAB */}
        {activeTab === 'budget' && (
          <div className="max-w-4xl mx-auto">
            <BudgetModule
              currentLang={data.language}
              expenses={todayExpenses}
              dailyLimit={data.dailyBudgetLimit}
              currency={data.currency}
              onAddExpense={handleAddExpense}
              onDeleteExpense={handleDeleteExpense}
              onUpdateLimit={handleUpdateDailyLimit}
              onUpdateCurrency={handleUpdateCurrency}
            />
          </div>
        )}

        {/* PEACE & BREATHING TAB */}
        {activeTab === 'peace' && (
          <div className="max-w-5xl mx-auto">
            <BreathingPeaceModule
              currentLang={data.language}
              gratitude={todayGratitude}
              onSaveGratitude={handleSaveGratitude}
            />
          </div>
        )}

        {/* WORLD RHYTHM & CLOCKS TAB */}
        {activeTab === 'worldRhythm' && (
          <div className="max-w-5xl mx-auto">
            <WorldClockSolarModule
              currentLang={data.language}
              cities={data.customCities}
              onAddCity={handleAddCity}
              onRemoveCity={handleRemoveCity}
            />
          </div>
        )}

        {/* TOOLS & CONVERTER TAB */}
        {activeTab === 'tools' && (
          <div className="max-w-4xl mx-auto">
            <ToolsConverterModule currentLang={data.language} />
          </div>
        )}

        {/* EMERGENCY & FIRST AID TAB */}
        {activeTab === 'emergency' && (
          <div className="max-w-4xl mx-auto">
            <EmergencyGuideModule currentLang={data.language} />
          </div>
        )}

        {/* ISLAMIC RHYTHM & SERENITY TAB */}
        {activeTab === 'islamic' && (
          <div className="max-w-5xl mx-auto">
            <IslamicRhythmModule currentLang={data.language} />
          </div>
        )}

        {/* PUBLISH TO PLAY STORE & MONETIZATION TAB */}
        {activeTab === 'monetize' && (
          <div className="max-w-5xl mx-auto">
            <PublishAndMonetizeModule currentLang={data.language} />
          </div>
        )}

        {/* Footer with backup/export and privacy note */}
        <footer className="pt-10 border-t border-stone-200 text-stone-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-stone-500">
            <span>© 2026 {t.appName}</span>
            <span aria-hidden="true">·</span>
            <span>{t.tagline}</span>
            <span aria-hidden="true">·</span>
            <span>100% Offline & Private</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportData}
              className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-100 flex items-center gap-1.5 transition-colors font-medium text-xs"
            >
              <Download className="w-3.5 h-3.5" />
              Backup JSON
            </button>

            <button
              onClick={handleResetAllData}
              className="px-3 py-1.5 rounded-lg text-stone-400 hover:text-rose-600 transition-colors text-xs flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              {t.common.reset}
            </button>
          </div>
        </footer>
      </main>

      {/* Mobile Fixed Thumb-Zone Bottom Tab Bar (Pattern 1 from mobile design reference) */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 shadow-lg px-2"
      >
        <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto">
          {[
            { id: 'overview', icon: LayoutDashboard, label: t.tabs.overview },
            { id: 'habits', icon: CheckCircle2, label: t.tabs.habits },
            { id: 'islamic', icon: Moon, label: t.tabs.islamic },
            { id: 'budget', icon: Wallet, label: t.tabs.budget },
            { id: 'monetize', icon: Smartphone, label: t.tabs.monetize },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  sounds.playHabitCheck();
                }}
                className={`min-h-[44px] flex flex-col items-center justify-center transition-colors ${
                  isActive ? 'text-amber-600 font-bold' : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
                <span className="text-[10px] mt-1 truncate max-w-[60px] tracking-tight">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
