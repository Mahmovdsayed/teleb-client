"use client"

import React from "react"
import { Search, X } from "lucide-react"

interface SearchInputProps {
    value: string
    onChange: (v: string) => void
    placeholder: string
    onFocus?: () => void
    onSubmit?: (e: React.FormEvent) => void
    onClear?: () => void
    autoFocus?: boolean
    isAr?: boolean
    className?: string
}

export default function SearchInput({
    value,
    onChange,
    placeholder,
    onFocus,
    onSubmit,
    onClear,
    autoFocus,
    isAr = false,
    className = "",
}: SearchInputProps) {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                if (onSubmit) onSubmit(e)
            }}
            className={`relative w-full ${className}`}
        >
            <Search
                className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground ${isAr ? "right-3.5" : "left-3.5"
                    }`}
            />
            <input
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={onFocus}
                placeholder={placeholder}
                autoFocus={autoFocus}
                dir={isAr ? "rtl" : "ltr"}
                className={`h-10 w-full rounded-full border border-border/40 bg-muted/30 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground hover:bg-muted/50 focus:border-primary/40 focus:bg-background focus:ring-2 focus:ring-primary/20 ${isAr ? "pl-9 pr-10" : "pl-10 pr-9"
                    }`}
            />
            {value.trim().length > 0 && onClear && (
                <button
                    type="button"
                    onClick={onClear}
                    className={`absolute top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground ${isAr ? "left-2.5" : "right-2.5"
                        }`}
                    aria-label="Clear search"
                >
                    <X className="h-3.5 w-3.5" />
                </button>
            )}
        </form>
    )
}
