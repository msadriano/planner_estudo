import { AppRoutes } from './app/routes';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './app/store/AuthContext';

export function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const root = document.documentElement;

    if (savedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  return (
    <AuthProvider>
      <ToastContainer autoClose={3000} theme="colored" />
      <AppRoutes />
    </AuthProvider>
  );
}
