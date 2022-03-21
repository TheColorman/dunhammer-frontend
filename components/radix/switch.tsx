import * as SwitchPrimitive from '@radix-ui/react-switch';
import { ReactNode } from 'react';

function Switch({ asChild, defaultChecked, checked, onCheckedChange, disabled, required, name, value, children, className }: { asChild?: boolean, defaultChecked?: boolean, checked?: boolean, onCheckedChange?: (checked: boolean) => void, disabled?: boolean, required?: boolean, name?: string, value?: string, children?: ReactNode, className?: string }) {
  return (
    <SwitchPrimitive.Root
      asChild={asChild}
      defaultChecked={defaultChecked}
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      required={required}
      name={name}
      value={value}
      className={className}
    >
      {children}
    </SwitchPrimitive.Root>
  )
}

function Thumb({ asChild, children, className }: { asChild?: boolean, children?: ReactNode, className?: string }) {
  return (
    <SwitchPrimitive.Thumb
      asChild={asChild}
      className={className}
    >
      {children}
    </SwitchPrimitive.Thumb>
  )
}

export { Switch, Thumb }