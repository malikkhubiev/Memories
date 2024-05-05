const styles = {
  bar: (theme: any) => ({
    margin: "25px",
    padding: "30px 40px",
    borderRadius: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid",
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.primary.violet
        : theme.palette.primary.mainBg,
    borderColor: theme.palette.primary.violet,
  }),
  input: (theme: any) => ({
    outline: "none",
    fontSize: "20px",
    border: "0",
    maxWidth: "80%",
    backgroundColor: "transparent",
    color: theme.palette.primary.main
  }),
};

export default styles;
