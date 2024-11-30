import React, { useState } from "react";
import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { Breadcrumb, SimpleCard } from "app/components";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";  // Importando o Snackbar
import MuiAlert from "@mui/material/Alert";  // Para uma versão customizada do Snackbar

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const API_TOKEN = import.meta.env.VITE_REACT_APP_API_TOKEN;
const API_URL = import.meta.env.VITE_AUTH0_DOMAIN;

export default function AppAutoComplete() {
  const [formData, setFormData] = useState({
    customerId: "",
    token: "",
    tipo: "1",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Para exibir o Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { tipo, token, customerId } = formData;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("entry_type_id", tipo);
      formDataToSend.append("entry_customer_id", customerId);
      if (token) {
        formDataToSend.append("token", token);
      }

      const response = await axios.post(
        `${API_URL}/post-token`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess(true);
      console.log("Resposta da API:", response.data);

      // Exibe o Snackbar após sucesso
      setOpenSnackbar(true);
    } catch (error) {
      setError("Erro ao enviar os dados do formulário.");
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Ferramentas", path: "/material" }, { name: "Cadastro" }]}
        />
      </Box>

      <SimpleCard title="Cadastro de Cliente">
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={3}>
            {/* Campo Customer ID */}
            <TextField
              label="Customer ID"
              variant="outlined"
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              fullWidth
              required
            />

            {/* Campo Token */}
            <TextField
              label="Token (Opcional)"
              variant="outlined"
              name="token"
              value={formData.token}
              onChange={handleChange}
              fullWidth
            />

            {/* Campo Tipo */}
            <Select
              label="Tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="1">Tipo 1</MenuItem>
              {/* Adicionar outras opções de Tipo, se necessário */}
            </Select>

            {/* Botão de Submissão */}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} color="inherit" />}
            >
              {!loading ? "Cadastrar" : ""} {/* Não exibe o texto quando está carregando */}
            </Button>
          </Box>
        </form>
      </SimpleCard>

      {/* Snackbar de Sucesso */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}  // Posiciona o Snackbar no centro superior
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Cadastro realizado com sucesso!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}