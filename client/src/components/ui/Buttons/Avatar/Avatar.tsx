import React, { FC } from "react";
import styles from "./AvatarStyle";
import { Box } from "@mui/material";

export const Avatar: FC<{ avatar: string }> = ({ avatar }) => {
  if (avatar)
    return (
      <img
        style={styles.avatar}
        src={process.env.REACT_APP_API_URL + avatar}
      />
    );
  else return <Box sx={styles.plug}></Box>;
};
