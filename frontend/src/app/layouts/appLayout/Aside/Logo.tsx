import { cn } from '@/app/utils/cn';
import { MenuBook } from '@mui/icons-material';

interface SideBarProps {
  isCollapsed?: boolean;
  isMenuOpen?: boolean;
  className?: string;
}

export function Logo({ isCollapsed, isMenuOpen, className }: SideBarProps) {
  return (
    <div
      className={cn(
        `flex flex-row items-center py-2 ${isMenuOpen ? 'justify-start gap-1 px-2' : isCollapsed ? 'justify-center px-0' : 'justify-start gap-1 px-2'}`,
        className,
      )}
    >
      <div className="w-full flex flex-row items-center justify-center gap-1.5">
        <div className="w-6 h-6 flex items-center justify-center rounded-md bg-blue-primary mb-1 ">
          <MenuBook
            className="text-white transition-all"
            sx={{ fontSize: 14 }}
          />
        </div>
        <span className="text-2xl font-black tracking-tight text-blue-primary transition-all">
          Planner
        </span>
      </div>
    </div>
  );
}
