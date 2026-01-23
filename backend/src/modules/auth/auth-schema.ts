import { z } from 'zod';

const passwordRecoverySchema = z.object({
  email: z.email('Entre com um e-mail válido'),
});

export { passwordRecoverySchema };

export type PasswordRecoverySchema = z.infer<typeof passwordRecoverySchema>;
