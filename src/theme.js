import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    // primary: {
    //   // main: "#3F3244",
    //   // light: "#42a5f5",
    //   // dark: "#1565c0",
    // },
    backdrop: {
      main: "#333333",
    },
    customYellow: {
      main: "#FCE303",
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
});

export default theme;
