import { useState, useEffect } from 'react';
import { KeyboardDoubleArrowLeft, Menu } from '@mui/icons-material';
import { NavigationMenu } from './NavigationMenu';
import { Logo } from './Logo';
import { Logout } from './Logout';

export function Aside() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 md:relative md:inset-auto md:z-0 flex flex-col border-r bg-white-full shadow transition-all duration-300 border-border-gray-100 ${
          isMenuOpen
            ? 'w-64 translate-x-0'
            : isCollapsed
              ? 'w-20 -translate-x-full md:translate-x-0'
              : 'w-64 -translate-x-full md:translate-x-0'
        } h-screen`}
      >
        <button
          onClick={() =>
            window.innerWidth < 768
              ? setIsMenuOpen(!isMenuOpen)
              : setIsCollapsed(!isCollapsed)
          }
          className={`absolute top-2 z-50 h-8 w-8 rounded-full border border-border-gray-200 bg-white-full flex items-center justify-center cursor-pointer shadow-md outline-none hover:bg-gray-100 hover:scale-110 transition-all duration-300 ${
            !isMenuOpen ? '-right-10 md:-right-4' : '-right-4'
          }`}
        >
          {(window.innerWidth < 768 && !isMenuOpen) || isCollapsed ? (
            <Menu className="text-border-gray-400" sx={{ fontSize: 20 }} />
          ) : (
            <KeyboardDoubleArrowLeft
              className="text-border-gray-400"
              sx={{ fontSize: 20 }}
            />
          )}
        </button>

        <div className="flex flex-col flex-1 overflow-hidden w-full">
          <div className="px-4">
            <Logo isCollapsed={isCollapsed} />
          </div>
          <NavigationMenu
            isCollapsed={isCollapsed}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
          <Logout isCollapsed={isCollapsed} isMenuOpen={isMenuOpen} />
        </div>
      </aside>
    </>
  );
}
