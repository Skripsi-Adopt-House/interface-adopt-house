'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import AlertService from '@/lib/alert';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama lengkap diperlukan';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email diperlukan';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username diperlukan';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username harus minimal 3 karakter';
    }

    if (!formData.password) {
      newErrors.password = 'Kata sandi diperlukan';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Kata sandi harus minimal 6 karakter';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Kata sandi tidak cocok';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await register(formData);
      AlertService.toast('Pendaftaran berhasil!', 'success');
      router.push('/');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Pendaftaran gagal';
      AlertService.error('Pendaftaran Gagal', errorMessage);
    }
  };

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen flex items-center justify-center bg-neutral-bg px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 animate-slide-in-up">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-4xl mb-3">🏠</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Buat Akun</h1>
              <p className="text-gray-600">Bergabunglah dengan Melodi Kucing dan temukan hewan peliharaan sempurna Anda</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nama Anda"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.name
                      ? 'border-red-500 focus:ring-red-300'
                      : 'border-gray-300 focus:ring-primary'
                  }`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@anda.com"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-300'
                      : 'border-gray-300 focus:ring-primary'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="johndoe"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.username
                      ? 'border-red-500 focus:ring-red-300'
                      : 'border-gray-300 focus:ring-primary'
                  }`}
                />
                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Kata Sandi</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-300'
                      : 'border-gray-300 focus:ring-primary'
                  }`}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Konfirmasi Kata Sandi</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.confirmPassword
                      ? 'border-red-500 focus:ring-red-300'
                      : 'border-gray-300 focus:ring-primary'
                  }`}
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  defaultChecked
                  className="mt-1 rounded border-gray-300 text-primary"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  Saya setuju dengan{' '}
                  <Link href="#" className="text-primary font-semibold hover:text-blue-700">
                    Syarat Layanan
                  </Link>{' '}
                  dan{' '}
                  <Link href="#" className="text-primary font-semibold hover:text-blue-700">
                    Kebijakan Privasi
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Membuat akun...' : 'Buat Akun'}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm">ATAU</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Login Link */}
            <p className="text-center text-gray-600">
              Sudah memiliki akun?{' '}
              <Link href="/login" className="text-primary font-semibold hover:text-blue-700">
                Masuk di sini
              </Link>
            </p>
          </div>

          {/* Social Proof */}
          <div className="mt-8 text-center text-gray-600 text-sm">
            <p>🐱 Bergabunglah dengan ribuan pemilik hewan bahagia</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
