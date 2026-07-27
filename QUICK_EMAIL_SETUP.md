# ⚙️ Konfigurasi Email untuk Melodi Kucing

## ⚡ Quick Setup

Sistem email contact form sudah terhubung ke **yayasanmelodikucing@gmail.com**. Untuk mengaktifkan:

### 1. Generate Gmail App Password
- Buka: https://myaccount.google.com/security
- Login dengan yayasanmelodikucing@gmail.com
- Aktifkan **2-Step Verification** (jika belum)
- Buat **App Password** (pilih Mail + Windows)
- Copy password 16 karakter (format: `xxxx xxxx xxxx xxxx`)

### 2. Update .env.local
```env
GMAIL_USER=yayasanmelodikucing@gmail.com
GMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

### 3. Restart Dev Server
```bash
npm run dev
```

## ✨ Fitur

✅ User kirim pesan via form kontak
✅ Email otomatis ke yayasanmelodikucing@gmail.com
✅ Email konfirmasi dikirim ke user
✅ Validasi email & form lengkap
✅ HTML email template profesional
✅ Error handling & user feedback

## 📧 Email yang Terkirim

1. **Ke Yayasan** - Detail pesan + info pengirim
2. **Ke User** - Konfirmasi + nomor kontak yayasan

## 🔒 Security
- Credentials disimpan di .env.local (tidak di-commit)
- App Password khusus (bukan akun password)
- Server-side processing (aman)

## 📞 Kontak
- Email: yayasanmelodikucing@gmail.com
- Telepon: (+62) 813-1120-3475

## 📖 Dokumentasi Lengkap
Lihat: `EMAIL_SETUP_GUIDE.md`
