"use server";

import { createClient } from "@/lib/supabase/server";

const hasEnv =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function sendMessage(formData: FormData) {
  const payload = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  if (!payload.name || !payload.email || !payload.message) {
    return { ok: false, error: "Semua field wajib diisi." };
  }

  // Tanpa Supabase terkonfigurasi, cukup simulasi sukses (mode demo).
  if (!hasEnv) {
    return { ok: true };
  }

  const { error } = await createClient().from("messages").insert(payload);
  if (error) return { ok: false, error: "Gagal mengirim pesan. Coba lagi." };
  return { ok: true };
}
