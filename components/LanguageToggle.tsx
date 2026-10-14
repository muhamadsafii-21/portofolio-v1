"use client";

import { Languages } from "lucide-react";
import { useLang } from "@/lib/language";

export default function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang();

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-slate-200 bg-white p-0.5"
      role="group"
      aria-label="Pilih bahasa / Select language"
    >
      {!compact && <Languages size={16} className="ml-1.5 mr-0.5 text-slate-400" />}
      {(["id", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition-colors ${
            lang === l
              ? "bg-indigo-600 text-white"
              : "text-slate-500 hover:text-indigo-600"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
