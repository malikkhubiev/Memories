import { Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { Chats } from "../../../components/logic/Chats/Chats";
import { Messages } from "../../../components/logic/Messages/Messages";
import {
  useClearOneChat,
  useDeleteOneChat,
  useGetChats,
} from "../../../fullStore/combos/chats/chatsQueries";
import { selectNewChatUserId } from "../../../fullStore/combos/chats/chatsSlice";
import { blockThunk } from "../../../fullStore/combos/profile/profileQueries";
import {
  selectId,
  setErrorMessage,
  setIsLoading,
} from "../../../fullStore/combos/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../../fullStore/hooks";
import { useDeleteMessage } from "../../../fullStore/queries/messagesQueries";
import { RootState } from "../../../fullStore/rootStore";
import useCustomDispatch from "../../../hooks/useCustomDispatch";
import useSocket from "../../../hooks/useSocket";
import useUser from "../../../hooks/useUser";
import {
  messageOptionsCallbackType,
  messagesMenuOptionsActionsType,
  optionActionCallbackType,
  setNewChatCallbackType,
} from "../../../types/callbacks";
import { chatType, messageType } from "../../../types/storeTypes";
import styles from "./ChatsPage.module.less";

export const ChatsPage: FC<{}> = () => {
  let [chats, setChats] = useState<chatType[] | [] | null>(null);
  let [currentChat, setCurrentChat] = useState<chatType | null>(null);

  let userId = useAppSelector((state: RootState) => selectNewChatUserId(state));
  const user = useUser(userId);

  let [isNewChatMakingDone, setIsNewChatMakingDone] = useState<boolean>(false);

  const ownId = useAppSelector((state) => selectId(state));

  const [getChats] = useGetChats();

  const { data: message } = useSocket("chats");

  const usualDispatch = useAppDispatch();

  const getAllChats = () => {
    usualDispatch(setIsLoading(true));
    getChats(null)
      .unwrap()
      .then((fulfilled) => {
        const copy = JSON.parse(JSON.stringify(fulfilled));
        copy.forEach((chat: chatType) => (chat.newMessagesNumber = 0));
        setChats((prev) => (prev = copy));
      })
      .catch((e) => usualDispatch(setErrorMessage(e.data.message)));
    usualDispatch(setIsLoading(false));
  };

  useEffect(() => {
    getAllChats();
  }, []);

  useEffect(() => {
    if (message) {
      const messageCopy = JSON.parse(JSON.stringify(message));
      messageCopy.isOwn = ownId === messageCopy.from;
      if (currentChat && messageCopy.idOfChat === currentChat.id) {
        if (currentChat.messages) {
          let foundMessageCopy = false;
          let indexOfMessage;
          currentChat.messages.forEach((cHMessage: messageType, index) => {
            if (cHMessage.id === messageCopy.id) {
              foundMessageCopy = true;
              indexOfMessage = index;
            }
          });
          if (foundMessageCopy) {
            const currentChatCopy = JSON.parse(JSON.stringify(currentChat));
            currentChatCopy.messages.splice(indexOfMessage, 1);
            setCurrentChat((prev) => (prev = currentChatCopy));
            setCurrentChat(
              (prev) =>
                (prev = {
                  ...prev,
                  messages: [...prev.messages, messageCopy],
                  lastMessage: messageCopy,
                }),
            );
          } else {
            setCurrentChat(
              (prev) =>
                (prev = {
                  ...prev,
                  messages: [...prev.messages, messageCopy],
                  lastMessage: messageCopy,
                }),
            );
          }
        } else {
          setCurrentChat(
            (prev) =>
              (prev = {
                ...prev,
                messages: [messageCopy],
                lastMessage: messageCopy,
              }),
          );
        }
      } else if (chats && chats.length) {
        let flag = false;
        let chatIndex;
        chats.forEach((chat: chatType, index) => {
          if (chat.id === messageCopy.idOfChat) {
            flag = true;
            chatIndex = index;
          }
        });
        if (flag) {
          const chatsCopy = JSON.parse(JSON.stringify(chats));
          const foundChat = chatsCopy.splice(chatIndex, 1)[0];
          foundChat.lastMessage = messageCopy;
          chatsCopy.unshift(foundChat);
          if (chatsCopy[0].messages) {
            chatsCopy[0].messages.push(messageCopy);
          } else {
            chatsCopy[0].messages = [messageCopy];
          }
          setChats((prev) => (prev = chatsCopy));
        } else {
          getAllChats();
        }
      } else {
        getAllChats();
      }
    }
  }, [message]);

  useEffect(() => {
    if (user && !isNewChatMakingDone) {
      if (chats) {
        if (chats.length) {
          let flag = false;
          chats.forEach((chat: chatType) => {
            if (
              (chat.firstChatterId === userId &&
                chat.secondChatterId === ownId) ||
              (chat.secondChatterId === userId && chat.firstChatterId === ownId)
            ) {
              flag = true;
              console.log(123);
              setCurrentChat((prev) => (prev = chat));
              setIsNewChatMakingDone((prev) => (prev = true));
            }
          });
          if (!flag) {
            const newChat: chatType = {
              id: `${Number.MAX_SAFE_INTEGER}`,
              firstChatterId: ownId,
              secondChatterId: userId,
              chatterAva: user.avatar,
              chatterName: user.name,
              messages: [],
              lastMessage: null,
            };
            setCurrentChat((prev) => (prev = newChat));
            setChats((prev) => (prev = [newChat, ...prev]));
            setIsNewChatMakingDone((prev) => (prev = true));
          }
        } else {
          const newChat: chatType = {
            id: `${Number.MAX_SAFE_INTEGER}`,
            firstChatterId: ownId,
            secondChatterId: userId,
            chatterAva: user.avatar,
            chatterName: user.name,
            messages: [],
            lastMessage: null,
          };
          setCurrentChat((prev) => (prev = newChat));
          setChats((prev) => (prev = [newChat]));
          setIsNewChatMakingDone((prev) => (prev = true));
        }
      }
    }
  }, [user, chats]);

  const setNewChatCallback: setNewChatCallbackType = (chat) => {
    if (chats && chats.length) {
      const chatsCopy = chats.slice(1);
      setChats((prev) => (prev = [chat, ...chatsCopy]));
    } else {
      setChats((prev) => (prev = [chat]));
    }
    setCurrentChat((prev) => (prev = chat));
  };

  const upTheChat = (chatId: number) => {
    const chatsCopy = JSON.parse(JSON.stringify(chats));
    let myIndex;
    chatsCopy.forEach((chat: chatType, index: number) => {
      if (chat.id === chatId) myIndex = index;
    });
    chatsCopy.splice(myIndex, 1);
    chatsCopy.unshift(currentChat);
    setChats((prev) => (prev = chatsCopy));
  };

  const thunkDispatch = useCustomDispatch();
  const [clearChat] = useClearOneChat();
  const [deleteChat] = useDeleteOneChat();

  const customMenuHandler: optionActionCallbackType<
    messagesMenuOptionsActionsType
  > = (action) => {
    if (action === "Clear chat") {
      usualDispatch(setIsLoading(true));
      clearChat({ chatId: +currentChat.id })
        .unwrap()
        .then(() => {
          setCurrentChat(
            (prev) =>
              (prev = {
                ...prev,
                messages: [],
                lastMessage: null,
              }),
          );
          setChats((prev) => {
            return (prev = prev.map((chat) => {
              if (chat.id === currentChat.id) {
                const clearedChat = JSON.parse(JSON.stringify(chat));
                clearedChat.messages = [];
                clearedChat.lastMessage = null;
                return clearedChat;
              } else return chat;
            }));
          });
        })
        .catch((e) => usualDispatch(setErrorMessage(e.data.message)));
      usualDispatch(setIsLoading(false));
    } else if (action === "Delete chat") {
      usualDispatch(setIsLoading(true));
      deleteChat({ chatId: +currentChat.id })
        .unwrap()
        .then(() => {
          setCurrentChat((prev) => (prev = null));
          setChats((prev) => {
            const updatedChats = prev.filter(
              (chat: chatType) => chat.id !== currentChat.id,
            );
            return (prev = updatedChats);
          });
        })
        .catch((e) => usualDispatch(setErrorMessage(e.data.message)));
      usualDispatch(setIsLoading(false));
    } else if (action === "Block user") {
      const userId =
        currentChat.firstChatterId === ownId
          ? currentChat.secondChatterId
          : currentChat.firstChatterId;
      const resolveCallback = () => {
        setCurrentChat((prev) => (prev = null));
        setChats((prev) => {
          const updatedChats = prev.filter(
            (chat: chatType) => chat.id !== currentChat.id,
          );
          return (prev = updatedChats);
        });
      };
      thunkDispatch(blockThunk(userId), resolveCallback);
    }
  };

  const [deleteMessage] = useDeleteMessage();

  const messageOptionsCallback: messageOptionsCallbackType = (messageId) => {
    usualDispatch(setIsLoading(true));
    deleteMessage({
      chatId: +currentChat.id,
      messageId,
    })
      .unwrap()
      .then(() => {
        const updatedMessages = currentChat.messages.filter(
          (message) => message.id !== messageId,
        );
        const copyOfCurrentChat = JSON.parse(JSON.stringify(currentChat));
        copyOfCurrentChat.messages = updatedMessages;
        const newLastMessage = updatedMessages[updatedMessages.length - 1];
        if (copyOfCurrentChat.lastMessage.id === messageId)
          copyOfCurrentChat.lastMessage = newLastMessage;
        setCurrentChat((prev) => (prev = copyOfCurrentChat));
        setChats((prev) => {
          return prev.map((chat) => {
            if (chat.id === copyOfCurrentChat.id) {
              return {
                ...chat,
                lastMessage: newLastMessage,
              };
            }
            return chat;
          });
        });
      })
      .catch((e) => usualDispatch(setErrorMessage(e.data.message)));
    usualDispatch(setIsLoading(false));
  };

  let messagesProps: any = {};

  if (currentChat) {
    messagesProps = {
      ...currentChat,
      setNewChatCallback,
      customMenuHandler,
      messageOptionsCallback,
      ownId,
      userId:
        (currentChat.firstChatterId === ownId
          ? currentChat.secondChatterId
          : currentChat.firstChatterId) || userId,
    };
  }

  const theme = useTheme();
  const isSmallSize = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className={styles.page}>
      {isSmallSize ? (
        !currentChat ? (
          <Chats
            setChats={setChats}
            setCurrentChat={setCurrentChat}
            chats={chats}
          />
        ) : (
          <Messages
            upTheChat={upTheChat}
            setCurrentChat={setCurrentChat}
            {...messagesProps}
          />
        )
      ) : (
        <>
          <Chats
            currentChatId={currentChat?.id}
            setChats={setChats}
            setCurrentChat={setCurrentChat}
            chats={chats}
          />
          {currentChat ? (
            <Messages
              upTheChat={upTheChat}
              setCurrentChat={setCurrentChat}
              {...messagesProps}
            />
          ) : (
            <div className={styles.plug}>
              <Typography variant="body1">Be happy!</Typography>
            </div>
          )}
        </>
      )}
    </div>
  );
};
