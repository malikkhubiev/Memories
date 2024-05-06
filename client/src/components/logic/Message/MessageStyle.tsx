const styles = {
  container:(isOwn: boolean) => ({
    display: 'flex',
    justifyContent: 'start',
    alignItems: () => isOwn ? "end" : "start",
    flexDirection: 'column',
  }),
  message:(isOwn: boolean) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    margin: '50px 0',
    justifyContent: () => isOwn ? "flex-end" : "flex-start"
  }),
  header:(isOwn: boolean) => ({
    maxWidth: '325px',
    display: 'flex',
    alignItems: 'center',
    transform: `translateX(${isOwn ? "20px" : "-20px"})`,
    justifyContent: () => isOwn ? "flex-end" : "flex-start"
  }),
  body: (theme: any, isOwn: boolean) => ({
    maxWidth: '375px',
    display: 'inline-block',
    padding: "35px",
    backgroundColor: () => isOwn ? theme.palette.primary.violet : theme.palette.primary.mainBg,
    borderRadius: () => isOwn ? "50px 0 50px 50px" : "0 50px 50px 50px"
  }),
  text: (isOwn: boolean) => ( {
    overflow: "hidden",
    maxWidth: "255px",
    wordWrap: "break-word",
    fontSize: "25px",
    color: () => (isOwn ? "#fff" : "#000"),
  })
};

export default styles;