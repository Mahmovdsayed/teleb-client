export interface Collection {
  id: number
  arName: string
  enName: string
  icon?: string | null
  createdAt?: string
  updatedAt?: string
}

export interface CollectionResponse {
  success: boolean
  data?: Collection[]
  message?: string
  error?: string | { message?: string }
}
