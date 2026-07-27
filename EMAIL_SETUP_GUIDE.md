# Email Configuration Guide - Melodi Kucing

## Deskripsi

Sistem email pada aplikasi Melodi Kucing menggunakan **Gmail SMTP** melalui Nodemailer untuk mengirim:
1. **Email ke Yayasan** - Pesan dari user form kontak ke yayasanmelodikucing@gmail.com
2. **Email Konfirmasi** - Konfirmasi pesan diterima dikirim ke email user

## Setup Gmail App Password

Gmail tidak memungkinkan password akun biasa untuk aplikasi pihak ketiga. Anda harus membuat **App Password** khusus.

### Langkah 1: Aktifkan 2-Step Verification
1. Buka [Google Account Security](https://myaccount.google.com/security)
2. Login dengan akun yayasanmelodikucing@gmail.com
3. Di bagian "Signing in to Google", pilih "2-Step Verification"
4. Ikuti instruksi untuk menambahkan nomor telepon dan verifikasi

### Langkah 2: Buat App Password
1. Buka [Google Account Security](https://myaccount.google.com/security) lagi
2. Scroll ke bawah ke "App passwords" (akan muncul jika 2-Step Verification sudah aktif)
3. Pilih:
   - **App**: "Mail"
   - **Device**: "Windows Computer" (atau device yang sesuai)
4. Google akan generate password berbentuk: `xxxx xxxx xxxx xxxx` (16 karakter dengan spasi)
5. Copy password ini

### Langkah 3: Update .env.local
```env
GMAIL_USER=yayasanmelodikucing@gmail.com
GMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

Ganti `xxxx xxxx xxxx xxxx` dengan password yang sudah di-generate.

## File yang Terlibat

### Backend
- **src/lib/email.ts** - Utility untuk mengirim email dengan Nodemailer
- **src/app/api/contact/route.ts** - API endpoint POST /api/contact

### Frontend
- **src/app/hubungi-kami/page.tsx** - Contact form yang memanggil API

## Environment Variables

```env
# Gmail Configuration
GMAIL_USER=yayasanmelodikucing@gmail.com
GMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

## Cara Kerja

### 1. User Submit Form
User mengisi dan submit form di halaman "Hubungi Kami"

### 2. Frontend Validasi
```javascript
- Validasi field wajib (name, email, subject, message)
- Validasi format email
```

### 3. Frontend Kirim ke API
```javascript
POST /api/contact
{
  name: string,
  email: string,
  phone?: string,
  subject: string,
  message: string
}
```

### 4. Backend Process
- Validasi ulang data
- Setup Nodemailer dengan Gmail credentials
- Buat 2 email template (HTML format):
  - Email ke Yayasan (dengan detail pengirim)
  - Email Konfirmasi ke User
- Kirim kedua email

### 5. Response ke Frontend
```javascript
{
  success: true,
  message: "Pesan Anda telah dikirim"
}
```

### 6. User Notification
- Alert sukses ditampilkan
- Form direset
- User menerima email konfirmasi di inbox mereka
- Yayasan menerima email di yayasanmelodikucing@gmail.com

## Email Templates

### Email ke Yayasan
- Menampilkan semua info: nama, email, telepon, subjek, pesan
- Format profesional dengan styling
- Set "Reply-To" ke email pengirim
- Subject: `[Melodi Kucing] Pesan Baru: {subject}`

### Email Konfirmasi ke User
- Menampilkan preview pesan yang dikirim
- Info kontak yayasan
- Jam operasional
- Format ramah pengguna

## Troubleshooting

### Error: "Invalid login credentials"
- Pastikan sudah membuat App Password (bukan password biasa)
- Verifikasi 2-Step Verification sudah aktif
- Copy-paste password dengan benar (termasuk spasi)

### Error: "ECONNREFUSED"
- Cek koneksi internet
- Verifikasi Gmail credentials di .env.local
- Restart dev server

### Email tidak terkirim tapi API return sukses
- Cek Gmail Forwarding settings
- Verifikasi email address di GMAIL_USER
- Check Gmail's "Less secure app" atau App Passwords setting

## Development vs Production

### Development
```env
GMAIL_USER=yayasanmelodikucing@gmail.com
GMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```
- Email akan terkirim langsung dari dev server

### Production (Vercel)
1. Setup Gmail App Password (sama seperti di atas)
2. Add environment variable di Vercel:
   - Settings → Environment Variables
   - Tambah: `GMAIL_USER` dan `GMAIL_PASSWORD`
3. Re-deploy aplikasi

## Dependency
- **nodemailer** - SMTP client untuk Node.js
- **@types/nodemailer** - TypeScript types

Install: `npm install nodemailer @types/nodemailer`

## API Endpoint

```
POST /api/contact
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "user@example.com",
  "phone": "081234567890",
  "subject": "Pertanyaan Adopsi",
  "message": "Saya ingin bertanya tentang proses adopsi..."
}

Response (200):
{
  "success": true,
  "message": "Pesan Anda telah dikirim"
}

Response (400):
{
  "error": "Format email tidak valid"
}

Response (500):
{
  "error": "Gagal mengirim email"
}
```

## Testing

### Manual Test
1. Buka halaman http://localhost:3001/hubungi-kami
2. Isi form dengan data dummy:
   - Nama: "Test User"
   - Email: user@example.com (email yang ingin terima konfirmasi)
   - Subject: "Test"
   - Message: "Ini adalah pesan test"
3. Click "Kirim Pesan"
4. Verifikasi:
   - Alert sukses ditampilkan
   - Email diterima di user@example.com (konfirmasi)
   - Email diterima di yayasanmelodikucing@gmail.com (notifikasi)

## Notes
- Jangan commit .env.local ke Git (sudah di .gitignore)
- Jangan share App Password ke publik
- Rotate App Password setiap 6-12 bulan untuk security
- Monitor Gmail account untuk aktivitas mencurigakan
