const styles = {
  container: {
    position: "fixed",
    zIndex: "1000",
    bottom: "0",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow:
      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
    borderRadius: "50px",
    userSelect: "none",
  },
  stack: {
    justifyContent: "center",
    padding: {
      md: "25px 45px",
      xs: "15px 25px",
    },
  },
  link: {
    cursor: "pointer",
    margin: "0 25px",
  },
};

export default styles;
