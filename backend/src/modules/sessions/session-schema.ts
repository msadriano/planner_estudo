import {z} from "zod"

const sessionCreateSchema = z.object({
    email: z.email("Digite um e-mail válido"),
    password: z.string().min(1, "A senha é obrigatória")
})

export {sessionCreateSchema}

export type SessionCreateSchema = z.infer<typeof sessionCreateSchema>