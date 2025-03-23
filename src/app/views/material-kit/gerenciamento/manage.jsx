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
} from "@mui/material";
import styled from "@mui/material/styles/styled";
import { Breadcrumb, SimpleCard } from "app/components";

// Styled Components
const AppButtonRoot = styled("div")(({ theme }) => ({
  margin: "30px",
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const CenteredTableCell = styled(TableCell)({
  textAlign: "center",
});

const FilterButton = styled(Button)(({ theme, active }) => ({
  marginRight: theme.spacing(1),
  backgroundColor: active ? theme.palette.primary.main : theme.palette.grey[300],
  color: active ? theme.palette.common.white : theme.palette.text.primary,
  "&:hover": {
    backgroundColor: active ? theme.palette.primary.dark : theme.palette.grey[400],
  },
}));

export default function PrintLabels() {
  const [filters, setFilters] = useState({
    pending: false,
    smartEnvios: false,
    readyToShip: false,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Dados estáticos baseados na imagem
  const orders = [
    {
      channel: "Tiny",
      code: "1331511229",
      carrier: "Loggi",
      document: "DC",
      buyer: "Márcia Fonseca",
      status: "Pronto para enviar",
      dateTime: "23/03/25, 18:07",
    },
    {
      channel: "Tiny",
      code: "8560780848",
      carrier: "Loggi",
      document: "DC",
      buyer: "Ian Brites",
      status: "Pronto para enviar",
      dateTime: "23/03/25, 18:07",
    },
    {
      channel: "Tiny",
      code: "1331510845",
      carrier: "GFL",
      document: "DC",
      buyer: "Kelly Regina Costa Santos",
      status: "Pronto para enviar",
      dateTime: "23/03/25, 18:06",
    },
    {
      channel: "Tiny",
      code: "1519650543847-01",
      carrier: "J&T Express",
      document: "DC",
      buyer: "Mateus Almeida De Vasconcelos",
      status: "Pronto para enviar",
      dateTime: "23/03/25, 18:06",
    },
    {
      channel: "Tiny",
      code: "1331510723",
      carrier: "Loggi",
      document: "DC",
      buyer: "Michelle Maria De Andrade Lins",
      status: "Pronto para enviar",
      dateTime: "23/03/25, 18:06",
    },
    {
      channel: "Tiny",
      code: "46680",
      carrier: "Loggi",
      document: "DC",
      buyer: "Cecilio Martins Filho",
      status: "Pronto para enviar",
      dateTime: "23/03/25, 18:06",
    },
    {
      channel: "Bling",
      code: "42232",
      carrier: "Loggi",
      document: "DC",
      buyer: "Nicolas Matsushita",
      status: "Pronto para enviar",
      dateTime: "23/03/25, 18:06",
    },
    {
      channel: "Tiny",
      code: "1331511003",
      carrier: "Loggi",
      document: "DC",
      buyer: "Renata Alves Costa",
      status: "Pronto para enviar",
      dateTime: "23/03/25, 18:06",
    },
  ];

  const handleFilterChange = (filter) => {
    setFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  const handlePrintLabels = () => {
    setSnackbar({
      open: true,
      message: "Impressão de etiquetas iniciada com sucesso!",
      severity: "success",
    });
  };

  const handleNewOrder = () => {
    setSnackbar({
      open: true,
      message: "Funcionalidade 'Novo pedido' será implementada em breve.",
      severity: "info",
    });
  };

  const handleDocuments = () => {
    setSnackbar({
      open: true,
      message: "Funcionalidade 'Meus Documentos' será implementada em breve.",
      severity: "info",
    });
  };

  const handleReports = () => {
    setSnackbar({
      open: true,
      message: "Funcionalidade 'Meus Relatórios' será implementada em breve.",
      severity: "info",
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Filtra os pedidos com base nos filtros ativos
  const filteredOrders = orders.filter((order) => {
    if (!filters.pending && !filters.smartEnvios && !filters.readyToShip) return true;
    if (filters.readyToShip && order.status === "Pronto para enviar") return true;
    // Adicionar lógica para outros filtros (pendência, SmartEnvios) quando houver dados correspondentes
    return false;
  });

  return (
    <AppButtonRoot>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Ferramentas", path: "/material/labels" },
            { name: "Imprimir Etiquetas" },
          ]}
        />
      </Box>

      <SimpleCard title="Imprimir Etiquetas">
        {/* Filtros */}
        <Box mb={2} display="flex" alignItems="center" gap={2}>
          <FormControlLabel
            control={
              <Switch
                checked={filters.pending}
                onChange={() => handleFilterChange("pending")}
              />
            }
            label="Com pendência"
          />
          <FormControlLabel
            control={
              <Switch
                checked={filters.smartEnvios}
                onChange={() => handleFilterChange("smartEnvios")}
              />
            }
            label="Serviço SmartEnvios"
          />
          <FormControlLabel
            control={
              <Switch
                checked={filters.readyToShip}
                onChange={() => handleFilterChange("readyToShip")}
              />
            }
            label="Pronto para Enviar"
          />
        </Box>

        {/* Botões de Ação */}
        <Box mb={2} display="flex" gap={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() =>
              setSnackbar({
                open: true,
                message: "Funcionalidade 'Filtros' será implementada em breve.",
                severity: "info",
              })
            }
          >
            Filtros
          </Button>
          <Button variant="contained" color="primary" onClick={handleNewOrder}>
            Novo pedido
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleDocuments}
          >
            Meus Documentos
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleReports}
          >
            Meus Relatórios
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrintLabels}
          >
            Imprimir Etiquetas
          </Button>
        </Box>

        {/* Tabela */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
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
                filteredOrders.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell>{order.channel}</TableCell>
                    <TableCell>{order.code}</TableCell>
                    <TableCell>{order.carrier}</TableCell>
                    <TableCell>{order.document}</TableCell>
                    <TableCell>{order.buyer}</TableCell>
                    <CenteredTableCell>
                      <Box
                        sx={{
                          bgcolor:
                            order.status === "Pronto para enviar"
                              ? "success.light"
                              : "warning.light",
                          color: "white",
                          borderRadius: "12px",
                          padding: "4px 8px",
                          display: "inline-block",
                        }}
                      >
                        {order.status}
                      </Box>
                    </CenteredTableCell>
                    <TableCell>{order.dateTime}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Nenhum pedido encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </SimpleCard>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AppButtonRoot>
  );
}