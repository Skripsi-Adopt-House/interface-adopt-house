'use client';

import Layout from '@/components/Layout';
import { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    category: 'Adopsi',
    question: 'Apa persyaratan untuk mengadopsi hewan dari Melodi Kucing?',
    answer: 'Untuk mengadopsi, Anda harus berusia minimal 18 tahun, memiliki akun terverifikasi, dan bersedia menjalani proses wawancara singkat. Kami ingin memastikan setiap hewan mendapat rumah yang tepat dan pemilik yang bertanggung jawab. Beberapa hewan khusus mungkin memiliki persyaratan tambahan berdasarkan kebutuhan mereka.'
  },
  {
    id: 2,
    category: 'Adopsi',
    question: 'Berapa biaya adopsi?',
    answer: 'Biaya adopsi bervariasi tergantung pada hewan. Umumnya biaya mencakup vaksinasi awal, sterilisasi (jika diperlukan), pemeriksaan kesehatan, dan microchipping. Biaya ini membantu kami merawat hewan lain yang masih menunggu keluarga. Hubungi kami untuk detail harga spesifik untuk hewan yang Anda minati.'
  },
  {
    id: 3,
    category: 'Adopsi',
    question: 'Bagaimana proses adopsi bekerja?',
    answer: 'Proses adopsi kami dimulai dengan pemilihan hewan favorit, lalu pengisian formulir aplikasi, wawancara singkat, persetujuan, dan akhirnya pengambilan hewan. Seluruh proses biasanya memakan waktu 3-7 hari. Kami juga menyediakan dukungan pasca-adopsi untuk membantu adaptasi hewan Anda.'
  },
  {
    id: 4,
    category: 'Adopsi',
    question: 'Apakah saya bisa mengembalikan hewan jika tidak cocok?',
    answer: 'Ya, kami memiliki kebijakan return 30 hari tanpa pertanyaan. Kami mengerti bahwa kadang ada kecocokan yang tidak pas. Jika Anda mengembalikan hewan, kami akan membantu menemukan keluarga baru yang lebih sesuai. Tidak ada penalti finansial, hanya komitmen untuk kesejahteraan hewan.'
  },
  {
    id: 5,
    category: 'Kesehatan',
    question: 'Apakah hewan yang tersedia sudah divaksinasi?',
    answer: 'Ya, semua hewan kami telah menerima vaksinasi dasar dan pemeriksaan kesehatan lengkap. Catatan medis lengkap akan diberikan kepada Anda saat adopsi. Kami juga menyediakan panduan perawatan lanjutan dan rekomendasi dokter hewan yang terpercaya.'
  },
  {
    id: 6,
    category: 'Kesehatan',
    question: 'Berapa sering harus membawa hewan ke dokter hewan?',
    answer: 'Hewan muda (di bawah 1 tahun) sebaiknya diperiksa setiap 3-4 minggu. Hewan dewasa (1-7 tahun) sebaiknya diperiksa setahun sekali. Hewan senior (di atas 7 tahun) memerlukan pemeriksaan 2 kali setahun. Selalu bawa ke dokter jika ada tanda-tanda kesehatan yang mengganggu.'
  },
  {
    id: 7,
    category: 'Perawatan',
    question: 'Apa yang harus saya siapkan sebelum membawa hewan pulang?',
    answer: 'Siapkan perlengkapan dasar seperti tempat tidur, mangkuk makanan dan minum, mainan, makanan berkualitas, dan perlengkapan kebersihan (sikat, nail clipper). Untuk kucing, siapkan kotak pasir (litter box). Pastikan rumah Anda aman dari bahaya seperti kabel listrik dan bahan kimia berbahaya.'
  },
  {
    id: 8,
    category: 'Perawatan',
    question: 'Berapa banyak olahraga yang dibutuhkan hewan saya?',
    answer: 'Anjing umumnya memerlukan 30-60 menit olahraga per hari tergantung usia dan tingkat energi. Kucing lebih mandiri tetapi tetap perlu bermain 15-30 menit sehari. Aktivitas mental juga penting untuk kesejahteraan emosional mereka. Berkonsultasi dengan dokter hewan untuk rekomendasi spesifik.'
  },
  {
    id: 9,
    category: 'Perawatan',
    question: 'Bagaimana cara mengatasi hewan yang agresif atau berperilaku buruk?',
    answer: 'Pertama, bawa ke dokter hewan untuk menyingkirkan penyebab medis. Kemudian, pertimbangkan melatih profesional atau ahli perilaku hewan. Kami juga menyediakan sumber daya dan rekomendasi pelatih. Jangan ragu untuk menghubungi kami jika mengalami masalah perilaku.'
  },
  {
    id: 10,
    category: 'Nutrisi',
    question: 'Makanan apa yang terbaik untuk hewan peliharaan saya?',
    answer: 'Makanan berkualitas premium yang disesuaikan dengan usia, ukuran, dan kondisi kesehatan hewan adalah pilihan terbaik. Tanyakan kepada dokter hewan tentang rekomendasi merek khusus. Hindari makanan murah dengan bahan pengisi berlebihan. Transisi makanan baru secara bertahap untuk menghindari masalah pencernaan.'
  },
  {
    id: 11,
    category: 'Nutrisi',
    question: 'Apakah makanan buatan rumahan aman untuk hewan peliharaan?',
    answer: 'Makanan buatan rumahan bisa aman jika disiapkan dengan benar dan seimbang nutrisinya. Namun, sulit untuk memastikan semua nutrisi tercukupi. Konsultasikan dengan dokter hewan atau ahli gizi hewan sebelum membuat makanan sendiri untuk memastikan kualitas nutrisi yang optimal.'
  },
  {
    id: 12,
    category: 'Layanan',
    question: 'Apakah Melodi Kucing menawarkan layanan grooming atau boarding?',
    answer: 'Saat ini Melodi Kucing fokus pada layanan adopsi. Namun, kami memiliki kemitraan dengan beberapa grooming dan boarding facility terpercaya yang bisa kami rekomendasikan. Hubungi kami untuk referensi.'
  },
  {
    id: 13,
    category: 'Layanan',
    question: 'Apa itu program "Favorites"?',
    answer: 'Program Favorites memungkinkan Anda menandai hewan yang Anda sukai dan melacaknya. Anda akan mendapat notifikasi jika hewan yang Anda favoritkan tersedia. Ini memudahkan Anda untuk membuat keputusan adopsi dengan lebih matang.'
  },
  {
    id: 14,
    category: 'Layanan',
    question: 'Bagaimana cara menghubungi Melodi Kucing untuk pertanyaan lebih lanjut?',
    answer: 'Anda bisa menghubungi kami melalui halaman "Hubungi Kami" di website, email, telepon, atau media sosial. Tim kami siap membantu dengan pertanyaan atau masalah apa pun. Biasanya kami merespon dalam 24 jam.'
  }
];

export default function FAQPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));
  const filteredFaqs = selectedCategory 
    ? faqs.filter(faq => faq.category === selectedCategory)
    : faqs;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-primary font-semibold mb-2">Pertanyaan Umum</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Temukan jawaban atas pertanyaan umum tentang adopsi hewan, perawatan, dan layanan kami
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              selectedCategory === null
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Semua
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg"
            >
              <button
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="text-left flex-1">
                  <p className="text-xs font-semibold text-primary mb-2 uppercase">{faq.category}</p>
                  <p className="text-lg font-bold text-gray-900">{faq.question}</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <span
                    className={`text-2xl text-primary transition-transform duration-300 ${
                      expandedId === faq.id ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </div>
              </button>

              {expandedId === faq.id && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-16 bg-gradient-to-r from-accent to-soft-highlight rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Masih Ada Pertanyaan?</h2>
          <p className="text-gray-700 mb-6 text-lg">
            Hubungi tim kami langsung. Kami siap membantu Anda menemukan hewan peliharaan impian Anda.
          </p>
          <Link
            href="/hubungi-kami"
            className="inline-block px-8 py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            Hubungi Kami →
          </Link>
        </div>
      </div>
    </Layout>
  );
}
