import React, { FC, memo } from "react";
import { CustomIcon } from "../CustomIcons/CustomIcons";
import styles from './CustomAvatarStyle'

export const CustomAvatar: FC<CustomAvatarPropsType> = memo(
  ({ src, width, extra }) => {
    return (
      <>
        {src ? (
          <img
            style={styles.image(width)}
            src={process.env.REACT_APP_API_URL + src}
          />
        ) : (
          <CustomIcon
            type="account_circle"
            extra={{...styles.iconExtra(width), ...extra}}
          />
        )}
      </>
    );
  },
);

type CustomAvatarPropsType = {
  src: string;
  width?: number;
  extra?: any
};
