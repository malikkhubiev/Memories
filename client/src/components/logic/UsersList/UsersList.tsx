import React, { FC } from "react";
import { searchButtonHandlerType } from "../../../types/common";
import { Header } from "../../layout/Headers/Header/Header";
import { PageHeader } from "../../layout/Headers/PageHeader/PageHeader";
import { ColumnWrap } from "../../layout/ColumnWrap/ColumnWrap";
import { SearchBar } from "../../ui/Searching/SearchBar/SearchBar";
import { Plug } from "../../layout/Plug/Plug";
import { Box, Typography } from "@mui/material";
import {
  CustomStack,
  TypographyWithEllipsis,
} from "../../ui/customStyledComponents";

export const UsersList: FC<UsersListPropsType> = ({
  numberOf,
  searchHandler,
  children,
}) => {
  return (
    <CustomStack
      sx={{
        flexDirection: "column",
      }}
    >
      <TypographyWithEllipsis>{numberOf}</TypographyWithEllipsis>
      <SearchBar searchHandler={searchHandler} />
      {children}
    </CustomStack>
  );
};

type UsersListPropsType = {
  numberOf: string;
  searchHandler: searchButtonHandlerType;
  children: any;
};
