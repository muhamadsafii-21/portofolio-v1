"use server";

import { createClient } from "@/lib/supabase/server";

/** Upload file ke Supabase Storage, return public URL. */
export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File | null;
  if (!file) return { url: null, error: "Tidak ada file" };

  const sb = createClient();
  const ext = file.name.split(".").pop();
  const path = `${Date.now()}.${ext}`;

  const { error } = await sb.storage.from("avatars").upload(path, file, { upsert: true });
  if (error) return { url: null, error: error.message };

  const { data } = sb.storage.from("avatars").getPublicUrl(path);
  return { url: data.publicUrl, error: null };
}
