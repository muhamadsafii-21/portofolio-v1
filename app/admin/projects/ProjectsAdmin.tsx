"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Loader2 } from "lucide-react";
import type { Project } from "@/types";

export default function ProjectsAdmin({
  projects,
  addAction,
  deleteAction,
}: {
  projects: Project[];
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

  const field =
    "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500";

  return (
    <div className="max-w-4xl">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Projects</h1>

      <form
        onSubmit={onSubmit}
        className="mb-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2"
      >
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-600">Judul</label>
          <input name="title" required className={field} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-600">Tags (koma)</label>
          <input name="tags" placeholder="React, Supabase" className={field} />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-medium text-slate-600">Deskripsi</label>
          <textarea name="description" rows={3} className={field} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-600">Link Live</label>
          <input name="link" className={field} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-600">Link Repo</label>
          <input name="repo" className={field} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-600">URL Gambar</label>
          <input name="image_url" className={field} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-600">Urutan</label>
          <input name="order" type="number" defaultValue={projects.length + 1} className={field} />
        </div>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
          <input name="featured" type="checkbox" className="h-4 w-4 accent-indigo-600" />
          Featured
        </label>
        <div className="sm:col-span-2">
          <button
            disabled={busy}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {busy ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Tambah Project
          </button>
        </div>
      </form>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-5 py-3">Judul</th>
              <th className="px-5 py-3">Tags</th>
              <th className="px-5 py-3">Featured</th>
              <th className="px-5 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projects.map((p) => (
              <tr key={p.id}>
                <td className="px-5 py-3 font-medium text-slate-800">{p.title}</td>
                <td className="px-5 py-3 text-slate-500">{p.tags.join(", ")}</td>
                <td className="px-5 py-3 text-slate-500">{p.featured ? "Ya" : "-"}</td>
                <td className="px-5 py-3 text-right">
                  <button
                    onClick={() => onDelete(p.id)}
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
