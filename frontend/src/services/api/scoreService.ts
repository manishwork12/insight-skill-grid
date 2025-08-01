import { USE_MOCK_DATA, API_BASE_URL } from '@/config';
import { Score, ApiResponse } from './types';
import { authService } from './authService';

class ScoreService {
  private getAuthHeaders(): Record<string, string> {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async getScores(): Promise<Score[]> {
    if (USE_MOCK_DATA) {
      return this.getMockScores();
    }

    try {
      const response = await fetch(`${API_BASE_URL}/scores`, {
        headers: this.getAuthHeaders(),
      });
      return response.ok ? await response.json() : [];
    } catch (error) {
      console.error('Get scores error:', error);
      return [];
    }
  }

  async getScoresByEmployee(employeeId: string): Promise<Score[]> {
    if (USE_MOCK_DATA) {
      return this.getMockScoresByEmployee(employeeId);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/scores/employee/${employeeId}`, {
        headers: this.getAuthHeaders(),
      });
      return response.ok ? await response.json() : [];
    } catch (error) {
      console.error('Get employee scores error:', error);
      return [];
    }
  }

  async getScore(id: string): Promise<Score | null> {
    if (USE_MOCK_DATA) {
      return this.getMockScore(id);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/scores/${id}`, {
        headers: this.getAuthHeaders(),
      });
      return response.ok ? await response.json() : null;
    } catch (error) {
      console.error('Get score error:', error);
      return null;
    }
  }

  async createScore(score: Omit<Score, 'id'>): Promise<Score | null> {
    if (USE_MOCK_DATA) {
      return this.mockCreateScore(score);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/scores`, {
        method: 'POST',
        headers: { ...this.getAuthHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify(score),
      });
      return response.ok ? await response.json() : null;
    } catch (error) {
      console.error('Create score error:', error);
      return null;
    }
  }

  async updateScore(id: string, score: Partial<Score>): Promise<Score | null> {
    if (USE_MOCK_DATA) {
      return this.mockUpdateScore(id, score);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/scores/${id}`, {
        method: 'PUT',
        headers: { ...this.getAuthHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify(score),
      });
      return response.ok ? await response.json() : null;
    } catch (error) {
      console.error('Update score error:', error);
      return null;
    }
  }

  async deleteScore(id: string): Promise<boolean> {
    if (USE_MOCK_DATA) {
      return this.mockDeleteScore(id);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/scores/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });
      return response.ok;
    } catch (error) {
      console.error('Delete score error:', error);
      return false;
    }
  }

  async getEmployeeAverageScore(employeeId: string): Promise<number | null> {
    if (USE_MOCK_DATA) {
      return this.getMockAverageScore(employeeId);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/scores/employee/${employeeId}/average`, {
        headers: this.getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        return data.average_score;
      }
      return null;
    } catch (error) {
      console.error('Get average score error:', error);
      return null;
    }
  }

  // Mock implementations
  private getMockScores(): Score[] {
    return [
      {
        id: '1',
        employeeId: '1',
        skill: 'JavaScript',
        score: 85,
        date: '2024-01-15',
        trainerId: '2',
        feedback: 'Good understanding of ES6+ features'
      },
      {
        id: '2',
        employeeId: '1',
        skill: 'React',
        score: 78,
        date: '2024-01-20',
        trainerId: '2',
        feedback: 'Solid component development skills'
      },
    ];
  }

  private getMockScoresByEmployee(employeeId: string): Score[] {
    return this.getMockScores().filter(score => score.employeeId === employeeId);
  }

  private getMockScore(id: string): Score | null {
    return this.getMockScores().find(score => score.id === id) || null;
  }

  private async mockCreateScore(scoreData: Omit<Score, 'id'>): Promise<Score> {
    return {
      id: Date.now().toString(),
      ...scoreData,
    };
  }

  private async mockUpdateScore(id: string, scoreData: Partial<Score>): Promise<Score | null> {
    const existingScore = this.getMockScore(id);
    if (!existingScore) return null;
    
    return {
      ...existingScore,
      ...scoreData,
    };
  }

  private async mockDeleteScore(id: string): Promise<boolean> {
    return true;
  }

  private getMockAverageScore(employeeId: string): number {
    const scores = this.getMockScoresByEmployee(employeeId);
    if (scores.length === 0) return 0;
    
    const total = scores.reduce((sum, score) => sum + score.score, 0);
    return total / scores.length;
  }
}

export const scoreService = new ScoreService();
export default scoreService; 