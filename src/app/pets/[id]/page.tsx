'use client';

import { useEffect, useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { apiService } from '@/lib/api';
import { useFavorites } from '@/contexts/FavoritesContext';
import AlertService from '@/lib/alert';
import { useAuth } from '@/hooks/useAuth';
import type { Pet } from '@/lib/types';

interface PetDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PetDetailPage({ params }: PetDetailPageProps) {
  const resolvedParams = use(params);
  const { user } = useAuth();
  const { isFavorited, toggleFavorite } = useFavorites();
  const [pet, setPet] = useState<Pet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const petIsFavorited = pet ? isFavorited(pet.id) : false;

  useEffect(() => {
    const fetchPet = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.getPetById(resolvedParams.id);
        if (response.data) {
          setPet(response.data);
        }
      } catch (error: any) {
        AlertService.error('Error', 'Failed to load pet details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPet();
  }, [resolvedParams.id, user]);

  // Auto slideshow - change image every 5 seconds
  useEffect(() => {
    if (!pet || !pet.pictures || pet.pictures.length === 0) return;

    const interval = setInterval(() => {
      setSelectedImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % pet.pictures.length;
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [pet?.pictures?.length]);

  const handleToggleFavorite = async () => {
    if (!user || user.is_admin) {
      AlertService.info('Info', 'Silakan login sebagai pengguna untuk menambah favorit');
      return;
    }

    try {
      if (petIsFavorited) {
        await apiService.removeFromFavorites(pet!.id);
        toggleFavorite(pet!.id, false);
        AlertService.toast('Dihapus dari favorit', 'success');
      } else {
        await apiService.addToFavorites(pet!.id);
        toggleFavorite(pet!.id, true);
        AlertService.toast('Ditambahkan ke favorit', 'success');
      }
    } catch (error: any) {
      AlertService.error('Error', error.response?.data?.message || 'Gagal mengupdate favorit');
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-32">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-secondary"></div>
        </div>
      </Layout>
    );
  }

  if (!pet) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">🐾</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hewan Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-6">Hewan yang Anda cari tidak ada</p>
          <Link href="/pets" className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity inline-block">
            Kembali ke Hewan
          </Link>
        </div>
      </Layout>
    );
  }

  const mainImage = pet.pictures?.[selectedImageIndex]?.url;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8 flex gap-2 text-gray-600">
          <Link href="/" className="hover:text-primary">Beranda</Link>
          <span>/</span>
          <Link href="/pets" className="hover:text-primary">Hewan</Link>
          <span>/</span>
          <span className="text-primary font-semibold">{pet.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-96 flex items-center justify-center">
                {mainImage ? (
                  <Image
                    src={mainImage}
                    alt={pet.name}
                    fill
                    unoptimized={true}
                    className="object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-lg">Tidak Ada Gambar</div>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {pet.pictures && pet.pictures.length > 0 && (
              <div className="flex gap-4 flex-wrap">
                {pet.pictures.map((picture, index) => (
                  <button
                    key={picture.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? 'border-primary shadow-lg'
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    <Image
                      src={picture.url}
                      alt={`${pet.name} ${index + 1}`}
                      fill
                      unoptimized={true}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pet Details Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{pet.name}</h1>
                <p className="text-gray-600 text-lg">
                  {pet.breed || 'Tidak Diketahui'} {pet.age ? `• ${pet.age} tahun` : ''}
                </p>
              </div>

              {/* Price */}
              {pet.adoption_fee !== null && pet.adoption_fee !== undefined && (
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-gray-600 text-sm mb-1">Biaya Adopsi</p>
                  <p className="text-3xl font-bold text-primary">
                    {pet.adoption_fee === 0 || pet.adoption_fee === null ? 'Gratis' : `Rp${Math.floor(pet.adoption_fee).toLocaleString('id-ID')}`}
                  </p>
                </div>
              )}

              {/* Details */}
              <div className="mb-6 pb-6 border-b border-gray-200 space-y-4">
                {pet.gender && (
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Jenis Kelamin</p>
                    <p className="font-semibold capitalize">{pet.gender === 'male' ? 'Laki-laki' : 'Perempuan'}</p>
                  </div>
                )}
                {pet.age && (
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Usia</p>
                    <p className="font-semibold">{pet.age} tahun</p>
                  </div>
                )}
              </div>

              {/* Health Info */}
              {pet.health && (
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-gray-900 font-bold mb-3">Status Kesehatan</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={pet.health.vaksin ? 'text-green-500' : 'text-red-500'}>
                        {pet.health.vaksin ? '✓' : '✗'}
                      </span>
                      <span className="text-gray-700">Divaksinasi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={pet.health.sertifikat ? 'text-green-500' : 'text-red-500'}>
                        {pet.health.sertifikat ? '✓' : '✗'}
                      </span>
                      <span className="text-gray-700">Tersertifikasi</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Admin Info */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-gray-600 text-sm mb-2">Didaftar oleh</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center font-bold text-gray-800">
                    {pet.admin.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{pet.admin.name}</p>
                    <p className="text-gray-600 text-sm">@{pet.admin.username}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleToggleFavorite}
                  className={`w-full px-6 py-3 rounded-xl font-semibold transition-all ${
                    petIsFavorited
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {petIsFavorited ? '❤️ Disukainya' : '🤍 Tambah ke Favorit'}
                </button>
                <button className="w-full px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity">
                  Hubungi Pemilik
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        {pet.story && (
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang {pet.name}</h2>
            <p className="text-gray-700 leading-relaxed">{pet.story}</p>
          </div>
        )}

        {/* Related Pets Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Lebih Banyak Hewan Tersedia</h2>
          <Link
            href="/pets"
            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity inline-block"
          >
            Jelajahi Semua Hewan →
          </Link>
        </div>
      </div>
    </Layout>
  );
}
