export interface User {
  id: string;
  name: string;
  email: string;
  age?: number | null;
  phone?: string;
  biography?: string;
  theme: 'light' | 'dark';
  alerts: string;
  summary: string;
  updatedPasswordAt?: string;
  avatar_url: string;
  createdAt: string;
}
