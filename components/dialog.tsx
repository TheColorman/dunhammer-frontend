import * as DialogP from '@radix-ui/react-dialog'
import React, { ReactNode } from 'react'
import type { PointerDownOutsideEvent, FocusOutsideEvent } from "@radix-ui/react-dismissable-layer"

function Dialog({ defaultOpen, open, onOpenChange, modal, allowPinchZoom, children }: { defaultOpen?: boolean, open?: boolean, onOpenChange?: (open: boolean) => void, modal?: boolean, allowPinchZoom?: boolean, children?: ReactNode }) {
  return (
    <DialogP.Root
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      modal={modal}
      allowPinchZoom={allowPinchZoom}
    >
      {children}
    </DialogP.Root>
  )
}

function Trigger({ asChild, className, children }: { asChild?: boolean, className?: string, children?: ReactNode }) {
  return (
    <DialogP.Trigger
      asChild={asChild}
      className={" " + className}
    >
      {children}
    </DialogP.Trigger>
  )
}

function Portal({ forceMount, container, className, children }: { forceMount?: true, container?: HTMLElement, className?: string, children?: ReactNode }) {
  return (
    <DialogP.Portal
      forceMount={forceMount}
      container={container}
      className={" " + className}
    >
      {children}
    </DialogP.Portal>
  )
}

function Overlay({ asChild, forceMount, className, children }: { asChild?: boolean, forceMount?: true, className?: string, children?: ReactNode }) {
  return (
    <DialogP.Overlay
      asChild={asChild}
      forceMount={forceMount}
      className={" " + className}
    >
      {children}
    </DialogP.Overlay>
  )
}

function Content({ asChild, forceMount, onOpenAutoFocus, onCloseAutoFocus, onEscapeKeyDown, onPointerDownOutside, onInteractOutside, className, children }: { asChild?: boolean, forceMount?: true, onOpenAutoFocus?: (event: Event) => void, onCloseAutoFocus?: (event: Event) => void, onEscapeKeyDown?: (event: KeyboardEvent) => void, onPointerDownOutside?: (event: PointerDownOutsideEvent) => void, onInteractOutside?: (event: PointerDownOutsideEvent | FocusOutsideEvent) => void, className?: string, children?: ReactNode }) {
  return (
    <DialogP.Content
      asChild={asChild}
      forceMount={forceMount}
      onOpenAutoFocus={onOpenAutoFocus}
      onCloseAutoFocus={onCloseAutoFocus}
      onEscapeKeyDown={onEscapeKeyDown}
      onPointerDownOutside={onPointerDownOutside}
      onInteractOutside={onInteractOutside}
      className={" " + className}
    >
      {children}
    </DialogP.Content>
  )
}

function Close({ asChild, className, children }: { asChild?: boolean, className?: string, children?: ReactNode }) {
  return (
    <DialogP.Close
      asChild={asChild}
      className={" " + className}
    >
      {children}
    </DialogP.Close>
  )
}

function Title({ asChild, className, children }: { asChild?: boolean, className?: string, children?: ReactNode }) {
  return (
    <DialogP.Title
      asChild={asChild}
      className={" " + className}
    >
      {children}
    </DialogP.Title>
  )
}

function Description({ asChild, className, children }: { asChild?: boolean, className?: string, children?: ReactNode }) {
  return (
    <DialogP.Description
      asChild={asChild}
      className={" " + className}
    >
      {children}
    </DialogP.Description>
  )
}

export { Dialog, Trigger, Portal, Overlay, Content, Close, Title, Description }