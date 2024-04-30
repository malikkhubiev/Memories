const styles = {
  main: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
  },
  count:(theme: any) => ({
    fontSize: "15px",
    position: "absolute",
    top: "-5px",
    right: "-15px",
    // @ts-ignore
    color: theme.palette.primary.mainBg,
    // @ts-ignore
    backgroundColor: theme.palette.text.primary,
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  }),
  iconExtra: {
    width: "40px",
  },
  seeAll:(theme:any) => ({
    textDecoration: "none",
    color: theme.palette.text.primary,
  })
}

export default styles;