import { IconButton, MenuItem } from "@mui/material";
import Menu from "@mui/material/Menu";
import React, { FC, useState } from "react";
import {
  chatsMenuOptionsActionsType,
  commentMenuOptionsActionsType,
  imageMenuOptionsActionsType,
  messagesMenuOptionsActionsType,
  optionActionCallbackType,
} from "../../../types/callbacks";
import { CustomIcon } from "../CustomIcons/CustomIcons";

export const CustomMenu: FC<CustomMenPropsType> = ({
  menuOptions,
  imgSrc,
  side,
  callback,
  iconWidth,
  url,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const ownHandler = (
    action:
      | imageMenuOptionsActionsType
      | chatsMenuOptionsActionsType
      | commentMenuOptionsActionsType,
  ) => {
    callback(action);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <CustomIcon type={props.icon} extra={iconWidth &&{
          width: iconWidth+"px",
        }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: side || "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: side || "right",
        }}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "300px",
          },
        }}
      >
        {menuOptions.map((option: any) =>
          url ? (
            <MenuItem
              key={option.id}
              onClick={() => ownHandler(option.props.body)}
            >
              {option.component
                ? option.component({ url, ...option.props })
                : option.props.body}
            </MenuItem>
          ) : option.props.body === "Download" ? (
            <MenuItem key={option.id}>
              <a
                target="_blank"
                href={process.env.REACT_APP_API_URL + imgSrc}
                download
                style={{ width: "100%" }}
              >
                {option.component({ ...option.props })}
              </a>
            </MenuItem>
          ) : (
            <MenuItem
              key={option.id}
              onClick={() => ownHandler(option.props.body)}
            >
              {option.component
                ? option.component({ ...option.props })
                : option.props.body}
            </MenuItem>
          ),
        )}
      </Menu>
    </>
  );
};

export type menuOption = {
  id: number;
  component: FC<any>;
  props: {
    body: string;
    icon: string;
  };
};

type CustomMenPropsType = {
  menuOptions: menuOption[];
  imgSrc?: string;
  callback: optionActionCallbackType<
    | imageMenuOptionsActionsType
    | chatsMenuOptionsActionsType
    | messagesMenuOptionsActionsType
    | commentMenuOptionsActionsType
  >;
  icon: string;
  iconWidth?: string;
  url?: string;
  side?: "left";
};
