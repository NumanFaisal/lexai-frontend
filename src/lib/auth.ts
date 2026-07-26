// Lightweight cookie-based auth for frontend-only demo
// No backend needed — stores user data in a cookie via jose JWT
import { MOCK_USERS } from './mock-data';
import type { User } from './types';

const AUTH_COOKIE = 'lexai_session';

export function getAuthCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${AUTH_COOKIE}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function setAuthCookie(email: string): void {
  // Store email in cookie — 7 day expiry
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${AUTH_COOKIE}=${encodeURIComponent(email)}; path=/; expires=${expires}; SameSite=Lax`;
}

export function clearAuthCookie(): void {
  document.cookie = `${AUTH_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export function getCurrentUser(): User | null {
  const email = getAuthCookie();
  if (!email) return null;

  // Check mock users
  const mockUser = MOCK_USERS[email];
  if (mockUser) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...user } = mockUser;
    return user;
  }

  // Check dynamically registered users in localStorage
  const registeredUsers = getRegisteredUsers();
  const registered = registeredUsers[email];
  if (registered) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...user } = registered;
    return user;
  }

  return null;
}

export function authenticateUser(
  email: string,
  password: string
): { success: boolean; user?: User; error?: string } {
  // Check mock users
  const mockUser = MOCK_USERS[email];
  if (mockUser && mockUser.password === password) {
    setAuthCookie(email);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...user } = mockUser;
    return { success: true, user };
  }

  // Check registered users
  const registeredUsers = getRegisteredUsers();
  const registered = registeredUsers[email];
  if (registered && registered.password === password) {
    setAuthCookie(email);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...user } = registered;
    return { success: true, user };
  }

  if (mockUser || registered) {
    return { success: false, error: 'Invalid password' };
  }

  return { success: false, error: 'No account found with this email' };
}

export function registerUser(data: {
  username: string;
  email: string;
  password: string;
  persona: string | null;
}): { success: boolean; user?: User; error?: string } {
  // Check if email already exists
  if (MOCK_USERS[data.email]) {
    return { success: false, error: 'An account with this email already exists' };
  }

  const registeredUsers = getRegisteredUsers();
  if (registeredUsers[data.email]) {
    return { success: false, error: 'An account with this email already exists' };
  }

  const newUser = {
    id: `usr_${Date.now()}`,
    username: data.username,
    email: data.email,
    password: data.password,
    persona: (data.persona as User['persona']) || null,
    plan: 'free' as const,
    hasCompletedOnboarding: false,
    queriesUsed: 0,
    queriesLimit: 30,
    avatarInitials: data.username
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2),
    createdAt: new Date().toISOString(),
  };

  registeredUsers[data.email] = newUser;
  saveRegisteredUsers(registeredUsers);
  setAuthCookie(data.email);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...user } = newUser;
  return { success: true, user };
}

export function updateUserData(email: string, updates: Partial<User>): void {
  const registeredUsers = getRegisteredUsers();
  if (registeredUsers[email]) {
    Object.assign(registeredUsers[email], updates);
    saveRegisteredUsers(registeredUsers);
  }
  // For mock users, we only update in Redux (not persisted)
}

// LocalStorage helpers for dynamically registered users
function getRegisteredUsers(): Record<string, User & { password: string }> {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem('lexai_users');
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveRegisteredUsers(users: Record<string, User & { password: string }>): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('lexai_users', JSON.stringify(users));
}

export function logout(): void {
  clearAuthCookie();
}
