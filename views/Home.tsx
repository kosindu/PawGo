
import React, { useState, useRef, useEffect } from 'react';
import { Dog, WalkLog, ViewState, LanguageCode, User } from '../types';
import { Button } from '../components/ui/Button';
import { t } from '../utils/translations';
import { IconWhistle, IconClicker, IconX, IconChevronRight, IconMap, IconCalendar, IconSparkles, IconAIAnimated } from '../components/Icons';
import { Mascot } from '../components/Mascot';
import { DogHomeSVG } from '../components/DogHomeSVG';
import { DogAvatar } from '../components/DogAvatar';

interface HomeProps {
  user: User;
  dogs: Dog[];
  walks: WalkLog[];
  onChangeView: (view: ViewState) => void;
  language: LanguageCode;
  onRequirePaws: (callback: () => void) => void;
}

const GREETING_KEYS = ['beautifulDay', 'greeting_adventure', 'greeting_great', 'greeting_sniff'] as const;

// Custom decorative components for the Hero card
const CloudSVG = ({ size = 24, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 100 60" className={className} fill="currentColor">
    <path d="M28.5,58 C12.8,58 0,45.2 0,29.5 C0,13.8 12.8,1 28.5,1 C31.1,1 33.6,1.4 36,2 C40.5,2 44.5,4.5 47,8.5 C52.5,3.5 60,0.5 68,0.5 C85.7,0.5 100,14.8 100,32.5 C100,50.2 85.7,64.5 68,64.5 L28.5,58 Z" />
  </svg>
);

const StarSVG = ({ size = 24, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 0C12 0 14.5 8 19 12C14.5 16 12 24 12 24C12 24 9.5 16 5 12C9.5 8 12 0 12 0Z" />
  </svg>
);

export const HomeView: React.FC<HomeProps> = ({ user, dogs, walks, onChangeView, language, onRequirePaws }) => {
  const totalKm = walks.reduce((acc, curr) => acc + curr.distanceKm, 0);
  const totalWalksCount = walks.length;
  const [greetingKey] = useState(() => GREETING_KEYS[Math.floor(Math.random() * GREETING_KEYS.length)]);
  
  const [showWhistleModal, setShowWhistleModal] = useState(false);
  const [showClickerModal, setShowClickerModal] = useState(false);
  const [whistleVolume, setWhistleVolume] = useState(0.5);
  const [clickerVolume, setClickerVolume] = useState(0.8);
  const [isWhistling, setIsWhistling] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const whistleNodesRef = useRef<{ osc: OscillatorNode; gain: GainNode; lfo: OscillatorNode } | null>(null);

  const getAudioCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  };

  const startWhistleSound = () => {
    const ctx = getAudioCtx();
    setIsWhistling(true);

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(2800, ctx.currentTime);
    
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(20, ctx.currentTime);
    lfoGain.gain.setValueAtTime(40, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(whistleVolume, ctx.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    lfo.start();

    whistleNodesRef.current = { osc, gain, lfo };
  };

  const stopWhistleSound = () => {
    setIsWhistling(false);
    if (!whistleNodesRef.current || !audioCtxRef.current) return;

    const { osc, gain, lfo } = whistleNodesRef.current;
    const ctx = audioCtxRef.current;

    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);

    setTimeout(() => {
      if (whistleNodesRef.current) {
        osc.stop();
        lfo.stop();
        whistleNodesRef.current = null;
      }
    }, 150);
  };

  const playClickerSound = () => {
    const ctx = getAudioCtx();
    setIsClicking(true);

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(3500, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(clickerVolume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.06);

    setTimeout(() => setIsClicking(false), 100);
  };

  useEffect(() => {
    return () => {
      if (whistleNodesRef.current) {
        whistleNodesRef.current.osc.stop();
        whistleNodesRef.current.lfo.stop();
      }
    };
  }, []);

  return (
    <>
      <div className="p-6 pt-safe-top pb-36 h-full flex flex-col space-y-7 animate-pop overflow-y-auto overflow-x-hidden no-scrollbar">
        <header className="flex justify-between items-center flex-shrink-0 pt-4">
          <div className="flex-1">
            <h1 className="text-3xl font-display font-bold text-black dark:text-white leading-none mb-2">
              {t(language, 'hi')}, {user.name}! <span className="inline-block animate-wave-hand origin-bottom-right">👋</span>
            </h1>
            <p className="text-black dark:text-gray-300 font-bold text-[10px] uppercase tracking-widest opacity-70">{t(language, 'ready')}</p>
          </div>
          
          <div className="flex gap-3 items-end">
            <button 
              onClick={() => onChangeView('AI_CHAT')}
              className="flex flex-col items-center gap-1.5 group active:scale-95 transition-all relative z-10"
            >
              <div className="absolute inset-0 bg-purple-500/30 rounded-3xl blur-xl animate-pulse scale-75 group-hover:scale-110 transition-transform"></div>
              <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 w-14 h-14 rounded-2xl shadow-xl flex items-center justify-center text-white group-hover:scale-105 transition-transform border-b-4 border-indigo-900 ring-2 ring-white/50 dark:ring-black/20">
                <IconAIAnimated size={30} className="text-white drop-shadow-md" />
              </div>
              <span className="text-[9px] font-black text-purple-600 dark:text-purple-300 uppercase tracking-widest bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded-lg shadow-sm">Ask PawGo</span>
            </button>

            <button 
              onClick={() => setShowWhistleModal(true)}
              className="flex flex-col items-center gap-1 group active:scale-95 transition-all pb-0.5"
            >
              <div className="bg-white dark:bg-gray-800 w-12 h-12 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center text-pawgo-blue hover:bg-pawgo-blue hover:text-white transition-colors">
                <IconWhistle size={24} className="group-hover:animate-wiggle" />
              </div>
              <span className="text-[8px] font-black text-black dark:text-gray-300 uppercase tracking-tighter opacity-70">{t(language, 'whistle')}</span>
            </button>
            
            <button 
              onClick={() => setShowClickerModal(true)}
              className="flex flex-col items-center gap-1 group active:scale-95 transition-all pb-0.5"
            >
              <div className="bg-white dark:bg-gray-800 w-12 h-12 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center text-pawgo-green hover:bg-pawgo-green hover:text-white transition-colors">
                <IconClicker size={24} className="group-hover:animate-wiggle" />
              </div>
              <span className="text-[8px] font-black text-black dark:text-gray-300 uppercase tracking-tighter opacity-70">{t(language, 'clicker')}</span>
            </button>
          </div>
        </header>

        <div className="relative flex-shrink-0">
          <div className="bg-gradient-to-br from-pawgo-blueDark to-pawgo-blue rounded-[2.5rem] p-9 relative overflow-hidden shadow-2xl border-b-8 border-[#0E74A5] h-56 flex items-center transition-all hover:translate-y-[-2px]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-12 -right-12 w-56 h-56 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
                
                {/* Floating Clouds (No Rotation) */}
                <div className="absolute top-4 left-6 text-white/30 animate-float" style={{ animationDuration: '8s' }}>
                    <CloudSVG size={60} />
                </div>
                <div className="absolute bottom-12 right-1/3 text-white/20 animate-float" style={{ animationDuration: '12s', animationDelay: '1s' }}>
                    <CloudSVG size={40} />
                </div>
                
                {/* Twinkling Stars (No Rotation) */}
                <div className="absolute top-[20%] left-[45%] text-yellow-300/60 animate-twinkle">
                    <StarSVG size={28} />
                </div>
                <div className="absolute top-8 right-[20%] text-yellow-300/40 animate-twinkle" style={{ animationDelay: '1.5s', transform: 'scale(0.8)' }}>
                    <StarSVG size={20} />
                </div>
                <div className="absolute bottom-8 left-10 text-yellow-300/30 animate-twinkle" style={{ animationDelay: '2.5s', transform: 'scale(0.6)' }}>
                    <StarSVG size={16} />
                </div>
            </div>

            <div className="relative z-10 w-[62%] flex flex-col items-start gap-4">
               <h2 className="text-3xl font-display font-black text-white leading-tight drop-shadow-lg">
                 {t(language, greetingKey)}
               </h2>
            </div>
          </div>
          
          <div className="absolute -right-4 -bottom-6 w-48 h-48 pointer-events-none z-20 filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.25)]">
             <DogHomeSVG className="w-full h-full" />
          </div>
        </div>

        <div className="flex-shrink-0 pt-2">
          <Button 
            fullWidth 
            size="lg" 
            onClick={() => onChangeView('WALK_PREP')}
            className="shadow-xl shadow-pawgo-green/20 group h-16 rounded-[2.2rem] text-lg gap-4 font-black pl-4"
          >
            <div className="w-12 h-12 flex-shrink-0 -my-2">
              <Mascot mood="walking" variant="icon" />
            </div>
            {t(language, 'start')}
            <IconChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-5 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-[2.2rem] border-b-4 border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center group hover:bg-pawgo-blue/5 dark:hover:bg-pawgo-blue/10 transition-colors">
            <div className="bg-pawgo-blue/10 p-2.5 rounded-xl mb-3 text-pawgo-blue group-hover:scale-110 transition-transform">
              <IconMap size={22} />
            </div>
            <span className="text-[10px] font-black text-black dark:text-gray-400 uppercase tracking-widest mb-1.5">{t(language, 'totalDist')}</span>
            <p className="text-2xl font-display font-bold text-black dark:text-white leading-none">{totalKm.toFixed(1)} <span className="text-sm font-sans text-black dark:text-gray-400 opacity-60">km</span></p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-[2.2rem] border-b-4 border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center group hover:bg-pawgo-green/5 dark:hover:bg-pawgo-green/10 transition-colors">
            <div className="bg-pawgo-green/10 p-2.5 rounded-xl mb-3 text-pawgo-green group-hover:scale-110 transition-transform">
              <IconCalendar size={22} />
            </div>
            <span className="text-[10px] font-black text-black dark:text-gray-400 uppercase tracking-widest mb-1.5">{t(language, 'totalWalks')}</span>
            <p className="text-2xl font-display font-bold text-black dark:text-white leading-none">{totalWalksCount}</p>
          </div>
        </div>

        <div className="space-y-4 pb-12">
           <div className="flex justify-between items-end">
              <h3 className="font-display font-bold text-2xl text-black dark:text-white leading-none">{t(language, 'pack')}</h3>
           </div>
           <div className="space-y-3.5">
              {dogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 bg-white dark:bg-gray-800 rounded-[2.2rem] border-2 border-dashed border-gray-200 dark:border-gray-700">
                   <p className="text-gray-400 font-bold mb-3">{t(language, 'noPaws')}</p>
                   <Button onClick={() => onChangeView('DOGS')} size="sm">{t(language, 'addFirstPaw')}</Button>
                </div>
              ) : (
                dogs.slice(0, 3).map(dog => (
                   <div key={dog.id} className="bg-white dark:bg-gray-800 p-5 rounded-[2.2rem] flex items-center gap-5 border-2 border-transparent hover:border-pawgo-blue/20 transition-all shadow-sm hover:shadow-md cursor-pointer group" onClick={() => onChangeView('DOGS')}>
                      <div className={`w-14 h-14 rounded-2xl ${dog.avatarColor} flex items-center justify-center p-2 shadow-inner border border-white/20 flex-shrink-0 group-hover:scale-105 transition-transform`}>
                        <DogAvatar mascotId={dog.mascotId} />
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="font-bold text-lg text-black dark:text-white leading-none mb-1 truncate">{dog.name}</p>
                         <p className="text-[10px] font-black text-black dark:text-gray-400 uppercase tracking-widest opacity-70 truncate">{dog.breed}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="bg-orange-50 dark:bg-orange-950/30 px-2.5 py-1 rounded-xl border border-orange-100 dark:border-orange-900/30 flex items-center gap-1">
                           <span className="text-sm font-bold text-orange-600 leading-none">🔥 {dog.streak}</span>
                        </div>
                      </div>
                   </div>
                ))
              )}
           </div>
        </div>
      </div>

      {showWhistleModal && (
        <div className="absolute inset-0 bg-black/60 z-[100] flex items-center justify-center p-6 backdrop-blur-sm animate-pop">
           <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-[3rem] p-10 shadow-2xl relative flex flex-col items-center border-2 border-white/20">
              <button 
                onClick={() => {
                  stopWhistleSound();
                  setShowWhistleModal(false);
                }} 
                className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <IconX size={20} className="text-black dark:text-white" />
              </button>

              <h2 className="text-3xl font-display font-bold text-black dark:text-white mb-2 text-center">{t(language, 'whistle')}</h2>
              <p className="text-black dark:text-gray-400 font-bold text-center mb-10 text-sm leading-relaxed opacity-80">{t(language, 'whistleDesc')}</p>

              <div className="relative mb-12 group">
                 <div className={`absolute inset-0 bg-pawgo-blue/25 rounded-full blur-3xl transition-all duration-300 ${isWhistling ? 'scale-150 opacity-100' : 'scale-100 opacity-0'}`}></div>
                 <button
                    onMouseDown={startWhistleSound}
                    onMouseUp={stopWhistleSound}
                    onMouseLeave={stopWhistleSound}
                    onTouchStart={(e) => { e.preventDefault(); startWhistleSound(); }}
                    onTouchEnd={(e) => { e.preventDefault(); stopWhistleSound(); }}
                    className={`
                      w-44 h-44 bg-pawgo-blue rounded-[3.5rem] flex items-center justify-center shadow-2xl relative z-10 
                      transition-all active:scale-90 border-b-8 border-pawgo-blueDark
                      ${isWhistling ? 'animate-wiggle' : 'hover:scale-105'}
                    `}
                 >
                    <IconWhistle size={88} className="text-white drop-shadow-md" />
                 </button>
              </div>

              <div className="w-full space-y-5">
                 <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-black text-black dark:text-gray-400 uppercase tracking-widest">Master Volume</span>
                    <span className="text-xs font-bold text-pawgo-blue">{Math.round(whistleVolume * 100)}%</span>
                 </div>
                 <input 
                    type="range" min="0" max="1" step="0.01" value={whistleVolume}
                    onChange={(e) => setWhistleVolume(parseFloat(e.target.value))}
                    className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full appearance-none cursor-pointer accent-pawgo-blue"
                 />
                 <p className="text-[10px] text-black dark:text-gray-500 font-black italic text-center uppercase tracking-wider">Press and hold the whistle button</p>
              </div>
           </div>
        </div>
      )}

      {showClickerModal && (
        <div className="absolute inset-0 bg-black/60 z-[100] flex items-center justify-center p-6 backdrop-blur-sm animate-pop">
           <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-[3rem] p-10 shadow-2xl relative flex flex-col items-center border-2 border-white/20">
              <button 
                onClick={() => setShowClickerModal(false)} 
                className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <IconX size={20} className="text-black dark:text-white" />
              </button>

              <h2 className="text-3xl font-display font-bold text-black dark:text-white mb-2 text-center">{t(language, 'clicker')}</h2>
              <p className="text-black dark:text-gray-400 font-bold text-center mb-10 text-sm leading-relaxed opacity-80">{t(language, 'clickerDesc')}</p>

              <div className="relative mb-12 group">
                 <div className={`absolute inset-0 bg-pawgo-green/25 rounded-full blur-3xl transition-all duration-300 ${isClicking ? 'scale-125 opacity-100' : 'scale-100 opacity-0'}`}></div>
                 <button
                    onClick={playClickerSound}
                    className={`
                      w-44 h-44 bg-pawgo-green rounded-[3.5rem] flex items-center justify-center shadow-2xl relative z-10 
                      transition-all active:scale-90 active:translate-y-1 border-b-8 border-pawgo-greenDark
                      ${isClicking ? 'scale-95' : 'hover:scale-105'}
                    `}
                 >
                    <IconClicker size={88} className="text-white drop-shadow-md" />
                 </button>
              </div>

              <div className="w-full space-y-5">
                 <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-black text-black dark:text-gray-400 uppercase tracking-widest">Master Volume</span>
                    <span className="text-xs font-bold text-pawgo-green">{Math.round(clickerVolume * 100)}%</span>
                 </div>
                 <input 
                    type="range" min="0" max="1" step="0.01" value={clickerVolume}
                    onChange={(e) => setClickerVolume(parseFloat(e.target.value))}
                    className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full appearance-none cursor-pointer accent-pawgo-green"
                 />
                 <p className="text-[10px] text-black dark:text-gray-500 font-black italic text-center uppercase tracking-wider">Tap the button for a single click</p>
              </div>
           </div>
        </div>
      )}
    </>
  );
};
