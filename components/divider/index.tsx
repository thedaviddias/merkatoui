'use client'

import * as React from 'react'
import { cn } from '@merkatoui/shadcn-ui/lib/utils'

/**
 * A simple divider component to visually separate content
 *
 * @param props - Component props
 * @param props.className - Additional CSS classes
 * @param props.orientation - Orientation of the divider ('horizontal' or 'vertical')
 * @param props.color - Color variant of the divider
 *
 * @returns React component
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider orientation="vertical" />
 * <Divider color="primary" />
 * ```
 */
export type DividerProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: 'horizontal' | 'vertical'
  color?: 'default' | 'primary' | 'secondary'
}

export const Divider = ({
  className,
  orientation = 'horizontal',
  color = 'default',
  ...props
}: DividerProps) => {
  const colorClasses = {
    default: 'bg-border',
    primary: 'bg-primary',
    secondary: 'bg-secondary'
  }

  return (
    <div
      className={cn(
        colorClasses[color],
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className
      )}
      {...props}
    />
  )
}
