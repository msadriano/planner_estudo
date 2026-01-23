import { ValidationBox } from '../components/ValidationBox';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { Link } from 'react-router-dom';
import { useSignUp } from '../hooks/useSignUp';
import { cn } from '@/app/utils/cn';
import { Mail, Lock, Person, PersonAdd, Shield } from '@mui/icons-material';

export function SignUp() {
  const {
    register,
    isSamePassword,
    confirmPassword,
    handleSubmit,
    isLoading,
    isSubmitDisabled,
    passwordValidations,
    onSubmit,
  } = useSignUp();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center justify-start gap-6 pt-1"
    >
      <div className="flex flex-col w-full border-t-2 border-t-gray-100 pt-4">
        <span className="text-lg mt-2 font-bold tracking-tighter leading-tight w-full flex items-center justify-center">
          Criar nova conta
        </span>
        <span className="w-full text-xs text-center text-graphite px-8">
          Junte-se a comunidade de estudantes que organizou definitivamente sua
          rotina de estudos
        </span>
      </div>
      <Input
        iconLeft={<Person sx={{ fontSize: 16 }} />}
        legend="Nome completo"
        placeholder="Digite seu nome completo"
        type="text"
        {...register('name')}
        required
      />
      <Input
        iconLeft={<Mail sx={{ fontSize: 16 }} />}
        legend="E-mail"
        placeholder="exemplo@email.com"
        type="email"
        {...register('email')}
        required
      />
      <div className="w-full flex flex-row justify-center items-center gap-4">
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
      </div>
      <ValidationBox validations={passwordValidations} />

      <Button
        type="submit"
        iconRight={<PersonAdd sx={{ fontSize: 18 }} />}
        disabled={isSubmitDisabled}
      >
        {isLoading ? 'Cadastrando...' : 'Criar conta grátis'}
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
