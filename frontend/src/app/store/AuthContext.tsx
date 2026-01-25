import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types/User';

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (data: { token: string; user: User }) => void;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    const storageUser = localStorage.getItem('@planner:user');
    const storageToken = localStorage.getItem('@planner:token');

    if (storageUser && storageToken) {
      setUser(JSON.parse(storageUser));
    }

    setLoading(false);
  }, []);

  function signIn({ token, user }: { token: string; user: User }) {
    setUser(user);

    localStorage.setItem('@planner:token', token);
    localStorage.setItem('@planner:user', JSON.stringify(user));
  }

  function logOut() {
    localStorage.removeItem('@planner:token');
    localStorage.removeItem('@planner:user');

    setUser(null);
  }

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
