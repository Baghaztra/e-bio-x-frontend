# E-Bio-X

Platform E-Learning Biologi berbasis web yang dibangun menggunakan Nuxt 3, Bootstrap, dan Vue Form Generator.

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

## Prasyarat

- Node.js (versi 16 atau lebih tinggi)
- NPM atau Yarn
- Git

## Instalasi

1. Clone repositori ini:
```bash
git clone https://github.com/username/e-bio-x.git
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
├── .nuxt/               # Build files
├── components/          # Komponen Vue yang dapat digunakan kembali
├── layouts/             # Layout aplikasi
│   └── default.vue      # Layout default dengan header dan footer
├── pages/              # Halaman-halaman aplikasi
│   ├── index.vue       # Halaman utama
│   ├── login.vue       # Halaman login
│   └── teacher/        # Halaman khusus guru
│       └── create-quiz.vue  # Halaman pembuatan kuis
├── public/             # Asset statis
├── .env               # Konfigurasi environment
├── nuxt.config.ts     # Konfigurasi Nuxt
└── package.json       # Dependensi dan script
```

## Penggunaan

### Login

- Akses halaman login di `/login`
- Pilih tipe user (Admin/Guru/Siswa)
- Masukkan kredensial

### Pembuatan Kuis (Guru)

1. Login sebagai guru
2. Akses halaman pembuatan kuis di `/teacher/create-quiz`
3. Isi informasi kuis
4. Tambahkan pertanyaan dengan berbagai tipe (pilihan ganda/teks)
5. Simpan kuis

## Pengembangan

### Menambahkan Halaman Baru

1. Buat file `.vue` baru di direktori `pages/`
2. Halaman akan otomatis tersedia sesuai struktur folder

### Menambahkan Komponen

1. Buat komponen di direktori `components/`
2. Import dan gunakan di halaman yang diinginkan

## Kontribusi

1. Fork repositori
2. Buat branch fitur (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -am 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## Lisensi

[MIT License](LICENSE)

## Kontak

Untuk pertanyaan dan dukungan, silakan hubungi [email@example.com](mailto:email@example.com)

## Catatan Teknis Pengembangan

### Autentikasi
```typescript
// Contoh implementasi middleware auth
// TODO: Implementasikan di middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token')
  if (!token.value && to.path !== '/login') {
    return navigateTo('/login')
  }
})
```

### API Integration
```typescript
// TODO: Implementasikan di composables/useApi.ts
export const useApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl

  return {
    // Implementasi method API
  }
}
```

### State Management
```typescript
// TODO: Implementasikan di stores/user.ts
export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: false
  }),
  actions: {
    // Implementasi actions
  }
})
```

### Environment Variables yang Dibutuhkan
```env
# TODO: Lengkapi di .env
NUXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NUXT_PUBLIC_API_VERSION=v1
NUXT_PUBLIC_JWT_SECRET=your-jwt-secret-key
NUXT_PUBLIC_APP_NAME=E-Bio-X
NUXT_PUBLIC_APP_DESCRIPTION="Platform E-Learning Biologi"
```

### Struktur Database (Draft)
```sql
-- Users Table
CREATE TABLE users (
  id INT PRIMARY KEY,
  email VARCHAR(255),
  password VARCHAR(255),
  role ENUM('admin', 'teacher', 'student'),
  name VARCHAR(255),
  created_at TIMESTAMP
);

-- Classes Table
CREATE TABLE classes (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  code VARCHAR(10),
  teacher_id INT,
  created_at TIMESTAMP,
  FOREIGN KEY (teacher_id) REFERENCES users(id)
);

-- Class Enrollments
CREATE TABLE class_enrollments (
  class_id INT,
  student_id INT,
  joined_at TIMESTAMP,
  FOREIGN KEY (class_id) REFERENCES classes(id),
  FOREIGN KEY (student_id) REFERENCES users(id)
);

-- Materials Table
CREATE TABLE materials (
  id INT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  file_path VARCHAR(255),
  class_id INT,
  uploaded_by INT,
  created_at TIMESTAMP,
  FOREIGN KEY (class_id) REFERENCES classes(id),
  FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

-- Quizzes Table
CREATE TABLE quizzes (
  id INT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  class_id INT,
  created_by INT,
  duration INT,
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  FOREIGN KEY (class_id) REFERENCES classes(id),
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Quiz Questions
CREATE TABLE quiz_questions (
  id INT PRIMARY KEY,
  quiz_id INT,
  question_text TEXT,
  question_type ENUM('multiple', 'text'),
  correct_answer TEXT,
  options JSON,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);

-- Quiz Attempts
CREATE TABLE quiz_attempts (
  id INT PRIMARY KEY,
  quiz_id INT,
  student_id INT,
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  score DECIMAL(5,2),
  answers JSON,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id),
  FOREIGN KEY (student_id) REFERENCES users(id)
);
```
