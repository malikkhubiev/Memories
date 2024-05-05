const styles = {
  imageComponent: {
    width: "100%",
    position: "relative",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    padding: "25px 0",
  },
  header:{
    width: "100%",
    marginBottom: "10px",
  },
  image: {width: "100%"},
  bold: {fontWeight: "bold"},
  description: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: "10px",
  },
  desc_with_el: {
    overflowX: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "100%",
  },
  line:(theme:any) => ({
    marginTop: "20px",
    marginRight: "10px",
    width: "30px",
    height: "2px",
    backgroundColor: theme.palette.primary.violet,
    borderRadius: "50px",
  }),
  tags: {marginTop: "10px"},
  tag:(theme:any) => ({
    fontSize: "25px",
    marginRight: "10px",
    color: theme.palette.primary.violet,
  })
}

export default styles;