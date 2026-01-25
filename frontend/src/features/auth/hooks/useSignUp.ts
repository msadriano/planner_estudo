import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { authService } from '../services/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export interface CreateAccountFormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export function useSignUp() {
  const [isSamePassword, setIsSamePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountFormInput>();

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
      }, 5000);
    } catch (error: any) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
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
    onSubmit: handleSignUp,
  };
}
