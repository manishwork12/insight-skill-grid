import { Score, Skill } from '@/services/api/types';

export function calculateAverageScore(scores: Score[]): number {
  if (scores.length === 0) return 0;
  const total = scores.reduce((sum, score) => sum + score.score, 0);
  return Math.round(total / scores.length);
}

export function getSkillLevel(score: number): string {
  if (score >= 90) return 'Expert';
  if (score >= 75) return 'Advanced';
  if (score >= 60) return 'Intermediate';
  if (score >= 40) return 'Beginner';
  return 'Novice';
}

export function getSkillLevelColor(level: string): string {
  switch (level.toLowerCase()) {
    case 'expert': return 'text-green-600';
    case 'advanced': return 'text-blue-600';
    case 'intermediate': return 'text-yellow-600';
    case 'beginner': return 'text-orange-600';
    case 'novice': return 'text-red-600';
    default: return 'text-gray-600';
  }
}

export function groupSkillsByCategory(skills: Skill[]): Record<string, Skill[]> {
  return skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);
}

export function getLatestScoreForSkill(scores: Score[], skillName: string): Score | undefined {
  return scores
    .filter(score => score.skill === skillName)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
}

export function getInterviewReadinessStatus(averageScore: number): 'ready' | 'in-progress' | 'not-ready' {
  if (averageScore >= 80) return 'ready';
  if (averageScore >= 60) return 'in-progress';
  return 'not-ready';
}

export function formatScoreDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}