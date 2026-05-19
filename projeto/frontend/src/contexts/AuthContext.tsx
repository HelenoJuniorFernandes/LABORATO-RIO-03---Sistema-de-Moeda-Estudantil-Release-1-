import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { authService } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface UserData {
  id: number;
  sub: string;
  role: string;
  exp: number;
  iss: string;
}

interface AuthContextData {
  user: UserData | null;
  signed: boolean;
  loading: boolean;
  login: (credenciais: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storagedToken = localStorage.getItem('token');

    if (storagedToken) {
      try {
        const decoded = jwtDecode<UserData>(storagedToken);
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser(decoded);
        }
      } catch (err) {
        logout();
      }
    }
    setLoading(false);
  }, []);

  async function login(credenciais: any) {
    const response = await authService.login(credenciais);
    const token = response.token;

    localStorage.setItem('token', token);
    const decoded = jwtDecode<UserData>(token);
    setUser(decoded);
    navigate('/');
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
