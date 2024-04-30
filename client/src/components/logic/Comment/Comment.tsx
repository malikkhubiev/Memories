import { Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import {
  setErrorMessage,
  setIsLoading,
} from "../../../fullStore/combos/user/userSlice";
import { useAppDispatch } from "../../../fullStore/hooks";
import {
  useLikeComment,
  useUnLikeComment,
} from "../../../fullStore/queries/commentQueries";
import {
  commentMenuOptionsActionsType,
  menuOptionsHandlerCallbackType,
  optionActionCallbackType,
} from "../../../types/callbacks";
import { ItemHeader } from "../../layout/Headers/ItemHeader/ItemHeader";
import Like from "../../ui/Buttons/Like/Like";
import { CustomStack } from "../../ui/customStyledComponents";
import styles from "./Comment.module.less";
import { useTranslation } from "react-i18next";
import { addDynamicResources } from "../../../i18n/i18n";

const rawMenuOptions = [
  { id: 1, props: { body: "comment_delete_button", icon: "delete" } },
];

export const Comment: FC<CommentPropsType> = ({
  id,
  authorId,
  authorName,
  isOwn,
  avatar,
  menuOptionsHandlerCallback,
  createdAt,
  text,
  numberOfLikes,
  isLiked,
}) => {
  let [menuOptions, setMenuOptions] = useState<any[]>([]);
  const { t } = useTranslation("authorized");
  useEffect(() => {
    addDynamicResources("authorized");
    const menuOptionsCopy = JSON.parse(JSON.stringify(rawMenuOptions));
    menuOptionsCopy.forEach((option: any) => {
      option["props"]["body"] = t(option["props"]["body"]);
    });
    setMenuOptions((prev) => (prev = menuOptionsCopy));
  }, []);

  let [currentIsLiked, setCurrentIsLiked] = useState<boolean>(isLiked);
  let [currentNumberOfLikes, setCurrentNumberOfLikes] =
    useState<string>(numberOfLikes);

  const [likeComment] = useLikeComment();
  const [unLikeComment] = useUnLikeComment();

  const usualDispatch = useAppDispatch();

  const like = () => {
    usualDispatch(setIsLoading(true));
    likeComment({ commentId: id })
      .unwrap()
      .then(() => {
        setCurrentIsLiked((prev) => (prev = true));
        setCurrentNumberOfLikes((prev) => (prev = `${+prev + 1}`));
      })
      .catch((e) => usualDispatch(setErrorMessage(e.data.message)));
    usualDispatch(setIsLoading(false));
  };

  const unLike = () => {
    usualDispatch(setIsLoading(true));
    unLikeComment({ commentId: id })
      .unwrap()
      .then(() => {
        setCurrentIsLiked((prev) => (prev = false));
        setCurrentNumberOfLikes((prev) => (prev = `${+prev - 1}`));
      })
      .catch((e) => usualDispatch(setErrorMessage(e.data.message)));
    usualDispatch(setIsLoading(false));
  };

  const optionActionCallback: optionActionCallbackType<
    commentMenuOptionsActionsType
  > = (action) => {
    menuOptionsHandlerCallback(id);
  };

  return (
    <div className={styles.comment}>
      <CustomStack sx={{ flexDirection: "column" }}>
        <>
          <ItemHeader
            optionActionCallback={optionActionCallback}
            menuOptions={menuOptions}
            authorId={authorId}
            authorName={authorName}
            isOwn={isOwn}
            avatar={avatar}
            createdAt={createdAt}
          />
          <div className={styles.line}>
            <Typography variant="body2" className={styles.body}>
              {text}
            </Typography>
            <div className={styles.like}>
              <Like
                isLiked={currentIsLiked}
                like={like}
                unLike={unLike}
                numberOfLikes={currentNumberOfLikes}
              />
            </div>
          </div>
        </>
      </CustomStack>
    </div>
  );
};

type CommentPropsType = {
  menuOptionsHandlerCallback?: menuOptionsHandlerCallbackType;
  id: number;
  authorId: number;
  authorName: string;
  isOwn: boolean;
  avatar: string;
  createdAt: string;
  text: string;
  numberOfLikes: string;
  isLiked: boolean;
};
