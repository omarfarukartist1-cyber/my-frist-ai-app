import React, { useState, useMemo } from 'react';
import { Habit, SupportedLanguage } from '../types';
import { translations } from '../translations';
import {
  Check,
  Plus,
  Trash2,
  Flame,
  Sparkles,
  Calendar as CalendarIcon,
  ListFilter,
  ChevronLeft,
  ChevronRight,
  Award,
  TrendingUp,
  BarChart3,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';
import { sounds } from '../utils/sound';
import { getTodayDateString } from '../utils/storage';

interface HabitsModuleProps {
  currentLang: SupportedLanguage;
  habits: Habit[];
  onToggleHabit: (habitId: string, dateStr?: string) => void;
  onAddHabit: (title: string, category: 'morning' | 'health' | 'mind' | 'evening') => void;
  onDeleteHabit: (habitId: string) => void;
}

export const HabitsModule: React.FC<HabitsModuleProps> = ({
  currentLang,
  habits,
  onToggleHabit,
  onAddHabit,
  onDeleteHabit,
}) => {
  const t = translations[currentLang];
  const todayStr = getTodayDateString();

  // View state: 'list' | 'calendar'
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  // Filter & creation state
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [newTitle, setNewTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'morning' | 'health' | 'mind' | 'evening'>('morning');
  const [isAddingOpen, setIsAddingOpen] = useState(false);

  // Calendar state
  const todayDate = useMemo(() => new Date(), []);
  const [calendarYear, setCalendarYear] = useState<number>(todayDate.getFullYear());
  const [calendarMonth, setCalendarMonth] = useState<number>(todayDate.getMonth()); // 0-indexed
  const [selectedCalendarHabitId, setSelectedCalendarHabitId] = useState<string>('all');
  const [inspectedDateStr, setInspectedDateStr] = useState<string>(todayStr);

  const filteredHabits = habits.filter((h) => {
    if (filterCategory === 'all') return true;
    return h.category === filterCategory;
  });

  const completedTodayCount = habits.filter((h) => h.completedDays.includes(todayStr)).length;
  const progressPercent = habits.length > 0 ? Math.round((completedTodayCount / habits.length) * 100) : 0;

  // Calendar helpers
  const daysInMonth = useMemo(() => {
    return new Date(calendarYear, calendarMonth + 1, 0).getDate();
  }, [calendarYear, calendarMonth]);

  const firstDayOfWeek = useMemo(() => {
    // 0 = Sun, 1 = Mon, etc.
    return new Date(calendarYear, calendarMonth, 1).getDay();
  }, [calendarYear, calendarMonth]);

  const handlePrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear((y) => y - 1);
    } else {
      setCalendarMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((y) => y + 1);
    } else {
      setCalendarMonth((m) => m + 1);
    }
  };

  const handleJumpToToday = () => {
    const now = new Date();
    setCalendarYear(now.getFullYear());
    setCalendarMonth(now.getMonth());
    setInspectedDateStr(todayStr);
  };

  // Month title formatted in user language
  const localeMap: Record<SupportedLanguage, string> = {
    bn: 'bn-BD',
    ar: 'ar-SA',
    en: 'en-US',
    es: 'es-ES',
  };

  const monthDisplayTitle = new Intl.DateTimeFormat(localeMap[currentLang], {
    month: 'long',
    year: 'numeric',
  }).format(new Date(calendarYear, calendarMonth, 1));

  // Compute Monthly Stats
  const monthlyStats = useMemo(() => {
    const prefix = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}`;
    let totalEligibleCheckins = 0;
    let completedCheckins = 0;
    const completedDaysSet = new Set<string>();

    const targetHabits =
      selectedCalendarHabitId === 'all'
        ? habits
        : habits.filter((h) => h.id === selectedCalendarHabitId);

    // Days in this month up to today (if current month) or all days in past month
    const isCurrentMonth =
      calendarYear === todayDate.getFullYear() && calendarMonth === todayDate.getMonth();
    const evaluatedDays = isCurrentMonth ? Math.min(daysInMonth, todayDate.getDate()) : daysInMonth;

    for (let day = 1; day <= evaluatedDays; day++) {
      const dateStr = `${prefix}-${String(day).padStart(2, '0')}`;
      totalEligibleCheckins += targetHabits.length;

      let habitsDoneOnDate = 0;
      targetHabits.forEach((h) => {
        if (h.completedDays.includes(dateStr)) {
          completedCheckins++;
          habitsDoneOnDate++;
        }
      });

      if (habitsDoneOnDate > 0) {
        completedDaysSet.add(dateStr);
      }
    }

    const rate =
      totalEligibleCheckins > 0 ? Math.round((completedCheckins / totalEligibleCheckins) * 100) : 0;

    // Calculate longest consecutive streak in this month
    let longestStreak = 0;
    let currentStreakCount = 0;
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${prefix}-${String(day).padStart(2, '0')}`;
      const isDayActive =
        selectedCalendarHabitId === 'all'
          ? targetHabits.length > 0 && targetHabits.some((h) => h.completedDays.includes(dateStr))
          : targetHabits[0]?.completedDays.includes(dateStr);

      if (isDayActive) {
        currentStreakCount++;
        if (currentStreakCount > longestStreak) {
          longestStreak = currentStreakCount;
        }
      } else {
        currentStreakCount = 0;
      }
    }

    return {
      rate,
      completedDaysCount: completedDaysSet.size,
      completedCheckins,
      longestStreak,
      totalDays: evaluatedDays,
    };
  }, [calendarYear, calendarMonth, daysInMonth, habits, selectedCalendarHabitId, todayDate]);

  // Weekly completion data for past 7 days (including today) using recharts
  const weeklyChartData = useMemo(() => {
    const items = [];
    let totalCompleted = 0;

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;

      const count = habits.filter((h) => h.completedDays.includes(dateStr)).length;
      totalCompleted += count;

      const dayName = new Intl.DateTimeFormat(localeMap[currentLang], {
        weekday: 'short',
      }).format(d);

      const dayNum = String(d.getDate());

      items.push({
        dateStr,
        dayLabel: `${dayName} ${dayNum}`,
        completed: count,
        total: habits.length,
        isToday: dateStr === todayStr,
      });
    }

    const avg = habits.length > 0 ? (totalCompleted / 7).toFixed(1) : '0';

    return {
      items,
      totalCompleted,
      avg,
    };
  }, [habits, currentLang, todayStr, localeMap]);

  const CustomChartTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-stone-900 text-white px-3 py-2 rounded-xl text-xs shadow-xl border border-stone-800 space-y-1">
          <p className="font-semibold text-stone-200">
            {item.dayLabel} {item.isToday ? `(${t.common.today})` : ''}
          </p>
          <div className="flex items-center gap-1.5 font-mono-num text-amber-400 font-bold">
            <span>
              {item.completed} / {item.total} {t.habits.completed.toLowerCase()}
            </span>
          </div>
          <p className="text-[10px] text-stone-400 font-mono-num">
            {item.total > 0 ? Math.round((item.completed / item.total) * 100) : 0}%
          </p>
        </div>
      );
    }
    return null;
  };

  const handleCreateHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddHabit(newTitle.trim(), selectedCategory);
    setNewTitle('');
    setIsAddingOpen(false);
    sounds.playHabitCheck();
  };

  const handleQuickAddPreset = (title: string, cat: 'morning' | 'health' | 'mind' | 'evening') => {
    onAddHabit(title, cat);
    sounds.playHabitCheck();
  };

  const presetList = [
    { title: t.habits.presetHabits.water, cat: 'morning' as const },
    { title: t.habits.presetHabits.stretch, cat: 'health' as const },
    { title: t.habits.presetHabits.walk, cat: 'health' as const },
    { title: t.habits.presetHabits.reading, cat: 'mind' as const },
    { title: t.habits.presetHabits.mindfulness, cat: 'mind' as const },
    { title: t.habits.presetHabits.sleepOnTime, cat: 'evening' as const },
    { title: t.habits.presetHabits.familyCall, cat: 'mind' as const },
  ];

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'morning':
        return t.habits.categories.morning;
      case 'health':
        return t.habits.categories.health;
      case 'mind':
        return t.habits.categories.mind;
      case 'evening':
        return t.habits.categories.evening;
      default:
        return cat;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & View Mode Switcher Card */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-stone-900 tracking-tight">{t.habits.title}</h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">{t.habits.subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Segmented Controls */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  viewMode === 'list'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <ListFilter className="w-3.5 h-3.5" />
                {t.habits.listView}
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  viewMode === 'calendar'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                {t.habits.calendarView}
              </button>
            </div>

            {/* Add Habit Button */}
            <button
              onClick={() => setIsAddingOpen(!isAddingOpen)}
              className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-xs"
            >
              <Plus className="w-4 h-4" />
              {t.habits.addHabit}
            </button>
          </div>
        </div>

        {/* Overall progress indicator for today */}
        <div className="space-y-1.5 pt-2 border-t border-stone-100">
          <div className="flex items-center justify-between text-xs text-stone-600">
            <span className="font-medium">{t.habits.todayProgress}</span>
            <span className="font-mono-num font-semibold text-stone-900">
              {completedTodayCount} / {habits.length} ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Category Filter Tabs (visible in list view) */}
        {viewMode === 'list' && (
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-1">
            {(['all', 'morning', 'health', 'mind', 'evening'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  filterCategory === cat
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {cat === 'all' ? t.habits.categories.all : getCategoryLabel(cat)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Weekly Completion Chart (Past 7 Days) powered by recharts */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 tracking-tight">
                {t.habits.weeklyChartTitle}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                {t.habits.weeklyChartSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500">{t.habits.weeklyAvgLabel}:</span>
              <span className="font-bold font-mono-num text-stone-900 text-sm">
                {weeklyChartData.avg} / {habits.length}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500">{t.habits.totalDoneInMonth}:</span>
              <span className="font-bold font-mono-num text-emerald-700 text-sm">
                {weeklyChartData.totalCompleted}
              </span>
            </div>
          </div>
        </div>

        {/* Recharts Bar Chart Container */}
        <div className="w-full h-48 sm:h-52 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={weeklyChartData.items}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f4" />
              <XAxis
                dataKey="dayLabel"
                stroke="#a8a29e"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#e7e5e4' }}
              />
              <YAxis
                stroke="#a8a29e"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
                domain={[0, Math.max(habits.length, 5)]}
              />
              <Tooltip content={<CustomChartTooltip />} />
              <Bar dataKey="completed" radius={[6, 6, 0, 0]} maxBarSize={44}>
                {weeklyChartData.items.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.isToday
                        ? '#059669' // Emerald-600 for today
                        : entry.completed > 0
                        ? '#10b981' // Emerald-500 for days with completions
                        : '#e7e5e4' // Stone-200 for 0 completed
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend / Info Strip */}
        <div className="flex items-center justify-between text-[11px] text-stone-400 border-t border-stone-100 pt-2 font-mono-num">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600 inline-block" />
              <span className="text-stone-600 font-sans">{t.common.today}</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" />
              <span className="text-stone-600 font-sans">{t.habits.completed}</span>
            </span>
          </div>

          <span>{t.habits.habitsCompletedLabel} (0 - {habits.length})</span>
        </div>
      </div>

      {/* Add Custom Habit Form Drawer */}
      {isAddingOpen && (
        <form onSubmit={handleCreateHabit} className="bg-amber-50/60 border border-amber-200/70 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-stone-900">{t.habits.addHabit}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder={t.habits.habitNamePlaceholder}
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                autoFocus
              />
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              >
                <option value="morning">{t.habits.categories.morning}</option>
                <option value="health">{t.habits.categories.health}</option>
                <option value="mind">{t.habits.categories.mind}</option>
                <option value="evening">{t.habits.categories.evening}</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddingOpen(false)}
              className="px-3.5 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900"
            >
              {t.common.cancel}
            </button>
            <button
              type="submit"
              disabled={!newTitle.trim()}
              className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 disabled:opacity-50 transition-colors shadow-xs"
            >
              {t.common.save}
            </button>
          </div>
        </form>
      )}

      {/* VIEW MODE 1: LIST VIEW */}
      {viewMode === 'list' && (
        <>
          <div className="space-y-2.5">
            {filteredHabits.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-200/80 p-8 text-center text-stone-500 text-sm">
                {t.habits.pending}
              </div>
            ) : (
              filteredHabits.map((habit) => {
                const isCompletedToday = habit.completedDays.includes(todayStr);

                return (
                  <div
                    key={habit.id}
                    className={`bg-white rounded-xl border p-4 transition-all flex items-center justify-between gap-4 group ${
                      isCompletedToday
                        ? 'border-emerald-200/80 bg-emerald-50/20'
                        : 'border-stone-200/80 hover:border-stone-300'
                    }`}
                  >
                    {/* Left: Interactive Checkbox & Title */}
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      <button
                        onClick={() => onToggleHabit(habit.id, todayStr)}
                        className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                          isCompletedToday
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                            : 'border-stone-300 hover:border-stone-500 bg-white'
                        }`}
                        aria-label={`Toggle ${habit.title}`}
                      >
                        {isCompletedToday && <Check className="w-4 h-4 stroke-[3]" />}
                      </button>

                      <div className="min-w-0">
                        <p
                          className={`text-sm font-medium tracking-tight truncate ${
                            isCompletedToday ? 'line-through text-stone-400 font-normal' : 'text-stone-900'
                          }`}
                        >
                          {habit.title}
                        </p>

                        {/* Clean unboxed metadata with typographic dot separator */}
                        <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                          <span>{getCategoryLabel(habit.category)}</span>
                          <span aria-hidden="true">·</span>
                          <span className="flex items-center gap-1 font-mono-num">
                            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            {habit.streak} {t.habits.streak}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Quick Delete action */}
                    <button
                      onClick={() => onDeleteHabit(habit.id)}
                      aria-label={t.habits.delete}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors opacity-70 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Recommended Everyday Habit Presets */}
          <div className="bg-stone-100/60 rounded-2xl border border-stone-200/60 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-700 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.habits.presetHabits.water.slice(0, 20)}... ({t.habits.addHabit})</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {presetList.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickAddPreset(preset.title, preset.cat)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-white border border-stone-200/80 text-stone-700 hover:border-stone-400 hover:text-stone-900 transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5 text-stone-400" />
                  <span>{preset.title}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* VIEW MODE 2: MONTHLY CALENDAR VIEW */}
      {viewMode === 'calendar' && (
        <div className="space-y-6">
          {/* Calendar Controls & Month Selector Card */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Month & Year Navigation */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-stone-100 rounded-lg p-1">
                  <button
                    onClick={handlePrevMonth}
                    aria-label={t.habits.prevMonth}
                    className="w-8 h-8 rounded-md bg-white hover:bg-stone-50 border border-stone-200/60 flex items-center justify-center text-stone-700 transition-colors shadow-2xs"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    aria-label={t.habits.nextMonth}
                    className="w-8 h-8 rounded-md bg-white hover:bg-stone-50 border border-stone-200/60 flex items-center justify-center text-stone-700 transition-colors shadow-2xs"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-stone-900 capitalize tracking-tight">
                  {monthDisplayTitle}
                </h3>

                <button
                  onClick={handleJumpToToday}
                  className="text-xs px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold transition-colors"
                >
                  {t.habits.todayBtn}
                </button>
              </div>

              {/* Habit Filter Picker for Calendar */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-stone-500 whitespace-nowrap">
                  {t.habits.selectHabitToView}
                </span>
                <select
                  value={selectedCalendarHabitId}
                  onChange={(e) => setSelectedCalendarHabitId(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-medium bg-stone-50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 max-w-[200px] truncate"
                >
                  <option value="all">{t.habits.allHabitsOverview}</option>
                  {habits.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3 Key Monthly Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-stone-100">
              {/* Metric 1: Monthly Success Rate */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/60">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>{t.habits.monthlyCompletionRate}</span>
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div className="text-xl sm:text-2xl font-bold font-mono-num text-emerald-700 mt-1">
                  {monthlyStats.rate}%
                </div>
              </div>

              {/* Metric 2: Completed Days in Month */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/60">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>{t.habits.completedDaysCount}</span>
                  <CalendarIcon className="w-3.5 h-3.5 text-stone-600" />
                </div>
                <div className="text-xl sm:text-2xl font-bold font-mono-num text-stone-900 mt-1">
                  {monthlyStats.completedDaysCount}{' '}
                  <span className="text-xs font-normal text-stone-500">/ {monthlyStats.totalDays}</span>
                </div>
              </div>

              {/* Metric 3: Best Streak in Month */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/60">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>{t.habits.bestStreak}</span>
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                </div>
                <div className="text-xl sm:text-2xl font-bold font-mono-num text-amber-600 mt-1">
                  {monthlyStats.longestStreak}{' '}
                  <span className="text-xs font-normal text-stone-500">{t.common.day}</span>
                </div>
              </div>

              {/* Metric 4: Total check-ins */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/60">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>{t.habits.totalDoneInMonth}</span>
                  <Award className="w-3.5 h-3.5 text-indigo-600" />
                </div>
                <div className="text-xl sm:text-2xl font-bold font-mono-num text-stone-900 mt-1">
                  {monthlyStats.completedCheckins}
                </div>
              </div>
            </div>

            {/* 7-Column Calendar Grid */}
            <div className="space-y-2 pt-2">
              {/* Day of Week Headers */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs font-bold text-stone-500">
                {t.habits.daysOfWeek.map((dayName, idx) => (
                  <div key={idx} className="py-1">
                    {dayName}
                  </div>
                ))}
              </div>

              {/* Calendar Day Cells */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {/* Blank padding cells before month starts */}
                {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                  <div key={`blank_${idx}`} className="min-h-[52px] sm:min-h-[64px] rounded-xl bg-stone-50/40" />
                ))}

                {/* Actual Month Days */}
                {Array.from({ length: daysInMonth }).map((_, idx) => {
                  const dayNum = idx + 1;
                  const dateStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(
                    dayNum
                  ).padStart(2, '0')}`;

                  const isToday = dateStr === todayStr;
                  const isSelected = dateStr === inspectedDateStr;

                  // Target habits to evaluate for this cell
                  const targetHabits =
                    selectedCalendarHabitId === 'all'
                      ? habits
                      : habits.filter((h) => h.id === selectedCalendarHabitId);

                  const habitsCompletedOnDate = targetHabits.filter((h) =>
                    h.completedDays.includes(dateStr)
                  );

                  const completionRatio =
                    targetHabits.length > 0 ? habitsCompletedOnDate.length / targetHabits.length : 0;
                  const isFull = completionRatio === 1 && targetHabits.length > 0;
                  const isPartial = completionRatio > 0 && !isFull;

                  return (
                    <button
                      key={dateStr}
                      onClick={() => {
                        setInspectedDateStr(dateStr);
                        sounds.playHabitCheck();
                      }}
                      className={`min-h-[52px] sm:min-h-[64px] p-1.5 sm:p-2 rounded-xl border flex flex-col justify-between items-center transition-all text-left relative ${
                        isSelected
                          ? 'border-stone-900 ring-2 ring-stone-900/10 shadow-xs'
                          : isToday
                          ? 'border-amber-400 bg-amber-50/40'
                          : 'border-stone-200/80 hover:border-stone-300 bg-white'
                      }`}
                    >
                      {/* Top Day Number & Today Marker */}
                      <div className="w-full flex items-center justify-between">
                        <span
                          className={`text-xs sm:text-sm font-bold font-mono-num ${
                            isToday ? 'text-amber-700 font-extrabold' : 'text-stone-800'
                          }`}
                        >
                          {dayNum}
                        </span>

                        {isToday && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        )}
                      </div>

                      {/* Visual Streak / Completion Indicator */}
                      <div className="w-full flex items-center justify-center my-0.5">
                        {isFull ? (
                          <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : isPartial ? (
                          <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] font-mono-num">
                            {habitsCompletedOnDate.length}/{targetHabits.length}
                          </div>
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-stone-200" />
                        )}
                      </div>

                      {/* Micro bottom status text */}
                      <span className="text-[9px] font-mono-num text-stone-400 truncate w-full text-center">
                        {targetHabits.length > 0
                          ? `${habitsCompletedOnDate.length}/${targetHabits.length}`
                          : '-'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Day Inspector & Back-Fill History Panel */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
              <div>
                <h4 className="text-base font-bold text-stone-900 tracking-tight">
                  {t.habits.detailsForDate}
                </h4>
                <p className="text-xs text-stone-500 font-mono-num mt-0.5">
                  {inspectedDateStr} {inspectedDateStr === todayStr && `(${t.common.today})`}
                </p>
              </div>

              <span className="text-xs text-stone-500">
                {t.habits.toggleCompletionOnDate}
              </span>
            </div>

            {/* List of all habits with check toggle for the inspected date */}
            <div className="space-y-2">
              {habits.length === 0 ? (
                <p className="text-sm text-stone-400 text-center py-4">{t.habits.pending}</p>
              ) : (
                habits.map((habit) => {
                  const isDoneOnInspectedDate = habit.completedDays.includes(inspectedDateStr);

                  return (
                    <div
                      key={habit.id}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                        isDoneOnInspectedDate
                          ? 'border-emerald-200/80 bg-emerald-50/30'
                          : 'border-stone-200/80 bg-stone-50/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <button
                          onClick={() => onToggleHabit(habit.id, inspectedDateStr)}
                          className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                            isDoneOnInspectedDate
                              ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                              : 'border-stone-300 hover:border-stone-500 bg-white'
                          }`}
                        >
                          {isDoneOnInspectedDate && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>

                        <div className="min-w-0">
                          <span
                            className={`text-xs sm:text-sm font-medium truncate block ${
                              isDoneOnInspectedDate ? 'text-stone-900 font-semibold' : 'text-stone-600'
                            }`}
                          >
                            {habit.title}
                          </span>
                          <span className="text-[11px] text-stone-400">
                            {getCategoryLabel(habit.category)} · {habit.streak} {t.habits.streak}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-semibold font-mono-num text-stone-500">
                        {isDoneOnInspectedDate ? t.habits.completed : t.habits.pending}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
