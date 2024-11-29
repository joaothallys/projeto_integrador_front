import React, { createContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "__api__/db/auth";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null, // Armazena os dados do usuário autenticado
  role: null, // Armazena o papel do usuário
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
        role: action.payload.role,
      };
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        role: action.payload.role,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        role: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  // Inicializa o estado de autenticação
  useEffect(() => {
    const initialize = () => {
      const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
      const userData = JSON.parse(localStorage.getItem("user_data"));

      console.log("Inicializando autenticação. Estado armazenado:", isAuthenticated);

      if (isAuthenticated && userData) {
        // Verifica se o usuário está autenticado e se os dados existem
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: true,
            user: userData,
            role: userData.roles[0]?.name || null,
          },
        });
      } else {
        dispatch({ type: "INITIALIZE", payload: { isAuthenticated: false } });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    try {
      console.log("Tentando login...");
      const response = await authService.login(email, password);

      // Se a resposta for sucesso e o papel for "adm"
      const userData = JSON.parse(localStorage.getItem("user_data"));
      const role = userData?.roles?.[0]?.name || null;

      if (role === "adm") {
        // Salvar estado no localStorage
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user_data", JSON.stringify(userData));

        dispatch({
          type: "LOGIN",
          payload: { user: userData, role },
        });

        navigate("/dashboard/default");
      } else {
        // Caso o usuário não seja um administrador
        throw new Error("Você não é um administrador.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error; // Propaga o erro para a interface
    }
  };

  const logout = async () => {
    try {
      console.log("Fazendo logout...");
      await authService.logout();

      // Remover estado do localStorage
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user_data");

      dispatch({ type: "LOGOUT" });
      navigate("/session/signin");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {state.isInitialized ? children : <div>Carregando...</div>}
    </AuthContext.Provider>
  );
};

export default AuthContext;
