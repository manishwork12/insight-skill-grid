import { USE_MOCK_DATA, API_BASE_URL } from '@/config';
import { User, ApiResponse } from './types';
import { authService } from './authService';

class TrainerService {
  private getAuthHeaders(): Record<string, string> {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async getTrainers(): Promise<User[]> {
    if (USE_MOCK_DATA) {
      return this.getMockTrainers();
    }

    try {
      const response = await fetch(`${API_BASE_URL}/trainers`, {
        headers: this.getAuthHeaders(),
      });
      return response.ok ? await response.json() : [];
    } catch (error) {
      console.error('Get trainers error:', error);
      return [];
    }
  }

  async getTrainer(id: string): Promise<User | null> {
    if (USE_MOCK_DATA) {
      return this.getMockTrainer(id);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/trainers/${id}`, {
        headers: this.getAuthHeaders(),
      });
      return response.ok ? await response.json() : null;
    } catch (error) {
      console.error('Get trainer error:', error);
      return null;
    }
  }

  async createTrainer(trainer: Partial<User> & { password: string }): Promise<User | null> {
    if (USE_MOCK_DATA) {
      return this.mockCreateTrainer(trainer);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/trainers`, {
        method: 'POST',
        headers: { ...this.getAuthHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify(trainer),
      });
      return response.ok ? await response.json() : null;
    } catch (error) {
      console.error('Create trainer error:', error);
      return null;
    }
  }

  async updateTrainer(trainer: User): Promise<User | null> {
    if (USE_MOCK_DATA) {
      return this.mockUpdateTrainer(trainer);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/trainers/${trainer.id}`, {
        method: 'PUT',
        headers: { ...this.getAuthHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify(trainer),
      });
      return response.ok ? await response.json() : null;
    } catch (error) {
      console.error('Update trainer error:', error);
      return null;
    }
  }

  async deleteTrainer(id: string): Promise<boolean> {
    if (USE_MOCK_DATA) {
      return this.mockDeleteTrainer(id);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/trainers/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });
      return response.ok;
    } catch (error) {
      console.error('Delete trainer error:', error);
      return false;
    }
  }

  // Mock implementations
  private getMockTrainers(): User[] {
    return [
      {
        id: '2',
        email: 'sarah.trainer@company.com',
        name: 'Sarah Johnson',
        role: 'trainer',
        department: 'Training',
        experience: 8,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      }
    ];
  }

  private getMockTrainer(id: string): User | null {
    return this.getMockTrainers().find(t => t.id === id) || null;
  }

  private async mockCreateTrainer(trainerData: Partial<User> & { password: string }): Promise<User> {
    return {
      id: Date.now().toString(),
      name: trainerData.name!,
      email: trainerData.email!,
      role: 'trainer',
      department: trainerData.department || '',
      experience: trainerData.experience || 0,
    };
  }

  private async mockUpdateTrainer(trainer: User): Promise<User> {
    return trainer;
  }

  private async mockDeleteTrainer(id: string): Promise<boolean> {
    return true;
  }
}

export const trainerService = new TrainerService();
export default trainerService; 