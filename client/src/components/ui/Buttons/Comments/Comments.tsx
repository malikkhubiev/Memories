import { Box, Typography, useTheme } from "@mui/material";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { commentsCallbackType } from "../../../../types/callbacks";
import { ColumnWrap } from "../../../layout/ColumnWrap/ColumnWrap";
import { CustomIcon } from "../../CustomIcons/CustomIcons";
import styles from "../Like/LikeStyle";

export const Comments: FC<CommentsPropsType> = ({
  imageId,
  commentsCallback,
  isCommentSectionOpened,
  numberOfComments,
}) => {

  const theme = useTheme();

  const handler = () => {
    commentsCallback && commentsCallback(!isCommentSectionOpened);
  };

  return (
    <Box sx={styles.main} onClick={handler}>
      <ColumnWrap removePadding={true}>
        {!commentsCallback ? (
          <Link to={`/post/:${imageId}/:true`}>
            <CustomIcon
              type="comments"
              extra={styles.iconExtra}
            />
          </Link>
        ) : (
          <CustomIcon
            type="comments"
            extra={styles.iconExtra}
          />
        )}
        <Typography
          sx={styles.count(theme)}
          variant="body2"
        >
          {numberOfComments}
        </Typography>
      </ColumnWrap>
    </Box>
  );
};

export type CommentsPropsType = {
  commentsCallback?: commentsCallbackType;
  isCommentSectionOpened?: boolean;
  imageId: number;
  numberOfComments: string;
};
