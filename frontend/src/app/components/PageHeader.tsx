import { Button } from './ui/Button';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

export function PageHeader({
  title,
  subtitle,
  buttonLabel,
  onButtonClick,
}: PageHeaderProps) {
  return (
    <header className="flex flex-col w-full md:flex-row gap-5">
      <div className="flex flex-col flex-1 justify-center items-start">
        <h1 className="text-gray-800 text-3xl font-black leading-tight tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm font-normal text-graphite">{subtitle}</p>
        )}
      </div>
      {buttonLabel && (
        <div>
          <Button type="button" onClick={onButtonClick}>
            {buttonLabel}
          </Button>
        </div>
      )}
    </header>
  );
}
