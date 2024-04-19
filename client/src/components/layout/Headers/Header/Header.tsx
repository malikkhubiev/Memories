import { Typography } from "@mui/material";
import React, { FC } from "react";

export const Header: FC<{ text: string; sx?: any }> = ({ text, sx }) => {
  return (
    <Typography variant="h1" sx={sx || {}}>
      {text}
    </Typography>
  );
};
