import { useRef, useState } from 'react';
import type { User } from '@/app/types/user';

interface UseProfileAvatarProps {
  userData: User;
  profileService: any;
  fetchUserData: () => Promise<void>;
}

export function useProfileAvatar({ userData, profileService, fetchUserData }: UseProfileAvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = import.meta.env.VITE_API_URL || import.meta.env.BASEURL || '';

  const getAvatarUrl = (): string => {
    if (!userData.avatar_url) return 'https://github.com/shadcn.png';
    return `${baseUrl}/uploads/users/${userData.id}/${userData.avatar_url}`;
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const uploadData = await profileService.uploadAvatar(formData);
      
      // Padroniza o retorno do backend para avatar_url
      const newAvatarUrl = uploadData.avatar_url || uploadData.avatarUrl;

      await profileService.updateMe({ avatar_url: newAvatarUrl });
      
      // Crucial: Chama o fetch da instância real para atualizar o userData
      await fetchUserData();

      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer upload');
    } finally {
      setIsUploading(false);
    }
  };

  return {
    fileInputRef,
    isUploading,
    error,
    avatarUrl: getAvatarUrl(),
    openFileDialog: () => fileInputRef.current?.click(),
    handleFileChange,
  };
}