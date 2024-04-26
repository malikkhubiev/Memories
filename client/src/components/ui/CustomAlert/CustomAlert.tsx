import { Alert } from "@mui/material";
import React, { FC } from "react";
import styles from "./CustomAlertStyle";

export interface Props {
  message: string;
}

export const CustomAlert: FC<Props> = ({ message }) => {
  return (
    <Alert sx={styles.box} severity="error" icon={false}>
      {message}
    </Alert>
  );
};
