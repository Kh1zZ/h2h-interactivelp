import { Release } from '@/types';
import { Language } from '@/context/LanguageContext';

export interface LatestReleaseInfo extends Release {
  collaborator?: string;
  campaignTitle?: string;
  campaignNote?: string;
  badgeText?: string;
  genre?: string;
  highlights?: string[];
}

export const CURRENT_LATEST_RELEASE_EN: LatestReleaseInfo = {
  id: 'moonride',
  title: 'MOONRIDE',
  type: 'Special Collaboration Single',
  releaseDate: '9 September 2026',
  badgeText: 'Fresh Drop • Latest Release',
  genre: 'Electropop • Dreamy Synthesizers',
  collaborator: 'Kia Korea',
  campaignTitle: 'Kia RV "Black Edition" Official Campaign',
  campaignNote: 'Official collaboration project with Hearts2Hearts as Kia Brand Ambassador, connecting with youth culture and free-spirited journeys.',
  description:
    'An exhilarating electropop collaboration between Hearts2Hearts and Kia Korea celebrating the new Kia RV Black Edition. Fusing sparkling synth melodies, a propulsive nocturnal bassline, and warm, sweet vocal harmonies, "MOONRIDE" captures the thrill of embarking on a late-night drive, chasing freedom, and reaching for dreams beneath the moonlit sky.',
  tracks: ['MOONRIDE (Title)', 'MOONRIDE (Inst.)'],
  coverAssetKey: 'release-cover-moonride',
  streamingHint: 'Global Digital Streaming & Kia Korea Special Campaign',
  audioSrc: '/assets/audio/discography/moonride.aac',
  highlights: [
    'Kia Brand Ambassador Project for Kia RV "Black Edition"',
    'Dreamy electropop synthwave with upbeat night-drive tempo',
    'Special pop-up event at Kia Unplugged Ground (Seongdong-gu, Seoul)',
  ],
};

export const CURRENT_LATEST_RELEASE_ID: LatestReleaseInfo = {
  id: 'moonride',
  title: 'MOONRIDE',
  type: 'Singel Kolaborasi Spesial',
  releaseDate: '9 September 2026',
  badgeText: 'Rilisan Segar • Drop Terbaru',
  genre: 'Elektropop • Sintesis Dreamy',
  collaborator: 'Kia Korea',
  campaignTitle: 'Kampanye Resmi Kia RV "Black Edition"',
  campaignNote: 'Proyek kolaborasi resmi bersama Hearts2Hearts sebagai Brand Ambassador Kia, merangkul budaya generasi muda dan perjalanan berjiwa bebas.',
  description:
    'Kolaborasi elektropop memukau antara Hearts2Hearts dan Kia Korea untuk merayakan peluncuran Kia RV Black Edition terbaru. Memadukan melodi synth yang berkilauan, hentakan bassline malam hari yang menghentak, dan harmoni vokal hangat, "MOONRIDE" mengabadikan sensasi berkendara larut malam mengejar kebebasan dan meraih mimpi di bawah langit berhias rembulan.',
  tracks: ['MOONRIDE (Title)', 'MOONRIDE (Inst.)'],
  coverAssetKey: 'release-cover-moonride',
  streamingHint: 'Streaming Digital Global & Kampanye Khusus Kia Korea',
  audioSrc: '/assets/audio/discography/moonride.aac',
  highlights: [
    'Proyek Brand Ambassador Kia untuk Kia RV "Black Edition"',
    'Synthwave elektropop dreamy dengan tempo berkendara malam yang bersemangat',
    'Acara pop-up khusus di Kia Unplugged Ground (Seongdong-gu, Seoul)',
  ],
};

export const CURRENT_LATEST_RELEASE = CURRENT_LATEST_RELEASE_EN;

export const getLatestReleaseData = (lang: Language = 'en'): LatestReleaseInfo => {
  return lang === 'id' ? CURRENT_LATEST_RELEASE_ID : CURRENT_LATEST_RELEASE_EN;
};
