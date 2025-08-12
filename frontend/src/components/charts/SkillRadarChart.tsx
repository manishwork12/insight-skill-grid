import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface SkillRadarChartProps {
  data: Array<{
    skill: string;
    score: number;
    fullMark: number;
  }>;
  color?: string;
}

export function SkillRadarChart({ data, color = "hsl(var(--primary))" }: SkillRadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={data}>
        <PolarGrid stroke="hsl(var(--border))" />
        <PolarAngleAxis 
          dataKey="skill" 
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 100]}
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
        />
        <Radar
          name="Score"
          dataKey="score"
          stroke={color}
          fill={color}
          fillOpacity={0.1}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}