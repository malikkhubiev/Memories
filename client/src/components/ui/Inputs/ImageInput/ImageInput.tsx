import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { FC, useRef } from "react";
import uploadImage from "../../../../assets/123.png";
import { uploadImageCallbackType } from "../../../../types/callbacks";
import styles from "./ImageInput.module.less";

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
    <Box
      onClick={inputHandler}
      sx={{
        width: isSmallSize ? "100%" : "50%",
        height: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <input
        ref={ref}
        className={styles.invisibleInput}
        type="file"
        onChange={uploadImageCallback}
      />
      {src ? (
        <img
          className={styles.image}
          src={src.length > 40 ? src : process.env.REACT_APP_API_URL + src}
        />
      ) : (
        <img className={styles.image} src={uploadImage} />
      )}
    </Box>
  );
};

type ImageInputPropsType = {
  src?: string;
  uploadImageCallback: uploadImageCallbackType;
};
