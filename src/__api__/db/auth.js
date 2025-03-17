import axios from "axios";

const API_URL = "https://disparador-sqs.poli.digital/get-me-foundation";

const authService = {
  login: async (email, password) => {
    try {
      const instance = axios.create({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const params = new URLSearchParams();
      params.append("email", email);
      params.append("password", password);

      const loginResponse = await instance.post(`${API_URL}`, params);

      if (loginResponse.status === 200 || loginResponse.status === 204) {
        const userData = loginResponse.data;

        if (userData.roles.some(role => role.name === "adm")) {
          // Armazena a resposta completa no localStorage
          localStorage.setItem("user_data", JSON.stringify(userData));
          console.log("Login bem-sucedido.");
          return { authorized: true, message: "Usuário autorizado como admin." };
        } else {
          // Se o papel não for 'adm'
          console.error("Você não é um admin.");
          return { authorized: false, message: "Você não é um admin." };
        }
      } else {
        throw new Error("Credenciais inválidas.");
      }
    } catch (error) {
      console.error("Erro no serviço de autenticação:", error);

      if (error.response?.data?.status === "Unauthenticated") {
        return { authorized: false, message: "Usuário não autenticado." };
      }

      throw new Error(error.response?.data?.message || "Erro ao autenticar.");
    }
  },
};

export default authService;