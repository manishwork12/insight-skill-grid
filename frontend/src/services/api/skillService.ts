import { USE_MOCK_DATA, API_BASE_URL } from '@/config';
import { Skill, Score, ApiResponse } from './types';
import { authService } from './authService';

class SkillService {
  private getAuthHeaders(): Record<string, string> {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async getSkills(): Promise<Skill[]> {
    if (USE_MOCK_DATA) {
      return this.getMockSkills();
    }

    try {
      const response = await fetch(`${API_BASE_URL}/skills`, {
        headers: this.getAuthHeaders(),
      });
      return response.ok ? await response.json() : [];
    } catch (error) {
      console.error('Get skills error:', error);
      return [];
    }
  }

  async createSkill(skill: Omit<Skill, 'id'>): Promise<Skill | null> {
    if (USE_MOCK_DATA) {
      return this.mockCreateSkill(skill);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/skills`, {
        method: 'POST',
        headers: { ...this.getAuthHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify(skill),
      });
      return response.ok ? await response.json() : null;
    } catch (error) {
      console.error('Create skill error:', error);
      return null;
    }
  }

  async updateSkill(skill: Skill): Promise<Skill | null> {
    if (USE_MOCK_DATA) {
      return this.mockUpdateSkill(skill);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/skills/${skill.id}`, {
        method: 'PUT',
        headers: { ...this.getAuthHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify(skill),
      });
      return response.ok ? await response.json() : null;
    } catch (error) {
      console.error('Update skill error:', error);
      return null;
    }
  }

  async deleteSkill(id: string): Promise<boolean> {
    if (USE_MOCK_DATA) {
      return this.mockDeleteSkill(id);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/skills/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });
      return response.ok;
    } catch (error) {
      console.error('Delete skill error:', error);
      return false;
    }
  }



  // Mock implementations
  private getMockSkills(): Skill[] {
    return [
      { id: '1', name: 'JavaScript', category: 'Programming', description: 'Modern JavaScript development' },
      { id: '2', name: 'React', category: 'Frontend', description: 'React framework development' },
      { id: '3', name: 'TypeScript', category: 'Programming', description: 'TypeScript for type-safe development' },
      { id: '4', name: 'Node.js', category: 'Backend', description: 'Server-side JavaScript' },
      { id: '5', name: 'Communication', category: 'Soft Skills', description: 'Effective communication skills' },
      { id: '6', name: 'Leadership', category: 'Soft Skills', description: 'Team leadership and management' },
    ];
  }



  private async mockCreateSkill(skillData: Omit<Skill, 'id'>): Promise<Skill> {
    return {
      id: Date.now().toString(),
      ...skillData,
    };
  }

  private async mockUpdateSkill(skill: Skill): Promise<Skill> {
    return skill;
  }

  private async mockDeleteSkill(id: string): Promise<boolean> {
    return true;
  }


}

export const skillService = new SkillService();
export default skillService;