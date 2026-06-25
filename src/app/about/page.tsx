import Layout from '@/components/Layout';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-secondary via-accent to-soft-highlight py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Tentang Melodi Kucing</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Kami memiliki misi untuk mencocokkan setiap hewan dengan rumah sempurna mereka
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Kisah Kami</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Melodi Kucing didirikan dengan misi sederhana: membuat adopsi hewan lebih mudah dan dapat diakses oleh semua orang. Kami percaya bahwa setiap hewan layak mendapatkan rumah yang penuh kasih, dan setiap keluarga layak mendapatkan teman yang sempurna.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Sejak peluncuran kami, kami telah membantu ribuan hewan menemukan rumah selamanya. Platform kami menghubungkan pecinta hewan yang peduli dengan hewan peliharaan yang menggemaskan yang menunggu kesempatan kedua untuk bahagia.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Kami bekerja sama dengan penampungan hewan, penyelamat, dan pemilik pribadi untuk memastikan bahwa setiap hewan yang terdaftar di platform kami sehat, aman, dan siap untuk diadopsi.
            </p>
          </div>
          <div className="bg-gradient-to-br from-secondary to-accent rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">🏠</div>
            <p className="text-gray-900 text-lg font-semibold">Membuat Adopsi Hewan Sederhana</p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-neutral-bg py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Misi & Nilai Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '❤️',
                title: 'Welas Asih',
                description: 'Kami peduli dengan kesejahteraan setiap hewan di platform kami',
              },
              {
                icon: '🤝',
                title: 'Kepercayaan',
                description: 'Kami memastikan transparansi dan keamanan dalam setiap proses adopsi',
              },
              {
                icon: '🌟',
                title: 'Keunggulan',
                description: 'Kami berusaha untuk memberikan pengalaman pengguna terbaik dalam adopsi hewan',
              },
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition-all">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By The Numbers */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Berdasarkan Angka</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: '5,000+', label: 'Hewan yang Diadopsi' },
            { number: '10,000+', label: 'Keluarga Bahagia' },
            { number: '500+', label: 'Mitra Penyelamat' },
            { number: '24/7', label: 'Dukungan Pelanggan' },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition-all">
              <p className="text-3xl font-bold text-primary mb-2">{stat.number}</p>
              <p className="text-gray-700 font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-neutral-bg py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Tim Kami</h2>
          <p className="text-gray-700 text-center max-w-2xl mx-auto mb-12">
            Kami adalah tim yang bersemangat dari pecinta hewan, pengembang, dan desainer yang berdedikasi untuk merevolusi adopsi hewan.
          </p>
          <div className="text-center">
            <p className="text-gray-600 mb-8">Pelajari lebih lanjut tentang tim kami dan pekerjaan kami</p>
            <Link
              href="/hubungi-kami"
              className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity inline-block"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Siap Menemukan Hewan Peliharaan Sempurna Anda?</h2>
          <p className="text-lg mb-8 opacity-90">Bergabunglah dengan ribuan keluarga bahagia yang telah menemukan teman mereka melalui Melodi Kucing</p>
          <Link
            href="/pets"
            className="inline-block bg-white text-primary px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            Jelajahi Hewan Sekarang →
          </Link>
        </div>
      </section>
    </Layout>
  );
}
