import { Badge, Box, Typography } from "@mui/material";
import React, { FC } from "react";
import { setChatIdCallbackType } from "../../../types/callbacks";
import { messageType } from "../../../types/storeTypes";
import { CustomAvatar } from "../../ui/CustomAvatar/CustomAvatar";
import {
  SmallGreyText,
  TypographyWithEllipsis,
} from "../../ui/customStyledComponents";
import styles from "./Chats.module.less";

export const Chat: FC<ChatPropsType> = ({
  setChatIdCallback,
  id,
  chatterAva,
  chatterName,
  isCurrent,
  lastMessage,
  newMessagesNumber,
}) => {
  const clickHandler = () => {
    setChatIdCallback(id);
  };

  return (
    <Badge
      sx={{ width: "100%" }}
      color="primary"
      badgeContent={newMessagesNumber}
    >
      <Box
        onClick={clickHandler}
        sx={{
          cursor: "pointer",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 10px",
          color: () => (isCurrent ? "#fff" : "#000"),
          backgroundColor: () => (isCurrent ? "primary.light" : "#fff"),
        }}
      >
        <div className={styles.leftSide}>
          <CustomAvatar width={50} src={chatterAva} />
          <div className={styles.mainData}>
            <TypographyWithEllipsis>{chatterName}</TypographyWithEllipsis>
            <SmallGreyText
              sx={{
                color: () => (isCurrent ? "#fff" : "#000"),
              }}
            >
              <TypographyWithEllipsis>
                {lastMessage?.text}
              </TypographyWithEllipsis>
            </SmallGreyText>
          </div>
        </div>
        <div className={styles.rightSide}>
          <Typography
            sx={{
              fontSize: {
                xs: "15px",
                sm: "25px",
              },
            }}
          >
            {lastMessage &&
              new Date(lastMessage.createdAt).toLocaleDateString()}
          </Typography>
        </div>
      </Box>
    </Badge>
  );
};

type ChatPropsType = {
  isCurrent: boolean;
  setChatIdCallback: setChatIdCallbackType;
  id: number | string;
  chatterAva: string;
  chatterName: string;
  lastMessage: messageType;
  newMessagesNumber: number;
};
