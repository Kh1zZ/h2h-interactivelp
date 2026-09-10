import type { Metadata, Viewport } from 'next';
import { Fredoka, Nunito } from 'next/font/google';
import './globals.css';

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hearts2hearts-showcase.vercel.app'
  ),
  title: 'Hearts2Hearts — Meet the Group',
  description:
    'An immersive, fan-made interactive introduction to Hearts2Hearts (하츠투하츠), the 8-member girl group. Explore the members, debut single album The Chase, discography, and their cheerful visual universe.',
  keywords: [
    'Hearts2Hearts',
    '하츠투하츠',
    'SM Entertainment',
    'K-pop',
    'The Chase',
    'Butterflies',
    'Jiwoo',
    'Carmen',
    'Yuha',
    'Stella',
    'Juun',
    'A-na',
    'Ian',
    'Ye-on',
    'S2U',
  ],
  authors: [{ name: 'Hearts2Hearts Fan Community' }],
  openGraph: {
    title: 'Hearts2Hearts — Meet the Group',
    description:
      'Explore the 8-member world of Hearts2Hearts. Discover member profiles, music releases, and their cheerful aesthetic world.',
    siteName: 'Hearts2Hearts Showcase',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/assets/images/branding/hero-group.webp',
        width: 1200,
        height: 630,
        alt: 'Hearts2Hearts — 8 Members, One Sweet Harmony',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hearts2Hearts — Meet the Group',
    description:
      'Immersive fan-made guide to Hearts2Hearts (하츠투하츠). 8 members, debut single album The Chase, and cheerful visual world.',
    images: ['/assets/images/branding/hero-group.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFCF8',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}>
      <body className="min-h-screen relative selection:bg-h2h-pink-soft selection:text-h2h-pink-deep">
        {children}
      </body>
    </html>
  );
}
