import React, { useState, useEffect } from 'react';
import { SupportedLanguage, WorldCityTime } from '../types';
import { translations } from '../translations';
import { Sun, Moon, Clock, Globe2, Plus, Trash2 } from 'lucide-react';

interface WorldClockSolarModuleProps {
  currentLang: SupportedLanguage;
  cities: WorldCityTime[];
  onAddCity: (city: WorldCityTime) => void;
  onRemoveCity: (cityName: string) => void;
}

export const WorldClockSolarModule: React.FC<WorldClockSolarModuleProps> = ({
  currentLang,
  cities,
  onAddCity,
  onRemoveCity,
}) => {
  const t = translations[currentLang];
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCityName, setNewCityName] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const [newTimeZone, setNewTimeZone] = useState('Asia/Kolkata');
  const [newFlag, setNewFlag] = useState('🌍');

  // Live ticking clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Solar progress percentage (6am to 6pm daylight cycle approximation)
  const currentHour = currentTime.getHours() + currentTime.getMinutes() / 60;
  const sunProgress = Math.max(0, Math.min(100, Math.round(((currentHour - 6) / 12) * 100)));
  const isDaytime = currentHour >= 6 && currentHour < 18;

  const solarMilestones = [
    { label: t.worldRhythm.dawn, time: '05:30', icon: '🌅' },
    { label: t.worldRhythm.sunrise, time: '06:05', icon: '☀️' },
    { label: t.worldRhythm.solarNoon, time: '12:00', icon: '🔆' },
    { label: t.worldRhythm.goldenHour, time: '17:15', icon: '🌇' },
    { label: t.worldRhythm.sunset, time: '17:50', icon: '🌆' },
    { label: t.worldRhythm.dusk, time: '18:20', icon: '🌙' },
  ];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCityName.trim()) return;
    onAddCity({
      name: newCityName.trim(),
      country: newCountry.trim() || 'Custom',
      timeZone: newTimeZone,
      flag: newFlag || '🌍',
    });
    setNewCityName('');
    setNewCountry('');
    setShowAddForm(false);
  };

  const getCityTimeInfo = (timeZone: string) => {
    try {
      const timeStr = currentTime.toLocaleTimeString([], {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      const hourPart = parseInt(
        currentTime.toLocaleTimeString('en-US', { timeZone, hour: 'numeric', hour12: false }),
        10
      );
      const isNight = hourPart < 6 || hourPart >= 22;
      const isWorkHours = hourPart >= 9 && hourPart < 18;

      let callNotice = '';
      if (isNight) {
        callNotice = currentLang === 'bn' ? 'সম্ভবত ঘুমাচ্ছেন (রাত)' : currentLang === 'ar' ? 'وقت نوم الأحباء' : 'Sleeping (Late Night)';
      } else if (isWorkHours) {
        callNotice = currentLang === 'bn' ? 'কাজের সময় (সকাল/দুপুর)' : currentLang === 'ar' ? 'ساعات العمل' : 'Work hours';
      } else {
        callNotice = currentLang === 'bn' ? 'কথা বলার ভালো সময়' : currentLang === 'ar' ? 'وقت مناسب للتواصل' : 'Great time to call';
      }

      return {
        timeStr,
        isNight,
        callNotice,
      };
    } catch {
      return {
        timeStr: '--:--:--',
        isNight: false,
        callNotice: '',
      };
    }
  };

  return (
    <div className="space-y-6">
      {/* Solar Arc & Natural Rhythm Card */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-7 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-stone-900 tracking-tight">{t.worldRhythm.sunCycleTitle}</h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">{t.worldRhythm.subtitle}</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200/80">
            {isDaytime ? <Sun className="w-4 h-4 text-amber-600" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            <span>{isDaytime ? 'Daylight Hours Active' : 'Night Hours / Rest'}</span>
          </div>
        </div>

        {/* Visual Solar Progress Arc */}
        <div className="space-y-2">
          <div className="relative w-full h-3 bg-stone-100 rounded-full overflow-hidden border border-stone-200/60">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-600 rounded-full transition-all duration-1000"
              style={{ width: `${sunProgress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] text-stone-400 font-mono-num">
            <span>06:00 (Sunrise)</span>
            <span>12:00 (Solar Noon)</span>
            <span>18:00 (Sunset)</span>
          </div>
        </div>

        {/* Milestones Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {solarMilestones.map((ms, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 text-center space-y-1">
              <span className="text-lg">{ms.icon}</span>
              <p className="text-xs font-bold font-mono-num text-stone-900">{ms.time}</p>
              <p className="text-[11px] text-stone-500 truncate">{ms.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Global Family & World Clocks */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-stone-900 tracking-tight">{t.worldRhythm.worldClocksTitle}</h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">{t.worldRhythm.worldClocksSubtitle}</p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3.5 py-1.5 text-xs font-semibold text-stone-800 bg-stone-100 border border-stone-200/80 rounded-lg hover:bg-stone-200 transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            {t.worldRhythm.addCity}
          </button>
        </div>

        <p className="text-xs text-amber-800 bg-amber-50/70 p-3 rounded-xl border border-amber-200/60 leading-relaxed">
          💡 {t.worldRhythm.familyClockNote}
        </p>

        {/* Add City Modal */}
        {showAddForm && (
          <form onSubmit={handleAddSubmit} className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
            <h4 className="text-xs font-bold text-stone-900">{t.worldRhythm.addCity}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="City (e.g. Sydney, Berlin)"
                value={newCityName}
                onChange={(e) => setNewCityName(e.target.value)}
                className="px-3 py-2 rounded-lg border border-stone-300 text-xs bg-white"
                required
              />
              <input
                type="text"
                placeholder="Country (e.g. Australia)"
                value={newCountry}
                onChange={(e) => setNewCountry(e.target.value)}
                className="px-3 py-2 rounded-lg border border-stone-300 text-xs bg-white"
              />
              <select
                value={newTimeZone}
                onChange={(e) => setNewTimeZone(e.target.value)}
                className="px-3 py-2 rounded-lg border border-stone-300 text-xs bg-white"
              >
                <option value="Asia/Dhaka">Dhaka (UTC+6)</option>
                <option value="Asia/Riyadh">Riyadh / Makkah (UTC+3)</option>
                <option value="Asia/Dubai">Dubai (UTC+4)</option>
                <option value="Asia/Kolkata">Delhi / Kolkata (UTC+5:30)</option>
                <option value="Europe/London">London (UTC+0 / BST)</option>
                <option value="America/New_York">New York (EST / EDT)</option>
                <option value="America/Los_Angeles">Los Angeles (PST / PDT)</option>
                <option value="Australia/Sydney">Sydney (UTC+10/11)</option>
                <option value="Asia/Tokyo">Tokyo (UTC+9)</option>
              </select>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1 text-xs text-stone-600"
              >
                {t.common.cancel}
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-semibold"
              >
                {t.common.save}
              </button>
            </div>
          </form>
        )}

        {/* Cities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {cities.map((city) => {
            const { timeStr, isNight, callNotice } = getCityTimeInfo(city.timeZone);

            return (
              <div
                key={city.name}
                className="p-4 rounded-xl border border-stone-200/80 bg-stone-50 hover:border-stone-300 transition-colors flex flex-col justify-between space-y-3 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{city.flag}</span>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900 leading-tight">{city.name}</h4>
                      <p className="text-[11px] text-stone-500">{city.country}</p>
                    </div>
                  </div>
                  {cities.length > 2 && (
                    <button
                      onClick={() => onRemoveCity(city.name)}
                      aria-label="Remove city"
                      className="text-stone-300 hover:text-rose-600 p-1 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div>
                  <div className="text-2xl font-bold font-mono-num text-stone-900 flex items-center gap-2">
                    {timeStr}
                    {isNight ? (
                      <Moon className="w-4 h-4 text-indigo-500 shrink-0" />
                    ) : (
                      <Sun className="w-4 h-4 text-amber-500 shrink-0" />
                    )}
                  </div>
                  <div className="mt-1 text-[11px] font-medium text-stone-600 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                    <span>{callNotice}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
