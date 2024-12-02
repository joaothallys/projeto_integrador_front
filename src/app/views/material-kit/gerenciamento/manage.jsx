import React, { useState, useEffect } from "react";
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
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import styled from "@mui/material/styles/styled";
import { Breadcrumb, SimpleCard } from "app/components";
import userService from "__api__/db/user";

// Styled Components
const AppButtonRoot = styled("div")(({ theme }) => ({
  margin: "30px",
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function AppButton() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [deactivationDate, setDeactivationDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  useEffect(() => {
    if (!loading && !search) {
      fetchData(currentPage);
    }
  }, [currentPage, search]);

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const response = await userService.getCustomers(page);
      if (response?.data && Array.isArray(response.data)) {
        setData(response.data);
        setLastPage(response.last_page || 1);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      fetchData(currentPage);
      return;
    }

    setLoading(true);
    try {
      const response = await userService.searchCustomer(e.target.value);
      if (response?.data && Array.isArray(response.data)) {
        setData(response.data);
        setLastPage(1); // Reseta a paginação para 1 ao buscar
        setCurrentPage(1);
      } else {
        setData([]);
        setSnackbar({
          open: true,
          message: "Nenhum cliente encontrado.",
          severity: "warning",
        });
      }
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
      setSnackbar({
        open: true,
        message: "Erro ao buscar cliente.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async () => {
    setLoading(true);
    try {
      const selectedUser = data.find((user) => user.id === selectedUserId);
      if (!selectedUser) throw new Error("Cliente não encontrado.");

      if (selectedUser.deleted_at) {
        await userService.reactivateClientWithToken(selectedUser.customer_id, selectedUser.token);
        setSnackbar({ open: true, message: "Token do cliente reativado com sucesso.", severity: "success" });
      } else {
        // Desativar cliente
        if (!deactivationDate) throw new Error("Data de desativação é necessária.");
        await userService.deactivateClient(selectedUser.customer_id, deactivationDate);
        setSnackbar({ open: true, message: "Usuário desativado com sucesso.", severity: "success" });
      }
      fetchData(currentPage);
    } catch (error) {
      console.error("Erro ao alterar status do cliente:", error);
      setSnackbar({ open: true, message: "Erro ao alterar status do cliente.", severity: "error" });
    } finally {
      setOpenDialog(false);
      setDeactivationDate("");
      setLoading(false);
    }
  };

  const openActivationDialog = (id) => {
    setSelectedUserId(id);
    setOpenDialog(true);
  };

  const filteredData = search
    ? data // Retorna os resultados da pesquisa
    : data.filter((user) =>
      user.customer_id.toString().toLowerCase().includes(search.toLowerCase())
    );

  return (
    <AppButtonRoot>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Ferramentas", path: "/material/manage" },
            { name: "Gerenciamento" },
          ]}
        />
      </Box>

      <SimpleCard title="Gerenciamento de Usuários">
        <Box mb={2}>
          <TextField
            label="Pesquisar por Customer ID"
            variant="outlined"
            fullWidth
            value={search}
            onChange={handleSearch}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch({ target: { value: search } });
              }
            }}
          />
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : filteredData.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer ID</TableCell>
                  <TableCell>Token</TableCell>
                  <TableCell>Criado em</TableCell>
                  <TableCell>Última Atualização</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Ação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.customer_id}</TableCell>
                    <TableCell>
                      {user.token ? `${user.token.slice(0, 10)}...` : "vazio"}
                    </TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleString()}</TableCell>
                    <TableCell>{new Date(user.updated_at).toLocaleString()}</TableCell>
                    <TableCell>{user.type_name}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color={user.deleted_at ? "primary" : "secondary"}
                        onClick={() => openActivationDialog(user.id)}
                        style={{ width: "120px" }}
                      >
                        {user.deleted_at ? "Ativar" : "Desativar"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box display="flex" justifyContent="center" my={4}>
            <Box textAlign="center">
              <p>Usuário não encontrado para o Customer ID informado.</p>
            </Box>
          </Box>
        )}

        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Button
            variant="outlined"
            size="small"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Anterior
          </Button>
          <Box mx={2} px={2} py={1} border="1px solid #ccc" fontSize="14px" fontWeight="bold">
            {`Página ${currentPage} de ${lastPage}`}
          </Box>
          <Button
            variant="outlined"
            size="small"
            disabled={currentPage === lastPage}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, lastPage))}
          >
            Próxima
          </Button>
        </Box>
      </SimpleCard>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {data.find((user) => user.id === selectedUserId)?.deleted_at
            ? "Ativar Usuário"
            : "Desativar Usuário"}
        </DialogTitle>
        <DialogContent>
          {data.length > 0 && selectedUserId !== null ? (
            data.find((item) => item.id === selectedUserId)?.deleted_at ? (
              <DialogContentText>Tem certeza que deseja ativar este token?</DialogContentText>
            ) : (
              <>
                <DialogContentText>Insira a data para desativação de todos os token do usuário:</DialogContentText>
                <TextField
                  type="date"
                  fullWidth
                  value={deactivationDate}
                  onChange={(e) => setDeactivationDate(e.target.value)}
                />
              </>
            )
          ) : (
            <DialogContentText>Dados ainda estão carregando ou nenhum usuário foi selecionado.</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleToggleActive} color="secondary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

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
