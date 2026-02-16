import { Dog, User, Achievement, LanguageCode, AccentColor, BackgroundTheme } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex',
  email: 'alex@pawgo.app',
  avatar: 'https://api.dicebear.com/7.x/big-smile/svg?seed=Liam',
  isOwner: true,
};

export const USER_AVATARS = [
  // 8 Male-coded avatars (Top of list)
  'https://api.dicebear.com/7.x/big-smile/svg?seed=Liam',
  'https://api.dicebear.com/7.x/big-smile/svg?seed=Noah',
  'https://api.dicebear.com/7.x/big-smile/svg?seed=Oliver',
  'https://api.dicebear.com/7.x/big-smile/svg?seed=Elijah',
  'https://api.dicebear.com/7.x/big-smile/svg?seed=James',
  'https://api.dicebear.com/7.x/big-smile/svg?seed=William',
  'https://api.dicebear.com/7.x/big-smile/svg?seed=Benjamin',
  'https://api.dicebear.com/7.x/big-smile/svg?seed=Lucas',
  // 8 Female-coded avatars (Bottom of list)
  'https://api.dicebear.com/7.x/big-smile/svg?seed=Emma',
  'https://api.dicebear.com/7.x/big-smile/svg?seed=Charlotte',
  'https://api.dicebear.com/7.x/big-smile/svg?seed=Amelia',
  'https://api.dicebear.com/7.x/big-smile/svg?seed=Sophia',
  'https://api.dicebear.com/7.x/big-smile/svg?seed=Isabella',
  'https://api.dicebear.com/7.x/big-smile/svg?seed=Mia',
  'https://api.dicebear.com/7.x/big-smile/svg?seed=Evelyn',
  'https://api.dicebear.com/7.x/big-smile/svg?seed=Harper',
];

export const MASCOT_IDS = Array.from({ length: 20 }, (_, i) => `dog-${i + 1}`);

export const INITIAL_DOGS: Dog[] = [
  {
    id: 'd1',
    ownerId: 'u1',
    name: 'Bruno',
    breed: 'French Bulldog',
    age: 3,
    weight: 12,
    avatarColor: 'bg-pawgo-blue',
    mascotId: 'dog-4',
    streak: 5,
    totalDistanceKm: 124.5,
    totalWalks: 42,
  },
  {
    id: 'd2',
    ownerId: 'u1',
    name: 'Luna',
    breed: 'Golden Retriever',
    age: 2,
    weight: 28,
    avatarColor: 'bg-pawgo-yellow',
    mascotId: 'dog-1',
    streak: 12,
    totalDistanceKm: 340.2,
    totalWalks: 89,
  },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', title: 'First Steps', description: 'Complete your first walk', icon: '🐾', unlocked: true },
  { id: 'a2', title: 'Week Warrior', description: 'Walk 7 days in a row', icon: '🔥', unlocked: true },
  { id: 'a3', title: 'Marathon Dog', description: 'Walk 42km total', icon: '🏆', unlocked: false },
];

export const LANGUAGES: { code: LanguageCode; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'hr', name: 'Hrvatski', flag: '🇭🇷' },
];

export const ACCENT_COLORS: { id: AccentColor; name: string; primary: string; dark: string; display: string }[] = [
  { id: 'green', name: 'Pawgo Green', primary: '#58CC02', dark: '#46A302', display: 'bg-[#58CC02]' },
  { id: 'purple', name: 'Royal Purple', primary: '#8B5CF6', dark: '#7C3AED', display: 'bg-purple-500' },
  { id: 'pink', name: 'Hot Pink', primary: '#EC4899', dark: '#DB2777', display: 'bg-pink-500' },
  { id: 'orange', name: 'Tiger Orange', primary: '#F97316', dark: '#EA580C', display: 'bg-orange-500' },
  { id: 'teal', name: 'Ocean Teal', primary: '#14B8A6', dark: '#0D9488', display: 'bg-teal-500' },
];

export const BACKGROUND_THEMES: { id: BackgroundTheme; name: string; className: string; preview: string }[] = [
  { 
    id: 'sunrise', 
    name: 'Sunrise', 
    className: 'bg-gradient-to-br from-orange-300 via-orange-100 to-blue-400 dark:bg-none dark:bg-gray-950', 
    preview: 'bg-gradient-to-br from-orange-400 to-blue-400' 
  },
  { 
    id: 'lavender', 
    name: 'Lavender', 
    className: 'bg-gradient-to-br from-purple-300 via-purple-100 to-pink-400 dark:bg-none dark:bg-gray-950', 
    preview: 'bg-gradient-to-br from-purple-400 to-pink-400' 
  },
  { 
    id: 'mint', 
    name: 'Mint', 
    className: 'bg-gradient-to-br from-emerald-300 via-emerald-100 to-teal-400 dark:bg-none dark:bg-gray-950', 
    preview: 'bg-gradient-to-br from-emerald-400 to-teal-400' 
  },
  { 
    id: 'sky', 
    name: 'Sky', 
    className: 'bg-gradient-to-br from-sky-300 via-sky-100 to-indigo-400 dark:bg-none dark:bg-gray-950', 
    preview: 'bg-gradient-to-br from-sky-400 to-indigo-400' 
  },
  { 
    id: 'paper', 
    name: 'Minimal', 
    className: 'bg-gray-200 dark:bg-none dark:bg-gray-950', 
    preview: 'bg-gray-300' 
  },
  { 
    id: 'white', 
    name: 'Pure White', 
    className: 'bg-white dark:bg-none dark:bg-gray-950', 
    preview: 'bg-white' 
  }
];