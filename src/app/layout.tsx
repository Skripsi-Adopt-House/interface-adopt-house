import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Adopt House - Temukan Hewan Peliharaan Sempurna Anda',
  description: 'Platform adopsi hewan peliharaan modern untuk menemukan dan mengadopsi teman sempurna Anda.',
  keywords: 'adopsi hewan peliharaan, anjing, kucing, hewan, penyelamatan',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/logo.webp',
  },  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${montserrat.variable} h-full antialiased`}>
      <body className="min-h-screen flex flex-col bg-neutral-bg font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
