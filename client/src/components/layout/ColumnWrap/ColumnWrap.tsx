import React, { FC, ReactElement } from "react";
import styles from "./ColumnWrapStyle";
import { Box } from "@mui/material";

export const ColumnWrap: FC<ColumnWrap> = ({ children, sx, removePadding }) => {
  let pageStyle = styles.page;
  if (removePadding) pageStyle = { ...pageStyle, ...styles.removedPadding, ...sx };
  return <Box sx={pageStyle}>{children}</Box>;
};

type ColumnWrap = {
  children: ReactElement | ReactElement[];
  removePadding?: true;
  sx?: any;
};
