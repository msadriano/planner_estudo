import { api } from '@/services/api';
import type { User } from '@/app/types/User';

interface UploadAvatarResponse {
  success: boolean;
  avatarUrl?: string;
  message?: string;
}

interface PatchAvatarUrl {
  avatar_url: string;
}

export const profileService = {
  showUser: async (): Promise<User> => {
    const user = await api.get<User>('/users/me');

    return user.data;
  },

  updateUser: async (data: Partial<User>) => {
    const updatedUser = await api.put(`/users/${data.id}`, data);
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
};
