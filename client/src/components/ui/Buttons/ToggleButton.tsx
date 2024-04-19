import { Button } from "@mui/material";
import React, { FC } from "react";
import {
  blockUnblockActionType,
  followUnfollowActionType,
  toggleButtonCallbackType,
} from "../../../types/callbacks";

export const ToggleButton: FC<ToggleButtonPropsType> = ({
  type,
  disabled,
  buttonText,
  toggleButtonCallback,
}) => {
  const handler = () => {
    toggleButtonCallback(buttonText);
  };

  return (
    <Button disabled={disabled} onClick={handler} variant={type || "contained"}>
      {buttonText}
    </Button>
  );
};

type ToggleButtonPropsType = {
  type?: "text" | "contained" | "outlined";
  buttonText:
    | followUnfollowActionType
    | blockUnblockActionType
    | "send request"
    | "request sended"
    | "confirm";
  toggleButtonCallback: toggleButtonCallbackType<
    | followUnfollowActionType
    | blockUnblockActionType
    | "send request"
    | "request sended"
    | "confirm"
  >;
  disabled?: boolean;
};
