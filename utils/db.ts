
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  updateProfile, 
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  setDoc, 
  updateDoc, 
  deleteDoc 
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { User, Dog, WalkLog } from '../types';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv5vuDCVp9b3o2TJ0wKOc8_8Bkt6DLaqI",
  authDomain: "pawgo-2ecb8.firebaseapp.com",
  projectId: "pawgo-2ecb8",
  storageBucket: "pawgo-2ecb8.firebasestorage.app",
  messagingSenderId: "738697649747",
  appId: "1:738697649747:web:42b2e784f0d16ac22530a6",
  measurementId: "G-3MZ33PES4B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dbFirestore = getFirestore(app);
const analytics = getAnalytics(app);

// Helper to map Firebase User to App User
const mapUser = (fbUser: FirebaseUser): User => ({
  id: fbUser.uid,
  name: fbUser.displayName || 'Friend',
  email: fbUser.email || '',
  avatar: fbUser.photoURL || `https://api.dicebear.com/7.x/big-smile/svg?seed=${fbUser.uid}`,
  isOwner: true
});

// Helper to ensure authentication before DB operations
const requireAuth = () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User must be authenticated to perform this action.");
  return user;
};

export const db = {
  // --- AUTH ---

  login: async (email: string, password: string): Promise<{ user: User | null, error?: string, requiresVerification?: boolean }> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Force reload user to get latest emailVerified status
      await userCredential.user.reload();

      // Check if email is verified
      if (!userCredential.user.emailVerified) {
        await signOut(auth); // Block access immediately
        return { user: null, error: 'EMAIL_NOT_VERIFIED', requiresVerification: true };
      }

      return { user: mapUser(userCredential.user) };
    } catch (error: any) {
      // Don't log expected auth errors to console
      if (
        error.code === 'auth/invalid-credential' || 
        error.code === 'auth/user-not-found' || 
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/invalid-email'
      ) {
        return { user: null, error: "Email or password is incorrect" };
      }
      
      if (error.code === 'auth/too-many-requests') {
        return { user: null, error: "Too many attempts. Please try again later." };
      }

      console.error("Login error code:", error.code);
      return { user: null, error: error.message };
    }
  },

  loginWithGoogle: async (): Promise<{ user: User | null, error?: string }> => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return { user: mapUser(result.user) };
    } catch (error: any) {
      console.error("Google Login Error:", error.code, error.message);
      return { user: null, error: error.message };
    }
  },

  register: async (name: string, email: string, password: string): Promise<{ user: User | null, error?: string, requiresVerification?: boolean }> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with name
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name
        });

        // Send verification email
        // Adding a small delay to ensure the auth state is fully propagated and network request clears
        await new Promise(resolve => setTimeout(resolve, 1000));
        await sendEmailVerification(userCredential.user);
      }

      // Sign out immediately so they can't access the app until verified
      await signOut(auth);

      // Return specific flag indicating verification is needed, user is null because they aren't logged in
      return { user: null, requiresVerification: true };
    } catch (error: any) {
      // Gracefully handle existing user error
      if (error.code === 'auth/email-already-in-use') {
        console.warn("Registration attempt with existing email.");
        return { user: null, error: "Email already in use. Please log in." };
      }
      
      console.error("Register error code:", error.code, error.message);
      return { user: null, error: error.message };
    }
  },

  resendVerification: async (email: string, password: string): Promise<{ success: boolean, error?: string }> => {
    try {
      // We must sign in to send the verification email
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        await sendEmailVerification(userCredential.user);
        await signOut(auth);
        return { success: true };
      } else {
        // User is already verified, sign them out
        await signOut(auth);
        return { success: false, error: "Email is already verified. Please log in." };
      }
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  resetPassword: async (email: string): Promise<{ success: boolean, error?: string }> => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error: any) {
      console.error("Reset password error:", error.code, error.message);
      let errorMessage = error.message;
      if (error.code === 'auth/user-not-found') errorMessage = "No user found with this email.";
      if (error.code === 'auth/invalid-email') errorMessage = "Invalid email address.";
      return { success: false, error: errorMessage };
    }
  },

  logout: async () => {
    await signOut(auth);
  },

  getCurrentUser: async (): Promise<User | null> => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        if (user && user.emailVerified) {
          resolve(mapUser(user));
        } else {
          // If user exists but not verified (edge case if they didn't get signed out properly), treat as logged out
          if (user && !user.emailVerified) {
            signOut(auth);
          }
          resolve(null);
        }
      });
    });
  },

  updateUser: async (user: User): Promise<void> => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        await updateProfile(currentUser, {
          displayName: user.name,
          photoURL: user.avatar
        });
      } catch (e) {
        console.error("Failed to update firebase profile", e);
      }
    }
  },

  // --- DOGS (Firestore Persistence) ---

  getDogs: async (userId: string): Promise<Dog[]> => {
    try {
      const dogsRef = collection(dbFirestore, "users", userId, "dogs");
      const snapshot = await getDocs(dogsRef);
      return snapshot.docs.map(doc => doc.data() as Dog);
    } catch (error) {
      console.error("Error fetching dogs:", error);
      return [];
    }
  },

  addDog: async (dog: Dog): Promise<void> => {
    const user = requireAuth();
    const dogWithOwner = { ...dog, ownerId: user.uid };
    await setDoc(doc(dbFirestore, "users", user.uid, "dogs", dog.id), dogWithOwner);
  },

  updateDog: async (dog: Dog): Promise<void> => {
    const user = requireAuth();
    await updateDoc(doc(dbFirestore, "users", user.uid, "dogs", dog.id), { ...dog });
  },

  deleteDog: async (dogId: string): Promise<void> => {
    const user = requireAuth();
    await deleteDoc(doc(dbFirestore, "users", user.uid, "dogs", dogId));
  },

  // --- WALKS (Firestore Persistence) ---

  getWalks: async (userId: string): Promise<WalkLog[]> => {
    try {
      const walksRef = collection(dbFirestore, "users", userId, "walks");
      const snapshot = await getDocs(walksRef);
      const walks = snapshot.docs.map(doc => doc.data() as WalkLog);
      return walks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
      console.error("Error fetching walks:", error);
      return [];
    }
  },

  addWalk: async (walk: WalkLog): Promise<void> => {
    const user = requireAuth();
    const walkWithWalker = { ...walk, walkerId: user.uid };
    await setDoc(doc(dbFirestore, "users", user.uid, "walks", walk.id), walkWithWalker);
  },

  updateWalk: async (walk: WalkLog): Promise<void> => {
    const user = requireAuth();
    await updateDoc(doc(dbFirestore, "users", user.uid, "walks", walk.id), { ...walk });
  },

  deleteWalk: async (walkId: string): Promise<void> => {
    const user = requireAuth();
    await deleteDoc(doc(dbFirestore, "users", user.uid, "walks", walkId));
  },

  // --- SETTINGS (Firestore Persistence) ---

  getUserSettings: async (userId: string) => {
    try {
      const docRef = doc(dbFirestore, "users", userId, "settings", "preferences");
      const snap = await getDoc(docRef);
      if (snap.exists()) return snap.data();
      return null;
    } catch (e) {
      console.error("Error fetching settings", e);
      return null;
    }
  },
  
  saveUserSettings: async (userId: string, settings: any) => {
    try {
      await setDoc(doc(dbFirestore, "users", userId, "settings", "preferences"), settings, { merge: true });
    } catch (e) {
      console.error("Error saving settings", e);
    }
  }
};
