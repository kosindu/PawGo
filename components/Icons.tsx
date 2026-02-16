
import React from 'react';
import { LanguageCode } from '../types';
import { LANGUAGES } from '../constants';

type IconProps = {
  size?: number;
  className?: string;
  color?: string;
};

// --- GENERAL ICONS ---

// The primary icon for sending messages in AI Chat
export const IconSend: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Generic user profile icon
export const IconUser: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// Standard close icon
export const IconX: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

// Success checkmark icon
export const IconCheck: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

// Standard add/plus icon
export const IconPlus: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

// Standard edit/pencil icon
export const IconEdit: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

// Standard delete/trash icon
export const IconTrash: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
  </svg>
);

// Right-pointing chevron
export const IconChevronRight: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 18l6-6-6-6" />
  </svg>
);

// Left-pointing chevron
export const IconChevronLeft: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

// Key icon for API settings
export const IconKey: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);

// --- NAVIGATION ICONS ---

// The colorful home icon used in the bottom navigation
export const IconNavHome: React.FC<IconProps> = ({ size = 28, className }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <rect x="22" y="6" width="4" height="6" rx="1" fill="#FF8E29"/>
    <rect x="6" y="14" width="20" height="16" rx="3" fill="#38BDF8"/>
    <rect x="6" y="26" width="20" height="4" rx="2" fill="#0EA5E9"/>
    <path d="M2 16L16 3L30 16" stroke="#FFC800" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 16L16 3L30 16" stroke="#FFD940" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 30V20C12 18.8954 12.8954 18 14 18H18C19.1046 18 20 18.8954 20 20V30" fill="white"/>
  </svg>
);

// The green paw-inspired icon for the Dogs view
export const IconNavDogs: React.FC<IconProps> = ({ size = 28, className }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <rect x="4" y="4" width="24" height="24" rx="6" fill="#58CC02" />
    <circle cx="16" cy="18" r="6" fill="white" />
    <circle cx="10" cy="12" r="3" fill="white" />
    <circle cx="16" cy="8" r="3" fill="white" />
    <circle cx="22" cy="12" r="3" fill="white" />
  </svg>
);

// The blue tracking icon for the Walk view
export const IconNavWalk: React.FC<IconProps> = ({ size = 28, className }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <rect x="4" y="4" width="24" height="24" rx="6" fill="#1CB0F6" />
    <path d="M12 22V10L22 16L12 22Z" fill="white" />
  </svg>
);

// The red analytics icon for the Stats view
export const IconNavStats: React.FC<IconProps> = ({ size = 28, className }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <rect x="4" y="4" width="24" height="24" rx="6" fill="#FF4B4B" />
    <rect x="9" y="16" width="4" height="7" rx="1" fill="white" />
    <rect x="14" y="12" width="4" height="11" rx="1" fill="white" />
    <rect x="19" y="9" width="4" height="14" rx="1" fill="white" />
  </svg>
);

// The purple configuration icon for the Settings view
export const IconNavSettings: React.FC<IconProps> = ({ size = 28, className }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <rect x="4" y="4" width="24" height="24" rx="6" fill="#AF85FF" />
    <path d="M16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11Z" stroke="white" strokeWidth="3" />
  </svg>
);

// --- TOOLS & ACTIVITY ICONS ---

// Interactive whistle icon
export const IconWhistle: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 7H6C4.89543 7 4 7.89543 4 9V15C4 16.1046 4.89543 17 6 17H18L22 12L18 7Z" />
    <path d="M9 7V5" />
    <path d="M13 7V5" />
  </svg>
);

// Interactive clicker icon
export const IconClicker: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="4" y="6" width="16" height="12" rx="2" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// Walking dog silhouette/icon
export const IconWalkingDog: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v8" />
    <path d="M9 12h6" />
    <path d="M10 21l2-6 2 6" />
    <path d="M15 15l2 3" />
    <path d="M7 15l2 3" />
  </svg>
);

// Map/Earth icon for distance/location
export const IconMap: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z" />
    <path d="M9 3v15" />
    <path d="M15 6v15" />
  </svg>
);

// Calendar icon for history
export const IconCalendar: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <path d="M16 2v4" />
    <path d="M8 2v4" />
    <path d="M3 10h18" />
  </svg>
);

// Streak/Flame icon for activity status
export const IconFlame: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3 2.5.5 4.5 2.5 4.5 5.5a3.5 3.5 0 11-7 0c0-1.1.447-2.1 1.172-2.828" />
    <path d="M12 2c0 3 2 4.5 2 7.5S12 13 12 13s-2-1-2-4 2-4.5 2-7.5z" />
  </svg>
);

// Play button icon
export const IconPlay: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 3l14 9-14 9V3z" />
  </svg>
);

// Pause button icon
export const IconPause: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 4h4v16H6V4zM14 4h4v16h-4V4z" />
  </svg>
);

// Achievement trophy icon
export const IconTrophy: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18M4 22h16M10 14.66V17M14 14.66V17M18 2H6v7a6 6 0 0012 0V2z" />
  </svg>
);

// Upward trending analytics icon
export const IconTrendingUp: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M23 6l-9.5 9.5-5-5L1 18" />
    <path d="M17 6h6v6" />
  </svg>
);

// Time/Clock icon
export const IconClock: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

// --- MISC ICONS ---

// Weather/Cloud icon
export const IconCloud: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17.5 19c3.037 0 5.5-2.463 5.5-5.5 0-2.91-2.26-5.283-5.11-5.485C17.443 4.214 14.12 1 10 1 6.357 1 3.327 3.515 2.22 6.945A5.002 5.002 0 005 17h12.5" />
  </svg>
);

// Sparkles/Magic icon for AI
export const IconSparkles: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3l1.912 5.813L20 10.725l-5.813 1.912L12 18.45l-1.912-5.813L4 10.725l5.813-1.912L12 3zM5 3l.956 2.906L9 6.863l-2.906.956L5 10.725l-.956-2.906L1 6.863l2.906-.956L5 3zM19 16l.956 2.906L23 19.863l-2.906.956L19 23.725l-.956-2.906L15 19.863l2.906-.956L19 16z" />
  </svg>
);

// Animated AI Icon
export const IconAIAnimated: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path 
        d="M12 3L14.5 8.5L20 11L14.5 13.5L12 19L9.5 13.5L4 11L9.5 8.5L12 3Z" 
        fill="currentColor" 
        className="animate-spin-slow origin-center" 
    />
    <g className="animate-pulse">
        <circle cx="18.5" cy="5.5" r="1.5" fill="currentColor" />
        <circle cx="5.5" cy="18.5" r="1.5" fill="currentColor" />
    </g>
    <path 
        d="M18 16L19 18L21 19L19 20L18 22L17 20L15 19L17 18L18 16Z" 
        fill="currentColor" 
        className="animate-bounce" 
    />
  </svg>
);

// Dark/Light mode theme icon
export const IconTheme: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41M12 7a5 5 0 100 10 5 5 0 000-10z" />
  </svg>
);

// Appearance/Palette icon
export const IconPalette: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10c1.1 0 2-.9 2-2 0-.49-.18-.93-.46-1.27-.28-.35-.41-.77-.41-1.23 0-1.1.9-2 2-2H19c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z" />
    <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" />
    <circle cx="10.5" cy="7.5" r="1.5" fill="currentColor" />
    <circle cx="13.5" cy="7.5" r="1.5" fill="currentColor" />
    <circle cx="16.5" cy="10.5" r="1.5" fill="currentColor" />
  </svg>
);

// Background/Image selection icon
export const IconBackground: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 15l5.12-5.12a3 3 0 014.24 0L21 18" />
    <path d="M13 13l3.12-3.12a3 3 0 014.24 0L21 11" />
  </svg>
);

// Globe icon for language selection
export const IconLanguage: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

// Bell icon for notifications
export const IconNotification: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

// Shield/Lock icon for privacy
export const IconPrivacy: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

// Exit/Logout icon
export const IconLogOut: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

// Add user/pack member icon
export const IconUserPlus: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="23" y1="11" x2="17" y2="11" />
  </svg>
);

// Information circle icon
export const IconInfo: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

// Open book icon for learning
export const IconBookOpen: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
    <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
  </svg>
);

// --- VOICE ICONS ---

// Microphone icon for voice interaction
export const IconMic: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
    <path d="M19 10v1a7 7 0 01-14 0v-1" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

// Microphone off icon for ending voice interaction
export const IconMicOff: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="1" y1="1" x2="23" y2="23" />
    <path d="M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6" />
    <path d="M17 16.95A7 7 0 015 11v-1" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

// Google Logo Icon
export const IconGoogle: React.FC<IconProps> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

// Renders the country flag associated with a language code
export const FlagIcon: React.FC<{ code: LanguageCode; size?: number }> = ({ code, size = 24 }) => {
  const lang = LANGUAGES.find(l => l.code === code);
  return <span style={{ fontSize: size }}>{lang?.flag || '🌐'}</span>;
};
