// AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import type { User } from "firebase/auth";
import {
  observeAuth,
  signInWithEmail,
  signUp,
  logOut,
  signInWithGoogle as googleLogin,
  signInWithGithub as githubLogin,   // 👈 import GitHub login
} from "./authService";

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  signInUser: (email: string, password: string) => Promise<User>;
  signUpUser: (email: string, password: string) => Promise<User>;
  signOutUser: () => Promise<void>;
  signInWithGoogle: () => Promise<User>;
  signInWithGithub: () => Promise<User>;   // 👈 add here
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = observeAuth((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signInUser = (email: string, password: string) => signInWithEmail(email, password);
  const signUpUser = (email: string, password: string) => signUp(email, password);
  const signOutUser = () => logOut();
  const signInWithGoogle = () => googleLogin();
  const signInWithGithub = () => githubLogin();   // 👈 define function

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInUser,
        signUpUser,
        signOutUser,
        signInWithGoogle,
        signInWithGithub,   // 👈 provide it to context
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
