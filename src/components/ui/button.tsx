import * as React from 'react'
import { cn } from '@/lib/utils'

type Variant = 'default' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'default' | 'lg'

const base =
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-transparent'

const variants: Record<Variant, string> = {
  default: 'bg-indigo-600 text-white hover:bg-indigo-500',
  secondary: 'bg-white/10 text-white hover:bg-white/20',
  outline: 'border border-white/20 bg-transparent hover:bg-white/10',
  ghost: 'bg-transparent hover:bg-white/10',
}

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3',
  default: 'h-10 px-4',
  lg: 'h-11 px-5 text-base',
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'
