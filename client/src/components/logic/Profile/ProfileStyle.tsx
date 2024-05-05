const styles:any = {
  line: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header_right: {
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
  },
  lang: {
    marginRight: "25px",
    userSelect: "none",
    cursor: "pointer",
  },
  settings: {
    transform: "translateY(5px)",
  },
  smallBox: (theme: any) => ({
    justifyContent: "flex-start",
    width: {
      xs: "100%",
      md: "61.80469715698393vw",
    },
    [theme.breakpoints.down('md')]: {
      padding: "10px",
    },
    [theme.breakpoints.up('md')]: {
      padding: "25px",
      paddingTop: "0", 
    },
  }),
  stack: {
    justifyContent: "start",
    flexDirection: "column"
  },
  box: (isSmallSize: boolean) => ({
    maxWidth: "40%",
    marginBottom: () => (isSmallSize ? "20px" : "0"),
  }),
  info: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px"
  },
  info_item: (theme: any) => ({
    width: '111px',
    [theme.breakpoints.down('md')]: {
      margin: "0" 
    },
    [theme.breakpoints.up('md')]: {
      margin: "0 25px", 
    },
  }),
  margin: {
    margin: "0 10%",
  },
  buttons: { margin: "30px 0" },
  ownButtons: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
};

export default styles;
