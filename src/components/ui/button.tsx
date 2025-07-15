import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-helvetica font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ease-spring",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all duration-300",
        outline:
          "border border-border/50 bg-transparent hover:bg-glass-white hover:border-gianni-orange/50 hover:text-gianni-orange transition-all duration-300 ease-apple",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-300",
        ghost: "hover:bg-glass-white hover:text-gianni-orange transition-all duration-300 ease-apple",
        link: "text-gianni-orange underline-offset-4 hover:underline hover:text-gianni-orange-glow transition-colors duration-300",
        gianni: "bg-gradient-orange text-gianni-dark hover:bg-gradient-orange-soft hover:scale-[1.05] hover:shadow-orange-glow transition-all duration-400 ease-spring font-medium",
        "gianni-outline": "border border-gianni-orange/50 text-gianni-orange bg-transparent hover:bg-gianni-orange hover:text-gianni-dark hover:scale-[1.05] hover:shadow-orange transition-all duration-400 ease-spring",
        "gianni-ghost": "text-gianni-orange hover:bg-glass-orange hover:scale-[1.02] transition-all duration-300 ease-apple",
        "gianni-premium": "bg-glass-white backdrop-blur-sm border border-glass-border text-gianni-text-primary hover:bg-gianni-orange hover:text-gianni-dark hover:scale-[1.05] hover:shadow-orange-glow transition-all duration-500 ease-spring",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-13 rounded-2xl px-10 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
