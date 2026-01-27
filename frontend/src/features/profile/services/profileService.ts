import { api } from '@/services/api';
import type { User } from '@/app/types/user';

interface UploadAvatarResponse {
  success: boolean;
  avatarUrl?: string;
  message?: string;
}

interface PatchAvatarUrl {
  avatar_url: string;
}

interface UpdatePassword {
  password: string;
}

export const profileService = {
  showUser: async (): Promise<User> => {
    const user = await api.get<User>('/users/me');

    return user.data;
  },

  updateUser: async (data: Partial<User>) => {
    const payload = {
      ...data,
      age: data.age ? Number(data.age) : null,
    };

    const updatedUser = await api.put(`/users/${data.id}`, payload);
    return updatedUser;
  },

  updateMe: async (data: PatchAvatarUrl) => {
    return await api.patch('/users/me', data);
  },

  uploadAvatar: async (formData: FormData): Promise<UploadAvatarResponse> => {
    const response = await api.post<UploadAvatarResponse>(
      '/upload/avatar',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  },

  updatePassword: async (data: UpdatePassword) => {
    const hasUpdatedPassword = await api.patch('/users/password', data);
    return hasUpdatedPassword;
  },
};
