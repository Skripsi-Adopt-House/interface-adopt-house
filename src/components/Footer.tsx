import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Image 
                src="/logo.webp" 
                alt="Adopt House Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              Adopt House
            </h3>
            <p className="text-gray-400">
              Temukan teman berbulu Anda yang sempurna dan berikan mereka rumah yang penuh kasih.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/pets" className="text-gray-400 hover:text-white transition-colors">
                  Cari Hewan
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4">Sumber Daya</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/panduan-perawatan" className="text-gray-400 hover:text-white transition-colors">
                  Panduan Perawatan
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/hubungi-kami" className="text-gray-400 hover:text-white transition-colors">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4">Hukum</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/kebijakan-privasi" className="text-gray-400 hover:text-white transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/syarat-layanan" className="text-gray-400 hover:text-white transition-colors">
                  Syarat Layanan
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400">
            &copy; {currentYear} Adopt House. Semua hak dilindungi. | Dibuat dengan ❤️ untuk hewan
          </p>
        </div>
      </div>
    </footer>
  );
}
