
import React from 'react';
import { ViewState, LanguageCode } from '../types';
import { t } from '../utils/translations';
import { IconNavHome, IconNavDogs, IconNavWalk, IconNavStats, IconNavSettings } from './Icons';

interface BottomNavProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  language: LanguageCode;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onChangeView, language }) => {
  const navItems = [
    { 
      view: 'HOME', 
      icon: IconNavHome, 
      label: t(language, 'nav_home'),
      activeColor: 'text-pawgo-blue bg-pawgo-blue/10',
      activeText: 'text-pawgo-blue'
    },
    { 
      view: 'DOGS', 
      icon: IconNavDogs, 
      label: t(language, 'nav_dogs'), 
      // Use static tailwind colors for bg to ensure visibility, as variable-based opacity can fail
      activeColor: 'text-pawgo-green bg-green-100 dark:bg-green-900/30',
      activeText: 'text-pawgo-green'
    },
    { 
      view: 'WALK_PREP', 
      icon: IconNavWalk, 
      label: t(language, 'nav_walk'),
      activeColor: 'text-pawgo-blue bg-pawgo-blue/10',
      activeText: 'text-pawgo-blue'
    },
    { 
      view: 'STATS', 
      icon: IconNavStats, 
      label: t(language, 'nav_stats'),
      activeColor: 'text-pawgo-red bg-pawgo-red/10',
      activeText: 'text-pawgo-red'
    },
    { 
      view: 'SETTINGS', 
      icon: IconNavSettings, 
      label: t(language, 'nav_settings'),
      activeColor: 'text-purple-500 bg-purple-500/10',
      activeText: 'text-purple-500'
    },
  ];

  // If we are in an active walk or AI chat, hide the nav to focus user and avoid overlap.
  if (currentView === 'WALK_ACTIVE' || currentView === 'WALK_SUMMARY' || currentView === 'AI_CHAT') return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t-2 border-gray-200 dark:border-gray-800 pb-safe pt-2 pb-2 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentView === item.view || (item.view === 'WALK_PREP' && currentView.startsWith('WALK'));
          const Icon = item.icon;
          
          return (
            <button
              key={item.view}
              onClick={() => onChangeView(item.view as ViewState)}
              className="flex-1 flex flex-col items-center justify-center py-2 group active:opacity-70"
            >
              <div 
                className={`
                  w-12 h-10 flex items-center justify-center mb-1 transition-all duration-300
                  ${isActive ? `${item.activeColor} rounded-2xl scale-110 shadow-sm` : 'text-gray-400 bg-transparent rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800'}
                `}
              >
                 <Icon size={26} />
              </div>
              <span 
                className={`
                  text-[10px] font-display font-bold uppercase tracking-wider transition-colors
                  ${isActive ? 'text-black dark:text-white opacity-100' : 'text-gray-400 opacity-70'}
                `}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
