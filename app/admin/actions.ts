"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const touch = () => {
  revalidatePath("/");
};

/* ---------- Profile ---------- */
export async function saveProfile(formData: FormData) {
  const sb = createClient();
  const payload = {
    name: String(formData.get("name") ?? ""),
    role: String(formData.get("role") ?? ""),
    bio: String(formData.get("bio") ?? ""),
    email: String(formData.get("email") ?? ""),
    github: String(formData.get("github") ?? ""),
    linkedin: String(formData.get("linkedin") ?? ""),
    avatar_url: (formData.get("avatar_url") as string) || null,
  };
  const id = formData.get("id") as string | null;
  const { error } = id
    ? await sb.from("profile").update(payload).eq("id", id)
    : await sb.from("profile").insert(payload);
  touch();
  return { error: error?.message ?? null };
}

/* ---------- Skills ---------- */
export async function addSkill(formData: FormData) {
  const sb = createClient();
  const { error } = await sb.from("skills").insert({
    category: String(formData.get("category") ?? ""),
    name: String(formData.get("name") ?? ""),
    order: Number(formData.get("order") ?? 0),
  });
  touch();
  return { error: error?.message ?? null };
}

export async function deleteSkill(id: string) {
  const { error } = await createClient().from("skills").delete().eq("id", id);
  touch();
  return { error: error?.message ?? null };
}

/* ---------- Projects ---------- */
export async function addProject(formData: FormData) {
  const sb = createClient();
  const { error } = await sb.from("projects").insert({
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    overview: (formData.get("overview") as string) || "",
    features: String(formData.get("features") ?? "")
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean),
    role: (formData.get("role") as string) || null,
    period: (formData.get("period") as string) || null,
    highlights: String(formData.get("highlights") ?? "")
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean),
    image_url: (formData.get("image_url") as string) || null,
    tags: String(formData.get("tags") ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    link: (formData.get("link") as string) || null,
    repo: (formData.get("repo") as string) || null,
    featured: formData.get("featured") === "on",
    order: Number(formData.get("order") ?? 0),
  });
  touch();
  return { error: error?.message ?? null };
}

export async function deleteProject(id: string) {
  const { error } = await createClient().from("projects").delete().eq("id", id);
  touch();
  return { error: error?.message ?? null };
}

/* ---------- Messages ---------- */
export async function toggleRead(id: string, isRead: boolean) {
  const { error } = await createClient()
    .from("messages")
    .update({ is_read: isRead })
    .eq("id", id);
  touch();
  return { error: error?.message ?? null };
}

export async function deleteMessage(id: string) {
  const { error } = await createClient().from("messages").delete().eq("id", id);
  touch();
  return { error: error?.message ?? null };
}
