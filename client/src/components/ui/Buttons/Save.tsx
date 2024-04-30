import React, { FC } from "react";
import { saveToggleCallbackType } from "../../../types/callbacks";
import { CustomIcon } from "../CustomIcons/CustomIcons";

export const Save: FC<SavePropsType> = ({ isSaveMode, saveToggleCallback }) => {
  const handler = () => {
    saveToggleCallback(!isSaveMode);
  };

  return (
    <div onClick={handler}>
      {isSaveMode ? (
        <div title="Usual images">
          <CustomIcon
            type="bookmark"
            extra={{
              width: "35px",
            }}
          />
        </div>
      ) : (
        <div title="Saved images">
          <CustomIcon
            type="filled_bookmark"
            extra={{
              width: "35px",
            }}
          />
        </div>
      )}
    </div>
  );
};

type SavePropsType = {
  isSaveMode: boolean;
  saveToggleCallback: saveToggleCallbackType;
};
