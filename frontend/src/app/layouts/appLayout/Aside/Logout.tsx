import { LogoutOutlined } from '@mui/icons-material';
import { cn } from '../../../utils/cn';
import { useContext } from 'react';
import { AuthContext } from '@/app/store/AuthContext';
import { useProfile } from '@/features/profile/hooks/useProfile';

interface SideBarProps {
  isCollapsed?: boolean;
  isMenuOpen?: boolean;
}

export function Logout({ isCollapsed, isMenuOpen }: SideBarProps) {
  const { user, logOut } = useContext(AuthContext);
  const { userData } = useProfile();
  const baseUrl = import.meta.env.VITE_API_URL || import.meta.env.BASEURL || '';

  const avatar_url = `${baseUrl}/uploads/users/${userData.id}/${userData.avatar_url}`;

  return (
    <div
      className={cn(
        `border-t border-border-gray-200 flex px-4 py-6 w-full items-center gap-1.5 transition-all`,
        isCollapsed && !isMenuOpen ? 'flex-col' : 'flex-row',
      )}
    >
      <div className="h-8 w-8 bg-blue-primary rounded-full overflow-hidden transition-all">
        <img
          src={avatar_url}
          alt="Avatar"
          className="h-full w-full object-cover"
        />
      </div>
      <div
        className={cn(
          isCollapsed && !isMenuOpen ? 'hidden' : 'flex flex-col flex-1 gap-0',
        )}
      >
        <span className="text-[10px] text-graphite font-bold leading-2 transition-all">
          {user?.name}
        </span>
        <span className="text-[10px] text-graphite transition-all">
          {user?.email}
        </span>
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
