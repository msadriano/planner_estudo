import type { InputHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/app/utils/cn';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  legend?: string;
  recovery?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export function Input({
  legend,
  iconLeft,
  iconRight,
  recovery,
  type,
  className,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <fieldset className="flex flex-col items-start justify-center gap-1 w-full">
      <div className="flex flex-row w-full items-center justify-between">
        {legend && (
          <label className={`text-gray-800 font-semibold text-sm`}>
            {legend}
          </label>
        )}
        {recovery && (
          <Link
            to="/auth/passwordrecovery"
            className="hover:underline text-blue-primary text-xs font-semibold"
          >
            {recovery}
          </Link>
        )}
      </div>
      <div className="relative w-full group">
        {iconLeft && (
          <span className="text-gray-300 pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 flex items-center group-focus-within:text-blue-primary">
            {iconLeft}
          </span>
        )}
        <input
          {...props}
          type={inputType}
          className={cn(
            'w-full bg-transparent border-2  outline-none rounded-xl border-gray-200 text-graphite font-semibold placeholder:text-gray-300 placeholder:font-normal text-xs py-3 transition-all focus-within:border-blue-primary',
            iconLeft ? 'pl-10' : 'pl-4',
            iconRight || type === 'password' ? 'pr-10' : 'pr-4',
            className,
          )}
        />

        <div className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center">
          {type === 'password' ? (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-300 hover:text-gray-500 transition-colors flex items-center justify-center cursor-pointer"
            >
              {showPassword ? (
                <VisibilityOff sx={{ fontSize: 16 }} />
              ) : (
                <Visibility sx={{ fontSize: 16 }} />
              )}
            </button>
          ) : (
            iconRight && (
              <span className="text-gray-300 pointer-events-none">
                {iconRight}
              </span>
            )
          )}
        </div>
      </div>
    </fieldset>
  );
}
