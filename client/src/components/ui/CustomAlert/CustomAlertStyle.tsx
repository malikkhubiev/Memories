const styles = {
  box: (theme: any) => ({
    position: "absolute",
    left: "50%",
    top: "20px",
    zIndex: "99999",
    transform: "translateX(-50%)",
    color: "#fff",
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.primary.violet
        : theme.palette.primary.main,
    borderColor: theme.palette.primary.violet,
    textAlign: "center",
  }),
};

export default styles;
