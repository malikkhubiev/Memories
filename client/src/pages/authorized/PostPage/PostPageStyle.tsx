const styles = {
  comments: (theme: any) => ({
    width: "100%",
    padding: "25px",
    overflowY: "scroll",
    borderTop: `1px solid ${theme.palette.primary.main}`,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  }),
  column_wrap: {
    paddingBottom: "80px"
  }
};
export default styles;
