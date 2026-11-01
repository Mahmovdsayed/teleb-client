"use client";

import dynamic from "next/dynamic";
import type { IconName } from "lucide-react/dynamic";

interface IconProps {
    name: string;
    className?: string;
    size?: number;
}

const DynamicIcon = dynamic(
    () => import("lucide-react/dynamic").then((m) => m.DynamicIcon),
    { ssr: false, loading: () => <span>📦</span> }
);

export function CollectionIcon({ name, className, size }: IconProps) {
    return (
        <DynamicIcon
            name={name as IconName}
            className={className}
            size={size}
            fallback={() => <span>📦</span>}
        />
    );
}

export const Icon = CollectionIcon;
export default CollectionIcon;
