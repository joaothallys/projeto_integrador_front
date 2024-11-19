import { Navigate } from "react-router-dom";
import useAuth from "app/hooks/useAuth";

const AuthGuard = ({ children }) => {
  const { isAuthenticated, isInitialized } = useAuth();

  if (!isInitialized) return null; // Aguarde inicialização

  if (!isAuthenticated) {
    return <Navigate to="/session/signin" />;
  }

  return children;
};

export default AuthGuard;
