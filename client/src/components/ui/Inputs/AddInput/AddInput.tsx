import { Box, Button, TextField } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { addInputCallbackType } from "../../../../types/callbacks";
import styles from "./AddInputStyle";
import { useTranslation } from "react-i18next";
import { addDynamicResources } from "../../../../i18n/i18n";
import { CustomIcon } from "../../CustomIcons/CustomIcons";

export const AddInput: FC<AddInputPropsType> = ({
  text,
  placeholder,
  addInputCallback,
  isMultiline,
  label,
  sx,
  lines,
  inputTestId,
  buttonTestId,
  icon,
  iconExtra,
}) => {
  let [value, setValue] = useState<string>(text);
  const { t } = useTranslation("authorized");
  useEffect(() => {
    addDynamicResources("authorized");
  }, []);

  useEffect(() => {
    setValue((prev) => (prev = text));
  }, [text]);

  const textHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => (prev = event.target.value));
  };

  const buttonHandler = () => {
    addInputCallback(value);
  };

  let boxSx = styles.defaultBox;
  if (sx) boxSx = { ...boxSx, ...sx };

  return (
    <Box sx={boxSx}>
      <TextField
        sx={styles.input}
        data-testid={inputTestId}
        multiline={isMultiline}
        maxRows={lines || null}
        label={label}
        autoComplete="off"
        placeholder={placeholder ? placeholder : null}
        value={value}
        onChange={textHandler}
        onKeyPress={(ev) => {
          if (ev.key === "Enter") {
            buttonHandler();
            ev.preventDefault();
          }
        }}
      />
      <Button
        sx={styles.button}
        data-testid={buttonTestId}
        onClick={buttonHandler}
        variant="contained"
      >
        {icon ? (
          <CustomIcon extra={iconExtra && iconExtra} type={icon} />
        ) : (
          t("addInput_send")
        )}
      </Button>
    </Box>
  );
};

type AddInputPropsType = {
  placeholder?: string;
  label?: string;
  text?: string;
  sx?: any;
  inputTestId?: string;
  buttonTestId?: string;
  buttonText: string;
  addInputCallback: addInputCallbackType;
  isMultiline?: true;
  lines?: number;
  icon?: string;
  iconExtra?: any;
};
