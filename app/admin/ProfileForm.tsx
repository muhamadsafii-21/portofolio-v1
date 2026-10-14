"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2, Upload, Save } from "lucide-react";
import type { Profile } from "@/types";

export default function ProfileForm({
  profile,
  saveAction,
  uploadAction,
}: {
  profile: Profile | null;
  saveAction: (fd: FormData) => Promise<{ error: string | null }>;
  uploadAction: (fd: FormData) => Promise<{ url: string | null; error: string | null }>;
}) {
  const [avatar, setAvatar] = useState(profile?.avatar_url ?? "");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const router = useRouter();

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    const res = await uploadAction(fd);
    if (res.url) setAvatar(res.url);
    else setMsg({ ok: false, text: res.error ?? "Upload gagal" });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    if (avatar) fd.set("avatar_url", avatar);
    const res = await saveAction(fd);
    setBusy(false);
    setMsg(res.error ? { ok: false, text: res.error } : { ok: true, text: "Tersimpan!" });
    router.refresh();
  }

  const field =
    "w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-full bg-slate-100">
          {avatar && <Image src={avatar} alt="avatar" fill className="object-cover" />}
        </div>
        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
          <Upload size={16} /> Ganti Foto
          <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Nama</label>
          <input name="name" defaultValue={profile?.name} className={field} required />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Role</label>
          <input name="role" defaultValue={profile?.role} className={field} />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Bio</label>
        <textarea name="bio" defaultValue={profile?.bio} rows={4} className={field} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
          <input name="email" defaultValue={profile?.email ?? ""} className={field} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">GitHub</label>
          <input name="github" defaultValue={profile?.github ?? ""} className={field} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">LinkedIn</label>
          <input name="linkedin" defaultValue={profile?.linkedin ?? ""} className={field} />
        </div>
      </div>

      {profile && <input type="hidden" name="id" value={profile.id} />}
      <input type="hidden" name="avatar_url" value={avatar} />

      <div className="flex items-center gap-4">
        <button
          disabled={busy}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {busy ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Simpan
        </button>
        {msg && (
          <span className={`text-sm ${msg.ok ? "text-emerald-600" : "text-rose-600"}`}>
            {msg.text}
          </span>
        )}
      </div>
    </form>
  );
}
