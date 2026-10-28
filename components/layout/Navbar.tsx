"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import { ChevronDown, Menu, Moon, Search, Sun, X, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import SearchInput from "./Navbar/SearchInput"
import SearchResultsDropdown from "./Navbar/SearchResultsDropdown"
import { useAppQuery } from "@/hooks/useAppQuery"
import { getCollections } from "@/services/collection"
import { searchProducts } from "@/services/product"
import type { Collection } from "@/types/Collection.types"
import type { Product } from "@/types/Product.types"
import type { SearchResultsProps } from "./Navbar/types"
import { CollectionIcon } from "@/components/ui/CollectionIcon"

const NAV_LINK_CLASS =
    "rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-150 hover:bg-muted/60 hover:text-foreground"
const ICON_BTN_CLASS = "rounded-full transition-transform active:scale-95"

export default function Navbar() {
    const t = useTranslations("navbar")
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    const isAr = locale === "ar"

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [debouncedQuery, setDebouncedQuery] = useState("")
    const [showSearchResults, setShowSearchResults] = useState(false)
    const [isCollectionsOpen, setIsCollectionsOpen] = useState(false)
    const [isMobileCollectionsOpen, setIsMobileCollectionsOpen] = useState(false)

    const collectionsDropdownRef = useRef<HTMLDivElement>(null)
    const desktopSearchRef = useRef<HTMLDivElement>(null)
    const mobileSearchRef = useRef<HTMLDivElement>(null)

    const { data: collections = [], isLoading: isCollectionsLoading } = useAppQuery<Collection[]>({
        queryKey: ["collections"],
        queryFn: getCollections,
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery.trim())
        }, 300)
        return () => clearTimeout(timer)
    }, [searchQuery])

    const isTermValid = debouncedQuery.length >= 2

    const { data: searchProductData, isLoading: isProductSearchLoading } = useAppQuery<{
        products: Product[]
        total: number
    }>({
        queryKey: ["products-search", debouncedQuery, locale],
        queryFn: () =>
            searchProducts({
                q: debouncedQuery,
                limit: 5,
                lang: locale as "ar" | "en",
            }),
        enabled: isTermValid,
    })

    const matchingCollections = useMemo(() => {
        if (!isTermValid) return []
        const term = debouncedQuery.toLowerCase()
        return collections.filter(
            (c) =>
                c.arName.toLowerCase().includes(term) ||
                c.enName.toLowerCase().includes(term)
        )
    }, [collections, debouncedQuery, isTermValid])

    const productsResult = searchProductData?.products ?? []
    const isSearching =
        isTermValid &&
        (isProductSearchLoading || searchQuery.trim() !== debouncedQuery)
    const hasResults = productsResult.length > 0 || matchingCollections.length > 0

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node
            if (
                collectionsDropdownRef.current &&
                !collectionsDropdownRef.current.contains(target)
            ) {
                setIsCollectionsOpen(false)
            }
            if (
                desktopSearchRef.current &&
                !desktopSearchRef.current.contains(target)
            ) {
                setShowSearchResults(false)
            }
            if (
                mobileSearchRef.current &&
                !mobileSearchRef.current.contains(target)
            ) {
                setShowSearchResults(false)
            }
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsCollectionsOpen(false)
                setShowSearchResults(false)
                setIsSearchOpen(false)
                setIsMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    const navLinks = [
        { href: "/", label: t("home") },
        { href: "/products", label: t("products") },
        { href: "/about", label: t("about") },
        { href: "/contact", label: t("contact") },
    ]

    const localePath = (href: string) => `/${locale}${href === "/" ? "" : href}`


    const handleSearchChange = (value: string) => {
        setSearchQuery(value)
        if (value.trim().length >= 2) {
            setShowSearchResults(true)
        } else {
            setShowSearchResults(false)
        }
    }

    const handleSearchSubmit = () => {
        if (searchQuery.trim()) {
            router.push(`/${locale}/products?search=${encodeURIComponent(searchQuery.trim())}`)
            closeSearch()
        }
    }

    const closeSearch = () => {
        setShowSearchResults(false)
        setIsSearchOpen(false)
        setSearchQuery("")
    }

    const handleProductClick = (slug: string) => {
        router.push(`/${locale}/products/${slug}`)
        closeSearch()
    }

    const handleCollectionClick = (collection: Collection) => {
        router.push(`/${locale}/products?collectionId=${collection.id}`)
        setIsCollectionsOpen(false)
        setIsMobileCollectionsOpen(false)
        setIsMenuOpen(false)
        closeSearch()
    }

    const handleViewMore = () => {
        if (searchQuery.trim()) {
            router.push(`/${locale}/products?search=${encodeURIComponent(searchQuery.trim())}`)
            closeSearch()
        }
    }

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    const switchLocale = () => {
        const newLocale = locale === "ar" ? "en" : "ar"
        const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), "") || "/"
        window.location.href = `/${newLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`
    }

    const sharedSearchProps: SearchResultsProps = {
        isSearching,
        hasResults,
        searchQuery,
        products: productsResult,
        collections: matchingCollections,
        isAr,
        onProductClick: handleProductClick,
        onCollectionClick: handleCollectionClick,
        onViewMore: handleViewMore,
    }

    return (
        <nav
            style={{ viewTransitionName: "site-navbar" }}
            className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 transition-colors"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between gap-4">
                    <Link
                        id="navbar-logo"
                        href={localePath("/")}
                        className="shrink-0 py-1 text-base md:text-lg font-bold tracking-tight text-foreground transition-opacity hover:opacity-85"
                    >
                        {isAr ? t("logoAr") : t("logoEn")}
                    </Link>

                    <div className="hidden items-center gap-1 lg:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={localePath(link.href)}
                                className={NAV_LINK_CLASS}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div ref={collectionsDropdownRef} className="relative">
                            <button
                                id="navbar-collections-trigger"
                                type="button"
                                onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
                                className={`flex items-center gap-1.5 ${NAV_LINK_CLASS}`}
                                aria-expanded={isCollectionsOpen}
                            >
                                <span>{t("collections")}</span>
                                {isCollectionsLoading ? (
                                    <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                                ) : (
                                    <ChevronDown
                                        className={`h-4 w-4 transition-transform duration-200 ${isCollectionsOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                )}
                            </button>

                            {isCollectionsOpen && (
                                <div
                                    id="navbar-collections-dropdown"
                                    className="absolute top-full mt-2 w-60 overflow-hidden rounded-xl border border-border/60 bg-background/95 p-1.5 shadow-2xl backdrop-blur-md animate-in slide-in-from-top-2 duration-200"
                                    style={{ insetInlineStart: 0 }}
                                >
                                    <div className="max-h-72 overflow-y-auto">
                                        {isCollectionsLoading ? (
                                            <div className="flex items-center justify-center py-6">
                                                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                            </div>
                                        ) : collections.length > 0 ? (
                                            collections.map((col) => (
                                                <button
                                                    key={col.id}
                                                    type="button"
                                                    onClick={() => handleCollectionClick(col)}
                                                    className="flex w-full items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-start text-sm text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
                                                >
                                                    {col.icon ? (
                                                        <CollectionIcon name={col.icon} className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                                                    ) : (
                                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-muted text-[10px] font-bold">
                                                            {(isAr ? col.arName : col.enName).charAt(0)}
                                                        </span>
                                                    )}
                                                    <span className="truncate">{isAr ? col.arName : col.enName}</span>
                                                </button>
                                            ))
                                        ) : (
                                            <p className="px-4 py-3 text-sm text-muted-foreground">
                                                {t("noCollections")}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div ref={desktopSearchRef} className="relative hidden flex-1 max-w-sm md:block">
                        <SearchInput
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onSubmit={handleSearchSubmit}
                            onClear={() => {
                                setSearchQuery("")
                                setShowSearchResults(false)
                            }}
                            onFocus={() => {
                                if (searchQuery.trim().length >= 2) setShowSearchResults(true)
                            }}
                            placeholder={t("search")}
                            isAr={isAr}
                        />
                        {showSearchResults && <SearchResultsDropdown {...sharedSearchProps} />}
                    </div>

                    <div className="flex items-center gap-1.5">
                        <Button
                            id="navbar-search-toggle"
                            variant="ghost"
                            size="icon"
                            aria-label={t("toggleSearch")}
                            className={`${ICON_BTN_CLASS} md:hidden`}
                            onClick={() => {
                                setIsSearchOpen(!isSearchOpen)
                                setShowSearchResults(false)
                            }}
                        >
                            <Search className="h-5 w-5" />
                        </Button>

                        <Button
                            id="navbar-theme-toggle"
                            variant="ghost"
                            size="icon"
                            aria-label={t("toggleTheme")}
                            className={`relative ${ICON_BTN_CLASS}`}
                            onClick={toggleTheme}
                        >
                            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        </Button>

                        <Button
                            id="navbar-lang-toggle"
                            variant="ghost"
                            size="icon"
                            aria-label={t("switchLang")}
                            className={ICON_BTN_CLASS}
                            onClick={switchLocale}
                        >
                            <span className="text-xs font-bold tracking-wider">{isAr ? "EN" : "AR"}</span>
                        </Button>

                        <Button
                            id="navbar-menu-toggle"
                            variant="ghost"
                            size="icon"
                            aria-label={t("toggleMenu")}
                            className={`${ICON_BTN_CLASS} lg:hidden`}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>

                {isSearchOpen && (
                    <div
                        ref={mobileSearchRef}
                        id="navbar-mobile-search"
                        className="relative pb-4 pt-1 md:hidden animate-in slide-in-from-top-2 duration-200"
                    >
                        <SearchInput
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onSubmit={handleSearchSubmit}
                            onClear={() => {
                                setSearchQuery("")
                                setShowSearchResults(false)
                            }}
                            placeholder={t("search")}
                            autoFocus
                            isAr={isAr}
                        />
                        {showSearchResults && <SearchResultsDropdown {...sharedSearchProps} />}
                    </div>
                )}

                {isMenuOpen && (
                    <div
                        id="navbar-mobile-menu"
                        className="border-t border-border/40 pb-5 pt-3 lg:hidden animate-in slide-in-from-top-2 duration-200"
                    >
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={localePath(link.href)}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`${NAV_LINK_CLASS} py-3`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <div>
                                <button
                                    id="navbar-mobile-collections-trigger"
                                    type="button"
                                    onClick={() => setIsMobileCollectionsOpen(!isMobileCollectionsOpen)}
                                    className={`flex w-full items-center justify-between ${NAV_LINK_CLASS} py-3`}
                                >
                                    <span>{t("collections")}</span>
                                    <ChevronDown
                                        className={`h-4 w-4 transition-transform duration-200 ${isMobileCollectionsOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {isMobileCollectionsOpen && (
                                    <div
                                        id="navbar-mobile-collections-list"
                                        className="space-y-1 py-1 ps-4 animate-in slide-in-from-top-1 duration-150"
                                    >
                                        {isCollectionsLoading ? (
                                            <div className="flex items-center py-2 ps-3">
                                                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                            </div>
                                        ) : collections.length > 0 ? (
                                            collections.map((col) => (
                                                <button
                                                    key={col.id}
                                                    type="button"
                                                    onClick={() => handleCollectionClick(col)}
                                                    className="flex w-full items-center gap-2.5 rounded-lg px-3.5 py-2 text-start text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                                                >
                                                    {col.icon ? (
                                                        <CollectionIcon name={col.icon} className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                                                    ) : (
                                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-muted text-[10px] font-bold">
                                                            {(isAr ? col.arName : col.enName).charAt(0)}
                                                        </span>
                                                    )}
                                                    <span className="truncate">{isAr ? col.arName : col.enName}</span>
                                                </button>
                                            ))
                                        ) : (
                                            <p className="px-3.5 py-2 text-sm text-muted-foreground">
                                                {t("noCollections")}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
