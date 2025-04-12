// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  id: number;
  sub: string;
  exp: number;
  role: 'super_admin' | 'artist_manager' | 'artist';
}

interface AuthContextType {
  token: string | null;
  role: 'super_admin' | 'artist_manager' | 'artist' | null;
  user: JwtPayload | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthLoaded: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);
  const [role, setRole] = useState<'super_admin' | 'artist_manager' | 'artist' | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode<JwtPayload>(storedToken);
        setToken(storedToken);
        setUser(decoded);
        setRole((decoded.role) as AuthContextType['role']);
      } catch (error) {
        console.log('Invalid token');
        console.log(error);
        localStorage.removeItem('token');
      }
    }
    setIsAuthLoaded(true);
  }, []);

  const login = (token: string) => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      localStorage.setItem('token', token);
      setToken(token);
      setUser(decoded);
      setRole((decoded.role) as AuthContextType['role']);
    } catch (error) {
      console.log('Invalid login token');
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, user, login, logout, isAuthLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
