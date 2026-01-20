import { z } from 'zod';

const userCreateSchema = z.object({
  name: z
    .string()
    .min(
      3,
      'Preencha seu nome corretamente, são necessários pelos menos 3 caracteres',
    ),
  email: z.email('Digite um e-mail válido'),
  age: z.int('Digite uma idade válida').optional(),
  phone: z.string().min(10, 'Digite um telefone válido').optional(),
  password: z
    .string()
    .min(6, 'A senha precisa ter no mínimo 6 caracteres')
    .optional(),
});

const userUpdateSchema = z.object({
  name: z
    .string()
    .min(
      3,
      'Preencha seu nome corretamente, são necessários pelos menos 3 caracteres',
    ),
  email: z.email('Digite um e-mail válido'),
  age: z.int('Digite uma idade válida').optional(),
  phone: z.string().min(10, 'Digite um telefone válido').optional(),
});

const userUpdatePasswordSchema = z.object({
  password: z
    .string()
    .min(6, 'A senha precisa ter no mínimo 6 caracteres'),
});

const userIdSchema = z.object({
  id: z.string().min(1, 'Id inválido'),
});

export {
  userCreateSchema,
  userUpdateSchema,
  userIdSchema,
  userUpdatePasswordSchema,
};

export type UserCreateSchema = z.infer<typeof userCreateSchema>;
export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;
export type UserIdScheme = z.infer<typeof userIdSchema>;
export type UserUpdatePasswordSchema = z.infer<typeof userUpdatePasswordSchema>;
