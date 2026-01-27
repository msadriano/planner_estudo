import { Button } from './ui/Button';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  iconLeft?: ReactNode;
  subtitle?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

export function PageHeader({
  title,
  subtitle,
  buttonLabel,
  iconLeft,
  onButtonClick,
}: PageHeaderProps) {
  return (
    <header className="flex flex-col w-full md:flex-row gap-5">
      <div className="flex flex-col flex-1 justify-center items-start">
        <h1 className="text-border-gray-800 text-3xl font-black leading-tight tracking-tight transition-all">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm font-normal text-graphite transition-all">
            {subtitle}
          </p>
        )}
      </div>
      {buttonLabel && (
        <div>
          <Button type="button" onClick={onButtonClick} iconLeft={iconLeft}>
            {buttonLabel}
          </Button>
        </div>
      )}
    </header>
  );
}
