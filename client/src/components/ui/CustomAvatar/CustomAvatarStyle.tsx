const styles = {
  image: (width: number) => ({
    marginLeft: "5px",
    width: width ? `${width}px` : "25px",
    borderRadius: "50%",
    transform: "translateY(5px)"
  }),
  iconExtra: (width: number) => ({
    width: width + 10 + "px",
    transform: "translateY(5px)"
  }),
}

export default styles;