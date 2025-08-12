import { UserRole } from '@/services/api/types';

export function getStoredUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

export function getStoredToken() {
  return localStorage.getItem('authToken');
}

export function storeAuthData(user: any, token: string) {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('authToken', token);
}

export function clearAuthData() {
  localStorage.removeItem('user');
  localStorage.removeItem('authToken');
}

export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
  const roleHierarchy = {
    'employee': 1,
    'trainer': 2,
    'manager': 3,
    'super-user': 4
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

export function canAccessRoute(userRole: UserRole, routeRole?: UserRole): boolean {
  if (!routeRole) return true;
  return hasRole(userRole, routeRole);
}

export function getUserInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
}