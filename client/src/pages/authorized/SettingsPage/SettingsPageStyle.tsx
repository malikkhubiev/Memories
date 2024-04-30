const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
  blocked:(isDarkMode: boolean) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    color: isDarkMode ? "white" : "black",
  }),
  goldenRatioBox: {
    alignItems: "center",
  },
  changeInput: { margin: "20px 0" },
  buttonApply: {
    marginTop: "20px",
  },
  buttonLogOut: {
    marginTop: "50px",
  },
  lang: {
    userSelect: "none",
    cursor: "pointer",
  }
};
export default styles;
