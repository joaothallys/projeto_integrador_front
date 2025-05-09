import React, { useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
  Chip,
  Typography,
} from "@mui/material";
import { FilterList } from "@mui/icons-material";
import styled from "@mui/material/styles/styled";
import { Breadcrumb, SimpleCard } from "app/components";

const AppButtonRoot = styled("div")(({ theme }) => ({
  margin: "30px",
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const StyledSwitchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const FilterButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #9C27B0, #E040FB)",
  color: "white",
  borderRadius: 30,
  textTransform: "none",
  padding: "6px 16px",
  fontWeight: 600,
  boxShadow: "0 3px 5px 2px rgba(156, 39, 176, .3)",
}));

const RoundedButton = styled(Button)(({ theme }) => ({
  borderRadius: 30,
  textTransform: "none",
  padding: "6px 20px",
  fontWeight: 600,
}));

const ChannelLogo = styled("img")({ width: 24, height: 24, marginRight: 8 });

export default function PrintLabels() {
  const [filters, setFilters] = useState({
    pending: false,
    smartEnvios: false,
    readyToShip: false,
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const orders = [
    {
      channel: "Tiny",
      code: "136018650",
      carrier: "GFL",
      document: "DC",
      buyer: "Elisangela Cardoso",
      cpf: "707.245.045-91",
      status: "Pronto para enviar",
      dateTime: "08/05/25, 21:54",
    },
    {
      channel: "Tiny",
      code: "136018584",
      carrier: "J&T Express",
      document: "DC",
      buyer: "Renata Menezes",
      cpf: "294.530.968-81",
      status: "Pronto para enviar",
      dateTime: "08/05/25, 21:54",
    },
    {
      channel: "Tiny",
      code: "900715559",
      carrier: "J&T Express",
      document: "DC",
      buyer: "Renata Santos Da Conceicao",
      cpf: "091.013.417-07",
      status: "Pronto para enviar",
      dateTime: "08/05/25, 21:53",
    },
    {
      channel: "Tiny",
      code: "136018204",
      carrier: "J&T Express",
      document: "DC",
      buyer: "Karine Fernanda Alves Da Costa",
      cpf: "100.033.869-02",
      status: "Pronto para enviar",
      dateTime: "08/05/25, 21:53",
    },
    {
      channel: "Tiny",
      code: "900715322",
      carrier: "Loggi",
      document: "DC",
      buyer: "Vilma De Souza Penido",
      cpf: "885.433.906-72",
      status: "Pronto para enviar",
      dateTime: "08/05/25, 21:53",
    },
  ];

  const handleFilterChange = (filter) => {
    setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  const handleSnackbar = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const filteredOrders = orders.filter((order) => {
    if (!filters.pending && !filters.smartEnvios && !filters.readyToShip) return true;
    if (filters.readyToShip && order.status === "Pronto para enviar") return true;
    return false;
  });

  return (
    <AppButtonRoot>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Ferramentas", path: "/material/labels" }, { name: "Imprimir Etiquetas" }]} />
      </Box>

      <SimpleCard title="Imprimir Etiquetas">
        <StyledSwitchContainer>
          <FormControlLabel
            control={<Switch checked={filters.pending} onChange={() => handleFilterChange("pending")} />}
            label={<Chip label="Com Pendência" color="warning" variant={filters.pending ? "filled" : "outlined"} />}
          />
          <FormControlLabel
            control={<Switch checked={filters.smartEnvios} onChange={() => handleFilterChange("smartEnvios")} />}
            label={<Chip label="Serviços SmartEnvios" color="primary" variant={filters.smartEnvios ? "filled" : "outlined"} />}
          />
          <FormControlLabel
            control={<Switch checked={filters.readyToShip} onChange={() => handleFilterChange("readyToShip")} />}
            label={<Chip label="Pronto para Enviar" color="success" variant={filters.readyToShip ? "filled" : "outlined"} />}
          />
          <Chip label="Etiquetas Impressas" variant="outlined" />
        </StyledSwitchContainer>

        <Box mb={2} display="flex" gap={2} flexWrap="wrap">
          <FilterButton startIcon={<FilterList />}>Filtros</FilterButton>
          <RoundedButton variant="contained" color="secondary">Novo pedido</RoundedButton>
          <RoundedButton variant="outlined" color="secondary">Meus Documentos</RoundedButton>
          <RoundedButton variant="outlined" color="secondary">Meus Relatórios</RoundedButton>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Canal</TableCell>
                <TableCell>Código</TableCell>
                <TableCell>Transportadora</TableCell>
                <TableCell>Documento</TableCell>
                <TableCell>Comprador</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Data / hora</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell><input type="radio" name="select-order" /></TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <ChannelLogo src={order.channel === "Tiny" ? "https://i.imgur.com/6ZCj9jU.png" : "https://i.imgur.com/jnww5g2.png"} alt="canal" />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography>{order.code}</Typography>
                      <Typography variant="caption" color="textSecondary">SM123456789BR</Typography>
                    </TableCell>
                    <TableCell>
                      <img src={order.carrier === "J&T Express" ? "https://i.imgur.com/w5NZRfS.png" : order.carrier === "Loggi" ? "https://i.imgur.com/6wD3XXK.png" : "https://i.imgur.com/Vt4qJRO.png"} alt="transportadora" width={50} />
                    </TableCell>
                    <TableCell>{order.document}</TableCell>
                    <TableCell>
                      <Typography>{order.buyer}</Typography>
                      <Typography variant="caption" color="textSecondary">{order.cpf}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={order.status} color="success" icon={<span>✔</span>} />
                    </TableCell>
                    <TableCell>{order.dateTime}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">Nenhum pedido encontrado.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </SimpleCard>

      <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </AppButtonRoot>
  );
}
