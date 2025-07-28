import config from '@/config/environment';
import { User, UserRole } from '@/types';

// API Service for backend integration
class ApiService {
  private baseUrl: string;
  private mockMode: boolean;

  constructor() {
    this.baseUrl = config.API_BASE_URL;
    this.mockMode = config.MOCK_MODE;
  }

  // Authentication
  async login(email: string, password: string): Promise<{ success: boolean; user?: User; token?: string }> {
    if (this.mockMode) {
      return this.mockLogin(email, password);
    }

    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
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

  // User Management
  async getUsers(): Promise<User[]> {
    if (this.mockMode) {
      return this.getMockUsers();
    }

    try {
      const response = await fetch(`${this.baseUrl}/users`, {
        headers: this.getAuthHeaders(),
      });
      return response.ok ? await response.json() : [];
    } catch (error) {
      console.error('Get users error:', error);
      return [];
    }
  }

  async createUser(user: Partial<User> & { password: string }): Promise<User | null> {
    if (this.mockMode) {
      return this.mockCreateUser(user);
    }

    try {
      const response = await fetch(`${this.baseUrl}/users`, {
        method: 'POST',
        headers: { ...this.getAuthHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      return response.ok ? await response.json() : null;
    } catch (error) {
      console.error('Create user error:', error);
      return null;
    }
  }

  async updateUser(user: User): Promise<User | null> {
    if (this.mockMode) {
      return this.mockUpdateUser(user);
    }

    try {
      const response = await fetch(`${this.baseUrl}/users/${user.id}`, {
        method: 'PUT',
        headers: { ...this.getAuthHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      return response.ok ? await response.json() : null;
    } catch (error) {
      console.error('Update user error:', error);
      return null;
    }
  }

  async deleteUser(userId: string): Promise<boolean> {
    if (this.mockMode) {
      return this.mockDeleteUser(userId);
    }

    try {
      const response = await fetch(`${this.baseUrl}/users/${userId}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });
      return response.ok;
    } catch (error) {
      console.error('Delete user error:', error);
      return false;
    }
  }

  // Private helper methods
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('authToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Mock implementations
  private async mockLogin(email: string, password: string): Promise<{ success: boolean; user?: User; token?: string }> {
    const mockUsers = this.getMockUsers();
    const user = mockUsers.find(u => u.email === email);
    
    if (user && password === 'password123') {
      return { success: true, user, token: 'mock-jwt-token' };
    }
    return { success: false };
  }

  private getMockUsers(): User[] {
    return [
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
  }

  private async mockCreateUser(userData: Partial<User> & { password: string }): Promise<User> {
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name!,
      email: userData.email!,
      role: userData.role as UserRole,
      department: userData.department || '',
      experience: userData.experience || 0,
    };
    return newUser;
  }

  private async mockUpdateUser(user: User): Promise<User> {
    return user;
  }

  private async mockDeleteUser(userId: string): Promise<boolean> {
    return true;
  }
}

export const apiService = new ApiService();
export default apiService;