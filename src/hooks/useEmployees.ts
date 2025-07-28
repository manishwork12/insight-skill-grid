import { useState, useEffect } from 'react';
import { User } from '@/services/api/types';
import { employeeService } from '@/services/api/employeeService';

export function useEmployees() {
  const [employees, setEmployees] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await employeeService.getEmployees();
      setEmployees(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const createEmployee = async (employeeData: Partial<User> & { password: string }): Promise<boolean> => {
    try {
      const newEmployee = await employeeService.createEmployee(employeeData);
      if (newEmployee) {
        setEmployees(prev => [...prev, newEmployee]);
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create employee');
      return false;
    }
  };

  const updateEmployee = async (employee: User): Promise<boolean> => {
    try {
      const updatedEmployee = await employeeService.updateEmployee(employee);
      if (updatedEmployee) {
        setEmployees(prev => 
          prev.map(emp => emp.id === employee.id ? updatedEmployee : emp)
        );
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update employee');
      return false;
    }
  };

  const deleteEmployee = async (id: string): Promise<boolean> => {
    try {
      const success = await employeeService.deleteEmployee(id);
      if (success) {
        setEmployees(prev => prev.filter(emp => emp.id !== id));
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete employee');
      return false;
    }
  };

  return {
    employees,
    loading,
    error,
    loadEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  };
}