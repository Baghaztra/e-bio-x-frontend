# E-Bio-X

Platform E-Learning Biologi berbasis web yang dibangun menggunakan Nuxt 3, Tailwind, dan Vue Form Generator.

## TODO List

### Autentikasi
- [ ] Implementasi sistem login dengan JWT
- [ ] Integrasi dengan backend API untuk autentikasi
- [ ] Manajemen session dan token
- [ ] Implementasi middleware untuk proteksi rute berdasarkan role user

### Halaman Admin
- [ ] Dashboard admin
- [ ] Manajemen pengguna (CRUD guru dan siswa)
- [ ] Monitoring aktivitas pembelajaran
- [ ] Pengaturan sistem

### Halaman Guru
- [ ] Implementasi backend untuk penyimpanan kuis
- [ ] Manajemen materi pembelajaran
  - [ ] Upload file materi (PDF, DOC, PPT)
  - [ ] Organisasi materi berdasarkan kelas
  - [ ] Preview materi online
- [ ] Manajemen Kelas
  - [ ] Pembuatan kelas baru
  - [ ] Generasi kode kelas unik
  - [ ] Monitoring aktivitas siswa
  - [ ] Pengelolaan daftar siswa
- [ ] Dashboard statistik kelas
  - [ ] Grafik performa kelas
  - [ ] Laporan aktivitas siswa
  - [ ] Statistik pengerjaan kuis

### Halaman Siswa
- [ ] Halaman dashboard siswa
  - [ ] Daftar kelas yang diikuti
  - [ ] Kuis yang perlu dikerjakan
  - [ ] Progress pembelajaran
- [ ] Sistem Kelas
  - [ ] Join kelas dengan kode
  - [ ] Akses materi pembelajaran
  - [ ] Melihat progress kelas
- [ ] Sistem pengerjaan kuis
  - [ ] Timer kuis
  - [ ] Auto-submit
  - [ ] Riwayat pengerjaan
- [ ] Riwayat dan nilai kuis

### Pengembangan Sistem
- [ ] Setup backend API dan database
  - [ ] Implementasi REST API
  - [ ] Sistem file storage untuk materi
  - [ ] Database untuk kuis dan nilai
- [ ] Implementasi error handling
- [ ] Sistem notifikasi
  - [ ] Email notifikasi
  - [ ] In-app notifications
- [ ] Optimasi performa
- [ ] Unit testing

## Fitur Utama

- Sistem autentikasi multi-user (Admin, Guru, Siswa)
- Manajemen kuis dan materi pembelajaran
- Form builder untuk pembuatan kuis
- Antarmuka responsif dengan Bootstrap 5
- Integrasi dengan backend API (dalam pengembangan)

## Requirments

- Node.js 
- NPM 

## Instalasi

1. Clone repositori ini:
```bash
git clone https://github.com/Baghaztra/e-bio-x.git
cd e-bio-x
```

2. Install dependensi:
```bash
npm install
# atau
yarn install
```

3. Salin file `.env.example` ke `.env` dan sesuaikan konfigurasi:
```bash
cp .env.example .env
```

4. Jalankan server development:
```bash
npm run dev
# atau
yarn dev
```

## Struktur Proyek

```
e-bio-x/
├── .nuxt/ 
├── components/ 
├── layouts/
├── pages/              # Halaman-halaman aplikasi
│   ├── index.vue       # Halaman utama
│   ├── login.vue       # Halaman login
│   └── teacher/        # Halaman khusus guru
│   └── student/        # Halaman khusus siswa
│   └── admin/          # Halaman khusus admin
├── public/
├── .env                # Konfigurasi environment
├── nuxt.config.ts 
└── package.json        # Dependensi dan script
```

### Environment Variables yang Dibutuhkan
```env
# API Configuration
NUXT_PUBLIC_BACKEND_URL=http://localhost:5000

# Authentication
NUXT_PUBLIC_JWT_SECRET=
NUXT_PUBLIC_GOOGLE_CLIENT_ID=
NUXT_PUBLIC_GOOGLE_CLIENT_SECRET=

# Other Configuration
NUXT_PUBLIC_APP_NAME=E-Bio-X
NUXT_PUBLIC_APP_DESCRIPTION="Platform E-Learning Biologi" 

```

## Lisensi

[MIT License](LICENSE)
