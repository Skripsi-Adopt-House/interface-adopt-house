'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export default function Layout({ children, showFooter = true }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      {showFooter && <Footer />}
    </>
  );
}
