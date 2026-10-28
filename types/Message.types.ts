export interface Message {
  fullName: string
  email: string
  phone: string
  subject: string
  message: string
}

export interface MessageResponse {
  success: boolean
  message?: string
  error?: string | { message?: string }
}
