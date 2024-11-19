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

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
      const response = await userService.getCustomers(page);
      console.log("Dados retornados:", response); // Log para depuração
      if (Array.isArray(response?.data)) {
        setData(response.data);
        setLastPage(response.last_page || 1);
      } else {
        console.error("Formato de dados inesperado:", response);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleToggleActive = () => {
    setData((prevData) =>
      prevData.map((user) =>
        user.id === selectedUserId
          ? { ...user, deleted_at: user.deleted_at ? null : new Date(deactivationDate).toISOString() }
          : user
      )
    );
    setOpenDialog(false);
    setDeactivationDate("");
  };

  const openActivationDialog = (id) => {
    setSelectedUserId(id);
    setOpenDialog(true);
  };

  const copyToClipboard = (token) => {
    navigator.clipboard.writeText(token);
    alert("Token copiado para a área de transferência!");
  };

  const filteredData = Array.isArray(data)
  ? data.filter((user) =>
      user.customer_id.toString().includes(search)
    )
  : [];

  return (
    <AppButtonRoot>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Ferramentas", path: "/material" }, { name: "Gerenciamento" }]}
        />
      </Box>

      <SimpleCard title="Gerenciamento de Usuários">
        {/* Barra de pesquisa */}
        <Box mb={2}>
          <TextField
            label="Pesquisar por Customer ID"
            variant="outlined"
            fullWidth
            value={search}
            onChange={handleSearch}
          />
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
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
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.customer_id}</TableCell>
                  <TableCell>
                    {user.token
                      ? `${user.token.slice(0, 10)}...`
                      : "N/A"}
                    {user.token && (
                      <Button
                        onClick={() => copyToClipboard(user.token)}
                        size="small"
                        variant="outlined"
                        color="primary"
                        style={{ marginLeft: 8 }}
                      >
                        Copiar
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleString()}</TableCell>
                  <TableCell>{new Date(user.updated_at).toLocaleString()}</TableCell>
                  <TableCell>{user.type_name}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color={user.deleted_at ? "primary" : "secondary"}
                      onClick={() => openActivationDialog(user.id)}
                    >
                      {user.deleted_at ? "Ativar" : "Desativar"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginação */}
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Anterior
          </Button>
          <Box mx={2}>{`Página ${currentPage} de ${lastPage}`}</Box>
          <Button
            disabled={currentPage === lastPage}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, lastPage))}
          >
            Próxima
          </Button>
        </Box>
      </SimpleCard>

      {/* Dialog de confirmação */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {data.find((user) => user.id === selectedUserId)?.deleted_at
            ? "Ativar Usuário"
            : "Desativar Usuário"}
        </DialogTitle>
        <DialogContent>
          {data.find((user) => user.id === selectedUserId)?.deleted_at ? (
            <DialogContentText>
              Tem certeza que deseja ativar este usuário?
            </DialogContentText>
          ) : (
            <>
              <DialogContentText>
                Insira a data para desativação do usuário:
              </DialogContentText>
              <TextField
                type="date"
                fullWidth
                value={deactivationDate}
                onChange={(e) => setDeactivationDate(e.target.value)}
              />
            </>
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
    </AppButtonRoot>
  );
}
