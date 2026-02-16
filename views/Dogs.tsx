
import React, { useState } from 'react';
import { Dog, User, LanguageCode } from '../types';
import { Button } from '../components/ui/Button';
import { DogAvatar } from '../components/DogAvatar';
import { IconTrash, IconPlus, IconX, IconEdit, IconCheck, IconFlame } from '../components/Icons';
import { MASCOT_IDS } from '../constants';
import { t } from '../utils/translations';

interface DogsProps {
  dogs: Dog[];
  currentUser: User;
  onUpdateDog: (dog: Dog) => void;
  onAddDog: (dog: Dog) => void;
  onDeleteDog: (id: string) => void;
  language: LanguageCode;
}

const AVATAR_COLORS = [
  'bg-pawgo-blue',
  'bg-pawgo-green',
  'bg-pawgo-yellow',
  'bg-pawgo-red',
  'bg-purple-400',
  'bg-pink-400',
];

export const DogsView: React.FC<DogsProps> = ({ dogs, currentUser, onUpdateDog, onAddDog, onDeleteDog, language }) => {
  const [showDogModal, setShowDogModal] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [dogToDelete, setDogToDelete] = useState<Dog | null>(null);
  const [formData, setFormData] = useState<Partial<Dog>>({});

  const handleOpenAdd = () => {
    setFormData({
      id: Date.now().toString(),
      name: '',
      breed: '',
      age: 0,
      weight: 0,
      avatarColor: 'bg-pawgo-blue',
      mascotId: 'dog-1',
      streak: 0,
      totalDistanceKm: 0,
      totalWalks: 0,
    });
    setShowDogModal(true);
  };

  const handleOpenEdit = (dog: Dog) => {
    setFormData({ ...dog });
    setShowDogModal(true);
  };

  const handleOpenDelete = (dog: Dog) => {
    setDogToDelete(dog);
    setShowDeleteConfirm(true);
  };

  const handleSaveDog = () => {
    if (!formData.name) return;
    const isNew = !dogs.find(d => d.id === formData.id);
    const dogData = formData as Dog;
    if (isNew) {
      onAddDog(dogData);
    } else {
      onUpdateDog(dogData);
    }
    setShowDogModal(false);
  };

  const handleDelete = () => {
    if (dogToDelete) {
      onDeleteDog(dogToDelete.id);
      setShowDeleteConfirm(false);
      setDogToDelete(null);
    }
  };

  return (
    <div className="p-6 pt-14 pb-40 h-full overflow-y-auto no-scrollbar text-black">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-black dark:text-white">{t(language, 'myDogs')}</h1>
          <p className="text-black dark:text-gray-300 font-black text-[10px] uppercase tracking-widest mt-1 opacity-80">{t(language, 'managePack')}</p>
        </div>
        <button 
          className="bg-pawgo-green text-white p-3.5 rounded-2xl shadow-lg shadow-pawgo-green/30 active:scale-95 transition-all border-b-4 border-pawgo-greenDark group" 
          onClick={handleOpenAdd}
        >
           <IconPlus size={28} className="text-white group-hover:rotate-90 transition-transform" />
        </button>
      </header>

      <div className="space-y-4">
        {dogs.map(dog => (
          <div key={dog.id} className="bg-white dark:bg-gray-800 rounded-[2.2rem] p-5 border-b-4 border-gray-100 dark:border-gray-700 relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300">
             <div className={`absolute top-0 right-0 w-32 h-32 ${dog.avatarColor} opacity-[0.03] rounded-bl-full pointer-events-none`} />

             <div className="flex items-center gap-5 relative z-10">
                {/* Avatar Section */}
                <div className="flex-shrink-0">
                   <div className={`w-24 h-24 rounded-3xl ${dog.avatarColor} flex items-center justify-center shadow-inner border-2 border-white/40 dark:border-gray-700/40 overflow-hidden p-2`}>
                      <DogAvatar mascotId={dog.mascotId} />
                   </div>
                </div>
                
                {/* Content Section */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-display font-bold text-2xl text-black dark:text-white truncate leading-tight">{dog.name}</h3>
                      <div className="flex items-center gap-1 bg-orange-50 dark:bg-orange-950/30 px-2 py-0.5 rounded-lg border border-orange-100 dark:border-orange-900/30">
                        <span className="text-xs font-bold text-orange-600">🔥 {dog.streak}</span>
                      </div>
                    </div>
                    <p className="text-black dark:text-gray-300 text-[10px] font-black uppercase tracking-widest mb-3 truncate opacity-70">{dog.breed}</p>
                    
                    <div className="flex items-center gap-2">
                        <div className="bg-gray-50 dark:bg-gray-700/50 px-2.5 py-1 rounded-xl border border-gray-100 dark:border-gray-700">
                          <span className="text-[10px] font-black text-black dark:text-gray-300 uppercase tracking-widest">{dog.age} {t(language, 'years')}</span>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 px-2.5 py-1 rounded-xl border border-gray-100 dark:border-gray-700">
                          <span className="text-[10px] font-black text-black dark:text-gray-300 uppercase tracking-widest">{dog.weight} {t(language, 'kg')}</span>
                        </div>
                    </div>
                </div>

                {/* Vertical Button Stack Section */}
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => handleOpenEdit(dog)} 
                    className="p-3 bg-gray-50 dark:bg-gray-700 text-black hover:text-pawgo-blue hover:border-pawgo-blue/30 dark:text-gray-300 dark:hover:text-pawgo-blue rounded-2xl transition-all active:scale-90 border-2 border-gray-100 dark:border-gray-600 shadow-sm"
                    title={t(language, 'editDog')}
                  >
                     <IconEdit size={18} />
                  </button>
                  <button 
                    onClick={() => handleOpenDelete(dog)} 
                    className="p-3 bg-gray-50 dark:bg-gray-700 text-black hover:text-pawgo-red hover:border-pawgo-red/30 dark:text-gray-300 dark:hover:text-pawgo-red rounded-2xl transition-all active:scale-90 border-2 border-gray-100 dark:border-gray-600 shadow-sm"
                    title={t(language, 'deleteDog')}
                  >
                     <IconTrash size={18} />
                  </button>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 z-[110] flex items-center justify-center p-6 backdrop-blur-md">
           <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-[3rem] p-10 animate-pop shadow-2xl text-center border-2 border-white/20">
              <div className="bg-pawgo-red/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <IconTrash size={48} className="text-pawgo-red" />
              </div>
              <h2 className="text-2xl font-display font-bold text-black dark:text-white mb-2">
                {t(language, 'deleteDog')}?
              </h2>
              <p className="text-black dark:text-gray-300 mb-8 px-4 text-sm font-bold leading-relaxed opacity-80">
                {t(language, 'deletePawConfirm')}
              </p>
              <div className="flex flex-col gap-3">
                <Button size="lg" variant="danger" fullWidth onClick={handleDelete} className="rounded-2xl h-14 font-black">
                  {t(language, 'deleteDog')}
                </Button>
                <Button size="lg" variant="ghost" fullWidth onClick={() => setShowDeleteConfirm(false)} className="rounded-2xl h-14 font-black">
                  {t(language, 'cancel')}
                </Button>
              </div>
           </div>
        </div>
      )}

      {/* Dog Add/Edit Modal */}
      {showDogModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
           <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-[3rem] p-8 animate-pop relative max-h-[94vh] flex flex-col shadow-2xl border-2 border-white/20">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-display font-bold text-black dark:text-white">
                   {dogs.find(d => d.id === formData.id) ? t(language, 'editDog') : t(language, 'newDog')}
                 </h2>
                 <button 
                   onClick={() => setShowDogModal(false)} 
                   className="text-black dark:text-gray-400 p-2 bg-gray-100 dark:bg-gray-800 rounded-full active:scale-75 transition-all"
                 >
                   <IconX size={24} />
                 </button>
              </div>
              
              <div className="space-y-6 overflow-y-auto no-scrollbar pb-2 pr-1 text-black">
                 {/* Visual Preview */}
                 <div className="flex justify-center mb-6">
                    <div className={`w-36 h-36 rounded-[3rem] ${formData.avatarColor} flex items-center justify-center border-4 border-white dark:border-gray-700 shadow-2xl p-4 transform rotate-2`}>
                       <DogAvatar mascotId={formData.mascotId || 'dog-1'} />
                    </div>
                 </div>

                 {/* Inputs */}
                 <div className="space-y-5">
                   <div>
                     <label className="text-[10px] font-black text-black dark:text-gray-400 uppercase ml-2 block mb-2 tracking-widest">{t(language, 'name')}</label>
                     <input 
                       className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 font-bold text-lg text-black dark:text-white focus:border-pawgo-blue focus:outline-none transition-all"
                       value={formData.name || ''}
                       onChange={(e) => setFormData({...formData, name: e.target.value})}
                       placeholder="Buddy"
                     />
                   </div>
                   
                   <div>
                     <label className="text-[10px] font-black text-black dark:text-gray-400 uppercase ml-2 block mb-2 tracking-widest">{t(language, 'breed')}</label>
                     <input 
                       className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 font-bold text-lg text-black dark:text-white focus:border-pawgo-blue focus:outline-none transition-all"
                       value={formData.breed || ''}
                       onChange={(e) => setFormData({...formData, breed: e.target.value})}
                       placeholder="Labrador"
                     />
                   </div>

                   <div className="flex gap-4">
                     <div className="flex-1">
                       <label className="text-[10px] font-black text-black dark:text-gray-400 uppercase ml-2 block mb-2 tracking-widest">{t(language, 'age')}</label>
                       <input 
                         type="number"
                         className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 font-bold text-lg text-black dark:text-white focus:border-pawgo-blue focus:outline-none transition-all"
                         value={formData.age || ''}
                         onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 0})}
                       />
                     </div>
                     <div className="flex-1">
                       <label className="text-[10px] font-black text-black dark:text-gray-400 uppercase ml-2 block mb-2 tracking-widest">{t(language, 'weight')} (kg)</label>
                       <input 
                         type="number"
                         className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 font-bold text-lg text-black dark:text-white focus:border-pawgo-blue focus:outline-none transition-all"
                         value={formData.weight || ''}
                         onChange={(e) => setFormData({...formData, weight: parseInt(e.target.value) || 0})}
                       />
                     </div>
                   </div>

                   {/* Color Picker */}
                   <div>
                      <label className="text-[10px] font-black text-black dark:text-gray-400 uppercase ml-2 block mb-3 tracking-widest">{t(language, 'pickColor')}</label>
                      <div className="flex flex-wrap gap-3 px-1">
                        {AVATAR_COLORS.map(color => (
                          <button
                            key={color}
                            onClick={() => setFormData({...formData, avatarColor: color})}
                            className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center transition-all hover:scale-110 active:scale-90 ${formData.avatarColor === color ? 'ring-2 ring-offset-2 ring-gray-900 dark:ring-gray-100 scale-105 shadow-md' : 'opacity-80'}`}
                          >
                             {formData.avatarColor === color && <IconCheck size={18} className="text-white drop-shadow-md" />}
                          </button>
                        ))}
                      </div>
                   </div>

                   {/* Mascot Picker */}
                   <div>
                      <label className="text-[10px] font-black text-black dark:text-gray-400 uppercase ml-2 block mb-3 tracking-widest">{t(language, 'pickMascot')}</label>
                      <div className="grid grid-cols-4 gap-3 pb-6">
                         {MASCOT_IDS.map(id => (
                            <button 
                              key={id} 
                              onClick={() => setFormData({...formData, mascotId: id})}
                              className={`aspect-square rounded-2xl bg-gray-50 dark:bg-gray-800 border-2 flex items-center justify-center p-2.5 transition-all active:scale-95 ${
                                formData.mascotId === id 
                                ? 'border-pawgo-green bg-pawgo-green/5 shadow-md scale-105' 
                                : 'border-gray-100 dark:border-gray-700 opacity-60 hover:opacity-100'
                              }`}
                            >
                               <DogAvatar mascotId={id} />
                            </button>
                         ))}
                      </div>
                   </div>
                 </div>

                 <div className="pt-4 flex gap-4">
                    <Button variant="outline" size="lg" className="flex-1 rounded-2xl h-14 font-black" onClick={() => setShowDogModal(false)}>
                       {t(language, 'cancel')}
                    </Button>
                    <Button size="lg" className="flex-1 rounded-2xl h-14 font-black" onClick={handleSaveDog} disabled={!formData.name}>
                       {t(language, 'save')}
                    </Button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
