import {
  Box,
  Popover,
  Typography,
  Link as MaterialLink,
  useTheme,
} from "@mui/material";
import React, { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { CustomIcon } from "../../CustomIcons/CustomIcons";
import styles from "./LikeStyle";

export const Like: FC<LikePropsType> = ({
  imageId,
  isLiked,
  like,
  unLike,
  numberOfLikes,
}) => {
  const theme = useTheme();

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
    <Box sx={styles.main}>
      {imageId ? (
        <Box>
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
          {isLiked ? (
            <Box onClick={unLike}>
              <CustomIcon type="filled_like" extra={styles.iconExtra} />
            </Box>
          ) : (
            <Box aria-describedby={id} onClick={likeHandler}>
              <CustomIcon type="like" extra={styles.iconExtra} />
            </Box>
          )}
        </Box>
      ) : (
        <Box onClick={isLiked ? unLike : like}>
          {isLiked ? (
            <CustomIcon type="filled_like" extra={styles.iconExtra} />
          ) : (
            <CustomIcon type="like" extra={styles.iconExtra} />
          )}
        </Box>
      )}
      <Typography sx={styles.count(theme)} variant="body2">
        {numberOfLikes}
      </Typography>
    </Box>
  );
};

export type LikePropsType = {
  imageId?: number;
  isLiked: boolean;
  like: () => void;
  unLike: () => void;
  numberOfLikes: string;
};
