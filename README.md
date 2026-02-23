# KawanPPM — Koleksi Video Internal PPM

Website koleksi video pelatihan, seminar, dan konferensi internal PPM dari 2014 hingga sekarang.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database ORM**: Prisma
- **Database**: PostgreSQL via [Neon.tech](https://neon.tech) (free)
- **Auth**: NextAuth.js
- **Deploy**: [Vercel](https://vercel.com) (free)

---

## 🚀 Setup & Deploy

### 1. Clone & Install

```bash
git clone <repo-url>
cd kawanppm
npm install
```

### 2. Setup Database di Neon.tech

1. Daftar di [neon.tech](https://neon.tech) (gratis)
2. Buat project baru → copy **Connection String** (DATABASE_URL)

### 3. Buat file `.env.local`

```env
DATABASE_URL="postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require"
NEXTAUTH_SECRET="buat-string-random-panjang-di-sini"
NEXTAUTH_URL="http://localhost:3000"

# Kredensial admin (GANTI INI!)
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="password-rahasia-kamu"
```

> 💡 Buat NEXTAUTH_SECRET dengan: `openssl rand -base64 32`

### 4. Push Database Schema

```bash
npx prisma db push
```

### 5. Jalankan di local

```bash
npm run dev
```

Buka http://localhost:3000

---

## 📦 Deploy ke Vercel

### 1. Push ke GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/kawanppm.git
git push -u origin main
```

### 2. Deploy di Vercel

1. Login ke [vercel.com](https://vercel.com)
2. **New Project** → Import dari GitHub
3. Tambahkan **Environment Variables**:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Connection string dari Neon |
| `NEXTAUTH_SECRET` | String random panjang |
| `NEXTAUTH_URL` | `https://nama-project.vercel.app` |
| `ADMIN_USERNAME` | Username admin kamu |
| `ADMIN_PASSWORD` | Password admin kamu |

4. Klik **Deploy** 🚀

---

## 📋 Fitur

### Website Publik
- 🏠 **Home** — Hero section dengan statistik
- 📅 **Kategori Tahun** — 2014–2026, dropdown navigasi
- 🎙️ **Seminar/Konferensi** — Per tahun, embed YouTube
- 🎓 **Video Pelatihan** — Per tahun, embed YouTube & link manual
- ✉️ **Contact** — Form request akses

### Admin Panel (`/admin`)
- 🔐 Login dengan username & password
- ➕ Tambah video baru
- ✏️ Edit video
- 🗑️ Hapus video
- 🔍 Filter & search video
- 👁️ Preview thumbnail otomatis dari YouTube

---

## 📁 Struktur Project

```
kawanppm/
├── app/
│   ├── page.tsx                    ← Home page
│   ├── koleksi/[year]/page.tsx     ← Halaman per tahun
│   ├── contact/page.tsx            ← Halaman contact
│   ├── admin/
│   │   ├── page.tsx                ← Dashboard admin
│   │   ├── login/page.tsx          ← Login admin
│   │   └── videos/
│   │       ├── new/page.tsx        ← Form tambah video
│   │       └── [id]/edit/page.tsx  ← Form edit video
│   └── api/
│       ├── auth/[...nextauth]/     ← NextAuth API
│       └── videos/                ← CRUD API
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── VideoCard.tsx
│   ├── VideoForm.tsx
│   └── AdminVideoList.tsx
├── lib/
│   ├── db.ts                       ← Prisma client
│   ├── auth.ts                     ← NextAuth config
│   └── utils.ts                    ← Helper functions
└── prisma/
    └── schema.prisma               ← Database schema
```

---

## 🔧 Customisasi

### Ubah email & WhatsApp di Contact page
Edit file: `app/contact/page.tsx`

### Ubah teks Hero
Edit file: `app/page.tsx` — bagian Hero Section

### Tambah tahun koleksi
Edit file: `lib/utils.ts` → fungsi `getYears()`

---

## 📝 Cara Pakai Admin

1. Buka `/admin` → redirect ke login
2. Login dengan username & password dari `.env.local`
3. Klik **+ Tambah Video Baru**
4. Isi:
   - **Judul** (wajib)
   - **Kategori**: Seminar/Konferensi atau Pelatihan
   - **Tahun**: 2014–2026
   - **YouTube URL** → thumbnail otomatis terdeteksi
   - **Link Manual** (Google Drive, dll.)
5. Simpan → video langsung tampil di website
