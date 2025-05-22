import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Switch,
  Typography,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import { Breadcrumb, SimpleCard } from "app/components";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HistoryIcon from "@mui/icons-material/History";
import FreightHistory from "./FreightHistory";
import {
  getActiveTransportCompanies,
  getCorreioPacQuote,
  getCorreioSedexQuote,
  getCorreioMiniQuote,
  getJadLogQuote,
} from "../../../../__api__/service";
import { useNavigate } from "react-router-dom";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[2],
  marginBottom: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: "#fff",
  borderRadius: 50,
  padding: theme.spacing(1, 3),
  textTransform: "none",
  fontWeight: 500,
  fontSize: "0.875rem",
  "&:hover": {
    background: theme.palette.primary.dark,
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
  const [errorMessage, setErrorMessage] = useState(""); // Estado para exibir erros específicos
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openHistory, setOpenHistory] = useState(false);
  const navigate = useNavigate();

  const handleOpenHistory = () => setOpenHistory(true);
  const handleCloseHistory = () => setOpenHistory(false);

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
    setFreightOptions([]);
    setErrorMessage(""); // Limpar mensagens de erro anteriores

    try {
      if (!formData.cepOrigin || !formData.cepDestination) {
        throw new Error("Por favor, preencha os CEPs de origem e destino.");
      }
      if (!formData.weight || !formData.height || !formData.width || !formData.length) {
        throw new Error("Preencha todas as dimensões e o peso do pacote.");
      }

      // Buscar transportadoras ativas
      const activeCompanies = await getActiveTransportCompanies();
      const payload = {
        origin: { zipCode: formData.cepOrigin },
        destination: { zipCode: formData.cepDestination },
        packageDetails: {
          weight: parseFloat(formData.weight),
          width: parseFloat(formData.width),
          height: parseFloat(formData.height),
          length: parseFloat(formData.length),
        },
        invoiceValue: parseFloat(formData.value),
        additionalServices: {
          own_hand: false,
          receipt_notice: false,
          declared_value: true,
        },
        user: { id: 1 }, // Substitua pelo ID do usuário real, se necessário
      };

      const quotes = [];

      // Realizar cotações com base nas transportadoras ativas
      for (const company of activeCompanies) {
        try {
          if (company.nome === "Pac") {
            const pacQuote = await getCorreioPacQuote(payload);
            quotes.push({ provider: "Correio - Pac", ...pacQuote });
          } else if (company.nome === "Sedex") {
            const sedexQuote = await getCorreioSedexQuote(payload);
            quotes.push({ provider: "Correio - Sedex", ...sedexQuote });
          } else if (company.nome === "Mini") {
            const miniQuote = await getCorreioMiniQuote(payload);
            quotes.push({ provider: "Correio - Mini", ...miniQuote });
          } else if (company.nome === "JadLog") {
            const jadLogQuote = await getJadLogQuote(payload);
            quotes.push({ provider: "JadLog", ...jadLogQuote });
          }
        } catch (quoteError) {
          console.error(`Erro ao buscar cotação para ${company.nome}:`, quoteError);
          setErrorMessage(`Erro ao buscar cotação para ${company.nome}: ${quoteError.message}`);
        }
      }

      setFreightOptions(quotes);
      setSnackbarMessage("Cotação realizada com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage(error.message || "Erro ao realizar a cotação.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const transportIcons = {
    "Correio - Pac": "https://imagedelivery.net/KKde8E3p4hSgxYa6DVVQjQ/afe4e9ac-e065-4d83-3501-8ca777ecf000/public",
    "Correio - Sedex": "https://imagedelivery.net/KKde8E3p4hSgxYa6DVVQjQ/631e35eb-bfa5-4b4b-6e3a-6959d997a400/public",
    "Correio - Mini": "https://imagedelivery.net/KKde8E3p4hSgxYa6DVVQjQ/23ff2cf5-c014-4b0b-d56c-c67db1e0a800/public",
    "JadLog": "https://imagedelivery.net/KKde8E3p4hSgxYa6DVVQjQ/4ff63045-25bb-4e23-8081-9f8c0a7a2c00/100x100",
  };

  const handleSelectOption = (provider) => {
    setSnackbarMessage(`Opção "${provider}" selecionada com sucesso!`);
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Ferramentas", path: "/material/freight" }, { name: "Cotação de Frete" }]} />
        <StyledButton
          variant="contained"
          startIcon={<HistoryIcon />}
          onClick={() => navigate("/material/table")}
        >
          Histórico de cotações
        </StyledButton>
      </Box>

      <SimpleCard title="Simular Fretes">
        <form onSubmit={handleSubmit}>
          <StyledBox>
            <Box display="flex" gap={2}>
              <TextField label="Seu CEP *" name="cepOrigin" value={formData.cepOrigin} onChange={handleChange} fullWidth />
              <Box display="flex" alignItems="center" justifyContent="center">➡️</Box>
              <TextField label="CEP do comprador *" name="cepDestination" value={formData.cepDestination} onChange={handleChange} fullWidth />
            </Box>
            <Box mt={2} display="flex" alignItems="center">
              <Switch checked={formData.reverse} onChange={handleSwitchChange} name="reverse" />
              <Typography variant="body1">Reversa</Typography>
            </Box>
          </StyledBox>

          <StyledBox>
            <Typography variant="h6" >Volume #1</Typography>
            <Box display="flex" gap={2} mt={2}>
              <TextField label="Quantidade *" name="quantity" type="number" value={formData.quantity} onChange={handleChange} fullWidth />
              <TextField label="Peso *" name="weight" type="number" value={formData.weight} onChange={handleChange} fullWidth InputProps={{ endAdornment: <InputAdornment position="end">kg</InputAdornment> }} />
              <TextField label="Valor total da nota *" name="value" type="number" value={formData.value} onChange={handleChange} fullWidth InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }} />
            </Box>
            <Box display="flex" gap={2} mt={2}>
              <TextField label="Altura *" name="height" type="number" value={formData.height} onChange={handleChange} fullWidth InputProps={{ endAdornment: <InputAdornment position="end">cm</InputAdornment> }} />
              <TextField label="Largura *" name="width" type="number" value={formData.width} onChange={handleChange} fullWidth InputProps={{ endAdornment: <InputAdornment position="end">cm</InputAdornment> }} />
              <TextField label="Comprimento *" name="length" type="number" value={formData.length} onChange={handleChange} fullWidth InputProps={{ endAdornment: <InputAdornment position="end">cm</InputAdornment> }} />
            </Box>
          </StyledBox>

          <Box textAlign="center">
            <StyledButton variant="contained" type="submit" startIcon={<LocalShippingIcon />} disabled={loading}>
              {loading ? <CircularProgress size={20} color="inherit" /> : "Realizar cotação"}
            </StyledButton>
          </Box>
        </form>

        {freightOptions.length > 0 && (
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Transportadora</TableCell>
                  <TableCell>Valor</TableCell>
                  <TableCell>Prazo</TableCell>
                  <TableCell>Ação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {freightOptions.map((option, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2} sx={{ paddingLeft: 2 }}>
                        <img
                          src={transportIcons[option.provider] || "https://example.com/icons/default.svg"}
                          alt={option.provider}
                          style={{ width: 40, height: 40, borderRadius: "50%" }} // Aumenta o tamanho e arredonda as bordas
                        />
                        <Typography>{option.provider}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{option.price}</TableCell>
                    <TableCell>{option.delivery_time}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={() => handleSelectOption(option.provider)}>
                        Selecionar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {errorMessage && (
          <Box mt={4} textAlign="center">
            <Typography variant="body1" color="error">
              {errorMessage}
            </Typography>
          </Box>
        )}
      </SimpleCard>

      <FreightHistory open={openHistory} onClose={handleCloseHistory} />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}