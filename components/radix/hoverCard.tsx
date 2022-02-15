import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { ReactNode } from 'react';

function HoverCard({ defaultOpen, open, onOpenChange, openDelay, closeDelay, children }: { defaultOpen?: boolean, open?: boolean, onOpenChange?: (open: boolean) => void, openDelay?: number, closeDelay?: number, children?: ReactNode }) {
    return (
        <HoverCardPrimitive.Root
            defaultOpen={defaultOpen}
            open={open}
            onOpenChange={onOpenChange}
            openDelay={openDelay}
            closeDelay={closeDelay}
        >
            {children}
        </HoverCardPrimitive.Root>
    )
}

function Trigger({ asChild, children, className }: { asChild?: boolean, children?: ReactNode, className?: string }) {
    return (
        <HoverCardPrimitive.Trigger
            asChild={asChild}
            className={className}
        >
            {children}
        </HoverCardPrimitive.Trigger>
    )
}

function Content({ asChild, forceMount, portalled, side, sideOffset, align, alignOffset, avoidCollisions, collisionTolerance, children, className }: { asChild?: boolean, forceMount?: true | undefined, portalled?: boolean, side?: "top" | "right" | "bottom" | "left", sideOffset?: number, align?: "start" | "center" | "end", alignOffset?: number, avoidCollisions?: boolean, collisionTolerance?: number, children?: ReactNode, className?: string }) {
    return (
        <HoverCardPrimitive.Content
            asChild={asChild}
            forceMount={forceMount}
            portalled={portalled}
            side={side}
            sideOffset={sideOffset}
            align={align}
            alignOffset={alignOffset}
            avoidCollisions={avoidCollisions}
            collisionTolerance={collisionTolerance}
            className={"p-2 rounded-lg bg-gray-800/80 " + className}
        >
            {children}
        </HoverCardPrimitive.Content>
    )
}

function Arrow({ asChild, width, height, offset, children, className }: { asChild?: boolean, width?: number, height?: number, offset?: number, children?: ReactNode, className?: string }) {
    return (
        <HoverCardPrimitive.Arrow
            asChild={asChild}
            width={width}
            height={height}
            offset={offset}
            className={"fill-gray-800/80 " + className}
        >
            {children}
        </HoverCardPrimitive.Arrow>
    )
}

export { HoverCard, Trigger, Content, Arrow }