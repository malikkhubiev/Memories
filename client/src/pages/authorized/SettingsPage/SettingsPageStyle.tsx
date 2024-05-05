const styles = {
  container: {
    width: "100vw",
    minHeight: "calc(100vh - 160px)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column"
  },
  header: (theme: any) => ({
    [theme.breakpoints.down('sm')]: {
      fontSize: "45px"
    },
  }),
  account: {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
  },
  account_type: (theme: any) => ({
    color: theme.palette.primary.violet,
    cursor: "pointer"
  }),
  blocked: (isDarkMode: boolean) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    color: isDarkMode ? "white" : "black",
    marginBottom: "50px",
  }),
  goldenRatioBox: {
    alignItems: "center",
  },
  user_info: {
    width: "375px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  image: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
  },
  changeInput: { margin: "20px 0" },
  buttonApply: {
    marginTop: "20px",
  },
  line: (theme: any) => ({
    marginTop: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down('md')]: {
      flexDirection: "column-reverse",
    },
  }),
  buttonLogOut:(theme: any) => ( {
    width: "375px",
    marginLeft: "50px",
    [theme.breakpoints.down('md')]: {
      marginLeft: "0",
    },
  }),
};
export default styles;
