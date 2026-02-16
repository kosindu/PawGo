import React, { useState, useEffect, useRef } from 'react';
import { Dog, ViewState, WalkLog, LanguageCode } from '../types';
import { Button } from '../components/ui/Button';
import { DogAvatar } from '../components/DogAvatar';
import { IconPlay, IconCheck, IconChevronRight, IconX, IconTrophy, IconWalkingDog } from '../components/Icons';
import { t } from '../utils/translations';
import L from 'leaflet';
import { WalkBackgroundSVG } from '../components/WalkBackgroundSVG';
import { Mascot } from '../components/Mascot';

interface WalkProps {
  viewState: ViewState;
  setViewState: (v: ViewState) => void;
  dogs: Dog[];
  onFinishWalk: (log: WalkLog) => void;
  language: LanguageCode;
}

// Helper to calculate distance between two coordinates in km
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const WalkView: React.FC<WalkProps> = ({ viewState, setViewState, dogs, onFinishWalk, language }) => {
  const [selectedDogs, setSelectedDogs] = useState<string[]>([]);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [distance, setDistance] = useState(0);
  const [showNoSelectionModal, setShowNoSelectionModal] = useState(false);
  
  // Real-time tracking state
  const [currentPosition, setCurrentPosition] = useState<[number, number] | null>(null);
  const [routePath, setRoutePath] = useState<[number, number][]>([]);
  
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const polylineRef = useRef<L.Polyline | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const lastPosRef = useRef<[number, number] | null>(null);

  // Reset state when entering prep
  useEffect(() => {
    if (viewState === 'WALK_PREP') {
      setSeconds(0);
      setDistance(0);
      setCurrentPosition(null);
      setRoutePath([]);
      setIsActive(false);
      lastPosRef.current = null;
    }
  }, [viewState]);

  // Timer logic (Real-time seconds)
  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  // Geolocation Tracking Logic
  useEffect(() => {
    if (isActive && viewState === 'WALK_ACTIVE') {
      if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        return;
      }

      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPos: [number, number] = [latitude, longitude];
          
          setCurrentPosition(newPos);
          setRoutePath(prev => [...prev, newPos]);

          // Distance Calculation
          if (lastPosRef.current) {
            const dist = calculateDistance(lastPosRef.current[0], lastPosRef.current[1], latitude, longitude);
            // Only add distance if movement is significant (> 5 meters) to reduce jitter while standing still
            if (dist > 0.005) { 
              setDistance(d => d + dist);
              lastPosRef.current = newPos;
            }
          } else {
            lastPosRef.current = newPos;
          }
        },
        (error) => {
          console.error("Error watching position:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0
        }
      );
    } else {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    }

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [isActive, viewState]);

  // Map Initialization and Updates
  useEffect(() => {
    // 1. Initialize Map
    if (viewState === 'WALK_ACTIVE' && !mapRef.current) {
      const container = document.getElementById('map-container');
      if (!container) return;

      // Default start location (Stockholm) if GPS hasn't kicked in yet
      const initialPos: [number, number] = currentPosition || [59.3293, 18.0686];

      const map = L.map('map-container', {
        zoomControl: false,
        attributionControl: false
      }).setView(initialPos, 18);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 20
      }).addTo(map);

      mapRef.current = map;

      const dogIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `<div style="
          width: 48px; 
          height: 48px; 
          background-color: var(--color-primary); 
          border: 3px solid white; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          font-size: 24px;
        " class="animate-pulse">🐾</div>`,
        iconSize: [48, 48],
        iconAnchor: [24, 24]
      });

      markerRef.current = L.marker(initialPos, { icon: dogIcon }).addTo(map);

      polylineRef.current = L.polyline([], {
        color: '#58CC02', 
        weight: 6,
        opacity: 0.8,
        lineCap: 'round',
      }).addTo(map);
    }

    // 2. Update Map on Position Change
    if (viewState === 'WALK_ACTIVE' && mapRef.current && currentPosition) {
      const map = mapRef.current;
      
      // Update marker position
      if (markerRef.current) {
        markerRef.current.setLatLng(currentPosition);
      }

      // Pan map to new position
      map.setView(currentPosition, map.getZoom(), { animate: true });

      // Draw path
      if (polylineRef.current && routePath.length > 0) {
        polylineRef.current.setLatLngs(routePath);
      }
    }

    // Cleanup on unmount/view change
    return () => {
      if (viewState !== 'WALK_ACTIVE' && mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
        polylineRef.current = null;
      }
    };
  }, [viewState, currentPosition, routePath]);

  const toggleDog = (id: string) => {
    setSelectedDogs(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const handleStartWalk = () => {
    if (selectedDogs.length > 0) {
      setViewState('WALK_ACTIVE');
      setIsActive(true);
    } else {
      setShowNoSelectionModal(true);
    }
  };

  const handleFinish = () => {
    const log: WalkLog = {
      id: Date.now().toString(),
      dogIds: selectedDogs,
      date: new Date().toISOString(),
      durationSeconds: seconds,
      distanceKm: parseFloat(distance.toFixed(2)),
      walkerId: 'u1'
    };
    onFinishWalk(log);
    setViewState('WALK_SUMMARY');
    setIsActive(false);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (viewState === 'WALK_PREP') {
    return (
      <div className="h-full relative flex flex-col overflow-hidden bg-sky-50 dark:bg-gray-900">
        {/* Static SVG Background Layer */}
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden bg-sky-100 flex items-center justify-center">
           <WalkBackgroundSVG className="w-full" preserveAspectRatio="xMidYMid meet" />
        </div>

        {/* Content Header */}
        <div className="p-6 pt-safe-top mt-14 flex justify-between items-center z-30">
          <h1 className="text-3xl font-display font-bold text-black dark:text-white drop-shadow-md">{t(language, 'whosWalking')}</h1>
          <button 
            onClick={() => setViewState('HOME')} 
            className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl border-b-2 border-gray-100 dark:border-gray-700 active:scale-90 transition-all text-black dark:text-white"
          >
            <IconX size={24} />
          </button>
        </div>

        <div className="px-6 mb-4 z-30">
          <p className="text-black dark:text-gray-200 font-black uppercase tracking-widest text-[11px] drop-shadow-sm bg-white/30 dark:bg-black/20 inline-block px-2 py-0.5 rounded-lg">{t(language, 'selectPups')}</p>
        </div>
        
        {/* Main Selection Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-64 z-20">
          <div className="grid grid-cols-2 gap-4">
            {dogs.map(dog => (
              <button
                key={dog.id}
                onClick={() => toggleDog(dog.id)}
                className={`
                  relative p-6 rounded-[2.5rem] border-4 transition-all duration-300 flex flex-col items-center gap-3 overflow-hidden
                  ${selectedDogs.includes(dog.id) 
                    ? 'border-pawgo-green bg-white shadow-xl shadow-pawgo-green/20 scale-[1.02]' 
                    : 'border-white/40 dark:border-gray-800/40 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm opacity-90'}
                `}
              >
                <div className={`w-20 h-20 rounded-3xl ${dog.avatarColor} flex items-center justify-center p-2 mb-1 shadow-inner border border-white/20`}>
                  <DogAvatar mascotId={dog.mascotId} />
                </div>
                <span className="font-bold text-lg text-black dark:text-white">{dog.name}</span>
                {selectedDogs.includes(dog.id) && (
                  <div className="absolute top-3 right-3 bg-pawgo-green rounded-full p-1.5 shadow-md animate-pop">
                    <IconCheck size={12} className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Action Area */}
        <div className="absolute bottom-0 left-0 right-0 z-40 pointer-events-none">
          <div className="p-6 pb-32 pointer-events-auto">
            <Button 
              fullWidth 
              size="lg" 
              onClick={handleStartWalk}
              className="shadow-2xl h-16 rounded-[2rem] text-lg flex items-center justify-center gap-3 group font-black pl-4"
            >
              <div className="w-12 h-12 flex-shrink-0 -my-2">
                <Mascot mood="walking" variant="icon" />
              </div>
              {t(language, 'start')}
              <IconChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* No Selection Modal */}
        {showNoSelectionModal && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-pop">
             <div className="bg-white dark:bg-gray-900 w-full max-w-xs rounded-[2.5rem] p-8 text-center shadow-2xl border-2 border-white/20">
                {/* Avatars Row */}
                <div className="flex justify-center -space-x-4 mb-6 py-2">
                  {dogs.map((dog, index) => (
                    <div 
                      key={dog.id} 
                      className={`relative w-16 h-16 rounded-2xl ${dog.avatarColor} border-4 border-white dark:border-gray-900 flex items-center justify-center p-1 shadow-lg transform transition-transform hover:scale-110 hover:z-20`}
                      style={{ zIndex: dogs.length - index }}
                    >
                       <DogAvatar mascotId={dog.mascotId} />
                    </div>
                  ))}
                </div>
                
                <h3 className="text-2xl font-display font-bold text-black dark:text-white mb-2 leading-none">{t(language, 'whosComing')}</h3>
                <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">{t(language, 'selectPawError')}</p>
                <Button fullWidth onClick={() => setShowNoSelectionModal(false)} className="rounded-2xl h-12 font-black">
                   Got it
                </Button>
             </div>
          </div>
        )}
      </div>
    );
  }

  if (viewState === 'WALK_ACTIVE') {
    return (
      <div className="h-full relative overflow-hidden bg-gray-100 dark:bg-gray-950">
        <div id="map-container" className="h-full w-full grayscale-[0.1] contrast-[1.05]" />

        {/* Status Overlay */}
        <div className="absolute top-12 left-6 right-6 flex justify-between items-start z-[400] pt-safe-top pointer-events-none">
           <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-5 rounded-[2rem] shadow-2xl border-2 border-white/50 dark:border-gray-700/50 flex items-center gap-4 pointer-events-auto">
              <div className="w-12 h-12 bg-pawgo-green rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                 <IconPlay size={24} className="text-white" />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase text-black dark:text-gray-400 tracking-widest mb-0.5 opacity-80">{t(language, 'tracking')}</p>
                 <p className="text-2xl font-display font-bold text-black dark:text-white leading-none">{formatTime(seconds)}</p>
              </div>
           </div>
           
           <button 
             onClick={() => { if(confirm('Cancel walk?')) setViewState('HOME'); }} 
             className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border-2 border-white/50 dark:border-gray-700/50 active:scale-90 transition-all text-black dark:text-white pointer-events-auto"
           >
             <IconX size={24} />
           </button>
        </div>

        {/* Stats Center */}
        <div className="absolute bottom-10 left-6 right-6 z-[400] pb-safe-bottom pointer-events-none">
           <div className="bg-gray-900 dark:bg-black/90 backdrop-blur-xl text-white rounded-[2.5rem] p-7 shadow-2xl border border-white/10 flex justify-between items-center pointer-events-auto">
              <div className="flex gap-8 pl-2">
                <div className="text-left">
                    <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t(language, 'distance')}</span>
                    <span className="text-3xl font-display font-bold">{distance.toFixed(2)}<span className="text-sm font-sans text-gray-500 ml-1">km</span></span>
                </div>
                <div className="text-left">
                    <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t(language, 'calories')}</span>
                    <span className="text-3xl font-display font-bold">{Math.floor(distance * 45)}</span>
                </div>
              </div>

              <button 
                  onClick={handleFinish}
                  className="bg-pawgo-green w-16 h-16 rounded-full shadow-lg shadow-pawgo-green/40 active:scale-95 transition-all border-b-[6px] border-pawgo-greenDark flex items-center justify-center"
              >
                  <IconCheck size={32} className="text-white" />
              </button>
           </div>
        </div>
      </div>
    );
  }

  if (viewState === 'WALK_SUMMARY') {
    return (
      <div className="h-full bg-white dark:bg-gray-950 flex flex-col p-8 pt-safe-top pb-safe-bottom overflow-y-auto no-scrollbar">
        <div className="pt-14 pb-8 flex flex-col items-center">
          <div className="bg-pawgo-green/10 dark:bg-pawgo-green/5 p-8 rounded-full mb-6 relative">
             <div className="absolute inset-0 bg-pawgo-green/20 blur-2xl rounded-full animate-pulse"></div>
             <IconTrophy size={80} className="text-pawgo-green relative z-10 animate-wiggle" />
          </div>
          <h1 className="text-4xl font-display font-bold text-black dark:text-white mb-2">{t(language, 'missionComplete')}</h1>
          <p className="text-black dark:text-gray-400 font-black text-center opacity-80">{t(language, 'highPaws')}</p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-[3rem] p-8 shadow-inner border-2 border-white dark:border-gray-800 mb-8 space-y-8">
           <div className="flex justify-around items-center">
              <div className="text-center">
                 <p className="text-[10px] font-black text-black dark:text-gray-400 uppercase tracking-widest mb-2 opacity-80">{t(language, 'distance')}</p>
                 <p className="text-4xl font-display font-bold text-black dark:text-white">{distance.toFixed(2)} <span className="text-sm font-sans text-black dark:text-gray-400 font-bold opacity-60">km</span></p>
              </div>
              <div className="w-px h-12 bg-gray-200 dark:bg-gray-700"></div>
              <div className="text-center">
                 <p className="text-[10px] font-black text-black dark:text-gray-400 uppercase tracking-widest mb-2 opacity-80">{t(language, 'time')}</p>
                 <p className="text-4xl font-display font-bold text-black dark:text-white">{Math.floor(seconds/60)} <span className="text-sm font-sans text-black dark:text-gray-400 font-bold opacity-60">min</span></p>
              </div>
           </div>
           
           <div className="pt-8 border-t-2 border-dashed border-gray-200 dark:border-gray-800">
              <p className="text-[10px] font-black text-black dark:text-gray-400 uppercase tracking-widest mb-6 px-1 opacity-80">{t(language, 'thePack')}</p>
              <div className="flex flex-wrap gap-4 justify-center">
                 {selectedDogs.map(id => {
                   const dog = dogs.find(d => d.id === id);
                   return (
                     <div key={id} className="flex flex-col items-center gap-2">
                        <div className={`w-20 h-20 rounded-3xl ${dog?.avatarColor} p-2 shadow-inner border border-white/20 flex items-center justify-center`}>
                           <DogAvatar mascotId={dog?.mascotId || 'dog-1'} />
                        </div>
                        <span className="text-xs font-black text-black dark:text-gray-200">{dog?.name}</span>
                     </div>
                   );
                 })}
              </div>
           </div>
        </div>

        <div className="mt-auto pb-12">
          <Button fullWidth size="lg" onClick={() => setViewState('HOME')} className="h-16 rounded-[2rem] text-lg font-black shadow-xl">
             {t(language, 'backHome')}
          </Button>
        </div>
      </div>
    );
  }

  return null;
};