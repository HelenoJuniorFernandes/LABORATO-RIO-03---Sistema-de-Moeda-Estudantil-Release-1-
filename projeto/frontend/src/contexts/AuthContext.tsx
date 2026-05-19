import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { authService } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface UserData {
  id: number;
  nome: string;
  email: string;
  role: string;
  saldoMoedas?: number;
}

interface AuthContextData {
  user: UserData | null;
  signed: boolean;
  loading: boolean;
  login: (credenciais: any) => Promise<void>;
  logout: () => void;
  updateBalance: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function loadUser() {
    try {
      const userData = await authService.me();
      setUser({
        id: userData.id,
        nome: userData.nome,
        email: userData.email,
        role: userData.authorities[0]?.authority || 'ROLE_USER',
        saldoMoedas: userData.saldoMoedas
      });
    } catch (err) {
      logout();
    }
  }

  useEffect(() => {
    const storagedToken = localStorage.getItem('token');

    if (storagedToken) {
      const decoded = jwtDecode<any>(storagedToken);
      if (decoded.exp * 1000 < Date.now()) {
        logout();
      } else {
        loadUser();
      }
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  async function login(credenciais: any) {
    const response = await authService.login(credenciais);
    const token = response.token;

    localStorage.setItem('token', token);
    await loadUser();
    navigate('/');
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  }

  async function updateBalance() {
    if (user) {
      await loadUser();
    }
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, login, logout, updateBalance }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
