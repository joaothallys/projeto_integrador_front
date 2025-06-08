import React, { useState } from 'react';
import {
    Box,
    Button,
    Snackbar,
    Alert,
    Switch,
    FormControlLabel,
    Typography,
    Fab,
    TextField
} from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { styled } from '@mui/material/styles';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LabelIcon from '@mui/icons-material/Label';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

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

const marketplaceTexts = {
    'Bling v3': {
        tutorial: 'O Bling v3 é um sistema de gestão empresarial integrado a diversos marketplaces.',
        urlLabel: 'URL da API Bling',
        tokenLabel: 'Token Bling',
    },
    'Irroba': {
        tutorial: 'A Irroba é uma plataforma de e-commerce para lojas virtuais.',
        urlLabel: 'URL da Loja Irroba',
        tokenLabel: 'Token Irroba',
    },
    'Blugg.to': {
        tutorial: 'A Blugg.to integra marketplaces e e-commerce.',
        urlLabel: 'URL Blugg.to',
        tokenLabel: 'Token Blugg.to',
    },
    'Loja Integrada': {
        tutorial: 'A Loja Integrada conecta sua loja aos melhores marketplaces.',
        urlLabel: 'URL Loja Integrada',
        tokenLabel: 'Token Loja Integrada',
    },
    'Shopify': {
        tutorial: 'A Shopify é uma plataforma global de e-commerce.',
        urlLabel: 'URL Shopify',
        tokenLabel: 'Token Shopify',
    },
};

const StepCircle = styled('div')(({ theme, active }) => ({
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: active ? '#0288d1' : '#e0e0e0',
    color: active ? '#fff' : '#757575',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 18,
    marginRight: 8,
}));

const StepLabel = styled('span')(({ active }) => ({
    color: active ? '#0288d1' : '#757575',
    fontWeight: active ? 600 : 400,
    fontSize: 18,
}));

const BlueButton = styled(Button)({
    background: '#0288d1',
    color: '#fff',
    fontWeight: 600,
    borderRadius: 24,
    padding: '8px 32px',
    textTransform: 'none',
    boxShadow: 'none',
    '&:hover': {
        background: '#0277bd',
        opacity: 0.95,
    },
});

const DisabledInput = styled(TextField)({
    background: '#f5f5f5',
    borderRadius: 8,
});

const ModalHeader = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: 24,
    marginBottom: 24,
    marginTop: 8,
});

const ModalSection = styled(Box)({
    marginBottom: 24,
});

const TokenRow = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
});

const Analytics = () => {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [marketplaces, setMarketplaces] = useState([
        {
            title: 'Bling v3',
            description: 'O Amazon Marketplace é uma plataforma onde vendedores independentes podem listar e vender seus produtos.',
            logo: 'https://i.imgur.com/AoWZCcT.png',
            active: true,
        },
        {
            title: 'Irroba',
            description: 'O ANYMARKET é uma plataforma de integração multicanal que conecta e-commerce a marketplaces.',
            logo: 'https://imagedelivery.net/KKde8E3p4hSgxYa6DVVQjQ/569e38a6-ca65-423d-f3b9-3fb1c3d4ed00/public',
            active: false,
        },
        {
            title: 'Blugg.to',
            description: 'O BaseLinker é uma plataforma de gestão multicanal que integra lojas virtuais, marketplaces e logística.',
            logo: 'https://imagedelivery.net/KKde8E3p4hSgxYa6DVVQjQ/47cd8abd-c45e-4d8d-08ff-981e6876d800/public',
            active: true,
        },
        {
            title: 'Loja Integrada',
            description: 'O Mercado Livre é uma plataforma de e-commerce e marketplace que conecta vendedores e compradores.',
            logo: 'https://imagedelivery.net/KKde8E3p4hSgxYa6DVVQjQ/4623f18b-a8d9-4a0b-7f71-598d6d40ab00/public',
            active: true,
        },
        {
            title: 'Shopify',
            description: 'A Plugg.to é uma plataforma de integração de marketplaces e e-commerce que permite aos lojistas expandir suas vendas.',
            logo: 'https://imagedelivery.net/KKde8E3p4hSgxYa6DVVQjQ/18b24d36-94c1-49c3-10c4-1bd6d8df1b00/public',
            active: false,
        },
    ]);
    const [selectedMarketplace, setSelectedMarketplace] = useState(null);
    const [tokenSmartEnvios] = useState('uwRbiSwFdfYsTQVpfO3vsgndmsl6qec4eg'); // Exemplo fixo

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

    const handleOpenConfig = (marketplace) => {
        setSelectedMarketplace(marketplace);
    };

    const handleCloseConfig = () => {
        setSelectedMarketplace(null);
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
                                <Button variant="contained" size="small" onClick={() => handleOpenConfig(marketplace)}>Configurar</Button>
                                <Button variant="outlined" size="small" onClick={() => handleAction('Editar', marketplace.title)}>Editar</Button>
                            </Box>
                        </MarketplaceCard>
                    ))}
                </Box>
            </SimpleCard>

            {/* Modal de configuração */}
            <Dialog open={!!selectedMarketplace} onClose={handleCloseConfig} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ bgcolor: '#0288d1', color: '#fff', pb: 2 }}>
                    Configurar Integração
                </DialogTitle>
                <DialogContent sx={{ pt: 3 }}>
                    <ModalHeader>
                        <Box display="flex" alignItems="center">
                            <StepCircle active>1</StepCircle>
                            <StepLabel active>Credenciais</StepLabel>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <StepCircle>2</StepCircle>
                            <StepLabel>Preferências</StepLabel>
                        </Box>
                    </ModalHeader>
                    {selectedMarketplace && (
                        <>
                            <ModalSection>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <b>Tutorial:</b> {marketplaceTexts[selectedMarketplace.title]?.tutorial}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                                    Insira as informações requeridas abaixo para ativação da integração selecionada.
                                </Typography>
                            </ModalSection>
                            <ModalSection>
                                <TokenRow>
                                    <DisabledInput
                                        value={tokenSmartEnvios}
                                        fullWidth
                                        disabled
                                        size="small"
                                        InputProps={{
                                            endAdornment: (
                                                <Button
                                                    size="small"
                                                    onClick={() => navigator.clipboard.writeText(tokenSmartEnvios)}
                                                    sx={{ minWidth: 32, color: '#0288d1' }}
                                                >
                                                    <ContentCopyIcon fontSize="small" />
                                                </Button>
                                            ),
                                        }}
                                    />
                                </TokenRow>
                                <TextField
                                    label={marketplaceTexts[selectedMarketplace.title]?.urlLabel || 'URL'}
                                    fullWidth
                                    required
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label={marketplaceTexts[selectedMarketplace.title]?.tokenLabel || 'Token'}
                                    fullWidth
                                    required
                                />
                            </ModalSection>
                        </>
                    )}
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3, pt: 0 }}>
                    <Button onClick={handleCloseConfig} color="secondary" sx={{ borderRadius: 24 }}>
                        Cancelar
                    </Button>
                    <BlueButton>Testar</BlueButton>
                    <BlueButton>Próximo</BlueButton>
                </DialogActions>
            </Dialog>

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
