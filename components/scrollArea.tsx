import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { ReactNode } from "react";

function ScrollArea({ asChild, type, scrollHideDelay, dir, className, children }: { asChild?: boolean, type?: "auto" | "always" | "scroll" | "hover", scrollHideDelay?: number, dir?: "ltr" | "rtl", className?: string, children?: ReactNode }) {
    return (
        <ScrollAreaPrimitive.Root
            asChild={asChild}
            type={type}
            scrollHideDelay={scrollHideDelay}
            dir={dir}
            className={" rounded " + className}
        >
            {children}
        </ScrollAreaPrimitive.Root>
    )
}

function Viewport({ asChild, className, children }: { asChild?: boolean, className?: string, children?: ReactNode }) {
    return (
        <ScrollAreaPrimitive.Viewport
            asChild={asChild}
            className={"w-full h-full " + className}
        >
            {children}
        </ScrollAreaPrimitive.Viewport>
    )
}

function Scrollbar({ asChild, forceMount, orientation, className, children }: { asChild?: boolean, forceMount?: true | undefined, orientation?: "vertical" | "horizontal", className?: string, children?: ReactNode }) {
    return (
        <ScrollAreaPrimitive.Scrollbar
            asChild={asChild}
            forceMount={forceMount}
            orientation={orientation}
            className={"bg-white/10 h-2 rounded-b " + className}
        >
            {children}
        </ScrollAreaPrimitive.Scrollbar>
    )
}

function Thumb({ asChild, classNames, children }: { asChild?: boolean, classNames?: string, children?: ReactNode }) {
    return (
        <ScrollAreaPrimitive.Thumb
            asChild={asChild}
            className={"bg-white/30 h-2 rounded hover:bg-white/40 " + classNames}
            style={{height: "0.5rem"}}
        >
            {children}
        </ScrollAreaPrimitive.Thumb>
    )
}

function Corner({ asChild, classNames, children }: { asChild?: boolean, classNames?: string, children?: ReactNode }) {
    return (
        <ScrollAreaPrimitive.Corner
            className={" " + classNames}
            asChild={asChild}
        >
            {children}
        </ScrollAreaPrimitive.Corner>
    )
}

export { ScrollArea, Viewport, Scrollbar, Thumb, Corner };