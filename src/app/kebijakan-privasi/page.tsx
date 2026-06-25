'use client';

import Layout from '@/components/Layout';

export default function KebijakanPrivasiPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Kebijakan Privasi
          </h1>
          <p className="text-gray-600">
            Terakhir diperbarui: 22 Juni 2026
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl prose prose-lg text-gray-700 space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Pendahuluan</h2>
            <p className="leading-relaxed">
              Melodi Kucing ("kami," "kami," atau "Perusahaan") berkomitmen untuk melindungi privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, dan menjaga informasi Anda ketika Anda mengunjungi situs web kami (website dan aplikasi mobile kami, secara kolektif, "Situs") dan menggunakan layanan kami.
            </p>
            <p className="leading-relaxed">
              Harap baca Kebijakan Privasi ini dengan hati-hati. Jika Anda tidak setuju dengan kebijakan kami, silakan jangan menggunakan Situs kami atau layanan kami.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Informasi yang Kami Kumpulkan</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-2">Informasi yang Anda Berikan</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Informasi Akun:</strong> Nama lengkap, alamat email, nomor telepon, alamat fisik, tanggal lahir</li>
                  <li><strong>Informasi Pembayaran:</strong> Detail kartu kredit, informasi rekening bank (diproses dengan aman melalui gateway pembayaran pihak ketiga)</li>
                  <li><strong>Informasi Profil:</strong> Foto profil, preferensi hewan peliharaan, pengalaman sebelumnya dengan hewan</li>
                  <li><strong>Komunikasi:</strong> Pesan yang Anda kirim melalui formulir kontak, email, atau live chat</li>
                  <li><strong>Aplikasi Adopsi:</strong> Informasi dalam formulir aplikasi adopsi dan dokumen terkait</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-primary mb-2">Informasi yang Dikumpulkan Secara Otomatis</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Data Log:</strong> Alamat IP, jenis browser, halaman yang dikunjungi, waktu dan durasi kunjungan</li>
                  <li><strong>Cookie dan Teknologi Tracking:</strong> Informasi tentang perangkat dan preferensi browsing Anda</li>
                  <li><strong>Data Lokasi:</strong> Lokasi perkiraan berdasarkan alamat IP (jika Anda mengizinkan)</li>
                  <li><strong>Informasi Perangkat:</strong> Jenis perangkat, sistem operasi, ID perangkat unik</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-primary mb-2">Informasi dari Pihak Ketiga</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Informasi dari platform media sosial (jika Anda menghubungkan akun Anda)</li>
                  <li>Informasi dari mitra layanan pembayaran dan verifikasi identitas</li>
                  <li>Informasi dari referensi yang Anda berikan dalam aplikasi adopsi</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Bagaimana Kami Menggunakan Informasi Anda</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Memproses pendaftaran akun dan permintaan adopsi Anda</li>
              <li>Memverifikasi identitas dan kualifikasi Anda untuk adopsi</li>
              <li>Memberikan dukungan pelanggan dan merespons pertanyaan Anda</li>
              <li>Mengirim update tentang aplikasi adopsi dan status hewan</li>
              <li>Memproses pembayaran dan transaksi</li>
              <li>Mengirim komunikasi pemasaran (dengan persetujuan Anda)</li>
              <li>Meningkatkan dan mengoptimalkan Situs dan layanan kami</li>
              <li>Menganalisis tren penggunaan dan preferensi pengguna</li>
              <li>Mematuhi kewajiban hukum dan melindungi hak kami</li>
              <li>Mencegah penipuan dan keamanan cyber</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Berbagi Informasi Anda</h2>
            <p className="leading-relaxed mb-4">
              Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga. Namun, kami dapat membagikan informasi dalam situasi berikut:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Penyedia Layanan:</strong> Dengan vendor yang membantu kami menjalankan Situs dan layanan kami (hosting, pembayaran, analitik)</li>
              <li><strong>Mitra Adopsi:</strong> Dengan administrator hewan peliharaan dan klinik veteriner sebagai bagian dari proses adopsi</li>
              <li><strong>Kewajiban Hukum:</strong> Jika diwajibkan oleh hukum, keputusan pengadilan, atau otoritas pemerintah</li>
              <li><strong>Perlindungan Hak:</strong> Jika diperlukan untuk melindungi, menegakkan, atau menerapkan perjanjian dan hak kami</li>
              <li><strong>Akuisisi Bisnis:</strong> Jika Melodi Kucing dijual, digabung, atau diakuisisi, informasi Anda mungkin akan ditransfer</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Keamanan Informasi</h2>
            <p className="leading-relaxed">
              Kami mengimplementasikan standar keamanan teknis dan organisasi untuk melindungi informasi pribadi Anda terhadap akses, perubahan, pengungkapan, atau penghancuran yang tidak sah. Ini termasuk enkripsi SSL, firewall, dan kontrol akses yang ketat.
            </p>
            <p className="leading-relaxed">
              Namun, tidak ada metode transmisi Internet atau penyimpanan elektronik yang 100% aman. Kami tidak dapat menjamin keamanan absolut informasi Anda.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Retensi Data</h2>
            <p className="leading-relaxed">
              Kami menyimpan informasi pribadi Anda selama diperlukan untuk memberikan layanan, mematuhi kewajiban hukum, menyelesaikan transaksi, atau mencapai tujuan lain yang dijelaskan dalam kebijakan ini. Anda dapat meminta penghapusan data kapan saja dengan menghubungi kami.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Hak Privasi Anda</h2>
            <p className="leading-relaxed mb-4">
              Tergantung pada lokasi Anda, Anda mungkin memiliki hak berikut mengenai informasi pribadi Anda:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Akses:</strong> Hak untuk mengakses informasi pribadi yang kami miliki tentang Anda</li>
              <li><strong>Koreksi:</strong> Hak untuk memperbaiki informasi yang tidak akurat atau tidak lengkap</li>
              <li><strong>Penghapusan:</strong> Hak untuk meminta penghapusan informasi pribadi Anda</li>
              <li><strong>Portabilitas:</strong> Hak untuk menerima data Anda dalam format yang dapat dipindahkan</li>
              <li><strong>Keberatan:</strong> Hak untuk keberatan terhadap pemrosesan tertentu dari data pribadi Anda</li>
            </ul>
            <p className="leading-relaxed mt-4">
              Untuk menggunakan hak-hak ini, silakan hubungi kami di privacy@adopthouse.com
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Cookie dan Teknologi Tracking</h2>
            <p className="leading-relaxed">
              Kami menggunakan cookie dan teknologi serupa untuk:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Mengingat preferensi Anda</li>
              <li>Melacak penggunaan Situs untuk tujuan analitik</li>
              <li>Menyediakan konten yang dipersonalisasi</li>
              <li>Menampilkan iklan yang relevan</li>
            </ul>
            <p className="leading-relaxed mt-4">
              Anda dapat mengontrol cookie melalui pengaturan browser Anda. Namun, menonaktifkan cookie mungkin mengurangi fungsionalitas Situs.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Tautan Pihak Ketiga</h2>
            <p className="leading-relaxed">
              Situs kami mungkin berisi tautan ke situs web pihak ketiga. Kami tidak bertanggung jawab atas praktik privasi situs-situs tersebut. Kami mendorong Anda untuk membaca kebijakan privasi mereka sebelum memberikan informasi pribadi.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">10. Privasi Anak-Anak</h2>
            <p className="leading-relaxed">
              Situs kami tidak ditujukan untuk anak-anak di bawah 13 tahun. Kami tidak secara sadar mengumpulkan informasi pribadi dari anak-anak di bawah 13 tahun. Jika kami mengetahui bahwa kami telah mengumpulkan informasi dari anak di bawah 13 tahun, kami akan menghapusnya segera.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">11. Perubahan Kebijakan Privasi</h2>
            <p className="leading-relaxed">
              Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan memberi tahu Anda tentang perubahan material dengan memposting kebijakan yang diperbarui di Situs dan memperbarui tanggal "Terakhir Diperbarui" di bagian atas halaman ini.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">12. Hubungi Kami</h2>
            <p className="leading-relaxed">
              Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau praktik privasi kami, silakan hubungi kami:
            </p>
            <div className="bg-gray-100 p-6 rounded-lg mt-4">
              <p><strong>Yayasan Melodi Kucing</strong></p>
              <p>Email: yayasanmelodikucing@gmail.com</p>
              <p>Telepon: (+62) 813-1120-3475</p>
              <p>Alamat: Jalan Kelapa Peon No. 99, RT.003/RW.004, Kelurahan Kebagusan, Kecamatan Pasar Minggu, Kota Jakarta Selatan, Daerah Khusus Ibu Kota Jakarta, Indonesia, 12520.</p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
