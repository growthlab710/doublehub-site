import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg';
  surface?: 'default' | 'alt';
}

/**
 * LP 用のセクション共通コンポーネント。
 * 上下余白と背景トーンを切替。
 */
export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing = 'lg', surface = 'default', ...props }, ref) => {
    const spacingClass = {
      sm: 'py-10 md:py-14',
      md: 'py-16 md:py-20',
      lg: 'py-20 md:py-28',
    }[spacing];
    const surfaceClass =
      surface === 'alt' ? 'bg-surface-2/40' : 'bg-transparent';
    return (
      <section
        ref={ref}
        className={cn(spacingClass, surfaceClass, className)}
        {...props}
      />
    );
  }
);

Section.displayName = 'Section';
