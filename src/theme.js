import { yellow, grey } from "@mui/material/colors";

const theme = {
  palette: {
    backdrop: {
      main: "#333333",
    },
    customYellow: {
      main: yellow[500],
      light: yellow[300],
      dark: yellow[800],
    },
    customGrey: {
      main: grey[500],
      light: grey[200],
      dark: grey[800],
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      hideRentalFilter: 1700,
    },
  },
};

export default theme;
