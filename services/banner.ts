import { API_BASE_URL } from "@/constant/constant"
import { apiRequest } from "@/lib/api-request"
import { Banner, BannerResponse } from "@/types/Banner.types"

export const getBanners = async (): Promise<Banner[]> => {
  const response = await apiRequest<BannerResponse>(`${API_BASE_URL}/banner/get`, {
    method: "GET",
  })

  if (response.success === false || response.error) {
    const message = response.message || (typeof response.error === "string" ? response.error : response.error?.message) || "Failed to fetch banners"
    throw new Error(message)
  }

  return response.data ?? []
}