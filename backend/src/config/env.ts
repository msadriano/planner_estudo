import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(1, 'O JWT é obrigatório no arquivo .env'),
  BASEURL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('Invalid environment variables.', _env.error.format());
  throw new Error('Invalid environment variables.');
}

export const env = _env.data;
