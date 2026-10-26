import { z } from "zod"

export const collectionSchema = z.object({
  id: z.number().int().positive(),
  arName: z.string().min(1, "Arabic name is required"),
  enName: z.string().min(1, "English name is required"),
  icon: z.string().nullable().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export const collectionResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(collectionSchema).optional(),
  message: z.string().optional(),
})

export type CollectionSchema = z.infer<typeof collectionSchema>
