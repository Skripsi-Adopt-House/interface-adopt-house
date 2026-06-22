'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/contexts/FavoritesContext';
import { apiService } from '@/lib/api';
import AlertService from '@/lib/alert';
import type { Pet } from '@/lib/types';

interface PetCardProps {
  pet: Pet;
  onDelete?: (id: string) => void;
  onEdit?: (pet: Pet) => void;
  onFavoriteToggle?: (id: string, isFavorited: boolean) => void;
  isAdmin?: boolean;
}

export default function PetCard({ pet, onDelete, onEdit, onFavoriteToggle, isAdmin = false }: PetCardProps) {
  const { user } = useAuth();
  const { isFavorited, toggleFavorite } = useFavorites();
  const [isLoading, setIsLoading] = useState(false);

  const petIsFavorited = isFavorited(pet.id);

  const handleDelete = async () => {
    const result = await AlertService.confirm(
      'Hapus Hewan',
      'Apakah Anda yakin ingin menghapus daftar hewan ini?',
      'Ya, Hapus',
      'Batal'
    );

    if (result.isConfirmed) {
      setIsLoading(true);
      try {
        await apiService.deletePet(pet.id);
        AlertService.toast('Hewan berhasil dihapus', 'success');
        onDelete?.(pet.id);
      } catch (error: any) {
        AlertService.error('Error', error.response?.data?.message || 'Failed to delete pet');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleToggleFavorite = async () => {
    if (!user || user.is_admin) {
      AlertService.info('Info', 'Hanya pengguna yang dapat memberi favorit hewan');
      return;
    }

    setIsLoading(true);
    try {
      if (petIsFavorited) {
        await apiService.removeFromFavorites(pet.id);
        toggleFavorite(pet.id, false);
        onFavoriteToggle?.(pet.id, false);
        AlertService.toast('Dihapus dari favorit', 'success');
      } else {
        await apiService.addToFavorites(pet.id);
        toggleFavorite(pet.id, true);
        onFavoriteToggle?.(pet.id, true);
        AlertService.toast('Ditambahkan ke favorit', 'success');
      }
    } catch (error: any) {
      AlertService.error('Error', error.response?.data?.message || 'Failed to update favorites');
    } finally {
      setIsLoading(false);
    }
  };

  const mainImage = pet.pictures?.[0]?.url;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <Link href={`/pets/${pet.id}`} className="block group">
        <div className="relative h-64 w-full bg-gray-200 overflow-hidden">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={pet.name}
              fill
              unoptimized={true}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-neutral-bg text-gray-400">
              Tidak Ada Gambar
            </div>
          )}

          {/* Badge */}
          <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
            {pet.gender ? pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1) : 'N/A'}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/pets/${pet.id}`} className="block hover:text-primary transition-colors">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{pet.name}</h3>
        </Link>

        <p className="text-gray-600 text-sm mb-2">
          {pet.breed ? pet.breed : 'Jenis Tidak Diketahui'} {pet.age ? `• ${pet.age} tahun` : ''}
        </p>

        {/* Health Info */}
        <div className="flex gap-2 mb-4 text-xs flex-wrap">
          {pet.health?.vaksin ? (
            <span className="bg-soft-highlight text-gray-700 px-3 py-1 rounded-full font-semibold">✓ Divaksinasi</span>
          ) : (
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">✗ Tidak Divaksinasi</span>
          )}
          {pet.health?.sertifikat ? (
            <span className="bg-soft-highlight text-gray-700 px-3 py-1 rounded-full font-semibold">✓ Tersertifikasi</span>
          ) : (
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">✗ Tidak Tersertifikasi</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {isAdmin && (
            <>
              <button
                onClick={() => onEdit?.(pet)}
                className="flex-1 px-4 py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm"
                disabled={isLoading}
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors text-sm"
                disabled={isLoading}
              >
                Hapus
              </button>
            </>
          )}

          {!isAdmin && (
            <>
              <Link href={`/pets/${pet.id}`} className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-md hover:shadow-lg text-center text-sm">
                Lihat Detail
              </Link>
              <button
                onClick={handleToggleFavorite}
                className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg font-semibold transition-all text-sm ${
                  petIsFavorited
                    ? 'bg-red-50 hover:bg-red-100'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                disabled={isLoading}
                title={petIsFavorited ? 'Hapus dari favorit' : 'Tambah ke favorit'}
              >
                <i className={`fa-${petIsFavorited ? 'solid' : 'regular'} fa-heart text-xl ${
                  petIsFavorited ? 'text-red-500' : 'text-gray-400'
                }`}></i>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
