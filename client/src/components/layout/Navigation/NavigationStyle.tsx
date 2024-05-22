const styles = {
  container: (theme: any) => ({
    [theme.breakpoints.down('sm')]: {
      width: "100%",
      borderRadius: "0",
    },
    [theme.breakpoints.up('sm')]: {
      width: "645px",
      borderRadius: "50px"
    },
    position: "fixed",
    zIndex: "1000",
    bottom: "0",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
    borderTop: "2px solid",
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary.violet : theme.palette.primary.mainBg,
    borderColor: theme.palette.primary.violet
  }),
  stack: (theme: any) => ({
    justifyContent: "center",
    [theme.breakpoints.down('sm')]: {
      padding: "15px 0",
    },
    [theme.breakpoints.up('sm')]: {
      padding: "25px 45px",
    },
  }),
  link: (theme: any) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    [theme.breakpoints.down('sm')]: {
      margin: "0 12px",
    },
    [theme.breakpoints.up('sm')]: {
      margin: "0 25px",
    },
    transition: "0.5s",
    "&:hover": {
      [theme.breakpoints.down('sm')]: {
        transform: "scale(1.25)",
      },
      [theme.breakpoints.up('sm')]: {
        transform: "scale(1.5)",
      },
    }
  }),
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
    cursor: "pointer",
  },
};

export default styles;
