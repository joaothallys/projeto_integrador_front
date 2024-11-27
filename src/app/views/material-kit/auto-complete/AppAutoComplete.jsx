import React, { useState } from "react";
import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Breadcrumb, SimpleCard } from "app/components";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function AppAutoComplete() {
  const [formData, setFormData] = useState({
    customerId: "",
    token: "",
    tipo: "1", // Valor padrão
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Aqui faremos a conexão com a API posteriormente
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
            </Select>

            {/* Botão de Submissão */}
            <Button variant="contained" color="primary" type="submit">
              Cadastrar
            </Button>
          </Box>
        </form>
      </SimpleCard>
    </Container>
  );
}
