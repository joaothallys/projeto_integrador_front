import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "app/hooks/useAuth";

const AuthGuard = ({ children }) => {
  const { isAuthenticated, isInitialized } = useAuth();

  // Aguarde até que a autenticação seja inicializada
  if (!isInitialized) return <div>Carregando...</div>;

  // Redirecione para a página de login se o usuário não estiver autenticado
  if (!isAuthenticated) {
    return <Navigate to="/session/signin" />;
  }

  return children;
};

export default AuthGuard;
