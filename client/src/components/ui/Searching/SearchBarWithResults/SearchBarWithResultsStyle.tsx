const styles = {
  rel: {
    position: "relative",
  },
  container: (theme: any, isSmallSize: any): any => ({
    top: "100%",
    width: "100%",
    overflow: "scroll",
    position: "absolute",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    padding: () => (isSmallSize ? "50px 15px" : "50px"),
    backgroundColor: theme.palette.primary.mainBg
  }),
  link: {
    width: "100%",
    marginTop: "10px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    fontSize: "30px",
    fontFamily: "Century Gothic",
    textDecoration: "none",
    color: "unset",
    overflow: "hidden",
  },
  item: {
    maxWidth: "75%",
    marginLeft: "10px",
  },
};

export default styles;
