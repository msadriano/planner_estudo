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
  updatedPasswordAt: z.date().optional(),
});

const userUpdateSchema = z.object({
  id: z.string(),
  name: z.string().min(3, 'Mínimo de 3 caracteres'),
  email: z.string().email('Digite um e-mail válido'),
  age: z
    .number()
    .int('Idade deve ser um número inteiro')
    .min(1, 'Idade deve ser maior que 0')
    .max(150, 'Idade deve ser menor que 150')
    .nullable()
    .optional(),
  phone: z
    .string()
    .regex(
      /^\(\d{2}\)\s?\d{4,5}-\d{4}$/,
      'Telefone deve estar no formato (99) 9999-9999 ou (99) 99999-9999',
    )
    .nullable()
    .optional(),
  biography: z.string().nullable().optional(),
  theme: z.enum(['light', 'dark']).default('light'),
  alerts: z.enum(['TRUE', 'FALSE']).default('FALSE'),
  summary: z.enum(['TRUE', 'FALSE']).default('FALSE'),
  updatedPasswordAt: z.string().nullable().optional(),
  status: z.enum(['DISABLED', 'ENABLED']).default('DISABLED'),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  deletedAt: z.string().nullable().optional(),
  avatar_url: z.string().nullable().optional(),
});

const userUpdatePasswordBodySchema = z.object({
  password: z.string().min(6, 'A senha precisa ter no mínimo 6 caracteres'),
  updatedPasswordAt: z.date().optional(),
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
  userAvatarUpdateUrlSchema,
};

export type UserCreateSchema = z.infer<typeof userCreateSchema>;
export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;
export type UserIdScheme = z.infer<typeof userIdSchema>;
export type UserUpdatePasswordBodySchema = z.infer<
  typeof userUpdatePasswordBodySchema
>;
