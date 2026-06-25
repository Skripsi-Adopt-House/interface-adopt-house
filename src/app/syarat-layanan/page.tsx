'use client';

import Layout from '@/components/Layout';

export default function SyaratLayananPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Syarat dan Ketentuan Layanan
          </h1>
          <p className="text-gray-600">
            Terakhir diperbarui: 22 Juni 2026
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl prose prose-lg text-gray-700 space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Penerimaan Syarat-Syarat</h2>
            <p className="leading-relaxed">
              Dengan mengakses dan menggunakan situs web Melodi Kucing (website dan aplikasi mobile, secara kolektif, "Situs") serta layanannya ("Layanan"), Anda menyetujui untuk terikat oleh Syarat dan Ketentuan Layanan ini ("Perjanjian"). Jika Anda tidak setuju dengan salah satu bagian dari perjanjian ini, maka Anda tidak memiliki hak untuk menggunakan Situs atau Layanan kami.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Lisensi dan Penggunaan yang Diizinkan</h2>
            <p className="leading-relaxed mb-4">
              Melodi Kucing memberikan Anda lisensi terbatas, non-eksklusif, tidak dapat dialihkan, dan dapat dicabut untuk mengakses dan menggunakan Situs dan Layanan untuk tujuan pribadi, tidak komersial. Penggunaan Anda dibatasi oleh ketentuan berikut:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Anda tidak boleh mereproduksi, mendistribusikan, atau mentransmisikan konten kami tanpa izin tertulis</li>
              <li>Anda tidak boleh menggunakan Situs atau Layanan untuk tujuan ilegal atau melanggar hukum</li>
              <li>Anda tidak boleh mengakses atau mencoba mengakses bagian yang tidak tersedia untuk Anda</li>
              <li>Anda tidak boleh menggunakan bot, scraper, atau alat otomatis lainnya untuk mengakses Situs</li>
              <li>Anda tidak boleh mengganggu atau mengganggu operasi normal Situs</li>
              <li>Anda tidak boleh mengunggah virus, malware, atau kode berbahaya lainnya</li>
              <li>Anda tidak boleh melakukan spam, phishing, atau social engineering</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Pendaftaran dan Akun Pengguna</h2>
            <p className="leading-relaxed mb-4">
              Untuk menggunakan Layanan kami, Anda harus membuat akun dan memberikan informasi yang akurat, lengkap, dan terkini. Anda bertanggung jawab atas:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Menjaga kerahasiaan nama pengguna dan kata sandi Anda</li>
              <li>Semua aktivitas yang terjadi di bawah akun Anda</li>
              <li>Memberitahu kami segera tentang penggunaan akun Anda yang tidak sah</li>
            </ul>
            <p className="leading-relaxed mt-4">
              Kami berhak untuk menangguhkan atau menghapus akun yang kami yakini melanggar perjanjian ini atau digunakan secara tidak sah.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Proses Adopsi</h2>
            <p className="leading-relaxed mb-4">
              Melodi Kucing menyediakan platform untuk menghubungkan calon pemilik dengan hewan peliharaan yang dapat diadopsi. Dengan mengajukan aplikasi adopsi, Anda menyatakan bahwa:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Anda berusia minimal 18 tahun</li>
              <li>Informasi yang Anda berikan dalam aplikasi adalah benar dan akurat</li>
              <li>Anda memiliki kapasitas hukum dan keuangan untuk merawat hewan</li>
              <li>Anda akan menyediakan rumah yang aman dan terapi untuk hewan</li>
              <li>Anda akan mematuhi semua undang-undang perlindungan hewan yang berlaku</li>
            </ul>
            <p className="leading-relaxed mt-4">
              Melodi Kucing berhak untuk menolak aplikasi adopsi dan mengembalikan hewan jika kami menentukan bahwa rumah tidak sesuai. Kami tidak bertanggung jawab atas kesejahteraan hewan setelah adopsi.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Biaya dan Pembayaran</h2>
            <p className="leading-relaxed mb-4">
              Layanan adopsi kami mungkin memerlukan biaya. Dengan melakukan pembayaran, Anda menyetujui:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Semua biaya akan ditampilkan sebelum Anda menyelesaikan transaksi</li>
              <li>Pembayaran bersifat non-refundable kecuali dalam kasus tertentu</li>
              <li>Anda memberi otorisasi kepada kami untuk mendebit akun pembayaran Anda</li>
              <li>Kami menggunakan gateway pembayaran pihak ketiga yang aman untuk memproses transaksi</li>
            </ul>
            <p className="leading-relaxed mt-4">
              Jika Anda ingin mengembalikan hewan dalam 30 hari pertama, hubungi kami untuk detail tentang kebijakan pengembalian kami.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Konten Pengguna</h2>
            <p className="leading-relaxed mb-4">
              Jika Anda mengunggah, memposting, atau menyebarkan konten apa pun di Situs (ulasan, foto, pesan), Anda:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Mewakili bahwa Anda memiliki semua hak untuk konten tersebut</li>
              <li>Memberikan Melodi Kucing lisensi seumur hidup, royalti-gratis untuk menggunakan konten</li>
              <li>Menjamin bahwa konten tidak melanggar hak pihak ketiga</li>
              <li>Menerima bahwa konten dapat digunakan dalam kampanye pemasaran kami</li>
            </ul>
            <p className="leading-relaxed mt-4">
              Kami berhak untuk menghapus konten apa pun yang menurut kami melanggar perjanjian ini atau tidak pantas.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Konten Pihak Ketiga</h2>
            <p className="leading-relaxed">
              Situs kami mungkin berisi tautan ke situs web pihak ketiga dan konten yang tidak dimiliki atau dikendalikan oleh Melodi Kucing. Kami tidak bertanggung jawab atas konten, akurasi, atau praktik pihak ketiga. Penggunaan Anda terhadap situs pihak ketiga tunduk pada syarat dan kebijakan privasi mereka.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Jaminan Penolakan</h2>
            <p className="leading-relaxed">
              SITUS DAN LAYANAN DISEDIAKAN ATAS DASAR "SEBAGAIMANA ADANYA" TANPA JAMINAN DARI SEGALA JENIS. MELODI KUCING MENOLAK SEMUA JAMINAN YANG DINYATAKAN ATAU TERSIRAT, TERMASUK JAMINAN KELAYAKAN UNTUK TUJUAN TERTENTU, TIDAK PELANGGARAN, DAN KEAKURATAN.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Pembatasan Tanggung Jawab</h2>
            <p className="leading-relaxed mb-4">
              DALAM KEADAAN APA PUN, MELODI KUCING TIDAK BERTANGGUNG JAWAB ATAS:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Kerusakan tidak langsung, insidental, khusus, atau hukuman</li>
              <li>Kehilangan data, pendapatan, atau keuntungan</li>
              <li>Gangguan atau kesalahan dalam Layanan</li>
              <li>Akses tidak sah atau pengubahan transmisi atau data Anda</li>
            </ul>
            <p className="leading-relaxed mt-4">
              Tanggung jawab keseluruhan Melodi Kucing kepada Anda terbatas pada jumlah yang Anda bayarkan kepada kami, jika ada.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">10. Pembaruan dan Gangguan Layanan</h2>
            <p className="leading-relaxed">
              Kami berhak untuk memperbarui, memodifikasi, atau mengganggu Situs dan Layanan kapan saja tanpa pemberitahuan sebelumnya. Kami tidak bertanggung jawab atas kerugian yang diakibatkan oleh gangguan atau pembaruan ini.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">11. Kebijakan Pengembalian 30 Hari</h2>
            <p className="leading-relaxed">
              Melodi Kucing menawarkan kebijakan pengembalian 30 hari tanpa pertanyaan. Jika Anda tidak puas dengan hewan yang diadopsi atau merasa bahwa kecocokan tidak tepat, Anda dapat mengembalikan hewan dalam 30 hari pertama untuk penghargaan penuh atau transfer ke hewan lain. Biaya pemrosesan mungkin berlaku.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">12. Pembatalannya</h2>
            <p className="leading-relaxed">
              Kami berhak untuk membatalkan Perjanjian ini dan akses Anda ke Situs kapan saja jika kami percaya Anda telah melanggar perjanjian ini atau menggunakan Layanan kami secara tidak sah. Saat pembatalan, semua hak yang diberikan kepada Anda akan selesai.
            </p>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">13. Penghubung Eksternal</h2>
            <p className="leading-relaxed">
              Kami mungkin menampilkan tautan ke situs web pihak ketiga dan konten. Kami tidak memiliki kontrol atas situs ini dan tidak bertanggung jawab atas konten, keamanan, atau praktik mereka.
            </p>
          </section>

          {/* Section 14 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">14. Hukum yang Mengatur</h2>
            <p className="leading-relaxed">
              Perjanjian ini mengatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia, tanpa memperhatikan prinsip-prinsip konflik hukumnya. Anda secara eksplisit menyetujui manfaat eksklusif dari yurisdiksi dan tempat pengadilan di Indonesia.
            </p>
          </section>

          {/* Section 15 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">15. Perubahan pada Syarat-Syarat</h2>
            <p className="leading-relaxed">
              Kami berhak untuk memodifikasi Perjanjian ini kapan saja. Perubahan akan berlaku segera setelah posting. Penggunaan Situs atau Layanan yang berkelanjutan oleh Anda setelah perubahan apa pun berarti penerimaan Anda terhadap syarat-syarat yang diubah.
            </p>
          </section>

          {/* Section 16 */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">16. Hubungi Kami</h2>
            <p className="leading-relaxed">
              Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, silakan hubungi kami:
            </p>
            <div className="bg-gray-100 p-6 rounded-lg mt-4">
              <p><strong>Yayasan Melodi Kucing</strong></p>
              <p>Email: yayasanmelodikucing@gmail.com</p>
              <p>Telepon: (+62) 813-1120-3475</p>
              <p>Alamat: Jalan Kelapa Peon No. 99, RT.003/RW.004, Kelurahan Kebagusan, Kecamatan Pasar Minggu, Kota Jakarta Selatan, Daerah Khusus Ibu Kota Jakarta, Indonesia, 12520.</p>
            </div>
          </section>

          {/* Important Notice */}
          <section className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-12">
            <p className="font-bold text-gray-900 mb-2">⚠️ PEMBERITAHUAN PENTING</p>
            <p className="text-gray-700">
              Dengan menggunakan Melodi Kucing, Anda menyetujui untuk menerima tanggung jawab penuh atas kesejahteraan hewan yang diadopsi. Anda berkomitmen untuk memberikan perawatan yang tepat, nutrisi yang sesuai, perlakuan yang manusiawi, dan perhatian medis. Melodi Kucing berhak untuk menyelidiki pengaduan tentang perlakuan hewan yang kasar atau penyalahgunaan.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
