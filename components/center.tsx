import { ReactNode } from "react"

export default function Center({ children }: { children: ReactNode }) {
    return (
        <div className="h-screen flex items-center justify-center flex-col">
            {children}
        </div>
    )
}