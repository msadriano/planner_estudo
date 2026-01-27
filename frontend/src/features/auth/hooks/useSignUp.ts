import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { authService } from '../services/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { usePasswordValidation } from '@/app/hooks/usePasswordValidation';

export interface CreateAccountFormInput {
  name: string;
  email: string;
  password: string;
  newPassword?: string;
  confirmPassword: string;
}
export function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountFormInput>();

  const passwordValue = watch('password') || '';
  const confirmPasswordValue = watch('confirmPassword') || '';

  const { passwordValidations, isSamePassword, canSubmit } =
    usePasswordValidation({
      passwordValue,
      confirmPasswordValue,
    });

  const handleSignUp = async (data: CreateAccountFormInput) => {
    setIsLoading(true);

    const signUpPromise = authService.signUp({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    toast.promise(signUpPromise, {
      pending: 'Criando sua conta...',
      success: 'Conta criada com sucesso! 🎉',
      error: {
        render({ data }: any) {
          return data.response?.data?.message || 'Erro ao criar a conta';
        },
      },
    });

    try {
      await signUpPromise;

      setTimeout(() => {
        navigate('/signin');
      }, 3000);
    } catch (error: any) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const isSubmitDisabled = isLoading || !canSubmit;

  return {
    register,
    errors,
    password: passwordValue,
    confirmPassword: confirmPasswordValue,
    isSamePassword,
    isLoading,
    isSubmitDisabled,
    passwordValidations,
    handleSubmit,
    onSubmit: handleSignUp,
  };
}
