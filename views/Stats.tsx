
import React, { useState, useMemo } from 'react';
import { Dog, WalkLog, LanguageCode, AccentColor } from '../types';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { t } from '../utils/translations';
import { DogAvatar } from '../components/DogAvatar';
import { IconClock, IconMap, IconCalendar, IconTrendingUp, IconChevronLeft, IconChevronRight, IconPlus, IconX, IconCheck, IconTrash, IconEdit, IconTrophy } from '../components/Icons';
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

type TimeRange = '1W' | '1M' | '1Y';
type Metric = 'distance' | 'time';
type SectionId = 'ANALYTICS' | 'HISTORY' | 'PERFORMANCE';

export const StatsView: React.FC<StatsProps> = ({ walks, dogs, language, accentColor, onAddWalk, onUpdateWalk, onDeleteWalk }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('1W');
  const [metric, setMetric] = useState<Metric>('distance');
  const [selectedDogId, setSelectedDogId] = useState<string | 'all'>('all');
  
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

  // Resolve current accent hex
  const accentHex = ACCENT_COLORS.find(c => c.id === accentColor)?.primary || '#58CC02';

  // Calendar State
  const [calendarDate, setCalendarDate] = useState(new Date());

  // --- Chart Data Processing ---
  const chartData = useMemo(() => {
    const dataPoints = [];
    const now = new Date();
    
    let points = 7;
    let format = (d: Date) => d.toLocaleDateString('en-US', { weekday: 'short' });

    if (timeRange === '1M') {
      points = 30;
      format = (d: Date) => d.getDate().toString();
    } else if (timeRange === '1Y') {
      points = 12;
      format = (d: Date) => d.toLocaleDateString('en-US', { month: 'short' });
    }

    const aggMap = new Map<string, number>();

    walks.forEach(walk => {
        const wDate = new Date(walk.date);
        const key = format(wDate);
        if (selectedDogId !== 'all' && !walk.dogIds.includes(selectedDogId)) return;
        const val = metric === 'distance' ? walk.distanceKm : walk.durationSeconds / 3600;
        aggMap.set(key, (aggMap.get(key) || 0) + val);
    });

    for (let i = points - 1; i >= 0; i--) {
      const d = new Date();
      if (timeRange === '1Y') d.setMonth(now.getMonth() - i);
      else d.setDate(now.getDate() - i);
      const key = format(d);
      const val = aggMap.get(key) || 0;
      dataPoints.push({ name: key, value: parseFloat(val.toFixed(2)) });
    }
    return dataPoints;
  }, [timeRange, metric, selectedDogId, walks]);

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

  const totalValue = chartData.reduce((acc, curr) => acc + curr.value, 0);
  const getMetricLabel = () => metric === 'distance' ? 'km' : 'hrs';
  const getMetricColor = () => metric === 'distance' ? '#1CB0F6' : accentHex; 

  const handlePrevMonth = () => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1));

  const handleDateClick = (d: number) => {
    if (isReordering) return;
    const clickedDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), d);
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
    return (
      <div className="grid grid-cols-7 gap-1.5 p-1">
        {weekDays.map(d => (
          <div key={d} className="text-center text-[9px] font-black text-black dark:text-gray-400 uppercase tracking-widest py-2 opacity-60">{d}</div>
        ))}
        {Array.from({ length: firstDayIndex }).map((_, i) => <div key={`pad-${i}`} className="h-10 w-10" />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const d = i + 1;
          const dateKey = `${year}-${month}-${d}`;
          const dayWalks = walkDatesMap.get(dateKey);
          const hasWalk = !!dayWalks && dayWalks.length > 0;
          const isToday = new Date().toDateString() === new Date(year, month, d).toDateString();
          return (
            <button key={d} onClick={() => handleDateClick(d)} disabled={isReordering} className={`aspect-square flex flex-col items-center justify-center relative transition-all ${!isReordering ? 'active:scale-90 hover:scale-105' : 'opacity-50'}`}>
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
        <div className="bg-white dark:bg-gray-800 p-7 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700">
           <div className="flex justify-between items-end mb-8">
              <div><p className="text-black dark:text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1.5 opacity-80">{t(language, 'thisWeek')}</p><h2 className="text-4xl font-display font-bold text-black dark:text-white leading-none">{totalValue.toFixed(1)} <span className="text-lg text-black dark:text-gray-400 font-sans ml-1 font-black opacity-60">{getMetricLabel()}</span></h2></div>
              <div className="text-right"><div className="flex items-center gap-1 text-pawgo-green font-black text-[10px] bg-pawgo-green/10 px-2 py-1 rounded-lg uppercase tracking-wider"><IconTrendingUp size={12} /> +12%</div></div>
           </div>
           <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={chartData}>
                    <defs><linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={getMetricColor()} stopOpacity={0.4}/><stop offset="95%" stopColor={getMetricColor()} stopOpacity={0}/></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.4} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF', fontWeight: 900, fontFamily: 'Fredoka' }} dy={10} />
                    <YAxis hide={true} /><Tooltip cursor={{ stroke: getMetricColor(), strokeWidth: 2 }} contentStyle={{ borderRadius: '16px', border: 'none', fontWeight: 'bold', fontFamily: 'Fredoka', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                    <Area type="monotone" dataKey="value" stroke={getMetricColor()} strokeWidth={4} fillOpacity={1} fill="url(#colorMetric)" animationDuration={1000} />
                 </AreaChart>
              </ResponsiveContainer>
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
        <div className="bg-gradient-to-br from-pawgo-green to-pawgo-greenDark p-6 rounded-[2.5rem] text-white shadow-xl shadow-pawgo-green/20 flex items-center justify-between mb-2">
           <div><p className="text-[10px] font-black uppercase tracking-widest opacity-90 mb-1">{t(language, 'topPerformance')}</p><h3 className="text-2xl font-display font-bold">{t(language, 'onFire')}</h3><p className="text-sm opacity-90 font-black">{t(language, 'topPack')}</p></div>
           <IconTrophy size={50} className="text-white opacity-40 -rotate-12" />
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 px-1">
            <button onClick={() => setSelectedDogId('all')} disabled={isReordering} className={`whitespace-nowrap px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${selectedDogId === 'all' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white dark:bg-gray-800 text-black dark:text-gray-300 border-gray-100 dark:border-gray-700'}`}>{t(language, 'allPaws')}</button>
            {dogs.map(dog => (
               <button key={dog.id} onClick={() => setSelectedDogId(dog.id)} disabled={isReordering} className={`whitespace-nowrap px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all flex items-center gap-2 ${selectedDogId === dog.id ? `bg-white dark:bg-gray-800 border-gray-900 dark:border-white text-black dark:text-white` : 'bg-white dark:bg-gray-800 text-black dark:text-gray-300 border-gray-100 dark:border-gray-700'}`}><div className={`w-6 h-6 rounded-lg ${dog.avatarColor} p-0.5 shadow-inner border border-white/20`}><DogAvatar mascotId={dog.mascotId} /></div><span>{dog.name}</span></button>
            ))}
         </div>
         <div className="space-y-4">
          {dogs.filter(d => selectedDogId === 'all' || d.id === selectedDogId).map(dog => {
                const dogWalks = walks.filter(w => w.dogIds.includes(dog.id));
                const dogDist = dogWalks.reduce((acc, w) => acc + w.distanceKm, 0);
                const dogTime = dogWalks.reduce((acc, w) => acc + (w.durationSeconds / 3600), 0);
                return (
                    <div key={dog.id} className="bg-white dark:bg-gray-800 p-5 rounded-[2.2rem] border-b-4 border-gray-100 dark:border-gray-700 flex flex-col gap-4 animate-pop shadow-sm group">
                      <div className="flex items-center gap-4"><div className={`w-14 h-14 rounded-2xl ${dog.avatarColor} flex items-center justify-center p-1.5 shadow-inner border border-white/20`}><DogAvatar mascotId={dog.mascotId} /></div><div className="flex-1"><div className="flex justify-between items-start"><h4 className="font-bold text-lg text-black dark:text-white">{dog.name}</h4><span className="text-xl font-display font-bold text-black dark:text-gray-100">{(metric === 'distance' ? dogDist : dogTime).toFixed(1)} <span className="text-[10px] text-black dark:text-gray-400 uppercase tracking-widest font-black">{getMetricLabel()}</span></span></div><p className="text-[10px] text-black dark:text-gray-400 font-black uppercase tracking-widest leading-none opacity-80">{dog.breed}</p></div></div>
                      <div className="grid grid-cols-3 gap-2 bg-gray-50 dark:bg-gray-700/50 p-3.5 rounded-2xl border border-gray-100 dark:border-gray-600/30"><div className="text-center"><span className="block text-[8px] text-black dark:text-gray-400 font-black uppercase mb-1 tracking-widest">{t(language, 'totalWalks')}</span><span className="font-bold text-sm text-black dark:text-gray-200">{dogWalks.length}</span></div><div className="text-center border-x border-gray-200 dark:border-gray-600"><span className="block text-[8px] text-black dark:text-gray-400 font-black uppercase mb-1 tracking-widest">{t(language, 'streak')}</span><span className="font-bold text-sm text-orange-600">🔥 {dog.streak}</span></div><div className="text-center"><span className="block text-[8px] text-black dark:text-gray-400 font-black uppercase mb-1 tracking-widest">{t(language, 'goal')}</span><span className="font-bold text-sm text-pawgo-blue">94%</span></div></div>
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
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-display font-bold text-black dark:text-white">{t(language, 'analytics')}</h1>
            <p className="text-black dark:text-gray-400 font-black text-[10px] uppercase tracking-widest mt-1 opacity-80">{t(language, 'trends')}</p>
          </div>
          <div className="flex gap-2">
             <button 
               onClick={() => setIsReordering(!isReordering)}
               className={`p-2.5 rounded-xl border-2 transition-all flex items-center gap-2 ${isReordering ? 'bg-pawgo-green border-pawgo-green text-white shadow-lg' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-black dark:text-gray-300'}`}
             >
                {isReordering ? <IconCheck size={16} /> : <IconEdit size={16} />}
                <span className="text-[10px] font-black uppercase tracking-widest">{isReordering ? t(language, 'done') : t(language, 'layout')}</span>
             </button>
             {!isReordering && (
              <div className="bg-white/50 dark:bg-gray-800/50 p-1 rounded-xl border-2 border-white dark:border-gray-700 flex backdrop-blur-sm">
                {(['1W', '1M', '1Y'] as TimeRange[]).map(r => (
                  <button key={r} onClick={() => setTimeRange(r)} className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${timeRange === r ? 'bg-gray-900 text-white dark:bg-white dark:text-black shadow-md' : 'text-black dark:text-gray-400 hover:text-black'}`}>{r}</button>
                ))}
              </div>
             )}
          </div>
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
