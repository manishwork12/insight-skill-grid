import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Users, 
  TrendingUp, 
  Target, 
  Award, 
  Download,
  Calendar,
  Filter
} from 'lucide-react';

// Mock data
const teamPerformance = [
  { team: 'Frontend', ready: 8, inProgress: 5, notReady: 2 },
  { team: 'Backend', ready: 6, inProgress: 7, notReady: 3 },
  { team: 'DevOps', ready: 4, inProgress: 3, notReady: 1 },
  { team: 'QA', ready: 5, inProgress: 4, notReady: 2 },
];

const skillCoverage = [
  { name: 'JavaScript', value: 30, color: 'hsl(var(--primary))' },
  { name: 'Python', value: 20, color: 'hsl(var(--accent))' },
  { name: 'React', value: 25, color: 'hsl(var(--warning))' },
  { name: 'Node.js', value: 15, color: 'hsl(var(--success))' },
  { name: 'Others', value: 10, color: 'hsl(var(--muted-foreground))' },
];

const monthlyTrends = [
  { month: 'Jan', score: 72, readiness: 45 },
  { month: 'Feb', score: 75, readiness: 52 },
  { month: 'Mar', score: 78, readiness: 58 },
  { month: 'Apr', score: 82, readiness: 65 },
  { month: 'May', score: 85, readiness: 72 },
  { month: 'Jun', score: 87, readiness: 78 },
];

export default function ManagerDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manager Dashboard</h1>
          <p className="text-muted-foreground">Global overview and team analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-bold">124</p>
                <p className="text-xs text-success">+8 this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Target className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Interview Ready</p>
                <p className="text-2xl font-bold">78%</p>
                <p className="text-xs text-success">+12% vs last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Team Score</p>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-xs text-success">+5% improvement</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Award className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Top Performers</p>
                <p className="text-2xl font-bold">18</p>
                <p className="text-xs text-muted-foreground">90%+ scores</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Performance Heatmap */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance Overview</CardTitle>
              <CardDescription>Interview readiness by department</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={teamPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="team" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)'
                    }}
                  />
                  <Bar dataKey="ready" fill="hsl(var(--success))" name="Ready" />
                  <Bar dataKey="inProgress" fill="hsl(var(--warning))" name="In Progress" />
                  <Bar dataKey="notReady" fill="hsl(var(--destructive))" name="Not Ready" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Skill Coverage */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Skill Coverage</CardTitle>
              <CardDescription>Distribution across technologies</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={skillCoverage}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {skillCoverage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-1 gap-2 mt-4">
                {skillCoverage.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <Badge variant="secondary">{item.value}%</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Progress Trends</CardTitle>
            <CardDescription>Average scores and readiness over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)'
                  }}
                />
                <Bar dataKey="score" fill="hsl(var(--primary))" name="Avg Score" />
                <Bar dataKey="readiness" fill="hsl(var(--accent))" name="Readiness %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Readiness Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Interview Readiness Summary</CardTitle>
            <CardDescription>Current status breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Ready for Interview</span>
                  <span className="text-sm text-muted-foreground">78% (97 employees)</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">In Progress</span>
                  <span className="text-sm text-muted-foreground">18% (22 employees)</span>
                </div>
                <Progress value={18} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Needs Improvement</span>
                  <span className="text-sm text-muted-foreground">4% (5 employees)</span>
                </div>
                <Progress value={4} className="h-2" />
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="font-medium mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  View Detailed Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="mr-2 h-4 w-4" />
                  Schedule Team Reviews
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Export Monthly Summary
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}