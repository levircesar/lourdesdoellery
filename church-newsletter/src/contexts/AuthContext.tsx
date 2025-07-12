import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { User } from '../types';
import apiService from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  hasPermission: (permission: string) => boolean;
  isAdmin: boolean;
  isEditor: boolean;
  isCommon: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('church_user');
    const savedToken = localStorage.getItem('church_token');
    return savedUser && savedToken ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  // Função para verificar permissões
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    const permissions = {
      admin: ['all'],
      editor: ['news', 'announcements', 'mass-schedule', 'parish-info', 'dizimistas', 'birthdays'],
      common: ['birthdays']
    };
    
    return permissions[user.role]?.includes('all') || permissions[user.role]?.includes(permission);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await apiService.login(email, password);
      if (response.success && response.data) {
        const userData = response.data.user;
        const token = response.data.token;
        
        setUser(userData);
        localStorage.setItem('church_user', JSON.stringify(userData));
        localStorage.setItem('church_token', token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('church_user');
    localStorage.removeItem('church_token');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
    hasPermission,
    isAdmin: user?.role === 'admin',
    isEditor: user?.role === 'editor',
    isCommon: user?.role === 'common',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 