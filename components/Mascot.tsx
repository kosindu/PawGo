
import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { DOG_ANIMATION_DATA } from '../dog_animation';

interface MascotProps {
  mood?: 'happy' | 'walking';
  variant?: 'hero' | 'icon';
}

export const Mascot: React.FC<MascotProps> = ({ mood = 'happy', variant = 'hero' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieInstance = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize lottie animation
    lottieInstance.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: DOG_ANIMATION_DATA,
    });

    return () => {
      if (lottieInstance.current) {
        lottieInstance.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!lottieInstance.current) return;

    // Speeds kept low for a professional and calm feel
    switch(mood) {
      case 'happy':
        lottieInstance.current.setSpeed(0.5);
        lottieInstance.current.play();
        break;
      case 'walking':
        lottieInstance.current.setSpeed(0.6); // Slightly faster for walking icon
        lottieInstance.current.play();
        break;
      default:
        lottieInstance.current.setSpeed(0.3);
        lottieInstance.current.play();
    }
  }, [mood]);

  const isHero = variant === 'hero';

  return (
    <div className={`w-full h-full relative flex items-center justify-center transition-all duration-500 ${!isHero ? 'overflow-hidden' : ''}`}>
       {/* Background Glow for Happy State - Hero Only */}
       {isHero && mood === 'happy' && (
         <div className="absolute inset-0 bg-pawgo-yellow/20 rounded-full blur-3xl animate-pulse"></div>
       )}

       {/* Interactive Dynamic Shadow - Hero Only */}
       {isHero && (
         <div 
            className="absolute bottom-6 w-40 h-8 bg-black/20 rounded-[100%] blur-md animate-pulse transform scale-x-110"
            style={{ animationDuration: '2.5s' }}
         ></div>
       )}

       {/* Lottie Animation Wrapper */}
       <div 
         ref={containerRef} 
         className={`
            relative z-10 w-full h-full transition-all duration-700
            ${isHero ? 'transform scale-[1.85] translate-y-4 drop-shadow-2xl' : 'transform scale-[2.2] translate-y-1'}
         `}
       />
    </div>
  );
};
