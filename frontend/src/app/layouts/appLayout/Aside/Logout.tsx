//import { useAuth } from '@/hooks/useAuth'
import { LogoutOutlined } from '@mui/icons-material';
import { cn } from '../../../utils/cn';
import { useContext } from 'react';
import { AuthContext } from '@/app/store/AuthContext';

interface SideBarProps {
  isCollapsed?: boolean;
  isMenuOpen?: boolean;
}

export function Logout({ isCollapsed, isMenuOpen }: SideBarProps) {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div
      className={cn(
        `border-t-2 border-gray-200 flex px-4 py-6 w-full items-center gap-1.5`,
        isCollapsed && !isMenuOpen ? 'flex-col' : 'flex-row',
      )}
    >
      <div className="h-8 w-8 bg-blue-primary rounded-full overflow-hidden">
        <img
          src="https://github.com/shadcn.png"
          alt="Avatar"
          className="h-full w-full object-cover"
        />
      </div>
      <div
        className={cn(
          isCollapsed && !isMenuOpen ? 'hidden' : 'flex flex-col flex-1 gap-0',
        )}
      >
        <span className="text-[10px] text-graphite font-bold leading-2">
          {user?.name}
        </span>
        <span className="text-[10px] text-graphite ">{user?.email}</span>
      </div>
      <button
        onClick={logOut}
        className={`text-graphite hover:text-red-500 hover:scale-130 cursor-pointer flex items-center justify-center transition-all `}
      >
        <LogoutOutlined sx={{ fontSize: 16 }} />
      </button>
    </div>
  );
}
