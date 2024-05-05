import {
  Box,
  Button,
  TextField,
  Typography
} from "@mui/material";
import React, { FC, useState } from "react";
import { changeInputCallbackType } from "../../../../types/callbacks";
import { CustomIcon } from "../../CustomIcons/CustomIcons";
import styles from "./ChangeInputStyle";

export const ChangeInput: FC<ChangeInputPropsType> = ({
  text,
  changeInputCallback,
  placeholder,
  sx,
  isMultiline,
}) => {
  let [value, setValue] = useState<string>(text);
  let [isChangingMode, setIsChangingMode] = useState<boolean>(false);

  const inputHandler = (event: any) => {
    setValue((prev) => (prev = event.target.value));
  };

  const openChangingMode = () => {
    setIsChangingMode((prev) => (prev = true));
  };

  const saveHandler = () => {
    setIsChangingMode((prev) => (prev = false));
    changeInputCallback(value);
  };

  return (
    <Box sx={sx || null}>
      {isChangingMode ? (
        <Box sx={styles.group}>
          <TextField
            multiline={isMultiline}
            maxRows={isMultiline ? 10 : null}
            placeholder={placeholder || null}
            onChange={inputHandler}
            value={value}
            onKeyPress={(ev) => {
              if (ev.key === "Enter") {
                saveHandler();
                ev.preventDefault();
              }
            }}
          />
          <Button sx={styles.button} onClick={saveHandler} variant="contained">
            &#10003;
          </Button>
        </Box>
      ) : (
        <Box sx={styles.group}>
          <Typography
            variant="body2"
            sx={styles.text}
          >
            {text || placeholder}
          </Typography>
          <div onClick={openChangingMode}>
            <CustomIcon extra={styles.edit} type="edit" />
          </div>
        </Box>
      )}
    </Box>
  );
};

type ChangeInputPropsType = {
  text?: string;
  changeInputCallback: changeInputCallbackType;
  placeholder?: string;
  sx?: any;
  isMultiline?: true;
};
