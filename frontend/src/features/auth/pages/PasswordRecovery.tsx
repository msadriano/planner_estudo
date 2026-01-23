import { usePasswordRecovery } from '../hooks/usePasswordRecovery';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { Link } from 'react-router-dom';
import { Mail } from '@mui/icons-material';

export function PasswordRecovery() {
  const { register, handleSubmit, onSubmit, isLoading, isSubmitDisabled } =
    usePasswordRecovery();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center justify-start gap-6 pt-1"
    >
      <div className="flex flex-col w-full border-t-2 border-t-gray-100 pt-4">
        <span className="text-lg mt-2 font-bold tracking-tighter leading-tight w-full flex items-center justify-center">
          Recuperar senha
        </span>
        <span className="w-full text-xs text-center text-graphite px-8">
          Insira seu e-mail para receber as instruções de recuperação
        </span>
      </div>
      <Input
        iconLeft={<Mail sx={{ fontSize: 16 }} />}
        legend="E-mail"
        placeholder="exemplo@email.com"
        type="email"
        {...register('email')}
        required
      />

      <Button
        type="submit"
        iconRight={<Mail sx={{ fontSize: 18 }} />}
        disabled={isSubmitDisabled}
      >
        {isLoading ? 'Enviando...' : 'Enviar instruções'}
      </Button>
      <div className="w-full flex flex-row items-center justify-center gap-1 border-t-2 border-t-gray-100 mt-6 pt-8">
        <p className="text-xs text-gray-500 font-semibold">Ja tem uma conta?</p>
        <Link
          to="/signin"
          className="text-xs text-blue-primary hover:underline font-semibold"
        >
          Voltar para o login
        </Link>
      </div>
    </form>
  );
}
