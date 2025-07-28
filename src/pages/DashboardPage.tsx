import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Target, TrendingUp, Award } from 'lucide-react';
import { ScoreChart } from '@/components/charts/ScoreChart';
import { SkillRadarChart } from '@/components/charts/SkillRadarChart';

export default function DashboardPage() {
  const stats = [
    {
      title: 'Total Employees',
      value: '156',
      icon: Users,
      trend: '+12%',
      color: 'text-blue-600'
    },
    {
      title: 'Skills Tracked',
      value: '24',
      icon: Target,
      trend: '+3',
      color: 'text-green-600'
    },
    {
      title: 'Avg Score',
      value: '78.5',
      icon: TrendingUp,
      trend: '+5.2%',
      color: 'text-purple-600'
    },
    {
      title: 'Certifications',
      value: '89',
      icon: Award,
      trend: '+18',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <Badge variant="outline">Live Data</Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.trend}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ScoreChart data={[]} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skill Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <SkillRadarChart data={[]} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { user: 'John Smith', action: 'completed JavaScript assessment', time: '2 hours ago' },
              { user: 'Sarah Johnson', action: 'added new skill: TypeScript', time: '4 hours ago' },
              { user: 'Mike Wilson', action: 'updated training schedule', time: '1 day ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">{activity.user}</p>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}