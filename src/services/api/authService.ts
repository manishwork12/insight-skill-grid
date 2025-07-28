import { USE_MOCK_DATA, API_BASE_URL } from '@/config';
import { User, LoginResponse } from './types';

class AuthService {
  private mockUsers: User[] = [
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

  async login(email: string, password: string): Promise<LoginResponse> {
    if (USE_MOCK_DATA) {
      return this.mockLogin(email, password);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, user: data.user, token: data.token };
      }
      return { success: false };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false };
    }
  }

  async logout(): Promise<void> {
    if (!USE_MOCK_DATA) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: this.getAuthHeaders(),
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async mockLogin(email: string, password: string): Promise<LoginResponse> {
    const user = this.mockUsers.find(u => u.email === email);
    
    if (user && password === 'password123') {
      return { success: true, user, token: 'mock-jwt-token' };
    }
    return { success: false };
  }
}

export const authService = new AuthService();
export default authService;