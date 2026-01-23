import { useForm } from 'react-hook-form';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { AuthContext } from '@/app/store/AuthContext';
import { toast } from 'react-toastify';

export interface SignInFormInput {
  email: string;
  password: string;
}

export function useSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInput>();

  const navigate = useNavigate();

  const handleSignIn = async (data: SignInFormInput) => {
    setIsLoading(true);

    const authExecution = async () => {
      const response = await authService.signIn(data.email, data.password);

      if (response.user.deletedAt) {
        throw new Error(
          'Esta conta foi desativada. Entre em contato com o suporte.',
        );
      }
      return response;
    };

    toast
      .promise(authExecution, {
        pending: 'Fazendo autenticação...',
        success: 'Usuário autenticado com sucesso 🎉',
        error: {
          render({ data }: any) {
            if (data instanceof Error && !data.hasOwnProperty('response')) {
              return data.message;
            }

            const backendMessage = data.response?.data?.message;

            return (
              backendMessage || 'E-mail e/ou Senha inválidos. Tente novamente.'
            );
          },
        },
      })
      .then((response) => {
        signIn({
          token: response.token,
          user: response.user,
        });

        setTimeout(() => navigate('/'), 2000);
      })
      .catch(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      });
  };

  return {
    register,
    errors,
    isLoading,
    handleSubmit,
    onSubmit: handleSignIn,
  };
}
