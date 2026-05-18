'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import PetCard from '@/components/PetCard';
import { apiService } from '@/lib/api';
import AlertService from '@/lib/alert';
import { useAuth } from '@/hooks/useAuth';
import type { Pet } from '@/lib/types';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [favorites, setFavorites] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || user.is_admin)) {
      router.push('/');
      return;
    }

    const fetchFavorites = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.getFavorites({ limit: 100 });
        if (response.data && Array.isArray(response.data)) {
          const favoritePets = response.data.map((fav: any) => fav.posting);
          setFavorites(favoritePets);
        }
      } catch (error: any) {
        AlertService.error('Kesalahan', 'Gagal memuat favorit');
      } finally {
        setIsLoading(false);
      }
    };

    if (user && !user.is_admin) {
      fetchFavorites();
    }
  }, [user, authLoading, router]);

  const handleDelete = (petId: string) => {
    setFavorites((prev) => prev.filter((pet) => pet.id !== petId));
  };

  if (authLoading || isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-32">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-secondary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Favorit Saya</h1>
          <p className="text-gray-600">Hewan peliharaan yang Anda simpan untuk nanti</p>
        </div>

        {/* Favorites Grid */}
        {favorites.length > 0 ? (
          <>
            <div className="mb-8">
              <p className="text-gray-600">
                Anda memiliki <span className="font-bold text-primary">{favorites.length}</span> hewan favorit
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map((pet) => (
                <div key={pet.id} className="animate-fade-in">
                  <PetCard pet={pet} onDelete={handleDelete} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20 bg-neutral-bg rounded-2xl">
            <div className="text-6xl mb-4">🤍</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Belum Ada Favorit</h2>
            <p className="text-gray-600 mb-6">Mulai jelajahi hewan untuk menambahkannya ke favorit Anda</p>
            <a
              href="/pets"
              className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity inline-block"
            >
              Jelajahi Hewan →
            </a>
          </div>
        )}
      </div>
    </Layout>
  );
}
