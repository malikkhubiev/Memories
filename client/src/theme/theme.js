import { createTheme } from "@mui/material";

let theme = createTheme({
  palette: {
    primary: {
      main: "#4285f4",
      light: "#679df6",
      dark: "#2e5daa",
      contrastText: "#fff",
    },
    secondary: {
      light: "#5cb975",
      main: "#34a853",
      dark: "#24753a",
      contrastText: "#000",
    },
    black: {
      main: "#f8ffb7",
    },
    grey: {
      main: "grey",
    },
  },
  typography: {
    fontFamily: "Century Gothic",
    h1: {
      fontSize: 40,
      fontWeight: "bold",
    },
    body1: {
      fontSize: 30,
    },
    body2: {
      fontSize: 30,
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "30px",
          textTransform: "lowercase",
        },
      },
    },
  },
});

theme = createTheme(theme, {
  typography: {
    h3: {
      color: theme.palette.grey.main,
    },
  },
});

export default theme;
