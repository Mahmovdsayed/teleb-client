"use client"

import { useState, useEffect, useMemo, useTransition, useCallback } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { Search, X } from "lucide-react"

import { useAppQuery } from "@/hooks/useAppQuery"
import { getProducts, searchProducts } from "@/services/product"
import { getCollections } from "@/services/collection"
import { getProductsFilterSchema } from "@/validations/Product.validation"
import type { Collection } from "@/types/Collection.types"
import type { Product } from "@/types/Product.types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { CollectionPills } from "./CollectionPills"
import { ProductsSortSelect } from "./ProductsSortSelect"
import { ProductsFilterSidebar } from "./ProductsFilterSidebar"
import { ProductsFilterDrawer } from "./ProductsFilterDrawer"
import { ProductsGrid } from "./ProductsGrid"
import type { SortOption } from "./types"

const PAGE_SIZE = 12

interface ProductsResult {
  products: Product[]
  total: number
}

export function ProductsContent() {
  const t = useTranslations("productsPage")
  const locale = useLocale()
  const isRtl = locale === "ar"
  const lang = (locale === "ar" ? "ar" : "en") as "ar" | "en"

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [, startTransition] = useTransition()

  const rawParams = useMemo(() => {
    return {
      page: searchParams.get("page") ?? undefined,
      collectionId: searchParams.get("collectionId") ?? undefined,
      bestSeller: searchParams.get("bestSeller") ?? undefined,
      status: searchParams.get("status") ?? undefined,
      sort: searchParams.get("sort") ?? undefined,
      order: searchParams.get("order") ?? undefined,
      search: searchParams.get("search") ?? undefined,
    }
  }, [searchParams])

  const parsedParams = useMemo(() => {
    const res = getProductsFilterSchema.safeParse(rawParams)
    return res.success ? res.data : { page: 1, limit: PAGE_SIZE }
  }, [rawParams])

  const [searchInput, setSearchInput] = useState(parsedParams.search || "")

  useEffect(() => {
    setSearchInput(parsedParams.search || "")
  }, [parsedParams.search])

  const currentSort: SortOption = useMemo(() => {
    const sort = parsedParams.sort
    const order = parsedParams.order
    if (sort === "name") {
      return order === "desc" ? "name_desc" : "name_asc"
    }
    if (sort === "createdAt" && order === "asc") {
      return "oldest"
    }
    return "newest"
  }, [parsedParams.sort, parsedParams.order])

  const setFilterParam = useCallback(
    (updates: Record<string, string | null | undefined>) => {
      const params = new URLSearchParams(searchParams.toString())

      Object.entries(updates).forEach(([key, val]) => {
        if (val === null || val === undefined || val === "") {
          params.delete(key)
        } else {
          params.set(key, String(val))
        }
      })

      if (!("page" in updates)) {
        params.delete("page")
      }

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: true })
      })
    },
    [searchParams, pathname, router]
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = searchInput.trim()
      if (trimmed !== (parsedParams.search || "")) {
        setFilterParam({ search: trimmed ? trimmed : null })
      }
    }, 350)

    return () => clearTimeout(timer)
  }, [searchInput, parsedParams.search, setFilterParam])

  const { data: collections = [] } = useAppQuery<Collection[]>({
    queryKey: ["collections"],
    queryFn: getCollections,
  })

  const { data: productsData, isLoading } = useAppQuery<ProductsResult>({
    queryKey: [
      "products",
      {
        page: parsedParams.page,
        limit: PAGE_SIZE,
        collectionId: parsedParams.collectionId,
        bestSeller: parsedParams.bestSeller,
        status: parsedParams.status,
        sort: parsedParams.sort,
        order: parsedParams.order,
        search: parsedParams.search,
        lang,
      },
    ],
    queryFn: async () => {
      if (parsedParams.search) {
        const searchRes = await searchProducts({
          q: parsedParams.search,
          page: parsedParams.page,
          limit: PAGE_SIZE,
          lang,
        })

        let list: Product[] = searchRes.products || []

        if (parsedParams.collectionId) {
          list = list.filter((p) => p.collectionId === parsedParams.collectionId)
        }
        if (parsedParams.bestSeller) {
          list = list.filter((p) => p.isBestSeller)
        }
        if (parsedParams.status === "active") {
          list = list.filter((p) => p.status === "active")
        }

        return {
          products: list,
          total: searchRes.total ?? list.length,
        }
      }

      return getProducts({
        page: parsedParams.page,
        limit: PAGE_SIZE,
        collectionId: parsedParams.collectionId,
        offerId: parsedParams.offerId,
        status: parsedParams.status,
        bestSeller: parsedParams.bestSeller,
        sort: parsedParams.sort,
        order: parsedParams.order,
        lang,
      })
    },
  })

  const products: Product[] = useMemo(() => {
    return productsData?.products || []
  }, [productsData])

  const totalProducts = productsData?.total ?? products.length
  const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE))

  const handleSortChange = (option: SortOption) => {
    switch (option) {
      case "oldest":
        setFilterParam({ sort: "createdAt", order: "asc" })
        break
      case "name_asc":
        setFilterParam({ sort: "name", order: "asc" })
        break
      case "name_desc":
        setFilterParam({ sort: "name", order: "desc" })
        break
      case "newest":
      default:
        setFilterParam({ sort: "createdAt", order: "desc" })
        break
    }
  }

  const handleSelectCollection = (id: number | null) => {
    setFilterParam({ collectionId: id ? String(id) : null })
  }

  const handleToggleBestSeller = () => {
    setFilterParam({
      bestSeller: parsedParams.bestSeller ? null : "true",
    })
  }

  const handleToggleStatus = () => {
    setFilterParam({
      status: parsedParams.status === "active" ? null : "active",
    })
  }

  const handleResetFilters = () => {
    setSearchInput("")
    startTransition(() => {
      router.push(pathname, { scroll: false })
    })
  }

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (parsedParams.collectionId) count++
    if (parsedParams.bestSeller) count++
    if (parsedParams.status === "active") count++
    if (parsedParams.search) count++
    return count
  }, [parsedParams])

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 space-y-6 md:space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          {t("title")}
        </h1>
        <p className="max-w-3xl text-xs md:text-sm text-muted-foreground leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      <CollectionPills
        collections={collections}
        selectedId={parsedParams.collectionId ?? null}
        onSelect={handleSelectCollection}
      />

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="h-10 ps-9 pe-9 text-xs rounded-xl bg-card border-border/80 shadow-2xs focus-visible:ring-primary/20"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => {
                setSearchInput("")
                setFilterParam({ search: null })
              }}
              className="absolute end-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer p-0.5"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2.5">
          <div className="lg:hidden">
            <ProductsFilterDrawer
              collections={collections}
              selectedCollectionId={parsedParams.collectionId ?? null}
              onSelectCollection={handleSelectCollection}
              bestSeller={Boolean(parsedParams.bestSeller)}
              onToggleBestSeller={handleToggleBestSeller}
              status={parsedParams.status === "active" ? "active" : "all"}
              onToggleStatus={handleToggleStatus}
              activeFiltersCount={activeFiltersCount}
              onResetFilters={handleResetFilters}
            />
          </div>

          <ProductsSortSelect
            value={currentSort}
            onChange={handleSortChange}
            className="rounded-xl h-10 border-border/80 bg-card shadow-2xs"
          />
        </div>
      </div>

      <div className="flex items-start gap-8">
        <ProductsFilterSidebar
          collections={collections}
          selectedCollectionId={parsedParams.collectionId ?? null}
          onSelectCollection={handleSelectCollection}
          bestSeller={Boolean(parsedParams.bestSeller)}
          onToggleBestSeller={handleToggleBestSeller}
          status={parsedParams.status === "active" ? "active" : "all"}
          onToggleStatus={handleToggleStatus}
          activeFiltersCount={activeFiltersCount}
          onResetFilters={handleResetFilters}
        />

        <div className="flex-1 min-w-0 space-y-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground pb-1">
            <span>{t("resultsFound", { count: totalProducts })}</span>
          </div>

          <ProductsGrid
            products={products}
            isLoading={isLoading}
            currentPage={parsedParams.page || 1}
            totalPages={totalPages}
            onPageChange={(page) => setFilterParam({ page: String(page) })}
            onResetFilters={handleResetFilters}
            isRtl={isRtl}
          />
        </div>
      </div>
    </div>
  )
}
