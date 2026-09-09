export interface Member {
  id: string;
  stageName: string;
  realName: string;
  hangul: string;
  birthday: string;
  zodiac: string;
  mbti: string;
  roleCue: string;
  accentColor: string;
  portraitAssetKey: string;
  symbol: string;
  bio: string;
  nationality?: string;
}

export interface Release {
  id: string;
  title: string;
  type: string;
  releaseDate: string;
  description: string;
  tracks: string[];
  coverAssetKey: string;
  streamingHint?: string;
  audioSrc?: string;
}

export type AssetType = 'image' | 'video' | 'audio' | 'font';

export type SceneIdentifier =
  | 'hero'
  | 'intro'
  | 'members'
  | 'discography'
  | 'visualWorld'
  | 'miniGame'
  | 'closing'
  | 'global';

export interface AssetItem {
  key: string;
  src: string;
  type: AssetType;
  scene: SceneIdentifier;
  priority: 'high' | 'medium' | 'low';
  required: boolean;
  fallbackDescription: string;
  aspectRatio?: string; // e.g. '3/4', '1/1', '16/9'
}

export interface AssetLoadingProgress {
  total: number;
  loaded: number;
  failed: number;
  progressPercent: number;
  isReady: boolean;
  states: Record<string, 'pending' | 'loading' | 'loaded' | 'failed'>;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
}
