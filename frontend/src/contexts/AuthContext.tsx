import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/services/api/types';
import { authService } from '@/services/api/authService';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.employee@company.com',
    name: 'John Smith',
    role: 'employee',
    department: 'Engineering',
    experience: 3,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    email: 'sarah.trainer@company.com',
    name: 'Sarah Johnson',
    role: 'trainer',
    department: 'Training',
    experience: 8,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    email: 'mike.manager@company.com',
    name: 'Mike Wilson',
    role: 'manager',
    department: 'Management',
    experience: 12,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '4',
    email: 'admin@company.com',
    name: 'System Administrator',
    role: 'super-user',
    department: 'IT Administration',
    experience: 15,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Use API service for authentication
    try {
      const { success, user, token } = await authService.login(email, password);
      if (success && user) {
        setUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        if (token) {
          localStorage.setItem('authToken', token);
        }
        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}