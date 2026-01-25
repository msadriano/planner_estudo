import type {
  TextareaHTMLAttributes,
  ReactNode,
  ChangeEventHandler,
} from 'react';
import { cn } from '@/app/utils/cn';

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  legend?: string;
  children?: ReactNode;
  value?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

export function TextArea({
  legend,
  className,
  children,
  value,
  onChange,
  ...props
}: InputProps) {
  return (
    <fieldset className="flex flex-col items-start justify-center gap-1 w-full">
      <div className="flex flex-row w-full items-center justify-between">
        {legend && (
          <label className={`text-gray-800 font-semibold text-sm`}>
            {legend}
          </label>
        )}
      </div>
      <div className="relative w-full group">
        <textarea
          value={value}
          onChange={onChange}
          className={cn(
            'w-full bg-transparent border-2  outline-none rounded-xl border-gray-200 text-graphite font-semibold placeholder:text-gray-300 placeholder:font-normal text-xs py-3 px-4 transition-all focus-within:border-blue-primary',
            className,
          )}
          {...props}
        >
          {children}
        </textarea>
      </div>
    </fieldset>
  );
}
