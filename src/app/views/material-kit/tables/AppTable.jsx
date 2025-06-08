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
    Snackbar,
    CircularProgress,
    Typography,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { getAllCotacoes } from "../../../../__api__/service";

export default function AppTable() {
    const [cotacoes, setCotacoes] = useState([]);
    const [filteredCotacoes, setFilteredCotacoes] = useState([]);
    const [filter, setFilter] = useState({ carrier: "", service: "" });
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    // Novos estados para listas únicas
    const [carriers, setCarriers] = useState([]);
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchCotacoes = async () => {
            setLoading(true);
            try {
                const data = await getAllCotacoes();
                setCotacoes(data);
                setFilteredCotacoes(data);

                // Gera listas únicas de transportadoras e serviços
                setCarriers([...new Set(data.map(c => c.carrier).filter(Boolean))]);
                setServices([...new Set(data.map(c => c.service).filter(Boolean))]);
            } catch (error) {
                console.error("Erro ao carregar cotações:", error);
                setSnackbarMessage("Erro ao carregar cotações. Tente novamente mais tarde.");
                setOpenSnackbar(true);
            } finally {
                setLoading(false);
            }
        };
        fetchCotacoes();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const newFilter = { ...filter, [name]: value };
        setFilter(newFilter);

        const filtered = cotacoes.filter((cotacao) => {
            const carrierMatch = !newFilter.carrier || cotacao.carrier === newFilter.carrier;
            const serviceMatch = !newFilter.service || cotacao.service === newFilter.service;
            return carrierMatch && serviceMatch;
        });
        setFilteredCotacoes(filtered);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box margin="30px">
            <Typography variant="h5" mb={2}>Histórico de Cotação</Typography>
            <Box display="flex" gap={2} mb={2}>
                <FormControl fullWidth>
                    <InputLabel>Transportadora</InputLabel>
                    <Select
                        label="Transportadora"
                        name="carrier"
                        value={filter.carrier}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="">Todas</MenuItem>
                        {carriers.map((carrier) => (
                            <MenuItem key={carrier} value={carrier}>{carrier}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Serviço</InputLabel>
                    <Select
                        label="Serviço"
                        name="service"
                        value={filter.service}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="">Todos</MenuItem>
                        {services.map((service) => (
                            <MenuItem key={service} value={service}>{service}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
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
                                    <TableCell>{cotacao.user?.name ?? ''}</TableCell>
                                    <TableCell>{new Date(cotacao.createdAt).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
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
        </Box>
    );
}