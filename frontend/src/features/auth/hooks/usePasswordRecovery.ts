import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

interface RecoveryFormInput {
  email: string;
}

export function usePasswordRecovery() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch } = useForm<RecoveryFormInput>();
  const navigate = useNavigate();

  const email = watch('email');

  const isSubmitDisabled = isLoading || !email;

  const handleRecovery = async (data: RecoveryFormInput) => {
    setIsLoading(true);

    const recoveryPromise = authService.recoveryPassword(data.email);

    toast.promise(recoveryPromise, {
      pending: 'Enviando e-mail...',
      success:
        'Instruções de recuperação de senha enviadas para o seu e-mail. Verifique sua caixa de entrada.',
      error: {
        render({ data }: any) {
          return (
            data.response?.data?.message || 'Erro ao processar a solicitação'
          );
        },
      },
    });
    try {
      await recoveryPromise;
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit: handleRecovery,
    isLoading,
    isSubmitDisabled,
  };
}
