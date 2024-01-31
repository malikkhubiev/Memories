import { Box } from '@mui/material';
import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClearAllChats, useDeleteAllChats } from '../../../fullStore/combos/chats/chatsQueries';
import { setErrorMessage, setIsLoading } from '../../../fullStore/combos/user/userSlice';
import { useAppDispatch } from '../../../fullStore/hooks';
import { chatsMenuOptionsActionsType, optionActionCallbackType, setChatIdCallbackType } from '../../../types/callbacks';
import { chatType } from '../../../types/storeTypes';
import { Header } from '../../layout/Headers/Header/Header';
import { CustomArrowBackIcon, CustomBroomIcon, CustomDeleteIcon, CustomMoreVerticalIcon } from '../../ui/CustomIcons/CustomIcons';
import { BasicMenuComponent } from '../../ui/CustomMenu/CustomComponents/CustomMenuComponents';
import { CustomMenu, menuOption } from '../../ui/CustomMenu/CustomMenu';
import { Chat } from '../Chat/Chat';
import styles from './Chats.module.less';

const menuOptions: any[] = [
    { id: 1, props: { body: "Clear all chats", icon: CustomBroomIcon } },
    { id: 2, props: { body: "Delete all chats", icon: CustomDeleteIcon } },
];

export const Chats: FC<ChatsPropsType> = (
    { currentChatId, chats, setChats, setCurrentChat }
) => {

    const navigate = useNavigate();

    const [clearAllChats] = useClearAllChats();
    const [deleteAllChats] = useDeleteAllChats();

    const usualDispatch = useAppDispatch();

    const setChatIdCallback: setChatIdCallbackType = (chatId) => {
        chats.length && chats.forEach((chat: chatType, index) => {
            if (chat.id === chatId) {
                setCurrentChat(prev => prev = chat);
                setChats(prev => {
                    const updatedChats = prev.map(chat => {
                        const updatedChat = JSON.parse(
                            JSON.stringify(chat)
                        );
                        updatedChat.newMessagesNumber = 0;
                        return updatedChat;
                    });
                    return prev = updatedChats;
                });
            };
        });
    };

    const optionActionCallback: optionActionCallbackType<chatsMenuOptionsActionsType> =
        (action) => {
            if (action === "Clear all chats" && chats.length) {
                usualDispatch(setIsLoading(true));
                clearAllChats(null)
                    .unwrap()
                    .then(() => {
                        setChats(prev => {
                            const updatedChats = prev.map(chat => {
                                const updatedChat = JSON.parse(
                                    JSON.stringify(chat)
                                );
                                updatedChat.messages = [];
                                updatedChat.lastMessage = null;
                                return updatedChat;
                            });
                            return prev = updatedChats;
                        });
                        setCurrentChat(prev => prev = null);
                    })
                    .catch(e => usualDispatch(setErrorMessage(e.data.message)));
                usualDispatch(setIsLoading(false));
            } else if (action === "Delete all chats" && chats.length) {
                usualDispatch(setIsLoading(true));
                deleteAllChats(null)
                    .unwrap()
                    .then(() => {
                        setChats(prev => prev = []);
                        setCurrentChat(prev => prev = null);
                    })
                    .catch(e => usualDispatch(setErrorMessage(e.data.message)));
                usualDispatch(setIsLoading(false));
            };
        };

    useEffect(() => {
        menuOptions.forEach((option: menuOption) => {
            option["component"] = BasicMenuComponent;
        });
    }, []);

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
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "column",
                overflowX: "hidden",
                overFlowY: "scroll",
                backgroundColor: "grey"
            }}
        >
            <div className={styles.header}>
                <div
                    onClick={() => navigate(-1)}
                >
                    <CustomArrowBackIcon />
                </div>
                <Header text={"Chats"} />
                <CustomMenu
                    menuOptions={menuOptions}
                    callback={optionActionCallback}
                    icon={CustomMoreVerticalIcon}
                />
            </div>
            {
                chats && chats.length ? chats.map((chat: any) =>
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
                ) : ""
            }
        </Box>
    );
};

type ChatsPropsType = {
    setChats: React.Dispatch<React.SetStateAction<[] | chatType[]>>
    setCurrentChat: React.Dispatch<React.SetStateAction<chatType>>
    chats: chatType[] | [] | null
    currentChatId?: number | string
};