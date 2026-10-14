import { Reveal, SectionHeading } from "./motion";
import type { Profile } from "@/types";

export default function About({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="border-t border-slate-100 py-20">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHeading label="Tentang" title="Sedikit Tentang Saya" />
        <Reveal>
          <p className="text-center text-lg leading-relaxed text-slate-600">
            {profile.bio}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
