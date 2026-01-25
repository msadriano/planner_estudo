export interface User {
  id: string;
  name: string;
  email: string;
  age?: number | string;
  phone?: string;
  biography?: string;
  theme: 'light' | 'dark';
  alerts: string;
  summary: string;
  updatedPasswordAt?: string;
  avatarUrl: string;
  createdAt: string;
  avatar_url?: string;
}
