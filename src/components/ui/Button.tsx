import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium',
    'transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'active:translate-y-px',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-text-inverse shadow-md hover:bg-primary-hover hover:shadow-lg',
        secondary:
          'border border-border bg-surface text-text hover:border-primary hover:text-primary',
        ghost: 'text-text hover:bg-surface-2',
        destructive:
          'bg-[#D83B3B] text-text-inverse hover:bg-[#B82F2F] shadow-md',
        link: 'text-primary underline-offset-4 hover:underline rounded',
        product:
          'bg-accent-product text-accent-product-fg shadow-md hover:opacity-90',
      },
      size: {
        sm: 'h-8 px-4 text-xs',
        md: 'h-11 px-6 text-sm',
        lg: 'h-13 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { buttonVariants };
