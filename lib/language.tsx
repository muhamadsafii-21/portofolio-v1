"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { dict, type Lang } from "./i18n";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (path: string) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "lang";

// Ambil nilai "nav.about" -> dict.nav.about[lang]
function translate(lang: Lang, path: string): string {
  const parts = path.split(".");
  let node: unknown = dict;
  for (const p of parts) {
    if (node && typeof node === "object" && p in node) {
      node = (node as Record<string, unknown>)[p];
    } else {
      return path; // fallback: kembalikan key bila tidak ditemukan
    }
  }
  if (node && typeof node === "object" && lang in node) {
    return String((node as Record<string, string>)[lang]);
  }
  return typeof node === "string" ? node : path;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("id");

  // Muat preferensi tersimpan saat mount
  useEffect(() => {
    const saved = (typeof window !== "undefined" &&
      localStorage.getItem(STORAGE_KEY)) as Lang | null;
    if (saved === "id" || saved === "en") setLangState(saved);
  }, []);

  // Sinkronkan atribut lang pada <html> untuk aksesibilitas & SEO
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  function setLang(l: Lang) {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, l);
  }

  const value: Ctx = {
    lang,
    setLang,
    toggle: () => setLang(lang === "id" ? "en" : "id"),
    t: (path: string) => translate(lang, path),
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang harus dipakai di dalam <LanguageProvider>");
  return ctx;
}
