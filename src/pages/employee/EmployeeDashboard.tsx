import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StatusBadge } from '@/components/ui/status-badge';
import { ScoreChart } from '@/components/charts/ScoreChart';
import { SkillRadarChart } from '@/components/charts/SkillRadarChart';
import { useAuth } from '@/contexts/AuthContext';
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  BookOpen, 
  Award,
  Edit3,
  Bell
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Mock data
const scoreData = [
  { date: '2024-01-01', score: 65 },
  { date: '2024-01-07', score: 72 },
  { date: '2024-01-14', score: 78 },
  { date: '2024-01-21', score: 82 },
  { date: '2024-01-28', score: 85 },
];

const skillData = [
  { skill: 'JavaScript', score: 85, fullMark: 100 },
  { skill: 'React', score: 78, fullMark: 100 },
  { skill: 'Node.js', score: 72, fullMark: 100 },
  { skill: 'TypeScript', score: 68, fullMark: 100 },
  { skill: 'CSS', score: 82, fullMark: 100 },
  { skill: 'Testing', score: 65, fullMark: 100 },
];

const pieData = [
  { name: 'Frontend', value: 40, color: 'hsl(var(--primary))' },
  { name: 'Backend', value: 35, color: 'hsl(var(--accent))' },
  { name: 'Testing', value: 15, color: 'hsl(var(--warning))' },
  { name: 'DevOps', value: 10, color: 'hsl(var(--muted-foreground))' },
];

const learningSteps = [
  { id: 1, title: 'Advanced React Patterns', completed: true },
  { id: 2, title: 'State Management with Redux', completed: true },
  { id: 3, title: 'Testing with Jest & RTL', completed: false },
  { id: 4, title: 'Performance Optimization', completed: false },
  { id: 5, title: 'Next.js Fundamentals', completed: false },
];

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(2);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">Track your progress and continue learning</p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status="in-progress" />
          <Button variant="outline" size="sm">
            <Edit3 className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Score</p>
                <p className="text-2xl font-bold">85%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Target className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Skills Mastered</p>
                <p className="text-2xl font-bold">12/18</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Calendar className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Days Active</p>
                <p className="text-2xl font-bold">28</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Award className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rank</p>
                <p className="text-2xl font-bold">#3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                Personal Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="font-medium">{user?.department}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="font-medium">{user?.experience} years</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Skill Level</p>
                  <Badge variant="secondary">Intermediate</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Score Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Score Trends</CardTitle>
              <CardDescription>Your performance over the last month</CardDescription>
            </CardHeader>
            <CardContent>
              <ScoreChart data={scoreData} />
            </CardContent>
          </Card>

          {/* Skill Radar */}
          <Card>
            <CardHeader>
              <CardTitle>Skill Assessment</CardTitle>
              <CardDescription>Your current skill levels across different areas</CardDescription>
            </CardHeader>
            <CardContent>
              <SkillRadarChart data={skillData} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Interview Readiness */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Interview Readiness
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 bg-warning/5 rounded-lg border border-warning/20">
                <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-warning" />
                </div>
                <StatusBadge status="in-progress" className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  You're making great progress! Complete 2 more modules to be interview-ready.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Skill Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Skill Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Learning Path */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Current Learning Path
              </CardTitle>
              <CardDescription>Advanced React Development</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>40%</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  {learningSteps.map((step, index) => (
                    <div key={step.id} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        step.completed 
                          ? 'bg-success text-success-foreground' 
                          : index === currentStep 
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                      }`}>
                        {step.completed ? '✓' : index + 1}
                      </div>
                      <span className={`text-sm ${
                        step.completed ? 'line-through text-muted-foreground' : ''
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}