// authService.ts
import { auth } from "./firebase.config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import type { User } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

// -------------------- Google login --------------------
export const signInWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user; // Firebase User object
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

// -------------------- Email/password signup --------------------
export const signUp = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Sign-Up Error:", error);
    throw error;
  }
};

// -------------------- Email/password login --------------------
export const signInWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Email/Password Sign-In Error:", error);
    throw error;
  }
};


// -------------------- Sign out --------------------
export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error:", error);
    throw error;
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent to:", email);
  } catch (error: any) {
    console.error("Reset password error:", error);
    throw error;
  }
};




// -------------------- Auth state observer --------------------
export const observeAuth = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback);
