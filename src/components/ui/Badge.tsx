import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold leading-tight',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary-soft text-primary',
        outline: 'border-border bg-transparent text-text-muted',
        warm: 'border-transparent bg-accent-warm-soft text-accent-warm',
        success: 'border-transparent bg-primary-soft text-primary',
        muted: 'border-transparent bg-surface-2 text-text-muted',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
