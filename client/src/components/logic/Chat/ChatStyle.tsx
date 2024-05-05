const styles: any = {
  wrap: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px 0",
    padding: "0 20px",
  },
  leftSide: {
    width: '80%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  mainData: {
    width: '70%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginLeft: '10px',
  },
  rightSide: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    fontSize: "20px",
  },
  avatar: {
    transform: "translateY(0)"
  },
  grey:(theme: any, isCurrent: boolean) => ({
    color: theme.palette.primary.main,
  }),
  body:(theme: any, isCurrent: boolean) => ({
    cursor: "pointer",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
      padding: "20px 30px 20px 20px",
    },
    [theme.breakpoints.up('sm')]: {
      padding: "20px 30px 20px 20px",
    },
    borderRadius: "25px",
    color: theme.palette.primary.main,
    backgroundColor: () => (isCurrent ? theme.palette.primary.mainBg6 : theme.palette.primary.mainBg4),
  })
};

export default styles;
