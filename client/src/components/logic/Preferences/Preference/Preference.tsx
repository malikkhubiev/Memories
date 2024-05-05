import { Box, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import React, { FC } from "react";
import styles from "./PreferenceStyle";

export const Preference: FC<PreferencePropsType> = ({
  text,
  isSelected,
  selectPref,
  unSelectPref,
}) => {

  const theme = useTheme();

  const selectHandler = () => {
    if (!isSelected) {
      selectPref(text);
    } else {
      unSelectPref(text);
    }
  };

  return (
    <Box
      onClick={selectHandler}
      sx={styles.box(theme, isSelected)}
    >
      <Typography
        variant="body2"
        sx={styles.text}
      >
        #{text}
      </Typography>
    </Box>
  );
};

export const CustomPreference: FC<CustomPreferencePropsType> = ({
  text,
  removeCustomPref,
}) => {

  const theme = useTheme();

  const selectHandler = () => {
    removeCustomPref(text);
  };

  return (
    <Box
      onClick={selectHandler}
      sx={styles.customBox(theme)}
    >
      <Typography
        variant="body2"
        sx={styles.text}
      >
        #{text}
      </Typography>
    </Box>
  );
};

type PreferencePropsType = {
  text: string;
  isSelected: boolean;
  selectPref: (pref: string) => void;
  unSelectPref: (pref: string) => void;
};

type CustomPreferencePropsType = {
  text: string;
  removeCustomPref: (pref: string) => void;
};
