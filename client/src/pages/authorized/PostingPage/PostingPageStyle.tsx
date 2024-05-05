const styles = {
  above: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    position: "fixed",
    zIndex: "9999",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: "0",
    left: "0",
  },
  stack: {
    flexDirection: "column",
    paddingBottom: "120px",
    position: "relative",
  },
  smallGoldenRatioBox: {
    alignItems: "center",
  },
  insideStack: {
    width: "375px",
    justifyContent: "start",
    flexDirection: "column",
    padding: "0 15px",
  },
  changeInput: {
    marginTop: "20px",
    width: '100%'
  },
};
export default styles;
