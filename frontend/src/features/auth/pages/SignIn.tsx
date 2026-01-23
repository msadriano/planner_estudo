import { Link } from 'react-router-dom';
import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';
import { ArrowForward, Mail, Lock } from '@mui/icons-material';
import { useSignIn } from '../hooks/useSignIn';
import { cn } from '@/app/utils/cn';

export function SignIn() {
  const { register, errors, isLoading, handleSubmit, onSubmit } = useSignIn();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center justify-start gap-6"
    >
      <Input
        iconLeft={<Mail sx={{ fontSize: 16 }} />}
        legend="E-mail"
        placeholder="exemplo@email.com"
        type="email"
        {...register('email')}
        required
      />
      <Input
        iconLeft={<Lock sx={{ fontSize: 16 }} />}
        legend="Senha"
        placeholder="••••••••"
        recovery="Esqueci minha senha"
        type="password"
        {...register('password')}
        required
      />
      <Button
        type="submit"
        disabled={isLoading}
        iconRight={
          !isLoading ? <ArrowForward sx={{ fontSize: 18 }} /> : undefined
        }
      >
        {isLoading ? 'Fazendo login...' : 'Entrar'}
      </Button>
      <div className="w-full flex flex-row items-center justify-center gap-1 border-t-2 border-t-gray-100 mt-6 pt-8">
        <p className="text-xs text-gray-500 font-semibold">
          Ainda não tem conta?
        </p>
        <Link
          to="/auth/signup"
          className="text-xs text-blue-primary hover:underline font-semibold"
        >
          Criar nova conta
        </Link>
      </div>
    </form>
  );
}
