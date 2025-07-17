// app/context/AuthContext.tsx
'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type User = { email: string };
type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ email: string; pseudo: string; password: string } | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

//   const login = (user: User) => {
//     setUser(user);
//     localStorage.setItem('currentUser', JSON.stringify(user));
//   };
    const login = ({ email, pseudo, password }: { email: string; pseudo: string; password: string }) => {
    setUser({ email, pseudo, password });
    };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
