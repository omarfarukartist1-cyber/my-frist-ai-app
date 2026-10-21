import React, { useState } from 'react';
import { SupportedLanguage } from '../types';
import { translations } from '../translations';
import {
  Download,
  Smartphone,
  DollarSign,
  Heart,
  Globe,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  CreditCard,
  QrCode,
  ShieldCheck,
} from 'lucide-react';
import { usePWAInstall } from '../utils/usePWAInstall';
import { sounds } from '../utils/sound';

interface PublishAndMonetizeModuleProps {
  currentLang: SupportedLanguage;
}

export const PublishAndMonetizeModule: React.FC<PublishAndMonetizeModuleProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  // Creator payment details (editable by owner)
  const [bkashNumber, setBkashNumber] = useState<string>(() => {
    return localStorage.getItem('hayat_dev_bkash') || '01XXXXXXXXX';
  });
  const [paypalEmail, setPaypalEmail] = useState<string>(() => {
    return localStorage.getItem('hayat_dev_paypal') || 'your-email@paypal.me';
  });
  const [isEditingPayment, setIsEditingPayment] = useState<boolean>(false);

  // Simulated donation test
  const [donationAmount, setDonationAmount] = useState<string>('100');
  const [donationSent, setDonationSent] = useState<boolean>(false);

  // Supporter Pass Status
  const [isProSupporter, setIsProSupporter] = useState<boolean>(() => {
    return localStorage.getItem('hayat_pro_supporter') === 'true';
  });

  const handleSavePaymentInfo = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('hayat_dev_bkash', bkashNumber);
    localStorage.setItem('hayat_dev_paypal', paypalEmail);
    setIsEditingPayment(false);
  };

  const handleSimulateDonation = (e: React.FormEvent) => {
    e.preventDefault();
    setDonationSent(true);
    sounds.playHabitCheck();
    setTimeout(() => setDonationSent(false), 4000);
  };

  const handleToggleProSupporter = () => {
    const next = !isProSupporter;
    setIsProSupporter(next);
    localStorage.setItem('hayat_pro_supporter', String(next));
    sounds.playHabitCheck();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Play Store & Instant Mobile Installation */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Smartphone className="w-4 h-4" />
              <span>{t.monetize.playStoreTitle}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              প্লে স্টোরে কেন সার্চে আসছে না এবং কীভাবে পাবলিশ করবেন?
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {t.monetize.playStoreDesc}
            </p>
          </div>

          {/* Instant 1-Click Install Button */}
          <div className="shrink-0">
            {isInstalled ? (
              <div className="px-4 py-2.5 rounded-xl bg-emerald-600/30 border border-emerald-500/50 text-emerald-300 font-semibold text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>অ্যাপটি মোবাইলে ইনস্টল্ড রয়েছে</span>
              </div>
            ) : isInstallable ? (
              <button
                onClick={install}
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
              >
                <Download className="w-4 h-4" />
                {t.monetize.installNow}
              </button>
            ) : isIOS ? (
              <div className="p-3 bg-stone-800/80 rounded-xl text-xs text-stone-300 border border-stone-700">
                আইফোনে Safari থেকে <strong>Share</strong> চাপুন এবং <strong>Add to Home Screen</strong> দিন।
              </div>
            ) : (
              <button
                onClick={() => {
                  alert('আপনার ব্রাউজারের থ্রি-ডট (⋮) মেনু থেকে "Install App" বা "Add to Home Screen" চাপুন।');
                }}
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md"
              >
                <Download className="w-4 h-4" />
                {t.monetize.installNow}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2-Column Grid: Step-by-Step Play Store TWA Guide + Monetization Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* Left: Play Store Publishing Guide (TWA / PWABuilder) */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-800 font-bold">
              📦
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 tracking-tight">
                {t.monetize.twaGuideTitle}
              </h3>
              <p className="text-xs text-stone-500">গুগল প্লে স্টোরে সার্চে আনতে করণীয়</p>
            </div>
          </div>

          <div className="space-y-3">
            {t.monetize.twaSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/60 text-xs sm:text-sm text-stone-800 leading-relaxed font-medium flex items-start gap-2.5"
              >
                <span className="w-5 h-5 rounded-full bg-stone-900 text-white font-mono-num text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-950 space-y-2">
            <p className="font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              প্লে স্টোর অ্যাকাউন্ট তথ্য:
            </p>
            <p className="text-[11px] leading-relaxed text-stone-700">
              গুগল প্লে কনসোলে অ্যাপ দিতে গুগলকে একবারের জন্য $25 (প্রায় ৩,০০০ টাকা) ফি দিতে হয়। এরপর আজীবন যত খুশি অ্যাপ ফ্রিতে পাবলিশ করা যায়।
            </p>
            <a
              href="https://www.pwabuilder.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-bold text-amber-800 hover:underline pt-1"
            >
              PWABuilder.com খুলুন <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Right: Monetization & Earning Avenues */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-7 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-900 tracking-tight">{t.monetize.earningTitle}</h3>
              <p className="text-xs text-stone-500 mt-0.5">{t.monetize.earningDesc}</p>
            </div>
            <DollarSign className="w-5 h-5 text-emerald-600" />
          </div>

          {/* Method 1: Creator Support & Hadiah (bKash/Nagad/PayPal) */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500" />
                {t.monetize.supportDevTitle}
              </span>
              <button
                onClick={() => setIsEditingPayment(!isEditingPayment)}
                className="text-[11px] text-emerald-800 hover:underline font-semibold"
              >
                {isEditingPayment ? t.common.close : t.common.edit}
              </button>
            </div>

            {isEditingPayment ? (
              <form onSubmit={handleSavePaymentInfo} className="space-y-2 text-xs">
                <div>
                  <label className="block text-stone-600 font-medium mb-1">বিকাশ / নগদ নম্বর:</label>
                  <input
                    type="text"
                    value={bkashNumber}
                    onChange={(e) => setBkashNumber(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 bg-white font-mono-num"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">PayPal লিংক / ইমেইল:</label>
                  <input
                    type="text"
                    value={paypalEmail}
                    onChange={(e) => setPaypalEmail(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 bg-white font-mono-num"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs"
                >
                  {t.common.save}
                </button>
              </form>
            ) : (
              <div className="text-xs space-y-1 text-stone-700">
                <p>বিকাশ/নগদ (Personal): <strong className="font-mono-num text-stone-900">{bkashNumber}</strong></p>
                <p>PayPal: <strong className="font-mono-num text-stone-900">{paypalEmail}</strong></p>
              </div>
            )}

            {/* Simulated Tip Test */}
            <form onSubmit={handleSimulateDonation} className="pt-2 border-t border-emerald-200/60 flex items-center gap-2">
              <span className="text-xs text-stone-600 font-medium">হাদিয়া পাঠান (টেস্ট):</span>
              <input
                type="number"
                min="10"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                className="w-20 px-2 py-1 rounded-lg border border-stone-300 text-xs font-mono-num bg-white"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors shadow-2xs"
              >
                সাপোর্ট দিন
              </button>
            </form>

            {donationSent && (
              <p className="text-xs font-bold text-emerald-800 animate-fadeIn">
                {t.monetize.thankYouDonation}
              </p>
            )}
          </div>

          {/* Method 2: Google AdMob In-App Banners */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
            <span className="text-xs font-bold text-stone-900 block">{t.monetize.admobTitle}</span>
            <p className="text-xs text-stone-600 leading-relaxed">
              {t.monetize.admobDesc}
            </p>
            {/* Ad Banner placeholder preview */}
            <div className="w-full h-14 rounded-lg border border-dashed border-stone-300 bg-stone-100 flex items-center justify-center text-xs text-stone-400">
              [ Google AdMob 320x50 Banner Slot — Ready for Deployment ]
            </div>
          </div>

          {/* Method 3: Pro Patron Pass */}
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-amber-950 block">{t.monetize.proSupporterTitle}</span>
              <p className="text-[11px] text-stone-600">{t.monetize.proSupporterDesc}</p>
            </div>
            <button
              onClick={handleToggleProSupporter}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs ${
                isProSupporter
                  ? 'bg-amber-600 text-white'
                  : 'bg-white border border-stone-300 text-stone-800 hover:bg-stone-50'
              }`}
            >
              {isProSupporter ? 'Active Pro' : 'Unlock Pro'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
