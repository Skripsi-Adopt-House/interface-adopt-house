'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Profil Saya</h1>
          <p className="text-gray-600">Lihat dan kelola informasi akun Anda</p>
        </div>

        <div className="max-w-2xl">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-8 mb-8 pb-8 border-b">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-4xl">
                👤
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h2>
                <p className="text-gray-600">@{user.username}</p>
                {user.is_admin && (
                  <p className="inline-block mt-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
                    🔐 Akun Admin
                  </p>
                )}
              </div>
            </div>

            {/* Account Information */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Informasi Akun</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Email</label>
                  <p className="px-4 py-3 bg-neutral-bg rounded-lg text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Username</label>
                  <p className="px-4 py-3 bg-neutral-bg rounded-lg text-gray-900">{user.username}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-1">Nama Lengkap</label>
                  <p className="px-4 py-3 bg-neutral-bg rounded-lg text-gray-900">{user.name}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-8 border-t">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Aksi Cepat</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href={user.is_admin ? '/dashboard/admin' : '/dashboard'}
                  className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity text-center"
                >
                  {user.is_admin ? '📊 Dashboard Admin' : '❤️ Favorit Saya'}
                </Link>
                <Link
                  href="/pets"
                  className="px-6 py-3 bg-secondary text-gray-800 rounded-xl font-semibold hover:opacity-90 transition-opacity text-center"
                >
                  🔍 Jelajahi Hewan
                </Link>
              </div>
            </div>
          </div>

          {/* Account Settings Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <p className="text-gray-700">
              <strong>Catatan:</strong> Untuk saat ini, informasi profil tidak dapat diedit. 
              Hubungi dukungan jika Anda perlu membuat perubahan pada akun Anda.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
