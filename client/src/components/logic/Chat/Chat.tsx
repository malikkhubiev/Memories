import { Badge, Box, Typography, useTheme } from "@mui/material";
import React, { FC } from "react";
import { setChatIdCallbackType } from "../../../types/callbacks";
import { messageType } from "../../../types/storeTypes";
import { CustomAvatar } from "../../ui/CustomAvatar/CustomAvatar";
import {
  SmallGreyText,
  TypographyWithEllipsis,
} from "../../ui/customStyledComponents";
import styles from "./ChatStyle";

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

  const theme = useTheme();

  return (
    <Box
      sx={styles.wrap}
    >
      <Box
        onClick={clickHandler}
        sx={styles.body(theme, isCurrent)}
      >
        <Box sx={styles.leftSide}>
          <CustomAvatar extra={styles.avatar} width={50} src={chatterAva} />
          <Box sx={styles.mainData}>
            <TypographyWithEllipsis>{chatterName}</TypographyWithEllipsis>
            <SmallGreyText
              sx={styles.grey(theme, isCurrent)}
            >
              <TypographyWithEllipsis>
                {lastMessage?.text}
              </TypographyWithEllipsis>
            </SmallGreyText>
          </Box>
        </Box>
        <Box sx={styles.rightSide}>
          <Typography
            sx={styles.date}
          >
            {lastMessage &&
              `${new Date(lastMessage.createdAt).toLocaleDateString()}`.slice(0,5)}
          </Typography>
        </Box>
      </Box>
    </Box>
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
