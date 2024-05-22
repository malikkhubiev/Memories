import { createTheme } from "@mui/material";

const base = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 575,
      md: 767,
      lg: 992,
      xl: 1199
    },
  },
  typography: {
    fontFamily: "Century Gothic",
    h1: {
      fontSize: 50,
      padding: "20px 0",
      fontWeight: "bold",
    },
    body1: {
      fontSize: 25,
    },
    body2: {
      fontSize: 25,
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
          border: "2px solid transparent",
          fontSize: "30px",
          textTransform: "lowercase",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
        },
      },
    },
  },
};

export let lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000",
      mainBg: "#fff",
      mainBg2: "#F5F5F5",
      mainBg3: "#EBEBEB",
      mainBg4: "#E0E0E0",
      mainBg5: "#D6D6D6",
      violet: "#7400cc",
    },
  },
  ...base,
});

export let darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
      mainBg: "#141414",
      mainBg2: "#1F1F1F",
      mainBg3: "#292929",
      mainBg4: "#333333",
      mainBg5: "#3D3D3D",
      mainBg6: "#474747",
      violet: "#7400cc",
    },
    secondary: {
      main: "#000"
    },
    text: {
      white: "#ffffff",
    },
  },
  ...base,
});

lightTheme = createTheme(lightTheme, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: lightTheme.palette.primary.violet,
          color: lightTheme.palette.primary.mainBg,
          "&:hover": {
            backgroundColor: lightTheme.palette.primary.main,
            borderColor: lightTheme.palette.primary.violet,
            boxShadow:
              "rgba(116, 0, 204, 0.4) -5px 5px, rgba(116, 0, 204, 0.3) -10px 10px, rgba(116, 0, 204, 0.2) -15px 15px, rgba(116, 0, 204, 0.1) -20px 20px, rgba(116, 0, 204, 0.05) -25px 25px",
          },
        },
      },
    },
  },
});

darkTheme = createTheme(darkTheme, {
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "&::after": {
            borderBottomColor: darkTheme.palette.primary.violet,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: darkTheme.palette.primary.violet,
          color: darkTheme.palette.primary.main,
          "&:hover": {
            backgroundColor: "transparent",
            borderColor: darkTheme.palette.primary.violet,
            boxShadow:
              "rgba(116, 0, 204, 0.4) -5px 5px, rgba(116, 0, 204, 0.3) -10px 10px, rgba(116, 0, 204, 0.2) -15px 15px, rgba(116, 0, 204, 0.1) -20px 20px, rgba(116, 0, 204, 0.05) -25px 25px",
          },
        },
      },
    },
  },
});

const toExport = { lightTheme, darkTheme };
export default toExport;
