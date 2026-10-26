import { ViewTransition } from "react";
import type { ReactNode } from "react";

export function PageTransition({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <ViewTransition
            enter="page-enter"
            exit="page-exit"
        >
            {children}
        </ViewTransition>
    );
}