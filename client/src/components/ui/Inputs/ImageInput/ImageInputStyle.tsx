const styles = {
  container: (isSmallSize: boolean) => ({
    width: isSmallSize ? "100%" : "50%",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  }),
  invisibleInput: {
    width: '1px',
    height: '1px',
    opacity: 0,
  },
  image: {
    width: '275px',
  },
  svg: {
    width: "275px"
  }
};

export default styles;
