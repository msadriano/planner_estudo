import { ValidationBox } from '../components/ValidationBox';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { Link } from 'react-router-dom';
import { useRestartPassword } from '../hooks/useRestartPassword';
import { cn } from '@/app/utils/cn';
import { Lock, Shield, ArrowBack } from '@mui/icons-material';

export function RestartPassword() {
  const {
    register,
    isSamePassword,
    confirmPassword,
    handleSubmit,
    isLoading,
    isSubmitDisabled,
    passwordValidations,
    onSubmit,
  } = useRestartPassword();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center justify-start gap-6 pt-1"
    >
      <div className="flex flex-col w-full border-t-2 border-t-gray-100 pt-4">
        <span className="text-lg mt-2 font-bold tracking-tighter leading-tight w-full flex items-center justify-center">
          Criar nova senha
        </span>
        <span className="w-full text-xs text-center text-graphite px-8">
          Escolha uma senha forte para proteger sua conta
        </span>
      </div>

      <Input
        iconLeft={<Lock sx={{ fontSize: 16 }} />}
        legend="Senha"
        placeholder="••••••••"
        type="password"
        {...register('password')}
        required
      />
      <Input
        iconLeft={<Shield sx={{ fontSize: 16 }} />}
        legend="Confirmar senha"
        placeholder="••••••••"
        type="password"
        {...register('confirmPassword')}
        className={cn(
          confirmPassword?.length > 0 &&
            (isSamePassword
              ? 'focus-within:text-green-success focus-within:border-green-success'
              : 'focus-within:text-red-400 focus-within:border-red-400'),
        )}
        required
      />

      <ValidationBox validations={passwordValidations} />

      <Button type="submit" disabled={isSubmitDisabled}>
        {isLoading ? 'Redefinindo senha...' : 'Redefinir senha'}
      </Button>
      <div className="w-full flex flex-row items-center justify-center gap-2 border-t-2 border-t-gray-100 mt-6 pt-8">
        <Link
          to="/signin"
          className="text-xs text-blue-primary hover:underline font-semibold"
        >
          <ArrowBack sx={{ fontSize: 12 }} />
          Voltar para o login
        </Link>
      </div>
    </form>
  );
}
