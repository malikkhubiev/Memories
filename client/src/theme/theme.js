import { createTheme } from "@mui/material";

const base = {
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
};

export let lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // синий
      mainBg: "#fff",
    },
    secondary: {
      main: "#4caf50", // зелёный
    },
    text: {
      primary: "#000000", // чёрный
    },
  },
  ...base,
});

export let darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2", // синий
      mainBg: "#121212",
    },
    secondary: {
      main: "#4caf50", // зелёный
    },
    text: {
      primary: "#ffffff", // белый
    },
  },
  ...base,
});

lightTheme = createTheme(lightTheme, {
  typography: {
    h3: {
      color: lightTheme.palette.text,
    },
  },
});

darkTheme = createTheme(darkTheme, {
  typography: {
    h3: {
      color: darkTheme.palette.text,
    },
  },
});

const toExport = { lightTheme, darkTheme };
export default toExport;
