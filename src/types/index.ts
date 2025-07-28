export type UserRole = 'employee' | 'trainer' | 'manager' | 'super-user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  experience?: number;
  password?: string; // For user creation only
}

export interface Employee extends User {
  role: 'employee';
  skillLevel: string;
  interviewReadiness: 'ready' | 'in-progress' | 'not-ready';
  currentLearningPath?: LearningPath;
  scores: Score[];
  notifications: Notification[];
}

export interface Score {
  id: string;
  employeeId: string;
  skill: string;
  score: number;
  date: string;
  trainerId: string;
  feedback?: string;
}

export interface LearningPath {
  id: string;
  title: string;
  steps: LearningStep[];
  assignedBy: string;
  assignedDate: string;
}

export interface LearningStep {
  id: string;
  title: string;
  description: string;
  skillType: string;
  completed: boolean;
  completedDate?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'feedback' | 'status_change' | 'learning_path' | 'assessment';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface Assessment {
  id: string;
  employeeId: string;
  skill: string;
  score: number;
  date: string;
  trainerId: string;
  feedback?: string;
}