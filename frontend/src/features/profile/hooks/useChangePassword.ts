import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { profileService } from '../services/profileService';
import { usePasswordValidation } from '@/app/hooks/usePasswordValidation';
import { toast } from 'react-toastify';

export function useChangePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, watch, handleSubmit } = useForm();

  const passwordValue = watch('password') || '';
  const confirmPasswordValue = watch('confirmPassword') || '';

  const { passwordValidations, isSamePassword, canSubmit } = usePasswordValidation({
    passwordValue,
    confirmPasswordValue,
  });

  // Aceita uma função callback para executar após o sucesso
  const changePassword = async (data: any, onSuccess?: () => void) => {
    setIsLoading(true);
    try {
      await profileService.updatePassword(data);
      toast.success('Senha alterada com sucesso!');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao alterar senha');
    } finally {
      setIsLoading(false);
    }
  };

  const isSubmitDisabled = isLoading || !canSubmit;

  return {
    register,
    handleSubmit,
    isSubmitDisabled,
    passwordValidations,
    confirmPasswordValue,
    isSamePassword,
    changePassword,
    isLoading,
  };
}