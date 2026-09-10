import { Release } from '@/types';

export interface LatestReleaseInfo extends Release {
  collaborator?: string;
  campaignTitle?: string;
  campaignNote?: string;
  badgeText?: string;
  genre?: string;
  highlights?: string[];
}

/**
 * CURRENT_LATEST_RELEASE
 * 
 * Rules for future updates:
 * - Whenever a brand new single / album drops, move the current release
 *   into DISCOGRAPHY_DATA in 'src/data/discographyData.ts'.
 * - Place the fresh drop details right here into CURRENT_LATEST_RELEASE.
 * - The website will automatically update the dedicated spotlight section seamlessly.
 */
export const CURRENT_LATEST_RELEASE: LatestReleaseInfo = {
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
