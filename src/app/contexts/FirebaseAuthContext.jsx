import { createContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "__api__/db/auth";

const initialAuthState = {
  user: null,
  isAuthenticated: false,
  isInitialized: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        isInitialized: true,
        isAuthenticated: !!action.payload.user,
        user: action.payload.user,
      };
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext(initialAuthState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);
  const navigate = useNavigate();

  useEffect(() => {
    const initialize = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const valid = await authService.validateToken(token);
          if (valid) {
            const user = JSON.parse(localStorage.getItem("user"));
            dispatch({
              type: "INITIALIZE",
              payload: { user },
            });
          } else {
            throw new Error("Token inválido");
          }
        } catch {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          dispatch({ type: "INITIALIZE", payload: { user: null } });
        }
      } else {
        dispatch({ type: "INITIALIZE", payload: { user: null } });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
    dispatch({ type: "LOGIN", payload: { user: response.user } });
    navigate("/dashboard/default");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/session/signin");
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
