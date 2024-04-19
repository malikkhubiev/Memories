import React, { FC } from "react";
import { hideShowToggleCallbackType } from "../../../../types/callbacks";
import styles from "./HideShowToggle.module.less";

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
        <div className={styles.hide} title="Look at public images"></div>
      ) : (
        <div className={styles.show} title="Look at private images"></div>
      )}
    </div>
  );
};

type HideShowTogglePropsType = {
  isHideMode: boolean;
  hideShowToggleCallback: hideShowToggleCallbackType;
};
