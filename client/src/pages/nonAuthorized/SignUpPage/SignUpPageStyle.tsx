const styles = {
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },
  goldenRatBox: {alignItems: "center",},
  stack: {
    flexDirection: "column",
    padding: "0 15px",
  },
  password: {margin: "50px 0"},
  button: {marginTop: "50px"},
  terms: {
    marginTop: "20px",
    textAlign: "center",
  },
  redirect: (isSmallSize: boolean) => ({
    margin: "20px 0", 
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: () => (isSmallSize ? "column" : "row"),
  })
};
export default styles;
