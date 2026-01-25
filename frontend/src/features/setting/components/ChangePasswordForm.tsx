export function ChangePasswordForm() {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center justify-start gap-6 pb-6"
    >
      <div className="flex flex-col w-full">
        <span className="text-lg mt-2 font-bold tracking-tighter leading-tight w-full flex items-center justify-center">
          Alterar senha
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
        iconLeft={<Lock sx={{ fontSize: 16 }} />}
        legend="Nova senha"
        placeholder="••••••••"
        type="newPassword"
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
        {isLoading ? 'Alterando sua senha...' : 'Alterar sua senha'}
      </Button>
    </form>
  );
}
