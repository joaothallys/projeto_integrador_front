import { Box, styled } from "@mui/material";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: 16 },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: 16 }
  }
}));

export default function AppMenu() {
  return (
    <Container>
    </Container>
  );
}
