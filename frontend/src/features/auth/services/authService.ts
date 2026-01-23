import { api } from '@/services/api';
import type { CreateAccountFormInput } from '../hooks/useSignUp';

export const authService = {
  signUp: async (data: Omit<CreateAccountFormInput, 'confirmPassword'>) => {
    const response = await api.post('/users', data);
    return response.data;
  },

  signIn: async (email: string, password: string) => {
    const response = await api.post('/sessions', { email, password });
    return response.data;
  },

  recoveryPassword: async (email: string): Promise<void> => {
    await api.post('/auth', { email });
  },

  restartPassword: async (password: string, token: string) => {
    const response = await api.patch(
      '/users/password',
      { password, token },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  },
};
