"use client"

import { useTranslations } from "next-intl"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { SortOption } from "./types"

interface ProductsSortSelectProps {
  value: SortOption
  onChange: (value: SortOption) => void
  className?: string
}

export function ProductsSortSelect({
  value,
  onChange,
  className = "",
}: ProductsSortSelectProps) {
  const t = useTranslations("productsPage")

  const sortLabels: Record<SortOption, string> = {
    newest: t("sortNewest"),
    oldest: t("sortOldest"),
    name_asc: t("sortNameAsc"),
    name_desc: t("sortNameDesc"),
  }

  return (
    <Select
      value={value}
      onValueChange={(val) => {
        if (val) onChange(val as SortOption)
      }}
    >
      <SelectTrigger className={`h-9 min-w-[160px] text-xs font-medium ${className}`}>
        <SelectValue>
          {sortLabels[value]}
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="newest">{sortLabels.newest}</SelectItem>
        <SelectItem value="oldest">{sortLabels.oldest}</SelectItem>
        <SelectItem value="name_asc">{sortLabels.name_asc}</SelectItem>
        <SelectItem value="name_desc">{sortLabels.name_desc}</SelectItem>
      </SelectContent>
    </Select>
  )
}
