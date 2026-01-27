import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
}

export function Button({
  children,
  iconLeft,
  iconRight,
  variant = 'primary',
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <div className="w-full flex items-center justify-center">
      <button
        disabled={disabled}
        className={cn(
          'rounded-xl px-6 py-2.5 shadow-lg transition-all shadow-blue-primary/20 w-full flex items-center justify-center gap-3',
          'text-white font-semibold text-base',
          'bg-blue-primary hover:bg-blue-600 cursor-pointer',
          'disabled:hover:bg-blue-primary disabled:pointer-events-none disabled:opacity-70 disabled:cursor-not-allowed',
          className,
        )}
        {...props}
      >
        {iconLeft && <span className="flex items-center">{iconLeft}</span>}
        {children}
        {iconRight && <span className="flex items-center">{iconRight}</span>}
      </button>
    </div>
  );
}
