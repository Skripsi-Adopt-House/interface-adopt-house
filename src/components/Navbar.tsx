'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AlertService from '@/lib/alert';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isProfileDropdownOpen]);

  const handleLogout = async () => {
    const result = await AlertService.confirm(
      'Logout',
      'Are you sure you want to logout?',
      'Yes, Logout',
      'Cancel'
    );

    if (result.isConfirmed) {
      logout();
      setIsProfileDropdownOpen(false);
      AlertService.toast('Logged out successfully', 'success');
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeProfileDropdown = () => {
    setIsProfileDropdownOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-primary flex items-center gap-2"
        >
          <Image 
            src="/logo1.webp" 
            alt="Melodi Kucing Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          Melodi Kucing
        </Link>

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-1 focus:outline-none"
          aria-label="Toggle menu"
        >
          <span className={`h-1 w-6 bg-gray-800 transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`h-1 w-6 bg-gray-800 transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`h-1 w-6 bg-gray-800 transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-700 hover:text-primary font-semibold transition-colors">
            Beranda
          </Link>
          <Link href="/pets" className="text-gray-700 hover:text-primary font-semibold transition-colors">
            Cari Hewan
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-primary font-semibold transition-colors">
            Tentang Kami
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              {user.is_admin && (
                <>
                  <Link
                    href="/dashboard/admin"
                    className="text-gray-700 hover:text-primary font-semibold transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/admin/pets"
                    className="text-gray-700 hover:text-primary font-semibold transition-colors"
                  >
                    Kelola Hewan
                  </Link>
                </>
              )}
              {!user.is_admin && (
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-primary font-semibold transition-colors"
                >
                  Favorit Saya
                </Link>
              )}

              {/* Profile Dropdown */}
              <div ref={dropdownRef} className="relative">
                <button 
                  onClick={toggleProfileDropdown}
                  className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg font-semibold text-gray-800 hover:bg-accent transition-colors"
                >
                  {user.name}
                  <span className={`transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>
                <div className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg transition-all z-10 ${
                  isProfileDropdownOpen 
                    ? 'opacity-100 pointer-events-auto' 
                    : 'opacity-0 pointer-events-none'
                }`}>
                  <Link
                    href="/profile"
                    onClick={closeProfileDropdown}
                    className="block px-4 py-2 text-gray-700 hover:bg-neutral-bg rounded-t-lg"
                  >
                    Profil
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                      closeProfileDropdown();
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-neutral-bg rounded-b-lg border-t"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link href="/login" className="px-6 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                Masuk
              </Link>
              <Link href="/register" className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-md hover:shadow-lg">
                Daftar
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 flex flex-col gap-4 animate-slide-in-up">
          <Link href="/" className="text-gray-700 hover:text-primary font-semibold">
            Beranda
          </Link>
          <Link href="/pets" className="text-gray-700 hover:text-primary font-semibold">
            Cari Hewan
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-primary font-semibold">
            Tentang Kami
          </Link>

          {user ? (
            <>
              {user.is_admin && (
                <>
                  <Link href="/dashboard/admin" className="text-gray-700 hover:text-primary font-semibold">
                    Dashboard
                  </Link>
                  <Link href="/dashboard/admin/pets" className="text-gray-700 hover:text-primary font-semibold">
                    Kelola Hewan
                  </Link>
                </>
              )}
              {!user.is_admin && (
                <Link href="/dashboard" className="text-gray-700 hover:text-primary font-semibold">
                  Favorit Saya
                </Link>
              )}
              <Link href="/profile" className="text-gray-700 hover:text-primary font-semibold">
                Profil
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity w-full text-left"
              >
                Keluar
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-6 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-blue-50 transition-colors text-center">
                Masuk
              </Link>
              <Link href="/register" className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity text-center">
                Daftar
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
