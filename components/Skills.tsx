import { Reveal, SectionHeading } from "./motion";
import type { Skill } from "@/types";

function groupByCategory(skills: Skill[]) {
  return skills.reduce<Record<string, Skill[]>>((acc, s) => {
    (acc[s.category] ??= []).push(s);
    return acc;
  }, {});
}

export default function Skills({ skills }: { skills: Skill[] }) {
  const groups = groupByCategory(skills);

  return (
    <section id="skills" className="border-t border-slate-100 bg-slate-100 py-20">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading label="Keahlian" title="Skill & Teknologi" desc="Teknologi yang saya kuasai dan gunakan sehari-hari." />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(groups).map(([category, items], i) => (
            <Reveal key={category} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
                  <span className="h-2 w-2 rounded-full bg-indigo-500" />
                  {category}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <li
                      key={s.id}
                      className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700"
                    >
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
