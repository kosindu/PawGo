
import React, { useState, useEffect } from 'react';
import { Dog, WalkLog, ViewState, User, LanguageCode, AccentColor, BackgroundTheme } from './types';
import { ACCENT_COLORS, BACKGROUND_THEMES } from './constants';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './views/Home';
import { DogsView } from './views/Dogs';
import { WalkView } from './views/Walk';
import { StatsView } from './views/Stats';
import { SettingsView } from './views/Settings';
import { AIChatView } from './views/AIChat';
import { AuthView } from './views/Auth';
import { SplashView } from './views/Splash';
import { db } from './utils/db';
import { Button } from './components/ui/Button';
import { Mascot } from './components/Mascot';
import { IconX } from './components/Icons';
import { t } from './utils/translations';

function App() {
  // Global State
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [walks, setWalks] = useState<WalkLog[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [accentColor, setAccentColor] = useState<AccentColor>('green');
  const [backgroundTheme, setBackgroundTheme] = useState<BackgroundTheme>('sunrise');
  const [notifications, setNotifications] = useState({
    enabled: true,
    reminders: true,
    achievements: true,
    social: false
  });
  const [privacy, setPrivacy] = useState({
    shareLocation: true,
    profilePublic: false,
    analyticsEnabled: true,
  });
  
  // Modal State for Empty Paws
  const [showNoPawsModal, setShowNoPawsModal] = useState(false);

  // Initial Data Load with Splash Screen
  useEffect(() => {
    const initApp = async () => {
      // 1. Minimum Splash Time (e.g., 3 seconds) for the "nice feeling"
      const splashMinTime = new Promise(resolve => setTimeout(resolve, 3000));
      
      // 2. Actual Data Loading
      const dataLoading = (async () => {
        const currentUser = await db.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          await loadUserData(currentUser.id);
        }
      })();

      // Wait for both
      await Promise.all([splashMinTime, dataLoading]);
      setIsLoading(false);
    };
    initApp();
  }, []);

  const loadUserData = async (userId: string) => {
    const userDogs = await db.getDogs(userId);
    const userWalks = await db.getWalks(userId);
    setDogs(userDogs);
    setWalks(userWalks);
  };

  // Theme Toggle Effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Accent Color Injection Effect
  useEffect(() => {
    const colorConfig = ACCENT_COLORS.find(c => c.id === accentColor) || ACCENT_COLORS[0];
    document.documentElement.style.setProperty('--color-primary', colorConfig.primary);
    document.documentElement.style.setProperty('--color-primary-dark', colorConfig.dark);
  }, [accentColor]);

  // Actions
  const handleLogin = async (loggedInUser: User) => {
    setUser(loggedInUser);
    setIsLoading(true); // Temporarily show loading/splash while fetching user data
    await loadUserData(loggedInUser.id);
    setIsLoading(false);
    setCurrentView('HOME');
  };

  const handleLogout = async () => {
    await db.logout();
    setUser(null);
    setDogs([]);
    setWalks([]);
    setCurrentView('HOME');
  };

  const handleActionRequiringPaws = (callback: () => void) => {
    if (dogs.length === 0) {
      setShowNoPawsModal(true);
    } else {
      callback();
    }
  };

  const handleNavigation = (view: ViewState) => {
    // Views that require at least one dog
    const protectedViews: ViewState[] = ['WALK_PREP', 'WALK_ACTIVE', 'STATS', 'AI_CHAT'];
    
    if (protectedViews.includes(view) && dogs.length === 0) {
      setShowNoPawsModal(true);
      return;
    }
    setCurrentView(view);
  };

  const handleAddWalk = async (log: WalkLog) => {
    if (!user) return;
    const walkWithWalker = { ...log, walkerId: user.id };
    await db.addWalk(walkWithWalker);
    
    // Refresh local state
    const newWalks = await db.getWalks(user.id);
    setWalks(newWalks);

    // Update dog stats locally and in DB
    const updatedDogs = dogs.map(d => {
      if (log.dogIds.includes(d.id)) {
        return {
          ...d,
          totalDistanceKm: d.totalDistanceKm + log.distanceKm,
          totalWalks: d.totalWalks + 1,
          streak: d.streak + 1
        };
      }
      return d;
    });
    
    setDogs(updatedDogs);
    // Sync updates to DB
    updatedDogs.forEach(d => db.updateDog(d));
  };

  const handleUpdateWalk = async (updatedLog: WalkLog) => {
    await db.updateWalk(updatedLog);
    if(user) setWalks(await db.getWalks(user.id));
  };

  const handleDeleteWalk = async (id: string) => {
    await db.deleteWalk(id);
    if(user) setWalks(await db.getWalks(user.id));
  };

  const handleUpdateDog = async (updatedDog: Dog) => {
    await db.updateDog(updatedDog);
    if(user) setDogs(await db.getDogs(user.id));
  };
  
  const handleAddDog = async (newDog: Dog) => {
    if (!user) return;
    const dogWithOwner = { ...newDog, ownerId: user.id };
    await db.addDog(dogWithOwner);
    setDogs(await db.getDogs(user.id));
  };

  const handleDeleteDog = async (id: string) => {
    await db.deleteDog(id);
    if(user) setDogs(await db.getDogs(user.id));
  }

  const handleUpdateUser = async (updatedUser: User) => {
    await db.updateUser(updatedUser);
    setUser(updatedUser);
  };

  // Determine current background class
  const currentBgClass = BACKGROUND_THEMES.find(t => t.id === backgroundTheme)?.className || BACKGROUND_THEMES[0].className;

  // Show Splash Screen
  if (isLoading) {
    return <SplashView />;
  }

  if (!user) {
    return <AuthView onLogin={handleLogin} />;
  }

  // Render View Switcher
  const renderView = () => {
    switch (currentView) {
      case 'HOME':
        return <HomeView 
          user={user} 
          dogs={dogs} 
          walks={walks} 
          onChangeView={handleNavigation} 
          language={language}
          onRequirePaws={handleActionRequiringPaws}
        />;
      case 'DOGS':
        return <DogsView dogs={dogs} onUpdateDog={handleUpdateDog} onAddDog={handleAddDog} onDeleteDog={handleDeleteDog} currentUser={user} language={language} />;
      case 'WALK_PREP':
      case 'WALK_ACTIVE':
      case 'WALK_SUMMARY':
        return <WalkView 
          viewState={currentView} 
          setViewState={setCurrentView} 
          dogs={dogs} 
          onFinishWalk={handleAddWalk}
          language={language}
        />;
      case 'STATS':
        return <StatsView 
          walks={walks} 
          dogs={dogs} 
          language={language} 
          accentColor={accentColor} 
          onAddWalk={handleAddWalk}
          onUpdateWalk={handleUpdateWalk}
          onDeleteWalk={handleDeleteWalk}
        />;
      case 'SETTINGS':
        return <SettingsView 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          user={user} 
          setUser={handleUpdateUser}
          language={language} 
          setLanguage={setLanguage}
          accentColor={accentColor}
          setAccentColor={setAccentColor}
          backgroundTheme={backgroundTheme}
          setBackgroundTheme={setBackgroundTheme}
          notificationSettings={notifications}
          setNotificationSettings={setNotifications}
          privacySettings={privacy}
          setPrivacySettings={setPrivacy}
          onLogout={handleLogout}
        />;
      case 'AI_CHAT':
        return <AIChatView 
          user={user} 
          dogs={dogs} 
          language={language} 
          onBack={() => setCurrentView('HOME')} 
        />;
      default:
        return <HomeView 
          user={user} 
          dogs={dogs} 
          walks={walks} 
          onChangeView={handleNavigation} 
          language={language} 
          onRequirePaws={handleActionRequiringPaws}
        />;
    }
  };

  return (
    <div className="fixed inset-0 w-full h-[100dvh] font-sans antialiased text-gray-900 dark:text-gray-100 selection:bg-pawgo-green selection:text-white bg-gray-100 dark:bg-gray-950 overflow-hidden">
      <main className={`w-full h-full relative overflow-hidden shadow-2xl transition-colors duration-500 flex flex-col ${currentBgClass}`}>
        <div className="flex-1 w-full h-full relative overflow-hidden">
           {renderView()}
        </div>
        <BottomNav currentView={currentView} onChangeView={handleNavigation} language={language} />
        
        {/* No Paws Modal */}
        {showNoPawsModal && (
          <div className="absolute inset-0 bg-black/70 z-[200] flex items-center justify-center p-6 backdrop-blur-sm animate-pop">
             <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-[3rem] p-8 text-center shadow-2xl relative border-4 border-pawgo-green/30">
                <button 
                  onClick={() => setShowNoPawsModal(false)}
                  className="absolute top-5 right-5 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-black dark:text-white"
                >
                  <IconX size={20} />
                </button>
                
                <div className="w-32 h-32 mx-auto mb-6 bg-pawgo-green/10 rounded-full flex items-center justify-center p-4">
                   <Mascot mood="happy" />
                </div>
                
                <h2 className="text-2xl font-display font-bold text-black dark:text-white mb-3">{t(language, 'noPaws')}</h2>
                <p className="text-gray-500 dark:text-gray-400 font-bold text-sm mb-8 leading-relaxed px-2">
                   You need to add the PAWS first to use this feature!
                </p>
                
                <Button 
                  fullWidth 
                  size="lg" 
                  onClick={() => {
                    setShowNoPawsModal(false);
                    setCurrentView('DOGS');
                  }}
                  className="rounded-2xl h-14 font-black shadow-xl shadow-pawgo-green/20"
                >
                   {t(language, 'addFirstPaw')}
                </Button>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
