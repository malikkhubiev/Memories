import { Box, Typography } from "@mui/material";
import React, { FC } from "react";
import styles from "./CustomMenuComponentsStyle";
import { CustomIcon } from "../../CustomIcons/CustomIcons";

export const BasicMenuComponent: FC<{ body: string; icon: string }> = ({
  body,
  icon,
}) => {
  return (
    <Box sx={styles.component}>
      {icon && <CustomIcon type={icon} />}
      <Box sx={styles.box}>
        <Typography variant="body2">{body}</Typography>
      </Box>
    </Box>
  );
};

export const ButtonComponent: FC<{
  button: FC<any>;
  icon: FC<any>;
  name: string;
  url: string;
}> = (props) => {
  return (
    <props.button url={props.url}>
      <Box sx={styles.component}>
        {props.icon && <props.icon size={32} round={true} />}
        <Box sx={styles.box}>
          <Typography variant="body2">{props.name}</Typography>
        </Box>
      </Box>
    </props.button>
  );
};
