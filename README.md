# ANBI Consulting — Website Homepage

Struktur project ini dipecah per-bagian supaya gampang dimodifikasi tanpa
harus bongkar satu file besar.

## Struktur folder

```
anbi-website/
├── index.html              ← file jadi, dibuka di browser / di-upload ke hosting
├── index.template.html     ← "kerangka" halaman (head, urutan section)
├── build.js                ← script perakit component → index.html
├── components/              ← satu file per section homepage
│   ├── navbar.html
│   ├── hero.html
│   ├── about.html
│   ├── services.html
│   ├── cta-mid.html
│   ├── clients.html
│   ├── why-anbi.html
│   ├── workflow.html
│   ├── legality.html
│   ├── cta-final.html
│   └── footer.html
└── assets/
    ├── css/
    │   └── style.css        ← semua styling, dikelompokkan per section
    ├── js/
    │   └── main.js           ← navbar sticky, menu mobile, animasi scroll
    └── images/
        ├── hero-surabaya.jpg
        ├── about-office.jpg
        ├── footer-suramadu.jpg
        ├── logo-navy.png     ← logo untuk navbar (background terang)
        └── logo-white.png    ← logo untuk footer (background gelap)
```

## Cara kerja `index.html`

`index.html` adalah hasil rakitan otomatis dari `index.template.html` +
seluruh isi folder `components/`. **Jangan edit `index.html` langsung**
kalau ingin perubahan tetap tersimpan rapi — edit component-nya, lalu build
ulang. Tapi kalau cuma butuh tempel-cepat sekali pakai, edit `index.html`
langsung juga tidak masalah, hanya saja perubahan itu akan hilang kalau
suatu saat build ulang dari component.

## Cara modifikasi

**Ganti teks di satu section** (misalnya ubah judul di About):
1. Buka `components/about.html`
2. Edit teksnya
3. Jalankan `node build.js` di terminal, di dalam folder ini
4. `index.html` otomatis ter-update

**Ganti gambar:**
1. Ganti file di `assets/images/` dengan nama yang sama (atau ubah nama
   filenya dan sesuaikan path `src="..."` di component terkait)
2. Tidak perlu build ulang — gambar langsung ter-refresh saat browser dibuka

**Ganti warna / font:**
Semua token warna ada di bagian atas `assets/css/style.css`:
```css
:root {
  --navy-deep: #0B1F33;
  --navy: #102A43;
  --teal: #2F7F83;
  --warm-white: #F7F7F4;
  ...
}
```
Ubah nilai hex-nya, seluruh halaman ikut berubah (tidak perlu build).

**Tambah / hapus / urutkan ulang section:**
1. Buat file baru di `components/` (atau hapus yang tidak dipakai)
2. Tambah/hapus baris `<!-- COMPONENT: nama-file.html -->` di
   `index.template.html` sesuai urutan yang diinginkan
3. Jalankan `node build.js`

## Menjalankan build

Project ini **tidak punya dependency apapun** — jangan jalankan `npm install`,
itu tidak diperlukan dan tidak akan melakukan apa-apa (memang tidak ada
package untuk di-install). Yang dibutuhkan cuma Node.js ter-install di
komputer, lalu jalankan salah satu dari ini di dalam folder `anbi-website`:

```bash
node build.js
```

atau, sama saja, pakai:

```bash
npm run build
```

Kalau muncul error `'node' is not recognized`, berarti Node.js belum
ter-install — download versi LTS di https://nodejs.org, install, lalu buka
terminal baru dan coba lagi.

## Melihat hasil di browser

Cukup buka `index.html` langsung di browser (double-click), atau — supaya
path relatif dan reload lebih stabil — jalankan server lokal sederhana:

```bash
cd anbi-website
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

## Catatan konten

- Semua copywriting diambil dari `ANBI_Company_Profile_Indonesian.pptx`
  (tidak ada klaim/positioning baru).
- Struktur section & urutan mengikuti `ANBI_Homepage_Brief_Final.md`.
- Palet warna & tipografi (Manrope + Inter) mengikuti brief.
