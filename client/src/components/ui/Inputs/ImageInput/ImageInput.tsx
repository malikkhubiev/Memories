import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { FC, useRef } from "react";
import uploadImage from "../../../../assets/123.png";
import { uploadImageCallbackType } from "../../../../types/callbacks";
import styles from "./ImageInputStyle";
import { CustomIcon } from "../../CustomIcons/CustomIcons";

export const ImageInput: FC<ImageInputPropsType> = ({
  uploadImageCallback,
  src,
}) => {
  const ref = useRef<any>();

  const inputHandler = () => {
    if (ref?.current?.click) {
      ref.current.click();
    }
  };

  const theme = useTheme();
  const isSmallSize = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box onClick={inputHandler} sx={styles.container(isSmallSize)}>
      <input
        ref={ref}
        style={styles.invisibleInput}
        type="file"
        onChange={uploadImageCallback}
      />
      {src ? (
        <img
          style={styles.image}
          src={src.length > 40 ? src : process.env.REACT_APP_API_URL + src}
        />
      ) : (
        <CustomIcon extra={styles.image} type="upload_image" />
      )}
    </Box>
  );
};

type ImageInputPropsType = {
  src?: string;
  uploadImageCallback: uploadImageCallbackType;
};
