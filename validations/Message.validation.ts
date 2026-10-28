import z from "zod"

export const createMessageSchema = z.compile(
  z.object({
    fullName: z.string().trim().min(2).max(100),
    email: z.string().trim().email(),
    phone: z.string().trim().min(3).max(30),
    subject: z.string().trim().min(2).max(200),
    message: z.string().trim().min(5).max(5000),
  })
)

export type CreateMessageInput = z.infer<typeof createMessageSchema>
