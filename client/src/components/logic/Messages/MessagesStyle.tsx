import { CSSProperties } from "react";

const styles: any = {
  container: (theme: any) => ({
    width: {
      xl: "67%",
      lg: "100%",
      md: "100%",
      sm: "100%",
      xs: "100%",
    },
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: theme.palette.primary.mainBg4,
  }),
  messagesWindow: {
    width: '67%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
  header: (theme: any) => ({
    width: '100%',
    height: '100px',
    padding: '0 25px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.mainBg2
  }),
  chatter: {
    maxWidth: '79%',
    width: 'auto',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  body: (theme: any) => ({
    width: '100%',
    maxHeight: 'calc(100vh - 100px)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  }),
  messages: {
    width: '100%',
    padding: '0 25px',
    overflowY: 'scroll',
    display: "flex",
    justifyContent: 'flex-start',
    alignItems: 'end',
    flexDirection: 'column',
  },
  inputBar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  withEllipsis: {
    marginLeft: "20px",
    maxWidth: "70%",
  },
  iconExtra: (theme: any) => ({
    fill: "#fff",
  })
};

export default styles;