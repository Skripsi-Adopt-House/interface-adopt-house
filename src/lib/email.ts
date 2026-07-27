import nodemailer from 'nodemailer';

// Konfigurasi email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

/**
 * Mengirim email kontak ke yayasanmelodikucing@gmail.com
 */
export async function sendContactEmail(contactData: ContactMessage) {
  const { name, email, phone, subject, message } = contactData;

  // Template email untuk yayasan (penerima)
  const yaasanEmailContent = `
    <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
      <div style="background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6499E9; border-bottom: 2px solid #6499E9; padding-bottom: 10px;">
          Pesan Baru dari Formulir Kontak
        </h2>
        
        <div style="margin-top: 20px;">
          <p><strong>Nama Pengirim:</strong> ${name}</p>
          <p><strong>Email Pengirim:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Telepon:</strong> ${phone}</p>` : ''}
          <p><strong>Subjek:</strong> ${subject}</p>
        </div>

        <div style="margin-top: 20px; background-color: #f9f9f9; padding: 15px; border-left: 4px solid #6499E9; border-radius: 5px;">
          <p><strong>Pesan:</strong></p>
          <p style="white-space: pre-wrap; color: #333;">${message}</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666;">
          <p>Pesan ini dikirim melalui formulir kontak Melodi Kucing pada ${new Date().toLocaleString('id-ID')}</p>
          <p>Silakan hubungi pengirim melalui informasi yang disediakan di atas.</p>
        </div>
      </div>
    </div>
  `;

  // Template email untuk pengirim (konfirmasi)
  const userEmailContent = `
    <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
      <div style="background-color: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6499E9;">Terima Kasih atas Pesan Anda!</h2>
        
        <p>Halo <strong>${name}</strong>,</p>
        
        <p>Kami telah menerima pesan Anda dengan subjek "<strong>${subject}</strong>". 
        Tim Melodi Kucing akan meninjaunya dan akan menghubungi Anda dalam waktu 24 jam.</p>

        <div style="margin-top: 20px; background-color: #f9f9f9; padding: 15px; border-left: 4px solid #6499E9; border-radius: 5px;">
          <p><strong>Ringkasan Pesan Anda:</strong></p>
          <p style="white-space: pre-wrap; color: #333; max-height: 200px; overflow: hidden;">${message.substring(0, 300)}${message.length > 300 ? '...' : ''}</p>
        </div>

        <div style="margin-top: 20px;">
          <p><strong>Informasi Kontak Kami:</strong></p>
          <p>
            📧 Email: <a href="mailto:yayasanmelodikucing@gmail.com">yayasanmelodikucing@gmail.com</a><br>
            📞 Telepon: (+62) 813-1120-3475<br>
            ⏰ Jam Operasional: Senin - Jumat, 09:00 - 17:00
          </p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666;">
          <p>Terima kasih telah menghubungi Melodi Kucing. Kami senang melayani Anda!</p>
          <p style="margin-top: 10px;">
            <strong>Melodi Kucing - Temukan Hewan Peliharaan Sempurna Anda</strong>
          </p>
        </div>
      </div>
    </div>
  `;

  try {
    // Kirim email ke yayasan
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'yayasanmelodikucing@gmail.com',
      subject: `[Melodi Kucing] Pesan Baru: ${subject}`,
      html: yaasanEmailContent,
      replyTo: email,
    });

    // Kirim email konfirmasi ke pengirim
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Konfirmasi Pesan Diterima - Melodi Kucing',
      html: userEmailContent,
    });

    return { success: true, message: 'Email berhasil dikirim' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Gagal mengirim email');
  }
}
