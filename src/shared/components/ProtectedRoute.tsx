import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@shared/context/AuthContext';
import { Spinner } from 'react-bootstrap';

interface ProtectedRouteProps {
  /** When true, also requires the user to have admin access (canAccessAdmin). */
  requireAdmin?: boolean;
  /** Where to redirect unauthenticated / unauthorised users. Defaults to /login. */
  redirectTo?: string;
}

/**
 * Wraps a route tree and enforces authentication (and optionally admin access).
 * Place as the `element` of a layout route whose `children` contain the guarded pages.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requireAdmin = false,
  redirectTo = '/login',
}) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  // While hydrating from localStorage, show a neutral splash instead of flashing login
  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Authenticated but not an admin → send to portal
    return <Navigate to="/portal" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
