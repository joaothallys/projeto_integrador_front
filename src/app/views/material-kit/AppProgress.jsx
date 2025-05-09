import React, { useState } from 'react';
import {
    Box,
    Button,
    Snackbar,
    Alert,
    Switch,
    FormControlLabel,
    Typography,
    Fab
} from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { styled } from '@mui/material/styles';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LabelIcon from '@mui/icons-material/Label';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

const AppButtonRoot = styled('div')(({ theme }) => ({
    margin: '30px',
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
}));

const MarketplaceCard = styled('div')(({ theme }) => ({
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2),
    width: '100%',
    maxWidth: '320px',
    minHeight: '280px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
}));

const LogoDescriptionContainer = styled('div')({
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    minHeight: '80px',
});

const ActionButtonsContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    gap: '8px',
});

const iconMap = {
    Cotacao: <ListAltIcon />,
    Pedido: <ShoppingCartIcon />,
    'Nota Fisc.': <ReceiptIcon />,
    Etiquetas: <LabelIcon />,
    Rastreio: <TrackChangesIcon />,
};

const Analytics = () => {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const [marketplaces, setMarketplaces] = useState([
        {
            title: 'Amazon',
            description: 'O Amazon Marketplace é uma plataforma onde vendedores independentes podem listar e vender seus produtos.',
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
            title: 'Mercado Livre',
            description: 'O Mercado Livre é uma plataforma de e-commerce e marketplace que conecta vendedores e compradores.',
            logo: 'https://http2.mlstatic.com/frontend-assets/ui-navigation/5.19.1/mercadolibre/logo__large_plus.png',
            active: true,
        },
        {
            title: 'Plugg.to',
            description: 'A Plugg.to é uma plataforma de integração de marketplaces e e-commerce que permite aos lojistas expandir suas vendas.',
            logo: 'https://i.imgur.com/jnww5g2.png',
            active: false,
        },
    ]);

    const handleAction = (action, marketplaceTitle) => {
        if (action === 'Ativar/Desativar') {
            setMarketplaces((prev) =>
                prev.map((m) =>
                    m.title === marketplaceTitle ? { ...m, active: !m.active } : m
                )
            );
            const activeNow = marketplaces.find((m) => m.title === marketplaceTitle)?.active;
            setSnackbar({
                open: true,
                message: `Integração ${marketplaceTitle} ${activeNow ? 'desativada' : 'ativada'} com sucesso!`,
                severity: 'success',
            });
        } else {
            setSnackbar({ open: true, message: `Funcionalidade '${action}' será implementada.`, severity: 'info' });
        }
    };

    return (
        <AppButtonRoot>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Integrações' }, { name: 'Marketplaces' }]} />
            </Box>
            <SimpleCard title="Marketplaces">
                <Box
                    display="grid"
                    gridTemplateColumns={{ xs: '1fr', sm: 'repeat(auto-fit, minmax(320px, 1fr))' }}
                    gap={3}
                >
                    {marketplaces.map((marketplace, idx) => (
                        <MarketplaceCard key={idx}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography fontWeight={600}>{marketplace.title}</Typography>
                                <FormControlLabel
                                    control={<Switch checked={marketplace.active} onChange={() => handleAction('Ativar/Desativar', marketplace.title)} />}
                                    label="Ativar"
                                />
                            </Box>
                            <LogoDescriptionContainer>
                                <img src={marketplace.logo} alt={marketplace.title} width={50} height={50} style={{ objectFit: 'contain' }} />
                                <Typography variant="body2" color="textSecondary">
                                    {marketplace.description}
                                </Typography>
                            </LogoDescriptionContainer>
                            <ActionButtonsContainer>
                                {Object.entries(iconMap).map(([label, icon], idx) => (
                                    <Fab key={idx} size="small" sx={{ bgcolor: '#e0f7fa', color: '#0288d1' }}>
                                        {icon}
                                    </Fab>
                                ))}
                            </ActionButtonsContainer>
                            <Box display="flex" justifyContent="space-between" mt={2}>
                                <Button variant="contained" size="small" onClick={() => handleAction('Configurar', marketplace.title)}>Configurar</Button>
                                <Button variant="outlined" size="small" onClick={() => handleAction('Editar', marketplace.title)}>Editar</Button>
                            </Box>
                        </MarketplaceCard>
                    ))}
                </Box>
            </SimpleCard>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </AppButtonRoot>
    );
};

export default Analytics;
