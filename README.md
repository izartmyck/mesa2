# Profil Negeri Mesa

Situs ini merupakan website statis HTML, CSS, dan JavaScript. Tidak perlu
menjalankan proses build atau memasang dependency untuk menerbitkannya.

## Hosting di GitHub Pages

1. Unggah seluruh isi folder ini ke repository GitHub, termasuk folder `assets`
   dan folder `.github/workflows`.
2. Pastikan branch utama repository bernama `main` atau `master`. Workflow
   deployment berjalan otomatis saat ada push ke salah satu branch tersebut.
   Jika branch utama memakai nama lain, tambahkan namanya pada daftar `branches`
   di `.github/workflows/deploy.yml`.
3. Buka **Settings → Pages** di repository dan pilih **GitHub Actions** sebagai
   build and deployment source.
4. Buka tab **Actions** dan tunggu workflow **Deploy static site to GitHub
   Pages** selesai. URL website akan terlihat pada halaman workflow dan
   **Settings → Pages**.

Semua referensi stylesheet, JavaScript, gambar, dan video menggunakan path
relatif agar tetap berfungsi pada alamat GitHub Pages, termasuk repository
Pages yang menggunakan subpath. Jangan memindahkan `index.html` atau folder
`assets` dari susunan saat ini tanpa memperbarui referensinya.
