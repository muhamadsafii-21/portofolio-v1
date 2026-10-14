import type { Message, Profile, Project, Skill } from "@/types";

export const dummyProfile: Profile = {
  id: "00000000-0000-0000-0000-000000000001",
  name: "Muhamad Safi'i",
  role: "Full-Stack Developer",
  bio: "Saya seorang developer yang fokus membangun produk web modern, cepat, dan rapi. Senang mengubah ide menjadi aplikasi nyata dengan kode yang bersih serta pengalaman pengguna yang enak.",
  avatar_url: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop&crop=faces",
  email: "hello@muhamadsafii.dev",
  github: "https://github.com/",
  linkedin: "https://linkedin.com/in/",
  updated_at: new Date().toISOString(),
};

export const dummySkills: Skill[] = [
  { id: "s1", category: "Frontend", name: "React", order: 1 },
  { id: "s2", category: "Frontend", name: "Next.js", order: 2 },
  { id: "s3", category: "Frontend", name: "TypeScript", order: 3 },
  { id: "s4", category: "Frontend", name: "Tailwind CSS", order: 4 },
  { id: "s5", category: "Backend", name: "Node.js", order: 5 },
  { id: "s6", category: "Backend", name: "PostgreSQL", order: 6 },
  { id: "s7", category: "Backend", name: "Supabase", order: 7 },
  { id: "s8", category: "Tools", name: "Git", order: 8 },
  { id: "s9", category: "Tools", name: "Figma", order: 9 },
  { id: "s10", category: "Tools", name: "Vercel", order: 10 },
];

export const dummyProjects: Project[] = [
  {
    id: "p1",
    title: "Task Flow",
    description: "Aplikasi manajemen tugas dengan drag-and-drop board, kolaborasi realtime, dan notifikasi.",
    image_url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=500&fit=crop",
    tags: ["Next.js", "Supabase", "Tailwind"],
    link: "https://example.com",
    repo: "https://github.com/",
    featured: true,
    order: 1,
  },
  {
    id: "p2",
    title: "Katalog UMKM",
    description: "Platform katalog untuk usaha kecil menengah lengkap dengan dashboard penjual dan laporan penjualan.",
    image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
    tags: ["React", "Node.js", "PostgreSQL"],
    link: "https://example.com",
    repo: null,
    featured: true,
    order: 2,
  },
  {
    id: "p3",
    title: "Weather PWA",
    description: "Progressive web app cuaca dengan peta interaktif, offline-first, dan notifikasi harian.",
    image_url: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=500&fit=crop",
    tags: ["TypeScript", "PWA", "API"],
    link: null,
    repo: "https://github.com/",
    featured: false,
    order: 3,
  },
];

export const dummyMessages: Message[] = [
  {
    id: "m1",
    name: "Andi Pratama",
    email: "andi@example.com",
    message: "Halo, saya tertarik untuk berdiskusi soal project kolaborasi. Boleh minta waktu?",
    is_read: false,
    created_at: new Date().toISOString(),
  },
];
