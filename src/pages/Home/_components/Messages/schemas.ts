import z from "zod";

export const messageSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.email("E-mail inválido").optional().or(z.literal("")),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

export type MessageFormData = z.infer<typeof messageSchema>;
