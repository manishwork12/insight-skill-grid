import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skill, Score } from '@/services/api/types';
import { getSkillLevel, getSkillLevelColor, getLatestScoreForSkill } from '@/utils/skillHelpers';

interface SkillCardProps {
  skill: Skill;
  scores?: Score[];
  showProgress?: boolean;
  className?: string;
}

export function SkillCard({ skill, scores = [], showProgress = true, className }: SkillCardProps) {
  const latestScore = getLatestScoreForSkill(scores, skill.name);
  const score = latestScore?.score || 0;
  const level = getSkillLevel(score);
  const levelColor = getSkillLevelColor(level);

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{skill.name}</CardTitle>
          <Badge variant="outline" className={levelColor}>
            {level}
          </Badge>
        </div>
        {skill.description && (
          <p className="text-sm text-muted-foreground">{skill.description}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Category</span>
            <Badge variant="secondary">{skill.category}</Badge>
          </div>
          
          {showProgress && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Score</span>
                <span className="text-sm font-medium">{score}%</span>
              </div>
              <Progress value={score} className="h-2" />
            </div>
          )}

          {latestScore && (
            <div className="text-xs text-muted-foreground">
              Last assessed: {new Date(latestScore.date).toLocaleDateString()}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}