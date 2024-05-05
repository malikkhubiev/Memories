import { Box, Typography, useTheme } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { messageOptionsCallbackType } from "../../../types/callbacks";
import { BasicMenuComponent } from "../../ui/CustomMenu/CustomComponents/CustomMenuComponents";
import { CustomMenu, menuOption } from "../../ui/CustomMenu/CustomMenu";
import { SmallGreyText } from "../../ui/customStyledComponents";
import styles from "./MessageStyle";
import { useTranslation } from "react-i18next";
import { addDynamicResources } from "../../../i18n/i18n";

const rawMenuOptions: any[] = [
  {
    id: 1,
    component: BasicMenuComponent,
    props: { body: "chats_deleteMessage", icon: "clear" },
  },
];

export const Message: FC<MessagePropsType> = ({
  id,
  isOwn,
  text,
  createdAt,
  messageOptionsCallback,
}) => {
  const { t } = useTranslation("authorized");

  let [menuOptions, setMenuOptions] = useState<any[]>([]);

  useEffect(() => {
    addDynamicResources("authorized");
    // menu
    let processedOptions = JSON.parse(JSON.stringify(rawMenuOptions))
    processedOptions.forEach((option: menuOption) => {
      option["component"] = BasicMenuComponent;
      option["props"]["body"] = t(option["props"]["body"]);
    });
    setMenuOptions((prev) => (prev = processedOptions));
  }, []);

  const handler = () => {
    messageOptionsCallback(id);
  };

  const theme = useTheme()

  return (
    <Box sx={styles.message(isOwn)}>
      <Box sx={styles.container(isOwn)}>
        <Box sx={styles.header(isOwn)}>
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
        </Box>
        <Box sx={styles.body(theme, isOwn)}>
          <Typography
            variant="body2"
            sx={styles.text(isOwn)}
          >
            {text}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

type MessagePropsType = {
  messageOptionsCallback: messageOptionsCallbackType;
  id: number;
  isOwn: boolean;
  text: string;
  createdAt: string;
};
