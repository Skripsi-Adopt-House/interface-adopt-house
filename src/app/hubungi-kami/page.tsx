'use client';

import Layout from '@/components/Layout';
import { useState } from 'react';
import AlertService from '@/lib/alert';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function HubungiKamiPage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      AlertService.error('Validasi', 'Harap isi semua field yang diperlukan');
      return;
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      AlertService.error('Validasi', 'Format email tidak valid');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulasi pengiriman pesan
      // Dalam aplikasi nyata, ini akan mengirim ke backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      AlertService.success(
        'Terima Kasih!',
        'Pesan Anda telah diterima. Tim kami akan menghubungi Anda dalam 24 jam.'
      );

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      AlertService.error('Error', 'Gagal mengirim pesan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: '📞',
      title: 'Telepon',
      content: '(+62) 813-1120-3475',
      subtext: 'Senin - Jumat, 09:00 - 17:00'
    },
    {
      icon: '📧',
      title: 'Email',
      content: 'yayasanmelodikucing@gmail.com',
      subtext: 'Respons dalam 24 jam'
    },
    {
      icon: '📍',
      title: 'Alamat',
      content: 'Jalan Kelapa Peon No. 99, RT.003/RW.004, Kelurahan Kebagusan, Kecamatan Pasar Minggu, Kota Jakarta Selatan, Daerah Khusus Ibu Kota Jakarta, Indonesia, 12520.',
      subtext: 'Jakarta Selatan, Indonesia'
    },
    {
      icon: '⏰',
      title: 'Jam Operasional',
      content: '09:00 - 17:00',
      subtext: 'Senin - Jumat (Libur weekend dan hari libur nasional)'
    }
  ];

  const socialLinks = [
    { icon: '📱', name: 'Instagram', handle: '@adopthouseid', link: '#' },
    { icon: '👍', name: 'Facebook', handle: 'Melodi Kucing Indonesia', link: '#' },
    { icon: '🐦', name: 'Twitter', handle: '@adopthouse_id', link: '#' },
    { icon: '▶️', name: 'YouTube', handle: 'Melodi Kucing Channel', link: '#' }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-primary font-semibold mb-2">Hubungi Kami</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Kami Ingin Mendengarkan Dari Anda
          </h1>
          <p className="text-xl text-gray-600">
            Memiliki pertanyaan tentang adopsi atau layanan kami? Hubungi kami dengan cara apapun yang nyaman untuk Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Methods */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Cara Menghubungi Kami</h2>
            <div className="space-y-6">
              {contactMethods.map((method, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{method.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{method.title}</h3>
                      <p className="text-primary font-semibold">{method.content}</p>
                      <p className="text-sm text-gray-600 mt-1">{method.subtext}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Media Sosial Kami</h2>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-primary hover:text-white transition-all text-center group"
                  >
                    <div className="text-3xl mb-2">{social.icon}</div>
                    <p className="font-bold text-gray-900 group-hover:text-white">{social.name}</p>
                    <p className="text-sm text-gray-600 group-hover:text-gray-100">{social.handle}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Kirim Pesan Kami</h2>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Nama *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  placeholder="Nama lengkap Anda"
                  disabled={isSubmitting}
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  placeholder="email@example.com"
                  disabled={isSubmitting}
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Telepon</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  placeholder="(021) 1234-5678"
                  disabled={isSubmitting}
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Subjek *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  disabled={isSubmitting}
                >
                  <option value="">Pilih subjek...</option>
                  <option value="pertanyaan-adopsi">Pertanyaan Adopsi</option>
                  <option value="keluhan">Keluhan/Feedback</option>
                  <option value="partnership">Kerjasama</option>
                  <option value="relawan">Bergabung Sebagai Relawan</option>
                  <option value="donasi">Program Donasi</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Pesan *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Tulis pesan Anda di sini..."
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-primary text-white rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
              </button>

              <p className="text-xs text-gray-600 mt-4">
                * Field yang wajib diisi
              </p>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gradient-to-r from-accent to-soft-highlight rounded-2xl p-8 md:p-12 text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Cari Jawaban Cepat?
          </h2>
          <p className="text-gray-700 mb-6">
            Mungkin pertanyaan Anda sudah dijawab di halaman FAQ kami yang lengkap.
          </p>
          <a
            href="/faq"
            className="inline-block px-8 py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            Buka FAQ →
          </a>
        </div>

        {/* Map Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Lokasi Kami</h2>
          <div className="bg-gray-300 rounded-lg overflow-hidden shadow-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <p className="text-4xl mb-4">📍</p>
              <p className="text-gray-700 font-semibold">
                Jalan Kelapa Peon No. 99, RT.003/RW.004, Kelurahan Kebagusan, Kecamatan Pasar Minggu, Kota Jakarta Selatan, Daerah Khusus Ibu Kota Jakarta, Indonesia, 12520.
              </p>
              <p className="text-gray-600 mt-2">
                Hubungi kami untuk petunjuk arah atau kunjungan
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
