const styles = {
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "column",
  },
  form: { width: "100%" },
  goldenRatBox: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "column",
  },
  column: {
    flexDirection: "column",
    padding: "0 15px",
  },
  password: {
    margin: "50px 0",
    borderBottomColor: "#fff"
  },
  button: { marginTop: "50px" },
  box: {
    textAlign: "center",
    marginTop: "20px",
  },
  link: (theme: any) => ({
    color: theme.palette.primary.violet
  }),
  redirect: (isSmallSize: boolean) => ({
    margin: "20px 0",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: () => (isSmallSize ? "column" : "row"),
  }),
};
export default styles;
