'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import PetCard from '@/components/PetCard';
import { apiService } from '@/lib/api';
import AlertService from '@/lib/alert';
import type { Pet } from '@/lib/types';

export default function Home() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.getPets({ limit: 6, offset: 0 });
        if (response.data) {
          setPets(response.data);
        }
      } catch (error: any) {
        AlertService.error('Error', 'Failed to load featured pets');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPets();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/pets?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary via-accent to-soft-highlight py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-4">
              Temukan Hewan Peliharaan <span className="text-primary">Sempurna Anda</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Temukan hewan peliharaan yang menggemaskan siap untuk diadopsi. Berikan mereka kesempatan kedua dan rumah yang penuh kasih.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 mb-8">
              <input
                type="text"
                placeholder="Cari berdasarkan nama, jenis, atau tipe..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200 flex-grow"
              />
              <button type="submit" className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-md hover:shadow-lg whitespace-nowrap">
                Cari
              </button>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/pets" className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-md hover:shadow-lg">
                Jelajahi Semua Hewan
              </Link>
              <Link href="/about" className="px-6 py-3 bg-secondary text-gray-800 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-md hover:shadow-lg">
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pets Section */}
      <section className="py-20 container mx-auto px-2">
        <div className="text-center mb-12 animate-slide-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Hewan Unggulan</h2>
          <p className="text-gray-600 text-lg">Temui beberapa hewan luar biasa kami yang tersedia untuk diadopsi</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-secondary"></div>
          </div>
        ) : pets.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
              {pets.map((pet) => (
                <div key={pet.id} className="animate-fade-in">
                  <PetCard pet={pet} />
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/pets" className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-md hover:shadow-lg inline-block">
                Lihat Semua Hewan →
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Tidak ada hewan tersedia saat ini</p>
          </div>
        )}
      </section>

      {/* How It Works Section */}
      <section className="bg-neutral-bg py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Cara Kerjanya</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔍',
                title: 'Jelajahi Hewan',
                description: 'Jelajahi koleksi hewan kami yang siap untuk diadopsi',
              },
              {
                icon: '❤️',
                title: 'Tambah ke Favorit',
                description: 'Simpan hewan favorit Anda ke profil untuk akses cepat',
              },
              {
                icon: '🏠',
                title: 'Adopsi Hari Ini',
                description: 'Hubungi pemilik hewan dan mulai perjalanan adopsi Anda',
              },
            ].map((step, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-8 text-center">
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Siap Menemukan Hewan Peliharaan Sempurna Anda?</h2>
          <p className="text-lg mb-8 opacity-90">Bergabunglah dengan ratusan pemilik hewan bahagia yang menemukan teman mereka melalui Melodi Kucing</p>
          <Link href="/pets" className="inline-block bg-white text-primary px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
            Mulai Sekarang →
          </Link>
        </div>
      </section>
    </Layout>
  );
}
