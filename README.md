# Portofolio — Muhamad Safi'i

Website portofolio pribadi dengan **Next.js 14 (App Router)** dan **Supabase**, siap deploy ke **Vercel**. Terdiri dari:

1. **Halaman informasi (publik)** — profil (foto bulat + email/GitHub/LinkedIn), skill (pengelompokan), project pribadi, kontak, dan form pesan.
2. **Cpanel admin** (terproteksi login) — kelola semua data profil, skill, project, dan lihat pesan masuk.

## Tech Stack

- **Next.js 14** + TypeScript + Tailwind CSS
- **Framer Motion** — animasi scroll & transisi halus
- **lucide-react** + **react-icons** — ikon
- **Supabase** — PostgreSQL + Auth (login admin) + Storage (foto)
- Deploy: **Vercel**

## Menjalankan secara lokal

```bash
npm install
npm run dev      # buka http://localhost:3000
```

> Tanpa konfigurasi Supabase, website tetap berjalan memakai **data dummy** agar bentuknya terlihat. Cpanel juga bisa dibuka (mode preview).

## Setup Supabase (wajib agar data tersimpan & login admin aktif)

1. Buat project gratis di [supabase.com](https://supabase.com).
2. Buka **SQL Editor** → jalankan seluruh isi file [`supabase/schema.sql`](./supabase/schema.sql).
   - Membuat tabel `profile`, `skills`, `projects`, `messages` + Row Level Security + bucket storage + data dummy.
3. Buat user admin: **Authentication → Users → Add user** (email + password). Simpan untuk login cpanel.
4. Ambil kredensial: **Project Settings → API** → salin `Project URL` dan `anon public key`.
5. Isi file `.env.local` di root:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhb...
   ```

6. Restart `npm run dev`. Proteksi login admin kini aktif otomatis.

## Deploy ke Vercel

1. Push project ini ke GitHub/GitLab/Bitbucket (pastikan `.env.local` **tidak** ikut ter-push — sudah aman di `.gitignore`).
2. Di [vercel.com](https://vercel.com) → **Add New → Project** → import repo ini.
3. Tambahkan **Environment Variables** (Production): `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` (nilai sama seperti `.env.local`).
4. **Deploy**. Selesai.
5. (Opsional) Ganti domain di metadata (`app/layout.tsx`), `public/sitemap.xml`, dan `public/robots.txt` sesuai domain finalmu.

## Struktur Folder

```
app/
  page.tsx            # halaman publik (Hero, About, Skills, Projects, Contact)
  layout.tsx          # metadata SEO + font
  actions.ts          # server action kirim pesan
  admin/              # cpanel
    layout.tsx        # sidebar + logout
    login/            # halaman login
    page.tsx          # kelola profil
    skills/ projects/ messages/   # CRUD
components/           # komponen UI publik
lib/
  supabase/           # client & server helper
  queries.ts          # ambil data (fallback ke dummy)
  data.ts             # data dummy
supabase/schema.sql   # skema DB + RLS + seed
```

## Akses Cpanel

- URL: `/admin` (otomatis dialihkan ke `/admin/login` jika belum masuk).
- Login memakai email & password admin yang kamu buat di Supabase Auth.
