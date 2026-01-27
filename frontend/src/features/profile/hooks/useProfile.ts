import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/app/store/AuthContext';
import { profileService } from '../services/profileService';
import { validatePhone } from '@/app/utils/formatPhone';
import type { User } from '@/app/types/user';
import { toast } from 'react-toastify';

export function useProfile() {
  const { user } = useContext(AuthContext);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') ?? 'light';
  });

  const [alertsEnabled, setAlertsEnabled] = useState(false);
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [userData, setUserData] = useState<User>({
    id: user?.id ?? '',
    name: user?.name ?? '',
    email: user?.email ?? '',
    age: user?.age ?? null,
    phone: user?.phone ?? '',
    biography: user?.biography ?? '',
    theme: (user?.theme as 'light' | 'dark') ?? 'light',
    alerts: user?.alerts ?? 'true',
    summary: user?.summary ?? 'true',
    avatar_url: user?.avatar_url ?? '',
    createdAt: user?.createdAt ?? '',
  });

  const handleInputChange = (
    field: keyof User,
    value: string | number | null,
  ) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const fetchUserData = async () => {
    try {
      const response = await profileService.showUser();

      setUserData(response);

      //setTheme(response.theme);

      if (!localStorage.getItem('theme')) {
        setTheme(response.theme);
      }

      setAlertsEnabled(response.alerts === 'TRUE');
      setWeeklySummary(response.summary === 'TRUE');
    } catch (error) {
      console.error('Erro ao sincronizar o perfil', error);
    }
  };

  const handleSaveProfile = async () => {
    if (userData.age && (userData.age < 1 || userData.age > 150)) {
      toast.error('Idade deve estar entre 1 e 150 anos');
      return;
    }

    if (userData.phone && !validatePhone(userData.phone)) {
      toast.error('Telefone inválido');
      return;
    }

    const data = {
      ...userData,
      alerts: alertsEnabled ? 'TRUE' : 'FALSE',
      summary: weeklySummary ? 'TRUE' : 'FALSE',
      theme: theme,
    };

    await toast.promise(profileService.updateUser(data), {
      pending: 'Salvando alterações... ⏳',
      success: 'Perfil atualizado com sucesso! 🚀',
      error: 'Erro ao salvar informações.',
    });

    await fetchUserData(); // Garante sincronia após salvar
  };

  const hasDate = userData.updatedPasswordAt || userData.createdAt;
  const updatedPasswordDateFormatted = new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC',
  }).format(new Date(hasDate));

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

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
    updatedPasswordDateFormatted,
  };
}
