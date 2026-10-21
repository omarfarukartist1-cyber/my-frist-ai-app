import React, { useState, useEffect, useRef } from 'react';
import { GratitudeEntry, SupportedLanguage } from '../types';
import { translations } from '../translations';
import { Wind, Moon, Heart, Play, Square, Sparkles, Check } from 'lucide-react';
import { sounds } from '../utils/sound';

interface BreathingPeaceModuleProps {
  currentLang: SupportedLanguage;
  gratitude?: GratitudeEntry;
  onSaveGratitude: (mood: GratitudeEntry['mood'], text: string) => void;
}

type BreathingTechnique = 'box' | 'calm';
type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'relax';

export const BreathingPeaceModule: React.FC<BreathingPeaceModuleProps> = ({
  currentLang,
  gratitude,
  onSaveGratitude,
}) => {
  const t = translations[currentLang];

  // Breathing State
  const [technique, setTechnique] = useState<BreathingTechnique>('box');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [phase, setPhase] = useState<BreathPhase>('inhale');
  const [secondsRemaining, setSecondsRemaining] = useState<number>(4);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Gratitude State
  const [selectedMood, setSelectedMood] = useState<GratitudeEntry['mood']>(gratitude?.mood || 'good');
  const [gratitudeText, setGratitudeText] = useState<string>(gratitude?.text || '');
  const [gratitudeSavedNotice, setGratitudeSavedNotice] = useState<boolean>(false);

  // Sleep Calculator State
  const [wakeTime, setWakeTime] = useState<string>('06:30');
  const [calculatedBedtimes, setCalculatedBedtimes] = useState<string[]>([]);

  // Calculate sleep times (90 minute cycles + 15 minutes to fall asleep)
  const calculateSleepCycles = (wake: string) => {
    const [hoursStr, minutesStr] = wake.split(':');
    const wakeHours = parseInt(hoursStr, 10);
    const wakeMinutes = parseInt(minutesStr, 10);

    const wakeDate = new Date();
    wakeDate.setHours(wakeHours, wakeMinutes, 0, 0);

    // 6 cycles (9 hrs), 5 cycles (7.5 hrs), 4 cycles (6 hrs), 3 cycles (4.5 hrs)
    const cycles = [6, 5, 4, 3];
    const results = cycles.map((c) => {
      const bedtime = new Date(wakeDate.getTime() - (c * 90 + 15) * 60 * 1000);
      return bedtime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });

    setCalculatedBedtimes(results);
  };

  useEffect(() => {
    calculateSleepCycles(wakeTime);
  }, [wakeTime]);

  // Breathing loop handler
  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) clearInterval(timerRef.current);
      setPhase('inhale');
      setSecondsRemaining(technique === 'box' ? 4 : 4);
      return;
    }

    timerRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev > 1) return prev - 1;

        // Transition to next phase
        if (technique === 'box') {
          // 4s Inhale -> 4s Hold -> 4s Exhale -> 4s Rest
          if (phase === 'inhale') {
            setPhase('hold');
            sounds.playBreathPulse(false);
            return 4;
          } else if (phase === 'hold') {
            setPhase('exhale');
            sounds.playBreathPulse(false);
            return 4;
          } else if (phase === 'exhale') {
            setPhase('relax');
            sounds.playBreathPulse(true);
            return 4;
          } else {
            setPhase('inhale');
            sounds.playBreathPulse(true);
            return 4;
          }
        } else {
          // 4-7-8 Relaxing Breath (4s Inhale -> 7s Hold -> 8s Exhale)
          if (phase === 'inhale') {
            setPhase('hold');
            sounds.playBreathPulse(false);
            return 7;
          } else if (phase === 'hold') {
            setPhase('exhale');
            sounds.playBreathPulse(false);
            return 8;
          } else {
            setPhase('inhale');
            sounds.playBreathPulse(true);
            return 4;
          }
        }
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, phase, technique]);

  const handleToggleBreathing = () => {
    if (!isActive) {
      setIsActive(true);
      setPhase('inhale');
      setSecondsRemaining(4);
      sounds.playBreathPulse(true);
    } else {
      setIsActive(false);
    }
  };

  const handleSaveGratitudeForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gratitudeText.trim()) return;
    onSaveGratitude(selectedMood, gratitudeText.trim());
    setGratitudeSavedNotice(true);
    sounds.playHabitCheck();
    setTimeout(() => setGratitudeSavedNotice(false), 3000);
  };

  const moodsList: { id: GratitudeEntry['mood']; emoji: string; label: string }[] = [
    { id: 'great', emoji: '😄', label: t.peace.moods.great },
    { id: 'good', emoji: '🙂', label: t.peace.moods.good },
    { id: 'neutral', emoji: '😐', label: t.peace.moods.neutral },
    { id: 'tired', emoji: '🥱', label: t.peace.moods.tired },
    { id: 'stressed', emoji: '😟', label: t.peace.moods.stressed },
  ];

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale':
        return t.peace.inhale;
      case 'hold':
        return t.peace.hold;
      case 'exhale':
        return t.peace.exhale;
      case 'relax':
        return t.peace.relax;
    }
  };

  return (
    <div className="space-y-6">
      {/* 2-Column Grid: Left Breathing & Right Mood/Sleep */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* Left: Interactive Breathing Studio */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-7 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-stone-900 tracking-tight">{t.peace.breathingTitle}</h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5">{t.peace.breathingDesc}</p>
              </div>
              <Wind className="w-5 h-5 text-teal-600" />
            </div>

            {/* Technique Selector */}
            <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl mt-4">
              <button
                onClick={() => {
                  setTechnique('box');
                  setIsActive(false);
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  technique === 'box' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {t.peace.boxTechnique}
              </button>
              <button
                onClick={() => {
                  setTechnique('calm');
                  setIsActive(false);
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  technique === 'calm' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {t.peace.calmTechnique}
              </button>
            </div>
          </div>

          {/* Animated Breath Visualizer Circle */}
          <div className="flex flex-col items-center justify-center py-6 sm:py-8">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
              {/* Outer soft glow ring */}
              <div
                className={`absolute inset-0 rounded-full transition-all duration-1000 ease-in-out ${
                  isActive
                    ? phase === 'inhale'
                      ? 'scale-105 bg-teal-100/60'
                      : phase === 'exhale'
                      ? 'scale-90 bg-sky-100/50'
                      : 'scale-100 bg-teal-50'
                    : 'bg-stone-100/60'
                }`}
              />

              {/* Main Breathing Core */}
              <div
                className={`relative z-10 w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-teal-500/40 flex flex-col items-center justify-center text-center p-4 transition-all duration-1000 ease-in-out shadow-sm ${
                  isActive
                    ? phase === 'inhale'
                      ? 'scale-110 bg-teal-500 text-white shadow-teal-500/20'
                      : phase === 'exhale'
                      ? 'scale-90 bg-stone-900 text-white shadow-stone-900/20'
                      : 'scale-100 bg-teal-600 text-white'
                    : 'bg-stone-50 text-stone-800'
                }`}
              >
                <span className="text-3xl sm:text-4xl font-extrabold font-mono-num">
                  {isActive ? secondsRemaining : '4'}
                </span>
                <span className="text-xs font-medium mt-1 tracking-tight">
                  {isActive ? phase.toUpperCase() : 'READY'}
                </span>
              </div>
            </div>

            <p className="mt-4 text-sm font-semibold text-stone-700 text-center min-h-[24px]">
              {isActive ? getPhaseInstruction() : t.peace.breathingDesc}
            </p>
          </div>

          {/* Trigger Action CTA */}
          <button
            onClick={handleToggleBreathing}
            className={`w-full h-12 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xs ${
              isActive
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-teal-700 hover:bg-teal-800 text-white'
            }`}
          >
            {isActive ? (
              <>
                <Square className="w-4 h-4 fill-white" />
                {t.peace.stopBreathing}
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                {t.peace.startBreathing}
              </>
            )}
          </button>
        </div>

        {/* Right: Daily Mood, Gratitude & Sleep Calculator */}
        <div className="space-y-6">
          
          {/* Mood & Gratitude Card with High-Res Cozy Evening Editorial Photo */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-stone-900">{t.peace.moodTitle}</h3>
              <Heart className="w-4 h-4 text-rose-500" />
            </div>

            {/* 5 Emojis Selector */}
            <div className="grid grid-cols-5 gap-2">
              {moodsList.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMood(m.id)}
                  className={`py-2 px-1 rounded-xl text-center border transition-all ${
                    selectedMood === m.id
                      ? 'border-amber-500 bg-amber-50/80 scale-105 shadow-2xs'
                      : 'border-stone-200/80 hover:bg-stone-50'
                  }`}
                >
                  <div className="text-xl sm:text-2xl">{m.emoji}</div>
                  <div className="text-[10px] sm:text-xs font-medium text-stone-600 mt-1 truncate">
                    {m.label}
                  </div>
                </button>
              ))}
            </div>

            {/* Gratitude Prompt */}
            <form onSubmit={handleSaveGratitudeForm} className="space-y-3 pt-2 border-t border-stone-100">
              <label className="block text-xs font-semibold text-stone-700">
                {t.peace.gratitudePrompt}
              </label>
              <textarea
                rows={2}
                value={gratitudeText}
                onChange={(e) => setGratitudeText(e.target.value)}
                placeholder={t.peace.gratitudePlaceholder}
                className="w-full p-3 rounded-xl border border-stone-300 text-xs sm:text-sm bg-stone-50/50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />

              <div className="flex items-center justify-between">
                {gratitudeSavedNotice ? (
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    {t.peace.savedGratitude}
                  </span>
                ) : (
                  <span />
                )}
                <button
                  type="submit"
                  disabled={!gratitudeText.trim()}
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 disabled:opacity-40 transition-colors shadow-xs"
                >
                  {t.peace.saveGratitude}
                </button>
              </div>
            </form>
          </div>

          {/* Sleep Cycle Rest Calculator */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-stone-900">{t.peace.sleepCalcTitle}</h3>
                <p className="text-xs text-stone-500 mt-0.5">{t.peace.sleepCalcDesc}</p>
              </div>
              <Moon className="w-5 h-5 text-indigo-600" />
            </div>

            {/* Wake Up Picker */}
            <div className="flex items-center gap-3 pt-1">
              <label htmlFor="wake-picker" className="text-xs font-semibold text-stone-700 whitespace-nowrap">
                {t.peace.wakeUpTime}
              </label>
              <input
                id="wake-picker"
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-stone-300 font-mono-num text-sm bg-stone-50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            {/* Recommended Bedtimes */}
            <div className="space-y-2">
              <span className="text-xs text-stone-500">{t.peace.recommendedBedtimes}</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {calculatedBedtimes.map((bt, idx) => {
                  const cycles = [6, 5, 4, 3][idx];
                  const hours = [9, 7.5, 6, 4.5][idx];
                  const isOptimal = idx === 1; // 5 cycles (7.5 hours) is most universally recommended

                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border text-center ${
                        isOptimal
                          ? 'border-indigo-500 bg-indigo-50/70 shadow-2xs'
                          : 'border-stone-200/80 bg-stone-50'
                      }`}
                    >
                      <div className="text-sm sm:text-base font-bold font-mono-num text-stone-900">
                        {bt}
                      </div>
                      <div className="text-[10px] text-stone-500 mt-0.5">
                        {hours}h ({cycles} cycles)
                      </div>
                      {isOptimal && (
                        <div className="text-[9px] font-bold text-indigo-700 uppercase tracking-wider mt-1">
                          Optimal
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
