import {
  Box,
  Popover,
  Typography,
  Link as MaterialLink,
  useTheme,
} from "@mui/material";
import React, { FC, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { CustomIcon } from "../../CustomIcons/CustomIcons";
import styles from "./LikeStyle";

const Like: FC<LikePropsType> = ({
  imageId,
  isLiked: isLikedProps,
  like,
  unLike,
  numberOfLikes,
}) => {
  const theme = useTheme();

  let [isLiked, setIsLiked] = useState<boolean>(isLikedProps);
  const likeHandler = (event: React.MouseEvent<HTMLElement>) => {
    if (isLiked) {
      setIsLiked((prev) => (prev = false));
      unLike();
    } else {
      setIsLiked((prev) => (prev = true));
      setAnchorEl(event.currentTarget);
      like();
    }
  };

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box sx={styles.main}>
      <Box>
        {imageId && (
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
              sx={styles.seeAll(theme)}
              to={`/liked:${imageId}`}
            >
              See all liked
            </MaterialLink>
          </Popover>
        )}
        {isLiked ? (
          <div data-testid="unLike" onClick={likeHandler}>
            <CustomIcon type="filled_like" extra={styles.iconExtra} />
          </div>
        ) : (
          <div data-testid="like" aria-describedby={id} onClick={likeHandler}>
            <CustomIcon type="like" extra={styles.iconExtra} />
          </div>
        )}
      </Box>
      <Typography sx={styles.count(theme)} variant="body2">
        {numberOfLikes}
      </Typography>
    </Box>
  );
};

export default Like;

export type LikePropsType = {
  imageId?: number;
  isLiked: boolean;
  like: () => void;
  unLike: () => void;
  numberOfLikes: string;
};
