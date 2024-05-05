import React, { FC } from "react";
import { CustomStack } from "../../customStyledComponents";
import { Comments, CommentsPropsType } from "../Comments/Comments";
import Like, { LikePropsType } from "../Like/Like";
import { Share, SharePropsType } from "../Share/Share";
import styles from "./ImageButtonsStyle";

export const Buttons: FC<ButtonsPropsType> = ({
  isLiked,
  like,
  unLike,
  numberOfLikes,
  numberOfComments,
  imageId,
  url,
  commentsCallback,
  isCommentSectionOpened,
}) => {
  return (
    <CustomStack sx={styles.stack}>
      <Like
        imageId={imageId}
        isLiked={isLiked}
        like={like}
        unLike={unLike}
        numberOfLikes={numberOfLikes}
      />
      <Comments
        imageId={imageId}
        numberOfComments={numberOfComments}
        commentsCallback={commentsCallback || null}
        isCommentSectionOpened={isCommentSectionOpened || null}
      />
      <Share url={url} />
    </CustomStack>
  );
};

type ButtonsPropsType = LikePropsType & SharePropsType & CommentsPropsType;
