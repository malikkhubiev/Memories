import React, { FC } from "react";
import { CustomStack } from "../../customStyledComponents";
import { Comments, CommentsPropsType } from "../Comments/Comments";
import { Like, LikePropsType } from "../Like/Like";
import { Share, SharePropsType } from "../Share/Share";
import styles from "./ImageButtons.module.less";

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
    <CustomStack
      sx={{
        padding: {
          xl: "25px 50px",
          sm: "25px 20px",
          xs: "25px 20px",
        },
      }}
    >
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
