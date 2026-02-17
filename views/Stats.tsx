
import React, { useState, useMemo, useEffect } from 'react';
import { Dog, WalkLog, LanguageCode, AccentColor } from '../types';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, TooltipProps } from 'recharts';
import { t } from '../utils/translations';
import { DogAvatar } from '../components/DogAvatar';
import { IconClock, IconMap, IconCalendar, IconChevronLeft, IconChevronRight, IconPlus, IconX, IconCheck, IconTrash, IconEdit, IconTrophy3D, IconFire3D, IconChartBar, IconChartLine } from '../components/Icons';
import { ACCENT_COLORS } from '../constants';
import { Button } from '../components/ui/Button';

interface StatsProps {
  walks: WalkLog[];
  dogs: Dog[];
  language: LanguageCode;
  accentColor: AccentColor;
  onAddWalk: (log: WalkLog) => void;
  onUpdateWalk: (log: WalkLog) => void;
  onDeleteWalk: (id: string) => void;
}

// Removed 'Monthly' from TimeRange
type TimeRange = 'Daily' | 'Weekly';
type Metric = 'distance' | 'time';
type SectionId = 'ANALYTICS' | 'HISTORY' | 'PERFORMANCE';

// Helper to extract hex color from Tailwind class
const getColorFromClass = (cls: string) => {
  if (cls.includes('blue')) return '#1CB0F6';
  if (cls.includes('green')) return '#58CC02';
  if (cls.includes('yellow')) return '#FFC800';
  if (cls.includes('red')) return '#FF4B4B';
  if (cls.includes('purple')) return '#A78BFA';
  return '#1CB0F6'; // Default
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label, dogs, metric }: any) => {
  if (active && payload && payload.length) {
    // Calculate total for this tooltip
    const total = payload.reduce((sum: number, entry: any) => sum + (Number(entry.value) || 0), 0);
    const metricLabel = metric === 'distance' ? 'km' : 'min';

    // Sort payload by value descending for better readability
    const sortedPayload = [...payload].sort((a, b) => b.value - a.value);

    return (
      <div className="bg-white/95 dark:bg-gray-900/95 p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 backdrop-blur-sm min-w-[160px]">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{label}</p>
        <div className="space-y-2">
          {sortedPayload.map((entry: any) => {
            // Find dog based on dataKey which is the dog ID
            const dog = dogs.find((d: Dog) => d.id === entry.dataKey);
            if (!dog && entry.dataKey !== 'value') return null;
            
            // If it's the generic 'value' key (single dog view), find that dog or show generic
            const isSingleView = entry.dataKey === 'value';
            const displayColor = isSingleView ? entry.color : getColorFromClass(dog?.avatarColor || '');
            
            return (
              <div key={entry.dataKey} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {dog && (
                    <div className={`w-5 h-5 rounded-md ${dog.avatarColor} flex items-center justify-center p-0.5 shadow-sm`}>
                      <DogAvatar mascotId={dog.mascotId} />
                    </div>
                  )}
                  <span className="font-bold text-xs text-black dark:text-gray-200" style={{ color: isSingleView ? undefined : displayColor }}>
                    {dog ? dog.name : 'Total'}
                  </span>
                </div>
                <span className="font-display font-bold text-sm text-black dark:text-white">
                  {Number(entry.value).toFixed(1)} <span className="text-[9px] opacity-60 font-sans">{metricLabel}</span>
                </span>
              </div>
            );
          })}
          {/* Show Total if multiple dogs */}
          {payload.length > 1 && (
             <div className="pt-2 mt-2 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <span className="text-[9px] font-black uppercase text-gray-400">Total</span>
                <span className="font-display font-bold text-sm text-black dark:text-white">
                  {total.toFixed(1)} {metricLabel}
                </span>
             </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export const StatsView: React.FC<StatsProps> = ({ walks, dogs, language, accentColor, onAddWalk, onUpdateWalk, onDeleteWalk }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('Weekly');
  const [metric, setMetric] = useState<Metric>('distance');
  const [selectedDogId, setSelectedDogId] = useState<string | 'all'>('all');
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');
  const [chartDate, setChartDate] = useState(new Date()); 
  
  // Layout Management
  const [isReordering, setIsReordering] = useState(false);
  const [sectionOrder, setSectionOrder] = useState<SectionId[]>(['PERFORMANCE', 'ANALYTICS', 'HISTORY']);

  // Day Summary View
  const [showDayModal, setShowDayModal] = useState(false);
  const [selectedDayDate, setSelectedDayDate] = useState<Date | null>(null);

  // Manual Entry / Edit State
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [editingWalkId, setEditingWalkId] = useState<string | null>(null);
  const [manualDate, setManualDate] = useState<Date | null>(null);
  const [manualDistance, setManualDistance] = useState('1.5');
  const [manualDuration, setManualDuration] = useState('20');
  const [manualSelectedDogs, setManualSelectedDogs] = useState<string[]>([]);

  const accentHex = ACCENT_COLORS.find(c => c.id === accentColor)?.primary || '#58CC02';
  const [calendarDate, setCalendarDate] = useState(new Date());

  // Chart readiness state to prevent initial render warnings
  const [isChartReady, setIsChartReady] = useState(false);

  useEffect(() => {
    // Delay chart rendering slightly to ensure container is laid out
    const timer = setTimeout(() => setIsChartReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setChartDate(new Date());
  }, [timeRange]);

  const getPeriodRange = (date: Date, range: TimeRange) => {
    const start = new Date(date);
    const end = new Date(date);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    if (range === 'Daily') {
      // no op
    } else if (range === 'Weekly') {
      const day = start.getDay(); 
      const diff = start.getDate() - day + (day === 0 ? -6 : 1); 
      start.setDate(diff);
      end.setDate(diff + 6);
    } 
    // Removed Monthly Logic
    return { start, end };
  };

  const handleChartPrev = () => {
    const newDate = new Date(chartDate);
    if (timeRange === 'Daily') newDate.setDate(newDate.getDate() - 1);
    else if (timeRange === 'Weekly') newDate.setDate(newDate.getDate() - 7);
    setChartDate(newDate);
  };

  const handleChartNext = () => {
    const newDate = new Date(chartDate);
    if (timeRange === 'Daily') newDate.setDate(newDate.getDate() + 1);
    else if (timeRange === 'Weekly') newDate.setDate(newDate.getDate() + 7);
    
    const today = new Date();
    // Prevent navigating past today if in Daily mode, or generally if start of period is in future
    // However, typical charts allow seeing empty future weeks, but let's restrict slightly for UX
    const { start } = getPeriodRange(newDate, timeRange);
    if (start > today) return; 

    setChartDate(newDate);
  };

  const isNextDisabled = useMemo(() => {
    const today = new Date();
    const { end } = getPeriodRange(chartDate, timeRange);
    return end >= today;
  }, [chartDate, timeRange]);

  const filteredWalks = useMemo(() => {
    const { start, end } = getPeriodRange(chartDate, timeRange);
    return walks.filter(w => {
        const d = new Date(w.date);
        return d >= start && d <= end;
    });
  }, [walks, timeRange, chartDate]);

  // --- Chart Data Processing ---
  const chartData = useMemo(() => {
    const dataPoints: any[] = [];
    // const { start, end } = getPeriodRange(chartDate, timeRange); // Not used in loop directly but logic depends on timeRange
    
    // Create aggregation map. Key = TimeLabel, Value = { total: 0, d1: 0, d2: 0... }
    const aggMap = new Map<string, any>();

    // Helper to get key
    const getKey = (date: Date) => {
        if (timeRange === 'Daily') return date.getHours().toString();
        // Weekly
        let dayIx = date.getDay();
        return (dayIx === 0 ? 6 : dayIx - 1).toString();
    };

    // Initialize template with 0 for all dogs
    const template: any = { value: 0 }; 
    dogs.forEach(d => template[d.id] = 0);

    // Populate data
    filteredWalks.forEach(walk => {
        // If single dog selected, filter here for total 'value' calculation consistency
        if (selectedDogId !== 'all' && !walk.dogIds.includes(selectedDogId)) return;

        const key = getKey(new Date(walk.date));
        if (!aggMap.has(key)) aggMap.set(key, { ...template });
        
        const entry = aggMap.get(key);
        const val = metric === 'distance' ? walk.distanceKm : walk.durationSeconds / 60;

        // Add to total
        entry.value += val;

        // Distribute to individual dogs
        walk.dogIds.forEach(dId => {
            if (entry[dId] !== undefined) {
                entry[dId] += val;
            }
        });
    });

    // Generate full timeline with defaults
    if (timeRange === 'Daily') {
      for (let i = 0; i <= 23; i++) {
         const key = i.toString();
         const data = aggMap.get(key) || { ...template };
         dataPoints.push({ name: i % 4 === 0 ? `${i}:00` : '', fullLabel: `${i}:00`, ...data });
      }
    } else { 
      // Weekly
      const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      for (let i = 0; i < 7; i++) {
        const key = i.toString();
        const data = aggMap.get(key) || { ...template };
        dataPoints.push({ name: weekDays[i], fullLabel: weekDays[i], ...data });
      }
    } 
    // Removed Monthly Loop

    return dataPoints;
  }, [timeRange, metric, selectedDogId, filteredWalks, chartDate, dogs]);

  const walkDatesMap = useMemo(() => {
    const dates = new Map<string, WalkLog[]>();
    walks.forEach(walk => {
      const d = new Date(walk.date);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      if (!dates.has(key)) dates.set(key, []);
      dates.get(key)!.push(walk);
    });
    return dates;
  }, [walks]);

  // Total value for the big number display (sum of 'value' field which represents selected scope)
  const totalValue = chartData.reduce((acc, curr) => acc + curr.value, 0);
  const getMetricLabel = () => metric === 'distance' ? 'km' : 'min';
  
  const getRangeLabel = () => {
    const { start, end } = getPeriodRange(chartDate, timeRange);
    const now = new Date();
    
    if (timeRange === 'Daily') {
        if (start.toDateString() === now.toDateString()) return t(language, 'today');
        return start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }
    // Weekly
    return `${start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`;
  };

  const handlePrevMonth = () => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1));

  const handleDateClick = (d: number) => {
    if (isReordering) return;
    const clickedDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), d);
    
    // Future date restriction: Check against Today (00:00:00 to match just date part comparison roughly, or strict now)
    // We want to block anything strictly after today
    const now = new Date();
    if (clickedDate > now) return;

    setSelectedDayDate(clickedDate);
    setShowDayModal(true);
  };

  const handleOpenAddWalk = () => {
    if (!selectedDayDate) return;
    setEditingWalkId(null);
    setManualDate(selectedDayDate);
    setManualDistance('1.5');
    setManualDuration('20');
    setManualSelectedDogs(dogs.length === 1 ? [dogs[0].id] : []);
    setShowEntryModal(true);
  };

  const handleOpenEditWalk = (walk: WalkLog) => {
    setEditingWalkId(walk.id);
    setManualDate(new Date(walk.date));
    setManualDistance(walk.distanceKm.toString());
    setManualDuration(Math.floor(walk.durationSeconds / 60).toString());
    setManualSelectedDogs(walk.dogIds);
    setShowEntryModal(true);
  };

  const handleDelete = (id: string) => {
    onDeleteWalk(id);
    setShowEntryModal(false);
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...sectionOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;
    [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
    setSectionOrder(newOrder);
  };

  const renderCalendarGrid = () => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; 
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today for comparison

    return (
      <div className="grid grid-cols-7 gap-1.5 p-1">
        {weekDays.map(d => (
          <div key={d} className="text-center text-[9px] font-black text-black dark:text-gray-400 uppercase tracking-widest py-2 opacity-60">{d}</div>
        ))}
        {Array.from({ length: firstDayIndex }).map((_, i) => <div key={`pad-${i}`} className="h-10 w-10" />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const d = i + 1;
          const dateObj = new Date(year, month, d);
          // Check if date is in the future relative to today (ignoring time for the day itself, but to restrict entry we treat > today as future)
          // We allow selecting Today. Future dates are blocked.
          const isFuture = dateObj > new Date(); // Compares with 'now' including time. 
                                                 // dateObj is 00:00:00. 
                                                 // if dateObj is tomorrow, it is > now.
                                                 // if dateObj is today, it is < now (unless now is exactly 00:00:00).
                                                 // So standard comparison works for blocking "Tomorrow" onwards.

          const dateKey = `${year}-${month}-${d}`;
          const dayWalks = walkDatesMap.get(dateKey);
          const hasWalk = !!dayWalks && dayWalks.length > 0;
          const isToday = today.toDateString() === dateObj.toDateString();
          
          return (
            <button 
                key={d} 
                onClick={() => handleDateClick(d)} 
                disabled={isReordering || isFuture} 
                className={`
                    aspect-square flex flex-col items-center justify-center relative transition-all 
                    ${isFuture ? 'opacity-20 cursor-not-allowed' : (!isReordering ? 'active:scale-90 hover:scale-105' : 'opacity-50')}
                `}
            >
                <div className={`w-10 h-10 flex items-center justify-center rounded-2xl text-xs font-black transition-all duration-300 border-2 ${hasWalk ? 'bg-pawgo-green border-pawgo-green text-white shadow-md' : isToday ? 'bg-white dark:bg-gray-700 text-pawgo-blue border-pawgo-blue' : 'text-black dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                    {d}
                </div>
                {hasWalk && <div className="absolute -bottom-1.5 w-1.5 h-1.5 bg-pawgo-greenDark rounded-full border border-white dark:border-gray-800" />}
            </button>
          );
        })}
      </div>
    );
  };

  const dogGoalStatuses = useMemo(() => {
    return dogs.map(dog => {
      const dogWalks = filteredWalks.filter(w => w.dogIds.includes(dog.id));
      const dogDist = dogWalks.reduce((acc, w) => acc + w.distanceKm, 0);
      const dogTime = dogWalks.reduce((acc, w) => acc + (w.durationSeconds / 60), 0); 

      const goal = dog.goal || { frequency: 'daily', metric: 'distance', target: 3 };
      let targetValue = goal.target;

      if (timeRange === 'Daily') {
          if (goal.frequency === 'weekly') targetValue /= 7;
      } else if (timeRange === 'Weekly') {
          if (goal.frequency === 'daily') targetValue *= 7;
      }
      // Removed Monthly Logic

      const actualValue = goal.metric === 'distance' ? dogDist : dogTime; 
      const remaining = Math.max(0, targetValue - actualValue);
      const percentage = Math.min(100, Math.round((actualValue / (targetValue || 1)) * 100)); 
      
      return { 
        id: dog.id, 
        percentage, 
        isMet: percentage >= 100,
        remaining,
        metricLabel: goal.metric === 'distance' ? 'km' : 'min',
        goalMetric: goal.metric
      };
    });
  }, [dogs, filteredWalks, timeRange, chartDate]);

  const allGoalsMet = dogs.length > 0 && dogGoalStatuses.every(s => s.isMet);
  const metCount = dogGoalStatuses.filter(s => s.isMet).length;

  const getHeaderContent = () => {
    let title = allGoalsMet ? t(language, 'allGoalsMet') : `${metCount}/${dogs.length} ${t(language, 'goalsMet')}`;
    let desc = allGoalsMet ? t(language, 'allGoalsMetDesc') : t(language, 'goalsMetDesc');
    let HeaderIcon = IconTrophy3D;
    let iconAnimation = allGoalsMet ? 'animate-bounce' : '';
    let gradientClass = allGoalsMet ? 'from-pawgo-green to-pawgo-greenDark' : 'from-pawgo-blue to-pawgo-blueDark';

    if (selectedDogId !== 'all') {
        const dogStatus = dogGoalStatuses.find(s => s.id === selectedDogId);
        const dog = dogs.find(d => d.id === selectedDogId);
        
        if (dogStatus && dog) {
            if (dogStatus.isMet) {
                title = `${dog.name}: ${t(language, 'goalReached')}`;
                desc = t(language, 'keepGoing');
                gradientClass = 'from-pawgo-green to-pawgo-greenDark';
                HeaderIcon = IconTrophy3D;
                iconAnimation = 'animate-bounce';
            } else {
                const isDistance = dogStatus.goalMetric === 'distance';
                const unitLabel = isDistance ? t(language, 'goalDist') : t(language, 'goalMin');
                let val = '';
                if (isDistance) {
                    val = dogStatus.remaining < 1 
                       ? (dogStatus.remaining * 1000).toFixed(0) + 'm' 
                       : dogStatus.remaining.toFixed(1) + ' ' + unitLabel;
                } else {
                    val = Math.ceil(dogStatus.remaining) + ' ' + unitLabel;
                }
                title = `${val} ${t(language, 'awayFromGoal')}`;
                desc = t(language, 'toReachGoal').replace('{name}', dog.name).replace('{period}', t(language, timeRange === 'Daily' ? 'goalDaily' : 'goalWeekly' as any));
                gradientClass = 'from-orange-400 to-pawgo-red';
                HeaderIcon = IconFire3D;
                iconAnimation = 'animate-pulse';
            }
        }
    } else if (!allGoalsMet && (timeRange === 'Daily' || timeRange === 'Weekly')) {
      let focusDogStatus = dogGoalStatuses.find(s => !s.isMet);
      if (focusDogStatus) {
         const dog = dogs.find(d => d.id === focusDogStatus.id);
         if (dog) {
             const isDistance = focusDogStatus.goalMetric === 'distance';
             const unitLabel = isDistance ? t(language, 'goalDist') : t(language, 'goalMin');
             let val = '';
             if (isDistance) {
                 val = focusDogStatus.remaining < 1 
                    ? (focusDogStatus.remaining * 1000).toFixed(0) + 'm' 
                    : focusDogStatus.remaining.toFixed(1) + ' ' + unitLabel;
             } else {
                 val = Math.ceil(focusDogStatus.remaining) + ' ' + unitLabel;
             }
             title = `${val} ${t(language, 'awayFromGoal')}`;
             desc = t(language, 'toReachGoal').replace('{name}', dog.name).replace('{period}', t(language, timeRange === 'Daily' ? 'goalDaily' : 'goalWeekly' as any));
             HeaderIcon = IconFire3D;
             iconAnimation = 'animate-pulse';
             gradientClass = 'from-orange-400 to-pawgo-red';
         }
      }
    }
    return { title, desc, HeaderIcon, iconAnimation, gradientClass };
  };

  const headerContent = getHeaderContent();
  const CurrentHeaderIcon = headerContent.HeaderIcon;

  // Chart Rendering Helpers
  const getDogColor = (dogId: string) => {
    const dog = dogs.find(d => d.id === dogId);
    return dog ? getColorFromClass(dog.avatarColor) : '#1CB0F6';
  };

  const sections = {
    ANALYTICS: (
      <div key="ANALYTICS" className="space-y-6">
        <div className="flex gap-4">
           <button onClick={() => setMetric('distance')} disabled={isReordering} className={`flex-1 p-4 rounded-[1.8rem] border-b-4 transition-all flex items-center justify-center gap-2.5 active:scale-95 active:border-b-0 active:translate-y-1 ${metric === 'distance' ? 'bg-pawgo-blue text-white border-pawgo-blueDark shadow-lg shadow-pawgo-blue/20' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-400'}`}>
              <IconMap size={18} /><span className="font-black uppercase tracking-widest text-[10px]">{t(language, 'distance')}</span>
           </button>
           <button onClick={() => setMetric('time')} disabled={isReordering} className={`flex-1 p-4 rounded-[1.8rem] border-b-4 transition-all flex items-center justify-center gap-2.5 active:scale-95 active:border-b-0 active:translate-y-1 ${metric === 'time' ? 'bg-pawgo-green text-white border-pawgo-greenDark shadow-lg shadow-pawgo-green/20' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-400'}`}>
              <IconClock size={18} /><span className="font-black uppercase tracking-widest text-[10px]">{t(language, 'time')}</span>
           </button>
        </div>
        <div className="bg-white dark:bg-gray-800 p-7 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700 relative">
           <div className="absolute top-7 right-7 flex gap-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl z-20">
              <button 
                onClick={() => setChartType('area')}
                className={`p-1.5 rounded-lg transition-all ${chartType === 'area' ? 'bg-white dark:bg-gray-600 shadow-sm text-pawgo-blue' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <IconChartLine size={16} />
              </button>
              <button 
                onClick={() => setChartType('bar')}
                className={`p-1.5 rounded-lg transition-all ${chartType === 'bar' ? 'bg-white dark:bg-gray-600 shadow-sm text-pawgo-blue' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <IconChartBar size={16} />
              </button>
           </div>

           <div className="flex justify-between items-end mb-8 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                   <button onClick={handleChartPrev} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-90 transition-all"><IconChevronLeft size={16} className="text-gray-400 dark:text-gray-500" /></button>
                   <p className="text-black dark:text-gray-400 text-[10px] font-black uppercase tracking-widest opacity-80 min-w-[80px] text-center">{getRangeLabel()}</p>
                   <button onClick={handleChartNext} disabled={isNextDisabled} className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-90 transition-all ${isNextDisabled ? 'opacity-30 cursor-not-allowed' : ''}`}><IconChevronRight size={16} className="text-gray-400 dark:text-gray-500" /></button>
                </div>
                <h2 className="text-4xl font-display font-bold text-black dark:text-white leading-none">{totalValue.toFixed(1)} <span className="text-lg text-black dark:text-gray-400 font-sans ml-1 font-black opacity-60">{getMetricLabel()}</span></h2>
              </div>
           </div>
           
           <div className="h-60 w-full min-w-0">
              {isChartReady && (
                <ResponsiveContainer width="100%" height="100%" minWidth={0} debounce={200}>
                  {chartType === 'area' ? (
                    <AreaChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.4} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF', fontWeight: 900, fontFamily: 'Fredoka' }} dy={10} interval={0} />
                        <YAxis hide={true} />
                        <Tooltip content={<CustomTooltip dogs={dogs} metric={metric} />} cursor={{ stroke: '#ccc', strokeWidth: 2 }} />
                        
                        {selectedDogId === 'all' ? (
                          dogs.map(dog => (
                            <Area 
                              key={dog.id}
                              type="monotone" 
                              dataKey={dog.id} 
                              stroke={getDogColor(dog.id)} 
                              strokeWidth={3} 
                              fill={getDogColor(dog.id)} 
                              fillOpacity={0.1}
                              animationDuration={1000}
                            />
                          ))
                        ) : (
                          <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke={getDogColor(selectedDogId)} 
                            strokeWidth={4} 
                            fill={getDogColor(selectedDogId)}
                            fillOpacity={0.2}
                            animationDuration={1000}
                          />
                        )}
                    </AreaChart>
                  ) : (
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.4} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF', fontWeight: 900, fontFamily: 'Fredoka' }} dy={10} interval={0} />
                        <YAxis hide={true} />
                        <Tooltip content={<CustomTooltip dogs={dogs} metric={metric} />} cursor={{ fill: 'transparent' }} />
                        
                        {selectedDogId === 'all' ? (
                          dogs.map(dog => (
                            <Bar 
                              key={dog.id}
                              dataKey={dog.id} 
                              stackId="a" // Stack bars for total view
                              fill={getDogColor(dog.id)} 
                              radius={[4, 4, 4, 4]} 
                              barSize={24} 
                              animationDuration={1000}
                            />
                          ))
                        ) : (
                          <Bar 
                            dataKey="value" 
                            fill={getDogColor(selectedDogId)} 
                            radius={[6, 6, 6, 6]} 
                            barSize={24} 
                            animationDuration={1000}
                          />
                        )}
                    </BarChart>
                  )}
                </ResponsiveContainer>
              )}
           </div>
        </div>
      </div>
    ),
    HISTORY: (
      <div key="HISTORY" className="bg-white dark:bg-gray-800 p-7 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700">
         <div className="flex justify-between items-center mb-6">
             <div className="flex items-center gap-2.5 text-black dark:text-white"><IconCalendar size={22} className="text-pawgo-blue" /><h3 className="font-display font-bold text-xl">{t(language, 'history')}</h3></div>
             <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-xl p-1.5 border border-gray-100 dark:border-gray-600">
                 <button onClick={handlePrevMonth} disabled={isReordering} className="p-1.5 hover:bg-white dark:hover:bg-gray-600 rounded-lg transition-all active:scale-90"><IconChevronLeft size={16} className="text-black dark:text-white" /></button>
                 <span className="text-[10px] font-black uppercase tracking-widest w-24 text-center text-black dark:text-gray-300">{calendarDate.toLocaleString('default', { month: 'short', year: 'numeric' })}</span>
                 <button onClick={handleNextMonth} disabled={isReordering} className="p-1.5 hover:bg-white dark:hover:bg-gray-600 rounded-lg transition-all active:scale-90"><IconChevronRight size={16} className="text-black dark:text-white" /></button>
             </div>
         </div>
         {renderCalendarGrid()}
      </div>
    ),
    PERFORMANCE: (
      <div key="PERFORMANCE" className="space-y-4">
        <div className={`bg-gradient-to-br ${headerContent.gradientClass} p-6 rounded-[2.5rem] text-white shadow-xl flex items-center justify-between mb-2 transition-colors duration-500 overflow-visible relative`}>
           <div className="relative z-10">
             <p className="text-[10px] font-black uppercase tracking-widest opacity-90 mb-1">{t(language, 'topPerformance')}</p>
             <h3 className="text-2xl font-display font-bold">{headerContent.title}</h3>
             <p className="text-sm opacity-90 font-black">{headerContent.desc}</p>
           </div>
           <CurrentHeaderIcon size={80} className={`-rotate-6 translate-x-2 ${headerContent.iconAnimation} drop-shadow-lg`} />
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 px-1">
            <button onClick={() => setSelectedDogId('all')} disabled={isReordering} className={`whitespace-nowrap px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${selectedDogId === 'all' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white dark:bg-gray-800 text-black dark:text-gray-300 border-gray-100 dark:border-gray-700'}`}>{t(language, 'allPaws')}</button>
            {dogs.map(dog => (
               <button key={dog.id} onClick={() => setSelectedDogId(dog.id)} disabled={isReordering} className={`whitespace-nowrap px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all flex items-center gap-2 ${selectedDogId === dog.id ? `bg-white dark:bg-gray-800 border-gray-900 dark:border-white text-black dark:text-white` : 'bg-white dark:bg-gray-800 text-black dark:text-gray-300 border-gray-100 dark:border-gray-700'}`}><div className={`w-6 h-6 rounded-lg ${dog.avatarColor} p-0.5 shadow-inner border border-white/20`}><DogAvatar mascotId={dog.mascotId} /></div><span>{dog.name}</span></button>
            ))}
         </div>
         <div className="space-y-4">
          {dogs.filter(d => selectedDogId === 'all' || d.id === selectedDogId).map(dog => {
                const dogWalks = filteredWalks.filter(w => w.dogIds.includes(dog.id));
                const dogDist = dogWalks.reduce((acc, w) => acc + w.distanceKm, 0);
                const dogTime = dogWalks.reduce((acc, w) => acc + (w.durationSeconds / 3600), 0);
                const goalStatus = dogGoalStatuses.find(s => s.id === dog.id) || { percentage: 0, isMet: false };

                return (
                    <div key={dog.id} className="bg-white dark:bg-gray-800 p-5 rounded-[2.2rem] border-b-4 border-gray-100 dark:border-gray-700 flex flex-col gap-4 animate-pop shadow-sm group">
                      <div className="flex items-center gap-4"><div className={`w-14 h-14 rounded-2xl ${dog.avatarColor} flex items-center justify-center p-1.5 shadow-inner border border-white/20`}><DogAvatar mascotId={dog.mascotId} /></div><div className="flex-1"><div className="flex justify-between items-start"><h4 className="font-bold text-lg text-black dark:text-white">{dog.name}</h4><span className="text-xl font-display font-bold text-black dark:text-gray-100">{(metric === 'distance' ? dogDist : dogTime).toFixed(1)} <span className="text-[10px] text-black dark:text-gray-400 uppercase tracking-widest font-black">{getMetricLabel()}</span></span></div><p className="text-[10px] text-black dark:text-gray-400 font-black uppercase tracking-widest leading-none opacity-80">{dog.breed}</p></div></div>
                      <div className="grid grid-cols-3 gap-2 bg-gray-50 dark:bg-gray-700/50 p-3.5 rounded-2xl border border-gray-100 dark:border-gray-600/30"><div className="text-center"><span className="block text-[8px] text-black dark:text-gray-400 font-black uppercase mb-1 tracking-widest">{t(language, 'totalWalks')}</span><span className="font-bold text-sm text-black dark:text-gray-200">{dogWalks.length}</span></div><div className="text-center border-x border-gray-200 dark:border-gray-600"><span className="block text-[8px] text-black dark:text-gray-400 font-black uppercase mb-1 tracking-widest">{t(language, 'streak')}</span><span className="font-bold text-sm text-orange-600">🔥 {dog.streak}</span></div>
                        <div className="text-center">
                          <span className="block text-[8px] text-black dark:text-gray-400 font-black uppercase mb-1 tracking-widest">{t(language, 'goal')}</span>
                          <span className={`font-bold text-sm ${goalStatus.isMet ? 'text-pawgo-green' : 'text-pawgo-blue'}`}>
                            {goalStatus.isMet ? t(language, 'goalReached') : `${goalStatus.percentage}%`}
                          </span>
                        </div>
                      </div>
                    </div>
                );
              })}
         </div>
      </div>
    )
  };

  const currentDayWalks = selectedDayDate ? (walkDatesMap.get(`${selectedDayDate.getFullYear()}-${selectedDayDate.getMonth()}-${selectedDayDate.getDate()}`) || []) : [];

  return (
    <div className="p-6 pt-safe-top pb-36 h-full overflow-y-auto no-scrollbar">
      <div className="pt-14">
        <div className="mb-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-display font-bold text-black dark:text-white">{t(language, 'analytics')}</h1>
              <p className="text-black dark:text-gray-400 font-black text-[10px] uppercase tracking-widest mt-1 opacity-80">{t(language, 'trends')}</p>
            </div>
            <button onClick={() => setIsReordering(!isReordering)} className={`p-2.5 rounded-xl border-2 transition-all flex items-center gap-2 ${isReordering ? 'bg-pawgo-green border-pawgo-green text-white shadow-lg' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-black dark:text-gray-300'}`}>
                {isReordering ? <IconCheck size={16} /> : <IconEdit size={16} />}
                <span className="text-[10px] font-black uppercase tracking-widest">{isReordering ? t(language, 'done') : t(language, 'layout')}</span>
             </button>
          </div>
          {!isReordering && (
            <div className="bg-white/50 dark:bg-gray-800/50 p-1 rounded-xl border-2 border-white dark:border-gray-700 flex backdrop-blur-sm w-full">
              {(['Daily', 'Weekly'] as TimeRange[]).map(r => (
                <button key={r} onClick={() => setTimeRange(r)} className={`flex-1 px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${timeRange === r ? 'bg-gray-900 text-white dark:bg-white dark:text-black shadow-md' : 'text-black dark:text-gray-400 hover:text-black'}`}>
                  {t(language, `filter_${r.toLowerCase()}` as any)}
                </button>
              ))}
            </div>
           )}
        </div>
        <div className="space-y-8">
          {sectionOrder.map((sid, idx) => (
            <div key={sid} className={`relative transition-all duration-300 ${isReordering ? 'p-4 border-2 border-dashed border-pawgo-blue/30 rounded-[3rem] bg-pawgo-blue/5 scale-[0.98]' : ''}`}>
              {isReordering && (
                <div className="absolute -top-3 left-8 z-10 bg-pawgo-blue text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">
                  {sid.toLowerCase()}
                </div>
              )}
              {isReordering && (
                <div className="absolute -right-1 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
                  <button onClick={() => moveSection(idx, 'up')} disabled={idx === 0} className={`p-3 rounded-full bg-white dark:bg-gray-800 shadow-xl border-2 ${idx === 0 ? 'opacity-30 border-gray-100' : 'border-pawgo-blue text-pawgo-blue active:scale-90'}`}><IconChevronLeft size={20} className="rotate-90" /></button>
                  <button onClick={() => moveSection(idx, 'down')} disabled={idx === sectionOrder.length - 1} className={`p-3 rounded-full bg-white dark:bg-gray-800 shadow-xl border-2 ${idx === sectionOrder.length - 1 ? 'opacity-30 border-gray-100' : 'border-pawgo-blue text-pawgo-blue active:scale-90'}`}><IconChevronLeft size={20} className="-rotate-90" /></button>
                </div>
              )}
              {sections[sid]}
            </div>
          ))}
        </div>
      </div>
      {showDayModal && selectedDayDate && (
        <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-6 backdrop-blur-md">
           <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-[3rem] p-10 animate-pop shadow-2xl relative max-h-[85vh] flex flex-col border-2 border-white/20">
              <button onClick={() => setShowDayModal(false)} className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-800 rounded-full active:scale-90 transition-all"><IconX size={20} className="text-black dark:text-white" /></button>
              <h2 className="text-2xl font-display font-bold text-black dark:text-white mb-1">{t(language, 'dayLog')}</h2>
              <p className="text-pawgo-blue font-black uppercase tracking-widest text-[10px] mb-8">{selectedDayDate.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short' })}</p>
              <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 mb-8 text-black">
                 {currentDayWalks.length === 0 ? (
                    <div className="py-16 text-center text-black dark:text-gray-400"><IconCalendar size={56} className="mx-auto opacity-10 mb-3" /><p className="font-black text-sm uppercase tracking-widest">{t(language, 'noActivity')}</p></div>
                 ) : (
                    currentDayWalks.map(walk => (
                        <div key={walk.id} className="bg-gray-50 dark:bg-gray-800/80 p-5 rounded-[2rem] flex items-center gap-4 border-2 border-gray-100 dark:border-gray-700">
                           <div className="flex -space-x-4">
                              {walk.dogIds.slice(0, 3).map(id => {
                                 const dog = dogs.find(d => d.id === id);
                                 return (<div key={id} className={`w-11 h-11 rounded-xl border-4 border-white dark:border-gray-800 ${dog?.avatarColor} p-1 flex items-center justify-center shadow-md border border-white/20`}><DogAvatar mascotId={dog?.mascotId || ''} /></div>);
                              })}
                           </div>
                           <div className="flex-1 min-w-0">
                              <p className="font-bold text-lg text-black dark:text-white leading-none mb-1">{walk.distanceKm}km</p>
                              <p className="text-[10px] text-black dark:text-gray-400 font-black uppercase tracking-widest">{Math.floor(walk.durationSeconds / 60)} min • {walk.dogIds.length} Paws</p>
                           </div>
                           <button onClick={() => handleOpenEditWalk(walk)} className="p-3 bg-white dark:bg-gray-700 rounded-2xl border-2 border-gray-100 dark:border-gray-600 active:scale-90 transition-all text-black dark:text-gray-300 hover:text-pawgo-blue"><IconEdit size={18} /></button>
                        </div>
                    ))
                 )}
              </div>
              <Button fullWidth size="lg" onClick={handleOpenAddWalk} className="rounded-[1.8rem] h-14 font-black">
                <IconPlus size={20} /> {t(language, 'addActivity')}
              </Button>
           </div>
        </div>
      )}
      {showEntryModal && (
        <div className="fixed inset-0 bg-black/80 z-[110] flex items-center justify-center p-6 backdrop-blur-lg">
           <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-[3rem] p-10 animate-pop shadow-2xl relative max-h-[92vh] flex flex-col border-2 border-white/20">
              <div className="flex justify-between items-start mb-8">
                <div><h2 className="text-2xl font-display font-bold text-black dark:text-white">{editingWalkId ? t(language, 'editActivity') : t(language, 'logActivity')}</h2><p className="text-black dark:text-gray-400 font-black text-[10px] uppercase tracking-widest mt-1 opacity-80">{t(language, 'addPastWalk')}</p></div>
                <button onClick={() => setShowEntryModal(false)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full active:scale-90 transition-all"><IconX size={20} className="text-black dark:text-white" /></button>
              </div>
              <div className="flex-1 overflow-y-auto no-scrollbar space-y-8 text-black">
                 <div>
                    <label className="text-[10px] font-black text-black dark:text-gray-400 uppercase tracking-widest block mb-4 px-2">{t(language, 'participation')}</label>
                    <div className="flex flex-wrap gap-3">
                        {dogs.map(dog => (
                            <button key={dog.id} onClick={() => setManualSelectedDogs(prev => prev.includes(dog.id) ? prev.filter(id => id !== dog.id) : [...prev, dog.id])} className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl border-4 transition-all ${manualSelectedDogs.includes(dog.id) ? 'border-pawgo-green bg-pawgo-green/5' : 'border-transparent bg-gray-50 dark:bg-gray-800 opacity-60'}`}>
                                <div className={`w-14 h-14 rounded-2xl ${dog.avatarColor} p-1.5 flex items-center justify-center shadow-inner border border-white/20`}><DogAvatar mascotId={dog.mascotId} /></div><span className="text-[10px] font-black uppercase tracking-widest text-black dark:text-white">{dog.name}</span>
                            </button>
                        ))}
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-5">
                    <div><label className="text-[10px] font-black text-black dark:text-gray-400 uppercase tracking-widest block mb-2 px-2">{t(language, 'distLabel')}</label><input type="number" step="0.1" value={manualDistance} onChange={(e) => setManualDistance(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 font-display font-bold text-3xl text-center text-black dark:text-white focus:border-pawgo-blue focus:outline-none transition-all" /></div>
                    <div><label className="text-[10px] font-black text-black dark:text-gray-400 uppercase tracking-widest block mb-2 px-2">{t(language, 'timeLabel')}</label><input type="number" value={manualDuration} onChange={(e) => setManualDuration(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 font-display font-bold text-3xl text-center text-black dark:text-white focus:border-pawgo-blue focus:outline-none transition-all" /></div>
                 </div>
                 <div className="flex flex-col gap-4 pt-4">
                    <Button fullWidth size="lg" onClick={() => {
                        if (!manualDate || manualSelectedDogs.length === 0) return;
                        const log: WalkLog = {
                            id: editingWalkId || `manual-${Date.now()}`,
                            dogIds: manualSelectedDogs,
                            date: manualDate.toISOString(),
                            distanceKm: parseFloat(manualDistance) || 0,
                            durationSeconds: (parseFloat(manualDuration) || 0) * 60,
                            walkerId: 'u1'
                        };
                        if (editingWalkId) onUpdateWalk(log);
                        else onAddWalk(log);
                        setShowEntryModal(false);
                    }} disabled={manualSelectedDogs.length === 0} className="rounded-[1.8rem] h-14 font-black">{t(language, 'saveRecord')}</Button>
                    {editingWalkId && <Button fullWidth variant="ghost" className="text-red-700 rounded-xl font-black h-12" onClick={() => handleDelete(editingWalkId)}><IconTrash size={18} /> {t(language, 'deleteRecord')}</Button>}
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
