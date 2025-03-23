import React, { useState } from "react";
import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Breadcrumb, SimpleCard } from "app/components";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: theme.palette.grey[100],
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function FreightQuote() {
  const [formData, setFormData] = useState({
    company: "",
    companyCpfCnpj: "",
    cepOrigin: "",
    cepDestination: "",
    quantity: "1",
    weight: "",
    value: "",
    height: "",
    width: "",
    length: "",
    reverse: false,
  });
  const [freightOptions, setFreightOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Dados estáticos para simulação (serão substituídos pela API no futuro)
  const mockFreightOptions = [
    {
      provider: "Loggi",
      rating: 4.50,
      value: "R$ 10,20",
      deadline: "4 dias úteis",
      document: "NF/DC",
      forecast: "27/03/2025",
    },
    {
      provider: "J&T Express",
      rating: 3.50,
      value: "R$ 11,11",
      deadline: "10 dias úteis",
      document: "NF/DC",
      forecast: "04/04/2025",
    },
    {
      provider: "PAC Mini",
      rating: 4.90,
      value: "R$ 13,33",
      deadline: "9 dias úteis",
      document: "NF/DC",
      forecast: "03/04/2025",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = (e) => {
    setFormData({ ...formData, reverse: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFreightOptions([]); // Limpa a tabela antes de nova simulação

    try {
      // Validação básica
      if (!formData.cepOrigin || !formData.cepDestination) {
        throw new Error("Por favor, preencha os CEPs de origem e destino.");
      }
      if (!formData.weight || !formData.height || !formData.width || !formData.length) {
        throw new Error("Por favor, preencha todas as dimensões e o peso do pacote.");
      }

      // Simulação estática (substituir por chamada à API no futuro)
      setTimeout(() => {
        setFreightOptions(mockFreightOptions);
        setSnackbarMessage("Cotação realizada com sucesso!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setLoading(false);
      }, 1000); // Simula um delay de 1 segundo
    } catch (error) {
      setSnackbarMessage(error.message || "Erro ao realizar a cotação.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSelectOption = (provider) => {
    setSnackbarMessage(`Opção "${provider}" selecionada com sucesso!`);
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Ferramentas", path: "/material/freight" },
            { name: "Cotação de Frete" },
          ]}
        />
      </Box>

      <SimpleCard title="Simular Fretes">
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={3}>
            {/* Empresa e CPF/CNPJ */}
            <Box display="flex" gap={2}>
              <TextField
                label="Sua empresa"
                variant="outlined"
                name="company"
                value={formData.company}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="CPF / CNPJ do comprador"
                variant="outlined"
                name="companyCpfCnpj"
                value={formData.companyCpfCnpj}
                onChange={handleChange}
                fullWidth
              />
            </Box>

            {/* CEP Origem e Destino */}
            <Box display="flex" gap={2}>
              <TextField
                label="Seu CEP"
                variant="outlined"
                name="cepOrigin"
                value={formData.cepOrigin}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="CEP do comprador"
                variant="outlined"
                name="cepDestination"
                value={formData.cepDestination}
                onChange={handleChange}
                fullWidth
                required
              />
            </Box>

            {/* Volume #1 */}
            <Box>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <h4>Volume #1</h4>
              </Box>

              <Box display="flex" gap={2}>
                <TextField
                  label="Quantidade"
                  variant="outlined"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  fullWidth
                  type="number"
                  required
                />
                <TextField
                  label="Peso (kg)"
                  variant="outlined"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  fullWidth
                  type="number"
                  required
                />
                <TextField
                  label="Valor total da nota (R$)"
                  variant="outlined"
                  name="value"
                  value={formData.value}
                  onChange={handleChange}
                  fullWidth
                  type="number"
                  step="0.01"
                />
              </Box>

              <Box display="flex" gap={2} mt={2}>
                <TextField
                  label="Altura (cm)"
                  variant="outlined"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  fullWidth
                  type="number"
                  required
                />
                <TextField
                  label="Largura (cm)"
                  variant="outlined"
                  name="width"
                  value={formData.width}
                  onChange={handleChange}
                  fullWidth
                  type="number"
                  required
                />
                <TextField
                  label="Comprimento (cm)"
                  variant="outlined"
                  name="length"
                  value={formData.length}
                  onChange={handleChange}
                  fullWidth
                  type="number"
                  required
                />
              </Box>
            </Box>

            {/* Switch de Reverso */}
            <Box display="flex" alignItems="center">
              <Switch
                checked={formData.reverse}
                onChange={handleSwitchChange}
                name="reverse"
              />
              <span>Reversa</span>
            </Box>

            {/* Botão de Simulação */}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} color="inherit" />}
            >
              {loading ? "Simulando..." : "Simular Frete"}
            </Button>

            {/* Tabela de Opções de Frete */}
            {freightOptions.length > 0 && (
              <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Provedor</StyledTableCell>
                      <StyledTableCell>Valor</StyledTableCell>
                      <StyledTableCell>Prazo</StyledTableCell>
                      <StyledTableCell>Documento</StyledTableCell>
                      <StyledTableCell>Previsão</StyledTableCell>
                      <StyledTableCell>Ação</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {freightOptions.map((option, index) => (
                      <StyledTableRow key={index}>
                        <TableCell>
                          {option.provider} ({option.rating})
                        </TableCell>
                        <TableCell>{option.value}</TableCell>
                        <TableCell>{option.deadline}</TableCell>
                        <TableCell>{option.document}</TableCell>
                        <TableCell>{option.forecast}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleSelectOption(option.provider)}
                          >
                            Selecionar
                          </Button>
                        </TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </form>
      </SimpleCard>

      {/* Snackbar para Feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}