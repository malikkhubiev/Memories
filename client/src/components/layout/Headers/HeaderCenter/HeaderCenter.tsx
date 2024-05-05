import { Box, Typography } from "@mui/material";
import React, { FC } from "react";
import { sortByToggleCallbackType } from "../../../../types/callbacks";
import { Sort } from "../../../ui/Buttons/Sort/Sort";
import styles from "./HeaderCenterStyle";

export const HeaderCenter: FC<HeaderCenterPropsType> = ({
  numberOf,
  isSortingByPopularity,
  sortByToggleCallback,
  children,
}) => {
  return (
    <Box sx={styles.headerCenter}>
      {children}
      <Typography variant="body2">{numberOf}</Typography>
      <Sort
        isSortingByPopularity={isSortingByPopularity}
        sortByToggleCallback={sortByToggleCallback}
      />
    </Box>
  );
};

type HeaderCenterPropsType = {
  numberOf: string;
  sortByToggleCallback: sortByToggleCallbackType;
  isSortingByPopularity: boolean;
  children: any;
};
