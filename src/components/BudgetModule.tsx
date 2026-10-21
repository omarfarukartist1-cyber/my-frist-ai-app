import React, { useState } from 'react';
import { CurrencyCode, ExpenseItem, SupportedLanguage } from '../types';
import { translations } from '../translations';
import { Wallet, Plus, Trash2, PieChart } from 'lucide-react';
import { sounds } from '../utils/sound';
import { getTodayDateString } from '../utils/storage';

interface BudgetModuleProps {
  currentLang: SupportedLanguage;
  expenses: ExpenseItem[];
  dailyLimit: number;
  currency: CurrencyCode;
  onAddExpense: (item: Omit<ExpenseItem, 'id' | 'date'>) => void;
  onDeleteExpense: (expenseId: string) => void;
  onUpdateLimit: (limit: number) => void;
  onUpdateCurrency: (currency: CurrencyCode) => void;
}

export const BudgetModule: React.FC<BudgetModuleProps> = ({
  currentLang,
  expenses,
  dailyLimit,
  currency,
  onAddExpense,
  onDeleteExpense,
  onUpdateLimit,
  onUpdateCurrency,
}) => {
  const t = translations[currentLang];
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseItem['category']>('food');
  const [isEditingLimit, setIsEditingLimit] = useState(false);
  const [tempLimit, setTempLimit] = useState(String(dailyLimit));

  const currencySymbols: Record<CurrencyCode, string> = {
    BDT: '৳',
    SAR: '﷼',
    AED: 'د.إ',
    USD: '$',
    EUR: '€',
    INR: '₹',
  };

  const currSymbol = currencySymbols[currency] || '$';

  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const remaining = Math.max(0, dailyLimit - totalSpent);
  const spentPercent = dailyLimit > 0 ? Math.min(100, Math.round((totalSpent / dailyLimit) * 100)) : 0;
  const isOverBudget = totalSpent > dailyLimit;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!title.trim() || isNaN(parsedAmount) || parsedAmount <= 0) return;

    onAddExpense({
      title: title.trim(),
      amount: parsedAmount,
      currency,
      category,
    });

    setTitle('');
    setAmount('');
    setIsAdding(false);
    sounds.playHabitCheck();
  };

  const handleLimitSave = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(tempLimit);
    if (!isNaN(parsed) && parsed > 0) {
      onUpdateLimit(parsed);
      setIsEditingLimit(false);
    }
  };

  const categoryLabels: Record<ExpenseItem['category'], string> = {
    food: t.budget.categories.food,
    groceries: t.budget.categories.groceries,
    transport: t.budget.categories.transport,
    bills: t.budget.categories.bills,
    health: t.budget.categories.health,
    other: t.budget.categories.other,
  };

  // Calculate category totals
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Top Budget Summary Card */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-stone-900 tracking-tight">{t.budget.title}</h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">{t.budget.subtitle}</p>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500">{t.budget.currency}:</span>
            <div className="flex items-center bg-stone-100 rounded-lg p-1">
              {(['BDT', 'SAR', 'AED', 'USD', 'EUR', 'INR'] as CurrencyCode[]).map((c) => (
                <button
                  key={c}
                  onClick={() => onUpdateCurrency(c)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                    currency === c
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {currencySymbols[c]} {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Big Numbers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Daily Limit */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/60 relative">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span>{t.budget.dailyLimit}</span>
              <button
                onClick={() => {
                  setTempLimit(String(dailyLimit));
                  setIsEditingLimit(!isEditingLimit);
                }}
                className="text-amber-700 hover:underline text-[11px] font-semibold"
              >
                {t.common.edit}
              </button>
            </div>
            <div className="text-2xl font-bold font-mono-num text-stone-900 mt-2">
              {currSymbol} {dailyLimit.toLocaleString()}
            </div>
          </div>

          {/* Today Spent */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/60">
            <div className="text-xs text-stone-500">{t.budget.todaySpent}</div>
            <div className={`text-2xl font-bold font-mono-num mt-2 ${isOverBudget ? 'text-rose-600' : 'text-stone-900'}`}>
              {currSymbol} {totalSpent.toLocaleString()}
            </div>
          </div>

          {/* Remaining */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/60">
            <div className="text-xs text-stone-500">{t.budget.remaining}</div>
            <div className="text-2xl font-bold font-mono-num text-emerald-600 mt-2">
              {currSymbol} {remaining.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Budget Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-2.5 rounded-full transition-all duration-500 ${
                isOverBudget ? 'bg-rose-500' : 'bg-amber-500'
              }`}
              style={{ width: `${spentPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] text-stone-400 font-mono-num">
            <span>{spentPercent}% {t.budget.todaySpent.toLowerCase()}</span>
            <span>{isOverBudget ? 'Over Budget!' : `${currSymbol} ${remaining} left`}</span>
          </div>
        </div>

        {/* Edit Limit Inline Form */}
        {isEditingLimit && (
          <form onSubmit={handleLimitSave} className="flex items-center gap-2 p-3 bg-stone-100 rounded-xl">
            <input
              type="number"
              min="10"
              max="1000000"
              value={tempLimit}
              onChange={(e) => setTempLimit(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-stone-300 text-sm font-mono-num bg-white"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-semibold"
            >
              {t.common.save}
            </button>
            <button
              type="button"
              onClick={() => setIsEditingLimit(false)}
              className="px-2 py-1 text-xs text-stone-600"
            >
              {t.common.cancel}
            </button>
          </form>
        )}
      </div>

      {/* Add Expense Button & Drawer */}
      <div className="space-y-4">
        {!isAdding ? (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full h-12 rounded-xl bg-stone-900 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs hover:bg-stone-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            {t.budget.addExpense}
          </button>
        ) : (
          <form onSubmit={handleAddSubmit} className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900">{t.budget.addExpense}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">{t.budget.amount} ({currSymbol})</label>
                <input
                  type="number"
                  min="0.5"
                  step="any"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 font-mono-num text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">{t.budget.category}</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                >
                  <option value="food">{categoryLabels.food}</option>
                  <option value="groceries">{categoryLabels.groceries}</option>
                  <option value="transport">{categoryLabels.transport}</option>
                  <option value="bills">{categoryLabels.bills}</option>
                  <option value="health">{categoryLabels.health}</option>
                  <option value="other">{categoryLabels.other}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">{t.budget.itemTitle}</label>
                <input
                  type="text"
                  placeholder="e.g. Milk & bread"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900"
              >
                {t.common.cancel}
              </button>
              <button
                type="submit"
                disabled={!title.trim() || !amount}
                className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 disabled:opacity-50 transition-colors shadow-xs"
              >
                {t.common.save}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Expenses List & Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2 Cols: Itemized Expenses */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-stone-900">{t.budget.recentExpenses}</h3>

          {expenses.length === 0 ? (
            <div className="text-center py-8 text-stone-400 text-xs sm:text-sm">
              {t.budget.noExpenses}
            </div>
          ) : (
            <div className="space-y-2">
              {expenses.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200/60 hover:border-stone-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                      {categoryLabels[item.category].slice(0, 1)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-900">{item.title}</p>
                      <p className="text-[11px] text-stone-400">{categoryLabels[item.category]}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold font-mono-num text-stone-900">
                      - {currSymbol} {item.amount.toLocaleString()}
                    </span>
                    <button
                      onClick={() => onDeleteExpense(item.id)}
                      aria-label="Delete expense"
                      className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right 1 Col: Category Breakdown Summary */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-stone-600" />
            <h3 className="text-sm font-bold text-stone-900">{t.budget.category}</h3>
          </div>

          {Object.keys(categoryTotals).length === 0 ? (
            <p className="text-xs text-stone-400 py-4">{t.budget.noExpenses}</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(categoryTotals).map(([catKey, total]) => {
                const pct = totalSpent > 0 ? Math.round((total / totalSpent) * 100) : 0;
                return (
                  <div key={catKey} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-600 font-medium">
                        {categoryLabels[catKey as ExpenseItem['category']] || catKey}
                      </span>
                      <span className="font-mono-num font-semibold text-stone-900">
                        {currSymbol} {total.toLocaleString()} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-amber-600 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
