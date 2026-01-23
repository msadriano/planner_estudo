import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../store/AuthContext';

import { AuthLayout } from '../layouts/authLayout/AuthLayout';
import { AppLayout } from '../layouts/appLayout/AppLayout';
import { SignIn } from '@/features/auth/pages/SignIn';
import { SignUp } from '@/features/auth/pages/SignUp';
import { PasswordRecovery } from '@/features/auth/pages/PasswordRecovery';
import { RestartPassword } from '@/features/auth/pages/RestartPassword';
import { Dashboard } from '@/features/dashboard/Dashboard';
import { Profile } from '@/features/setting/pages/Profile';

const PrivateRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

const PublicRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

const router = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <AppLayout />,
        children: [
          { path: '/', element: <Dashboard /> },
          { path: 'perfil', element: <Profile /> },
        ],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: 'signin', element: <SignIn /> },
          { path: 'signup', element: <SignUp /> },
          { path: 'passwordrecovery', element: <PasswordRecovery /> },
          { path: 'restartpassword/:token', element: <RestartPassword /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: (
      <div className="bg-gray-100 text-graphite text-4xl font-bold w-screen h-screen flex items-center justify-center">
        404 - Página não encontrada
      </div>
    ),
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
