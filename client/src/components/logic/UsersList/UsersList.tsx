import React, { FC } from "react";
import { searchButtonHandlerType } from "../../../types/common";
import { SearchBar } from "../../ui/Searching/SearchBar/SearchBar";
import styles from "./UsersListStyle";
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
      sx={styles.stack}
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
