import { useRef, useState } from 'react';
import { useProfile } from './useProfile';

export function useProfileAvatar() {
  const { userData, profileService, fetchUserData } = useProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = import.meta.env.VITE_API_URL || import.meta.env.BASEURL || '';

  const getAvatarUrl = (): string => {
    if (!userData.avatar_url) {
      return 'https://github.com/shadcn.png';
    }
    return `${baseUrl}/uploads/users/${userData.id}/${userData.avatar_url}`;
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // Faz upload do arquivo e atualiza o banco
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validação de tipo de arquivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Apenas imagens JPG, PNG ou WEBP são permitidas');
      return;
    }

    // Validação de tamanho (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('A imagem deve ter no máximo 5MB');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // Prepara o FormData
      const formData = new FormData();
      formData.append('avatar', file);

      // Upload do arquivo usando o profileService
      const uploadData = await profileService.uploadAvatar(formData);

      if (!uploadData.success || !uploadData.avatarUrl) {
        throw new Error(uploadData.message || 'Erro ao fazer upload');
      }

      // Atualiza o banco usando o profileService (mesma lógica do handleSaveProfile)

      await profileService.updateMe({ avatar_url: uploadData.avatarUrl });

      await fetchUserData();

      // Limpa o input para permitir upload do mesmo arquivo novamente
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer upload');
    } finally {
      setIsUploading(false);
    }
  };

  return {
    fileInputRef,
    isUploading,
    error,
    avatarUrl: getAvatarUrl(),
    openFileDialog,
    handleFileChange,
    userData,
  };
}
