import { z } from 'zod';

const uploadAvatarSchema = z.object({
  fileName: z
    .string()
    .min(1, 'Nome do arquivo é obrigatório')
    .regex(
      /^avatar_\d+\.(jpg|jpeg|png|webp)$/,
      'Formato de nome de arquivo inválido',
    ),
});

export { uploadAvatarSchema };

export type UploadAvatarInput = z.infer<typeof uploadAvatarSchema>;
