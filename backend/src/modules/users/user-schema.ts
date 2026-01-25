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
  id: z.string(),
  name: z
    .string()
    .min(
      3,
      'Preencha seu nome corretamente, são necessários pelos menos 3 caracteres',
    ),
  email: z.email('Digite um e-mail válido'),
  age: z.int('Digite uma idade válida').optional(),
  phone: z.string().min(10, 'Digite um telefone válido').optional(),
  biography: z.string().optional(),
  theme: z.enum(['light', 'dark']).default('light'),
  alerts: z.enum(['TRUE', 'FALSE']),
  summary: z.enum(['TRUE', 'FALSE']),
  updatedPasswordAt: z.string().nullable().optional(),
  status: z.enum(['DISABLED', 'ENABLED']).default('DISABLED'),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable().optional(),
  avatar_url: z.string().nullable().optional(),
});

const userUpdatePasswordBodySchema = z.object({
  password: z.string().min(6, 'A senha precisa ter no mínimo 6 caracteres'),
});

const userAvatarUpdateUrlSchema = z.object({
  avatar_url: z.string().min(1, 'A URL do avatar é obrigatória'),
});

const userIdSchema = z.object({
  id: z.string().min(1, 'Id inválido'),
});

export {
  userCreateSchema,
  userUpdateSchema,
  userIdSchema,
  userUpdatePasswordBodySchema,
  userAvatarUpdateUrlSchema
};

export type UserCreateSchema = z.infer<typeof userCreateSchema>;
export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;
export type UserIdScheme = z.infer<typeof userIdSchema>;
export type UserUpdatePasswordBodySchema = z.infer<
  typeof userUpdatePasswordBodySchema
>;
