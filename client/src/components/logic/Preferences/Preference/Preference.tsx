import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { FC } from "react";
import styles from "./Preference.module.less";

const PreferenceBox = styled(Box)(({ theme }) => ({
  padding: "15px",
  borderRadius: "50px",
  margin: "10px",
  cursor: "pointer",
}));

export const Preference: FC<PreferencePropsType> = ({
  text,
  isSelected,
  selectPref,
  unSelectPref,
}) => {
  const selectHandler = () => {
    if (!isSelected) {
      selectPref(text);
    } else {
      unSelectPref(text);
    }
  };

  return (
    <PreferenceBox
      onClick={selectHandler}
      sx={{
        backgroundColor: () => (isSelected ? "primary.main" : "transparent"),
        color: () => (isSelected ? "#fff" : "#000"),
      }}
    >
      <Typography
        variant="body2"
        sx={{
          wordBreak: "break-word",
          fontWeight: "bold",
          fontSize: "30px",
        }}
      >
        #{text}
      </Typography>
    </PreferenceBox>
  );
};

export const CustomPreference: FC<CustomPreferencePropsType> = ({
  text,
  removeCustomPref,
}) => {
  const selectHandler = () => {
    removeCustomPref(text);
  };

  return (
    <PreferenceBox
      onClick={selectHandler}
      sx={{
        backgroundColor: "primary.main",
        color: "#fff",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          wordBreak: "break-word",
          fontWeight: "bold",
          fontSize: "30px",
        }}
      >
        #{text}
      </Typography>
    </PreferenceBox>
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
