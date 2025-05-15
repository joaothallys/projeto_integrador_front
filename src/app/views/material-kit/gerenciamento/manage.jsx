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
import { styled } from "@mui/material/styles";
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

const RoundedButton = styled(Button)(({ theme }) => ({
  borderRadius: 30,
  textTransform: "none",
  padding: "6px 20px",
  fontWeight: 600,
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const transportIcons = {
  Sedex: "https://imagedelivery.net/KKde8E3p4hSgxYa6DVVQjQ/631e35eb-bfa5-4b4b-6e3a-6959d997a400/public",
  PAC: "https://imagedelivery.net/KKde8E3p4hSgxYa6DVVQjQ/afe4e9ac-e065-4d83-3501-8ca777ecf000/public",
  Mini: "https://imagedelivery.net/KKde8E3p4hSgxYa6DVVQjQ/23ff2cf5-c014-4b0b-d56c-c67db1e0a800/public",
  JadLog: "https://imagedelivery.net/KKde8E3p4hSgxYa6DVVQjQ/4ff63045-25bb-4e23-8081-9f8c0a7a2c00/100x100",
};

export default function PrintLabels() {
  const [filters, setFilters] = useState({
    pending: false,
    smartEnvios: false,
    readyToShip: false,
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const orders = [
    {
      code: "136018650",
      carrier: "PAC",
      document: "DC",
      buyer: "Elisangela Cardoso",
      cpf: "707.245.045-91",
      status: "Pronto para enviar",
      dateTime: "08/05/25, 21:54",
    },
    {
      code: "136018584",
      carrier: "Sedex",
      document: "DC",
      buyer: "Renata Menezes",
      cpf: "294.530.968-81",
      status: "Pronto para enviar",
      dateTime: "08/05/25, 21:54",
    },
    {
      code: "900715559",
      carrier: "Mini",
      document: "DC",
      buyer: "Renata Santos Da Conceicao",
      cpf: "091.013.417-07",
      status: "Pronto para enviar",
      dateTime: "08/05/25, 21:53",
    },
    {
      code: "136018204",
      carrier: "JadLog",
      document: "DC",
      buyer: "Karine Fernanda Alves Da Costa",
      cpf: "100.033.869-02",
      status: "Pronto para enviar",
      dateTime: "08/05/25, 21:53",
    },
  ];

  const handleFilterChange = (filter) => {
    setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
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
        </StyledSwitchContainer>

        <Box mb={2} display="flex" gap={2} flexWrap="wrap">
          <RoundedButton variant="contained">Novo pedido</RoundedButton>
          <RoundedButton variant="outlined">Meus Documentos</RoundedButton>
          <RoundedButton variant="outlined">Meus Relatórios</RoundedButton>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
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
                    <TableCell>
                      <input type="radio" name="select-order" />
                    </TableCell>
                    <TableCell>
                      <Typography>{order.code}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        SM123456789BR
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <img
                          src={transportIcons[order.carrier] || "https://i.imgur.com/Vt4qJRO.png"}
                          alt={order.carrier}
                          width={40}
                          height={40}
                        />
                        <Typography>{order.carrier}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{order.document}</TableCell>
                    <TableCell>
                      <Typography>{order.buyer}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {order.cpf}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={order.status} color="success" icon={<span>✔</span>} />
                    </TableCell>
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
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AppButtonRoot>
  );
}