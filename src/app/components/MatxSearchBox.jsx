import { useState, Fragment } from "react";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled";
import { topBarHeight } from "app/utils/constant";

// STYLED COMPONENTS
const SearchContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 9,
  width: "100%",
  display: "flex",
  alignItems: "center",
  height: topBarHeight,
  background: theme.palette.primary.main,
  color: theme.palette.text.primary,
  "&::placeholder": {
    color: theme.palette.text.primary
  }
}));

const SearchInput = styled("input")(({ theme }) => ({
  width: "100%",
  border: "none",
  outline: "none",
  fontSize: "1rem",
  paddingLeft: "20px",
  height: "calc(100% - 5px)",
  background: theme.palette.primary.main,
  color: theme.palette.text.primary,
  "&::placeholder": { color: theme.palette.text.primary }
}));

export default function MatxSearchBox() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <Fragment>
      {!open && (
        <IconButton onClick={toggle}>
          <Icon sx={{ color: "text.primary" }}>search</Icon>
        </IconButton>
      )}

      {open && (
        <SearchContainer>
          <SearchInput type="text" placeholder="Pesquise aqui..." autoFocus />
          <IconButton onClick={toggle} sx={{ mx: 2, verticalAlign: "middle" }}>
            <Icon sx={{ color: "text.primary" }}>close</Icon>
          </IconButton>
        </SearchContainer>
      )}
    </Fragment>
  );
}
