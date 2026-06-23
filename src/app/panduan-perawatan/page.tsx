'use client';

import Layout from '@/components/Layout';
import Link from 'next/link';

export default function PanduanPerawatanPage() {
  const petCareGuides = [
    {
      id: 1,
      title: 'Panduan Merawat Anjing',
      icon: '🐕',
      sections: [
        {
          subtitle: 'Nutrisi dan Makanan',
          content: [
            'Berikan makanan berkualitas tinggi yang sesuai dengan usia anjing Anda',
            'Anjing dewasa membutuhkan makanan 1-2 kali sehari',
            'Pastikan selalu ada air bersih yang tersedia',
            'Hindari makanan berbahaya seperti cokelat, anggur, dan makanan berlemak',
            'Konsultasikan dengan dokter hewan tentang jenis makanan terbaik'
          ]
        },
        {
          subtitle: 'Kesehatan dan Vaksinasi',
          content: [
            'Berikan vaksin sesuai jadwal yang direkomendasikan dokter hewan',
            'Lakukan pemeriksaan kesehatan rutin setiap 6-12 bulan',
            'Berikan obat cacing dan perlindungan dari parasit secara teratur',
            'Jaga kesehatan gigi dengan sikat gigi atau makanan khusus',
            'Perhatikan perubahan perilaku atau kesehatan yang tidak normal'
          ]
        },
        {
          subtitle: 'Olahraga dan Aktivitas',
          content: [
            'Anjing membutuhkan olahraga minimal 30-60 menit per hari',
            'Ajak jalan-jalan atau bermain di taman secara rutin',
            'Aktivitas mental penting untuk kesejahteraan anjing',
            'Berikan mainan interaktif untuk mencegah kebosanan',
            'Aktivitas fisik membantu menjaga berat badan ideal'
          ]
        },
        {
          subtitle: 'Perawatan dan Kebersihan',
          content: [
            'Mandi anjing setiap 4-6 minggu atau sesuai kebutuhan',
            'Sikat bulu secara rutin untuk mencegah kusut dan ketombe',
            'Potong kuku setiap 3-4 minggu',
            'Bersihkan telinga dengan lembut setiap minggu',
            'Sikat gigi minimal 3-4 kali per minggu'
          ]
        },
        {
          subtitle: 'Pelatihan dan Sosialisasi',
          content: [
            'Mulai pelatihan sejak anjing masih muda',
            'Gunakan reinforcement positif (pujian dan hadiah)',
            'Sosialisasikan anjing dengan orang lain dan hewan',
            'Ajarkan perintah dasar seperti duduk, diam, dan datang',
            'Konsisten dalam membuat aturan dan batasan'
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Panduan Merawat Kucing',
      icon: '🐱',
      sections: [
        {
          subtitle: 'Nutrisi dan Makanan',
          content: [
            'Kucing adalah karnivora, berikan makanan tinggi protein',
            'Berikan makanan berkualitas premium khusus kucing',
            'Kucing dewasa butuh makanan 1-2 kali sehari',
            'Sediakan air bersih setiap saat, beberapa kucing lebih suka air mengalir',
            'Hindari makanan beracun seperti bawang, cokelat, dan tuna kemasan berlebihan'
          ]
        },
        {
          subtitle: 'Kesehatan dan Vaksinasi',
          content: [
            'Vaksinasi dasar untuk kucing: FVRCP dan Rabies',
            'Lakukan pemeriksaan kesehatan 1-2 tahun sekali',
            'Program sterilisasi direkomendasikan untuk kesehatan jangka panjang',
            'Perhatikan tanda-tanda masalah kesehatan seperti diare atau muntah',
            'Perawatan gigi penting untuk kesehatan keseluruhan'
          ]
        },
        {
          subtitle: 'Olahraga dan Aktivitas',
          content: [
            'Kucing lebih mandiri tetapi butuh bermain 15-30 menit per hari',
            'Sediakan mainan seperti bola, tali, dan mainan interaktif',
            'Bangun papan percabangan (cat tree) untuk latihan fisik',
            'Aktivitas bermain merangsang naluri berburu alami',
            'Kucing indoor masih perlu stimulasi mental dan fisik'
          ]
        },
        {
          subtitle: 'Perawatan dan Kebersihan',
          content: [
            'Kucing adalah hewan yang sangat bersih, jarang perlu mandi',
            'Sikat bulu kucing 2-3 kali per minggu (lebih sering untuk bulu panjang)',
            'Potong kuku setiap 2-3 minggu atau sediakan cat scratcher',
            'Bersihkan area sekitar mata dan hidung jika ada cairan',
            'Periksa telinga secara berkala dan bersihkan jika perlu'
          ]
        },
        {
          subtitle: 'Lingkungan dan Ruang',
          content: [
            'Sediakan kotak pasir (litter box) yang bersih dan mudah diakses',
            'Ganti pasir kucing setiap hari dan cuci kotak seminggu sekali',
            'Berikan tempat tinggi untuk kucing duduk dan mengamati',
            'Kucing butuh area yang tenang dan aman untuk istirahat',
            'Sediakan jendela atau area untuk melihat ke luar'
          ]
        }
      ]
    },
    {
      id: 3,
      title: 'Panduan Adaptasi Hewan Baru',
      icon: '🏠',
      sections: [
        {
          subtitle: 'Persiapan Sebelum Kedatangan',
          content: [
            'Siapkan ruang khusus untuk hewan peliharaan baru',
            'Beli perlengkapan dasar seperti tempat tidur, mangkuk, dan mainan',
            'Pastikan rumah aman dari berbagai bahaya',
            'Pilih area tenang untuk adaptasi awal',
            'Siapkan makanan yang sama dengan yang diberikan shelter/penyelamat'
          ]
        },
        {
          subtitle: 'Hari-Hari Pertama',
          content: [
            'Biarkan hewan beradaptasi di ruang kecil terlebih dahulu',
            'Jangan terlalu banyak interaksi di hari pertama',
            'Biarkan hewan menjelajahi lingkungan baru dengan pace mereka',
            'Tetap tenang dan hindari suara keras yang menakutkan',
            'Monitor perilaku dan kebiasaan makan/minum mereka'
          ]
        },
        {
          subtitle: 'Sosialisasi Bertahap',
          content: [
            'Perluas akses ke area rumah secara perlahan',
            'Perkenalkan dengan anggota keluarga satu per satu',
            'Jika ada hewan lain, perkenalkan dengan hati-hati dan terpisah dulu',
            'Gunakan pujian dan hadiah untuk membuat pengalaman positif',
            'Beri waktu - adaptasi bisa memakan waktu minggu atau bulan'
          ]
        },
        {
          subtitle: 'Membangun Kepercayaan',
          content: [
            'Konsisten dengan rutinitas dan jadwal pemberian makan',
            'Gunakan suara lembut dan gerakan yang tidak mengancam',
            'Izinkan hewan untuk mendekati Anda dengan kecepatan mereka',
            'Hindari dipaksa untuk bermain atau berinteraksi',
            'Bangun kebiasaan positif melalui pujian dan reward'
          ]
        }
      ]
    },
    {
      id: 4,
      title: 'Panduan Kesehatan Hewan',
      icon: '⚕️',
      sections: [
        {
          subtitle: 'Tanda-Tanda Hewan Sakit',
          content: [
            'Perubahan nafsu makan atau minum yang signifikan',
            'Tinja atau urin yang tidak normal (diare, sembelit, darah)',
            'Muntah berulang atau menolak makan',
            'Lethargy (kelesuan) atau perubahan energi ekstrem',
            'Kesulitan bergerak atau pincang yang berkelanjutan',
            'Perubahan perilaku yang signifikan atau agresivitas baru'
          ]
        },
        {
          subtitle: 'Perawatan Preventif',
          content: [
            'Vaksinasi rutin sesuai jadwal dokter hewan',
            'Program kontrol parasit (cacing dan kutu)',
            'Pemeriksaan gigi dan oral healthcare',
            'Penimbangan berat badan reguler',
            'Diskusi dengan dokter tentang nutrisi dan kebutuhan khusus',
            'Update vaksin penguat (booster) sesuai jadwal'
          ]
        },
        {
          subtitle: 'Saat Memilih Dokter Hewan',
          content: [
            'Cari klinik dengan fasilitas lengkap dan dokter berpengalaman',
            'Pastikan jam layanan sesuai dengan kebutuhan Anda',
            'Tanyakan tentang layanan darurat 24 jam',
            'Baca review dari pemilik hewan lain',
            'Bangun hubungan jangka panjang dengan satu dokter untuk kontinuitas perawatan'
          ]
        },
        {
          subtitle: 'Pertolongan Pertama Darurat',
          content: [
            'Keracunan: Hubungi dokter hewan segera, jangan mencoba mengeluarkan',
            'Cedera serius: Immobilisasi hewan dan segera bawa ke klinik',
            'Perdarahan: Tekan luka dengan kain bersih',
            'Kejang: Jauhkan dari benda berbahaya dan hubungi dokter',
            'Selalu memiliki nomor dokter hewan darurat siap'
          ]
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-6">
            <p className="text-primary font-semibold mb-2">Panduan Lengkap</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Panduan Perawatan Hewan Peliharaan
            </h1>
            <p className="text-xl text-gray-600">
              Pelajari cara terbaik untuk merawat hewan peliharaan Anda agar tetap sehat dan bahagia
            </p>
          </div>
        </div>

        {/* Guides */}
        <div className="space-y-12">
          {petCareGuides.map((guide) => (
            <div key={guide.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Guide Header */}
              <div className="bg-gradient-to-r from-primary to-secondary p-8">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{guide.icon}</span>
                  <h2 className="text-3xl font-bold text-gray-900">{guide.title}</h2>
                </div>
              </div>

              {/* Guide Sections */}
              <div className="p-8">
                <div className="space-y-8">
                  {guide.sections.map((section, idx) => (
                    <div key={idx}>
                      <h3 className="text-2xl font-bold text-primary mb-4">{section.subtitle}</h3>
                      <ul className="space-y-3">
                        {section.content.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex gap-3">
                            <span className="text-primary font-bold mt-1">•</span>
                            <span className="text-gray-700 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Siap Menemukan Teman Baru Anda?</h2>
          <p className="mb-6 text-lg opacity-90">Jelajahi koleksi hewan kami yang menunggu untuk diadopsi dan dipelihara dengan penuh kasih sayang</p>
          <Link
            href="/pets"
            className="inline-block px-8 py-3 bg-white text-primary rounded-xl font-bold hover:shadow-lg transition-shadow"
          >
            Jelajahi Hewan Tersedia →
          </Link>
        </div>
      </div>
    </Layout>
  );
}
