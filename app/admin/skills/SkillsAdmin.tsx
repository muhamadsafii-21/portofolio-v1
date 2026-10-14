"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Loader2 } from "lucide-react";
import type { Skill } from "@/types";

export default function SkillsAdmin({
  skills,
  addAction,
  deleteAction,
}: {
  skills: Skill[];
  addAction: (fd: FormData) => Promise<{ error: string | null }>;
  deleteAction: (id: string) => Promise<{ error: string | null }>;
}) {
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    await addAction(new FormData(e.currentTarget));
    setBusy(false);
    e.currentTarget.reset();
    router.refresh();
  }

  async function onDelete(id: string) {
    await deleteAction(id);
    router.refresh();
  }

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Skills</h1>

      <form
        onSubmit={onSubmit}
        className="mb-6 flex flex-wrap items-end gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div className="flex-1">
          <label className="mb-1.5 block text-xs font-medium text-slate-600">Kategori</label>
          <input
            name="category"
            required
            placeholder="Frontend"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
          />
        </div>
        <div className="flex-1">
          <label className="mb-1.5 block text-xs font-medium text-slate-600">Nama Skill</label>
          <input
            name="name"
            required
            placeholder="React"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
          />
        </div>
        <div className="w-20">
          <label className="mb-1.5 block text-xs font-medium text-slate-600">Urutan</label>
          <input
            name="order"
            type="number"
            defaultValue={skills.length + 1}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
          />
        </div>
        <button
          disabled={busy}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {busy ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Tambah
        </button>
      </form>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-5 py-3">Kategori</th>
              <th className="px-5 py-3">Skill</th>
              <th className="px-5 py-3">Urutan</th>
              <th className="px-5 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {skills.map((s) => (
              <tr key={s.id}>
                <td className="px-5 py-3 text-slate-500">{s.category}</td>
                <td className="px-5 py-3 font-medium text-slate-800">{s.name}</td>
                <td className="px-5 py-3 text-slate-500">{s.order}</td>
                <td className="px-5 py-3 text-right">
                  <button
                    onClick={() => onDelete(s.id)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
