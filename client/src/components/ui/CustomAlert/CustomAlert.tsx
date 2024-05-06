import { Alert, useTheme } from "@mui/material";
import React, { FC } from "react";
import styles from "./CustomAlertStyle";

export interface Props {
  message: string;
}

export const CustomAlert: FC<Props> = ({ message }) => {
  const theme = useTheme()
  return (
    <Alert sx={styles.box(theme)} severity="error" icon={false}>
      {message}
    </Alert>
  );
};
