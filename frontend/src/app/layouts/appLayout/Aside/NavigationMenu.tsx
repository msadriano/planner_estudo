import { DashboardOutlined, Group, Settings, Route, PersonOutlined } from '@mui/icons-material';
import { NavLink } from 'react-router';

interface SideBarProps {
  isCollapsed?: boolean;
  isMenuOpen?: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

export function NavigationMenu({
  isCollapsed,
  isMenuOpen,
  setIsMenuOpen,
}: SideBarProps) {
  const navItens = [
    { to: '/', icon: <DashboardOutlined sx={{ fontSize: 16 }} />, label: 'Dashboard' },
    {
      to: '/planners',
      icon: <Group sx={{ fontSize: 16 }} />,
      label: 'Planners',
    },
    {
      to: '/disciplinas',
      icon: <Route sx={{ fontSize: 16 }} />,
      label: 'Disciplinas',
    },
    {
      to: '/tarefas',
      icon: <Settings sx={{ fontSize: 16 }} />,
      label: 'Tarefas',
    },
    {
      to: '/perfil',
      icon: <PersonOutlined sx={{ fontSize: 16 }} />,
      label: 'Meu Perfil',
    },
  ];

  return (
    <nav className="flex flex-1 flex-col gap-1 px-4 py-6">
      {navItens.map((menu) => (
        <NavLink
          key={menu.to}
          to={menu.to}
          title={isCollapsed ? menu.label : ''}
          onClick={() => window.innerWidth < 768 && setIsMenuOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-2 text-sm rounded-lg px-3 py-2.5 transition-all ${isActive ? 'bg-blue-400/10 text-blue-400' : 'text-graphite/70 hover:bg-blue-400/10 hover:text-blue-400'} ${isMenuOpen ? 'justify-start' : isCollapsed ? 'justify-center' : 'justify-start'} `
          }
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center">
            {menu.icon}
          </span>
          {(!isCollapsed || isMenuOpen) && (
            <span
              className={`whitespace-nowrap transition-opacity duration-200 ${isCollapsed && !isMenuOpen ? 'opacity-0' : 'opacity-100 delay-200'}`}
            >
              {menu.label}
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
