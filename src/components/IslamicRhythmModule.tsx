import React, { useState, useEffect, useMemo } from 'react';
import { SupportedLanguage } from '../types';
import { translations } from '../translations';
import {
  Moon,
  Sun,
  Compass,
  RotateCcw,
  Copy,
  Check,
  Calculator,
  Volume2,
  Sparkles,
  BookOpen,
  MapPin,
} from 'lucide-react';
import { sounds } from '../utils/sound';

interface IslamicRhythmModuleProps {
  currentLang: SupportedLanguage;
}

// City coordinates & base prayer adjustments
const CITY_DATA: Record<string, { name: string; fajr: string; sunrise: string; dhuhr: string; asr: string; maghrib: string; isha: string; qiblaDeg: number }> = {
  dhaka: {
    name: 'Dhaka (ঢাকা)',
    fajr: '04:45',
    sunrise: '05:58',
    dhuhr: '11:50',
    asr: '15:15',
    maghrib: '17:42',
    isha: '18:55',
    qiblaDeg: 268,
  },
  riyadh: {
    name: 'Riyadh / Makkah (الرياض / مكة)',
    fajr: '04:48',
    sunrise: '06:05',
    dhuhr: '11:48',
    asr: '15:08',
    maghrib: '17:31',
    isha: '19:01',
    qiblaDeg: 245,
  },
  dubai: {
    name: 'Dubai (دبي)',
    fajr: '05:05',
    sunrise: '06:22',
    dhuhr: '12:12',
    asr: '15:33',
    maghrib: '18:02',
    isha: '19:18',
    qiblaDeg: 258,
  },
  cairo: {
    name: 'Cairo (القاهرة)',
    fajr: '04:36',
    sunrise: '06:04',
    dhuhr: '11:45',
    asr: '14:58',
    maghrib: '17:26',
    isha: '18:44',
    qiblaDeg: 136,
  },
  london: {
    name: 'London (UK)',
    fajr: '05:42',
    sunrise: '07:35',
    dhuhr: '12:50',
    asr: '15:28',
    maghrib: '18:02',
    isha: '19:48',
    qiblaDeg: 119,
  },
  newyork: {
    name: 'New York (USA)',
    fajr: '05:51',
    sunrise: '07:18',
    dhuhr: '12:48',
    asr: '15:45',
    maghrib: '18:18',
    isha: '19:44',
    qiblaDeg: 58,
  },
};

const DAILY_AYAT = [
  {
    arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    bn: 'নিশ্চয়ই কষ্টের সাথেই তো স্বস্তি আছে। নিশ্চয়ই কষ্টের সাথেই স্বস্তি আছে।',
    en: 'For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.',
    reference: 'সূরা আশ-শারহ (৯৪:৫-৬)',
  },
  {
    arabic: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
    bn: 'আল্লাহ কাউকে তার সাধ্যাতীত কোনো কাজের ভার দেন না।',
    en: 'Allah does not burden a soul beyond that it can bear.',
    reference: 'সূরা আল-বাক্বারাাহ (২:২৮৬)',
  },
  {
    arabic: 'وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ',
    bn: 'তোমাদের পালনকর্তা বলেন: তোমরা আমাকে ডাকো, আমি তোমাদের ডাকে সাড়া দেব।',
    en: 'And your Lord says, "Call upon Me; I will respond to you."',
    reference: 'সূরা গাফির (৪০:৬০)',
  },
];

const DAILY_HADITH = [
  {
    arabic: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
    bn: 'তোমাদের মধ্যে সর্বোত্তম ব্যক্তি সে, যে নিজে কুরআন শেখে এবং অন্যকে শেখায়।',
    en: 'The best among you are those who learn the Quran and teach it.',
    reference: 'সহিহ আল-বুখারি (৫০২৭)',
  },
  {
    arabic: 'الطَّهُورُ شَطْرُ الإِيمَانِ',
    bn: 'পবিত্রতা ও পরিচ্ছন্নতা ঈমানের অর্ধেক।',
    en: 'Cleanliness is half of faith.',
    reference: 'সহিহ মুসলিম (২২৩)',
  },
];

export const IslamicRhythmModule: React.FC<IslamicRhythmModuleProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [selectedCity, setSelectedCity] = useState<string>('dhaka');

  // Tasbeeh state
  const [tasbeehDhikrIndex, setTasbeehDhikrIndex] = useState<number>(0);
  const [tasbeehCount, setTasbeehCount] = useState<number>(() => {
    return parseInt(localStorage.getItem('hayat_tasbeeh_count') || '0', 10);
  });
  const [tasbeehLaps, setTasbeehLaps] = useState<number>(() => {
    return parseInt(localStorage.getItem('hayat_tasbeeh_laps') || '0', 10);
  });
  const [totalLifetimeTasbeeh, setTotalLifetimeTasbeeh] = useState<number>(() => {
    return parseInt(localStorage.getItem('hayat_tasbeeh_total') || '0', 10);
  });

  const dhikrOptions = [
    { title: t.islamic.subhanallah, max: 33, label: 'سُبْحَانَ اللَّهِ' },
    { title: t.islamic.alhamdulillah, max: 33, label: 'الْحَمْدُ لِلَّهِ' },
    { title: t.islamic.allahuakbar, max: 34, label: 'اللَّهُ أَكْبَرُ' },
    { title: t.islamic.astaghfirullah, max: 100, label: 'أَسْتَغْفِرُ اللَّهَ' },
    { title: t.islamic.lailahaillallah, max: 100, label: 'لَا إِلَهَ إِلَّا اللَّهُ' },
  ];

  const currentDhikr = dhikrOptions[tasbeehDhikrIndex] || dhikrOptions[0];

  // Zakat Calculator State
  const [goldGrams, setGoldGrams] = useState<string>('');
  const [goldGramPrice, setGoldGramPrice] = useState<string>('9500'); // Approx BDT per gram (configurable)
  const [cashAmount, setCashAmount] = useState<string>('');
  const [businessAssets, setBusinessAssets] = useState<string>('');
  const [liabilities, setLiabilities] = useState<string>('');
  const [calculatedZakat, setCalculatedZakat] = useState<number | null>(null);

  // Copy notification state
  const [copiedAyah, setCopiedAyah] = useState<boolean>(false);

  // Persist Tasbeeh in storage
  useEffect(() => {
    localStorage.setItem('hayat_tasbeeh_count', String(tasbeehCount));
    localStorage.setItem('hayat_tasbeeh_laps', String(tasbeehLaps));
    localStorage.setItem('hayat_tasbeeh_total', String(totalLifetimeTasbeeh));
  }, [tasbeehCount, tasbeehLaps, totalLifetimeTasbeeh]);

  // Handle Tasbeeh Tap
  const handleTasbeehTap = () => {
    sounds.playHabitCheck();
    const nextCount = tasbeehCount + 1;
    setTotalLifetimeTasbeeh((prev) => prev + 1);

    if (nextCount >= currentDhikr.max) {
      setTasbeehCount(0);
      setTasbeehLaps((l) => l + 1);
    } else {
      setTasbeehCount(nextCount);
    }
  };

  const handleResetTasbeeh = () => {
    setTasbeehCount(0);
    setTasbeehLaps(0);
  };

  // Zakat Computation
  const handleComputeZakat = (e: React.FormEvent) => {
    e.preventDefault();
    const gold = (parseFloat(goldGrams) || 0) * (parseFloat(goldGramPrice) || 0);
    const cash = parseFloat(cashAmount) || 0;
    const business = parseFloat(businessAssets) || 0;
    const debts = parseFloat(liabilities) || 0;

    const netWealth = Math.max(0, gold + cash + business - debts);
    // 2.5% zakat on net wealth
    const zakatDue = netWealth * 0.025;
    setCalculatedZakat(Math.round(zakatDue));
    sounds.playHabitCheck();
  };

  const activeCityData = CITY_DATA[selectedCity] || CITY_DATA.dhaka;

  // Selected Daily Ayah / Hadith
  const today = new Date();
  const ayahIndex = today.getDate() % DAILY_AYAT.length;
  const currentAyah = DAILY_AYAT[ayahIndex];
  const hadithIndex = today.getDate() % DAILY_HADITH.length;
  const currentHadith = DAILY_HADITH[hadithIndex];

  const handleCopyAyah = () => {
    const text = `${currentAyah.arabic}\n${currentLang === 'bn' ? currentAyah.bn : currentAyah.en}\n(${currentAyah.reference})`;
    navigator.clipboard.writeText(text);
    setCopiedAyah(true);
    setTimeout(() => setCopiedAyah(false), 2000);
  };

  const prayersList = [
    { name: t.islamic.fajr, time: activeCityData.fajr, icon: '🌅' },
    { name: t.islamic.sunrise, time: activeCityData.sunrise, icon: '☀️' },
    { name: t.islamic.dhuhr, time: activeCityData.dhuhr, icon: '🔆' },
    { name: t.islamic.asr, time: activeCityData.asr, icon: '🌤️' },
    { name: t.islamic.maghrib, time: activeCityData.maghrib, icon: '🌇' },
    { name: t.islamic.isha, time: activeCityData.isha, icon: '🌙' },
  ];

  return (
    <div className="space-y-6">
      {/* 5 Daily Prayer Times Card */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-7 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 font-bold">
              🕌
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-900 tracking-tight">{t.islamic.prayerTimes}</h2>
              <p className="text-xs text-stone-500 mt-0.5">{t.islamic.subtitle}</p>
            </div>
          </div>

          {/* City Selector */}
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-stone-400" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-semibold bg-stone-50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            >
              <option value="dhaka">🇧🇩 Dhaka (ঢাকা)</option>
              <option value="riyadh">🇸🇦 Riyadh / Makkah (الرياض / مكة)</option>
              <option value="dubai">🇦🇪 Dubai (دبي)</option>
              <option value="cairo">🇪🇬 Cairo (القاهرة)</option>
              <option value="london">🇬🇧 London (UK)</option>
              <option value="newyork">🇺🇸 New York (USA)</option>
            </select>
          </div>
        </div>

        {/* 6 Prayer Milestones Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {prayersList.map((p, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-stone-200/80 bg-stone-50/70 hover:border-amber-400/80 transition-all text-center space-y-1.5"
            >
              <span className="text-xl">{p.icon}</span>
              <p className="text-xs font-medium text-stone-600 truncate">{p.name}</p>
              <p className="text-base sm:text-lg font-bold font-mono-num text-stone-900 tracking-tight">
                {p.time}
              </p>
            </div>
          ))}
        </div>

        {/* Qibla Direction Badge */}
        <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/60 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-600" />
            <span>{t.islamic.qiblaTitle} ({activeCityData.name}):</span>
          </div>
          <span className="font-bold font-mono-num text-sm text-stone-900">
            {activeCityData.qiblaDeg}°
          </span>
        </div>
      </div>

      {/* 2-Column Split: Digital Tasbeeh & Quran/Hadith of the Day */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* Left: Digital Tasbeeh Counter */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-7 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-900 tracking-tight">{t.islamic.tasbeehTitle}</h3>
                <p className="text-xs text-stone-500 mt-0.5">{t.islamic.tasbeehSubtitle}</p>
              </div>

              <button
                onClick={handleResetTasbeeh}
                aria-label={t.islamic.reset}
                className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                title={t.islamic.reset}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Dhikr Selector Tabs */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 pt-4">
              {dhikrOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTasbeehDhikrIndex(idx);
                    setTasbeehCount(0);
                  }}
                  className={`p-2 rounded-lg text-center border text-xs font-semibold transition-all ${
                    tasbeehDhikrIndex === idx
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-2xs'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <span className="block truncate text-[11px]">{opt.label}</span>
                  <span className="text-[10px] text-stone-400 font-mono-num">({opt.max})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Touch Counter Button */}
          <div className="flex flex-col items-center justify-center py-4">
            <button
              onClick={handleTasbeehTap}
              className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-lg shadow-emerald-900/10 flex flex-col items-center justify-center transition-transform active:scale-95 group focus:outline-none"
            >
              <span className="text-5xl sm:text-6xl font-black font-mono-num tracking-tight">
                {tasbeehCount}
              </span>
              <span className="text-xs font-semibold text-emerald-200 mt-1">
                / {currentDhikr.max}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-emerald-300/80 mt-2">
                {t.islamic.tapToCount}
              </span>
            </button>

            <div className="flex items-center gap-6 mt-4 text-xs font-mono-num text-stone-500">
              <span>{t.islamic.lap}: <strong className="text-stone-900 font-bold">{tasbeehLaps}</strong></span>
              <span>•</span>
              <span>মোট জিকির: <strong className="text-stone-900 font-bold">{totalLifetimeTasbeeh}</strong></span>
            </div>
          </div>
        </div>

        {/* Right: Daily Quran Verse & Hadith + Zakat Calculator */}
        <div className="space-y-6">
          
          {/* Daily Quran & Hadith Card */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-stone-900">{t.islamic.dailyAyahTitle}</h3>
              </div>
              <button
                onClick={handleCopyAyah}
                className="px-2.5 py-1 text-xs font-medium rounded-md border border-stone-200 text-stone-600 hover:bg-stone-50 flex items-center gap-1 transition-colors"
              >
                {copiedAyah ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                {copiedAyah ? 'কপি হয়েছে' : t.islamic.copyAyah}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/60 space-y-2.5">
              <p className="text-lg sm:text-xl font-arabic font-medium text-stone-900 text-right leading-loose" dir="rtl">
                {currentAyah.arabic}
              </p>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                “{currentLang === 'bn' ? currentAyah.bn : currentAyah.en}”
              </p>
              <p className="text-[11px] font-semibold text-emerald-700">
                — {currentAyah.reference}
              </p>
            </div>

            {/* Hadith Section */}
            <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-1.5">
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">{t.islamic.dailyHadithTitle}</span>
              <p className="text-sm font-arabic font-medium text-stone-900 text-right" dir="rtl">
                {currentHadith.arabic}
              </p>
              <p className="text-xs text-stone-700">
                “{currentLang === 'bn' ? currentHadith.bn : currentHadith.en}” ({currentHadith.reference})
              </p>
            </div>
          </div>

          {/* Simple Zakat Calculator (2.5%) */}
          <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-stone-900">{t.islamic.zakatTitle}</h3>
                <p className="text-[11px] text-stone-500">{t.islamic.zakatSubtitle}</p>
              </div>
              <Calculator className="w-4 h-4 text-amber-600" />
            </div>

            <form onSubmit={handleComputeZakat} className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-stone-600 font-medium mb-1">স্বর্ণ (গ্রাম)</label>
                <input
                  type="number"
                  placeholder="যেমন: ১০"
                  value={goldGrams}
                  onChange={(e) => setGoldGrams(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-stone-50 font-mono-num"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">নগদ টাকা / ব্যাংক</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={cashAmount}
                  onChange={(e) => setCashAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-stone-50 font-mono-num"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">ব্যবসার মালামাল</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={businessAssets}
                  onChange={(e) => setBusinessAssets(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-stone-50 font-mono-num"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">ঋণ / দেনা বাদ</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={liabilities}
                  onChange={(e) => setLiabilities(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-stone-50 font-mono-num"
                />
              </div>

              <div className="col-span-2 pt-1 flex items-center justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg font-semibold text-xs hover:bg-stone-800 transition-colors shadow-xs"
                >
                  {t.islamic.calculateZakat}
                </button>

                {calculatedZakat !== null && (
                  <div className="text-right">
                    <span className="text-[11px] text-stone-500 block">{t.islamic.zakatAmount} (২.৫%):</span>
                    <span className="text-base font-bold font-mono-num text-emerald-700">
                      {calculatedZakat.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
