const styles = {
  customBox:(theme: any) => ({
    padding: "15px",
    borderRadius: "50px",
    margin: "10px",
    cursor: "pointer",
    backgroundColor: theme.palette.primary.violet,
    color: theme.palette.primary.main,
  }),
  box:(theme: any, isSelected: boolean) => ({
    ...styles.customBox(theme),
    backgroundColor: () => (isSelected ? theme.palette.primary.violet : "transparent"),
    color: theme.palette.primary.main
  }),
  text: {
    wordBreak: "break-word",
    fontWeight: "bold",
    fontSize: "30px",
  }
}

export default styles;