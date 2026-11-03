import { API_BASE_URL } from "@/constant/constant"
import { apiRequest } from "@/lib/api-request"
import {
  Product,
  SearchProductsParams,
  SearchProductsResponse,
  GetProductsParams,
  GetProductsResponse,
  GetProductByIdResponse,
} from "@/types/Product.types"

export const searchProducts = async (
  params: SearchProductsParams
): Promise<{ products: Product[]; total: number }> => {
  const query = new URLSearchParams()
  query.set("q", params.q.trim())
  if (params.page) query.set("page", params.page.toString())
  if (params.limit) query.set("limit", params.limit.toString())
  if (params.lang) query.set("lang", params.lang)

  const response = await apiRequest<SearchProductsResponse>(
    `${API_BASE_URL}/products/search?${query.toString()}`,
    {
      method: "GET",
      locale: params.lang,
    }
  )

  if (response.success === false || response.error) {
    const message =
      response.message ||
      (typeof response.error === "string" ? response.error : response.error?.message) ||
      "Failed to search products"
    throw new Error(message)
  }

  return {
    products: response.data ?? [],
    total: response.total ?? 0,
  }
}

export const getProducts = async (
  params: GetProductsParams = {}
): Promise<{ products: Product[]; total: number }> => {
  const query = new URLSearchParams()
  if (params.page) query.set("page", params.page.toString())
  if (params.limit) query.set("limit", params.limit.toString())
  if (params.collectionId) query.set("collectionId", params.collectionId.toString())
  if (params.offerId) query.set("offerId", params.offerId.toString())
  if (params.status) query.set("status", params.status)
  if (params.bestSeller !== undefined) query.set("bestSeller", params.bestSeller.toString())
  if (params.sort) query.set("sort", params.sort)
  if (params.order) query.set("order", params.order)
  if (params.lang) query.set("lang", params.lang)

  const queryString = query.toString()
  const endpoint = queryString
    ? `${API_BASE_URL}/products?${queryString}`
    : `${API_BASE_URL}/products`

  const response = await apiRequest<GetProductsResponse>(endpoint, {
    method: "GET",
    locale: params.lang,
  })

  if (response.success === false || response.error) {
    const message =
      response.message ||
      (typeof response.error === "string" ? response.error : response.error?.message) ||
      "Failed to fetch products"
    throw new Error(message)
  }

  return {
    products: response.data ?? [],
    total: response.total ?? 0,
  }
}

export const getProductById = async (
  id: string | number,
  lang?: "ar" | "en"
): Promise<Product | null> => {
  if (typeof id === "string" && !/^\d+$/.test(id.trim())) {
    return getProductBySlug(id, lang)
  }

  const response = await apiRequest<GetProductByIdResponse>(
    `${API_BASE_URL}/products/${id}`,
    {
      method: "GET",
      locale: lang,
    }
  )

  if (response.success === false || response.error) {
    const message =
      response.message ||
      (typeof response.error === "string" ? response.error : response.error?.message) ||
      "Failed to fetch product"
    throw new Error(message)
  }

  return response.data ?? null
}

export const getProductBySlug = async (
  slug: string,
  lang?: "ar" | "en"
): Promise<Product | null> => {
  const decodedSlug = decodeURIComponent(slug).trim()
  const response = await apiRequest<GetProductByIdResponse>(
    `${API_BASE_URL}/products/slug/${encodeURIComponent(decodedSlug)}`,
    {
      method: "GET",
      locale: lang,
    }
  )

  if (response.success === false || response.error) {
    const message =
      response.message ||
      (typeof response.error === "string" ? response.error : response.error?.message) ||
      "Failed to fetch product"
    throw new Error(message)
  }

  const product = response.data ?? null
  if (product?.id && product.collectionId === undefined) {
    try {
      const fullProduct = await getProductById(product.id, lang)
      if (fullProduct) {
        return {
          ...fullProduct,
          ...product,
          collectionId: fullProduct.collectionId ?? product.collectionId,
          offerId: fullProduct.offerId ?? product.offerId,
          createdAt: fullProduct.createdAt ?? product.createdAt,
          updatedAt: fullProduct.updatedAt ?? product.updatedAt,
        }
      }
    } catch {
      // Continue with base product if secondary fetch fails
    }
  }

  return product
}

export const getProductByIdOrSlug = async (
  idOrSlug: string | number,
  lang?: "ar" | "en"
): Promise<Product | null> => {
  const str = String(idOrSlug).trim()
  if (/^\d+$/.test(str)) {
    return getProductById(str, lang)
  }
  return getProductBySlug(str, lang)
}
