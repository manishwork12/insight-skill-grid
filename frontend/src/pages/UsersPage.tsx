import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { UserFilters } from '@/components/filters/UserFilters';
import { useEmployees } from '@/hooks/useEmployees';
import { getUserInitials } from '@/utils/auth';
import { User, UserRole } from '@/services/api/types';
import { Plus, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { FilterState } from '@/components/filters/UserFilters';

export default function UsersPage() {
  const { employees, loading, createEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    role: 'all',
    department: '',
    experienceMin: 0,
    experienceMax: 50,
    sortBy: 'name',
    sortOrder: 'asc',
  });

  const departments = [...new Set(employees.map(emp => emp.department).filter(Boolean))];

  const filteredAndSortedEmployees = employees
    .filter(employee => {
      const matchesSearch = !filters.search || 
        employee.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        employee.email.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesRole = filters.role === 'all' || filters.role === '' || employee.role === filters.role;
      
      const matchesDepartment = !filters.department || employee.department === filters.department;
      
      const matchesExperience = (employee.experience || 0) >= filters.experienceMin && 
        (employee.experience || 0) <= filters.experienceMax;

      return matchesSearch && matchesRole && matchesDepartment && matchesExperience;
    })
    .sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (filters.sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'email':
          aValue = a.email;
          bValue = b.email;
          break;
        case 'experience':
          aValue = a.experience || 0;
          bValue = b.experience || 0;
          break;
        case 'department':
          aValue = a.department || '';
          bValue = b.department || '';
          break;
        default:
          return 0;
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Filters */}
      <UserFilters
        filters={filters}
        onFiltersChange={setFilters}
        departments={departments}
      />

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedEmployees.map((user) => (
          <Card key={user.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {getUserInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Role</span>
                  <Badge variant="outline">
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                </div>
                {user.department && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Department</span>
                    <span className="text-sm font-medium">{user.department}</span>
                  </div>
                )}
                {user.experience !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Experience</span>
                    <span className="text-sm font-medium">{user.experience} years</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAndSortedEmployees.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No users found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}