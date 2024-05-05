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
  arrow_outward: () => ({
    transform: "rotate(-45deg)",
  }),
  light_mode: (theme: any) => ({
    fill: theme.palette.text,
    backgroundColor: theme.palette.primary.black,
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

export const Logo:FC<{sx?:any, fill: string}> = ({sx, fill}) => {
  return (
    <svg
      style={sx && sx}
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="416.000000pt"
      height="480.000000pt"
      viewBox="0 0 416.000000 480.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,480.000000) scale(0.100000,-0.100000)"
        fill={fill}
        stroke="none"
      >
        <path d="M3830 4640 l0 -160 160 0 160 0 0 160 0 160 -160 0 -160 0 0 -160z" />
        <path
          d="M1920 4085 l0 -75 -885 0 -885 0 0 -965 0 -965 -75 0 -75 0 0 -1035
0 -1035 1135 0 1135 0 0 75 0 75 865 0 865 0 0 960 0 960 75 0 75 0 0 1040 0
1040 -1115 0 -1115 0 0 -75z m0 -170 l0 -75 955 0 955 0 0 -880 0 -880 75 0
75 0 0 -950 0 -950 -855 0 -855 0 0 75 0 75 -975 0 -975 0 0 875 0 875 -75 0
-75 0 0 955 0 955 875 0 875 0 0 -75z"
        />
        <path
          d="M1999 2979 c-104 -9 -168 -25 -269 -67 -313 -130 -529 -418 -558
-745 -38 -419 200 -802 590 -947 206 -76 447 -73 650 10 157 64 309 183 404
317 169 236 214 552 118 827 -118 340 -444 587 -799 608 -33 2 -94 0 -136 -3z
m203 -340 c89 -18 193 -74 266 -144 125 -118 181 -245 182 -410 0 -182 -45
-291 -175 -420 -122 -122 -226 -165 -395 -166 -173 0 -288 48 -411 171 -118
118 -169 239 -169 400 0 163 52 291 165 406 79 80 172 137 261 158 72 17 204
20 276 5z"
        />
      </g>
    </svg>
  );
};
