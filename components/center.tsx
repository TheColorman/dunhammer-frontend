import { ReactNode } from "react"

export default function Center({ className, children }: { className?: string, children: ReactNode }) {
    return (
        <div className={"h-screen flex items-center justify-center flex-col " + className}>
            {children}
        </div>
    )
}