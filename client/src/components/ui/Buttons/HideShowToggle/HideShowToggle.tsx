import React, { FC } from "react";
import { hideShowToggleCallbackType } from "../../../../types/callbacks";
import styles from "./HideShowToggle.module.less";
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
    <div style={{ cursor: "pointer", padding: "5px" }} onClick={handler}>
      {isHideMode ? (
        <Box title="Look at public images">
          <CustomIcon type="hide_toggle" extra={{
            width: "35px",
          }} />
        </Box>
      ) : (
        <Box title="Look at private images">
          <CustomIcon type="show_toggle" extra={{
            width: "35px",
          }} />
        </Box>
      )}
    </div>
  );
};

type HideShowTogglePropsType = {
  isHideMode: boolean;
  hideShowToggleCallback: hideShowToggleCallbackType;
};
