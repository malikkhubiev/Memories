import { Box, Typography, useTheme } from "@mui/material";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import {
  chatsMenuOptionsActionsType,
  commentMenuOptionsActionsType,
  imageMenuOptionsActionsType,
  optionActionCallbackType,
} from "../../../../types/callbacks";
import { CustomAvatar } from "../../../ui/CustomAvatar/CustomAvatar";
import { CustomMenu } from "../../../ui/CustomMenu/CustomMenu";
import {
  CustomStack,
  TypographyWithEllipsis,
} from "../../../ui/customStyledComponents";
import styles from "./ItemHeaderStyle";

export const ItemHeader: FC<ItemHeaderPropsType> = ({
  authorId,
  authorName,
  menuOptions,
  avatar,
  component,
  createdAt,
  isOwn,
  optionActionCallback,
  imgSrc,
}) => {
  const theme = useTheme();

  return (
    <CustomStack>
      <Link to={`/profile:${authorId}`} style={styles.link}>
        <CustomAvatar src={avatar} width={55} />
        <Box sx={styles.nameDate}>
          <Typography variant="body2">{authorName}</Typography>
          <TypographyWithEllipsis
            sx={{
              fontSize: "18px",
            }}
            color="grey.main"
          >
            {`${new Date(createdAt).toLocaleDateString()}, ${new Date(createdAt).toLocaleTimeString()}`}
          </TypographyWithEllipsis>
        </Box>
      </Link>
      {component === "image" ? (
        <CustomMenu
          imgSrc={imgSrc}
          menuOptions={menuOptions}
          callback={optionActionCallback}
          icon="more_vertical"
        />
      ) : (
        isOwn && (
          <CustomMenu
            imgSrc={imgSrc}
            menuOptions={menuOptions}
            callback={optionActionCallback}
            icon="more_vertical"
          />
        )
      )}
    </CustomStack>
  );
};

type ItemHeaderPropsType = {
  optionActionCallback: optionActionCallbackType<
    | imageMenuOptionsActionsType
    | chatsMenuOptionsActionsType
    | commentMenuOptionsActionsType
  >;
  menuOptions: any[];
  authorId: number;
  authorName: string;
  isOwn: boolean;
  component: "image" | "comment";
  avatar: string;
  createdAt: string;
  imgSrc?: string;
};
