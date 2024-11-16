import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "@mui/material/styles/styled";
import { Breadcrumb, SimpleCard } from "app/components";

// STYLED COMPONENTS
const AppButtonRoot = styled("div")(({ theme }) => ({
  margin: "30px",
  "& .input": { display: "none" },
  "& .button": { margin: theme.spacing(1) },
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const mockData = [
  {
    customer_id: 1,
    token: null,
    created_at: "2024-11-15T21:07:28.529090",
    deleted_at: null,
    id: 105,
    type_id: 1,
    updated_at: "2024-11-15T21:07:28.529090",
    type_name: "Admin",
  },
  {
    customer_id: 2,
    token: "abc123",
    created_at: "2024-11-14T20:00:00.000000",
    deleted_at: null,
    id: 106,
    type_id: 1,
    updated_at: "2024-11-14T20:00:00.000000",
    type_name: "User",
  },
];

export default function AppButton() {
  const [data, setData] = useState(mockData);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [deactivationDate, setDeactivationDate] = useState("");

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

  const filteredData = data.filter((user) =>
    user.customer_id.toString().includes(search)
  );

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
                <TableCell style={{ paddingLeft: "24px" }}>ID</TableCell>
                <TableCell>Customer ID</TableCell>
                <TableCell>Token</TableCell>
                <TableCell>Criado em</TableCell>
                <TableCell>Última Atualização</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Ativar/Desativar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell style={{ paddingLeft: "24px" }}>{user.id}</TableCell>
                  <TableCell>{user.customer_id}</TableCell>
                  <TableCell>{user.token || "N/A"}</TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(user.updated_at).toLocaleDateString()}</TableCell>
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
      </SimpleCard>

      {/* Dialog de confirmação */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>{data.find((user) => user.id === selectedUserId)?.deleted_at ? "Ativar Usuário" : "Desativar Usuário"}</DialogTitle>
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