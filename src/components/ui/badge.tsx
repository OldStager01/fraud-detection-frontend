import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300',
        success: 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-400',
        warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-400',
        danger: 'bg-danger-100 text-danger-800 dark:bg-danger-900/30 dark:text-danger-400',
        info: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400',
        outline: 'border border-neutral-300 dark:border-neutral-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };