import { AppRoutes } from './app/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './app/store/AuthContext';

export function App() {
  return (
    <AuthProvider>
      <ToastContainer autoClose={3000} theme="colored" />
      <AppRoutes />
    </AuthProvider>
  );
}
