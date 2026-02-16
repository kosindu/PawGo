import { User, Dog, WalkLog } from '../types';
import { INITIAL_DOGS } from '../constants';

// Keys for LocalStorage
const KEYS = {
  USERS: 'pawgo_users',
  DOGS: 'pawgo_dogs',
  WALKS: 'pawgo_walks',
  SESSION: 'pawgo_session_user_id'
};

// Helper to simulate network delay for realism
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const db = {
  // --- AUTH ---

  getSessionId: (): string | null => {
    return localStorage.getItem(KEYS.SESSION);
  },

  login: async (email: string, password: string): Promise<{ user: User | null, error?: string }> => {
    await delay(600); // Fake network request
    const users = JSON.parse(localStorage.getItem(KEYS.USERS) || '[]');
    const user = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    
    if (user) {
      localStorage.setItem(KEYS.SESSION, user.id);
      // Return user without password
      const { password, ...safeUser } = user;
      return { user: safeUser };
    }
    return { user: null, error: 'Invalid email or password' };
  },

  register: async (name: string, email: string, password: string): Promise<{ user: User | null, error?: string }> => {
    await delay(800);
    const users = JSON.parse(localStorage.getItem(KEYS.USERS) || '[]');
    
    if (users.find((u: any) => u.email.toLowerCase() === email.toLowerCase())) {
      return { user: null, error: 'Email already exists' };
    }

    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      password, // In a real app, hash this!
      avatar: `https://api.dicebear.com/7.x/big-smile/svg?seed=${name}`,
      isOwner: true
    };

    users.push(newUser);
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    localStorage.setItem(KEYS.SESSION, newUser.id);

    const { password: _, ...safeUser } = newUser;
    return { user: safeUser };
  },

  logout: async () => {
    await delay(300);
    localStorage.removeItem(KEYS.SESSION);
  },

  getCurrentUser: async (): Promise<User | null> => {
    const id = localStorage.getItem(KEYS.SESSION);
    if (!id) return null;
    
    const users = JSON.parse(localStorage.getItem(KEYS.USERS) || '[]');
    const user = users.find((u: any) => u.id === id);
    
    if (user) {
      const { password, ...safeUser } = user;
      return safeUser;
    }
    return null;
  },

  updateUser: async (user: User): Promise<void> => {
    const users = JSON.parse(localStorage.getItem(KEYS.USERS) || '[]');
    const index = users.findIndex((u: any) => u.id === user.id);
    if (index !== -1) {
      // Preserve password when updating profile
      users[index] = { ...users[index], ...user };
      localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    }
  },

  // --- DOGS ---

  getDogs: async (userId: string): Promise<Dog[]> => {
    const allDogs = JSON.parse(localStorage.getItem(KEYS.DOGS) || '[]');
    const userDogs = allDogs.filter((d: Dog) => d.ownerId === userId);
    
    // Seed initial dogs if new user has none (for demo purposes)
    if (userDogs.length === 0 && userId) {
        // Only seed if this is the very first time for this user? 
        // Actually, let's start fresh for new users to let them "Add" dogs.
        return [];
    }
    return userDogs;
  },

  addDog: async (dog: Dog): Promise<void> => {
    const allDogs = JSON.parse(localStorage.getItem(KEYS.DOGS) || '[]');
    allDogs.push(dog);
    localStorage.setItem(KEYS.DOGS, JSON.stringify(allDogs));
  },

  updateDog: async (dog: Dog): Promise<void> => {
    const allDogs = JSON.parse(localStorage.getItem(KEYS.DOGS) || '[]');
    const index = allDogs.findIndex((d: Dog) => d.id === dog.id);
    if (index !== -1) {
      allDogs[index] = dog;
      localStorage.setItem(KEYS.DOGS, JSON.stringify(allDogs));
    }
  },

  deleteDog: async (dogId: string): Promise<void> => {
    const allDogs = JSON.parse(localStorage.getItem(KEYS.DOGS) || '[]');
    const filtered = allDogs.filter((d: Dog) => d.id !== dogId);
    localStorage.setItem(KEYS.DOGS, JSON.stringify(filtered));
  },

  // --- WALKS ---

  getWalks: async (userId: string): Promise<WalkLog[]> => {
    const allWalks = JSON.parse(localStorage.getItem(KEYS.WALKS) || '[]');
    // Filter walks where walkerId matches OR where one of the user's dogs was walked
    // For simplicity, we just check walkerId for now.
    return allWalks.filter((w: WalkLog) => w.walkerId === userId).sort((a: WalkLog, b: WalkLog) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  addWalk: async (walk: WalkLog): Promise<void> => {
    const allWalks = JSON.parse(localStorage.getItem(KEYS.WALKS) || '[]');
    allWalks.push(walk);
    localStorage.setItem(KEYS.WALKS, JSON.stringify(allWalks));
  },

  updateWalk: async (walk: WalkLog): Promise<void> => {
    const allWalks = JSON.parse(localStorage.getItem(KEYS.WALKS) || '[]');
    const index = allWalks.findIndex((w: WalkLog) => w.id === walk.id);
    if (index !== -1) {
      allWalks[index] = walk;
      localStorage.setItem(KEYS.WALKS, JSON.stringify(allWalks));
    }
  },

  deleteWalk: async (walkId: string): Promise<void> => {
    const allWalks = JSON.parse(localStorage.getItem(KEYS.WALKS) || '[]');
    const filtered = allWalks.filter((w: WalkLog) => w.id !== walkId);
    localStorage.setItem(KEYS.WALKS, JSON.stringify(filtered));
  }
};
