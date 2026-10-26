export interface ProductTranslation {
  id?: number
  productId?: number
  locale: "ar" | "en"
  name: string
  description?: string | null
  smallDescription?: string | null
  tags?: string[]
}

export interface ProductImage {
  id?: number
  productId?: number
  url: string
  publicId?: string
  order?: number
  isMain?: boolean
}

export interface Product {
  id: number
  collectionId?: number
  offerId?: number | null
  slug: string
  status: "active" | "inactive"
  isBestSeller?: boolean
  isCustomizable?: boolean
  translations?: ProductTranslation[]
  images?: ProductImage[]
}

export interface SearchProductsParams {
  q: string
  page?: number
  limit?: number
  lang?: "ar" | "en"
}

export interface SearchProductsResponse {
  success: boolean
  data?: Product[]
  total?: number
  message?: string
  error?: string | { message?: string }
}

export interface GetProductsParams {
  page?: number
  limit?: number
  collectionId?: number
  offerId?: number
  status?: "active" | "inactive"
  bestSeller?: boolean
  sort?: "createdAt" | "name"
  order?: "asc" | "desc"
  lang?: "ar" | "en"
}

export interface GetProductsResponse {
  success: boolean
  data?: Product[]
  total?: number
  message?: string
  error?: string | { message?: string }
}
