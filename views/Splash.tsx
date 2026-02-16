
import React, { useEffect, useState } from 'react';
import { Mascot } from '../components/Mascot';

export const SplashView: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Random increment for realistic feel
        return Math.min(100, prev + Math.random() * 5);
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-sky-400 overflow-hidden flex flex-col items-center justify-center font-sans">
      {/* Simple Ambient Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-400 to-sky-500"></div>
      
      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center animate-pop w-full max-w-md px-8">
        
        {/* Mascot Container */}
        <div className="relative w-80 h-80 mb-2">
           <Mascot mood="walking" variant="hero" />
        </div>

        {/* App Title */}
        <div className="text-center mb-10">
           <h1 className="text-6xl font-display font-black text-white tracking-tighter drop-shadow-xl animate-bounce-slight">
             PawGo
           </h1>
        </div>

        {/* Progress Loader */}
        <div className="w-full max-w-[200px] space-y-3">
           <div className="relative h-3 w-full bg-black/10 rounded-full overflow-hidden backdrop-blur-md border border-white/30 shadow-inner">
              <div 
                className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-200 ease-out shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                style={{ width: `${progress}%` }}
              >
                {/* Shimmer effect on bar */}
                <div className="absolute inset-0 bg-white/50 w-full -translate-x-full animate-[shimmer_1s_infinite] skew-x-12"></div>
              </div>
           </div>
           
           {/* Percentage Text */}
           <div className="flex justify-center items-center text-[10px] font-black uppercase tracking-widest text-white/80">
              <span>{Math.round(progress)}%</span>
           </div>
        </div>
      </div>
    </div>
  );
};
