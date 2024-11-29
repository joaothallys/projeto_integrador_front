import axios from "axios";

const API_URL = "https://omniapi-beta-polidigital.svc-us3.zcloud.ws/v3/auth";

const authService = {
  login: async (email, password) => {
    try {
      const instance = axios.create({
        withCredentials: true, // Envia cookies automaticamente
      });

      const loginResponse = await instance.post(`${API_URL}/login`, {
        email,
        password,
      });

      if (loginResponse.status === 200 || loginResponse.status === 204) {
        console.log("Login bem-sucedido.");
        return { authorized: true }; // Apenas indica sucesso
      } else {
        throw new Error("Credenciais inválidas.");
      }
    } catch (error) {
      console.error("Erro no serviço de autenticação:", error);
      throw new Error(error.response?.data?.message || "Erro ao autenticar.");
    }
  },

  logout: async () => {
    try {
      const instance = axios.create({
        withCredentials: true,
      });

      const logoutResponse = await instance.post(`${API_URL}/logout`);
      if (logoutResponse.status === 200 || logoutResponse.status === 204) {
        console.log("Logout bem-sucedido.");
      } else {
        throw new Error("Erro ao deslogar.");
      }
    } catch (error) {
      console.error("Erro no logout:", error);
      throw new Error("Erro ao deslogar.");
    }
  },
};

export default authService;