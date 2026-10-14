import { createClient as createServer } from "@/lib/supabase/server";
import { dummyProfile, dummyProjects, dummySkills } from "@/lib/data";
import type { Profile, Project, Skill } from "@/types";

const hasEnv =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function getProfile(): Promise<Profile | null> {
  if (!hasEnv) return dummyProfile;
  const { data } = await createServer()
    .from("profile")
    .select("*")
    .limit(1)
    .single();
  return data ?? dummyProfile;
}

export async function getSkills(): Promise<Skill[]> {
  if (!hasEnv) return dummySkills;
  const { data } = await createServer()
    .from("skills")
    .select("*")
    .order("order", { ascending: true });
  return data?.length ? data : dummySkills;
}

export async function getProjects(): Promise<Project[]> {
  if (!hasEnv) return dummyProjects;
  const { data } = await createServer()
    .from("projects")
    .select("*")
    .order("featured", { ascending: false })
    .order("order", { ascending: true });
  return data?.length ? data : dummyProjects;
}
