import React, { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Snackbar,
    CircularProgress,
    Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { getAllCotacoes } from "../../../../__api__/service";

export default function FreightHistory({ open, onClose }) {
    const [cotacoes, setCotacoes] = useState([]);
    const [filteredCotacoes, setFilteredCotacoes] = useState([]);
    const [filter, setFilter] = useState({ carrier: "", service: "" });
    const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    // Carregar cotações ao abrir o modal
    useEffect(() => {
        if (open) {
            const fetchCotacoes = async () => {
                setLoading(true); // Ativar o estado de carregamento
                try {
                    const data = await getAllCotacoes();
                    setCotacoes(data);
                    setFilteredCotacoes(data); // Inicialmente, sem filtros
                } catch (error) {
                    console.error("Erro ao carregar cotações:", error);
                    setSnackbarMessage("Erro ao carregar cotações. Tente novamente mais tarde.");
                    setOpenSnackbar(true);
                } finally {
                    setLoading(false); // Desativar o estado de carregamento
                }
            };
            fetchCotacoes();
        }
    }, [open]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });

        // Aplicar filtros dinamicamente
        const filtered = cotacoes.filter((cotacao) => {
            return (
                (name === "carrier" && cotacao.carrier.toLowerCase().includes(value.toLowerCase())) ||
                (name === "service" && cotacao.service.toLowerCase().includes(value.toLowerCase()))
            );
        });
        setFilteredCotacoes(filtered);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
                <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    Histórico de Cotação
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {/* Filtros */}
                    <Box display="flex" gap={2} mb={2}>
                        <TextField
                            label="Transportadora"
                            name="carrier"
                            value={filter.carrier}
                            onChange={handleFilterChange}
                            fullWidth
                        />
                        <TextField
                            label="Serviço"
                            name="service"
                            value={filter.service}
                            onChange={handleFilterChange}
                            fullWidth
                        />
                    </Box>

                    {/* Ícone de carregamento ou tabela */}
                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                            <CircularProgress />
                            <Typography variant="body1" ml={2}>
                                Carregando cotações...
                            </Typography>
                        </Box>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Transportadora</TableCell>
                                        <TableCell>Serviço</TableCell>
                                        <TableCell>Prazo</TableCell>
                                        <TableCell>Preço</TableCell>
                                        <TableCell>Origem</TableCell>
                                        <TableCell>Destino</TableCell>
                                        <TableCell>Usuário</TableCell>
                                        <TableCell>Criado em</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredCotacoes.map((cotacao) => (
                                        <TableRow key={cotacao.id}>
                                            <TableCell>{cotacao.carrier}</TableCell>
                                            <TableCell>{cotacao.service}</TableCell>
                                            <TableCell>{cotacao.delivery_time}</TableCell>
                                            <TableCell>R$ {cotacao.price.toFixed(2)}</TableCell>
                                            <TableCell>{cotacao.origin_zipcode}</TableCell>
                                            <TableCell>{cotacao.destination_zipcode}</TableCell>
                                            <TableCell>{cotacao.user.name}</TableCell>
                                            <TableCell>{new Date(cotacao.createdAt).toLocaleDateString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </DialogContent>
            </Dialog>

            {/* Snackbar para exibir mensagens de erro */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <MuiAlert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </>
    );
}