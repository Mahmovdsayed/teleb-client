export type SortOption = "newest" | "oldest" | "name_asc" | "name_desc"

export interface ProductFiltersState {
  search: string
  collectionId: number | null
  bestSeller: boolean
  status: "active" | "all"
  sort: SortOption
  page: number
}
