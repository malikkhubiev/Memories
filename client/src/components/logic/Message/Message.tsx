import { Box, Typography, styled } from "@mui/material";
import React, { FC } from "react";
import { messageOptionsCallbackType } from "../../../types/callbacks";
import { BasicMenuComponent } from "../../ui/CustomMenu/CustomComponents/CustomMenuComponents";
import { CustomMenu } from "../../ui/CustomMenu/CustomMenu";
import { SmallGreyText } from "../../ui/customStyledComponents";
import styles from "./Messages.module.less";

export const Message: FC<MessagePropsType> = ({
  id,
  isOwn,
  text,
  createdAt,
  messageOptionsCallback,
}) => {
  const handler = () => {
    messageOptionsCallback(id);
  };
  const menuOptions = [
    {
      id: 1,
      component: BasicMenuComponent,
      props: { body: "Delete from me", icon: "clear" },
    },
  ];

  const Message = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    margin: "50px 0",
  }));

  const Header = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
  }));

  const Body = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "25px 35px",
  }));

  return (
    <Message
      sx={{
        justifyContent: () => (isOwn ? "flex-end" : "flex-start"),
      }}
    >
      <div className={styles.container}>
        <Header
          sx={{
            justifyContent: () => (isOwn ? "flex-end" : "flex-start"),
          }}
        >
          {isOwn ? (
            <>
              <SmallGreyText>
                {`${new Date(createdAt).toLocaleDateString()}, ${new Date(createdAt).toLocaleTimeString()}`}
              </SmallGreyText>
              <CustomMenu
                callback={handler}
                menuOptions={menuOptions}
                icon={"more_vertical"}
              />
            </>
          ) : (
            <>
              <CustomMenu
                side="left"
                callback={handler}
                menuOptions={menuOptions}
                icon={"more_vertical"}
              />
              <SmallGreyText>
                {`${new Date(createdAt).toLocaleDateString()}, ${new Date(createdAt).toLocaleTimeString()}`}
              </SmallGreyText>
            </>
          )}
        </Header>
        <Body
          sx={{
            backgroundColor: () => (isOwn ? "primary.main" : "secondary.main"),
            borderRadius: () =>
              isOwn ? "50px 0 50px 50px" : "0 50px 50px 50px",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              overflow: "hidden",
              wordWrap: "break-word",
              fontSize: "25px",
              color: () => (isOwn ? "#fff" : "#000"),
            }}
          >
            {text}
          </Typography>
        </Body>
      </div>
    </Message>
  );
};

type MessagePropsType = {
  messageOptionsCallback: messageOptionsCallbackType;
  id: number;
  isOwn: boolean;
  text: string;
  createdAt: string;
};
