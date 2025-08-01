import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Skill } from '@/services/api/types';
import { groupSkillsByCategory } from '@/utils/skillHelpers';

export default function SkillsPage() {
  const [skills] = useState<Skill[]>([
    { id: '1', name: 'JavaScript', category: 'Programming', description: 'Modern JavaScript development' },
    { id: '2', name: 'React', category: 'Frontend', description: 'React framework development' },
    { id: '3', name: 'TypeScript', category: 'Programming', description: 'TypeScript for type-safe development' },
    { id: '4', name: 'Node.js', category: 'Backend', description: 'Server-side JavaScript' },
    { id: '5', name: 'Communication', category: 'Soft Skills', description: 'Effective communication skills' },
    { id: '6', name: 'Leadership', category: 'Soft Skills', description: 'Team leadership and management' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const groupedSkills = groupSkillsByCategory(skills);

  const filteredGroups = Object.entries(groupedSkills).reduce((acc, [category, categorySkills]) => {
    const filtered = categorySkills.filter(skill =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Skills Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Skills by Category */}
      <div className="space-y-6">
        {Object.entries(filteredGroups).map(([category, categorySkills]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{category}</span>
                <Badge variant="secondary">{categorySkills.length} skills</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorySkills.map((skill) => (
                  <Card key={skill.id} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{skill.name}</h3>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {skill.description}
                    </p>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {Object.keys(filteredGroups).length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No skills found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}