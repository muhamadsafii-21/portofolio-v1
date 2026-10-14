"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa6";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Reveal } from "./motion";
import { useLang } from "@/lib/language";
import type { Profile } from "@/types";

export default function Hero({ profile }: { profile: Profile }) {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden pt-28 pb-20">
      {/* background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <div className="mx-auto max-w-3xl px-5 text-center">
        <Reveal>
          <Image
            src={profile.avatar_url || "/avatar-placeholder.png"}
            alt={profile.name}
            width={144}
            height={144}
            priority
            className="mx-auto rounded-full border border-slate-200 object-cover shadow-xl"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            {profile.name}
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-2 text-lg font-semibold text-indigo-600">{profile.role}</p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <motion.a
              href="#projects"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-700"
            >
              {t("hero.viewProjects")}
              <ArrowUpRight size={16} />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-indigo-300 hover:text-indigo-600"
            >
              {t("hero.contactMe")}
            </motion.a>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-7 flex items-center justify-center gap-5">
            {[
              { href: `mailto:${profile.email}`, icon: FaEnvelope, label: "Email" },
              { href: profile.github, icon: FaGithub, label: "GitHub" },
              { href: profile.linkedin, icon: FaLinkedin, label: "LinkedIn" },
            ]
              .filter((s) => s.href)
              .map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href as string}
                  target={s.href?.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -4 }}
                  className="rounded-full border border-slate-200 bg-white p-3 text-slate-600 shadow-sm transition-colors hover:border-indigo-300 hover:text-indigo-600"
                >
                  <s.icon size={20} />
                </motion.a>
              ))}
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <motion.a
            href="#projects"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="mt-10 inline-flex flex-col items-center gap-1 text-sm text-slate-400"
          >
            <ArrowDown size={18} />
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}
