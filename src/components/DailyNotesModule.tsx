import React, { useState } from 'react';
import { ScratchNote, SupportedLanguage } from '../types';
import { translations } from '../translations';
import { Check, Plus, Copy, Trash2, CheckCheck } from 'lucide-react';
import { sounds } from '../utils/sound';

interface DailyNotesModuleProps {
  currentLang: SupportedLanguage;
  notes: ScratchNote[];
  onAddNote: (text: string) => void;
  onToggleNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
  onClearCompleted: () => void;
}

export const DailyNotesModule: React.FC<DailyNotesModuleProps> = ({
  currentLang,
  notes,
  onAddNote,
  onToggleNote,
  onDeleteNote,
  onClearCompleted,
}) => {
  const t = translations[currentLang];
  const [inputText, setInputText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onAddNote(inputText.trim());
    setInputText('');
    sounds.playHabitCheck();
  };

  const handleCopyAll = () => {
    if (notes.length === 0) return;
    const textToCopy = notes
      .map((n) => `${n.checked ? '✓' : '□'} ${n.text}`)
      .join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pendingCount = notes.filter((n) => !n.checked).length;

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-stone-900 tracking-tight">{t.notes.title}</h3>
          <p className="text-xs text-stone-500">
            {pendingCount} {t.notes.itemsCount} {t.habits.pending.toLowerCase()}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {notes.length > 0 && (
            <>
              <button
                onClick={handleCopyAll}
                className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors flex items-center gap-1.5"
              >
                {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? t.notes.copied : t.notes.copyAll}
              </button>

              <button
                onClick={onClearCompleted}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title={t.notes.clearDone}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Input row */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          placeholder={t.notes.placeholder}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-stone-50 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="px-4 py-2.5 rounded-xl bg-stone-900 text-white font-semibold text-xs hover:bg-stone-800 disabled:opacity-40 transition-colors flex items-center gap-1.5 shrink-0 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          {t.notes.addNote}
        </button>
      </form>

      {/* Notes list */}
      <div className="space-y-2 pt-1 max-h-60 overflow-y-auto pr-1">
        {notes.length === 0 ? (
          <p className="text-center py-4 text-xs text-stone-400">{t.notes.placeholder}</p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 group ${
                note.checked ? 'bg-stone-50 border-stone-200 text-stone-400' : 'bg-white border-stone-200/80'
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button
                  onClick={() => onToggleNote(note.id)}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                    note.checked ? 'bg-stone-800 border-stone-800 text-white' : 'border-stone-300 hover:border-stone-500'
                  }`}
                >
                  {note.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
                <span
                  className={`text-xs sm:text-sm font-medium truncate ${
                    note.checked ? 'line-through text-stone-400' : 'text-stone-800'
                  }`}
                >
                  {note.text}
                </span>
              </div>

              <button
                onClick={() => onDeleteNote(note.id)}
                aria-label="Delete note"
                className="text-stone-300 hover:text-rose-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
