import React from 'react';
import { SupportedLanguage } from '../types';
import { translations } from '../translations';
import { Volume2, VolumeX, Globe, Download, Smartphone } from 'lucide-react';
import { sounds } from '../utils/sound';
import { usePWAInstall } from '../utils/usePWAInstall';

interface HeaderProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  activeTab,
  onTabChange,
  soundEnabled,
  onToggleSound,
}) => {
  const t = translations[currentLang];
  const isRtl = t.common.direction === 'rtl';
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  const navItems = [
    { id: 'overview', label: t.tabs.overview },
    { id: 'habits', label: t.tabs.habits },
    { id: 'islamic', label: t.tabs.islamic },
    { id: 'hydration', label: t.tabs.hydration },
    { id: 'budget', label: t.tabs.budget },
    { id: 'peace', label: t.tabs.peace },
    { id: 'worldRhythm', label: t.tabs.worldRhythm },
    { id: 'tools', label: t.tabs.tools },
    { id: 'emergency', label: t.tabs.emergency },
    { id: 'monetize', label: t.tabs.monetize },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 sm:gap-6">
        
        {/* Zone 1: Single Brand Wordmark with Minimalist Unique Emblem */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onTabChange('overview')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-amber-500/30 bg-stone-950 flex items-center justify-center shrink-0 shadow-xs">
              <img
                src="/logo.jpg"
                alt="Hayat Emblem"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap group-hover:text-amber-400 transition-colors">
              {t.appName}
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (single line, horizontal scroll on mobile) */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  sounds.playHabitCheck();
                }}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors rounded-md ${
                  isActive
                    ? 'bg-stone-800 text-amber-400 font-semibold shadow-xs'
                    : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action & Preferences */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Install Button if installable */}
          {!isInstalled && (
            <button
              onClick={() => {
                if (isInstallable) {
                  install();
                } else {
                  onTabChange('monetize');
                }
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors shadow-2xs whitespace-nowrap shrink-0"
              title="Install App on Device"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{t.monetize.installNow}</span>
            </button>
          )}

          {/* Audio Feedback Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? t.common.soundOff : t.common.soundOn}
            className="w-9 h-9 rounded-md bg-stone-800 border border-stone-700/80 flex items-center justify-center text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
            title={soundEnabled ? t.common.soundOff : t.common.soundOn}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative flex items-center">
            <label htmlFor="lang-select" className="sr-only">{t.common.language}</label>
            <div className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 border border-stone-700/80 rounded-md px-2.5 py-1.5 transition-colors">
              <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <select
                id="lang-select"
                value={currentLang}
                onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
                className="bg-transparent text-xs font-medium text-stone-200 focus:outline-none cursor-pointer pr-1"
                dir={isRtl ? 'rtl' : 'ltr'}
              >
                <option value="bn" className="bg-stone-900 text-white">🇧🇩 বাংলা</option>
                <option value="ar" className="bg-stone-900 text-white">🇸🇦 العربية</option>
                <option value="en" className="bg-stone-900 text-white">🇺🇸 English</option>
                <option value="es" className="bg-stone-900 text-white">🇪🇸 Español</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
