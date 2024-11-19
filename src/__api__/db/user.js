import axios from "axios";

// Obtendo as variáveis de ambiente
const API_URL = import.meta.env.VITE_AUTH0_DOMAIN;
const API_TOKEN = import.meta.env.REACT_APP_API_TOKEN;

const userService = {
    getCustomers: async (page = 1) => {
        try {
            const response = await axios.get(
                `${API_URL}/get-token/customers?page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${API_TOKEN}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
            throw new Error("Erro ao buscar clientes.");
        }
    },
};

export default userService;











