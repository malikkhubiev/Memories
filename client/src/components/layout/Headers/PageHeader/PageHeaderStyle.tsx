const styles: any = {
  pageHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: '0.5s',
    zIndex: 5000,
  },
  fixedPageHeader: {
    top: 0,
    left: 0,
    position: 'fixed',
    transform: 'translateY(-150%)',
  },
  visibleHeader: {
    transform: 'translateY(0)',
  },
  back: {
    cursor: 'pointer',
  },
  stack: {
    width: "100%",
    padding: {
      md: "25px 45px",
      xs: "25px",
    },
  }
};

export default styles;
