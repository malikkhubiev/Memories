const styles = {
  container:(theme: any) => ({
    width: {
      xl: "33%",
      lg: "100%",
      md: "100%",
      sm: "100%",
      xs: "100%",
    },
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    overflowX: "hidden",
    overFlowY: "scroll",
    backgroundColor: theme.palette.primary.mainBg3
  }),
  header: (theme: any) => ({
    width: "100%",
    height: "100px",
    padding: "0 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.primary.mainBg
  }),
};

export default styles;
