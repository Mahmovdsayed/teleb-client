"use client"

import CollectionCard from "./CollectionCard"
import type { CarouselItem } from "./types"

interface CardGroupProps {
    items: CarouselItem[]
    hoveredId: string | number | null
}

export default function CardGroup({ items, hoveredId }: CardGroupProps) {
    return (
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {items.map((item, index) => (
                <CollectionCard
                    key={`${item.id}-${index}`}
                    item={item}
                    isDimmed={hoveredId !== null && hoveredId !== item.id}
                />
            ))}
        </div>
    )
}
