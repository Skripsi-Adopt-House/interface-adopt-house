'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { apiService } from '@/lib/api';
import AlertService from '@/lib/alert';
import type { Pet } from '@/lib/types';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPets: 0,
    totalVaccinated: 0,
    totalCertified: 0,
  });

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

          setStats({
            totalPets: adminPets.length,
            totalVaccinated: adminPets.filter((p: Pet) => p.health?.vaksin).length,
            totalCertified: adminPets.filter((p: Pet) => p.health?.sertifikat).length,
          });
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
          <p className="text-gray-600">Kelola daftar hewan dan akun Anda</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Hewan</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalPets}</p>
              </div>
              <div className="text-4xl">🐾</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Divaksinasi</p>
                <p className="text-3xl font-bold text-green-500">{stats.totalVaccinated}</p>
              </div>
              <div className="text-4xl">💉</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Tersertifikasi</p>
                <p className="text-3xl font-bold text-blue-500">{stats.totalCertified}</p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Aksi Cepat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/dashboard/admin/pets/new"
              className="px-6 py-4 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-md hover:shadow-lg block text-center"
            >
              ➕ Tambah Hewan Baru
            </Link>
            <Link
              href="/dashboard/admin/pets"
              className="px-6 py-4 bg-secondary text-gray-800 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-md hover:shadow-lg block text-center"
            >
              📋 Kelola Hewan
            </Link>
          </div>
        </div>

        {/* Recent Pets */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Daftar Terbaru</h2>
          {pets.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-neutral-bg border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Nama Hewan</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Jenis</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Usia</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {pets.slice(0, 5).map((pet) => (
                    <tr key={pet.id} className="border-b border-gray-200 hover:bg-neutral-bg transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-900">{pet.name}</td>
                      <td className="px-6 py-4 text-gray-700">{pet.breed || 'N/A'}</td>
                      <td className="px-6 py-4 text-gray-700">{pet.age || 'N/A'} thn</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                          Aktif
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <Link
                          href={`/dashboard/admin/pets/${pet.id}/edit`}
                          className="px-3 py-1 text-primary border border-primary rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          Edit
                        </Link>
                        <button className="px-3 py-1 text-red-500 border border-red-500 rounded-lg hover:bg-red-50 transition-colors">
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 bg-neutral-bg rounded-2xl">
              <div className="text-6xl mb-4">🐾</div>
              <p className="text-gray-600 text-lg mb-6">Belum ada hewan yang didaftar</p>
              <Link
                href="/dashboard/admin/pets/new"
                className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity inline-block"
              >
                Buat Daftar Pertama →
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
