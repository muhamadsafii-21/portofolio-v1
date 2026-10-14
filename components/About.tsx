"use client";

import { Reveal, SectionHeading } from "./motion";
import { useLang } from "@/lib/language";
import type { Profile } from "@/types";

export default function About({ profile }: { profile: Profile }) {
  const { t } = useLang();
  return (
    <section id="about" className="border-t border-slate-100 py-20">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHeading label={t("about.label")} title={t("about.title")} />
        <Reveal>
          <p className="text-center text-lg leading-relaxed text-slate-600">
            {profile.bio}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
