import React from 'react'
import { cn } from '../lib/utils';

export function Heading({ children, size, className, ...props }: {children: React.ReactNode,
     size: "h1"|"h2"|"h3"|"h4"|"h5"|"h6", className?:string
}) {
    const Component = size as keyof JSX.IntrinsicElements;

    const sizeClasses = {
        h1: "text-3xl",
        h2: "text-2xl",
        h3: "text-xl",
        h4: "text-lg",
        h5: "text-base",
        h6: "text-sm",
    }
  return (
    <Component className={cn("text-text font-semibold", sizeClasses[size as keyof typeof sizeClasses], className)}>
        {children}
    </Component>
  )
}
