
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isOwner: boolean;
}

export interface DogGoal {
  frequency: 'daily' | 'weekly';
  metric: 'distance' | 'minutes';
  target: number;
}

export interface Dog {
  id: string;
  ownerId: string;
  name: string;
  breed: string;
  age: number;
  weight: number;
  avatarColor: string;
  mascotId: string;
  streak: number;
  totalDistanceKm: number;
  totalWalks: number;
  goal?: DogGoal;
}

export interface WalkLog {
  id: string;
  dogIds: string[];
  date: string;
  durationSeconds: number;
  distanceKm: number;
  walkerId: string;
}

export type ViewState = 'HOME' | 'DOGS' | 'WALK_PREP' | 'WALK_ACTIVE' | 'WALK_SUMMARY' | 'STATS' | 'SETTINGS' | 'AI_CHAT';

export type LanguageCode = 
  | 'en' | 'de' | 'fr' | 'es' | 'it' 
  | 'nl' | 'sv' | 'pl' | 'pt' | 'ru' 
  | 'tr' | 'uk' | 'ro' | 'cs' | 'hu' 
  | 'el' | 'da' | 'fi' | 'no' | 'hr';

export type AccentColor = 'green' | 'purple' | 'pink' | 'orange' | 'teal';

export type BackgroundTheme = 'sunrise' | 'lavender' | 'mint' | 'sky' | 'paper' | 'white';
