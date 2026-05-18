'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { apiService } from '@/lib/api';
import AlertService from '@/lib/alert';
import { useAuth } from '@/hooks/useAuth';
import type { Pet } from '@/lib/types';

// Helper function to capitalize breed (title case)
const capitalizeBreed = (breed: string): string => {
  return breed
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function EditPetPage() {
  const router = useRouter();
  const params = useParams();
  const petId = params?.id as string;
  const { user, isLoading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    gender: 'male',
    adoption_fee: '',
    story: '',
    vaksin: false,
    sertifikat: false,
  });

  const [pictures, setPictures] = useState<File[]>([]);
  const [existingPictures, setExistingPictures] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!authLoading && (!user || !user.is_admin)) {
      router.push('/');
      return;
    }

    const fetchPet = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.getPetById(petId);
        if (response.data) {
          const pet = response.data;
          
          // Check if user is admin who owns this pet
          if (pet.admin_id !== user?.id) {
            router.push('/dashboard/admin');
            return;
          }

          setFormData({
            name: pet.name,
            breed: pet.breed || '',
            age: pet.age ? String(pet.age) : '',
            gender: pet.gender || 'male',
            adoption_fee: pet.adoption_fee ? String(Math.floor(Number(pet.adoption_fee))) : '',
            story: pet.story || '',
            vaksin: pet.health?.vaksin || false,
            sertifikat: pet.health?.sertifikat || false,
          });

          if (pet.pictures) {
            setExistingPictures(pet.pictures);
          }
        }
      } catch (error: any) {
        AlertService.error('Kesalahan', 'Gagal memuat detail hewan');
        router.push('/dashboard/admin');
      } finally {
        setIsLoading(false);
      }
    };

    if (user && user.is_admin && petId) {
      fetchPet();
    }
  }, [petId, user, authLoading, router]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama hewan diperlukan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleAdoptionFeeBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value && /^\d+$/.test(value)) {
      // Format the display value when user leaves the field
      const formatted = 'Rp' + parseInt(value).toLocaleString('id-ID');
      setFormData((prev) => ({
        ...prev,
        adoption_fee: formatted,
      }));
    }
  };

  const handleAdoptionFeeFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Remove formatting when user focuses on the field
    const plain = value.replace(/\D/g, '');
    setFormData((prev) => ({
      ...prev,
      adoption_fee: plain,
    }));
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPictures = Array.from(files).slice(0, 3);
      setPictures(newPictures);
    }
  };

  const handleRemoveExistingPicture = (index: number) => {
    setExistingPictures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const updateData = {
        name: formData.name,
        breed: formData.breed ? capitalizeBreed(formData.breed) : undefined,
        age: formData.age ? parseFloat(formData.age) : undefined,
        gender: formData.gender,
        adoption_fee: formData.adoption_fee ? parseInt(formData.adoption_fee.replace(/\D/g, '')) : undefined,
        story: formData.story,
        vaksin: formData.vaksin,
        sertifikat: formData.sertifikat,
      };

      await apiService.updatePet(petId, updateData as any);
      AlertService.success('Berhasil', 'Daftar hewan berhasil diperbarui!');
      router.push('/dashboard/admin');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Gagal memperbarui hewan';
      AlertService.error('Kesalahan', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
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
        {/* Breadcrumb */}
        <div className="mb-8 flex gap-2 text-gray-600">
          <Link href="/dashboard/admin" className="hover:text-primary">Dashboard</Link>
          <span>/</span>
          <Link href="/dashboard/admin/pets" className="hover:text-primary">Kelola Hewan</Link>
          <span>/</span>
          <span className="text-primary font-semibold">Edit Hewan</span>
        </div>

        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Hewan - {formData.name}</h1>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
            {/* Basic Info */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Informasi Dasar</h2>

              {/* Pet Name */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Hewan *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="mis., Fluffy, Max, Bella"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.name
                      ? 'border-red-500 focus:ring-red-300'
                      : 'border-gray-300 focus:ring-primary'
                  }`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Breed & Age Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Jenis</label>
                  <input
                    type="text"
                    name="breed"
                    value={formData.breed}
                    onChange={handleInputChange}
                    placeholder="mis., Golden Retriever"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Usia (tahun)</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="2"
                    min="0.1"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              {/* Gender & Fee Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Jenis Kelamin</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  >
                    <option value="male">Laki-laki</option>
                    <option value="female">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Biaya Adopsi (Rp)</label>
                  <input
                    type="text"
                    name="adoption_fee"
                    value={formData.adoption_fee}
                    onChange={handleInputChange}
                    onBlur={handleAdoptionFeeBlur}
                    onFocus={handleAdoptionFeeFocus}
                    placeholder="Contoh: 500000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              {/* Story */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Cerita Hewan</label>
                <textarea
                  name="story"
                  value={formData.story}
                  onChange={handleInputChange}
                  placeholder="Ceritakan tentang kepribadian dan latar belakang hewan ini..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                />
              </div>
            </div>

            {/* Health Information */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Informasi Kesehatan</h2>

              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="vaksin"
                    checked={formData.vaksin}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-primary"
                  />
                  <span className="text-gray-700 font-semibold">Divaksinasi</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="sertifikat"
                    checked={formData.sertifikat}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-primary"
                  />
                  <span className="text-gray-700 font-semibold">Tersertifikasi</span>
                </label>
              </div>
            </div>

            {/* Current Pictures */}
            {existingPictures.length > 0 && (
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Foto Saat Ini</h2>
                <div className="grid grid-cols-3 gap-4">
                  {existingPictures.map((pic, index) => (
                    <div key={index} className="relative bg-neutral-bg rounded-lg p-4 text-center">
                      <img
                        src={pic.url}
                        alt={`Foto hewan ${index + 1}`}
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveExistingPicture(index)}
                        className="text-red-500 text-xs font-semibold hover:text-red-700"
                      >
                        ✕ Hapus
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pictures Upload */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Perbarui Foto (Opsional)</h2>
              <p className="text-sm text-gray-600 mb-4">Unggah hingga 3 foto baru (maks 5MB masing-masing)</p>

              <div className="mb-4">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePictureChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              {pictures.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {pictures.map((pic, index) => (
                    <div key={index} className="relative bg-neutral-bg rounded-lg p-4 text-center">
                      <p className="text-sm font-semibold text-gray-700 truncate">{pic.name}</p>
                      <p className="text-xs text-gray-600">{(pic.size / 1024).toFixed(1)}KB</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
              <Link
                href="/dashboard/admin"
                className="flex-1 px-6 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-blue-50 transition-colors text-center"
              >
                Batal
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
