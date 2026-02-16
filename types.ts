
export interface User {
  id: string;
  name: string;
  email: string; // Added for auth
  avatar: string;
  isOwner: boolean;
}

export interface Dog {
  id: string;
  ownerId: string; // Added to link to user
  name: string;
  breed: string;
  age: number;
  weight: number;
  avatarColor: string;
  mascotId: string;
  streak: number;
  totalDistanceKm: number;
  totalWalks: number;
}

export interface WalkLog {
  id: string;
  dogIds: string[];
  date: string; // ISO string
  durationSeconds: number;
  distanceKm: number;
  walkerId: string; // Who walked the dog
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export type ViewState = 'HOME' | 'DOGS' | 'WALK_PREP' | 'WALK_ACTIVE' | 'WALK_SUMMARY' | 'STATS' | 'SETTINGS' | 'AI_CHAT';

export type LanguageCode = 
  | 'en' | 'de' | 'fr' | 'es' | 'it' 
  | 'nl' | 'sv' | 'pl' | 'pt' | 'ru' 
  | 'tr' | 'uk' | 'ro' | 'cs' | 'hu' 
  | 'el' | 'da' | 'fi' | 'no' | 'hr';

export type AccentColor = 'green' | 'purple' | 'pink' | 'orange' | 'teal';

export type BackgroundTheme = 'sunrise' | 'lavender' | 'mint' | 'sky' | 'paper' | 'white';

export interface AppState {
  user: User;
  dogs: Dog[];
  walks: WalkLog[];
  achievements: Achievement[];
  currentView: ViewState;
  theme: 'light' | 'dark';
  language: LanguageCode;
  accentColor: AccentColor;
  backgroundTheme: BackgroundTheme;
}
