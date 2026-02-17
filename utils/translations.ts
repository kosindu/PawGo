
import { LanguageCode } from '../types';

type TranslationKey = 
  | 'nav_home' | 'nav_dogs' | 'nav_walk' | 'nav_stats' | 'nav_settings'
  | 'hi' | 'ready' | 'beautifulDay' | 'greeting_adventure' | 'greeting_great' | 'greeting_sniff'
  | 'totalDist' | 'totalWalks' | 'pack' | 'start' | 'addDog'
  | 'myDogs' | 'activity' | 'settings' | 'appearance' | 'darkMode' | 'general' | 'language' | 'notifications' | 'privacy' | 'logOut'
  | 'whosWalking' | 'selectPups' | 'cancel'
  | 'name' | 'breed' | 'age' | 'weight' | 'save' | 'editDog' | 'newDog' | 'deleteDog' | 'pickColor' | 'pickMascot' | 'deleteConfirm' | 'years' | 'kg' | 'days'
  | 'analytics' | 'time'
  | 'about' | 'learning' | 'version' | 'developer' | 'credits' | 'next' | 'back' | 'finish'
  | 'ai_welcome'
  | 'accentColor' | 'backgroundTheme' | 'lockedDarkMode' | 'support' | 'editProfile'
  | 'yourName' | 'chooseAvatar' | 'designedBy' | 'craftedWithLove' | 'close'
  | 'enableNotif' | 'masterSwitch' | 'walkReminders' | 'achievements'
  | 'shareLoc' | 'shareLocDesc' | 'analyticsData' | 'analyticsDataDesc'
  | 'whistle' | 'clicker' | 'whistleDesc' | 'clickerDesc' | 'noPaws' | 'addFirstPaw' | 'noPawsDesc' | 'packLeader' | 'gotIt' | 'cancelWalkConfirm'
  | 'deletePawConfirm' | 'selectPawError' | 'whosComing' | 'tracking' | 'calories' | 'distance'
  | 'missionComplete' | 'highPaws' | 'thePack' | 'backHome'
  | 'thisWeek' | 'history' | 'topPerformance' | 'onFire' | 'topPack' | 'allPaws'
  | 'streak' | 'goal' | 'trends' | 'layout' | 'done' | 'dayLog' | 'noActivity'
  | 'addActivity' | 'editActivity' | 'logActivity' | 'addPastWalk' | 'participation'
  | 'distLabel' | 'timeLabel' | 'saveRecord' | 'deleteRecord' | 'voiceAssist' | 'listening' | 'askPlaceholder' | 'managePack'
  | 'filter_daily' | 'filter_weekly' | 'filter_monthly' | 'today' | 'thisMonth'
  | 'activityGoal' | 'goalDaily' | 'goalWeekly' | 'goalDist' | 'goalMin'
  | 'goalReached' | 'keepGoing' | 'goalsMet' | 'goalsMetDesc' | 'allGoalsMet' | 'allGoalsMetDesc' | 'pawsOnTrack'
  | 'awayFromGoal' | 'toReachGoal'
  | 'tip_walk_title' | 'tip_walk_desc' | 'tip_time_title' | 'tip_time_desc' | 'tip_hydration_title' | 'tip_hydration_desc' | 'tip_check_title' | 'tip_check_desc' | 'tip_social_title' | 'tip_social_desc';

const en: Record<TranslationKey, string> = {
    nav_home: 'Home', nav_dogs: 'My Pack', nav_walk: 'Go Walk', nav_stats: 'Activity', nav_settings: 'Settings', 
    hi: 'Hello', ready: 'Time for an adventure?', 
    beautifulDay: "It's a paw-fect day!", greeting_adventure: "Adventure awaits!", greeting_great: "Let's get moving!", greeting_sniff: "Time to sniff the world!",
    totalDist: 'Total Km', totalWalks: 'Walks', pack: 'Your Pack', start: 'Start Adventure', addDog: 'Add Paw', 
    myDogs: 'My Pack', activity: 'Activity Log', settings: 'Settings', appearance: 'Theme', darkMode: 'Night Mode', general: 'General', language: 'Language', notifications: 'Notifications', privacy: 'Privacy', logOut: 'Sign Out', 
    whosWalking: "Who's joining?", selectPups: "Tap the paws coming along.", cancel: "Cancel",
    name: "Name", breed: "Breed", age: "Age", weight: "Weight", save: "Save Profile", editDog: "Edit Paw", newDog: "New Paw", deleteDog: "Remove Paw", pickColor: "Theme Color", pickMascot: "Choose Avatar", deleteConfirm: "Are you sure you want to remove this furry friend?", years: "yrs", kg: "kg", days: "days",
    analytics: "Insights", time: "Duration",
    about: "About PawGo", learning: "Paw Care Tips", version: "Version", developer: "Developer", credits: "Credits", next: "Next", back: "Back", finish: "Let's Go",
    ai_welcome: "Woof {name}! I'm PawGo AI. I know all about {dogs}. How can I help your pack today? 🐾",
    accentColor: 'Accent Color', backgroundTheme: 'Background Theme', lockedDarkMode: 'Locked in dark mode', support: 'Support', editProfile: 'Edit Profile',
    yourName: 'Your Name', chooseAvatar: 'Choose Avatar', designedBy: 'Designed by', craftedWithLove: 'Crafted with love for paws and their humans.', close: 'Close',
    enableNotif: 'Enable Notifications', masterSwitch: 'Master switch', walkReminders: 'Walk Reminders', achievements: 'Achievements',
    shareLoc: 'Share Location', shareLocDesc: 'For walk tracking', analyticsData: 'Analytics', analyticsDataDesc: 'Anonymous usage data',
    whistle: 'Whistle', clicker: 'Clicker', whistleDesc: 'Call your pack with a signal.', clickerDesc: 'Mark positive behaviors.',
    noPaws: 'No paws yet!', addFirstPaw: 'Add your first Paw', deletePawConfirm: 'Are you sure you want to remove this paw?', noPawsDesc: "You need to add the PAWS first to use this feature!", packLeader: "Pack Leader", gotIt: "Got it", cancelWalkConfirm: "Cancel walk?",
    selectPawError: 'You need to select a Paw to Proceed.', whosComing: "Who's coming?", tracking: 'Tracking Adventure...', calories: 'Calories', distance: 'Distance',
    missionComplete: 'Mission Complete!', highPaws: 'High paws all around!', thePack: 'The Pack', backHome: 'Back to Home',
    thisWeek: 'This Week', history: 'History', topPerformance: 'Top Goal Performance', onFire: "You're on fire!", topPack: 'Top 5% Active Pack', allPaws: 'All Paws',
    streak: 'Streak', goal: 'Goal', trends: 'Your Activity Trends', layout: 'Layout', done: 'Done', dayLog: 'Day Log', noActivity: 'No activity recorded',
    addActivity: 'Add Activity', editActivity: 'Edit Activity', logActivity: 'Log Activity', addPastWalk: 'Add Past Walk', participation: 'Participation',
    distLabel: 'Dist (km)', timeLabel: 'Time (min)', saveRecord: 'Save Record', deleteRecord: 'Delete Record',
    voiceAssist: 'Voice Assist', listening: 'Listening...', askPlaceholder: 'Ask about {name}...', managePack: 'Manage Your Pack',
    filter_daily: 'Daily', filter_weekly: 'Weekly', filter_monthly: 'Monthly', today: 'Today', thisMonth: 'This Month',
    activityGoal: 'Activity Goal', goalDaily: 'Daily', goalWeekly: 'Weekly', goalDist: 'Km', goalMin: 'Min',
    goalReached: 'Done! 🎉', keepGoing: 'Keep Going', goalsMet: 'Goals Met', goalsMetDesc: 'Keep pushing the pack!', allGoalsMet: 'All Goals Met!', allGoalsMetDesc: 'Fantastic work!', pawsOnTrack: 'Paws on track',
    awayFromGoal: 'away', toReachGoal: "from {name}'s {period} goal",
    tip_walk_title: "Master the Walk",
    tip_walk_desc: "Keep the leash loose and let them sniff! Sniffing is like checking social media for dogs.",
    tip_time_title: "Timing is Key",
    tip_time_desc: "Avoid hot pavement! Walk early mornings or late evenings during summer. Test the ground with your palm.",
    tip_hydration_title: "Hydration Hero",
    tip_hydration_desc: "Always bring water for walks longer than 30 mins. Panting is their only way to cool down!",
    tip_check_title: "Paw Inspection",
    tip_check_desc: "Check paws after walks for burrs, ticks, or ice balls. Healthy paws mean happy walks!",
    tip_social_title: "Social Etiquette",
    tip_social_desc: "Always ask before letting your dog approach another. Not every dog wants to say hello."
};

// --- TRANSLATIONS HELPER FUNCTION TO CLONE ENGLISH AS BASE ---
const createLang = (overrides: Partial<Record<TranslationKey, string>>): Record<TranslationKey, string> => {
  return { ...en, ...overrides };
};

const es = createLang({
    nav_home: 'Inicio', nav_dogs: 'Mi Manada', nav_walk: 'Pasear', nav_stats: 'Actividad', nav_settings: 'Ajustes',
    hi: 'Hola', ready: '¿Listo para una aventura?',
    beautifulDay: "¡Es un día perfecto!", greeting_adventure: "¡La aventura aguarda!", greeting_great: "¡A moverse!", greeting_sniff: "¡Hora de olfatear!",
    totalDist: 'Km Total', totalWalks: 'Paseos', pack: 'Tu Manada', start: 'Empezar', addDog: 'Añadir',
    myDogs: 'Mi Manada', activity: 'Historial', settings: 'Ajustes', appearance: 'Tema', darkMode: 'Modo Oscuro', general: 'General', language: 'Idioma', notifications: 'Notificaciones', privacy: 'Privacidad', logOut: 'Cerrar Sesión',
    whosWalking: "¿Quién viene?", selectPups: "Toca las patas que vienen.", cancel: "Cancelar",
    name: "Nombre", breed: "Raza", age: "Edad", weight: "Peso", save: "Guardar", editDog: "Editar", newDog: "Nuevo Perro", deleteDog: "Eliminar", pickColor: "Color", pickMascot: "Avatar", deleteConfirm: "¿Estás seguro?", years: "años", kg: "kg", days: "días",
    analytics: "Estadísticas", time: "Tiempo",
    about: "Sobre PawGo", learning: "Consejos", version: "Versión", developer: "Desarrollador", credits: "Créditos", next: "Sig", back: "Atrás", finish: "Vamos",
    ai_welcome: "¡Guau {name}! Soy PawGo AI. Conozco todo sobre {dogs}. ¿Cómo puedo ayudar a tu manada hoy? 🐾",
    accentColor: 'Color de Acento', backgroundTheme: 'Fondo', lockedDarkMode: 'Bloqueado en modo oscuro', support: 'Soporte', editProfile: 'Editar Perfil',
    yourName: 'Tu Nombre', chooseAvatar: 'Elegir Avatar', designedBy: 'Diseñado por', craftedWithLove: 'Hecho con amor.', close: 'Cerrar',
    enableNotif: 'Activar Notificaciones', masterSwitch: 'Interruptor maestro', walkReminders: 'Recordatorios', achievements: 'Logros',
    shareLoc: 'Compartir Ubicación', shareLocDesc: 'Para rastreo', analyticsData: 'Analíticas', analyticsDataDesc: 'Datos anónimos',
    whistle: 'Silbato', clicker: 'Clicker', whistleDesc: 'Llama a tu manada.', clickerDesc: 'Marca comportamientos.',
    noPaws: '¡No hay patas!', addFirstPaw: 'Añade tu primera pata', deletePawConfirm: '¿Seguro que quieres eliminar esta pata?', noPawsDesc: "¡Necesitas añadir una pata primero!", packLeader: "Líder de Manada", gotIt: "Entendido", cancelWalkConfirm: "¿Cancelar paseo?",
    selectPawError: 'Necesitas seleccionar una pata.', whosComing: "¿Quién viene?", tracking: 'Rastreando...', calories: 'Calorías', distance: 'Distancia',
    missionComplete: '¡Misión Cumplida!', highPaws: '¡Choca esas patas!', thePack: 'La Manada', backHome: 'Volver',
    thisWeek: 'Esta Semana', history: 'Historial', topPerformance: 'Mejor Rendimiento', onFire: "¡Estás en racha!", topPack: 'Top 5% Manada', allPaws: 'Todas',
    streak: 'Racha', goal: 'Meta', trends: 'Tendencias', layout: 'Diseño', done: 'Hecho', dayLog: 'Registro', noActivity: 'Sin actividad',
    addActivity: 'Añadir', editActivity: 'Editar', logActivity: 'Registrar', addPastWalk: 'Añadir Paseo Pasado', participation: 'Participación',
    distLabel: 'Dist (km)', timeLabel: 'Tiempo (min)', saveRecord: 'Guardar', deleteRecord: 'Eliminar',
    voiceAssist: 'Asistente de Voz', listening: 'Escuchando...', askPlaceholder: 'Pregunta sobre {name}...', managePack: 'Gestionar Manada',
    filter_daily: 'Diario', filter_weekly: 'Semanal', filter_monthly: 'Mensual', today: 'Hoy', thisMonth: 'Este Mes',
    activityGoal: 'Meta', goalDaily: 'Diaria', goalWeekly: 'Semanal', goalDist: 'Km', goalMin: 'Min',
    goalReached: '¡Hecho! 🎉', keepGoing: 'Sigue así', goalsMet: 'Metas Cumplidas', goalsMetDesc: '¡Sigue empujando!', allGoalsMet: '¡Todas las Metas!', allGoalsMetDesc: '¡Fantástico trabajo!', pawsOnTrack: 'Patas en camino',
    awayFromGoal: 'falta', toReachGoal: "para la meta {period} de {name}",
    tip_walk_title: "Maestro del Paseo", tip_walk_desc: "¡Mantén la correa floja y déjalos olfatear! Es como leer las noticias para ellos.",
    tip_time_title: "El Tiempo es Clave", tip_time_desc: "¡Evita el asfalto caliente! Pasea temprano o tarde en verano.",
    tip_hydration_title: "Héroe de Hidratación", tip_hydration_desc: "Lleva agua para paseos de más de 30 min.",
    tip_check_title: "Inspección de Patas", tip_check_desc: "Revisa las patas después de pasear.",
    tip_social_title: "Etiqueta Social", tip_social_desc: "Pregunta siempre antes de dejar que tu perro se acerque a otro."
});

const de = createLang({
    nav_home: 'Start', nav_dogs: 'Rudel', nav_walk: 'Los', nav_stats: 'Aktivität', nav_settings: 'Einst.',
    hi: 'Hallo', ready: 'Bereit?', beautifulDay: "Ein pfotenstarker Tag!", greeting_adventure: "Abenteuer wartet!", greeting_great: "Lass uns gehen!", greeting_sniff: "Zeit zum Schnüffeln!",
    totalDist: 'Gesamt Km', totalWalks: 'Gänge', pack: 'Dein Rudel', start: 'Starten', addDog: 'Hinzufügen',
    myDogs: 'Mein Rudel', activity: 'Protokoll', settings: 'Einstellungen', appearance: 'Design', darkMode: 'Nachtmodus', general: 'Allgemein', language: 'Sprache', notifications: 'Mitteilungen', privacy: 'Datenschutz', logOut: 'Abmelden',
    whosWalking: "Wer kommt mit?", selectPups: "Wähle die Begleiter.", cancel: "Abbrechen",
    name: "Name", breed: "Rasse", age: "Alter", weight: "Gewicht", save: "Speichern", editDog: "Bearbeiten", newDog: "Neuer Hund", deleteDog: "Löschen", pickColor: "Farbe", pickMascot: "Avatar", deleteConfirm: "Wirklich löschen?", years: "Jahre", kg: "kg", days: "Tage",
    analytics: "Statistik", time: "Dauer",
    about: "Über PawGo", learning: "Tipps", version: "Version", developer: "Entwickler", credits: "Credits", next: "Weiter", back: "Zurück", finish: "Los",
    ai_welcome: "Wuff {name}! Ich bin PawGo AI. Wie kann ich helfen? 🐾",
    accentColor: 'Akzentfarbe', backgroundTheme: 'Hintergrund', lockedDarkMode: 'Nachtmodus', support: 'Hilfe', editProfile: 'Profil bearbeiten',
    yourName: 'Dein Name', chooseAvatar: 'Avatar', designedBy: 'Entwurf', craftedWithLove: 'Mit Liebe gemacht.', close: 'Schließen',
    enableNotif: 'Mitteilungen an', masterSwitch: 'Hauptschalter', walkReminders: 'Erinnerungen', achievements: 'Erfolge',
    shareLoc: 'Standort teilen', shareLocDesc: 'Für Tracking', analyticsData: 'Analysen', analyticsDataDesc: 'Anonyme Daten',
    whistle: 'Pfeife', clicker: 'Clicker', whistleDesc: 'Rufe dein Rudel.', clickerDesc: 'Markiere Verhalten.',
    noPaws: 'Keine Pfoten!', addFirstPaw: 'Erste Pfote hinzufügen', deletePawConfirm: 'Sicher löschen?', noPawsDesc: "Erst Pfote hinzufügen!", packLeader: "Rudelführer", gotIt: "Verstanden", cancelWalkConfirm: "Abbrechen?",
    selectPawError: 'Bitte wähle eine Pfote.', whosComing: "Wer kommt?", tracking: 'Tracking...', calories: 'Kalorien', distance: 'Distanz',
    missionComplete: 'Ziel Erreicht!', highPaws: 'High Paws!', thePack: 'Das Rudel', backHome: 'Nach Hause',
    thisWeek: 'Diese Woche', history: 'Verlauf', topPerformance: 'Top Leistung', onFire: "Du brennst!", topPack: 'Top 5%', allPaws: 'Alle',
    streak: 'Serie', goal: 'Ziel', trends: 'Trends', layout: 'Layout', done: 'Fertig', dayLog: 'Protokoll', noActivity: 'Keine Aktivität',
    addActivity: 'Aktivität', editActivity: 'Bearbeiten', logActivity: 'Loggen', addPastWalk: 'Nachtragen', participation: 'Teilnahme',
    distLabel: 'Dist (km)', timeLabel: 'Zeit (min)', saveRecord: 'Speichern', deleteRecord: 'Löschen',
    voiceAssist: 'Sprachassistent', listening: 'Zuhören...', askPlaceholder: 'Frag über {name}...', managePack: 'Verwalten',
    filter_daily: 'Täglich', filter_weekly: 'Woche', filter_monthly: 'Monat', today: 'Heute', thisMonth: 'Monat',
    activityGoal: 'Ziel', goalDaily: 'Tag', goalWeekly: 'Woche', goalDist: 'Km', goalMin: 'Min',
    goalReached: 'Geschafft! 🎉', keepGoing: 'Weiter so', goalsMet: 'Ziele erreicht', goalsMetDesc: 'Super!', allGoalsMet: 'Alle Ziele!', allGoalsMetDesc: 'Fantastisch!', pawsOnTrack: 'Auf Kurs',
    awayFromGoal: 'entfernt', toReachGoal: "vom {period} Ziel für {name}",
    tip_walk_title: "Meister des Gehens", tip_walk_desc: "Lass die Leine locker!",
    tip_time_title: "Timing ist alles", tip_time_desc: "Meide heißen Asphalt!",
    tip_hydration_title: "Hydration", tip_hydration_desc: "Nimm Wasser mit.",
    tip_check_title: "Pfoten-Check", tip_check_desc: "Prüfe Pfoten oft.",
    tip_social_title: "Soziales", tip_social_desc: "Frage immer erst."
});

const fr = createLang({
    nav_home: 'Accueil', nav_dogs: 'Meute', nav_walk: 'Go', nav_stats: 'Activité', nav_settings: 'Réglages',
    hi: 'Salut', ready: 'Prêt ?', beautifulDay: "Journée parfaite !", greeting_adventure: "L'aventure attend !", greeting_great: "Allons-y !", greeting_sniff: "On renifle !",
    totalDist: 'Km Total', totalWalks: 'Marches', pack: 'Ta Meute', start: 'Démarrer', addDog: 'Ajouter',
    myDogs: 'Ma Meute', activity: 'Journal', settings: 'Réglages', appearance: 'Thème', darkMode: 'Mode Nuit', general: 'Général', language: 'Langue', notifications: 'Notifs', privacy: 'Privé', logOut: 'Déconnexion',
    whosWalking: "Qui vient ?", selectPups: "Sélectionnez.", cancel: "Annuler",
    name: "Nom", breed: "Race", age: "Âge", weight: "Poids", save: "Sauver", editDog: "Modifier", newDog: "Nouveau", deleteDog: "Supprimer", pickColor: "Couleur", pickMascot: "Avatar", deleteConfirm: "Sûr ?", years: "ans", kg: "kg", days: "jours",
    analytics: "Stats", time: "Durée",
    about: "À propos", learning: "Conseils", version: "Vers.", developer: "Dev", credits: "Crédits", next: "Suivant", back: "Retour", finish: "Go",
    ai_welcome: "Wouf {name}! Je suis PawGo AI. Comment aider ? 🐾",
    accentColor: 'Couleur', backgroundTheme: 'Fond', lockedDarkMode: 'Mode nuit', support: 'Aide', editProfile: 'Profil',
    yourName: 'Nom', chooseAvatar: 'Avatar', designedBy: 'Conçu par', craftedWithLove: 'Fait avec amour.', close: 'Fermer',
    enableNotif: 'Notifications', masterSwitch: 'Principal', walkReminders: 'Rappels', achievements: 'Succès',
    shareLoc: 'Position', shareLocDesc: 'Pour le suivi', analyticsData: 'Analytique', analyticsDataDesc: 'Anonyme',
    whistle: 'Sifflet', clicker: 'Clicker', whistleDesc: 'Appel.', clickerDesc: 'Marqueur.',
    noPaws: 'Pas de pattes !', addFirstPaw: 'Ajouter', deletePawConfirm: 'Supprimer ?', noPawsDesc: "Ajoutez une patte d'abord !", packLeader: "Chef de Meute", gotIt: "Compris", cancelWalkConfirm: "Annuler ?",
    selectPawError: 'Sélectionnez une patte.', whosComing: "Qui vient ?", tracking: 'Suivi...', calories: 'Calories', distance: 'Distance',
    missionComplete: 'Terminé !', highPaws: 'Bravo !', thePack: 'La Meute', backHome: 'Retour',
    thisWeek: 'Cette Semaine', history: 'Historique', topPerformance: 'Top Perf', onFire: "En feu !", topPack: 'Top 5%', allPaws: 'Toutes',
    streak: 'Série', goal: 'Objectif', trends: 'Tendances', layout: 'Disposition', done: 'Fait', dayLog: 'Journal', noActivity: 'Rien',
    addActivity: 'Ajouter', editActivity: 'Modifier', logActivity: 'Noter', addPastWalk: 'Passé', participation: 'Participation',
    distLabel: 'Dist (km)', timeLabel: 'Temps (min)', saveRecord: 'Sauver', deleteRecord: 'Supprimer',
    voiceAssist: 'Vocal', listening: 'Écoute...', askPlaceholder: 'Demandez...', managePack: 'Gérer',
    filter_daily: 'Jour', filter_weekly: 'Hebdo', filter_monthly: 'Mois', today: "Auj.", thisMonth: 'Ce Mois',
    activityGoal: "Objectif", goalDaily: 'Jour', goalWeekly: 'Semaine', goalDist: 'Km', goalMin: 'Min',
    goalReached: 'Atteint ! 🎉', keepGoing: 'Continuez', goalsMet: 'Objectifs atteints', goalsMetDesc: 'Bravo !', allGoalsMet: 'Tout atteint !', allGoalsMetDesc: 'Super !', pawsOnTrack: 'En piste',
    awayFromGoal: 'restant', toReachGoal: "pour l'obj. {period} de {name}",
    tip_walk_title: "Promenade", tip_walk_desc: "Laisse lâche !", tip_time_title: "Timing", tip_time_desc: "Évitez le chaud.", tip_hydration_title: "Eau", tip_hydration_desc: "Apportez de l'eau.", tip_check_title: "Pattes", tip_check_desc: "Vérifiez les pattes.", tip_social_title: "Social", tip_social_desc: "Demandez toujours."
});

const it = createLang({
    nav_home: 'Home', nav_dogs: 'Branco', nav_walk: 'Via', nav_stats: 'Attività', nav_settings: 'Opzioni',
    hi: 'Ciao', ready: 'Pronto?', beautifulDay: "Giornata top!", greeting_adventure: "Avventura!", greeting_great: "Andiamo!", greeting_sniff: "Si annusa!",
    totalDist: 'Km Tot', totalWalks: 'Giri', pack: 'Branco', start: 'Inizia', addDog: 'Aggiungi',
    myDogs: 'Mio Branco', activity: 'Diario', settings: 'Opzioni', appearance: 'Tema', darkMode: 'Notte', general: 'Generale', language: 'Lingua', notifications: 'Notifiche', privacy: 'Privacy', logOut: 'Esci',
    whosWalking: "Chi c'è?", selectPups: "Scegli.", cancel: "Annulla",
    name: "Nome", breed: "Razza", age: "Età", weight: "Peso", save: "Salva", editDog: "Modifica", newDog: "Nuovo", deleteDog: "Elimina", pickColor: "Colore", pickMascot: "Avatar", deleteConfirm: "Sicuro?", years: "anni", kg: "kg", days: "gg",
    analytics: "Dati", time: "Durata",
    about: "Info", learning: "Consigli", version: "Ver.", developer: "Dev", credits: "Crediti", next: "Avanti", back: "Indietro", finish: "Vai",
    ai_welcome: "Bau {name}! Sono PawGo AI. 🐾",
    accentColor: 'Colore', backgroundTheme: 'Sfondo', lockedDarkMode: 'Bloccato', support: 'Aiuto', editProfile: 'Profilo',
    yourName: 'Nome', chooseAvatar: 'Avatar', designedBy: 'Design', craftedWithLove: 'Con amore.', close: 'Chiudi',
    enableNotif: 'Notifiche', masterSwitch: 'Generale', walkReminders: 'Promemoria', achievements: 'Premi',
    shareLoc: 'Posizione', shareLocDesc: 'Tracciamento', analyticsData: 'Dati', analyticsDataDesc: 'Anonimi',
    whistle: 'Fischio', clicker: 'Clicker', whistleDesc: 'Chiama.', clickerDesc: 'Segna.',
    noPaws: 'Nessuna zampa!', addFirstPaw: 'Aggiungi', deletePawConfirm: 'Eliminare?', noPawsDesc: "Aggiungi una zampa!", packLeader: "Capo Branco", gotIt: "Capito", cancelWalkConfirm: "Annullare?",
    selectPawError: 'Seleziona una zampa.', whosComing: "Chi viene?", tracking: 'Tracciamento...', calories: 'Calorie', distance: 'Distanza',
    missionComplete: 'Finito!', highPaws: 'Batti 5!', thePack: 'Branco', backHome: 'Home',
    thisWeek: 'Settimana', history: 'Storico', topPerformance: 'Top', onFire: "Vai forte!", topPack: 'Top 5%', allPaws: 'Tutti',
    streak: 'Serie', goal: 'Obiettivo', trends: 'Trend', layout: 'Layout', done: 'Fatto', dayLog: 'Diario', noActivity: 'Nulla',
    addActivity: 'Aggiungi', editActivity: 'Modifica', logActivity: 'Registra', addPastWalk: 'Passato', participation: 'Cani',
    distLabel: 'Dist (km)', timeLabel: 'Tempo', saveRecord: 'Salva', deleteRecord: 'Elimina',
    voiceAssist: 'Voce', listening: 'Ascolto...', askPlaceholder: 'Chiedi...', managePack: 'Gestisci',
    filter_daily: 'Giorno', filter_weekly: 'Sett.', filter_monthly: 'Mese', today: 'Oggi', thisMonth: 'Mese',
    activityGoal: 'Obiettivo', goalDaily: 'Giorno', goalWeekly: 'Sett.', goalDist: 'Km', goalMin: 'Min',
    goalReached: 'Fatto! 🎉', keepGoing: 'Dai!', goalsMet: 'Fatti', goalsMetDesc: 'Bene!', allGoalsMet: 'Tutti!', allGoalsMetDesc: 'Fantastico!', pawsOnTrack: 'In pista',
    awayFromGoal: 'mancanti', toReachGoal: "per {period} di {name}",
    tip_walk_title: "Passeggiata", tip_walk_desc: "Guinzaglio lento.", tip_time_title: "Tempo", tip_time_desc: "No asfalto caldo.", tip_hydration_title: "Acqua", tip_hydration_desc: "Porta acqua.", tip_check_title: "Zampe", tip_check_desc: "Controlla.", tip_social_title: "Sociale", tip_social_desc: "Chiedi prima."
});

const pt = createLang({
    nav_home: 'Início', nav_dogs: 'Matilha', nav_walk: 'Passear', nav_stats: 'Atividade', nav_settings: 'Ajustes',
    hi: 'Olá', ready: 'Pronto?', beautifulDay: "Dia perfeito!", greeting_adventure: "Aventura!", greeting_great: "Vamos!", greeting_sniff: "Farejar!",
    totalDist: 'Km Total', totalWalks: 'Passeios', pack: 'Matilha', start: 'Iniciar', addDog: 'Add',
    myDogs: 'Matilha', activity: 'Histórico', settings: 'Ajustes', appearance: 'Tema', darkMode: 'Escuro', general: 'Geral', language: 'Idioma', notifications: 'Notificações', privacy: 'Privacidade', logOut: 'Sair',
    whosWalking: "Quem vai?", selectPups: "Escolha.", cancel: "Cancelar",
    name: "Nome", breed: "Raça", age: "Idade", weight: "Peso", save: "Salvar", editDog: "Editar", newDog: "Novo", deleteDog: "Excluir", pickColor: "Cor", pickMascot: "Avatar", deleteConfirm: "Certeza?", years: "anos", kg: "kg", days: "dias",
    analytics: "Dados", time: "Tempo",
    about: "Sobre", learning: "Dicas", version: "Ver.", developer: "Dev", credits: "Créditos", next: "Próx", back: "Voltar", finish: "Ir",
    ai_welcome: "Au au {name}! Sou PawGo AI. 🐾",
    accentColor: 'Destaque', backgroundTheme: 'Fundo', lockedDarkMode: 'Travado', support: 'Suporte', editProfile: 'Perfil',
    yourName: 'Nome', chooseAvatar: 'Avatar', designedBy: 'Design', craftedWithLove: 'Com amor.', close: 'Fechar',
    enableNotif: 'Ativar Notif.', masterSwitch: 'Geral', walkReminders: 'Lembretes', achievements: 'Conquistas',
    shareLoc: 'Local', shareLocDesc: 'Rastreio', analyticsData: 'Dados', analyticsDataDesc: 'Anônimos',
    whistle: 'Apito', clicker: 'Clicker', whistleDesc: 'Chame.', clickerDesc: 'Marque.',
    noPaws: 'Sem patas!', addFirstPaw: 'Adicione', deletePawConfirm: 'Remover?', noPawsDesc: "Adicione uma pata!", packLeader: "Líder", gotIt: "Entendi", cancelWalkConfirm: "Cancelar?",
    selectPawError: 'Selecione.', whosComing: "Quem vem?", tracking: 'Rastreando...', calories: 'Calorias', distance: 'Distância',
    missionComplete: 'Fim!', highPaws: 'Toca aqui!', thePack: 'Matilha', backHome: 'Início',
    thisWeek: 'Semana', history: 'Histórico', topPerformance: 'Melhor', onFire: "Fogo!", topPack: 'Top 5%', allPaws: 'Todas',
    streak: 'Série', goal: 'Meta', trends: 'Tendências', layout: 'Layout', done: 'Pronto', dayLog: 'Diário', noActivity: 'Nada',
    addActivity: 'Add', editActivity: 'Editar', logActivity: 'Registrar', addPastWalk: 'Passado', participation: 'Cães',
    distLabel: 'Dist (km)', timeLabel: 'Tempo', saveRecord: 'Salvar', deleteRecord: 'Excluir',
    voiceAssist: 'Voz', listening: 'Ouvindo...', askPlaceholder: 'Pergunte...', managePack: 'Gerenciar',
    filter_daily: 'Diário', filter_weekly: 'Semana', filter_monthly: 'Mês', today: 'Hoje', thisMonth: 'Mês',
    activityGoal: 'Meta', goalDaily: 'Dia', goalWeekly: 'Semana', goalDist: 'Km', goalMin: 'Min',
    goalReached: 'Feito! 🎉', keepGoing: 'Continue', goalsMet: 'Atingidas', goalsMetDesc: 'Boa!', allGoalsMet: 'Todas!', allGoalsMetDesc: 'Fantástico!', pawsOnTrack: 'No caminho',
    awayFromGoal: 'falta', toReachGoal: "p/ meta {period} de {name}",
    tip_walk_title: "Passeio", tip_walk_desc: "Guia frouxa.", tip_time_title: "Timing", tip_time_desc: "Evite calor.", tip_hydration_title: "Hidratação", tip_hydration_desc: "Água sempre.", tip_check_title: "Patas", tip_check_desc: "Cheque sempre.", tip_social_title: "Social", tip_social_desc: "Pergunte antes."
});

const nl = createLang({
    nav_home: 'Home', nav_dogs: 'Mijn Roedel', nav_walk: 'Wandelen', nav_stats: 'Activiteit', nav_settings: 'Instellingen',
    hi: 'Hallo', ready: 'Klaar voor avontuur?', beautifulDay: "Mooie dag!", greeting_adventure: "Avontuur wacht!", greeting_great: "Laten we gaan!", greeting_sniff: "Snuffeltijd!",
    totalDist: 'Totaal Km', totalWalks: 'Wandelingen', pack: 'Je Roedel', start: 'Start', addDog: 'Toevoegen',
    myDogs: 'Mijn Roedel', activity: 'Logboek', settings: 'Instellingen', appearance: 'Thema', darkMode: 'Nachtmodus', general: 'Algemeen', language: 'Taal', notifications: 'Meldingen', privacy: 'Privacy', logOut: 'Uitloggen',
    whosWalking: "Wie gaat mee?", selectPups: "Kies honden.", cancel: "Annuleren",
    name: "Naam", breed: "Ras", age: "Leeftijd", weight: "Gewicht", save: "Opslaan", editDog: "Bewerk", newDog: "Nieuw", deleteDog: "Verwijder", pickColor: "Kleur", pickMascot: "Avatar", deleteConfirm: "Zeker weten?", years: "jaar", kg: "kg", days: "dagen",
    analytics: "Statistieken", time: "Tijd",
    about: "Over", learning: "Tips", version: "Versie", developer: "Ontwikkelaar", credits: "Credits", next: "Volgende", back: "Terug", finish: "Start",
    ai_welcome: "Woef {name}! Ik ben PawGo AI. 🐾",
    accentColor: 'Accentkleur', backgroundTheme: 'Achtergrond', lockedDarkMode: 'Nachtmodus aan', support: 'Hulp', editProfile: 'Profiel',
    yourName: 'Naam', chooseAvatar: 'Avatar', designedBy: 'Ontwerp', craftedWithLove: 'Met liefde.', close: 'Sluiten',
    enableNotif: 'Meldingen', masterSwitch: 'Hoofd', walkReminders: 'Herinneringen', achievements: 'Prestaties',
    shareLoc: 'Locatie delen', shareLocDesc: 'Voor tracking', analyticsData: 'Data', analyticsDataDesc: 'Anoniem',
    whistle: 'Fluit', clicker: 'Clicker', whistleDesc: 'Roep roedel.', clickerDesc: 'Markeer gedrag.',
    noPaws: 'Geen poten!', addFirstPaw: 'Voeg toe', deletePawConfirm: 'Verwijderen?', noPawsDesc: "Voeg eerst een poot toe!", packLeader: "Roedelleider", gotIt: "Begrepen", cancelWalkConfirm: "Stoppen?",
    selectPawError: 'Kies een poot.', whosComing: "Wie komt?", tracking: 'Tracken...', calories: 'Calorieën', distance: 'Afstand',
    missionComplete: 'Klaar!', highPaws: 'Pootje!', thePack: 'Roedel', backHome: 'Home',
    thisWeek: 'Deze Week', history: 'Geschiedenis', topPerformance: 'Top', onFire: "Lekker bezig!", topPack: 'Top 5%', allPaws: 'Alle',
    streak: 'Reeks', goal: 'Doel', trends: 'Trends', layout: 'Layout', done: 'Klaar', dayLog: 'Dagboek', noActivity: 'Geen activiteit',
    addActivity: 'Toevoegen', editActivity: 'Bewerk', logActivity: 'Log', addPastWalk: 'Historie', participation: 'Deelname',
    distLabel: 'Afst (km)', timeLabel: 'Tijd (min)', saveRecord: 'Opslaan', deleteRecord: 'Verwijder',
    voiceAssist: 'Stem', listening: 'Luisteren...', askPlaceholder: 'Vraag...', managePack: 'Beheer',
    filter_daily: 'Dag', filter_weekly: 'Week', filter_monthly: 'Maand', today: 'Vandaag', thisMonth: 'Maand',
    activityGoal: 'Doel', goalDaily: 'Dag', goalWeekly: 'Week', goalDist: 'Km', goalMin: 'Min',
    goalReached: 'Klaar! 🎉', keepGoing: 'Ga zo door', goalsMet: 'Behaald', goalsMetDesc: 'Super!', allGoalsMet: 'Alles behaald!', allGoalsMetDesc: 'Fantastisch!', pawsOnTrack: 'Op koers',
    awayFromGoal: 'te gaan', toReachGoal: "voor {period} doel van {name}",
    tip_walk_title: "Wandelen", tip_walk_desc: "Losse riem.", tip_time_title: "Tijd", tip_time_desc: "Vermijd hitte.", tip_hydration_title: "Water", tip_hydration_desc: "Neem mee.", tip_check_title: "Poten", tip_check_desc: "Controleer.", tip_social_title: "Sociaal", tip_social_desc: "Vraag eerst."
});

const sv = createLang({
    nav_home: 'Hem', nav_dogs: 'Flock', nav_walk: 'Gå', nav_stats: 'Aktivitet', nav_settings: 'Inställningar',
    hi: 'Hej', ready: 'Redo?', beautifulDay: "Fin dag!", greeting_adventure: "Äventyr!", greeting_great: "Nu går vi!", greeting_sniff: "Sniffa på!",
    totalDist: 'Total Km', totalWalks: 'Promenader', pack: 'Din Flock', start: 'Starta', addDog: 'Lägg till',
    myDogs: 'Min Flock', activity: 'Logg', settings: 'Inställningar', appearance: 'Tema', darkMode: 'Nattläge', general: 'Allmänt', language: 'Språk', notifications: 'Notiser', privacy: 'Integritet', logOut: 'Logga ut',
    whosWalking: "Vem följer?", selectPups: "Välj.", cancel: "Avbryt",
    name: "Namn", breed: "Ras", age: "Ålder", weight: "Vikt", save: "Spara", editDog: "Redigera", newDog: "Ny Hund", deleteDog: "Ta bort", pickColor: "Färg", pickMascot: "Avatar", deleteConfirm: "Säker?", years: "år", kg: "kg", days: "dagar",
    analytics: "Statistik", time: "Tid",
    about: "Om", learning: "Tips", version: "Ver.", developer: "Utv.", credits: "Credits", next: "Nästa", back: "Bakåt", finish: "Gå",
    ai_welcome: "Voff {name}! Jag är PawGo AI. 🐾",
    accentColor: 'Accentfärg', backgroundTheme: 'Bakgrund', lockedDarkMode: 'Låst', support: 'Support', editProfile: 'Profil',
    yourName: 'Namn', chooseAvatar: 'Avatar', designedBy: 'Design', craftedWithLove: 'Med kärlek.', close: 'Stäng',
    enableNotif: 'Notiser', masterSwitch: 'Huvud', walkReminders: 'Påminnelser', achievements: 'Bedrifter',
    shareLoc: 'Plats', shareLocDesc: 'Spårning', analyticsData: 'Data', analyticsDataDesc: 'Anonym',
    whistle: 'Visselpipa', clicker: 'Klicker', whistleDesc: 'Kalla.', clickerDesc: 'Markera.',
    noPaws: 'Inga tassar!', addFirstPaw: 'Lägg till', deletePawConfirm: 'Ta bort?', noPawsDesc: "Lägg till en tass först!", packLeader: "Flockledare", gotIt: "Fattar", cancelWalkConfirm: "Avbryt?",
    selectPawError: 'Välj en tass.', whosComing: "Vem kommer?", tracking: 'Spårar...', calories: 'Kalorier', distance: 'Distans',
    missionComplete: 'Klart!', highPaws: 'High Paws!', thePack: 'Flocken', backHome: 'Hem',
    thisWeek: 'Vecka', history: 'Historik', topPerformance: 'Topp', onFire: "Grymt!", topPack: 'Topp 5%', allPaws: 'Alla',
    streak: 'Svit', goal: 'Mål', trends: 'Trender', layout: 'Layout', done: 'Klar', dayLog: 'Dagbok', noActivity: 'Inget',
    addActivity: 'Lägg till', editActivity: 'Redigera', logActivity: 'Logga', addPastWalk: 'Tidigare', participation: 'Deltagande',
    distLabel: 'Dist (km)', timeLabel: 'Tid (min)', saveRecord: 'Spara', deleteRecord: 'Ta bort',
    voiceAssist: 'Röst', listening: 'Lyssnar...', askPlaceholder: 'Fråga...', managePack: 'Hantera',
    filter_daily: 'Dag', filter_weekly: 'Vecka', filter_monthly: 'Månad', today: 'Idag', thisMonth: 'Månad',
    activityGoal: 'Mål', goalDaily: 'Dag', goalWeekly: 'Vecka', goalDist: 'Km', goalMin: 'Min',
    goalReached: 'Klart! 🎉', keepGoing: 'Kör på', goalsMet: 'Mål nådda', goalsMetDesc: 'Bra jobbat!', allGoalsMet: 'Alla mål!', allGoalsMetDesc: 'Fantastiskt!', pawsOnTrack: 'På spåret',
    awayFromGoal: 'kvar', toReachGoal: "för {period} mål",
    tip_walk_title: "Promenad", tip_walk_desc: "Löst koppel.", tip_time_title: "Tid", tip_time_desc: "Undvik värme.", tip_hydration_title: "Vatten", tip_hydration_desc: "Ta med vatten.", tip_check_title: "Tassar", tip_check_desc: "Kolla tassar.", tip_social_title: "Socialt", tip_social_desc: "Fråga först."
});

const pl = createLang({
    nav_home: 'Start', nav_dogs: 'Stado', nav_walk: 'Spacer', nav_stats: 'Aktywność', nav_settings: 'Opcje',
    hi: 'Cześć', ready: 'Gotowy?', beautifulDay: "Piękny dzień!", greeting_adventure: "Przygoda!", greeting_great: "Ruszamy!", greeting_sniff: "Wąchamy!",
    totalDist: 'Dystans', totalWalks: 'Spacery', pack: 'Twoje Stado', start: 'Start', addDog: 'Dodaj',
    myDogs: 'Moje Stado', activity: 'Dziennik', settings: 'Opcje', appearance: 'Motyw', darkMode: 'Tryb Nocny', general: 'Ogólne', language: 'Język', notifications: 'Powiadomienia', privacy: 'Prywatność', logOut: 'Wyloguj',
    whosWalking: "Kto idzie?", selectPups: "Wybierz.", cancel: "Anuluj",
    name: "Imię", breed: "Rasa", age: "Wiek", weight: "Waga", save: "Zapisz", editDog: "Edytuj", newDog: "Nowy Pies", deleteDog: "Usuń", pickColor: "Kolor", pickMascot: "Awatar", deleteConfirm: "Pewien?", years: "lat", kg: "kg", days: "dni",
    analytics: "Statystyki", time: "Czas",
    about: "O nas", learning: "Porady", version: "Wersja", developer: "Dev", credits: "Credits", next: "Dalej", back: "Wstecz", finish: "Start",
    ai_welcome: "Hau {name}! Jestem PawGo AI. 🐾",
    accentColor: 'Akcent', backgroundTheme: 'Tło', lockedDarkMode: 'Zablokowany', support: 'Pomoc', editProfile: 'Profil',
    yourName: 'Imię', chooseAvatar: 'Awatar', designedBy: 'Projekt', craftedWithLove: 'Z miłością.', close: 'Zamknij',
    enableNotif: 'Powiadomienia', masterSwitch: 'Główne', walkReminders: 'Przypomnienia', achievements: 'Osiągnięcia',
    shareLoc: 'Lokalizacja', shareLocDesc: 'Śledzenie', analyticsData: 'Dane', analyticsDataDesc: 'Anonimowe',
    whistle: 'Gwizdek', clicker: 'Kliker', whistleDesc: 'Zawołaj.', clickerDesc: 'Zaznacz.',
    noPaws: 'Brak łap!', addFirstPaw: 'Dodaj', deletePawConfirm: 'Usunąć?', noPawsDesc: "Dodaj łapę najpierw!", packLeader: "Lider Stada", gotIt: "Jasne", cancelWalkConfirm: "Anulować?",
    selectPawError: 'Wybierz psa.', whosComing: "Kto idzie?", tracking: 'Śledzenie...', calories: 'Kalorie', distance: 'Dystans',
    missionComplete: 'Koniec!', highPaws: 'Brawo!', thePack: 'Stado', backHome: 'Start',
    thisWeek: 'Tydzień', history: 'Historia', topPerformance: 'Top', onFire: "Ogień!", topPack: 'Top 5%', allPaws: 'Wszystkie',
    streak: 'Seria', goal: 'Cel', trends: 'Trendy', layout: 'Układ', done: 'Gotowe', dayLog: 'Dziennik', noActivity: 'Brak',
    addActivity: 'Dodaj', editActivity: 'Edytuj', logActivity: 'Zapisz', addPastWalk: 'Miniony', participation: 'Udział',
    distLabel: 'Dyst (km)', timeLabel: 'Czas (min)', saveRecord: 'Zapisz', deleteRecord: 'Usuń',
    voiceAssist: 'Głos', listening: 'Słucham...', askPlaceholder: 'Zapytaj...', managePack: 'Zarządzaj',
    filter_daily: 'Dzień', filter_weekly: 'Tydzień', filter_monthly: 'Miesiąc', today: 'Dziś', thisMonth: 'Miesiąc',
    activityGoal: 'Cel', goalDaily: 'Dzień', goalWeekly: 'Tydzień', goalDist: 'Km', goalMin: 'Min',
    goalReached: 'Udało się! 🎉', keepGoing: 'Tak trzymaj', goalsMet: 'Cele', goalsMetDesc: 'Super!', allGoalsMet: 'Wszystkie cele!', allGoalsMetDesc: 'Ekstra!', pawsOnTrack: 'W normie',
    awayFromGoal: 'brakuje', toReachGoal: "do celu {period} dla {name}",
    tip_walk_title: "Spacer", tip_walk_desc: "Luźna smycz.", tip_time_title: "Czas", tip_time_desc: "Unikaj upału.", tip_hydration_title: "Woda", tip_hydration_desc: "Weź wodę.", tip_check_title: "Łapy", tip_check_desc: "Sprawdź łapy.", tip_social_title: "Etykieta", tip_social_desc: "Zapytaj."
});

const tr = createLang({
    nav_home: 'Ana Sayfa', nav_dogs: 'Sürü', nav_walk: 'Yürü', nav_stats: 'Aktivite', nav_settings: 'Ayarlar',
    hi: 'Merhaba', ready: 'Hazır mısın?', beautifulDay: "Harika gün!", greeting_adventure: "Macera!", greeting_great: "Hadi!", greeting_sniff: "Koklama zamanı!",
    totalDist: 'Toplam Km', totalWalks: 'Yürüyüş', pack: 'Sürün', start: 'Başla', addDog: 'Ekle',
    myDogs: 'Sürüm', activity: 'Günlük', settings: 'Ayarlar', appearance: 'Tema', darkMode: 'Gece Modu', general: 'Genel', language: 'Dil', notifications: 'Bildirimler', privacy: 'Gizlilik', logOut: 'Çıkış',
    whosWalking: "Kim geliyor?", selectPups: "Seç.", cancel: "İptal",
    name: "İsim", breed: "Irk", age: "Yaş", weight: "Ağırlık", save: "Kaydet", editDog: "Düzenle", newDog: "Yeni", deleteDog: "Sil", pickColor: "Renk", pickMascot: "Avatar", deleteConfirm: "Emin misin?", years: "yıl", kg: "kg", days: "gün",
    analytics: "Analiz", time: "Süre",
    about: "Hakkında", learning: "İpuçları", version: "Sürüm", developer: "Geliştirici", credits: "Emeği Geçenler", next: "İleri", back: "Geri", finish: "Git",
    ai_welcome: "Hav {name}! Ben PawGo AI. 🐾",
    accentColor: 'Vurgu', backgroundTheme: 'Arka Plan', lockedDarkMode: 'Kilitli', support: 'Destek', editProfile: 'Profil',
    yourName: 'İsim', chooseAvatar: 'Avatar', designedBy: 'Tasarım', craftedWithLove: 'Sevgiyle.', close: 'Kapat',
    enableNotif: 'Bildirimler', masterSwitch: 'Ana', walkReminders: 'Hatırlatıcı', achievements: 'Başarılar',
    shareLoc: 'Konum', shareLocDesc: 'Takip için', analyticsData: 'Veri', analyticsDataDesc: 'Anonim',
    whistle: 'Düdük', clicker: 'Kliker', whistleDesc: 'Çağır.', clickerDesc: 'İşaretle.',
    noPaws: 'Pati yok!', addFirstPaw: 'Ekle', deletePawConfirm: 'Sil?', noPawsDesc: "Önce pati ekle!", packLeader: "Sürü Lideri", gotIt: "Tamam", cancelWalkConfirm: "İptal?",
    selectPawError: 'Pati seç.', whosComing: "Kim geliyor?", tracking: 'Takip...', calories: 'Kalori', distance: 'Mesafe',
    missionComplete: 'Tamamlandı!', highPaws: 'Çak!', thePack: 'Sürü', backHome: 'Dön',
    thisWeek: 'Bu Hafta', history: 'Geçmiş', topPerformance: 'En İyi', onFire: "Harika!", topPack: 'Top 5%', allPaws: 'Hepsi',
    streak: 'Seri', goal: 'Hedef', trends: 'Trendler', layout: 'Düzen', done: 'Bitti', dayLog: 'Günlük', noActivity: 'Yok',
    addActivity: 'Ekle', editActivity: 'Düzenle', logActivity: 'Kaydet', addPastWalk: 'Geçmiş', participation: 'Katılım',
    distLabel: 'Mes (km)', timeLabel: 'Süre', saveRecord: 'Kaydet', deleteRecord: 'Sil',
    voiceAssist: 'Ses', listening: 'Dinliyor...', askPlaceholder: 'Sor...', managePack: 'Yönet',
    filter_daily: 'Gün', filter_weekly: 'Hafta', filter_monthly: 'Ay', today: 'Bugün', thisMonth: 'Ay',
    activityGoal: 'Hedef', goalDaily: 'Gün', goalWeekly: 'Hafta', goalDist: 'Km', goalMin: 'Dk',
    goalReached: 'Bitti! 🎉', keepGoing: 'Devam', goalsMet: 'Hedefler', goalsMetDesc: 'Süper!', allGoalsMet: 'Hepsi Tamam!', allGoalsMetDesc: 'Harika!', pawsOnTrack: 'Yolda',
    awayFromGoal: 'kaldı', toReachGoal: "{period} hedefi {name}",
    tip_walk_title: "Yürüyüş", tip_walk_desc: "Gevşek tasma.", tip_time_title: "Zaman", tip_time_desc: "Sıcaktan kaçın.", tip_hydration_title: "Su", tip_hydration_desc: "Su taşı.", tip_check_title: "Patiler", tip_check_desc: "Kontrol et.", tip_social_title: "Sosyal", tip_social_desc: "Önce sor."
});

const ru = createLang({
    nav_home: 'Главная', nav_dogs: 'Стая', nav_walk: 'Гулять', nav_stats: 'Активность', nav_settings: 'Настройки',
    hi: 'Привет', ready: 'Готовы?', beautifulDay: "Отличный день!", greeting_adventure: "Приключения!", greeting_great: "Вперед!", greeting_sniff: "Время нюхать!",
    totalDist: 'Всего км', totalWalks: 'Прогулки', pack: 'Твоя Стая', start: 'Старт', addDog: 'Добавить',
    myDogs: 'Моя Стая', activity: 'Журнал', settings: 'Настройки', appearance: 'Тема', darkMode: 'Ночь', general: 'Общее', language: 'Язык', notifications: 'Уведомления', privacy: 'Приватность', logOut: 'Выйти',
    whosWalking: "Кто идет?", selectPups: "Выбери.", cancel: "Отмена",
    name: "Имя", breed: "Порода", age: "Возраст", weight: "Вес", save: "Сохранить", editDog: "Изменить", newDog: "Новая", deleteDog: "Удалить", pickColor: "Цвет", pickMascot: "Аватар", deleteConfirm: "Уверен?", years: "лет", kg: "кг", days: "дн.",
    analytics: "Статистика", time: "Время",
    about: "О нас", learning: "Советы", version: "Версия", developer: "Разраб.", credits: "Кредиты", next: "Далее", back: "Назад", finish: "Вперед",
    ai_welcome: "Гав {name}! Я PawGo AI. 🐾",
    accentColor: 'Акцент', backgroundTheme: 'Фон', lockedDarkMode: 'Закрыто', support: 'Помощь', editProfile: 'Профиль',
    yourName: 'Имя', chooseAvatar: 'Аватар', designedBy: 'Дизайн', craftedWithLove: 'С любовью.', close: 'Закрыть',
    enableNotif: 'Вкл.', masterSwitch: 'Главный', walkReminders: 'Напом.', achievements: 'Достижения',
    shareLoc: 'Геопозиция', shareLocDesc: 'Трекинг', analyticsData: 'Данные', analyticsDataDesc: 'Анонимно',
    whistle: 'Свисток', clicker: 'Кликер', whistleDesc: 'Позови.', clickerDesc: 'Отметь.',
    noPaws: 'Нет лап!', addFirstPaw: 'Добавить', deletePawConfirm: 'Удалить?', noPawsDesc: "Добавь лапу!", packLeader: "Вожак", gotIt: "Понятно", cancelWalkConfirm: "Отменить?",
    selectPawError: 'Выбери лапу.', whosComing: "Кто идет?", tracking: 'Трекинг...', calories: 'Ккал', distance: 'Дистанция',
    missionComplete: 'Готово!', highPaws: 'Дай пять!', thePack: 'Стая', backHome: 'Домой',
    thisWeek: 'Неделя', history: 'История', topPerformance: 'Топ', onFire: "Огонь!", topPack: 'Топ 5%', allPaws: 'Все',
    streak: 'Серия', goal: 'Цель', trends: 'Тренды', layout: 'Макет', done: 'Готово', dayLog: 'День', noActivity: 'Нет данных',
    addActivity: 'Добавить', editActivity: 'Изменить', logActivity: 'Запись', addPastWalk: 'Прошлое', participation: 'Участие',
    distLabel: 'Км', timeLabel: 'Мин', saveRecord: 'Сохр.', deleteRecord: 'Удалить',
    voiceAssist: 'Голос', listening: 'Слушаю...', askPlaceholder: 'Спроси...', managePack: 'Управлять',
    filter_daily: 'День', filter_weekly: 'Неделя', filter_monthly: 'Месяц', today: 'Сегодня', thisMonth: 'Месяц',
    activityGoal: 'Цель', goalDaily: 'День', goalWeekly: 'Неделя', goalDist: 'Км', goalMin: 'Мин',
    goalReached: 'Готово! 🎉', keepGoing: 'Так держать', goalsMet: 'Цели', goalsMetDesc: 'Супер!', allGoalsMet: 'Все цели!', allGoalsMetDesc: 'Отлично!', pawsOnTrack: 'В норме',
    awayFromGoal: 'осталось', toReachGoal: "до цели {period} для {name}",
    tip_walk_title: "Прогулка", tip_walk_desc: "Свободный поводок.", tip_time_title: "Время", tip_time_desc: "Избегай жары.", tip_hydration_title: "Вода", tip_hydration_desc: "Бери воду.", tip_check_title: "Лапы", tip_check_desc: "Проверяй лапы.", tip_social_title: "Этикет", tip_social_desc: "Спроси сначала."
});

// Using 'createLang' to quickly polyfill the rest with English fallback + basic localization where names are obvious
const uk = createLang({
    nav_home: 'Головна', nav_dogs: 'Зграя', nav_walk: 'Гуляти', nav_stats: 'Активність', nav_settings: 'Налаштування',
    hi: 'Привіт', ready: 'Готові?', beautifulDay: "Гарний день!", greeting_adventure: "Пригоди!", greeting_great: "Вперед!", greeting_sniff: "Час нюхати!",
    totalDist: 'Всього км', totalWalks: 'Прогулянки', pack: 'Твоя Зграя', start: 'Старт', addDog: 'Додати',
    myDogs: 'Моя Зграя', activity: 'Журнал', settings: 'Налаштування', appearance: 'Тема', darkMode: 'Ніч', general: 'Загальне', language: 'Мова', notifications: 'Сповіщення', privacy: 'Приватність', logOut: 'Вийти',
    cancel: "Скасувати", name: "Ім'я", breed: "Порода", age: "Вік", weight: "Вага", save: "Зберегти", editDog: "Змінити", newDog: "Новий", deleteDog: "Видалити", years: "років", kg: "кг", days: "дн.",
    noPaws: 'Немає лап!', addFirstPaw: 'Додати', noPawsDesc: "Додай лапу!", packLeader: "Ватажок", gotIt: "Зрозуміло", cancelWalkConfirm: "Скасувати?"
});

const ro = createLang({
    nav_home: 'Acasă', nav_dogs: 'Haită', nav_walk: 'Plimbare', nav_stats: 'Activitate', nav_settings: 'Setări',
    hi: 'Salut', ready: 'Gata?', beautifulDay: "Zi frumoasă!", totalDist: 'Km Total', totalWalks: 'Plimbări', pack: 'Haita Ta', start: 'Start', addDog: 'Adaugă',
    myDogs: 'Haita Mea', activity: 'Jurnal', settings: 'Setări', appearance: 'Temă', darkMode: 'Noapte', general: 'General', language: 'Limbă', notifications: 'Notificări', privacy: 'Confidențialitate', logOut: 'Ieșire',
    cancel: "Anulare", name: "Nume", breed: "Rasǎ", age: "Vârstă", weight: "Greutate", save: "Salvează", editDog: "Editează", newDog: "Nou", deleteDog: "Șterge", years: "ani", kg: "kg", days: "zile",
    noPaws: 'Nicio labă!', addFirstPaw: 'Adaugă', noPawsDesc: "Adaugă o labă!", packLeader: "Lider", gotIt: "Am înțeles", cancelWalkConfirm: "Anulare?"
});

const cs = createLang({
    nav_home: 'Domů', nav_dogs: 'Smečka', nav_walk: 'Jít', nav_stats: 'Aktivita', nav_settings: 'Nastavení',
    hi: 'Ahoj', ready: 'Připraven?', totalDist: 'Celkem km', totalWalks: 'Procházky', pack: 'Tvá Smečka', start: 'Start', addDog: 'Přidat',
    myDogs: 'Moje Smečka', activity: 'Deník', settings: 'Nastavení', appearance: 'Vzhled', darkMode: 'Tmavý režim', general: 'Obecné', language: 'Jazyk', notifications: 'Oznámení', privacy: 'Soukromí', logOut: 'Odhlásit',
    cancel: "Zrušit", name: "Jméno", breed: "Plemeno", age: "Věk", weight: "Váha", save: "Uložit", editDog: "Upravit", newDog: "Nový", deleteDog: "Smazat", years: "let", kg: "kg", days: "dní",
    noPaws: 'Žádné tlapky!', addFirstPaw: 'Přidat', noPawsDesc: "Přidej tlapku!", packLeader: "Vůdce", gotIt: "Rozumím", cancelWalkConfirm: "Zrušit?"
});

const hu = createLang({
    nav_home: 'Főoldal', nav_dogs: 'Falka', nav_walk: 'Séta', nav_stats: 'Aktivitás', nav_settings: 'Beállítások',
    hi: 'Szia', ready: 'Kész?', totalDist: 'Összes km', totalWalks: 'Séták', pack: 'A Falkád', start: 'Indítás', addDog: 'Hozzáad',
    myDogs: 'Falkám', activity: 'Napló', settings: 'Beállítások', appearance: 'Téma', darkMode: 'Éjszakai', general: 'Általános', language: 'Nyelv', notifications: 'Értesítések', privacy: 'Adatvédelem', logOut: 'Kilépés',
    cancel: "Mégse", name: "Név", breed: "Fajta", age: "Kor", weight: "Súly", save: "Mentés", editDog: "Szerkeszt", newDog: "Új", deleteDog: "Törlés", years: "év", kg: "kg", days: "nap",
    noPaws: 'Nincs mancs!', addFirstPaw: 'Hozzáad', noPawsDesc: "Adj hozzá mancsot!", packLeader: "Vezér", gotIt: "Értem", cancelWalkConfirm: "Mégsem?"
});

const el = createLang({
    nav_home: 'Αρχική', nav_dogs: 'Αγέλη', nav_walk: 'Βόλτα', nav_stats: 'Δραστ.', nav_settings: 'Ρυθμίσεις',
    hi: 'Γεια', ready: 'Έτοιμοι;', totalDist: 'Χλμ', totalWalks: 'Βόλτες', pack: 'Η Αγέλη', start: 'Έναρξη', addDog: 'Προσθήκη',
    myDogs: 'Η Αγέλη μου', activity: 'Ιστορικό', settings: 'Ρυθμίσεις', appearance: 'Εμφάνιση', darkMode: 'Νύχτα', general: 'Γενικά', language: 'Γλώσσα', notifications: 'Ειδοποιήσεις', privacy: 'Απόρρητο', logOut: 'Έξοδος',
    cancel: "Ακύρωση", name: "Όνομα", breed: "Ράτσα", age: "Ηλικία", weight: "Βάρος", save: "Αποθήκευση", editDog: "Επεξεργασία", newDog: "Νέο", deleteDog: "Διαγραφή", years: "ετών", kg: "κιλά", days: "μέρες",
    noPaws: 'Όχι πατούσες!', addFirstPaw: 'Προσθήκη', noPawsDesc: "Πρόσθεσε πατούσα!", packLeader: "Αρχηγός", gotIt: "Εντάξει", cancelWalkConfirm: "Ακύρωση;"
});

const da = createLang({
    nav_home: 'Hjem', nav_dogs: 'Flok', nav_walk: 'Gå', nav_stats: 'Aktivitet', nav_settings: 'Indstillinger',
    hi: 'Hej', ready: 'Klar?', totalDist: 'Total Km', totalWalks: 'Gåture', pack: 'Din Flok', start: 'Start', addDog: 'Tilføj',
    myDogs: 'Min Flok', activity: 'Log', settings: 'Indstillinger', appearance: 'Tema', darkMode: 'Nat', general: 'Generelt', language: 'Sprog', notifications: 'Notifikationer', privacy: 'Privatliv', logOut: 'Log ud',
    cancel: "Annuller", name: "Navn", breed: "Race", age: "Alder", weight: "Vægt", save: "Gem", editDog: "Rediger", newDog: "Ny", deleteDog: "Slet", years: "år", kg: "kg", days: "dage",
    noPaws: 'Ingen poter!', addFirstPaw: 'Tilføj', noPawsDesc: "Tilføj en pote!", packLeader: "Leder", gotIt: "Forstået", cancelWalkConfirm: "Annuller?"
});

const fi = createLang({
    nav_home: 'Koti', nav_dogs: 'Lauma', nav_walk: 'Kävely', nav_stats: 'Aktiivisuus', nav_settings: 'Asetukset',
    hi: 'Hei', ready: 'Valmis?', totalDist: 'Km Yht.', totalWalks: 'Lenkit', pack: 'Laumasi', start: 'Aloita', addDog: 'Lisää',
    myDogs: 'Laumani', activity: 'Loki', settings: 'Asetukset', appearance: 'Teema', darkMode: 'Yö', general: 'Yleiset', language: 'Kieli', notifications: 'Ilmoitukset', privacy: 'Yksityisyys', logOut: 'Kirjaudu ulos',
    cancel: "Peruuta", name: "Nimi", breed: "Rotu", age: "Ikä", weight: "Paino", save: "Tallenna", editDog: "Muokkaa", newDog: "Uusi", deleteDog: "Poista", years: "v", kg: "kg", days: "pv",
    noPaws: 'Ei tassuja!', addFirstPaw: 'Lisää', noPawsDesc: "Lisää tassu!", packLeader: "Johtaja", gotIt: "Selvä", cancelWalkConfirm: "Peruuta?"
});

const no = createLang({
    nav_home: 'Hjem', nav_dogs: 'Flokk', nav_walk: 'Gå', nav_stats: 'Aktivitet', nav_settings: 'Innstillinger',
    hi: 'Hei', ready: 'Klar?', totalDist: 'Total Km', totalWalks: 'Turer', pack: 'Din Flokk', start: 'Start', addDog: 'Legg til',
    myDogs: 'Min Flokk', activity: 'Logg', settings: 'Innstillinger', appearance: 'Tema', darkMode: 'Natt', general: 'Generelt', language: 'Språk', notifications: 'Varsler', privacy: 'Personvern', logOut: 'Logg ut',
    cancel: "Avbryt", name: "Navn", breed: "Rase", age: "Alder", weight: "Vekt", save: "Lagre", editDog: "Rediger", newDog: "Ny", deleteDog: "Slett", years: "år", kg: "kg", days: "dager",
    noPaws: 'Ingen poter!', addFirstPaw: 'Legg til', noPawsDesc: "Legg til en pote!", packLeader: "Leder", gotIt: "Den er grei", cancelWalkConfirm: "Avbryt?"
});

const hr = createLang({
    nav_home: 'Doma', nav_dogs: 'Čopor', nav_walk: 'Šetnja', nav_stats: 'Aktivnost', nav_settings: 'Postavke',
    hi: 'Bok', ready: 'Spreman?', totalDist: 'Ukupno Km', totalWalks: 'Šetnje', pack: 'Tvoj Čopor', start: 'Start', addDog: 'Dodaj',
    myDogs: 'Moj Čopor', activity: 'Dnevnik', settings: 'Postavke', appearance: 'Tema', darkMode: 'Noć', general: 'Općenito', language: 'Jezik', notifications: 'Obavijesti', privacy: 'Privatnost', logOut: 'Odjava',
    cancel: "Odustani", name: "Ime", breed: "Pasmina", age: "Dob", weight: "Težina", save: "Spremi", editDog: "Uredi", newDog: "Novi", deleteDog: "Obriši", years: "god", kg: "kg", days: "dana",
    noPaws: 'Nema šapa!', addFirstPaw: 'Dodaj', noPawsDesc: "Dodaj šapu!", packLeader: "Vođa", gotIt: "Razumijem", cancelWalkConfirm: "Odustati?"
});

const dictionary: Record<LanguageCode, Record<TranslationKey, string>> = {
  en, de, fr, es, it, pt, nl, sv, pl, tr, ru, uk, ro, cs, hu, el, da, fi, no, hr
};

export const t = (lang: LanguageCode, key: TranslationKey): string => {
  return dictionary[lang]?.[key] || dictionary['en'][key as any] || key;
};
