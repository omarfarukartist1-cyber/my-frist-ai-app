import React, { useState, useEffect } from 'react';
import { SupportedLanguage } from '../types';
import { translations } from '../translations';
import { AlertCircle, Phone, HeartPulse, Flame, Sun, Activity, PhoneCall, ShieldAlert } from 'lucide-react';
import { sounds } from '../utils/sound';

interface EmergencyGuideModuleProps {
  currentLang: SupportedLanguage;
}

export const EmergencyGuideModule: React.FC<EmergencyGuideModuleProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [activeGuide, setActiveGuide] = useState<'cpr' | 'choking' | 'burns' | 'heatstroke'>('cpr');
  const [cprMetronomeActive, setCprMetronomeActive] = useState<boolean>(false);
  const [iceNumber, setIceNumber] = useState<string>(() => {
    return localStorage.getItem('hayat_ice_phone') || '';
  });
  const [isEditingIce, setIsEditingIce] = useState<boolean>(false);

  // CPR 110 BPM Metronome Audio pulse
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (cprMetronomeActive) {
      // 110 beats per minute -> ~545ms per beat
      interval = setInterval(() => {
        sounds.playHabitCheck();
      }, 545);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [cprMetronomeActive]);

  const handleSaveIce = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('hayat_ice_phone', iceNumber);
    setIsEditingIce(false);
  };

  const emergencyContacts = [
    { country: 'Bangladesh (বাংলাদেশ)', number: '999', label: 'National Police / Fire / Ambulance', flag: '🇧🇩' },
    { country: 'Saudi Arabia (السعودية)', number: '997', label: 'الهلال الأحمر (Red Crescent Ambulance)', flag: '🇸🇦' },
    { country: 'Saudi Arabia (الشرطة)', number: '999', label: 'الشرطة والدوريات (Police)', flag: '🇸🇦' },
    { country: 'United States (USA)', number: '911', label: 'Universal Emergency Response', flag: '🇺🇸' },
    { country: 'United Arab Emirates (UAE)', number: '998', label: 'الإسعاف الوطني (Ambulance)', flag: '🇦🇪' },
    { country: 'United Kingdom & Europe', number: '999', label: 'Universal Emergency (999 / 112)', flag: '🇬🇧' },
  ];

  return (
    <div className="space-y-6">
      {/* Disclaimer Banner */}
      <div className="bg-rose-50 border border-rose-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-rose-900 leading-relaxed">
          <p className="font-bold">{t.emergency.title}</p>
          <p className="mt-0.5">{t.emergency.disclaimer}</p>
        </div>
      </div>

      {/* Guide Tabs */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-6 shadow-xs space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => {
              setActiveGuide('cpr');
              setCprMetronomeActive(false);
            }}
            className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
              activeGuide === 'cpr'
                ? 'border-rose-600 bg-rose-50 text-rose-900 font-bold shadow-xs'
                : 'border-stone-200 hover:bg-stone-50 text-stone-700'
            }`}
          >
            <HeartPulse className="w-5 h-5 text-rose-600" />
            <span className="text-xs">CPR (কার্ডিয়াক)</span>
          </button>

          <button
            onClick={() => {
              setActiveGuide('choking');
              setCprMetronomeActive(false);
            }}
            className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
              activeGuide === 'choking'
                ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold shadow-xs'
                : 'border-stone-200 hover:bg-stone-50 text-stone-700'
            }`}
          >
            <Activity className="w-5 h-5 text-amber-600" />
            <span className="text-xs">Choking (দম বন্ধ)</span>
          </button>

          <button
            onClick={() => {
              setActiveGuide('burns');
              setCprMetronomeActive(false);
            }}
            className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
              activeGuide === 'burns'
                ? 'border-orange-600 bg-orange-50 text-orange-900 font-bold shadow-xs'
                : 'border-stone-200 hover:bg-stone-50 text-stone-700'
            }`}
          >
            <Flame className="w-5 h-5 text-orange-600" />
            <span className="text-xs">Burns (আগুনে পোড়া)</span>
          </button>

          <button
            onClick={() => {
              setActiveGuide('heatstroke');
              setCprMetronomeActive(false);
            }}
            className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
              activeGuide === 'heatstroke'
                ? 'border-sky-600 bg-sky-50 text-sky-900 font-bold shadow-xs'
                : 'border-stone-200 hover:bg-stone-50 text-stone-700'
            }`}
          >
            <Sun className="w-5 h-5 text-sky-600" />
            <span className="text-xs">Heatstroke (হিটস্ট্রোক)</span>
          </button>
        </div>

        {/* Selected Guide Details */}
        <div className="space-y-4 pt-2">
          {activeGuide === 'cpr' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-900 text-white p-4 rounded-xl">
                <div>
                  <h3 className="text-base font-bold">{t.emergency.cprTitle}</h3>
                  <p className="text-xs text-stone-400 mt-0.5">100 - 120 beats per minute tempo cue</p>
                </div>
                <button
                  onClick={() => setCprMetronomeActive(!cprMetronomeActive)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-xs ${
                    cprMetronomeActive ? 'bg-rose-600 text-white animate-pulse' : 'bg-white text-stone-900'
                  }`}
                >
                  {cprMetronomeActive ? 'Stop Metronome' : 'Start 110 BPM Rhythm'}
                </button>
              </div>

              <div className="space-y-2.5">
                {t.emergency.cprSteps.map((step, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeGuide === 'choking' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-stone-900">{t.emergency.chokingTitle}</h3>
              <div className="space-y-2.5">
                {t.emergency.chokingSteps.map((step, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeGuide === 'burns' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-stone-900">{t.emergency.burnsTitle}</h3>
              <div className="space-y-2.5">
                {t.emergency.burnsSteps.map((step, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeGuide === 'heatstroke' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-stone-900">{t.emergency.heatstrokeTitle}</h3>
              <div className="space-y-2.5">
                {t.emergency.heatstrokeSteps.map((step, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Global Hotlines & Personal ICE Contact */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-stone-900 tracking-tight">{t.emergency.hotlinesTitle}</h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">{t.emergency.hotlinesDesc}</p>
          </div>
          <Phone className="w-5 h-5 text-rose-600" />
        </div>

        {/* Personal ICE Contact Card */}
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">{t.emergency.customContact}</span>
            <p className="text-sm font-semibold text-stone-900 mt-0.5 font-mono-num">
              {iceNumber ? iceNumber : 'No ICE contact set'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {iceNumber && (
              <a
                href={`tel:${iceNumber}`}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:bg-emerald-700 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                {t.emergency.callNow}
              </a>
            )}
            <button
              onClick={() => setIsEditingIce(!isEditingIce)}
              className="px-3 py-1.5 rounded-lg bg-white border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50"
            >
              {isEditingIce ? t.common.close : t.common.edit}
            </button>
          </div>
        </div>

        {isEditingIce && (
          <form onSubmit={handleSaveIce} className="flex items-center gap-2">
            <input
              type="tel"
              placeholder="+8801... / +966... / +1..."
              value={iceNumber}
              onChange={(e) => setIceNumber(e.target.value)}
              className="px-3.5 py-2 rounded-lg border border-stone-300 text-xs bg-white flex-1 font-mono-num"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold shadow-xs"
            >
              {t.common.save}
            </button>
          </form>
        )}

        {/* Hotlines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {emergencyContacts.map((c, idx) => (
            <a
              key={idx}
              href={`tel:${c.number}`}
              className="p-4 rounded-xl border border-stone-200/80 bg-stone-50 hover:bg-rose-50/50 hover:border-rose-200 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{c.flag}</span>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">{c.country}</h4>
                  <p className="text-[11px] text-stone-500 line-clamp-1">{c.label}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-base font-black font-mono-num text-rose-600 group-hover:scale-105 transition-transform inline-block">
                  {c.number}
                </span>
                <span className="block text-[10px] text-stone-400">{t.emergency.callNow}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
