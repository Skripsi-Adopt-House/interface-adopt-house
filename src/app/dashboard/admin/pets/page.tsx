'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { apiService } from '@/lib/api';
import AlertService from '@/lib/alert';
import type { Pet } from '@/lib/types';

export default function ManagePetsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!authLoading && (!user || !user.is_admin)) {
      router.push('/');
      return;
    }

    const fetchPets = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.getPets({ limit: 100 });
        if (response.data) {
          const adminPets = response.data.filter((pet: Pet) => pet.admin_id === user?.id);
          setPets(adminPets);
        }
      } catch (error: any) {
        AlertService.error('Kesalahan', 'Gagal memuat hewan');
      } finally {
        setIsLoading(false);
      }
    };

    if (user && user.is_admin) {
      fetchPets();
    }
  }, [user, authLoading, router]);

  const handleDelete = async (petId: string) => {
    const result = await AlertService.confirm(
      'Hapus Hewan',
      'Apakah Anda yakin ingin menghapus daftar hewan ini? Tindakan ini tidak dapat dibatalkan.',
      'Ya, Hapus',
      'Batal'
    );

    if (result.isConfirmed) {
      try {
        await apiService.deletePet(petId);
        setPets((prev) => prev.filter((pet) => pet.id !== petId));
        AlertService.toast('Hewan berhasil dihapus', 'success');
      } catch (error: any) {
        AlertService.error('Kesalahan', error.response?.data?.message || 'Gagal menghapus hewan');
      }
    }
  };

  const filteredPets = pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {/* Breadcrumb */}
        <div className="mb-8 flex gap-2 text-gray-600">
          <Link href="/dashboard/admin" className="hover:text-primary">Dashboard</Link>
          <span>/</span>
          <span className="text-primary font-semibold">Kelola Hewan</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Kelola Hewan</h1>
            <p className="text-gray-600">Total: {pets.length} daftar</p>
          </div>
          <Link
            href="/dashboard/admin/pets/new"
            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            ➕ Tambah Hewan Baru
          </Link>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Cari berdasarkan nama atau jenis hewan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        {/* Pets Table */}
        {filteredPets.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-neutral-bg border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Nama Hewan</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Jenis</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Usia</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Jenis Kelamin</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Kesehatan</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Biaya</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredPets.map((pet) => (
                  <tr key={pet.id} className="border-b border-gray-200 hover:bg-neutral-bg transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">{pet.name}</td>
                    <td className="px-6 py-4 text-gray-700">{pet.breed || 'N/A'}</td>
                    <td className="px-6 py-4 text-gray-700">{pet.age || 'N/A'} thn</td>
                    <td className="px-6 py-4 text-gray-700 capitalize">{pet.gender === 'male' ? 'Laki-laki' : pet.gender === 'female' ? 'Perempuan' : 'N/A'}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        {pet.health?.vaksin && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                            💉
                          </span>
                        )}
                        {pet.health?.sertifikat && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                            ✓
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-primary">
                      {pet.adoption_fee ? `Rp${Math.floor(pet.adoption_fee).toLocaleString('id-ID')}` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <Link
                        href={`/dashboard/admin/pets/${pet.id}/edit`}
                        className="px-3 py-1 text-primary border border-primary rounded-lg hover:bg-blue-50 transition-colors text-sm font-semibold"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(pet.id)}
                        className="px-3 py-1 text-red-500 border border-red-500 rounded-lg hover:bg-red-50 transition-colors text-sm font-semibold"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20 bg-neutral-bg rounded-2xl">
            <div className="text-6xl mb-4">🐾</div>
            {pets.length === 0 ? (
              <>
                <p className="text-gray-600 text-lg mb-6">Belum ada hewan yang didaftar</p>
                <Link
                  href="/dashboard/admin/pets/new"
                  className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity inline-block"
                >
                  Buat Daftar Pertama →
                </Link>
              </>
            ) : (
              <p className="text-gray-600 text-lg">Tidak ada hewan yang cocok dengan pencarian Anda</p>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
