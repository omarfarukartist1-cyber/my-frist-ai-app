import React, { useState } from 'react';
import { HydrationLog, SupportedLanguage } from '../types';
import { translations } from '../translations';
import { Droplets, Plus, RotateCcw, Trash2, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/sound';

interface HydrationModuleProps {
  currentLang: SupportedLanguage;
  logs: HydrationLog[];
  waterGoalMl: number;
  onAddWater: (amountMl: number) => void;
  onRemoveLog: (logId: string) => void;
  onResetToday: () => void;
  onUpdateGoal: (newGoal: number) => void;
}

export const HydrationModule: React.FC<HydrationModuleProps> = ({
  currentLang,
  logs,
  waterGoalMl,
  onAddWater,
  onRemoveLog,
  onResetToday,
  onUpdateGoal,
}) => {
  const t = translations[currentLang];
  const [customMl, setCustomMl] = useState<string>('300');
  const [showGoalModal, setShowGoalModal] = useState<boolean>(false);
  const [tempGoal, setTempGoal] = useState<string>(String(waterGoalMl));

  const totalConsumed = logs.reduce((sum, item) => sum + item.amountMl, 0);
  const percent = Math.min(100, Math.round((totalConsumed / waterGoalMl) * 100));
  const remaining = Math.max(0, waterGoalMl - totalConsumed);
  const isGoalMet = totalConsumed >= waterGoalMl;

  const handleQuickAdd = (ml: number) => {
    onAddWater(ml);
    sounds.playWaterDrop();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(customMl, 10);
    if (!isNaN(parsed) && parsed > 0) {
      onAddWater(parsed);
      sounds.playWaterDrop();
      setCustomMl('');
    }
  };

  const handleGoalSave = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(tempGoal, 10);
    if (!isNaN(parsed) && parsed >= 500 && parsed <= 6000) {
      onUpdateGoal(parsed);
      setShowGoalModal(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Card with Visual Asset */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-6 shadow-xs items-stretch">
        {/* Left: Water Progress & Visual Gauge */}
        <div className="md:col-span-2 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-stone-900 tracking-tight">{t.hydration.title}</h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5">{t.hydration.subtitle}</p>
              </div>
              <button
                onClick={() => {
                  setTempGoal(String(waterGoalMl));
                  setShowGoalModal(true);
                }}
                className="text-xs text-sky-700 hover:text-sky-900 font-semibold px-2.5 py-1 rounded-md bg-sky-50 border border-sky-200/60 transition-colors"
              >
                {t.hydration.dailyGoal}: {waterGoalMl} ml
              </button>
            </div>

            {/* Main Stats Display */}
            <div className="mt-6 flex flex-wrap items-baseline gap-4">
              <div>
                <span className="text-4xl sm:text-5xl font-black font-mono-num text-sky-700 tracking-tight">
                  {totalConsumed}
                </span>
                <span className="text-stone-500 text-sm font-medium ml-1.5">/ {waterGoalMl} ml</span>
              </div>
              <div className="text-xs sm:text-sm text-stone-500">
                {isGoalMet ? (
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    {t.hydration.goalReached}
                  </span>
                ) : (
                  <span>{t.hydration.remaining}: <strong className="font-mono-num text-stone-900">{remaining} ml</strong></span>
                )}
              </div>
            </div>

            {/* Visual Hydration Level Bar */}
            <div className="mt-4 w-full bg-stone-100 rounded-2xl h-4 p-0.5 overflow-hidden border border-stone-200/60">
              <div
                className="bg-gradient-to-r from-sky-400 to-sky-600 h-full rounded-xl transition-all duration-700 ease-out"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] text-stone-400 mt-1 font-mono-num">
              <span>0 ml</span>
              <span>{percent}%</span>
              <span>{waterGoalMl} ml</span>
            </div>
          </div>

          {/* Quick Add Buttons */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <button
                onClick={() => handleQuickAdd(250)}
                className="h-12 px-4 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200/80 text-sky-900 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Droplets className="w-4 h-4 text-sky-600" />
                {t.hydration.addCup}
              </button>

              <button
                onClick={() => handleQuickAdd(500)}
                className="h-12 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xs"
              >
                <Droplets className="w-4 h-4 text-sky-200" />
                {t.hydration.addBottle}
              </button>

              <form onSubmit={handleCustomSubmit} className="col-span-2 sm:col-span-1 flex items-center gap-1.5">
                <input
                  type="number"
                  min="50"
                  max="2000"
                  step="50"
                  placeholder="ml"
                  value={customMl}
                  onChange={(e) => setCustomMl(e.target.value)}
                  className="w-full h-12 px-3 rounded-xl border border-stone-300 bg-stone-50 text-stone-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 font-mono-num"
                />
                <button
                  type="submit"
                  aria-label={t.hydration.addCustom}
                  className="h-12 px-3.5 rounded-xl bg-stone-900 text-white hover:bg-stone-800 transition-colors shrink-0 flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right: High-Res Editorial Studio Hydration Asset */}
        <div className="relative rounded-xl overflow-hidden border border-stone-200/80 hidden md:block group">
          <img
            src="/src/assets/images/daily_hydration_water_1792596591404.jpg"
            alt="Pure water carafe"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-4">
            <p className="text-xs text-stone-200 leading-snug">
              {t.hydration.reminderTip}
            </p>
          </div>
        </div>
      </div>

      {/* Goal Adjustment Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleGoalSave} className="bg-white rounded-2xl border border-stone-200 p-6 max-w-sm w-full space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-stone-900">{t.hydration.dailyGoal}</h3>
            <p className="text-xs text-stone-500">{t.hydration.subtitle}</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1000"
                max="6000"
                step="250"
                value={tempGoal}
                onChange={(e) => setTempGoal(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-mono-num text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                autoFocus
              />
              <span className="text-sm font-semibold text-stone-600">ml</span>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowGoalModal(false)}
                className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900"
              >
                {t.common.cancel}
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 shadow-xs"
              >
                {t.common.save}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Today's Log of Drinks */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-stone-900">{t.hydration.recentDrinks}</h3>
          {logs.length > 0 && (
            <button
              onClick={onResetToday}
              className="text-xs text-stone-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {t.hydration.resetToday}
            </button>
          )}
        </div>

        {logs.length === 0 ? (
          <div className="text-center py-6 text-stone-400 text-xs sm:text-sm">
            {t.hydration.subtitle}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {logs.map((log) => {
              const timeFormatted = new Date(log.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200/70"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
                      💧
                    </div>
                    <div>
                      <p className="text-xs font-bold font-mono-num text-stone-900">+{log.amountMl} ml</p>
                      <p className="text-[11px] text-stone-400">{timeFormatted}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveLog(log.id)}
                    aria-label="Remove drink entry"
                    className="text-stone-400 hover:text-rose-600 p-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
