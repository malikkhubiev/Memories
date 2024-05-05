const styles = {
  button: (theme: any) => ({
    width: "375px",
    backgroundColor: "transparent",
    border: "none",
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.primary.violet
    }
  })
}

export default styles;