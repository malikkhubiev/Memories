import { Typography } from "@mui/material";
import React, { FC, useState } from "react";
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
import { Like } from "../../ui/Buttons/Like/Like";
import { CustomDeleteIcon } from "../../ui/CustomIcons/CustomIcons";
import { CustomStack } from "../../ui/customStyledComponents";
import styles from "./Comment.module.less";

const option = { id: 1, props: { body: "Delete", icon: CustomDeleteIcon } };

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
            menuOptions={[option]}
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
