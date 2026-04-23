import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  width?: 'narrow' | 'default' | 'wide';
}

/**
 * サイト共通コンテナ。max-width は 3 段階から選択。
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, width = 'default', ...props }, ref) => {
    const widthClass = {
      narrow: 'container-narrow',
      default: 'container-default',
      wide: 'container-wide',
    }[width];
    return <div ref={ref} className={cn(widthClass, className)} {...props} />;
  }
);

Container.displayName = 'Container';
