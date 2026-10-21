import { SupportedLanguage } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  langName: string;
  tabs: {
    overview: string;
    habits: string;
    hydration: string;
    budget: string;
    peace: string;
    worldRhythm: string;
    tools: string;
    emergency: string;
    islamic: string;
    monetize: string;
  };
  greetings: {
    morning: string;
    afternoon: string;
    evening: string;
    night: string;
  };
  dailyWisdom: {
    quote: string;
    author: string;
  }[];
  habits: {
    title: string;
    subtitle: string;
    addHabit: string;
    habitNamePlaceholder: string;
    selectCategory: string;
    categories: {
      all: string;
      morning: string;
      health: string;
      mind: string;
      evening: string;
    };
    streak: string;
    completed: string;
    pending: string;
    delete: string;
    todayProgress: string;
    calendarView: string;
    listView: string;
    monthlyHistory: string;
    allHabitsOverview: string;
    monthlyCompletionRate: string;
    bestStreak: string;
    completedDaysCount: string;
    prevMonth: string;
    nextMonth: string;
    todayBtn: string;
    selectHabitToView: string;
    noHabitsOnDate: string;
    detailsForDate: string;
    daysOfWeek: string[];
    toggleCompletionOnDate: string;
    totalDoneInMonth: string;
    weeklyChartTitle: string;
    weeklyChartSubtitle: string;
    habitsCompletedLabel: string;
    weeklyAvgLabel: string;
    presetHabits: {
      water: string;
      stretch: string;
      walk: string;
      reading: string;
      mindfulness: string;
      sleepOnTime: string;
      familyCall: string;
      screenBreak: string;
    };
  };
  hydration: {
    title: string;
    subtitle: string;
    dailyGoal: string;
    consumed: string;
    remaining: string;
    addCup: string; // 250ml
    addBottle: string; // 500ml
    addCustom: string;
    recentDrinks: string;
    goalReached: string;
    reminderTip: string;
    resetToday: string;
  };
  budget: {
    title: string;
    subtitle: string;
    dailyLimit: string;
    todaySpent: string;
    remaining: string;
    addExpense: string;
    amount: string;
    itemTitle: string;
    category: string;
    categories: {
      food: string;
      groceries: string;
      transport: string;
      bills: string;
      health: string;
      other: string;
    };
    recentExpenses: string;
    noExpenses: string;
    setLimit: string;
    currency: string;
  };
  peace: {
    title: string;
    subtitle: string;
    breathingTitle: string;
    breathingDesc: string;
    startBreathing: string;
    stopBreathing: string;
    inhale: string;
    hold: string;
    exhale: string;
    relax: string;
    boxTechnique: string;
    calmTechnique: string;
    moodTitle: string;
    moodPrompt: string;
    moods: {
      great: string;
      good: string;
      neutral: string;
      tired: string;
      stressed: string;
    };
    gratitudePrompt: string;
    gratitudePlaceholder: string;
    saveGratitude: string;
    savedGratitude: string;
    sleepCalcTitle: string;
    sleepCalcDesc: string;
    wakeUpTime: string;
    calculateSleepTimes: string;
    recommendedBedtimes: string;
  };
  worldRhythm: {
    title: string;
    subtitle: string;
    sunCycleTitle: string;
    dawn: string;
    sunrise: string;
    solarNoon: string;
    goldenHour: string;
    sunset: string;
    dusk: string;
    worldClocksTitle: string;
    worldClocksSubtitle: string;
    addCity: string;
    dhaka: string;
    riyadh: string;
    newYork: string;
    london: string;
    dubai: string;
    cairo: string;
    tokyo: string;
    familyClockNote: string;
  };
  tools: {
    title: string;
    subtitle: string;
    unitConverter: string;
    kitchenConverter: string;
    tipSplit: string;
    from: string;
    to: string;
    value: string;
    result: string;
    kitchenItems: {
      cupToMl: string;
      tbspToMl: string;
      tspToMl: string;
      kgToPound: string;
      celToFah: string;
      kmToMile: string;
    };
    billSplitter: {
      billAmount: string;
      tipPercent: string;
      numberOfPeople: string;
      perPerson: string;
      totalWithTip: string;
    };
  };
  emergency: {
    title: string;
    subtitle: string;
    disclaimer: string;
    cprTitle: string;
    cprSteps: string[];
    chokingTitle: string;
    chokingSteps: string[];
    burnsTitle: string;
    burnsSteps: string[];
    heatstrokeTitle: string;
    heatstrokeSteps: string[];
    hotlinesTitle: string;
    hotlinesDesc: string;
    customContact: string;
    callNow: string;
  };
  notes: {
    title: string;
    placeholder: string;
    addNote: string;
    copyAll: string;
    copied: string;
    clearDone: string;
    itemsCount: string;
  };
  islamic: {
    title: string;
    subtitle: string;
    prayerTimes: string;
    nextPrayer: string;
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    tasbeehTitle: string;
    tasbeehSubtitle: string;
    count: string;
    target: string;
    lap: string;
    tapToCount: string;
    reset: string;
    subhanallah: string;
    alhamdulillah: string;
    allahuakbar: string;
    astaghfirullah: string;
    lailahaillallah: string;
    dailyAyahTitle: string;
    dailyHadithTitle: string;
    copyAyah: string;
    qiblaTitle: string;
    qiblaBearing: string;
    zakatTitle: string;
    zakatSubtitle: string;
    calculateZakat: string;
    zakatAmount: string;
  };
  monetize: {
    title: string;
    subtitle: string;
    playStoreTitle: string;
    playStoreDesc: string;
    installNow: string;
    twaGuideTitle: string;
    twaSteps: string[];
    earningTitle: string;
    earningDesc: string;
    supportDevTitle: string;
    bKashNagad: string;
    paypalStripe: string;
    admobTitle: string;
    admobDesc: string;
    proSupporterTitle: string;
    proSupporterDesc: string;
    simulatedDonation: string;
    thankYouDonation: string;
  };
  common: {
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    close: string;
    reset: string;
    day: string;
    today: string;
    soundOn: string;
    soundOff: string;
    language: string;
    direction: 'ltr' | 'rtl';
  };
}

export const translations: Record<SupportedLanguage, Translations> = {
  bn: {
    appName: 'হায়াত (Hayat)',
    tagline: 'সবার জন্য প্রতিদিনের জরুরি জীবনসঙ্গী',
    langName: 'বাংলা',
    tabs: {
      overview: 'দৈনিক চিত্র',
      habits: 'রুটিন ও অভ্যাস',
      hydration: 'পানি পান',
      budget: 'দৈনিক খরচ',
      peace: 'শান্তি ও শ্বাস',
      worldRhythm: 'সূর্য ও সময়',
      tools: 'প্রয়োজনীয় টুলস',
      emergency: 'জরুরি সাহায্য',
      islamic: 'নূর (নামাজ ও তাসবীহ)',
      monetize: 'প্লে স্টোর ও আর্নিং',
    },
    greetings: {
      morning: 'শুভ সকাল',
      afternoon: 'শুভ দুপুর',
      evening: 'শুভ সন্ধ্যা',
      night: 'শুভ রাত্রি',
    },
    dailyWisdom: [
      {
        quote: 'প্রতিটি নতুন দিন হলো নতুন করে শুরু করার একটি সুন্দর সুযোগ। ছোট ছোট ভালো অভ্যাসই জীবনে বড় পরিবর্তন আনে।',
        author: 'সার্বজনীন প্রবাদ',
      },
      {
        quote: 'ধৈর্য ও ধারাবাহিকতা হলো যেকোনো সফলতার সবচেয়ে বড় গোপন সূত্র।',
        author: 'জীবন দর্শন',
      },
      {
        quote: 'শরীর ও মনের যত্ন নিন, কারণ সারাজীবন আপনাকে এখানেই বসবাস করতে হবে।',
        author: 'স্বাস্থ্য প্রজ্ঞা',
      },
    ],
    habits: {
      title: 'দৈনিক রুটিন ও অভ্যাস',
      subtitle: 'প্রতিদিনের ছোট কাজগুলো ধারাবাহিকভাবে সম্পন্ন করুন',
      addHabit: 'নতুন অভ্যাস যোগ করুন',
      habitNamePlaceholder: 'যেমন: সকালে ১০ মিনিট হাঁটা, ২০ পৃষ্ঠা পড়া...',
      selectCategory: 'বিভাগ নির্বাচন',
      categories: {
        all: 'সকল',
        morning: 'সকাল',
        health: 'স্বাস্থ্য',
        mind: 'মননশীলতা',
        evening: 'রাত',
      },
      streak: 'দিনের ধারাবাহিকতা',
      completed: 'সম্পন্ন',
      pending: 'বাকি',
      delete: 'মুছুন',
      todayProgress: 'আজকের অগ্রগতি',
      calendarView: 'মাসিক ক্যালেন্ডার',
      listView: 'আজকের রুটিন তালিকা',
      monthlyHistory: 'মাসিক ধারাবাহিকতা ও ইতিহাস',
      allHabitsOverview: 'সকল অভ্যাসের সার্বিক ধারাবাহিকতা',
      monthlyCompletionRate: 'চলতি মাসের সাফল্যের হার',
      bestStreak: 'সর্বোচ্চ ধারাবাহিকতা (রেকর্ড)',
      completedDaysCount: 'মোট সম্পন্ন দিন',
      prevMonth: 'পূর্ববর্তী মাস',
      nextMonth: 'পরবর্তী মাস',
      todayBtn: 'আজকের তারিখ',
      selectHabitToView: 'নির্দিষ্ট অভ্যাস ফিল্টার করুন:',
      noHabitsOnDate: 'এই তারিখে কোনো অভ্যাস সম্পন্ন হয়নি',
      detailsForDate: 'তারিখের বিস্তারিত বিবরণ',
      daysOfWeek: ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'],
      toggleCompletionOnDate: 'সম্পন্ন / অসম্পন্ন টগল করুন',
      totalDoneInMonth: 'এই মাসে মোট সম্পন্ন বার',
      weeklyChartTitle: 'গত ৭ দিনের অভ্যাস সম্পন্নের চার্ট',
      weeklyChartSubtitle: 'প্রতিদিন কয়টি অভ্যাস সম্পন্ন হয়েছে তার দৃশ্যমান গ্রাফ',
      habitsCompletedLabel: 'সম্পন্ন অভ্যাস',
      weeklyAvgLabel: 'দৈনিক গড়',
      presetHabits: {
        water: 'ঘুম থেকে উঠে ২ গ্লাস পানি পান',
        stretch: '১৫ মিনিট হালকা ব্যায়াম বা স্ট্রেচিং',
        walk: 'সকালে বা বিকেলে ৩০ মিনিট হাঁটা',
        reading: 'ভালো বই বা দরকারি বিষয় ১৫ মিনিট পাঠ',
        mindfulness: '১০ মিনিট শান্তভাবে চিন্তা ও মন শান্ত রাখা',
        sleepOnTime: 'রাত ১১টার মধ্যে ঘুমানো',
        familyCall: 'পরিবারের প্রিয়জনের সাথে কথা বলা',
        screenBreak: 'কাজের ফাঁকে চোখকে বিশ্রাম দেয়া',
      },
    },
    hydration: {
      title: 'পানি পানের হিসাব (Hydration)',
      subtitle: 'সুস্থ ও সতেজ থাকতে নিয়মিত পর্যাপ্ত পানি পান করুন',
      dailyGoal: 'দৈনিক লক্ষ্যমাত্রা',
      consumed: 'আজ পান করেছেন',
      remaining: 'আরও বাকি আছে',
      addCup: '+ ২৫০ মিলি (১ গ্লাস)',
      addBottle: '+ ৫০০ মিলি (১ বোতল)',
      addCustom: 'নির্দিষ্ট পরিমাণ যোগ করুন',
      recentDrinks: 'আজকের পানি পানের তালিকা',
      goalReached: 'অভিনন্দন! আজকের লক্ষ্যমাত্রা পূর্ণ হয়েছে',
      reminderTip: 'পরামর্শ: প্রতি ১-২ ঘণ্টা পর পর এক গ্লাস পানি পান করুন। তৃষ্ণা লাগার আগেই পানি খাওয়া উত্তম।',
      resetToday: 'আজকের হিসাব রিসেট করুন',
    },
    budget: {
      title: 'দৈনিক হাতখরচ ও বাজেট',
      subtitle: 'অপ্রয়োজনীয় খরচ কমিয়ে প্রতিদিনের সাশ্রয়ী হিসাব রাখুন',
      dailyLimit: 'আজকের খরচের সীমা',
      todaySpent: 'আজ খরচ হয়েছে',
      remaining: 'বাকি হাতখরচ',
      addExpense: 'খরচ যোগ করুন',
      amount: 'টাকার পরিমাণ',
      itemTitle: 'বিবরণ (যেমন: বাজার, দুপুরের খাবার, রিকশাভাড়া)',
      category: 'বিভাগ',
      categories: {
        food: 'খাবার',
        groceries: 'বাজার/মুদি',
        transport: 'যাতায়াত',
        bills: 'বিল/মোবাইল রিচার্জ',
        health: 'ওষুধ/চিকিৎসা',
        other: 'অন্যান্য',
      },
      recentExpenses: 'আজকের খরচের তালিকা',
      noExpenses: 'আজ এখনো কোনো খরচ লিপিবদ্ধ করা হয়নি।',
      setLimit: 'দৈনিক বাজেট সীমা নির্ধারণ',
      currency: 'মুদ্রা',
    },
    peace: {
      title: 'শান্তি, শ্বাস ও মানসিক প্রশান্তি',
      subtitle: 'ক্লান্তি ও মানসিক চাপ দূর করে মনকে শান্ত রাখুন',
      breathingTitle: 'গভীর শ্বাস-প্রশ্বাস অনুশীলন',
      breathingDesc: 'বক্স ব্রিদিং (৪-৪-৪-৪) স্নায়ুতন্ত্রকে দ্রুত শান্ত করে ও মনোযোগ বাড়ায়',
      startBreathing: 'শ্বাস অনুশীলন শুরু করুন',
      stopBreathing: 'অনুশীলন থামান',
      inhale: 'ধীরে ধীরে শ্বাস নিন...',
      hold: 'শ্বাস ধরে রাখুন...',
      exhale: 'ধীরে ধীরে শ্বাস ছাড়ুন...',
      relax: 'শরীর শান্ত রাখুন...',
      boxTechnique: 'বক্স ব্রিদিং (৪ সেকেন্ড)',
      calmTechnique: '৪-৭-৮ শান্তিদায়ক শ্বাস',
      moodTitle: 'আজকের মানসিক অবস্থা কেমন?',
      moodPrompt: 'আজ আপনি কেমন অনুভব করছেন?',
      moods: {
        great: 'দারুণ',
        good: 'ভালো',
        neutral: 'স্বাভাবিক',
        tired: 'ক্লান্ত',
        stressed: 'উদ্বিগ্ন',
      },
      gratitudePrompt: 'আজকের দিনে আপনি কীসের জন্য কৃতজ্ঞ?',
      gratitudePlaceholder: 'আজ একটি ভালো বিষয় যা আপনার মুখে হাসি এনেছে...',
      saveGratitude: 'সংরক্ষণ করুন',
      savedGratitude: 'আজকের কৃতজ্ঞতা বাণী',
      sleepCalcTitle: 'সঠিক ঘুমের চক্র ক্যালকুলেটর (Sleep Cycle)',
      sleepCalcDesc: 'মানুষের ঘুম ৯০ মিনিটের চক্রে বিভক্ত। ঘুম ভাঙার সময় অনুযায়ী ঘুমানোর সঠিক সময় জেনে নিন।',
      wakeUpTime: 'কখন ঘুম থেকে উঠতে চান?',
      calculateSleepTimes: 'ঘুমানোর সময় দেখুন',
      recommendedBedtimes: 'সুপারিশকৃত ঘুমানোর সময় (ফ্রেশ অনুভব করার জন্য):',
    },
    worldRhythm: {
      title: 'সূর্য ঘড়ি ও বিশ্ব সময়',
      subtitle: 'প্রকৃতির স্বাভাবিক দিনের আলো ও বিশ্বজুড়ে প্রিয়জনদের সময়',
      sunCycleTitle: 'আজকের সৌর ও প্রাকৃতিক পরিক্রমা',
      dawn: 'ভোর (উষা)',
      sunrise: 'সূর্যোদয়',
      solarNoon: 'মধ্যাহ্ন (ঠিক দুপুর)',
      goldenHour: 'সোনালী আলো (বিকাল)',
      sunset: 'সূর্যাস্ত',
      dusk: 'সন্ধ্যা (গোধূলি)',
      worldClocksTitle: 'বিশ্ব ঘড়ি ও প্রবাসী প্রিয়জনের সময়',
      worldClocksSubtitle: 'বাংলাদেশ, মধ্যপ্রাচ্য, আমেরিকা ও ইউরোপের সময় এক নজরে',
      addCity: 'শহর যোগ করুন',
      dhaka: 'ঢাকা (বাংলাদেশ)',
      riyadh: 'রিয়াদ (সৌদি আরব)',
      newYork: 'নিউ ইয়র্ক (আমেরিকা)',
      london: 'লন্ডন (যুক্তরাজ্য)',
      dubai: 'দুবাই (সংযুক্ত আরব আমিরাত)',
      cairo: 'কায়রো (মিশর)',
      tokyo: 'টোকিও (জাপান)',
      familyClockNote: 'বিদেশে থাকা আত্মীয় ও বন্ধুদের সাথে কথা বলার আগে সেখানকার স্থানীয় সময় দেখে নিন।',
    },
    tools: {
      title: 'প্রয়োজনীয় ক্যালকুলেটর ও রূপান্তরক',
      subtitle: 'দৈনন্দিন রান্না, কেনাকাটা ও মাপজোকের তাৎক্ষণিক হিসাব',
      unitConverter: 'দৈনন্দিন একক রূপান্তর',
      kitchenConverter: 'রান্নাঘরের মাপজোক',
      tipSplit: 'বিল ভাগাভাগি ও হিসাব',
      from: 'থেকে',
      to: 'রূপান্তর হবে',
      value: 'মান লিখুন',
      result: 'ফলাফল',
      kitchenItems: {
        cupToMl: '১ কাপ = ২৪০ মিলি',
        tbspToMl: '১ টেবিল চামচ = ১৫ মিলি',
        tspToMl: '১ চা চামচ = ৫ মিলি',
        kgToPound: '১ কেজি = ২.২০ পাউন্ড',
        celToFah: 'ডিগ্রি সেলসিয়াস থেকে ফারেনহাইট',
        kmToMile: '১ কিলোমিটার = ০.৬২ মাইল',
      },
      billSplitter: {
        billAmount: 'মোট বিলের পরিমাণ',
        tipPercent: 'বকশিশ বা সার্ভিস চার্জ (%)',
        numberOfPeople: 'কতজন মানুষ ভাগ করবেন?',
        perPerson: 'জনপ্রতি দিতে হবে',
        totalWithTip: 'সর্বমোট বিল',
      },
    },
    emergency: {
      title: 'জরুরি জীবন রক্ষাকারী প্রাথমিক চিকিৎসা',
      subtitle: 'বিপদ বা দুর্ঘটনার সময় তাৎক্ষণিক করণীয় নির্দেশিকা',
      disclaimer: 'দ্রষ্টব্য: এটি সাধারণ প্রাথমিক নির্দেশিকা। গুরুতর জরুরি অবস্থায় অবিলম্বে জরুরি নম্বরে কল করুন।',
      cprTitle: 'সিপিআর (CPR) — জ্ঞান হারালে বা শ্বাস বন্ধ হলে',
      cprSteps: [
        '১. আক্রান্ত ব্যক্তি সাড়া দিচ্ছে কিনা কাঁধে মৃদু ঝাঁকুনি দিয়ে পরীক্ষা করুন।',
        '২. দ্রুত জরুরি নম্বরে (৯৯৯) ফোন দিন বা কাউকে দিতে বলুন।',
        '৩. বুকের ঠিক মাঝখানে দুই হাত জোড় করে প্রতি মিনিটে ১০০-১২০ বার দ্রুত ও শক্ত চাপ দিন (৫ সেমি গভীর)।',
        '৪. সাহায্য না আসা পর্যন্ত অথবা জ্ঞান ফিরে না পাওয়া পর্যন্ত চাপ অব্যাহত রাখুন।',
      ],
      chokingTitle: 'গলায় খাবার বা বস্তু আটকে দম বন্ধ হলে (Heimlich)',
      chokingSteps: [
        '১. আক্রান্ত ব্যক্তিকে কাশতে বলুন। যদি কাশতে বা কথা বলতে না পারে:',
        '২. ব্যক্তির পেছনে দাঁড়ান এবং হাত দিয়ে তাদের পেটের উপরিভাগে (নাভির ঠিক ওপরে) ধরুন।',
        '৩. এক হাত মুষ্টিবদ্ধ করে অন্য হাত দিয়ে চেপে ধরে ওপর ও ভেতরের দিকে দ্রুত হ্যাঁচকা টান দিন।',
        '৪. আটকে থাকা বস্তু বেরিয়ে না আসা পর্যন্ত পুনরাবৃত্তি করুন।',
      ],
      burnsTitle: 'আগুনে বা গরম পানিতে পুড়ে গেলে',
      burnsSteps: [
        '১. তাৎক্ষণিকভাবে পোড়া অংশে স্বাভাবিক তাপমাত্রার ঠাণ্ডা পানি অন্তত ১০-১৫ মিনিট ঢালুন।',
        '২. কখনো বরফ, টুথপেস্ট বা ডিম লাগাবেন না — এতে সংক্রমণ বাড়ে।',
        '৩. পরিষ্কার ও পাতলা ভেজা কাপড় দিয়ে আলতো করে ঢেকে রাখুন এবং চিকিৎসকের কাছে যান।',
      ],
      heatstrokeTitle: 'হিটস্ট্রোক ও অতিরিক্ত গরমে অচেতন হলে',
      heatstrokeSteps: [
        '১. রোগীকে দ্রুত ছায়াযুক্ত বা ঠাণ্ডা স্থানে নিয়ে যান।',
        '২. গায়ের অতিরিক্ত বা আঁটসাঁট কাপড় আলগা করে দিন।',
        '৩. ভেজা কাপড় দিয়ে শরীর মুছে দিন এবং ঘাড়, বগল ও কপালে ঠাণ্ডা পানির পট্টি দিন।',
        '৪. জ্ঞান থাকলে ধীরে ধীরে পানি বা স্যালাইন পান করান।',
      ],
      hotlinesTitle: 'বিশ্বের জরুরি ফোন নম্বরসমূহ',
      hotlinesDesc: 'প্রয়োজনে এক ক্লিকেই যোগাযোগ করুন:',
      customContact: 'ব্যক্তিগত জরুরি স্বজন নম্বর',
      callNow: 'কল করুন',
    },
    notes: {
      title: 'তাৎক্ষণিক নোট ও আজকের তালিকা',
      placeholder: 'বাজারের তালিকা, জরুরি মনে রাখার বিষয় বা কাজ লিখুন...',
      addNote: 'যোগ করুন',
      copyAll: 'সব কপি করুন',
      copied: 'কপি হয়েছে!',
      clearDone: 'সম্পন্নগুলো মুছুন',
      itemsCount: 'টি আইটেম',
    },
    islamic: {
      title: 'নূর — ইসলামিক জীবন ও শান্তি',
      subtitle: 'দৈনিক ৫ ওয়াক্ত নামাজ, ডিজিটাল তাসবীহ, কুরআন-হাদিস ও যাকাত',
      prayerTimes: 'আজকের ৫ ওয়াক্ত নামাজের সময়সূচি',
      nextPrayer: 'পরবর্তী ওয়াক্তের বাকি',
      fajr: 'ফজর (সেহরি শেষ)',
      sunrise: 'সূর্যোদয় (ইশরাক)',
      dhuhr: 'যোহর',
      asr: 'আসর',
      maghrib: 'মাগরিব (ইফতার)',
      isha: 'এশা',
      tasbeehTitle: 'ডিজিটাল তাসবীহ ও জিকির',
      tasbeehSubtitle: 'অ্যাকোস্টিক স্পর্শ ধ্বনি সহ নিয়মিত জিকির আদায় করুন',
      count: 'গণনা',
      target: 'লক্ষ্যমাত্রা',
      lap: 'চক্র (ল্যাপ)',
      tapToCount: 'জিকির করতে স্পর্শ করুন',
      reset: 'রিসেট',
      subhanallah: 'سُبْحَانَ اللَّهِ (সুবহানাল্লাহ — ৩৩ বার)',
      alhamdulillah: 'الْحَمْدُ لِلَّهِ (আলহামদুলিল্লাহ — ৩৩ বার)',
      allahuakbar: 'اللَّهُ أَكْبَرُ (আল্লাহু আকবার — ৩৪ বার)',
      astaghfirullah: 'أَسْتَغْفِرُ اللَّهَ (আস্তাগফিরুল্লাহ — ১০০ বার)',
      lailahaillallah: 'لَا إِلَهَ إِلَّا اللَّهُ (লা ইলাহা ইল্লাল্লাহ)',
      dailyAyahTitle: 'প্রতিদিনের কুরআনুল কারীম',
      dailyHadithTitle: 'আজকের সহিহ হাদিস',
      copyAyah: 'কপি করুন',
      qiblaTitle: 'পবিত্র কাবার কিবলা দিক',
      qiblaBearing: 'দিকনির্দেশক কোণ (ডিগ্রি)',
      zakatTitle: 'সহজ যাকাত ক্যালকুলেটর (২.৫%)',
      zakatSubtitle: 'স্বর্ণ, রৌপ্য, নগদ অর্থ ও ব্যবসায়িক পণ্যের সঠিক হিসাব',
      calculateZakat: 'যাকাত হিসাব করুন',
      zakatAmount: 'প্রদেয় যাকাতের পরিমাণ',
    },
    monetize: {
      title: 'প্লে স্টোর পাবলিশিং ও আর্নিং গাইড',
      subtitle: 'অ্যাপটি সবার কাছে পৌঁছান এবং সৎ উপায়ে ইনকাম করুন',
      playStoreTitle: 'গুগল প্লে স্টোর ও অ্যাপল অ্যাপ স্টোরে পাবলিশ',
      playStoreDesc: 'যেকোনো মোবাইল ডিভাইসে এটি সরাসরি সম্পূর্ণ অ্যাপ হিসেবে ইনস্টল করা যায়। এছাড়া প্লে স্টোরে সার্চে আনতে TWA (Trusted Web Activity) ফাইল তৈরি করে Google Play Console-এ জমা দিতে হবে।',
      installNow: 'মোবাইলে ইনস্টল করুন (PWA)',
      twaGuideTitle: 'প্লে স্টোরে এপিকে (APK / AAB) দেওয়ার ৩ ধাপ:',
      twaSteps: [
        '১. PWABuilder.com-এ গিয়ে এই অ্যাপের URL পেস্ট করুন এবং "Package for Android" চাপুন।',
        '২. এটি স্বয়ংক্রিয়ভাবে একটি স্বাক্ষরিত .aab (Android App Bundle) ফাইল তৈরি করে দেবে।',
        '৩. গুগল প্লে কনসোল (Google Play Console) অ্যাকাউন্টে .aab ফাইল আপলোড করে প্রকাশ করুন।',
      ],
      earningTitle: 'সফটওয়্যার থেকে আর্নিং ও ইনকাম করার উপায়',
      earningDesc: 'অ্যাপটি সবাই ফ্রিতে ব্যবহার করবে এবং আপনি ৩টি বৈধ উপায়ে আয় করতে পারবেন:',
      supportDevTitle: '১. হাদিয়া / ডোনেশন / সাপোর্ট ক্রিয়েটর',
      bKashNagad: 'বিকাশ / নগদ / রকেট নম্বর দিয়ে সরাসরি ব্যবহারকারীদের থেকে হাদিয়া গ্রহণ',
      paypalStripe: 'আন্তর্জাতিক ব্যবহারকারীদের জন্য PayPal, Stripe বা Buy Me a Coffee লিংক',
      admobTitle: '২. গুগল অ্যাডসেন্স ও অ্যাডমব বিজ্ঞাপন (AdMob Banner)',
      admobDesc: 'প্লে স্টোরে অ্যাপ ছাড়লে Google AdMob ব্যানার অ্যাড যুক্ত করে প্রতি ভিউ ও ক্লিকে ডলার আয় করা যায়।',
      proSupporterTitle: '৩. প্রো সাবস্ক্রিপশন / স্পন্সরশিপ',
      proSupporterDesc: 'বিশেষ সুবিধা বা পিডিএফ রুটিন ডাউনলোড বিক্রি করে প্রিমিয়াম আয়।',
      simulatedDonation: 'হাদিয়া / ডোনেশন অনুকরণ (টেস্ট)',
      thankYouDonation: 'জাযাকাল্লাহু খাইরান! আপনার সহায়তার জন্য ধন্যবাদ।',
    },
    common: {
      save: 'সংরক্ষণ',
      cancel: 'বাতিল',
      delete: 'মুছুন',
      edit: 'সম্পাদনা',
      close: 'বন্ধ করুন',
      reset: 'রিসেট',
      day: 'দিন',
      today: 'আজ',
      soundOn: 'শব্দ চালু',
      soundOff: 'শব্দ বন্ধ',
      language: 'ভাষা',
      direction: 'ltr',
    },
  },
  ar: {
    appName: 'حياة (Hayat)',
    tagline: 'الرفيق اليومي الشامل لكل إنسان',
    langName: 'العربية',
    tabs: {
      overview: 'نظرة اليوم',
      habits: 'العادات والروتين',
      hydration: 'شرب الماء',
      budget: 'الميزانية والمصاريف',
      peace: 'الهدوء والتنفس',
      worldRhythm: 'الشمس والوقت',
      tools: 'أدوات يومية',
      emergency: 'الإسعافات الأولية',
      islamic: 'النور (الصلاة والتسبيح)',
      monetize: 'متجر التطبيقات والأرباح',
    },
    greetings: {
      morning: 'صباح الخير',
      afternoon: 'طاب يومك',
      evening: 'مساء الخير',
      night: 'ليلة سعيدة',
    },
    dailyWisdom: [
      {
        quote: 'كل يوم جديد هو فرصة لبداية أجمل. العادات البسيطة تصنع الفوارق الكبيرة في حياتك.',
        author: 'حكمة عالمية',
      },
      {
        quote: 'الصبر والاستمرار هما جوهر كل إنجاز عظيم.',
        author: 'فلسفة الحياة',
      },
      {
        quote: 'اعتنِ بجسدك وروحك، فهما المكان الوحيد الذي ستعيش فيه دائماً.',
        author: 'حكمة الصحة',
      },
    ],
    habits: {
      title: 'العادات والروتين اليومي',
      subtitle: 'الاستمرارية في المهام البسيطة سر النجاح الحقيقي',
      addHabit: 'إضافة عادة جديدة',
      habitNamePlaceholder: 'مثال: المشي صباحاً، قراءة ١٥ دقيقة...',
      selectCategory: 'اختر القسم',
      categories: {
        all: 'الكل',
        morning: 'الصباح',
        health: 'الصحة',
        mind: 'الصفاء الذهني',
        evening: 'المساء',
      },
      streak: 'أيام متتالية',
      completed: 'مكتمل',
      pending: 'متبقي',
      delete: 'حذف',
      todayProgress: 'إنجاز اليوم',
      calendarView: 'التقويم الشهري',
      listView: 'قائمة الروتين اليومي',
      monthlyHistory: 'سجل الإنجاز والاستمرارية الشهري',
      allHabitsOverview: 'نظرة شاملة لجميع العادات',
      monthlyCompletionRate: 'معدل الإنجاز لهذا الشهر',
      bestStreak: 'أطول سلسلة استمرارية (الرقم القياسي)',
      completedDaysCount: 'إجمالي الأيام المنجزة',
      prevMonth: 'الشهر السابق',
      nextMonth: 'الشهر التالي',
      todayBtn: 'اليوم',
      selectHabitToView: 'تصفية العادة:',
      noHabitsOnDate: 'لم يتم تسجيل أي عادة في هذا التاريخ',
      detailsForDate: 'تفاصيل هذا اليوم',
      daysOfWeek: ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
      toggleCompletionOnDate: 'تبديل حالة الإنجاز لهذا اليوم',
      totalDoneInMonth: 'مرات الإنجاز هذا الشهر',
      weeklyChartTitle: 'مخطط إنجاز العادات (آخر ٧ أيام)',
      weeklyChartSubtitle: 'تتبع عدد العادات المكتملة في كل يوم من الأيام السبعة الماضية',
      habitsCompletedLabel: 'عادات منجزة',
      weeklyAvgLabel: 'المعدل اليومي',
      presetHabits: {
        water: 'شرب كوبين من الماء عند الاستيقاظ',
        stretch: 'تمارين إطالة خفيفة لمدة ١٥ دقيقة',
        walk: 'المشي نصف ساعة يومياً',
        reading: 'قراءة مفيدة لمدة ١٥ دقيقة',
        mindfulness: '١٠ دقائق هدوء وتأمل وصفاء ذهني',
        sleepOnTime: 'النوم قبل الساعة ١١ مساءً',
        familyCall: 'الاتصال بالعائلة والاطمئنان على الأحباء',
        screenBreak: 'أخذ استراحة من شاشات الأجهزة',
      },
    },
    hydration: {
      title: 'تتبع شرب الماء (الترطيب)',
      subtitle: 'حافظ على صحتك وحيويتك بالترطيب الكافي يومياً',
      dailyGoal: 'الهدف اليومي',
      consumed: 'الماء المستهلك',
      remaining: 'المتبقي لتحقيق الهدف',
      addCup: '+ ٢٥٠ مل (كوب)',
      addBottle: '+ ٥٠٠ مل (قارورة)',
      addCustom: 'إضافة كمية مخصصة',
      recentDrinks: 'سجل شرب الماء اليوم',
      goalReached: 'تهانينا! حققت هدفك اليومي من شرب الماء',
      reminderTip: 'نصيحة: اشرب الماء قبل الشعور بالعطش الشديد للحفاظ على طاقتك ونشاطك البدني والذهني.',
      resetToday: 'إعادة ضبط اليوم',
    },
    budget: {
      title: 'المصاريف والميزانية اليومية',
      subtitle: 'تحكم في مصاريفك وراقب إنفاقك اليومي بذكاء',
      dailyLimit: 'الحد اليومي المتاح',
      todaySpent: 'إجمالي ما أُنفق اليوم',
      remaining: 'المتبقي من الميزانية',
      addExpense: 'تسجيل مصروف',
      amount: 'المبلغ',
      itemTitle: 'الوصف (مثال: بقالة، غداء، مواصلات)',
      category: 'الفئة',
      categories: {
        food: 'طعام ومطاعم',
        groceries: 'بقالة ومشتريات',
        transport: 'مواصلات وبنزين',
        bills: 'فواتير واشتراكات',
        health: 'أدوية وصحة',
        other: 'أخرى',
      },
      recentExpenses: 'سجل مصاريف اليوم',
      noExpenses: 'لم تسجل أي مصاريف حتى الآن اليوم.',
      setLimit: 'تحديد حد الميزانية اليومية',
      currency: 'العملة',
    },
    peace: {
      title: 'الصفاء والتنفس والراحة',
      subtitle: 'تخلص من التوتر وضغوط اليوم واستعد سكينتك',
      breathingTitle: 'تمرين التنفس المهدئ',
      breathingDesc: 'تقنية التنفس المربع (٤-٤-٤-٤) لإعادة توازن الجهاز العصبي وخفض التوتر فورياً',
      startBreathing: 'بدء تمرين التنفس',
      stopBreathing: 'إيقاف التمرين',
      inhale: 'شهيق ببطء وعمق...',
      hold: 'احبس النفس بلطف...',
      exhale: 'زفير بهدوء وتفريغ...',
      relax: 'استرخِ واستمتع بالسكينة...',
      boxTechnique: 'تنفس المربع (٤ ثوانٍ)',
      calmTechnique: 'تنفس الهدوء (٤-٧-٨)',
      moodTitle: 'كيف هو مزاجك اليوم؟',
      moodPrompt: 'سجل شعورك الحالي:',
      moods: {
        great: 'ممتاز',
        good: 'جيد جداً',
        neutral: 'عادي',
        tired: 'مرهق',
        stressed: 'متوتر',
      },
      gratitudePrompt: 'ما الشيء الذي تشعر بالامتنان لأجله اليوم؟',
      gratitudePlaceholder: 'شيء جميل أو نعمة أسعدتك اليوم...',
      saveGratitude: 'حفظ الامتنان',
      savedGratitude: 'خواطر الامتنان لليوم',
      sleepCalcTitle: 'حاسبة دورات النوم الصحية',
      sleepCalcDesc: 'تستغرق دورة النوم الكاملة ٩٠ دقيقة. اعرف الوقت الأمثل للنوم لتستيقظ بكامل طاقتك.',
      wakeUpTime: 'متى تريد الاستيقاظ؟',
      calculateSleepTimes: 'أوقات النوم المقترحة',
      recommendedBedtimes: 'أفضل أوقات للنوم للاستيقاظ بنشاط:',
    },
    worldRhythm: {
      title: 'إيقاع الشمس والتوقيت العالمي',
      subtitle: 'مواقيت نور النهار والتواصل مع الأحباء حول العالم',
      sunCycleTitle: 'دورة الشمس والنهار اليوم',
      dawn: 'الفجر',
      sunrise: 'الشروق',
      solarNoon: 'الظهيرة',
      goldenHour: 'الساعة الذهبية (العصر)',
      sunset: 'الغروب',
      dusk: 'الشفق المسائي',
      worldClocksTitle: 'ساعات العالم ومواقيت الأهل والأصدقاء',
      worldClocksSubtitle: 'توقيت مكة والرياض، القاهرة، دبي، لندن ونيويورك',
      addCity: 'إضافة مدينة',
      dhaka: 'دكا (بنغلاديش)',
      riyadh: 'الرياض (المملكة العربية السعودية)',
      newYork: 'نيويورك (الولايات المتحدة)',
      london: 'لندن (بريطانيا)',
      dubai: 'دبي (الإمارات)',
      cairo: 'القاهرة (مصر)',
      tokyo: 'طوكيو (اليابان)',
      familyClockNote: 'تحقق من التوقيت المحلي لدى الأقارب والأصدقاء المغتربين قبل الاتصال بهم.',
    },
    tools: {
      title: 'محولات وحاسبات الجيب الضرورية',
      subtitle: 'أدوات يومية سريعة للمطبخ، التسوق، وتحويل الوحدات',
      unitConverter: 'محول الوحدات القياسية',
      kitchenConverter: 'دليل مقادير المطبخ',
      tipSplit: 'تقسيم الحساب والمصاريف',
      from: 'من',
      to: 'إلى',
      value: 'القيمة',
      result: 'النتيجة',
      kitchenItems: {
        cupToMl: '١ كوب = ٢٤٠ مل',
        tbspToMl: '١ ملعقة طعام = ١٥ مل',
        tspToMl: '١ ملعقة شاي = ٥ مل',
        kgToPound: '١ كيلوغرام = ٢.٢٠ رطل',
        celToFah: 'تحويل مئوي إلى فهرنهايت',
        kmToMile: '١ كم = ٠.٦٢ ميل',
      },
      billSplitter: {
        billAmount: 'إجمالي الفاتورة',
        tipPercent: 'نسبة الخدمة أو الإكرامية (%)',
        numberOfPeople: 'عدد الأشخاص المشاركين',
        perPerson: 'المبلغ لكل شخص',
        totalWithTip: 'الإجمالي النهائي',
      },
    },
    emergency: {
      title: 'دليل الإسعافات الأولية السريعة',
      subtitle: 'إرشادات عاجلة ومنقذة للحياة عند وقوع الطوارئ',
      disclaimer: 'تنبيه: هذا دليل إرشادي أولي. في الحالات الحرجة اتصل فوراً برقم الطوارئ المعتمد.',
      cprTitle: 'الإنعاش القلبي الرئوي (CPR) في حالات فقدان الوعي والتنفس',
      cprSteps: [
        '١. تأكد من استجابة الشخص بهز الكتف برفق والمناداة عليه بصوت واضح.',
        '٢. اتصل برقم الطوارئ فوراً أو اطلب من شخص مجاور الاتصال.',
        '٣. ضع يديك فوق بعضهما في منتصف الصدر واضغط بقوة وسرعة بمعدل ١٠٠-١٢٠ ضغطة بالدقيقة.',
        '٤. استمر بالضغط حتى وصول الإسعاف أو عودة التنفس الطبيعي للشخص.',
      ],
      chokingTitle: 'الغصة وانسداد مجرى التنفس (مناورة هيمليك)',
      chokingSteps: [
        '١. شجع الشخص على السعال بقوة. إذا عجز عن التنفس أو الكلام:',
        '٢. قف خلف المصاب ولف ذراعيك حول خصره فوق السرة مباشرة.',
        '٣. اقبض إحدى يديك وضعها بين السرة والقفص الصدري، وأمسكها باليد الأخرى.',
        '٤. اضغط بقوة وسرعة إلى الداخل والأعلى عدة مرات حتى يخرج الجسم العالق.',
      ],
      burnsTitle: 'إسعاف الحروق الناتجة عن النار أو السوائل الساخنة',
      burnsSteps: [
        '١. صب ماءً جارياً عادياً (غير مثلج) على منطقة الحرق لمدة ١٠ إلى ١٥ دقيقة.',
        '٢. تجنب وضع الثلج أو معجون الأسنان أو الزيوت لأنها تضاعف الضرر والالتهاب.',
        '٣. غطِّ الحرق بضمادة نظيفة ومعقمة دون إحكام التثبيت وتوجه لأقرب مركز صحي.',
      ],
      heatstrokeTitle: 'ضربات الشمس والإجهاد الحراري الشديد',
      heatstrokeSteps: [
        '١. انقل المصاب فوراً إلى مكان بارد أو مظلل وذو تهوية جيدة.',
        '٢. قم بتخفيف الملابس الضيقة ورش جسمه بالماء المعتدل مع التهوية.',
        '٣. ضع كمادات باردة على الرقبة وتحت الإبطين وأعلى الفخذين.',
        '٤. إذا كان المصاب واعياً، قدم له ماءً للشرب ببطء وتدرج.',
      ],
      hotlinesTitle: 'أرقام الطوارئ المباشرة',
      hotlinesDesc: 'اتصال سريع وفوري بجهات الإسعاف والنجدة:',
      customContact: 'رقم شخصي للطوارئ (الأقارب)',
      callNow: 'اتصال فوري',
    },
    notes: {
      title: 'الملاحظات السريعة وقوائم اليوم',
      placeholder: 'سجل مشتريات البقالة، مهام سريعة، أو أشياء مهمة...',
      addNote: 'إضافة',
      copyAll: 'نسخ الكل',
      copied: 'تم النسخ!',
      clearDone: 'حذف المكتمل',
      itemsCount: 'عنصر',
    },
    islamic: {
      title: 'النور — الحياة الإسلامية والسكينة',
      subtitle: 'مواقيت الصلوات الخمس، السبحة الإلكترونية، آيات وأحاديث، وحساب الزكاة',
      prayerTimes: 'مواقيت الصلاة لليوم',
      nextPrayer: 'الوقت المتبقي للصلاة القادمة',
      fajr: 'الفجر (نهاية السحور)',
      sunrise: 'الشروق',
      dhuhr: 'الظهر',
      asr: 'العصر',
      maghrib: 'المغرب (الإفطار)',
      isha: 'العشاء',
      tasbeehTitle: 'السبحة الإلكترونية والأذكار',
      tasbeehSubtitle: 'تسبيح وذكر الله مع صوت نقي وتعداد الدورات',
      count: 'العدد',
      target: 'الهدف',
      lap: 'الدورة',
      tapToCount: 'المس للشروع في الذكر',
      reset: 'إعادة ضبط',
      subhanallah: 'سُبْحَانَ اللَّهِ (٣٣ مرة)',
      alhamdulillah: 'الْحَمْدُ لِلَّهِ (٣٣ مرة)',
      allahuakbar: 'اللَّهُ أَكْبَرُ (٣٤ مرة)',
      astaghfirullah: 'أَسْتَغْفِرُ اللَّهَ (١٠٠ مرة)',
      lailahaillallah: 'لَا إِلَهَ إِلَّا اللَّهُ',
      dailyAyahTitle: 'آية اليوم من القرآن الكريم',
      dailyHadithTitle: 'حديث نبوي شريف',
      copyAyah: 'نسخ',
      qiblaTitle: 'اتجاه القبلة المشرفة',
      qiblaBearing: 'زاوية الاتجاه بالدرجات',
      zakatTitle: 'حاسبة الزكاة الشرعية (٢.٥٪)',
      zakatSubtitle: 'حساب زكاة الذهب والفضة والسيولة النقدية وعروض التجارة',
      calculateZakat: 'احتساب الزكاة',
      zakatAmount: 'مقدار الزكاة الواجبة',
    },
    monetize: {
      title: 'نشر التطبيق على المتاجر وطرق الأرباح',
      subtitle: 'كيفية نشر التطبيق على Google Play وطرق الكسب الحلال',
      playStoreTitle: 'النشر على متجر Google Play و App Store',
      playStoreDesc: 'يمكن تثبيت التطبيق فوراً على هواتف أندرويد وآيفون كـ PWA. ولنشره رسمياً في متجر جوجل بلاي يتم تحويله إلى حزمة .aab عبر TWA ورفعه على Google Play Console.',
      installNow: 'تثبيت على الهاتف (PWA)',
      twaGuideTitle: 'خطوات استخراج ملف التطبيق لمتجر بلاي:',
      twaSteps: [
        '١. الدخول إلى موقع PWABuilder.com ووضع رابط هذا التطبيق.',
        '٢. النقر على "Package for Android" لتحميل حزمة .aab الجاهزة والموقعة.',
        '٣. رفع الحزمة على حسابك في Google Play Console ليكون متاحاً للبحث والتحميل.',
      ],
      earningTitle: 'طرق تحقيق الدخل والأرباح من التطبيق',
      earningDesc: 'التطبيق مجاني للجميع، وتستطيع تحقيق دخل مستمر عبر ۳ طرق موثوقة:',
      supportDevTitle: '١. دعم المطور والتبرعات والهدية',
      bKashNagad: 'حسابات الدفع المحلية (bKash/Nagad أو التحويل البنكي المباشر)',
      paypalStripe: 'روابط الدفع العالمية (PayPal / Stripe / Buy Me a Coffee)',
      admobTitle: '٢. إعلانات جوجل أدسنس وأدموب (Google AdMob)',
      admobDesc: 'عند نشر التطبيق على متجر بلاي يتم تفعيل إعلانات البانر لكسب أرباح من المشاهدات والنقرات.',
      proSupporterTitle: '٣. باقة الداعم المميز (Pro Supporter)',
      proSupporterDesc: 'تصدير تقارير الإنجاز والروتين اليومي بصيغة PDF ومميزات حصرية للمشتركين.',
      simulatedDonation: 'تجربة إرسال الدعم (محاكاة)',
      thankYouDonation: 'جزاكم الله خيراً وتقبل منكم دعمكم الطيب!',
    },
    common: {
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      edit: 'تعديل',
      close: 'إغلاق',
      reset: 'إعادة ضبط',
      day: 'يوم',
      today: 'اليوم',
      soundOn: 'الصوت مفعّل',
      soundOff: 'الصوت صامت',
      language: 'اللغة',
      direction: 'rtl',
    },
  },
  en: {
    appName: 'Hayat (Everyday)',
    tagline: 'The universal daily life companion for every human',
    langName: 'English',
    tabs: {
      overview: 'Daily Pulse',
      habits: 'Habits & Routine',
      hydration: 'Hydration',
      budget: 'Daily Pocket',
      peace: 'Breath & Calm',
      worldRhythm: 'Sun & Clocks',
      tools: 'Handy Tools',
      emergency: 'First Aid',
      islamic: 'Noor (Prayer & Tasbeeh)',
      monetize: 'Play Store & Earn',
    },
    greetings: {
      morning: 'Good Morning',
      afternoon: 'Good Afternoon',
      evening: 'Good Evening',
      night: 'Good Night',
    },
    dailyWisdom: [
      {
        quote: 'Every sunrise brings a new opportunity to restart. Small positive habits create profound life changes.',
        author: 'Universal Wisdom',
      },
      {
        quote: 'Patience and consistency are the quiet architects of lasting achievement.',
        author: 'Life Philosophy',
      },
      {
        quote: 'Care for your mind and body — they are the only true home you inhabit for life.',
        author: 'Health Proverb',
      },
    ],
    habits: {
      title: 'Daily Routine & Habits',
      subtitle: 'Build lasting consistency with simple daily practices',
      addHabit: 'Add New Habit',
      habitNamePlaceholder: 'e.g., Morning 20m walk, read 15 pages...',
      selectCategory: 'Select Category',
      categories: {
        all: 'All',
        morning: 'Morning',
        health: 'Health',
        mind: 'Mindfulness',
        evening: 'Evening',
      },
      streak: 'day streak',
      completed: 'Completed',
      pending: 'Remaining',
      delete: 'Delete',
      todayProgress: "Today's Progress",
      calendarView: 'Monthly Calendar',
      listView: 'Routine Checklist',
      monthlyHistory: 'Monthly Streaks & History',
      allHabitsOverview: 'All Habits Consistency',
      monthlyCompletionRate: 'Month Completion Rate',
      bestStreak: 'Best Streak (Record)',
      completedDaysCount: 'Total Days Completed',
      prevMonth: 'Previous Month',
      nextMonth: 'Next Month',
      todayBtn: 'Today',
      selectHabitToView: 'Filter by Habit:',
      noHabitsOnDate: 'No habits completed on this date',
      detailsForDate: 'Day Details & History',
      daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      toggleCompletionOnDate: 'Toggle status for this day',
      totalDoneInMonth: 'Total Check-ins this month',
      weeklyChartTitle: 'Past 7 Days Habit Completion',
      weeklyChartSubtitle: 'Visual breakdown of habits completed each day over the past week',
      habitsCompletedLabel: 'Habits Completed',
      weeklyAvgLabel: 'Daily Average',
      presetHabits: {
        water: 'Drink 2 glasses of pure water upon waking',
        stretch: '15-minute gentle stretch or mobility workout',
        walk: '30-minute refreshing walk outdoors',
        reading: '15 minutes of nourishing reading or learning',
        mindfulness: '10 minutes of quiet breathing & reflection',
        sleepOnTime: 'Wind down and sleep before 11:00 PM',
        familyCall: 'Check in on a family member or dear friend',
        screenBreak: 'Take regular screen breaks during work',
      },
    },
    hydration: {
      title: 'Water Intake & Hydration',
      subtitle: 'Stay energized, healthy, and alert with optimal daily water',
      dailyGoal: 'Daily Target',
      consumed: 'Consumed Today',
      remaining: 'Remaining',
      addCup: '+ 250 ml (1 Glass)',
      addBottle: '+ 500 ml (1 Bottle)',
      addCustom: 'Add Custom Amount',
      recentDrinks: "Today's Water Log",
      goalReached: 'Congratulations! You reached your daily hydration goal',
      reminderTip: 'Tip: Drink a glass every 1-2 hours. Do not wait until severe thirst to hydrate.',
      resetToday: "Reset Today's Log",
    },
    budget: {
      title: 'Daily Pocket & Budget',
      subtitle: 'Keep track of everyday expenses and curb unintentional spending',
      dailyLimit: 'Daily Spending Limit',
      todaySpent: 'Spent Today',
      remaining: 'Remaining Pocket',
      addExpense: 'Log Expense',
      amount: 'Amount',
      itemTitle: 'Description (e.g. Groceries, Lunch, Commute)',
      category: 'Category',
      categories: {
        food: 'Food & Dining',
        groceries: 'Groceries',
        transport: 'Commute / Fuel',
        bills: 'Bills & Utilities',
        health: 'Health & Pharmacy',
        other: 'Other Essentials',
      },
      recentExpenses: "Today's Expense Log",
      noExpenses: 'No expenses logged yet today.',
      setLimit: 'Set Daily Budget Limit',
      currency: 'Currency',
    },
    peace: {
      title: 'Breath, Calm & Renewal',
      subtitle: 'Reset your nervous system and release daily stress',
      breathingTitle: 'Guided Breathing Exercise',
      breathingDesc: 'Box Breathing (4-4-4-4) lowers heart rate and restores mental clarity within minutes.',
      startBreathing: 'Start Breath Guide',
      stopBreathing: 'Stop Exercise',
      inhale: 'Breathe in slowly and deeply...',
      hold: 'Gently hold your breath...',
      exhale: 'Slowly breathe out and release...',
      relax: 'Rest in quiet stillness...',
      boxTechnique: 'Box Breathing (4s - 4s - 4s - 4s)',
      calmTechnique: '4-7-8 Relaxing Breath',
      moodTitle: 'How is your mood today?',
      moodPrompt: 'Rate your emotional state right now:',
      moods: {
        great: 'Great',
        good: 'Good',
        neutral: 'Neutral',
        tired: 'Tired',
        stressed: 'Stressed',
      },
      gratitudePrompt: 'What is one thing you are grateful for today?',
      gratitudePlaceholder: 'A kind word, good health, a warm meal...',
      saveGratitude: 'Save Gratitude',
      savedGratitude: "Today's Gratitude Note",
      sleepCalcTitle: 'Healthy Sleep Cycles Calculator',
      sleepCalcDesc: 'Human sleep runs in natural 90-minute ultradian cycles. Calculate optimal bedtimes to wake up feeling restored.',
      wakeUpTime: 'Target Wake-Up Time:',
      calculateSleepTimes: 'Show Recommended Bedtimes',
      recommendedBedtimes: 'Suggested Bedtimes (to wake at end of cycle):',
    },
    worldRhythm: {
      title: 'Solar Rhythm & World Clocks',
      subtitle: 'Natural daylight rhythm and timezone sync for loved ones abroad',
      sunCycleTitle: "Today's Natural Daylight Arc",
      dawn: 'Dawn',
      sunrise: 'Sunrise',
      solarNoon: 'Solar Noon',
      goldenHour: 'Golden Hour',
      sunset: 'Sunset',
      dusk: 'Dusk',
      worldClocksTitle: 'Global Family & World Clocks',
      worldClocksSubtitle: 'Check local times for Bangladesh, Middle East, USA & Europe',
      addCity: 'Add World City',
      dhaka: 'Dhaka (Bangladesh)',
      riyadh: 'Riyadh (Saudi Arabia)',
      newYork: 'New York (USA)',
      london: 'London (UK)',
      dubai: 'Dubai (UAE)',
      cairo: 'Cairo (Egypt)',
      tokyo: 'Tokyo (Japan)',
      familyClockNote: 'Check the local time before calling relatives and loved ones abroad.',
    },
    tools: {
      title: 'Handy Converters & Pocket Tools',
      subtitle: 'Quick calculations for cooking, measurements, and everyday bills',
      unitConverter: 'Everyday Metric & Imperial Converter',
      kitchenConverter: 'Kitchen Measurement Guide',
      tipSplit: 'Bill Split & Tip Calculator',
      from: 'From',
      to: 'To',
      value: 'Enter Value',
      result: 'Calculated Result',
      kitchenItems: {
        cupToMl: '1 Metric Cup = 240 ml',
        tbspToMl: '1 Tablespoon = 15 ml',
        tspToMl: '1 Teaspoon = 5 ml',
        kgToPound: '1 Kilogram = 2.205 lbs',
        celToFah: 'Celsius to Fahrenheit',
        kmToMile: '1 Kilometer = 0.621 miles',
      },
      billSplitter: {
        billAmount: 'Total Bill Amount',
        tipPercent: 'Tip / Service Charge (%)',
        numberOfPeople: 'Number of People Sharing',
        perPerson: 'Amount Per Person',
        totalWithTip: 'Total with Tip',
      },
    },
    emergency: {
      title: 'First Aid & Emergency Quick Guide',
      subtitle: 'Clear, life-saving steps for sudden home or street emergencies',
      disclaimer: 'Notice: This is a fast first-response guide. In serious emergencies, immediately dial professional emergency services.',
      cprTitle: 'Hands-Only CPR (Unconscious & Not Breathing)',
      cprSteps: [
        '1. Shake shoulder gently and speak loudly to check responsiveness.',
        '2. Call local emergency dispatch (911 / 999 / 997) or point to someone to call immediately.',
        '3. Place interlocking hands in center of chest. Push hard and fast (100-120 beats per minute, 5 cm deep).',
        '4. Continue without stopping until paramedics arrive or victim recovers breathing.',
      ],
      chokingTitle: 'Choking Response (Heimlich Maneuver)',
      chokingSteps: [
        '1. Encourage victim to cough forcefully. If they cannot speak or cough:',
        '2. Stand behind them and wrap both arms around their waist just above navel.',
        '3. Make a fist with one hand, grasp it with other hand, and give quick upward & inward thrusts.',
        '4. Repeat thrusts until blocked airway object is dislodged.',
      ],
      burnsTitle: 'Thermal Burns & Scalds',
      burnsSteps: [
        '1. Immediately cool the burn under gentle cool running tap water for 10-15 minutes.',
        '2. Never apply ice, butter, or toothpaste — these trap heat and cause tissue damage.',
        '3. Cover loosely with sterile clean dressing or cling film and seek medical attention.',
      ],
      heatstrokeTitle: 'Heat Stroke & Severe Heat Exhaustion',
      heatstrokeSteps: [
        '1. Move person immediately into cool shade or air-conditioned room.',
        '2. Loosen tight clothing and mist skin with cool water while fanning.',
        '3. Apply cold wet towels or ice packs to neck, armpits, and groin.',
        '4. Give sips of cool water only if fully conscious and responsive.',
      ],
      hotlinesTitle: 'Universal Emergency Numbers',
      hotlinesDesc: 'Instant 1-tap call to emergency emergency services:',
      customContact: 'Personal ICE Contact (Family)',
      callNow: 'Call Now',
    },
    notes: {
      title: 'Quick Scratchpad & Grocery List',
      placeholder: 'Write grocery items, errands, or quick reminders...',
      addNote: 'Add Item',
      copyAll: 'Copy All',
      copied: 'Copied!',
      clearDone: 'Clear Completed',
      itemsCount: 'items',
    },
    islamic: {
      title: 'Noor — Islamic Rhythm & Serenity',
      subtitle: 'Daily 5 prayer times, digital tasbeeh counter, Quran & Hadith, and Zakat',
      prayerTimes: "Today's 5 Daily Prayer Times",
      nextPrayer: 'Remaining until next prayer',
      fajr: 'Fajr (Dawn)',
      sunrise: 'Sunrise (Ishraq)',
      dhuhr: 'Dhuhr (Noon)',
      asr: 'Asr (Afternoon)',
      maghrib: 'Maghrib (Sunset)',
      isha: 'Isha (Night)',
      tasbeehTitle: 'Digital Tasbeeh & Dhikr Counter',
      tasbeehSubtitle: 'Pristine acoustic click feedback with lap cycle counter',
      count: 'Count',
      target: 'Target',
      lap: 'Lap',
      tapToCount: 'Tap to Count Dhikr',
      reset: 'Reset',
      subhanallah: 'SubhanAllah (33x)',
      alhamdulillah: 'Alhamdulillah (33x)',
      allahuakbar: 'Allahu Akbar (34x)',
      astaghfirullah: 'Astaghfirullah (100x)',
      lailahaillallah: 'La ilaha illallah',
      dailyAyahTitle: 'Daily Holy Quran Verse',
      dailyHadithTitle: 'Daily Sahih Hadith',
      copyAyah: 'Copy',
      qiblaTitle: 'Holy Kaaba Qibla Bearing',
      qiblaBearing: 'Direction Angle (Degrees)',
      zakatTitle: 'Accurate Zakat Calculator (2.5%)',
      zakatSubtitle: 'Obligatory calculation for gold, silver, cash and business wealth',
      calculateZakat: 'Calculate Zakat',
      zakatAmount: 'Payable Zakat Amount',
    },
    monetize: {
      title: 'Google Play Store Publishing & Monetization Hub',
      subtitle: 'How to distribute to mobile app stores and earn sustainably',
      playStoreTitle: 'Publishing to Google Play Store & Apple App Store',
      playStoreDesc: 'This app is 100% installable right now on any phone as a PWA. To make it searchable on the Google Play Store, package the web URL into an Android .aab bundle using PWABuilder (TWA) and upload to Google Play Console.',
      installNow: 'Install on Phone (PWA)',
      twaGuideTitle: '3 Simple Steps to Publish on Google Play:',
      twaSteps: [
        '1. Go to PWABuilder.com and paste this application URL.',
        '2. Click "Package for Android" to generate a ready-to-upload signed .aab bundle.',
        '3. Upload the .aab to your Google Play Console account ($25 one-time fee) to publish publicly.',
      ],
      earningTitle: 'How You Can Earn Income from this Software',
      earningDesc: 'Keep the app 100% free for everyday users while earning through 3 legitimate avenues:',
      supportDevTitle: '1. Creator Donations & Support (Hadiah)',
      bKashNagad: 'Receive local payments via bKash / Nagad / Direct Bank',
      paypalStripe: 'International support via PayPal, Stripe, or Buy Me a Coffee',
      admobTitle: '2. Google AdSense & AdMob In-App Banners',
      admobDesc: 'Integrate AdMob banner units inside the Play Store APK to earn revenue on daily impressions.',
      proSupporterTitle: '3. Pro Patron Membership & Exports',
      proSupporterDesc: 'Offer paid PDF routine summaries and exclusive supporter perks.',
      simulatedDonation: 'Test / Simulate Support Donation',
      thankYouDonation: 'Thank you deeply for your kind support and encouragement!',
    },
    common: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
      reset: 'Reset',
      day: 'day',
      today: 'Today',
      soundOn: 'Sound On',
      soundOff: 'Muted',
      language: 'Language',
      direction: 'ltr',
    },
  },
  es: {
    appName: 'Hayat (Vida Diaria)',
    tagline: 'El compañero universal de la vida cotidiana',
    langName: 'Español',
    tabs: {
      overview: 'Pulso Diario',
      habits: 'Hábitos y Rutina',
      hydration: 'Hidratación',
      budget: 'Presupuesto Diario',
      peace: 'Calma y Respiración',
      worldRhythm: 'Sol y Horarios',
      tools: 'Herramientas',
      emergency: 'Primeros Auxilios',
      islamic: 'Noor (Oración y Tasbih)',
      monetize: 'Play Store y Monetización',
    },
    greetings: {
      morning: 'Buenos días',
      afternoon: 'Buenas tardes',
      evening: 'Buenas noches',
      night: 'Feliz noche',
    },
    dailyWisdom: [
      {
        quote: 'Cada nuevo amanecer es una oportunidad para empezar de nuevo. Los pequeños hábitos diarios crean grandes transformaciones.',
        author: 'Sabiduría Universal',
      },
      {
        quote: 'La paciencia y la constancia son las claves silenciosas del éxito duradero.',
        author: 'Filosofía de Vida',
      },
      {
        quote: 'Cuida tu mente y tu cuerpo, son el único hogar donde vivirás toda tu vida.',
        author: 'Proverbio de Salud',
      },
    ],
    habits: {
      title: 'Rutina Diaria y Hábitos',
      subtitle: 'Construye constancia con hábitos sencillos todos los días',
      addHabit: 'Añadir Hábito',
      habitNamePlaceholder: 'Ej: Caminar 20 min, leer 15 páginas...',
      selectCategory: 'Categoría',
      categories: {
        all: 'Todos',
        morning: 'Mañana',
        health: 'Salud',
        mind: 'Mente',
        evening: 'Noche',
      },
      streak: 'días de racha',
      completed: 'Completado',
      pending: 'Pendiente',
      delete: 'Eliminar',
      todayProgress: 'Progreso de Hoy',
      calendarView: 'Calendario Mensual',
      listView: 'Lista de Rutinas',
      monthlyHistory: 'Rachas e Historial Mensual',
      allHabitsOverview: 'Constancia General de Hábitos',
      monthlyCompletionRate: 'Tasa de Cumplimiento del Mes',
      bestStreak: 'Mejor Racha (Récord)',
      completedDaysCount: 'Días Completados',
      prevMonth: 'Mes Anterior',
      nextMonth: 'Mes Siguiente',
      todayBtn: 'Hoy',
      selectHabitToView: 'Filtrar por Hábito:',
      noHabitsOnDate: 'Ningún hábito completado en esta fecha',
      detailsForDate: 'Detalles del Día',
      daysOfWeek: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
      toggleCompletionOnDate: 'Cambiar estado para este día',
      totalDoneInMonth: 'Total de veces completado este mes',
      weeklyChartTitle: 'Gráfico Semanal de Hábitos (Últimos 7 Días)',
      weeklyChartSubtitle: 'Cantidad de hábitos completados cada día durante la última semana',
      habitsCompletedLabel: 'Hábitos Completados',
      weeklyAvgLabel: 'Promedio Diario',
      presetHabits: {
        water: 'Tomar 2 vasos de agua al despertar',
        stretch: '15 minutos de estiramiento suave',
        walk: 'Caminata relajante de 30 minutos',
        reading: '15 minutos de lectura enriquecedora',
        mindfulness: '10 minutos de respiración y calma',
        sleepOnTime: 'Dormir antes de las 11:00 PM',
        familyCall: 'Llamar a un ser querido o familiar',
        screenBreak: 'Pausa activa lejos de pantallas',
      },
    },
    hydration: {
      title: 'Registro de Hidratación',
      subtitle: 'Mantén tu energía y salud con agua suficiente cada día',
      dailyGoal: 'Meta Diaria',
      consumed: 'Consumido Hoy',
      remaining: 'Restante',
      addCup: '+ 250 ml (1 Vaso)',
      addBottle: '+ 500 ml (1 Botella)',
      addCustom: 'Cantidad Personalizada',
      recentDrinks: 'Registro de Hoy',
      goalReached: '¡Felicidades! Alcanzaste tu meta diaria',
      reminderTip: 'Consejo: Toma un vaso cada 1-2 horas. No esperes a tener sed intensa.',
      resetToday: 'Reiniciar Hoy',
    },
    budget: {
      title: 'Presupuesto y Gastos Diarios',
      subtitle: 'Controla tus gastos diarios y ahorra sin esfuerzo',
      dailyLimit: 'Límite de Gasto Diario',
      todaySpent: 'Gastado Hoy',
      remaining: 'Dinero Restante',
      addExpense: 'Registrar Gasto',
      amount: 'Monto',
      itemTitle: 'Descripción (ej: Comida, Transporte, Mercado)',
      category: 'Categoría',
      categories: {
        food: 'Comida',
        groceries: 'Mercado',
        transport: 'Transporte',
        bills: 'Facturas',
        health: 'Salud y Farmacia',
        other: 'Otros',
      },
      recentExpenses: 'Gastos de Hoy',
      noExpenses: 'Aún no hay gastos registrados hoy.',
      setLimit: 'Establecer Límite Diario',
      currency: 'Moneda',
    },
    peace: {
      title: 'Calma, Respiración y Serenidad',
      subtitle: 'Reduce el estrés y recupera el equilibrio interior',
      breathingTitle: 'Ejercicio de Respiración Guiada',
      breathingDesc: 'Respiración Cuadrada (4-4-4-4) para calmar el ritmo cardíaco y enfocar la mente.',
      startBreathing: 'Iniciar Respiración',
      stopBreathing: 'Detener',
      inhale: 'Inhala suave y profundamente...',
      hold: 'Mantén el aire suavemente...',
      exhale: 'Exhala despacio y libera tensión...',
      relax: 'Descansa en serenidad...',
      boxTechnique: 'Respiración Cuadrada (4s)',
      calmTechnique: 'Respiración Relajante 4-7-8',
      moodTitle: '¿Cómo te sientes hoy?',
      moodPrompt: 'Registra tu estado de ánimo:',
      moods: {
        great: 'Excelente',
        good: 'Bien',
        neutral: 'Normal',
        tired: 'Cansado',
        stressed: 'Estresado',
      },
      gratitudePrompt: '¿De qué estás agradecido hoy?',
      gratitudePlaceholder: 'Un momento agradable, salud, un gesto amable...',
      saveGratitude: 'Guardar Agradecimiento',
      savedGratitude: 'Nota de Gratitud de Hoy',
      sleepCalcTitle: 'Calculadora de Ciclos de Sueño',
      sleepCalcDesc: 'El sueño funciona en ciclos de 90 minutos. Calcula cuándo dormir para despertar descansado.',
      wakeUpTime: 'Hora deseada para despertar:',
      calculateSleepTimes: 'Ver Horas de Dormir',
      recommendedBedtimes: 'Horas recomendadas para acostarse:',
    },
    worldRhythm: {
      title: 'Ritmo Solar y Horarios Mundiales',
      subtitle: 'La luz natural del día y conexión con seres queridos en el mundo',
      sunCycleTitle: 'Ciclo Solar de Hoy',
      dawn: 'Amanecer',
      sunrise: 'Salida del Sol',
      solarNoon: 'Mediodía Solar',
      goldenHour: 'Hora Dorada',
      sunset: 'Puesta del Sol',
      dusk: 'Atardecer',
      worldClocksTitle: 'Relojes Familiares del Mundo',
      worldClocksSubtitle: 'Horas en Bangladesh, Oriente Medio, EE.UU. y Europa',
      addCity: 'Añadir Ciudad',
      dhaka: 'Daca (Bangladesh)',
      riyadh: 'Riad (Arabia Saudita)',
      newYork: 'Nueva York (EE.UU.)',
      london: 'Londres (Reino Unido)',
      dubai: 'Dubái (Emiratos)',
      cairo: 'El Cairo (Egipto)',
      tokyo: 'Tokio (Japón)',
      familyClockNote: 'Revisa la hora local antes de llamar a familiares en el extranjero.',
    },
    tools: {
      title: 'Herramientas y Conversores',
      subtitle: 'Conversión rápida para cocina, medidas y división de cuentas',
      unitConverter: 'Conversor Métrico e Imperial',
      kitchenConverter: 'Guía de Medidas de Cocina',
      tipSplit: 'Calculadora de Propina y Cuenta',
      from: 'De',
      to: 'A',
      value: 'Valor',
      result: 'Resultado',
      kitchenItems: {
        cupToMl: '1 Taza = 240 ml',
        tbspToMl: '1 Cucharada = 15 ml',
        tspToMl: '1 Cucharadita = 5 ml',
        kgToPound: '1 Kilogramo = 2.20 libras',
        celToFah: 'Celsius a Fahrenheit',
        kmToMile: '1 Kilómetro = 0.62 millas',
      },
      billSplitter: {
        billAmount: 'Monto Total de la Cuenta',
        tipPercent: 'Propina / Servicio (%)',
        numberOfPeople: 'Número de Personas',
        perPerson: 'Total por Persona',
        totalWithTip: 'Total con Propina',
      },
    },
    emergency: {
      title: 'Primeros Auxilios de Emergencia',
      subtitle: 'Instrucciones claras que salvan vidas ante imprevistos',
      disclaimer: 'Aviso: Esta es una guía de primera respuesta. Ante emergencias graves llame inmediatamente a los servicios médicos.',
      cprTitle: 'RCP Solo con Manos (Inconsciente y sin respirar)',
      cprSteps: [
        '1. Sacuda suavemente los hombros y hable en voz alta para comprobar respuesta.',
        '2. Llame al servicio de emergencia (911 / 112) o pida a alguien que llame ya.',
        '3. Coloque las manos en el centro del pecho. Empuje fuerte y rápido (100-120 por minuto, 5 cm profundidad).',
        '4. No se detenga hasta que llegue la ayuda o la persona respire por sí sola.',
      ],
      chokingTitle: 'Maniobra de Heimlich (Atragantamiento)',
      chokingSteps: [
        '1. Anime a la persona a toser fuerte. Si no puede hablar ni respirar:',
        '2. Póngase detrás de la persona y rodee su cintura justo arriba del ombligo.',
        '3. Cierre un puño y con la otra mano haga compresiones rápidas hacia adentro y hacia arriba.',
        '4. Repita hasta expulsar el objeto atascado.',
      ],
      burnsTitle: 'Quemaduras por Calor o Líquidos Calientes',
      burnsSteps: [
        '1. Enfríe de inmediato la quemadura con agua corriente templada o fría durante 10 a 15 minutos.',
        '2. Nunca aplique hielo, mantequilla o pasta dental (empeoran el daño).',
        '3. Cubra con un apósito estéril y limpio sin apretar y consulte al médico.',
      ],
      heatstrokeTitle: 'Golpe de Calor y Agotamiento Extremo',
      heatstrokeSteps: [
        '1. Traslade a la persona a un lugar fresco o a la sombra inmediatamente.',
        '2. Afloje la ropa ajustada y humedezca la piel con agua fresca abanicando.',
        '3. Aplique compresas frías en cuello, axilas e ingles.',
        '4. Si está consciente, ofrezca pequeños sorbos de agua.',
      ],
      hotlinesTitle: 'Números de Emergencia Globales',
      hotlinesDesc: 'Llamada rápida y directa a servicios de rescate:',
      customContact: 'Contacto Personal de Emergencia',
      callNow: 'Llamar',
    },
    notes: {
      title: 'Bloc de Notas Rápido y Lista de Compras',
      placeholder: 'Escribe artículos del mercado, compras o recordatorios...',
      addNote: 'Añadir',
      copyAll: 'Copiar Todo',
      copied: '¡Copiado!',
      clearDone: 'Limpiar Completados',
      itemsCount: 'elementos',
    },
    islamic: {
      title: 'Noor — Ritmo Islámico y Serenidad',
      subtitle: 'Horarios de las 5 oraciones diarias, tasbih digital, Corán, Hadiz y Zakat',
      prayerTimes: 'Horarios de Oración de Hoy',
      nextPrayer: 'Tiempo restante para la próxima oración',
      fajr: 'Fajr (Amanecer)',
      sunrise: 'Salida del Sol',
      dhuhr: 'Dhuhr (Mediodía)',
      asr: 'Asr (Tarde)',
      maghrib: 'Maghrib (Atardecer)',
      isha: 'Isha (Noche)',
      tasbeehTitle: 'Tasbih Digital y Dhikr',
      tasbeehSubtitle: 'Conteo táctil con sonido acústico y registro de vueltas',
      count: 'Conteo',
      target: 'Meta',
      lap: 'Vuelta',
      tapToCount: 'Toca para contar Dhikr',
      reset: 'Reiniciar',
      subhanallah: 'SubhanAllah (33x)',
      alhamdulillah: 'Alhamdulillah (33x)',
      allahuakbar: 'Allahu Akbar (34x)',
      astaghfirullah: 'Astaghfirullah (100x)',
      lailahaillallah: 'La ilaha illallah',
      dailyAyahTitle: 'Versículo del Noble Corán',
      dailyHadithTitle: 'Hadiz del Día',
      copyAyah: 'Copiar',
      qiblaTitle: 'Dirección de la Qibla hacia La Meca',
      qiblaBearing: 'Ángulo en Grados',
      zakatTitle: 'Calculadora de Zakat (2.5%)',
      zakatSubtitle: 'Cálculo para oro, plata, efectivo y mercancía comercial',
      calculateZakat: 'Calcular Zakat',
      zakatAmount: 'Monto a pagar de Zakat',
    },
    monetize: {
      title: 'Publicación en Play Store y Monetización',
      subtitle: 'Cómo publicar en tiendas de aplicaciones y generar ingresos',
      playStoreTitle: 'Publicar en Google Play Store y App Store',
      playStoreDesc: 'Esta aplicación se puede instalar de inmediato en cualquier celular como PWA. Para que aparezca en las búsquedas de Play Store, se empaqueta en un archivo .aab mediante PWABuilder (TWA) y se sube a Google Play Console.',
      installNow: 'Instalar en el Móvil (PWA)',
      twaGuideTitle: '3 Pasos para Publicar en Google Play:',
      twaSteps: [
        '1. Entra a PWABuilder.com y pega el enlace de esta aplicación.',
        '2. Haz clic en "Package for Android" para descargar el paquete .aab firmado.',
        '3. Sube el archivo .aab a tu cuenta de Google Play Console para su publicación oficial.',
      ],
      earningTitle: 'Cómo Generar Ingresos con este Software',
      earningDesc: 'Mantén la app gratuita para todos los usuarios y obtén ingresos por 3 vías:',
      supportDevTitle: '1. Donaciones y Apoyo al Desarrollador',
      bKashNagad: 'Recepción de pagos directos locales o transferencia bancaria',
      paypalStripe: 'Enlaces de apoyo internacional como PayPal, Stripe o Buy Me a Coffee',
      admobTitle: '2. Anuncios con Google AdMob y AdSense',
      admobDesc: 'Activa banners de AdMob dentro del APK para generar ingresos por impresiones y clics.',
      proSupporterTitle: '3. Membresía Pro y Funciones Premium',
      proSupporterDesc: 'Venta de reportes en PDF del progreso diario y beneficios para mecenas.',
      simulatedDonation: 'Probar Envío de Apoyo (Simulación)',
      thankYouDonation: '¡Muchas gracias por apoyar este proyecto independiente!',
    },
    common: {
      save: 'Guardar',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      edit: 'Editar',
      close: 'Cerrar',
      reset: 'Reiniciar',
      day: 'día',
      today: 'Hoy',
      soundOn: 'Sonido Activo',
      soundOff: 'Silenciado',
      language: 'Idioma',
      direction: 'ltr',
    },
  },
};
