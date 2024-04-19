import React, { FC, useEffect, useState } from "react";
import { Images } from "../../../components/logic/Images/Images";
import { PageHeader } from "../../../components/layout/Headers/PageHeader/PageHeader";
import { SearchBarWithResults } from "../../../components/ui/Searching/SearchBarWithResults/SearchBarWithResults";
import { searchResultsType } from "../../../types/common";
import { Plug } from "../../../components/layout/Plug/Plug";
import { ColumnWrap } from "../../../components/layout/ColumnWrap/ColumnWrap";
import { useGetImagesByPreferences } from "../../../fullStore/combos/profile/profileQueries";
import {
  useGetTagsBySubstring,
  useGetUsersBySubstring,
} from "../../../fullStore/queries/searchQueries";
import useCustomDispatch from "../../../hooks/useCustomDispatch";
import {
  setErrorMessage,
  setIsLoading,
} from "../../../fullStore/combos/user/userSlice";
import { useAppDispatch } from "../../../fullStore/hooks";
import { CustomStack } from "../../../components/ui/customStyledComponents";

export const SearchPage: FC<{}> = () => {
  const usualDispatch = useAppDispatch();

  const [searchResults, setSearchResults] = useState<searchResultsType>({
    results: [],
  });

  const [getTagsBySubstring] = useGetTagsBySubstring();
  const [getUsersBySubstring] = useGetUsersBySubstring();

  const searchHandler = (searchValue: string) => {
    if (searchValue[0] === "#") {
      usualDispatch(setIsLoading(true));
      getTagsBySubstring({
        substring: searchValue.slice(1),
      })
        .unwrap()
        .then((fulfilled) => {
          setSearchResults(
            (prev) =>
              (prev = {
                type: "tag",
                results: fulfilled,
              }),
          );
        })
        .catch((e) => usualDispatch(setErrorMessage(e.data.message)));
      usualDispatch(setIsLoading(false));
    } else {
      usualDispatch(setIsLoading(true));
      getUsersBySubstring({
        substring: searchValue.slice(1),
      })
        .unwrap()
        .then((fulfilled) => {
          setSearchResults(
            (prev) =>
              (prev = {
                type: "user",
                results: fulfilled,
              }),
          );
        })
        .catch((e) => usualDispatch(setErrorMessage(e.data.message)));
      usualDispatch(setIsLoading(false));
    }
  };

  const {
    data: images,
    isLoading: isGetImByPrefLoading,
    error,
  } = useGetImagesByPreferences(null);

  useEffect(() => {
    if (error) {
      // @ts-ignore
      usualDispatch(setErrorMessage(error.data.message));
    }
  }, [error]);

  useEffect(() => {
    if (isGetImByPrefLoading) usualDispatch(setIsLoading(true));
    else usualDispatch(setIsLoading(false));
  }, [isGetImByPrefLoading]);

  return (
    <CustomStack
      sx={{
        flexDirection: "column",
      }}
    >
      {images?.rows && (
        <Images images={images.rows}>
          <PageHeader>
            <Plug />
            <Plug />
          </PageHeader>
          <SearchBarWithResults
            searchHandler={searchHandler}
            searchResults={searchResults}
          />
        </Images>
      )}
    </CustomStack>
  );
};
