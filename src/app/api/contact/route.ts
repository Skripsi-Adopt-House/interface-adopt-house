import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validasi
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Field yang diperlukan tidak lengkap' },
        { status: 400 }
      );
    }

    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format email tidak valid' },
        { status: 400 }
      );
    }

    // Kirim email
    await sendContactEmail({
      name,
      email,
      phone: phone || '',
      subject,
      message,
    });

    return NextResponse.json(
      { success: true, message: 'Pesan Anda telah dikirim' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: error.message || 'Gagal mengirim pesan' },
      { status: 500 }
    );
  }
}
