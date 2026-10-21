import React, { useState } from 'react';
import { SupportedLanguage } from '../types';
import { translations } from '../translations';
import { Calculator, Utensils, ArrowRightLeft, Users } from 'lucide-react';

interface ToolsConverterModuleProps {
  currentLang: SupportedLanguage;
}

type ConverterMode = 'kitchen' | 'units' | 'splitter';

export const ToolsConverterModule: React.FC<ToolsConverterModuleProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [mode, setMode] = useState<ConverterMode>('units');

  // Units Converter State
  const [unitType, setUnitType] = useState<'weight' | 'length' | 'temp'>('weight');
  const [unitValue, setUnitValue] = useState<string>('1');

  // Bill Splitter State
  const [billAmount, setBillAmount] = useState<string>('1200');
  const [tipPercent, setTipPercent] = useState<string>('10');
  const [numPeople, setNumPeople] = useState<string>('3');

  // Kitchen Quick Convert
  const [kitchenInput, setKitchenInput] = useState<string>('2');
  const [kitchenConversion, setKitchenConversion] = useState<'cup_ml' | 'tbsp_ml' | 'tsp_ml' | 'oz_gram'>('cup_ml');

  // Compute Units
  const computeUnitConversion = () => {
    const val = parseFloat(unitValue);
    if (isNaN(val)) return { primary: '--', secondary: '--' };

    if (unitType === 'weight') {
      // kg to lbs
      const lbs = (val * 2.20462).toFixed(2);
      const kgBack = (val / 2.20462).toFixed(2);
      return {
        primary: `${val} kg = ${lbs} lbs`,
        secondary: `${val} lbs = ${kgBack} kg`,
      };
    } else if (unitType === 'length') {
      // km to miles & cm to feet/inches
      const miles = (val * 0.621371).toFixed(2);
      const kmBack = (val / 0.621371).toFixed(2);
      return {
        primary: `${val} km = ${miles} miles`,
        secondary: `${val} miles = ${kmBack} km`,
      };
    } else {
      // Celsius to Fahrenheit
      const fahrenheit = ((val * 9) / 5 + 32).toFixed(1);
      const celsius = (((val - 32) * 5) / 9).toFixed(1);
      return {
        primary: `${val} °C = ${fahrenheit} °F`,
        secondary: `${val} °F = ${celsius} °C`,
      };
    }
  };

  // Compute Kitchen
  const computeKitchen = () => {
    const val = parseFloat(kitchenInput);
    if (isNaN(val)) return '--';
    switch (kitchenConversion) {
      case 'cup_ml':
        return `${val} Cups = ${Math.round(val * 240)} ml`;
      case 'tbsp_ml':
        return `${val} Tbsp = ${Math.round(val * 15)} ml`;
      case 'tsp_ml':
        return `${val} Tsp = ${Math.round(val * 5)} ml`;
      case 'oz_gram':
        return `${val} oz = ${(val * 28.3495).toFixed(1)} grams`;
    }
  };

  // Compute Bill Split
  const computeBill = () => {
    const bill = parseFloat(billAmount) || 0;
    const tip = parseFloat(tipPercent) || 0;
    const people = Math.max(1, parseInt(numPeople, 10) || 1);

    const tipVal = bill * (tip / 100);
    const total = bill + tipVal;
    const perPerson = total / people;

    return {
      tipVal: tipVal.toFixed(2),
      total: total.toFixed(2),
      perPerson: perPerson.toFixed(2),
    };
  };

  const billResults = computeBill();
  const unitResults = computeUnitConversion();

  return (
    <div className="space-y-6">
      {/* Top Selector Card */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-stone-900 tracking-tight">{t.tools.title}</h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">{t.tools.subtitle}</p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setMode('units')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                mode === 'units' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              {t.tools.unitConverter}
            </button>
            <button
              onClick={() => setMode('kitchen')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                mode === 'kitchen' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              {t.tools.kitchenConverter}
            </button>
            <button
              onClick={() => setMode('splitter')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                mode === 'splitter' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              {t.tools.tipSplit}
            </button>
          </div>
        </div>
      </div>

      {/* Mode 1: Units Converter */}
      {mode === 'units' && (
        <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-7 shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            {(['weight', 'length', 'temp'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setUnitType(type)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors capitalize ${
                  unitType === type
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                {type === 'weight' ? 'Weight (kg/lbs)' : type === 'length' ? 'Distance (km/mi)' : 'Temp (°C/°F)'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">{t.tools.value}</label>
              <input
                type="number"
                step="any"
                value={unitValue}
                onChange={(e) => setUnitValue(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 font-mono-num text-lg bg-stone-50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>

            <div className="flex flex-col justify-center space-y-3 p-4 rounded-xl bg-amber-50/60 border border-amber-200/60">
              <span className="text-xs font-bold text-amber-900">{t.tools.result}</span>
              <div className="text-xl sm:text-2xl font-bold font-mono-num text-stone-900">
                {unitResults.primary}
              </div>
              <div className="text-sm font-semibold font-mono-num text-stone-600">
                {unitResults.secondary}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Kitchen Converter */}
      {mode === 'kitchen' && (
        <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-7 shadow-xs space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'cup_ml', label: 'Cups → ml' },
              { id: 'tbsp_ml', label: 'Tablespoon → ml' },
              { id: 'tsp_ml', label: 'Teaspoon → ml' },
              { id: 'oz_gram', label: 'Ounces (oz) → Grams' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setKitchenConversion(item.id as any)}
                className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                  kitchenConversion === item.id
                    ? 'border-amber-500 bg-amber-50/80 text-amber-950 font-bold'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">{t.tools.value}</label>
              <input
                type="number"
                step="any"
                value={kitchenInput}
                onChange={(e) => setKitchenInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 font-mono-num text-lg bg-stone-50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>

            <div className="flex flex-col justify-center space-y-2 p-4 rounded-xl bg-amber-50/60 border border-amber-200/60">
              <span className="text-xs font-bold text-amber-900">{t.tools.result}</span>
              <div className="text-2xl font-bold font-mono-num text-stone-900">
                {computeKitchen()}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 border-t border-stone-100 text-xs text-stone-500">
            <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/60 font-mono-num">
              {t.tools.kitchenItems.cupToMl}
            </div>
            <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/60 font-mono-num">
              {t.tools.kitchenItems.tbspToMl}
            </div>
            <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/60 font-mono-num">
              {t.tools.kitchenItems.tspToMl}
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Bill Splitter */}
      {mode === 'splitter' && (
        <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-7 shadow-xs space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">{t.tools.billSplitter.billAmount}</label>
              <input
                type="number"
                min="0"
                step="any"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-mono-num text-sm bg-stone-50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">{t.tools.billSplitter.tipPercent}</label>
              <input
                type="number"
                min="0"
                max="100"
                value={tipPercent}
                onChange={(e) => setTipPercent(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-mono-num text-sm bg-stone-50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">{t.tools.billSplitter.numberOfPeople}</label>
              <input
                type="number"
                min="1"
                max="100"
                value={numPeople}
                onChange={(e) => setNumPeople(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-mono-num text-sm bg-stone-50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-stone-900 text-white space-y-3">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2">
              <span className="text-xs text-stone-400">{t.tools.billSplitter.totalWithTip}</span>
              <span className="text-lg font-bold font-mono-num text-amber-400">
                ${billResults.total}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-sm font-semibold">{t.tools.billSplitter.perPerson}</span>
              <span className="text-3xl font-extrabold font-mono-num text-white">
                ${billResults.perPerson}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
