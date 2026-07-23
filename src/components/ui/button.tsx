import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import {
  ArrowDownUp,
  History,
  Import,
  Loader,
  Trash,
  Upload,
} from 'lucide-react';
import GlobalTooltip from '../global/GlobalTooltip';

const buttonVariants = cva(
  'inline-flex items-center cursor-pointer leading-none justify-center gap-1 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white hover:text-black border border-primary shadow-sm hover:bg-primary/15  ',
        foreground:
          'bg-foreground/90 dark:bg-foreground text-white dark:hover:text-white dark:text-pure-black dark:hover:bg-primary hover:text-white shadow-sm hover:bg-primary',
        tertiary: 'bg-tertiary text-white shadow-sm hover:bg-tertiary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-xs hover:bg-accent hover:border-primary hover:text-accent-foreground',
        secondary:
          'bg-secondary hover:bg-forground-border border border-secondary hover:bg-secondary/15 hover:text-black text-secondary-foreground stroke-secondary-foreground fill-secondary-foreground',
        primary_light:
          'bg-primary-light text-primary-white hover:bg-primary border hover:text-white stroke-primary fill-primary',
        'secondary-gray':
          'bg-secondary text-dark-gray hover:bg-secondary border border-secondary-border stroke-dark-gray fill-primary',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        plain: 'bg-tranparent text-dark-gray stroke-dark-gray fill-dark-gray',
        white:
          'bg-pure-white border border  text-primary stroke-dark-gray fill-dark-gray',
        export_button:
          'sm:size-9 size-8 rounded-md bg-primary-light hover:bg-secondary border',
        import_button:
          'sm:size-9 size-8 rounded-md bg-primary-light border hover:bg-secondary border-secondary-border',
        sort_button:
          'sm:size-9 size-8 rounded-md bg-primary-light border hover:bg-secondary border-secondary-border',
        recycle_button:
          'sm:size-9 size-8 rounded-md bg-primary-light border hover:bg-secondary border-secondary-border',
        history_button:
          'sm:size-9 size-8 rounded-md bg-primary-light border hover:bg-secondary border-secondary-border',
        delete_button:
          'sm:size-9 size-8 rounded-md bg-danger/20 text-danger border hover:bg-secondary border-secondary-border',
        danger_light:
          'rounded-md bg-destructive/20 text-destructive border hover:text-white hover:bg-destructive border-destructive/30',
      },
      size: {
        default:
          ' sm:h-9 h-8 px-2 sm:text-sm text-xs sm:px-3 py-1 sm:py-2 rounded-lg font-semibold',
        sm: 'h-8 rounded-md px-2 sm:px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'sm:size-9 size-8',
        fit: 'sm:size-fit size-fit p-0 m-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
  isLoading?: boolean;
  tooltip?: string;
  customClassName?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      customClassName,
      size,
      asChild = false,
      isLoading,
      children,
      disabled,
      tooltip,
      icon,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    const buttonComp = (
      <Comp
        disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {variant === 'export_button' ? (
          isLoading ? (
            <Loader className={cn('stroke-dark-gray size-4 animate-spin')} />
          ) : (
            <Upload className="stroke-dark-gray" />
          )
        ) : variant === 'import_button' ? (
          isLoading ? (
            <Loader className={cn('stroke-dark-gray size-4 animate-spin')} />
          ) : (
            <Import className="stroke-dark-gray" />
          )
        ) : variant === 'sort_button' ? (
          isLoading ? (
            <Loader className={cn('stroke-dark-gray size-4 animate-spin')} />
          ) : (
            <ArrowDownUp size={18} className="stroke-dark-gray" />
          )
        ) : variant === 'recycle_button' ? (
          isLoading ? (
            <Loader className={cn('stroke-primary size-4 animate-spin')} />
          ) : (
            <Loader />
          )
        ) : variant === 'history_button' ? (
          isLoading ? (
            <Loader className={cn('stroke-dark-gray size-4 animate-spin')} />
          ) : (
            <History className="stroke-dark-gray" size={20} />
          )
        ) : variant === 'delete_button' ? (
          isLoading ? (
            <Loader className={cn('stroke-dark-gray size-4 animate-spin')} />
          ) : (
            <Trash size={20} />
          )
        ) : (
          <div
            className={cn(
              'flex items-center gap-1 leading-none',
              customClassName,
            )}
          >
            {isLoading ? (
              <Loader
                className={cn('size-4 animate-spin stroke-white', {
                  'stroke-primary': variant === 'secondary',
                  'stroke-dark-gray':
                    variant === 'secondary-gray' || variant === 'plain',
                })}
              />
            ) : (
              icon
            )}
            {children}
          </div>
        )}
      </Comp>
    );

    const withTooltip =
      tooltip ||
      variant === 'export_button' ||
      variant === 'import_button' ||
      variant === 'sort_button' ||
      variant === 'recycle_button' ||
      variant === 'history_button';

    const customTooltip = tooltip
      ? tooltip
      : variant === 'export_button'
        ? 'Export'
        : variant === 'import_button'
          ? 'Import'
          : variant === 'sort_button'
            ? 'Sort'
            : variant === 'recycle_button'
              ? 'Recycle'
              : variant === 'history_button'
                ? 'History'
                : '';

    return withTooltip ? (
      <GlobalTooltip tooltip={customTooltip}>{buttonComp}</GlobalTooltip>
    ) : (
      buttonComp
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
