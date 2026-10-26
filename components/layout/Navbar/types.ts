import type { Collection } from "@/types/Collection.types"
import type { Product } from "@/types/Product.types"

export type { Collection } from "@/types/Collection.types"
export type { Product } from "@/types/Product.types"

export interface SearchResultsProps {
  isSearching: boolean
  hasResults: boolean
  searchQuery: string
  products: Product[]
  collections: Collection[]
  isAr: boolean
  onProductClick: (slug: string) => void
  onCollectionClick: (collection: Collection) => void
  onViewMore: () => void
}
