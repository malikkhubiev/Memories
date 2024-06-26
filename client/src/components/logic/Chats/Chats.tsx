import { Box, useTheme } from "@mui/material";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  useClearAllChats,
  useDeleteAllChats,
} from "../../../fullStore/combos/chats/chatsQueries";
import {
  setErrorMessage,
  setIsLoading,
} from "../../../fullStore/combos/user/userSlice";
import { useAppDispatch } from "../../../fullStore/hooks";
import {
  chatsMenuOptionsActionsType,
  optionActionCallbackType,
  setChatIdCallbackType,
} from "../../../types/callbacks";
import { chatType } from "../../../types/storeTypes";
import { Header } from "../../layout/Headers/Header/Header";
import { CustomIcon } from "../../ui/CustomIcons/CustomIcons";
import { BasicMenuComponent } from "../../ui/CustomMenu/CustomComponents/CustomMenuComponents";
import { CustomMenu, menuOption } from "../../ui/CustomMenu/CustomMenu";
import { Chat } from "../Chat/Chat";
import styles from "./ChatsStyle";
import { useTranslation } from "react-i18next";
import { addDynamicResources } from "../../../i18n/i18n";

const rawMenuOptions: any[] = [
  { id: 1, props: { body: "chats_clear_all_chats_button", icon: "broom" } },
  { id: 2, props: { body: "chats_delete_all_chats_button", icon: "delete" } },
];

export const Chats: FC<ChatsPropsType> = ({
  currentChatId,
  chats,
  setChats,
  setCurrentChat,
}) => {
  const navigate = useNavigate();

  const [clearAllChats] = useClearAllChats();
  const [deleteAllChats] = useDeleteAllChats();
  let [menuOptions, setMenuOptions] = useState<any[]>([]);

  const { t } = useTranslation("authorized");
  useEffect(() => {
    addDynamicResources("authorized");
    const processedOptions = JSON.parse(JSON.stringify(rawMenuOptions));
    processedOptions.forEach((option: menuOption) => {
      option["component"] = BasicMenuComponent;
      option["props"]["body"] = t(option["props"]["body"]);
    });
    setMenuOptions((prev) => (prev = processedOptions));
  }, []);

  const usualDispatch = useAppDispatch();

  const setChatIdCallback: setChatIdCallbackType = (chatId) => {
    chats.length &&
      chats.forEach((chat: chatType, index) => {
        if (chat.id === chatId) {
          setCurrentChat((prev) => (prev = chat));
          setChats((prev) => {
            const updatedChats = prev.map((chat) => {
              const updatedChat = JSON.parse(JSON.stringify(chat));
              updatedChat.newMessagesNumber = 0;
              return updatedChat;
            });
            return (prev = updatedChats);
          });
        }
      });
  };

  const optionActionCallback: optionActionCallbackType<
    chatsMenuOptionsActionsType
  > = (action) => {
    if (action === "Clear all chats" && chats.length) {
      usualDispatch(setIsLoading(true));
      clearAllChats(null)
        .unwrap()
        .then(() => {
          setChats((prev) => {
            const updatedChats = prev.map((chat) => {
              const updatedChat = JSON.parse(JSON.stringify(chat));
              updatedChat.messages = [];
              updatedChat.lastMessage = null;
              return updatedChat;
            });
            return (prev = updatedChats);
          });
          setCurrentChat((prev) => (prev = null));
        })
        .catch((e) => usualDispatch(setErrorMessage(e.data.message)));
      usualDispatch(setIsLoading(false));
    } else if (action === "Delete all chats" && chats.length) {
      usualDispatch(setIsLoading(true));
      deleteAllChats(null)
        .unwrap()
        .then(() => {
          setChats((prev) => (prev = []));
          setCurrentChat((prev) => (prev = null));
        })
        .catch((e) => usualDispatch(setErrorMessage(e.data.message)));
      usualDispatch(setIsLoading(false));
    }
  };

  const theme = useTheme();

  return (
    <Box
      sx={styles.container(theme)}
    >
      <Box sx={styles.header(theme)}>
        <div onClick={() => navigate(-1)}>
          <CustomIcon type="arrow_back" />
        </div>
        <Header text={t("chats_header")} />
        <CustomMenu
          menuOptions={menuOptions}
          callback={optionActionCallback}
          icon="more_vertical"
        />
      </Box>
      {chats && chats.length
        ? chats.map((chat: any) => (
            <Chat
              key={chat.id}
              isCurrent={currentChatId === chat.id}
              setChatIdCallback={setChatIdCallback}
              id={chat.id}
              chatterAva={chat.chatterAva}
              chatterName={chat.chatterName}
              lastMessage={chat.lastMessage}
              newMessagesNumber={chat.newMessagesNumber}
            />
          ))
        : ""}
    </Box>
  );
};

type ChatsPropsType = {
  setChats: React.Dispatch<React.SetStateAction<[] | chatType[]>>;
  setCurrentChat: React.Dispatch<React.SetStateAction<chatType>>;
  chats: chatType[] | [] | null;
  currentChatId?: number | string;
};
