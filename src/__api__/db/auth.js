import axios from "axios";

const API_URL = "https://omniapi-beta-polidigital.svc-us3.zcloud.ws/v3/auth";

const authService = {
  login: async (email, password, navigate) => {
    try {
      // Configurando axios para enviar cookies e credenciais
      const instance = axios.create({
        withCredentials: true, // Necessário para enviar cookies
      });

      // Fazendo a solicitação de login
      const loginResponse = await instance.post(`${API_URL}/login`, {
        email,
        password,
      });

      // Verificando o status da resposta
      if (loginResponse.status === 200 || loginResponse.status === 204) {
        // Redirecionando o usuário para o dashboard
        navigate("/dashboard/default");
        return { authorized: true };
      } else {
        throw new Error("Credenciais inválidas.");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default authService;
