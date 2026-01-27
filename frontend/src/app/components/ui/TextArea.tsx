import type {
  TextareaHTMLAttributes,
  ReactNode,
  ChangeEventHandler,
} from 'react';
import { cn } from '@/app/utils/cn';

interface InputProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'value'
> {
  legend?: string;
  children?: ReactNode;
  value?: string | null;
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
          <label className={`text-border-gray-700 font-semibold text-sm transition-all`}>
            {legend}
          </label>
        )}
      </div>
      <div className="relative w-full group">
        <textarea
          value={value ?? ''}
          onChange={onChange}
          className={cn(
            'w-full bg-transparent border-2  outline-none rounded-xl border-border-gray-200 text-graphite font-semibold placeholder:text-gray-300 placeholder:font-normal text-xs py-3 px-4 transition-all focus-within:border-blue-primary',
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
