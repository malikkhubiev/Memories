import { Box, Popover, Typography, Link as MaterialLink } from "@mui/material";
import React, { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  CustomFilledLikeIcon,
  CustomLikeIcon,
} from "../../CustomIcons/CustomIcons";
import styles from "./Like.module.less";

export const Like: FC<LikePropsType> = ({
  imageId,
  isLiked,
  like,
  unLike,
  numberOfLikes,
}) => {
  const likeHandler = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    like();
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={styles.like}>
      {imageId ? (
        <Box className={styles.icon}>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <MaterialLink
              variant="body2"
              component={RouterLink}
              sx={{
                textDecoration: "none",
                color: "#000",
              }}
              to={`/liked:${imageId}`}
            >
              See all liked
            </MaterialLink>
          </Popover>
          {isLiked ? (
            <Box onClick={unLike}>
              <CustomFilledLikeIcon width="40" />
            </Box>
          ) : (
            <Box aria-describedby={id} onClick={likeHandler}>
              <CustomLikeIcon width="40" />
            </Box>
          )}
        </Box>
      ) : (
        <Box className={styles.icon} onClick={isLiked ? unLike : like}>
          {isLiked ? (
            <CustomFilledLikeIcon width="40" />
          ) : (
            <CustomLikeIcon width="40" />
          )}
        </Box>
      )}
      <Typography
        sx={{
          fontSize: "20px",
        }}
        variant="body2"
      >
        {numberOfLikes}
      </Typography>
    </div>
  );
};

export type LikePropsType = {
  imageId?: number;
  isLiked: boolean;
  like: () => void;
  unLike: () => void;
  numberOfLikes: string;
};
