import { Outlet } from 'react-router-dom';
import { MenuBook } from '@mui/icons-material';

export function AuthLayout() {
  return (
    <div className="w-screen h-screen bg-background-primary flex items-center justify-center p-6">
      <div className="w-full max-w-125 bg-white-full shadow rounded-lg p-8 md:p-10 flex flex-col items-center justify-center gap-4 transition-all">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-primary mb-1 ">
            <MenuBook className="text-white" sx={{ fontSize: 18 }} />
          </div>
          <span className="text-2xl font-black tracking-tight text-blue-primary">Planner</span>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
