import { API_BASE_URL } from "@/constant/constant"
import { apiRequest } from "@/lib/api-request"
import { MessageResponse } from "@/types/Message.types"
import { CreateMessageInput } from "@/validations/Message.validation"

export const sendMessage = async (payload: CreateMessageInput, locale: string): Promise<any> => {
  const response = await apiRequest<MessageResponse>(`${API_BASE_URL}/message/create`, {
    method: "POST",
    body: payload,
    locale,
  })
  if (response.success === false || response.error) {
    const message = response.message || (typeof response.error === "string" ? response.error : response.error?.message) || "Failed to fetch banners"
    throw new Error(message)
  }

  return response
}
