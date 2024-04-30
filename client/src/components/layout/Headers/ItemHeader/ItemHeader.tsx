import { Typography, useTheme } from "@mui/material";
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
import styles from "./ItemHeader.module.less";

export const ItemHeader: FC<ItemHeaderPropsType> = ({
  authorId,
  authorName,
  menuOptions,
  avatar,
  createdAt,
  optionActionCallback,
  imgSrc,
}) => {
  const theme = useTheme();

  return (
    <CustomStack>
      <Link to={`/profile:${authorId}`} className={styles.link}>
        <CustomAvatar src={avatar} width={55} />
        <div className={styles.nameDate}>
          <Typography variant="body2">{authorName}</Typography>
          <TypographyWithEllipsis
            sx={{
              fontSize: "18px",
            }}
            color="grey.main"
          >
            {`${new Date(createdAt).toLocaleDateString()}, ${new Date(createdAt).toLocaleTimeString()}`}
          </TypographyWithEllipsis>
        </div>
      </Link>
      <CustomMenu
        imgSrc={imgSrc}
        menuOptions={menuOptions}
        callback={optionActionCallback}
        icon="more_vertical"
      />
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
  avatar: string;
  createdAt: string;
  imgSrc?: string;
};
