<div align="center">

# 📱 Ionic Data Mahasiswa
### Aplikasi CRUD dengan Local Storage

![Ionic](https://img.shields.io/badge/Ionic-7+-3880FF?style=for-the-badge&logo=ionic&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-17+-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-5+-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)

> Tugas Praktikum Pertemuan 7 Roy Zikin — Mata Kuliah **Pemrograman Bergerak**  
> Dosen: **Rosidin, S.Kom., M.Kom.**

</div>

---

## 📖 Tentang Aplikasi

Aplikasi mobile hybrid berbasis **Ionic + Angular** untuk mengelola data mahasiswa secara lokal di perangkat. Dibangun sebagai studi kasus implementasi CRUD (Create, Read, Update, Delete) tanpa koneksi internet menggunakan **Capacitor Preferences** sebagai penyimpanan lokal.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| ➕ **Tambah Data** | Form input mahasiswa dengan validasi lengkap |
| 📋 **Lihat Data** | Daftar semua mahasiswa yang tersimpan |
| ✏️ **Edit Data** | Ubah nama dan jurusan via Alert Input |
| 🗑️ **Hapus Data** | Hapus data dengan konfirmasi alert |
| 💾 **Local Storage** | Data tersimpan permanen di memori HP |
| ✅ **Validasi Form** | Validasi input real-time dengan pesan error |

---

## 🏗️ Teknologi yang Digunakan

- **Ionic Framework 7+** — Komponen UI mobile
- **Angular 17+** — Framework frontend (Standalone Component)
- **Capacitor Preferences** — Penyimpanan data lokal di device
- **Reactive Forms** — Manajemen & validasi form
- **TypeScript** — Bahasa pemrograman utama

---

## 📂 Struktur Project

```
src/app/
├── 🏠 home/                  # Halaman daftar mahasiswa
│   ├── home.page.ts
│   ├── home.page.html
│   └── home.page.scss
│
├── ➕ tambah-mhs/            # Halaman tambah & edit mahasiswa
│   ├── tambah-mhs.page.ts
│   ├── tambah-mhs.page.html
│   └── tambah-mhs.page.scss
│
├── 🔍 detail/                # Halaman detail mahasiswa
│   ├── detail.page.ts
│   ├── detail.page.html
│   └── detail.page.scss
│
└── 🔧 services/
    └── data-mahasiswa.service.ts   # Service CRUD + Local Storage
```

---

## 🚀 Cara Menjalankan Project

> ⚠️ **Wajib** install ulang `node_modules` setelah clone karena folder tersebut tidak ikut di-upload ke GitHub.

### 1. Clone Repository

```bash
git clone https://github.com/oci-cmd/ionic-save-data-local.git
cd ionic-save-data-local
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Jalankan di Browser

```bash
ionic serve
```

Buka browser dan akses: **http://localhost:8100**

---

## 🗺️ Alur Navigasi Aplikasi

```
Home (Daftar)
  │
  ├── [Tap item]   ──► Detail Mahasiswa
  │                       ├── [Edit]  ──► Form Edit
  │                       └── [Hapus] ──► Konfirmasi → Hapus
  │
  └── [Tombol +]   ──► Form Tambah Mahasiswa
```

---

## 📋 Konsep yang Dipelajari

### 🔷 Reactive Forms
Form dikelola sepenuhnya di TypeScript, bukan di HTML. Menggunakan `FormBuilder` dan `Validators` bawaan Angular.

```typescript
this.formMahasiswa = this.formBuilder.group({
  nama:    ['', [Validators.required, Validators.minLength(5)]],
  nim:     ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
  jurusan: ['', [Validators.required]]
});
```

### 🔷 Capacitor Preferences (Local Storage)
Data disimpan secara permanen di memori perangkat dalam format JSON.

```typescript
// Simpan data
await Preferences.set({ key: 'data_mahasiswa', value: JSON.stringify(data) });

// Baca data
const { value } = await Preferences.get({ key: 'data_mahasiswa' });
```

### 🔷 Sliding Item (Geser untuk Aksi)
Tombol Edit dan Hapus muncul saat item digeser ke kiri menggunakan `ion-item-sliding`.

---

## 👨‍💻 Informasi

<div align="center">

Dibuat untuk keperluan praktikum akademik  
Mata Kuliah Pemrograman Bergerak

</div>
