'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-secondary via-accent to-soft-highlight px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-6">⚠️</div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Oops!</h1>
        <p className="text-gray-600 mb-6">
          Terjadi kesalahan. Jangan khawatir, kami sedang mengerjakannya.
        </p>

        {error.message && (
          <div className="mb-8 p-4 bg-red-50 rounded-lg text-left">
            <p className="text-sm text-red-700 font-mono">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Coba Lagi
          </button>
          <Link
            href="/"
            className="px-6 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-blue-50 transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
