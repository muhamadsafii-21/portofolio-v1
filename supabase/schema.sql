-- ============================================================
--  Portofolio — Supabase schema
--  Jalankan ini di Supabase Dashboard > SQL Editor
-- ============================================================

-- profile (singleton: cuma 1 baris)
create table if not exists public.profile (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  role text default '',
  bio text default '',
  avatar_url text,
  email text,
  github text,
  linkedin text,
  updated_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  name text not null,
  "order" int not null default 0
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  image_url text,
  tags text[] not null default '{}',
  link text,
  repo text,
  featured boolean not null default false,
  "order" int not null default 0
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------- Row Level Security ----------
alter table public.profile  enable row level security;
alter table public.skills   enable row level security;
alter table public.projects enable row level security;
alter table public.messages enable row level security;

-- profile / skills / projects: baca publik, tulis hanya user login
create policy "public read profile"  on public.profile  for select using (true);
create policy "auth write profile"   on public.profile  for all    using (auth.role() = 'authenticated');
create policy "public read skills"   on public.skills   for select using (true);
create policy "auth write skills"    on public.skills    for all   using (auth.role() = 'authenticated');
create policy "public read projects" on public.projects for select using (true);
create policy "auth write projects"  on public.projects for all    using (auth.role() = 'authenticated');

-- messages: siapa saja boleh kirim (insert), hanya admin yang baca/hapus
create policy "public insert messages" on public.messages for insert with check (true);
create policy "auth read messages"     on public.messages for select using (auth.role() = 'authenticated');
create policy "auth update messages"   on public.messages for update using (auth.role() = 'authenticated');
create policy "auth delete messages"   on public.messages for delete using (auth.role() = 'authenticated');

-- ---------- Storage bucket (foto) ----------
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('projects', 'projects', true) on conflict do nothing;

create policy "public read avatars" on storage.objects for select using (bucket_id = 'avatars');
create policy "auth write avatars"  on storage.objects for all   using (bucket_id = 'avatars' and auth.role() = 'authenticated');
create policy "public read projects-img" on storage.objects for select using (bucket_id = 'projects');
create policy "auth write projects-img"  on storage.objects for all   using (bucket_id = 'projects' and auth.role() = 'authenticated');

-- ---------- Seed dummy ----------
insert into public.profile (name, role, bio, email, github, linkedin)
values (
  'Muhamad Safi''i',
  'Full-Stack Developer',
  'Saya seorang developer yang fokus membangun produk web modern, cepat, dan rapi.',
  'hello@muhamadsafii.dev',
  'https://github.com/',
  'https://linkedin.com/in/'
);

insert into public.skills (category, name, "order") values
  ('Frontend','React',1),('Frontend','Next.js',2),('Frontend','TypeScript',3),('Frontend','Tailwind CSS',4),
  ('Backend','Node.js',5),('Backend','PostgreSQL',6),('Backend','Supabase',7),
  ('Tools','Git',8),('Tools','Figma',9),('Tools','Vercel',10);

insert into public.projects (title, description, image_url, tags, link, repo, featured, "order") values
  ('Task Flow','Aplikasi manajemen tugas dengan drag-and-drop board dan kolaborasi realtime.', null, array['Next.js','Supabase','Tailwind'], 'https://example.com','https://github.com/', true, 1),
  ('Katalog UMKM','Platform katalog untuk usaha kecil menengah dengan dashboard penjual.', null, array['React','Node.js','PostgreSQL'], 'https://example.com', null, true, 2),
  ('Weather PWA','Progressive web app cuaca dengan peta interaktif dan offline-first.', null, array['TypeScript','PWA'], null, 'https://github.com/', false, 3);
