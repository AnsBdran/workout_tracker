import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

type RedirectPropsType = {
  children: React.ReactNode;
};

export default function Redirect({ children }: RedirectPropsType) {
  const { user } = useAuthContext();
  const location = useLocation();

  if (location.pathname === '/' && !user) {
    return <Navigate to='login' />;
  }
  if (
    user &&
    location.pathname !== '/login' &&
    location.pathname !== '/signup'
  ) {
    return children;
  }

  return <>{user ? <Navigate to='/' /> : children}</>;
}
