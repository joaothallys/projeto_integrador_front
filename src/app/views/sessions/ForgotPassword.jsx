import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

// STYLED COMPONENTS
const StyledRoot = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#1A2038",
  minHeight: "100vh !important",
  "& .card": {
    maxWidth: 800,
    margin: "1rem",
    borderRadius: 12
  },
  ".img-wrapper": {
    display: "flex",
    padding: "2rem",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const ContentBox = styled("div")(({ theme }) => ({
  padding: 32,
  background: theme.palette.background.default
}));

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@example.com");

  const handleFormSubmit = () => {
    console.log(email);
  };

  return (
    <StyledRoot>
      <Card className="card">
        <div className="img-wrapper">
          <img width="300" src="/assets/images/illustrations/dreamer.svg" alt="Illustration" />
        </div>

        <ContentBox>
          <form onSubmit={handleFormSubmit}>
            <TextField
              type="email"
              name="email"
              size="small"
              label="Email"
              value={email}
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3, width: "100%" }}
            />

            <Button fullWidth variant="contained" color="primary" type="submit">
              Reset Password
            </Button>

            <Button
              fullWidth
              color="primary"
              variant="outlined"
              onClick={() => navigate('/dashboard/default')}
              sx={{ mt: 2 }}>
              Go Back
            </Button>
          </form>
        </ContentBox>
      </Card>
    </StyledRoot>
  );
}
