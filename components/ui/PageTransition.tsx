import { ViewTransition } from "react"

export function PageTransition({ children }: { children: React.ReactNode }) {
    return (
        <ViewTransition
            enter="page-enter"
            exit="page-exit"
            default="none"
        >
            {children}
        </ViewTransition>
    )
}
