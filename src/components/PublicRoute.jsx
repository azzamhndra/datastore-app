import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

