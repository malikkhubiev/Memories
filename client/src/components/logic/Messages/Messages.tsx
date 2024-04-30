import {
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClearOneChat } from "../../../fullStore/combos/chats/chatsQueries";
import {
  setErrorMessage,
  setIsLoading,
} from "../../../fullStore/combos/user/userSlice";
import { useAppDispatch } from "../../../fullStore/hooks";
import { useSendMessage } from "../../../fullStore/queries/messagesQueries";
import useSocket from "../../../hooks/useSocket";
import {
  addInputCallbackType,
  chatsMenuOptionsActionsType,
  messageOptionsCallbackType,
  messagesMenuOptionsActionsType,
  optionActionCallbackType,
  setNewChatCallbackType,
} from "../../../types/callbacks";
import { chatType, messageType } from "../../../types/storeTypes";
import { Plug } from "../../layout/Plug/Plug";
import { Avatar } from "../../ui/Buttons/Avatar/Avatar";
import { CustomAvatar } from "../../ui/CustomAvatar/CustomAvatar";
import { CustomIcon } from "../../ui/CustomIcons/CustomIcons";
import { BasicMenuComponent } from "../../ui/CustomMenu/CustomComponents/CustomMenuComponents";
import { CustomMenu, menuOption } from "../../ui/CustomMenu/CustomMenu";
import { TypographyWithEllipsis } from "../../ui/customStyledComponents";
import { AddInput } from "../../ui/Inputs/AddInput/AddInput";
import { Message } from "../Message/Message";
import styles from "./Messages.module.less";

const menuOptions: any[] = [
  { id: 1, props: { body: "Clear chat", icon: "broom" } },
  { id: 2, props: { body: "Delete chat", icon: "delete" } },
  { id: 3, props: { body: "Block user", icon: "block" } },
];

export const Messages: FC<MessagesPropsTypes> = ({
  id,
  ownId,
  userId,
  chatterAva,
  chatterName,
  messages,
  setNewChatCallback,
  customMenuHandler,
  messageOptionsCallback,
  setCurrentChat,
  upTheChat,
}) => {
  // state
  let [messageText, setMessageText] = useState<string>("");
  let [isSendedMessage, setIsSendedMessage] = useState<boolean>(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [newMessagesCounter, setNewMessagesCounter] = React.useState(0);

  // ref
  const messagesBlockRef = useRef<any>();

  const closeSnackBarHandler = () => {
    setOpenSnackBar((prev) => (prev = false));
    setNewMessagesCounter((prev) => (prev = 0));
  };

  // effects

  const { sendData } = useSocket("chats");

  useEffect(() => {
    // menu
    menuOptions.forEach((option: menuOption) => {
      option["component"] = BasicMenuComponent;
    });
  }, []);

  useEffect(() => {
    // chat scrolling
    if (!messagesBlockRef.current) return;
    if (
      messagesBlockRef.current.scrollHeight -
        messagesBlockRef.current.scrollTop <
        messagesBlockRef.current.clientHeight * 1.5 ||
      isSendedMessage
    )
      messagesBlockRef.current.scrollTop =
        messagesBlockRef.current.scrollHeight;
    else {
      setOpenSnackBar(true);
      setNewMessagesCounter((prev) => prev + 1);
    }
    setIsSendedMessage((prev) => (prev = false));

    // closing snackbar
    closeSnackBarHandler();
    if (!messagesBlockRef.current) return;
    messagesBlockRef.current.addEventListener("scroll", () => {
      if (
        messagesBlockRef.current.scrollHeight -
          messagesBlockRef.current.scrollTop <
        messagesBlockRef.current.clientHeight + 50
      ) {
        closeSnackBarHandler();
      }
    });

    messagesBlockRef.current.scrollTop = messagesBlockRef.current.scrollHeight;
  }, [messages]);

  const [sendMessage] = useSendMessage();

  const usualDispatch = useAppDispatch();

  const sendMessageHandler: addInputCallbackType = (text) => {
    if (text.trim() === "") return;
    setMessageText((prev) => (prev = text));
    usualDispatch(setIsLoading(true));
    sendMessage({
      chatId: typeof id === "string" ? null : id,
      from: ownId,
      to: userId,
      text: text,
    })
      .unwrap()
      .then((fulfilled) => {
        setMessageText((prev) => (prev = ""));
        if (fulfilled.chat) {
          setNewChatCallback(fulfilled.chat);
        }
        sendData({
          type: "chats",
          body: fulfilled.message,
        });
        setIsSendedMessage((prev) => (prev = true));
        setMessageText((prev) => (prev = ""));
        if (typeof id === "number") {
          upTheChat(id);
        }
      })
      .catch((e) => usualDispatch(setErrorMessage(e?.data?.message)));
    usualDispatch(setIsLoading(false));
  };

  const theme = useTheme();
  const isSmallSize = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        width: {
          xl: "50%",
          lg: "50%",
          md: "50%",
          sm: "100%",
          xs: "100%",
        },
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className={styles.header}>
        {isSmallSize ? (
          <div onClick={() => setCurrentChat((prev) => (prev = null))}>
            <CustomIcon type="arrow_back" />
          </div>
        ) : (
          ""
        )}
        <div className={styles.chatter}>
          <CustomAvatar width={50} src={chatterAva} />
          <TypographyWithEllipsis
            sx={{
              marginLeft: "20px",
              maxWidth: "70%",
            }}
          >
            {chatterName}
          </TypographyWithEllipsis>
        </div>
        {typeof id !== "string" ? (
          <CustomMenu
            icon="more_vertical"
            menuOptions={menuOptions}
            callback={customMenuHandler}
          />
        ) : (
          <Plug />
        )}
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackBar}
        message={`${newMessagesCounter} new messages`}
      />
      <div className={styles.body}>
        <div ref={messagesBlockRef} className={styles.messages}>
          {messages?.length
            ? messages.map((message: any) => (
                <Message
                  key={message.id}
                  messageOptionsCallback={messageOptionsCallback}
                  id={message.id}
                  isOwn={message.isOwn}
                  text={message.text}
                  createdAt={message.createdAt}
                />
              ))
            : ""}
        </div>
        <AddInput
          isMultiline={true}
          lines={3}
          text={messageText}
          addInputCallback={sendMessageHandler}
          buttonText="Send"
          placeholder="Looking good!"
        />
      </div>
    </Box>
  );
};

type MessagesPropsTypes = chatType & {
  messageOptionsCallback: messageOptionsCallbackType;
  setNewChatCallback: setNewChatCallbackType;
  customMenuHandler: optionActionCallbackType<messagesMenuOptionsActionsType>;
  setCurrentChat: React.Dispatch<React.SetStateAction<chatType>>;
  ownId: number;
  userId: number;
  upTheChat: (chatId: number) => void;
};
