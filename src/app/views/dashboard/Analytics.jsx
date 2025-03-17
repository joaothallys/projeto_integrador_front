import React, { Fragment } from "react";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress"; // Importa o ícone de carregamento
import Box from "@mui/material/Box"; // Para centralizar o carregador
import { SignJWT } from "jose";

const StyledIframe = styled("iframe")({
  width: "100%",
  height: "80vh",
  border: "none",
});

export default function Analytics() {

  const METABASE_SITE_URL = import.meta.env.VITE_REACT_APP_HOST_METABASE;
  const METABASE_SECRET_KEY = import.meta.env.VITE_REACT_APP_KEY_METABASE;

  const generateToken = async () => {
    const payload = {
      resource: { dashboard: 28 },
      params: {},
      exp: Math.round(Date.now() / 1000) + 10 * 60,
    };

    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("10m")
      .sign(new TextEncoder().encode(METABASE_SECRET_KEY));

    return jwt;
  };

  const [iframeUrl, setIframeUrl] = React.useState("");
  const [loading, setLoading] = React.useState(true); // Controle do estado de carregamento

  React.useEffect(() => {
    generateToken().then((token) => {
      const url =
        `${METABASE_SITE_URL}/embed/dashboard/${token}` +
        "#bordered=true&titled=true";
      setIframeUrl(url);
    });
  }, []);

  return (
    <Fragment>
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress /> {/* Ícone de carregamento */}
        </Box>
      )}
      {iframeUrl && (
        <StyledIframe
          src={iframeUrl}
          title="Metabase Dashboard"
          allowFullScreen
          onLoad={() => setLoading(false)} // Define como carregado quando o iframe termina de carregar
          style={{ display: loading ? "none" : "block" }} // Esconde o iframe enquanto está carregando
        />
      )}
    </Fragment>
  );
}
