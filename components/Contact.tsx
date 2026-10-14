"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa6";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { Reveal, SectionHeading } from "./motion";
import { sendMessage } from "@/app/actions";
import { useLang } from "@/lib/language";
import type { Profile } from "@/types";

export default function Contact({ profile }: { profile: Profile }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const { t } = useLang();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const res = await sendMessage(new FormData(e.currentTarget));
    setStatus(res.ok ? "done" : "error");
    if (res.ok) e.currentTarget.reset();
  }

  const socials = [
    { href: `mailto:${profile.email}`, icon: FaEnvelope, label: profile.email },
    { href: profile.github, icon: FaGithub, label: "GitHub" },
    { href: profile.linkedin, icon: FaLinkedin, label: "LinkedIn" },
  ].filter((s) => s.href);

  return (
    <section id="contact" className="border-t border-slate-100 bg-slate-100 py-20">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading
          label={t("contact.label")}
          title={t("contact.title")}
          desc={t("contact.desc")}
        />

        <div className="grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col justify-center rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">{t("contact.infoTitle")}</h3>
              <p className="mt-2 text-sm text-slate-500">
                {t("contact.infoDesc")}
              </p>
              <ul className="mt-6 space-y-4">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href as string}
                      target={s.href?.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm font-medium text-slate-700 transition-colors hover:text-indigo-600"
                    >
                      <span className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
                        <s.icon size={18} />
                      </span>
                      <span className="truncate">{s.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">{t("contact.name")}</label>
                  <input
                    name="name"
                    required
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    placeholder={t("contact.namePlaceholder")}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">{t("contact.email")}</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    placeholder={t("contact.emailPlaceholder")}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">{t("contact.message")}</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    placeholder={t("contact.messagePlaceholder")}
                  />
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                disabled={status === "loading"}
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-60"
              >
                {status === "loading" && <Loader2 size={16} className="animate-spin" />}
                {status === "done" && <CheckCircle2 size={16} />}
                {status !== "loading" && status !== "done" && <Send size={16} />}
                {status === "loading"
                  ? t("contact.sending")
                  : status === "done"
                    ? t("contact.sent")
                    : t("contact.send")}
              </motion.button>

              {status === "done" && (
                <p className="mt-3 text-center text-sm text-emerald-600">
                  {t("contact.thanks")}
                </p>
              )}
              {status === "error" && (
                <p className="mt-3 text-center text-sm text-rose-600">
                  {t("contact.failed")}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
