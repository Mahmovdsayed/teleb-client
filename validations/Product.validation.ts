import { z } from "zod"

export const searchProductQuerySchema = z.object({
  q: z.string().trim().min(1, "Search term is required"),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(5),
  lang: z.enum(["ar", "en"]).optional(),
})

export const productImageSchema = z.object({
  id: z.number().optional(),
  productId: z.number().optional(),
  url: z.string().url(),
  publicId: z.string().optional(),
  order: z.number().optional(),
  isMain: z.boolean().optional(),
})

export const productTranslationSchema = z.object({
  id: z.number().optional(),
  productId: z.number().optional(),
  locale: z.enum(["ar", "en"]),
  name: z.string().min(1),
  description: z.string().nullable().optional(),
  smallDescription: z.string().nullable().optional(),
  tags: z.array(z.string()).optional(),
})

export const productSchema = z.object({
  id: z.number().int().positive(),
  collectionId: z.number().optional(),
  offerId: z.number().nullable().optional(),
  slug: z.string(),
  status: z.enum(["active", "inactive"]),
  isBestSeller: z.boolean().optional(),
  isCustomizable: z.boolean().optional(),
  translations: z.array(productTranslationSchema).optional(),
  images: z.array(productImageSchema).optional(),
})

export const searchProductsResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(productSchema).optional(),
  total: z.number().optional(),
  message: z.string().optional(),
})

export const getProductsFilterSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
  collectionId: z.coerce.number().int().positive().optional(),
  offerId: z.coerce.number().int().positive().optional(),
  status: z.enum(["active", "inactive"]).optional(),
  bestSeller: z.preprocess((val) => {
    if (val === "true" || val === true) return true
    if (val === "false" || val === false) return false
    return undefined
  }, z.boolean().optional()),
  sort: z.enum(["createdAt", "name"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
  search: z.string().trim().optional(),
  lang: z.enum(["ar", "en"]).optional(),
})

export type SearchProductQueryInput = z.infer<typeof searchProductQuerySchema>
export type ProductSchema = z.infer<typeof productSchema>
export type GetProductsFilterInput = z.infer<typeof getProductsFilterSchema>
