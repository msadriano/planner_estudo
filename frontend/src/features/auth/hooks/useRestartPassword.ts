import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { authService } from '../services/authService';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

export interface RestartPasswordFormInput {
  password: string;
  confirmPassword: string;
}

export function useRestartPassword() {
  const [isSamePassword, setIsSamePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RestartPasswordFormInput>();

  const password = watch('password') || '';
  const confirmPassword = watch('confirmPassword') || '';

  const passwordValidations = {
    hasMinChars: password.length >= 6,
    hasUppercase: /[A-Z]/.test(password),
    hasSpecialChar: /[^A-Za-z0-9]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };

  const isPasswordStrong = Object.values(passwordValidations).every(Boolean);

  useEffect(() => {
    if (confirmPassword?.length > 0) {
      setIsSamePassword(password === confirmPassword);
    } else {
      setIsSamePassword(true);
    }
  }, [password, confirmPassword]);

  const handleRestart = async (data: RestartPasswordFormInput) => {
    if (!token) {
      toast.error('Token não encontrado ou inválido');
      return;
    }

    setIsLoading(true);

    const restartPasswordPromise = authService.restartPassword(
      data.password,
      token,
    );

    toast.promise(restartPasswordPromise, {
      pending: 'Cadastrando nova senha...',
      success: 'Senha cadastrada com sucesso! 🎉',
      error: {
        render({ data }: any) {
          return data.response?.data?.message || 'Erro ao cadastrar nova senha';
        },
      },
    });

    try {
      await restartPasswordPromise;

      setTimeout(() => {
        navigate('/signin');
      }, 3000);
    } catch (error: any) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  const isSubmitDisabled =
    isLoading ||
    !isPasswordStrong ||
    !confirmPassword ||
    password !== confirmPassword;

  return {
    register,
    errors,
    password,
    confirmPassword,
    isSamePassword,
    isLoading,
    isSubmitDisabled,
    passwordValidations,
    handleSubmit,
    onSubmit: handleRestart,
  };
}
