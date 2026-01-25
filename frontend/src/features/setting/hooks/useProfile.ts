import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/app/store/AuthContext';
import { profileService } from '../services/profileService';
import type { User } from '@/app/types/User';
import { toast } from 'react-toastify';

export function useProfile() {
  const { user } = useContext(AuthContext);

  const [theme, setTheme] = useState<'light' | 'dark'>(
    (user?.theme as 'light' | 'dark') ?? 'light',
  );
  const [alertsEnabled, setAlertsEnabled] = useState(false);
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [userData, setUserData] = useState<User>({
    id: user?.id ?? '',
    name: user?.name ?? '',
    email: user?.email ?? '',
    age: user?.age ?? '',
    phone: user?.phone ?? '',
    biography: user?.biography ?? '',
    theme: (user?.theme as 'light' | 'dark') ?? 'light',
    alerts: user?.alerts ?? 'true',
    summary: user?.summary ?? 'true',
    avatarUrl: user?.avatarUrl ?? '',
    createdAt: user?.createdAt ?? '',
  });

  const handleInputChange = (field: keyof User, value: string | number) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = async () => {
    const data = {
      ...userData,
      alerts: alertsEnabled ? 'TRUE' : 'FALSE',
      summary: weeklySummary ? 'TRUE' : 'FALSE',
      theme: theme,
    };

    await toast.promise(profileService.updateUser(data), {
      pending: 'Salvando alterações... ⏳',
      success: 'Perfil atualizado com sucesso! 🚀',
      error: {
        render({ data }: any) {
          return (
            data.response?.data?.message || 'Erro ao salvar. Tente novamente.'
          );
        },
      },
    });
  };

  const fetchUserData = async () => {
    try {
      const response = await profileService.showUser();

      setUserData(response);
      setTheme(response.theme);
      setAlertsEnabled(response.alerts === 'TRUE');
      setWeeklySummary(response.summary === 'TRUE');
    } catch (error) {
      console.error('Erro ao sincronizar o perfil', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    theme,
    setTheme,
    handleSaveProfile,
    alertsEnabled,
    setAlertsEnabled,
    weeklySummary,
    setWeeklySummary,
    userData,
    handleInputChange,
    isPasswordModalOpen,
    setIsPasswordModalOpen,
    profileService,
    fetchUserData,
  };
}
