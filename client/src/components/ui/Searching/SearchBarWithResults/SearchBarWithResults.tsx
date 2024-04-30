import {
  Box,
  useMediaQuery,
  useTheme,
  Link as MaterialLink,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  searchButtonHandlerType,
  searchResultsType,
} from "../../../../types/common";
import { ColumnWrap } from "../../../layout/ColumnWrap/ColumnWrap";
import { CustomAvatar } from "../../CustomAvatar/CustomAvatar";
import {
  SmallGoldenRatioBox,
  TypographyWithEllipsis,
} from "../../customStyledComponents";
import { SearchBar } from "../SearchBar/SearchBar";
import styles from "./SearchBarWithResultsStyle";

export const SearchBarWithResults: FC<SearchBarWithResultsPropsType> = ({
  searchHandler,
  searchResults,
}) => {
  const [localSearchResults, setLocalSearchResults] =
    useState<searchResultsType>(searchResults);

  useEffect(() => {
    setLocalSearchResults((prev) => (prev = searchResults));
  }, [searchResults]);

  const theme = useTheme();
  const isSmallSize = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <SmallGoldenRatioBox sx={styles.rel}>
      <ColumnWrap removePadding={true}>
        <SearchBar searchHandler={searchHandler} />
        {localSearchResults.results.length !== 0 && (
          <Box sx={styles.container(isSmallSize)}>
            {localSearchResults.results.map((searchResult: any) => (
              <MaterialLink
                component={RouterLink}
                key={searchResult.name}
                sx={styles.link}
                to={
                  localSearchResults.type === "tag"
                    ? `/tags/:${searchResult.id}/:${searchResult.name}`
                    : `/profile:${searchResult.id}`
                }
              >
                {localSearchResults.type !== "tag" ? (
                  <CustomAvatar src={searchResult.avatar} width={55} />
                ) : (
                  ""
                )}
                <Box sx={styles.item}>
                  <TypographyWithEllipsis>
                    {localSearchResults.type === "tag"
                      ? `#${searchResult.name}`
                      : searchResult.name}
                  </TypographyWithEllipsis>
                </Box>
              </MaterialLink>
            ))}
          </Box>
        )}
      </ColumnWrap>
    </SmallGoldenRatioBox>
  );
};

type SearchBarWithResultsPropsType = {
  searchHandler: searchButtonHandlerType;
  searchResults: searchResultsType;
};
