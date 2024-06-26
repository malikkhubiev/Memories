import React, { FC } from "react";
import { hideShowToggleCallbackType } from "../../../../types/callbacks";
import styles from "./HideShowToggleStyle";
import { Box } from "@mui/material";
import { CustomIcon } from "../../CustomIcons/CustomIcons";

export const HideShowToggle: FC<HideShowTogglePropsType> = ({
  isHideMode,
  hideShowToggleCallback,
}) => {
  const handler = () => {
    hideShowToggleCallback(isHideMode ? "show" : "hide");
  };

  return (
    <Box sx={styles.container} onClick={handler}>
      {isHideMode ? (
        <Box title="Look at public images">
          <CustomIcon
            type="hide_toggle"
            extra={styles.extra}
          />
        </Box>
      ) : (
        <Box title="Look at private images">
          <CustomIcon
            type="show_toggle"
            extra={styles.extra}
          />
        </Box>
      )}
    </Box>
  );
};

type HideShowTogglePropsType = {
  isHideMode: boolean;
  hideShowToggleCallback: hideShowToggleCallbackType;
};
