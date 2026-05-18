'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import PetCard from '@/components/PetCard';
import { apiService } from '@/lib/api';
import AlertService from '@/lib/alert';
import type { Pet } from '@/lib/types';

const ITEMS_PER_PAGE = 12;

function PetsContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPets, setTotalPets] = useState(0);
  const [filterBreed, setFilterBreed] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchPets = async () => {
      setIsLoading(true);
      try {
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        const response = await apiService.getPets({
          limit: ITEMS_PER_PAGE,
          offset,
        });

        if (response.data) {
          let filteredPets = response.data;

          // Client-side filtering/searching
          if (searchQuery) {
            filteredPets = filteredPets.filter(
              (pet) =>
                pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pet.breed?.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }

          if (filterBreed) {
            filteredPets = filteredPets.filter((pet) =>
              pet.breed?.toLowerCase().includes(filterBreed.toLowerCase())
            );
          }

          if (filterGender) {
            filteredPets = filteredPets.filter((pet) => pet.gender === filterGender);
          }

          // Sort
          if (sortBy === 'newest') {
            filteredPets.sort(
              (a, b) =>
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );
          } else if (sortBy === 'name') {
            filteredPets.sort((a, b) => a.name.localeCompare(b.name));
          } else if (sortBy === 'price-low') {
            filteredPets.sort((a, b) => (a.adoption_fee || 0) - (b.adoption_fee || 0));
          } else if (sortBy === 'price-high') {
            filteredPets.sort((a, b) => (b.adoption_fee || 0) - (a.adoption_fee || 0));
          }

          setPets(filteredPets);
          setTotalPets(filteredPets.length);
        }
      } catch (error: any) {
        AlertService.error('Error', 'Failed to load pets');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPets();
  }, [currentPage, searchQuery, filterBreed, filterGender, sortBy]);

  const totalPages = Math.ceil(totalPets / ITEMS_PER_PAGE);
  const displayedPets = pets.slice(0, ITEMS_PER_PAGE);

  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-secondary via-accent to-soft-highlight py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Temukan Hewan Peliharaan Sempurna Anda</h1>
          <p className="text-gray-700">Jelajahi koleksi hewan kami yang siap untuk diadopsi</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Filter</h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Cari</label>
                <input
                  type="text"
                  placeholder="Nama hewan, jenis..."
                  defaultValue={searchQuery}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  onChange={(e) => {
                    setCurrentPage(1);
                  }}
                />
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Urutkan Berdasarkan</label>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                >
                  <option value="newest">Terbaru Dulu</option>
                  <option value="name">Nama (A-Z)</option>
                  <option value="price-low">Harga (Rendah ke Tinggi)</option>
                  <option value="price-high">Harga (Tinggi ke Rendah)</option>
                </select>
              </div>

              {/* Gender Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Jenis Kelamin</label>
                <div className="space-y-2">
                  {['male', 'female'].map((gender) => (
                    <label key={gender} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filterGender === gender}
                        onChange={(e) => {
                          setFilterGender(e.target.checked ? gender : '');
                          setCurrentPage(1);
                        }}
                        className="rounded border-gray-300 text-primary"
                      />
                      <span className="text-gray-700 capitalize">{gender === 'male' ? 'Laki-laki' : 'Perempuan'}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset Filters */}
              {(filterGender || filterBreed) && (
                <button
                  onClick={() => {
                    setFilterGender('');
                    setFilterBreed('');
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                >
                  Setel Ulang Filter
                </button>
              )}
            </div>
          </div>

          {/* Pets Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-secondary"></div>
              </div>
            ) : displayedPets.length > 0 ? (
              <>
                <div className="mb-6">
                  <p className="text-gray-600">
                    Menampilkan {displayedPets.length} dari {totalPets} hewan
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {displayedPets.map((pet) => (
                    <PetCard key={pet.id} pet={pet} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-12">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Sebelumnya
                    </button>

                    <div className="flex gap-2">
                      {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                        const pageNum = currentPage > 3 ? currentPage - 2 + i : i + 1;
                        if (pageNum > totalPages) return null;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                              pageNum === currentPage
                                ? 'bg-primary text-white'
                                : 'border-2 border-primary text-primary hover:bg-blue-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Selanjutnya
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-600 text-lg mb-4">Tidak ada hewan ditemukan</p>
                <Link
                  href="/pets"
                  className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity inline-block"
                >
                  Hapus Filter
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default function PetsPage() {
  return (
    <Suspense
      fallback={
        <Layout>
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-secondary"></div>
          </div>
        </Layout>
      }
    >
      <PetsContent />
    </Suspense>
  );
}
