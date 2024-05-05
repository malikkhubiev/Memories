const styles = {
  app: (theme: any) => ({
    zIndex: "9999",
    position: "fixed",
    overflow: "hidden",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: theme.palette.primary.mainBg,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }),
  cropContainer: {
    position: "relative",
    width: "100%",
    height: "90vh",
  },
  controls: (theme: any) => ({
    zIndex: "1000",
    width: "375px",
    height: "10vh",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.primary.mainBg,
  }),
  slider: {padding: "22px 0"},
}

export default styles;