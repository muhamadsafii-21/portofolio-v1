"use server";

import { createClient } from "@/lib/supabase/server";

const hasEnv =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Notifikasi email (opsional) via Resend REST API. Aktif hanya bila env diset,
// sehingga tetap aman (fallback ke panel admin) kalau belum dikonfigurasi.
const hasEmail = !!process.env.RESEND_API_KEY && !!process.env.RESEND_TO_EMAIL;

async function notifyEmail(payload: {
  name: string;
  email: string;
  message: string;
}) {
  if (!hasEmail) return;
  try {
    // Default "onboarding@resend.dev" hanya boleh kirim ke email akun Resend kamu
    // dan berlaku 3 hari. Setelah verify domain di Resend, set RESEND_FROM_EMAIL
    // (mis. "Portofolio <halo@domainkamu.com>") lewat env variable.
    const from = process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [process.env.RESEND_TO_EMAIL],
        subject: `Pesan baru dari ${payload.name}`,
        reply_to: payload.email,
        text: `Nama: ${payload.name}\nEmail: ${payload.email}\n\nPesan:\n${payload.message}`,
      }),
    });
  } catch {
    // Notifikasi email bersifat best-effort; jangan gagalkan pengiriman pesan.
  }
}

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

  // Kirim notifikasi email ke admin (best-effort, tidak blocking kegagalan).
  await notifyEmail(payload);
  return { ok: true };
}
