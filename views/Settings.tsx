
import React, { useState, useEffect } from 'react';
import { User, LanguageCode, AccentColor, BackgroundTheme } from '../types';
import { LANGUAGES, ACCENT_COLORS, BACKGROUND_THEMES, USER_AVATARS } from '../constants';
import { Button } from '../components/ui/Button';
import { t } from '../utils/translations';
import { 
  IconTheme, IconPalette, IconBackground, IconLanguage, IconNotification, 
  IconPrivacy, IconLogOut, IconChevronRight, IconX, IconCheck, 
  FlagIcon, IconUserPlus,
  IconInfo, IconBookOpen, IconKey, IconWalkingDog, IconClock, IconSparkles, IconCloud
} from '../components/Icons';
import { Mascot } from '../components/Mascot';
import { MasterWalkIllustration } from '../components/Illustrations';

interface SettingsProps {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  user: User;
  setUser: (u: User) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
  backgroundTheme: BackgroundTheme;
  setBackgroundTheme: (theme: BackgroundTheme) => void;
  notificationSettings: {
    enabled: boolean;
    reminders: boolean;
    achievements: boolean;
    social: boolean;
  };
  setNotificationSettings: (settings: any) => void;
  privacySettings: {
    shareLocation: boolean;
    profilePublic: boolean;
    analyticsEnabled: boolean;
  };
  setPrivacySettings: (settings: any) => void;
  onLogout: () => void;
}

export const SettingsView: React.FC<SettingsProps> = ({ 
  darkMode, setDarkMode, user, setUser, language, setLanguage, 
  accentColor, setAccentColor, backgroundTheme, setBackgroundTheme,
  notificationSettings, setNotificationSettings,
  privacySettings, setPrivacySettings,
  onLogout
}) => {
  const [showLangModal, setShowLangModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showLearningModal, setShowLearningModal] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentLearningSlide, setCurrentLearningSlide] = useState(0);
  const [isAccentExpanded, setIsAccentExpanded] = useState(false);
  const [isBackgroundExpanded, setIsBackgroundExpanded] = useState(false);
  
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    avatar: user.avatar
  });

  const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    // Check if an API key is already selected in the AI Studio environment
    const checkKey = async () => {
      if ((window as any).aistudio && (window as any).aistudio.hasSelectedApiKey) {
        const hasKey = await (window as any).aistudio.hasSelectedApiKey();
        setHasApiKey(hasKey);
      }
    };
    checkKey();
  }, []);

  const handleConnectKey = async () => {
    if ((window as any).aistudio && (window as any).aistudio.openSelectKey) {
      await (window as any).aistudio.openSelectKey();
      // Assume success after dialog closes or returns, check again
      if ((window as any).aistudio.hasSelectedApiKey) {
        const hasKey = await (window as any).aistudio.hasSelectedApiKey();
        setHasApiKey(hasKey);
      }
    }
  };

  const handleSaveProfile = () => {
    if (!profileForm.name.trim()) return;
    setUser({
      ...user,
      name: profileForm.name,
      avatar: profileForm.avatar
    });
    setShowProfileModal(false);
  };

  const tipsContent = [
    {
      title: t(language, 'tip_walk_title'),
      desc: t(language, 'tip_walk_desc'),
      icon: <MasterWalkIllustration className="w-32 h-32 object-contain drop-shadow-md" />,
      color: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      title: t(language, 'tip_time_title'),
      desc: t(language, 'tip_time_desc'),
      icon: <IconClock size={80} className="text-pawgo-orange animate-spin-slow drop-shadow-md" />,
      color: 'bg-orange-100 dark:bg-orange-900/30'
    },
    {
      title: t(language, 'tip_hydration_title'),
      desc: t(language, 'tip_hydration_desc'),
      icon: <div className="text-blue-500 animate-bounce drop-shadow-md"><IconCloud size={80} /></div>, // Simulating water with cloud/blue
      color: 'bg-sky-100 dark:bg-sky-900/30'
    },
    {
      title: t(language, 'tip_check_title'),
      desc: t(language, 'tip_check_desc'),
      icon: <IconSparkles size={80} className="text-pawgo-green animate-pulse drop-shadow-md" />,
      color: 'bg-green-100 dark:bg-green-900/30'
    },
    {
        title: t(language, 'tip_social_title'),
        desc: t(language, 'tip_social_desc'),
        icon: <IconUserPlus size={80} className="text-purple-500 animate-wiggle drop-shadow-md" />,
        color: 'bg-purple-100 dark:bg-purple-900/30'
    }
  ];

  const nextTip = () => {
    if (currentLearningSlide < tipsContent.length - 1) {
        setCurrentLearningSlide(c => c + 1);
    } else {
        setShowLearningModal(false);
        setCurrentLearningSlide(0);
    }
  };

  const prevTip = () => {
    if (currentLearningSlide > 0) {
        setCurrentLearningSlide(c => c - 1);
    }
  };

  return (
    <div className="p-6 pt-safe-top pb-36 h-full overflow-y-auto relative no-scrollbar">
      <div className="pt-12">
        <h1 className="text-3xl font-display font-bold mb-6 text-black dark:text-white">{t(language, 'settings')}</h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-[2.2rem] border-b-4 border-gray-100 dark:border-gray-700 mb-8 flex items-center gap-4 shadow-sm">
           <div className="relative">
              <img src={user.avatar} className="w-16 h-16 rounded-full border-4 border-pawgo-cream dark:border-gray-600 object-cover bg-gray-50 dark:bg-gray-700" alt="Profile" />
           </div>
           <div className="flex-1">
              <h2 className="font-bold text-xl truncate pr-2 text-black dark:text-white">{user.name}</h2>
              <span className="text-[10px] bg-pawgo-blue text-white px-2 py-0.5 rounded-md font-black uppercase tracking-widest">{t(language, 'packLeader')}</span>
           </div>
           <div className="ml-auto">
              <Button size="sm" variant="outline" className="font-black h-10 px-4 border-2 border-gray-300 dark:border-gray-600 text-black dark:text-white" onClick={() => {
                  setProfileForm({ name: user.name, avatar: user.avatar });
                  setShowProfileModal(true);
              }}>{t(language, 'editProfile')}</Button>
           </div>
        </div>

        <div className="space-y-6">
           <section>
              <h3 className="font-black text-black dark:text-gray-400 uppercase text-[10px] tracking-widest mb-3 px-2 opacity-80">{t(language, 'appearance')}</h3>
              <div className="bg-white dark:bg-gray-800 rounded-[2.2rem] overflow-hidden border-2 border-gray-100 dark:border-gray-700 divide-y-2 divide-gray-50 dark:divide-gray-700">
                 
                 <div className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors active:bg-gray-100 dark:active:bg-gray-600" onClick={() => setDarkMode(!darkMode)}>
                    <div className="flex items-center gap-4">
                       <div className="p-2 text-black dark:text-gray-200">
                          <IconTheme size={32} />
                       </div>
                       <span className="font-bold text-lg text-black dark:text-white">{t(language, 'darkMode')}</span>
                    </div>
                    <div className={`w-12 h-7 rounded-full p-1 transition-colors ${darkMode ? 'bg-pawgo-green' : 'bg-gray-300'}`}>
                       <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </div>
                 </div>

                 <div className="transition-all duration-300">
                    <button 
                      onClick={() => setIsAccentExpanded(!isAccentExpanded)}
                      className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors active:bg-gray-100 dark:active:bg-gray-600"
                    >
                       <div className="flex items-center gap-4">
                          <div className="p-2 text-black dark:text-gray-200">
                             <IconPalette size={32} />
                          </div>
                          <span className="font-bold text-lg text-black dark:text-white">{t(language, 'accentColor')}</span>
                       </div>
                       <div className={`transition-transform duration-300 ${isAccentExpanded ? 'rotate-90' : ''}`}>
                          <IconChevronRight size={20} className="text-black dark:text-gray-500" />
                       </div>
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isAccentExpanded ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                       <div className="p-5 pt-2">
                          <div className="flex gap-4 justify-between px-2">
                              {ACCENT_COLORS.map((c) => (
                              <button
                                  key={c.id}
                                  onClick={() => setAccentColor(c.id)}
                                  className={`w-12 h-12 rounded-full ${c.display} flex items-center justify-center transition-transform active:scale-95 border-2 ${accentColor === c.id ? 'border-black dark:border-white scale-110 shadow-md' : 'border-transparent opacity-80 hover:opacity-100'}`}
                                  aria-label={c.name}
                              >
                                  {accentColor === c.id && <IconCheck className="text-white" size={16} />}
                              </button>
                              ))}
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="transition-all duration-300">
                    <button 
                      disabled={darkMode}
                      onClick={() => setIsBackgroundExpanded(!isBackgroundExpanded)}
                      className={`w-full flex items-center justify-between p-5 transition-colors ${darkMode ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-gray-100 dark:active:bg-gray-600'}`}
                    >
                       <div className="flex items-center gap-4">
                          <div className="p-2 text-black dark:text-gray-200">
                             <IconBackground size={32} />
                          </div>
                          <div className="text-left">
                             <span className="font-bold text-lg text-black dark:text-white block leading-tight">{t(language, 'backgroundTheme')}</span>
                             {darkMode && <span className="text-[9px] font-black text-pawgo-red uppercase tracking-widest">{t(language, 'lockedDarkMode')}</span>}
                          </div>
                       </div>
                       <div className={`transition-transform duration-300 ${isBackgroundExpanded ? 'rotate-90' : ''}`}>
                          <IconChevronRight size={20} className="text-black dark:text-gray-500" />
                       </div>
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isBackgroundExpanded && !darkMode ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                       <div className="p-5 pt-2">
                          <div className="grid grid-cols-3 gap-3 px-2">
                              {BACKGROUND_THEMES.map((bg) => (
                              <button
                                  key={bg.id}
                                  onClick={() => setBackgroundTheme(bg.id)}
                                  className={`h-12 rounded-2xl ${bg.preview} border-2 flex items-center justify-center transition-transform active:scale-95 ${backgroundTheme === bg.id ? 'border-black dark:border-white scale-105 shadow-md' : 'border-black/20 dark:border-white/20 opacity-70 hover:opacity-100'}`}
                                  aria-label={bg.name}
                              >
                                  {backgroundTheme === bg.id && <IconCheck className="text-black dark:text-white" size={16} />}
                              </button>
                              ))}
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </section>

           <section>
              <h3 className="font-black text-black dark:text-gray-400 uppercase text-[10px] tracking-widest mb-3 px-2 opacity-80">{t(language, 'general')}</h3>
              <div className="bg-white dark:bg-gray-800 rounded-[2.2rem] overflow-hidden border-2 border-gray-100 dark:border-gray-700 divide-y-2 divide-gray-50 dark:divide-gray-700">
                 <button 
                    className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors active:bg-gray-100 dark:active:bg-gray-600"
                    onClick={() => setShowLangModal(true)}
                 >
                    <div className="flex items-center gap-4">
                       <div className="p-2 text-black dark:text-gray-200"><IconLanguage size={32} /></div>
                       <span className="font-bold text-lg text-black dark:text-white">{t(language, 'language')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-600">
                          <FlagIcon code={language} size={20} />
                          <span className="text-sm text-black dark:text-gray-300 font-black">{currentLang.name}</span>
                       </div>
                       <IconChevronRight size={20} className="text-black dark:text-gray-500" />
                    </div>
                 </button>

                 <button 
                    onClick={() => setShowNotifModal(true)}
                    className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors active:bg-gray-100 dark:active:bg-gray-600"
                 >
                    <div className="flex items-center gap-4">
                       <div className="p-2 text-black dark:text-gray-200"><IconNotification size={32} /></div>
                       <span className="font-bold text-lg text-black dark:text-white">{t(language, 'notifications')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${notificationSettings.enabled ? 'text-pawgo-green' : 'text-black dark:text-white'}`}>
                        {notificationSettings.enabled ? 'On' : 'Off'}
                      </span>
                      <IconChevronRight size={20} className="text-black dark:text-gray-500" />
                    </div>
                 </button>
                 
                 <button 
                   onClick={() => setShowPrivacyModal(true)}
                   className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors active:bg-gray-100 dark:active:bg-gray-600"
                 >
                    <div className="flex items-center gap-4">
                       <div className="p-2 text-black dark:text-gray-200"><IconPrivacy size={32} /></div>
                       <span className="font-bold text-lg text-black dark:text-white">{t(language, 'privacy')}</span>
                    </div>
                    <IconChevronRight size={20} className="text-black dark:text-gray-500" />
                 </button>
              </div>
           </section>

           {/* AI Configuration Section */}
           <section>
              <h3 className="font-black text-black dark:text-gray-400 uppercase text-[10px] tracking-widest mb-3 px-2 opacity-80">AI Configuration</h3>
              <div className="bg-white dark:bg-gray-800 rounded-[2.2rem] overflow-hidden border-2 border-gray-100 dark:border-gray-700">
                 <button 
                    onClick={handleConnectKey}
                    className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors active:bg-gray-100 dark:active:bg-gray-600"
                 >
                    <div className="flex items-center gap-4">
                       <div className="p-2 text-black dark:text-gray-200"><IconKey size={32} /></div>
                       <div className="text-left">
                          <span className="font-bold text-lg text-black dark:text-white block leading-tight">Google AI Access</span>
                          <span className={`text-[10px] font-black uppercase tracking-widest ${hasApiKey ? 'text-pawgo-green' : 'text-orange-500'}`}>
                             {hasApiKey ? 'Connected' : 'Not Connected'}
                          </span>
                       </div>
                    </div>
                    <IconChevronRight size={20} className="text-black dark:text-gray-500" />
                 </button>
              </div>
           </section>

           <section>
              <h3 className="font-black text-black dark:text-gray-400 uppercase text-[10px] tracking-widest mb-3 px-2 opacity-80">{t(language, 'support')}</h3>
              <div className="bg-white dark:bg-gray-800 rounded-[2.2rem] overflow-hidden border-2 border-gray-100 dark:border-gray-700 divide-y-2 divide-gray-50 dark:divide-gray-700">
                 <button 
                    onClick={() => setShowLearningModal(true)}
                    className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors active:bg-gray-100 dark:active:bg-gray-600"
                 >
                    <div className="flex items-center gap-4">
                       <div className="p-2 text-black dark:text-gray-200"><IconBookOpen size={32} /></div>
                       <span className="font-bold text-lg text-black dark:text-white">{t(language, 'learning')}</span>
                    </div>
                    <IconChevronRight size={20} className="text-black dark:text-gray-500" />
                 </button>

                 <button 
                    onClick={() => setShowAboutModal(true)}
                    className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors active:bg-gray-100 dark:active:bg-gray-600"
                 >
                    <div className="flex items-center gap-4">
                       <div className="p-2 text-black dark:text-gray-200"><IconInfo size={32} /></div>
                       <span className="font-bold text-lg text-black dark:text-white">{t(language, 'about')}</span>
                    </div>
                    <IconChevronRight size={20} className="text-black dark:text-gray-500" />
                 </button>
              </div>
           </section>

           <div className="pt-6 pb-safe-bottom">
              <Button 
                  onClick={onLogout}
                  variant="ghost" 
                  fullWidth 
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 h-14 rounded-2xl font-black"
              >
                 <IconLogOut size={22} className="mr-2" /> {t(language, 'logOut')}
              </Button>
              <p className="text-center text-[10px] text-black dark:text-gray-400 font-black tracking-widest uppercase mt-6 opacity-60">PawGo App 1.0</p>
           </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-6 backdrop-blur-sm animate-pop">
           <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-[3rem] p-10 shadow-2xl relative flex flex-col border-2 border-white/20">
              <button onClick={() => setShowProfileModal(false)} className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-800 rounded-full active:scale-90 transition-all">
                <IconX size={20} className="text-black dark:text-white" />
              </button>
              <h2 className="text-2xl font-display font-bold text-black dark:text-white mb-8">{t(language, 'editProfile')}</h2>
              
              <div className="flex flex-col gap-8">
                 <div className="flex justify-center mb-4">
                    <img src={profileForm.avatar} className="w-32 h-32 rounded-[2.5rem] border-4 border-pawgo-green shadow-xl bg-gray-50 dark:bg-gray-800" alt="Avatar Preview" />
                 </div>

                 <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2 mb-2 block">{t(language, 'yourName')}</label>
                    <input 
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                      className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 font-bold text-base text-black dark:text-white focus:border-pawgo-green focus:outline-none transition-all"
                    />
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-2 block">{t(language, 'chooseAvatar')}</label>
                    <div className="grid grid-cols-4 gap-3 max-h-48 overflow-y-auto no-scrollbar p-1">
                       {USER_AVATARS.map((av, idx) => (
                          <button 
                            key={idx} 
                            onClick={() => setProfileForm({...profileForm, avatar: av})}
                            className={`aspect-square rounded-xl overflow-hidden border-2 transition-all active:scale-90 ${profileForm.avatar === av ? 'border-pawgo-green scale-105 shadow-md bg-pawgo-green/5' : 'border-transparent bg-gray-50 dark:bg-gray-800'}`}
                          >
                             <img src={av} alt="Avatar option" />
                          </button>
                       ))}
                    </div>
                 </div>

                 <Button fullWidth size="lg" onClick={handleSaveProfile} className="rounded-2xl h-14 font-black">
                    {t(language, 'save')}
                 </Button>
              </div>
           </div>
        </div>
      )}

      {/* Language Modal */}
      {showLangModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-6 backdrop-blur-sm animate-pop">
           <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-[3rem] p-10 shadow-2xl relative flex flex-col max-h-[80vh] border-2 border-white/20">
              <button onClick={() => setShowLangModal(false)} className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                <IconX size={20} className="text-black dark:text-white" />
              </button>
              <h2 className="text-2xl font-display font-bold text-black dark:text-white mb-6">{t(language, 'language')}</h2>
              <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 pr-1">
                 {LANGUAGES.map(lang => (
                    <button 
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLangModal(false);
                      }}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all active:scale-[0.98] ${language === lang.code ? 'bg-pawgo-blue text-white shadow-lg shadow-pawgo-blue/20 scale-[1.02]' : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-black dark:text-gray-300'}`}
                    >
                       <div className="flex items-center gap-4">
                          <FlagIcon code={lang.code} size={24} />
                          <span className="font-bold">{lang.name}</span>
                       </div>
                       {language === lang.code && <IconCheck size={20} />}
                    </button>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* Notifications Modal */}
      {showNotifModal && (
         <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-6 backdrop-blur-sm animate-pop">
            <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-[3rem] p-10 shadow-2xl relative flex flex-col border-2 border-white/20">
               <button onClick={() => setShowNotifModal(false)} className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                 <IconX size={20} className="text-black dark:text-white" />
               </button>
               <h2 className="text-2xl font-display font-bold text-black dark:text-white mb-8">{t(language, 'notifications')}</h2>
               
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="font-bold text-black dark:text-white">{t(language, 'enableNotif')}</p>
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mt-1">{t(language, 'masterSwitch')}</p>
                     </div>
                     <button onClick={() => setNotificationSettings({...notificationSettings, enabled: !notificationSettings.enabled})} className={`w-12 h-7 rounded-full p-1 transition-colors ${notificationSettings.enabled ? 'bg-pawgo-green' : 'bg-gray-300'}`}>
                        <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${notificationSettings.enabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
                     </button>
                  </div>
                  <div className={`space-y-6 transition-opacity ${notificationSettings.enabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                     <div className="flex items-center justify-between">
                        <p className="font-bold text-black dark:text-white">{t(language, 'walkReminders')}</p>
                        <button onClick={() => setNotificationSettings({...notificationSettings, reminders: !notificationSettings.reminders})} className={`w-12 h-7 rounded-full p-1 transition-colors ${notificationSettings.reminders ? 'bg-pawgo-green' : 'bg-gray-300'}`}>
                           <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${notificationSettings.reminders ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </button>
                     </div>
                     <div className="flex items-center justify-between">
                        <p className="font-bold text-black dark:text-white">{t(language, 'achievements')}</p>
                        <button onClick={() => setNotificationSettings({...notificationSettings, achievements: !notificationSettings.achievements})} className={`w-12 h-7 rounded-full p-1 transition-colors ${notificationSettings.achievements ? 'bg-pawgo-green' : 'bg-gray-300'}`}>
                           <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${notificationSettings.achievements ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </button>
                     </div>
                  </div>
                  <Button fullWidth size="lg" onClick={() => setShowNotifModal(false)} className="rounded-2xl h-14 font-black mt-4">{t(language, 'done')}</Button>
               </div>
            </div>
         </div>
      )}

      {/* Privacy Modal */}
      {showPrivacyModal && (
         <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-6 backdrop-blur-sm animate-pop">
            <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-[3rem] p-10 shadow-2xl relative flex flex-col border-2 border-white/20">
               <button onClick={() => setShowPrivacyModal(false)} className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                 <IconX size={20} className="text-black dark:text-white" />
               </button>
               <h2 className="text-2xl font-display font-bold text-black dark:text-white mb-8">{t(language, 'privacy')}</h2>
               
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="font-bold text-black dark:text-white">{t(language, 'shareLoc')}</p>
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mt-1">{t(language, 'shareLocDesc')}</p>
                     </div>
                     <button onClick={() => setPrivacySettings({...privacySettings, shareLocation: !privacySettings.shareLocation})} className={`w-12 h-7 rounded-full p-1 transition-colors ${privacySettings.shareLocation ? 'bg-pawgo-green' : 'bg-gray-300'}`}>
                        <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${privacySettings.shareLocation ? 'translate-x-5' : 'translate-x-0'}`}></div>
                     </button>
                  </div>
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="font-bold text-black dark:text-white">{t(language, 'analyticsData')}</p>
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mt-1">{t(language, 'analyticsDataDesc')}</p>
                     </div>
                     <button onClick={() => setPrivacySettings({...privacySettings, analyticsEnabled: !privacySettings.analyticsEnabled})} className={`w-12 h-7 rounded-full p-1 transition-colors ${privacySettings.analyticsEnabled ? 'bg-pawgo-green' : 'bg-gray-300'}`}>
                        <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${privacySettings.analyticsEnabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
                     </button>
                  </div>
                  <Button fullWidth size="lg" onClick={() => setShowPrivacyModal(false)} className="rounded-2xl h-14 font-black mt-4">{t(language, 'save')}</Button>
               </div>
            </div>
         </div>
      )}

      {/* About Modal */}
      {showAboutModal && (
         <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-6 backdrop-blur-sm animate-pop">
            <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-[3rem] p-10 shadow-2xl relative flex flex-col items-center text-center border-2 border-white/20">
               <button onClick={() => setShowAboutModal(false)} className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                 <IconX size={20} className="text-black dark:text-white" />
               </button>
               <div className="w-24 h-24 bg-pawgo-blue/10 rounded-3xl flex items-center justify-center p-4 mb-6 shadow-inner border border-white/20">
                  <Mascot mood="happy" />
               </div>
               <h2 className="text-3xl font-display font-bold text-black dark:text-white mb-2">PawGo</h2>
               <p className="text-black dark:text-gray-400 font-black uppercase tracking-widest text-[10px] mb-6 opacity-80">Version 1.0.0</p>
               
               <p className="text-sm font-bold text-black dark:text-gray-300 leading-relaxed mb-8 px-4">
                  {t(language, 'craftedWithLove')}
               </p>
               
               <div className="w-full pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{t(language, 'designedBy')}</p>
                  <p className="text-lg font-display font-bold text-black dark:text-white">PawGo Team</p>
               </div>
               
               <Button fullWidth size="lg" onClick={() => setShowAboutModal(false)} className="rounded-2xl h-14 font-black mt-8">
                  {t(language, 'close')}
               </Button>
            </div>
         </div>
      )}

      {/* Learning / Paw Care Tips Modal */}
      {showLearningModal && (
        <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-6 backdrop-blur-md animate-pop">
           <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-[3rem] p-8 shadow-2xl relative flex flex-col border-2 border-white/20 max-h-[85vh]">
              
              <div className="flex justify-between items-center mb-6">
                 <div>
                    <h2 className="text-2xl font-display font-bold text-black dark:text-white">{t(language, 'learning')}</h2>
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Tip {currentLearningSlide + 1} of {tipsContent.length}</p>
                 </div>
                 <button onClick={() => setShowLearningModal(false)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                   <IconX size={20} className="text-black dark:text-white" />
                 </button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                 <div className={`w-40 h-40 ${tipsContent[currentLearningSlide].color} rounded-full flex items-center justify-center mb-8 relative group`}>
                    <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-20" style={{ animationDuration: '3s' }}></div>
                    {tipsContent[currentLearningSlide].icon}
                 </div>
                 
                 <h3 className="text-2xl font-bold text-black dark:text-white mb-4 leading-tight">
                    {tipsContent[currentLearningSlide].title}
                 </h3>
                 
                 <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                    {tipsContent[currentLearningSlide].desc}
                 </p>
              </div>

              <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100 dark:border-gray-800">
                 <button 
                    onClick={prevTip} 
                    disabled={currentLearningSlide === 0}
                    className={`p-3 rounded-xl transition-colors ${currentLearningSlide === 0 ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed' : 'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                 >
                    <IconChevronRight size={24} className="rotate-180" />
                 </button>

                 <div className="flex gap-2">
                    {tipsContent.map((_, idx) => (
                       <div 
                         key={idx} 
                         className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentLearningSlide ? 'w-6 bg-pawgo-blue' : 'bg-gray-200 dark:bg-gray-700'}`}
                       />
                    ))}
                 </div>

                 <button 
                    onClick={nextTip}
                    className="p-3 bg-pawgo-blue text-white rounded-xl shadow-lg shadow-pawgo-blue/30 active:scale-95 transition-all"
                 >
                    {currentLearningSlide === tipsContent.length - 1 ? <IconCheck size={24} /> : <IconChevronRight size={24} />}
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
