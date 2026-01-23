import { Outlet } from 'react-router-dom';
import { Aside } from './Aside/Aside';

export function AppLayout() {
  return (
    <div className="w-screen h-screen bg-background-primary flex flex-row items-center justify-start">
      <Aside />
      <div className="flex flex-col h-full flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
