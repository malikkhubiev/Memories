import React, { FC } from "react";
import { saveToggleCallbackType } from "../../../types/callbacks";
import {
  CustomBookmarkIcon,
  CustomFilledBookmarkIcon,
} from "../CustomIcons/CustomIcons";

export const Save: FC<SavePropsType> = ({ isSaveMode, saveToggleCallback }) => {
  const handler = () => {
    saveToggleCallback(!isSaveMode);
  };

  return (
    <div onClick={handler}>
      {isSaveMode ? (
        <div title="Usual images">
          <CustomBookmarkIcon
            width={`${35}`} // 35px
          />
        </div>
      ) : (
        <div title="Saved images">
          <CustomFilledBookmarkIcon width={`${35}`} />
        </div>
      )}
    </div>
  );
};

type SavePropsType = {
  isSaveMode: boolean;
  saveToggleCallback: saveToggleCallbackType;
};
