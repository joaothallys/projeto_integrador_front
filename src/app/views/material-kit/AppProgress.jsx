import React, { useState } from 'react';
import {
    Box,
    Button,
    Snackbar,
    Alert,
    Switch,
    FormControlLabel,
} from '@mui/material';
import styled from '@mui/material/styles/styled';
import { Breadcrumb, SimpleCard } from 'app/components';

// Styled Components
const AppButtonRoot = styled('div')(({ theme }) => ({
    margin: '30px',
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
}));

const MarketplaceCard = styled('div')(({ theme }) => ({
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    width: '100%',
    maxWidth: '320px', // Ensures cards don't stretch too wide
    minHeight: '260px', // Maintains a rectangular shape
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
        maxWidth: '100%', // Allows cards to take full width on small screens
        minHeight: '240px', // Slightly shorter on small screens
    },
}));

const LogoDescriptionContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap', // Prevents overflow on smaller screens
    minHeight: '80px', // Ensures consistent height for description
});

const ActionButtonsContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    gap: '8px',
    flexWrap: 'wrap', // Allows buttons to wrap if needed
});

const IconButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.text.primary,
    borderRadius: '50%',
    minWidth: '32px',
    height: '32px',
    padding: 0,
    '&:hover': {
        backgroundColor: theme.palette.grey[300],
    },
}));

const Analytics = () => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    // State to manage the active status of each marketplace
    const [marketplaces, setMarketplaces] = useState([
        {
            title: 'Bling',
            description: 'O Bling é um sistema de gestão empresarial que integra vendas, finanças e estoques para e-commerce e marketplaces.',
            logo: 'https://i.imgur.com/AoWZCcT.png',
            active: true,
        },
        {
            title: 'AnyMarket',
            description: 'O ANYMARKET é uma plataforma de integração multicanal que conecta e-commerce a marketplaces.',
            logo: 'https://i.imgur.com/QKYYE8N.png',
            active: false,
        },
        {
            title: 'BaseLinker',
            description: 'O BaseLinker é uma plataforma de gestão multicanal que integra lojas virtuais, marketplaces e logística.',
            logo: 'https://i.imgur.com/XpJuy3O.png',
            active: true,
        },
        {
            title: 'Shopify',
            description: 'O Shopify é uma plataforma de e-commerce que permite criar lojas online personalizadas e gerenciar vendas com facilidade.',
            logo: 'https://i.imgur.com/AnXX1i8.jpeg',
            active: false,
        },
        {
            title: 'Mercado Livre',
            description: 'O Mercado Livre é uma plataforma de e-commerce e marketplace que conecta vendedores e compradores.',
            logo: 'https://http2.mlstatic.com/frontend-assets/ui-navigation/5.19.1/mercadolibre/logo__large_plus.png',
            active: true,
        },
        {
            title: 'Nuvemshop',
            description: 'A Plug.to é uma plataforma eleita 3x a Melhor plataforma de e-commerce pela ABCOMM.',
            logo: 'https://i.imgur.com/jnww5g2.png',
            active: false,
        },
    ]);

    const handleAction = (action, marketplaceTitle) => {
        if (action === 'Ativar/Desativar') {
            setMarketplaces((prevMarketplaces) =>
                prevMarketplaces.map((marketplace) =>
                    marketplace.title === marketplaceTitle
                        ? {
                            ...marketplace,
                            active: !marketplace.active,
                        }
                        : marketplace
                )
            );
            setSnackbar({
                open: true,
                message: `Integração ${marketplaceTitle} ${marketplaces.find((m) => m.title === marketplaceTitle).active
                    ? 'desativada'
                    : 'ativada'
                    } com sucesso!`,
                severity: 'success',
            });
        } else {
            setSnackbar({
                open: true,
                message: `Funcionalidade '${action}' será implementada em breve.`,
                severity: 'info',
            });
        }
    };

    const handleConfigure = () => {
        setSnackbar({
            open: true,
            message: 'Configuração iniciada com sucesso!',
            severity: 'success',
        });
    };

    const handleEdit = () => {
        setSnackbar({
            open: true,
            message: 'Funcionalidade "Editar" será implementada em breve.',
            severity: 'info',
        });
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <AppButtonRoot>
            <Box className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Integrações', path: '/integrations' },
                        { name: 'Marketplaces' },
                    ]}
                />
            </Box>

            <SimpleCard title="Marketplaces">
                <Box mb={2} display="flex" gap={2}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleAction('Filtros')}
                    >
                        Filtros
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAction('Nova Integração')}
                    >
                        Nova Integração
                    </Button>
                </Box>

                <Box
                    display="grid"
                    gridTemplateColumns={{
                        xs: '1fr', // 1 column on extra small screens
                        sm: 'repeat(auto-fit, minmax(320px, 1fr))', // Adjusts to fit cards of 320px width
                        md: 'repeat(auto-fit, minmax(320px, 1fr))', // Same for medium screens and above
                    }}
                    gap={2}
                    justifyItems="center" // Centers the cards in the grid
                >
                    {marketplaces.map((marketplace, index) => (
                        <MarketplaceCard key={index}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <h3>{marketplace.title}</h3>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={marketplace.active}
                                            onChange={() => handleAction('Ativar/Desativar', marketplace.title)}
                                        />
                                    }
                                    label={marketplace.active ? 'Ativar' : 'Desativar'}
                                />
                            </Box>
                            <LogoDescriptionContainer>
                                <img
                                    src={marketplace.logo}
                                    alt={`${marketplace.title} logo`}
                                    style={{ width: '64px', height: '64px', objectFit: 'contain' }}
                                />
                                <p style={{ fontSize: '14px', color: '#666', flex: 1 }}>
                                    {marketplace.description}
                                </p>
                            </LogoDescriptionContainer>
                            <ActionButtonsContainer>
                                {['Cotação', 'Pedido', 'Nota Fisc.', 'Etiquetas', 'Rastreio'].map((action, idx) => (
                                    <IconButton key={idx} onClick={() => handleAction(action)}>
                                        {action.charAt(0)}
                                    </IconButton>
                                ))}
                            </ActionButtonsContainer>
                            <Box display="flex" justifyContent="space-between">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleConfigure}
                                >
                                    Configurar
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleEdit}
                                >
                                    Editar
                                </Button>
                            </Box>
                        </MarketplaceCard>
                    ))}
                </Box>
            </SimpleCard>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </AppButtonRoot>
    );
};

export default Analytics;