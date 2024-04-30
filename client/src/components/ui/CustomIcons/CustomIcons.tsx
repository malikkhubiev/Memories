import { useTheme } from "@mui/material";
import React, { FC } from "react";
import paths from "./paths";

type CustomIconPropsType = {
  type: string;
  extra?: any;
};

const base = {
  width: "25px",
  cursor: "pointer",
};

const extraInside: any = {
  share: () => ({
    transform: "scale(-1, 1)",
  }),
  arrow_outward: () => ({
    transform: "rotate(-45deg)",
  }),
  light_mode: (theme: any) => ({
    fill: theme.palette.text,
    backgroundColor: theme.palette.primary.mainBg,
  }),
};

export const CustomIcon: FC<CustomIconPropsType> = ({ type, extra }) => {
  const theme = useTheme();
  let insideExtra: any = {};
  if (extraInside[type]) {
    insideExtra = { ...insideExtra, ...extraInside[type](theme) };
  }
  return (
    <svg
      style={{
        ...base,
        ...insideExtra,
        fill: theme.palette.mode === "dark" ? "#fff" : "#000",
        ...extra,
      }}
      focusable="false"
      viewBox="0 0 24 24"
    >
      {/* @ts-ignore */}
      <path d={paths[type]}></path>
    </svg>
  );
};
