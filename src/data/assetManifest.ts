import { AssetItem } from '@/types';

/**
 * Central Asset Manifest (PRD v5 Section 18)
 * 
 * Rules:
 * - All assets are mapped with their scene, priority, and fallback description.
 * - Missing assets must NEVER be faked or AI-generated.
 * - Missing assets gracefully render structural AssetSlot placeholders.
 */
export const ASSET_MANIFEST: AssetItem[] = [
  // Hero Assets
  {
    key: 'hero-group-visual',
    src: '/assets/images/branding/hero-group.webp',
    type: 'image',
    scene: 'hero',
    priority: 'high',
    required: false, // Optional: if missing, structural slot is preserved
    fallbackDescription: 'Hearts2Hearts Official Group Visual',
    aspectRatio: '16/9',
  },
  {
    key: 'hero-logo-wordmark',
    src: '/assets/images/branding/logo-wordmark.svg',
    type: 'image',
    scene: 'hero',
    priority: 'high',
    required: false,
    fallbackDescription: 'Hearts2Hearts Official Wordmark',
    aspectRatio: '3/1',
  },

  // Member Portraits (Scene 2: Eight Hearts)
  {
    key: 'member-portrait-jiwoo',
    src: '/assets/images/members/jiwoo.webp',
    type: 'image',
    scene: 'members',
    priority: 'high',
    required: false,
    fallbackDescription: 'Jiwoo Official Portrait',
    aspectRatio: '3/4',
  },
  {
    key: 'member-portrait-carmen',
    src: '/assets/images/members/carmen.webp',
    type: 'image',
    scene: 'members',
    priority: 'high',
    required: false,
    fallbackDescription: 'Carmen Official Portrait',
    aspectRatio: '3/4',
  },
  {
    key: 'member-portrait-yuha',
    src: '/assets/images/members/yuha.webp',
    type: 'image',
    scene: 'members',
    priority: 'high',
    required: false,
    fallbackDescription: 'Yuha Official Portrait',
    aspectRatio: '3/4',
  },
  {
    key: 'member-portrait-stella',
    src: '/assets/images/members/stella.webp',
    type: 'image',
    scene: 'members',
    priority: 'high',
    required: false,
    fallbackDescription: 'Stella Official Portrait',
    aspectRatio: '3/4',
  },
  {
    key: 'member-portrait-juun',
    src: '/assets/images/members/juun.webp',
    type: 'image',
    scene: 'members',
    priority: 'high',
    required: false,
    fallbackDescription: 'Juun Official Portrait',
    aspectRatio: '3/4',
  },
  {
    key: 'member-portrait-a-na',
    src: '/assets/images/members/a-na.webp',
    type: 'image',
    scene: 'members',
    priority: 'high',
    required: false,
    fallbackDescription: 'A-na Official Portrait',
    aspectRatio: '3/4',
  },
  {
    key: 'member-portrait-ian',
    src: '/assets/images/members/ian.webp',
    type: 'image',
    scene: 'members',
    priority: 'high',
    required: false,
    fallbackDescription: 'Ian Official Portrait',
    aspectRatio: '3/4',
  },
  {
    key: 'member-portrait-ye-on',
    src: '/assets/images/members/ye-on.webp',
    type: 'image',
    scene: 'members',
    priority: 'high',
    required: false,
    fallbackDescription: 'Ye-on Official Portrait',
    aspectRatio: '3/4',
  },

  // Discography Artwork (Scene 3: Standalone Releases)
  {
    key: 'release-cover-the-chase',
    src: '/assets/images/releases/the-chase.webp',
    type: 'image',
    scene: 'discography',
    priority: 'medium',
    required: false,
    fallbackDescription: 'The Chase - Debut Single Album Artwork',
    aspectRatio: '1/1',
  },
  {
    key: 'release-cover-style',
    src: '/assets/images/releases/style.webp',
    type: 'image',
    scene: 'discography',
    priority: 'medium',
    required: false,
    fallbackDescription: 'STYLE - Official Artwork',
    aspectRatio: '1/1',
  },
  {
    key: 'release-cover-focus',
    src: '/assets/images/releases/focus.webp',
    type: 'image',
    scene: 'discography',
    priority: 'medium',
    required: false,
    fallbackDescription: 'FOCUS - Official Artwork',
    aspectRatio: '1/1',
  },
  {
    key: 'release-cover-rude',
    src: '/assets/images/releases/rude.webp',
    type: 'image',
    scene: 'discography',
    priority: 'medium',
    required: false,
    fallbackDescription: 'RUDE! - Official Artwork',
    aspectRatio: '1/1',
  },
  {
    key: 'release-cover-lemon-tang',
    src: '/assets/images/releases/lemon-tang.webp',
    type: 'image',
    scene: 'discography',
    priority: 'medium',
    required: false,
    fallbackDescription: 'Lemon Tang - Official Artwork',
    aspectRatio: '1/1',
  },
  {
    key: 'release-cover-iconic-heart',
    src: '/assets/images/releases/iconic-heart.webp',
    type: 'image',
    scene: 'discography',
    priority: 'medium',
    required: false,
    fallbackDescription: 'Iconic Heart - Japan Debut Single Album Artwork',
    aspectRatio: '1/1',
  },

  // Visual World Assets (Scene 4)
  {
    key: 'visual-world-ambient-1',
    src: '/assets/images/branding/visual-world-1.webp',
    type: 'image',
    scene: 'visualWorld',
    priority: 'low',
    required: false,
    fallbackDescription: 'Visual World Motif 1',
    aspectRatio: '16/9',
  },
];

export const getAssetByKey = (key: string): AssetItem | undefined => {
  return ASSET_MANIFEST.find((asset) => asset.key === key);
};
