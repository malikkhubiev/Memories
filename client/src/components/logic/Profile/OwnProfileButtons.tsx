import { Box } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import {
  getPrivateImagesByDateThunk,
  getPrivateImagesByPopularityThunk,
  getSavedImagesThunk,
  getUsualImagesByDateThunk,
  getUsualImagesByPopularityThunk,
} from "../../../fullStore/combos/images/imagesQueries";
import {
  selectUsualImagesByDate,
  selectUsualImagesByPopularity,
  selectPrivateImagesByDate,
  selectPrivateImagesByPopularity,
  selectSavedImages,
} from "../../../fullStore/combos/images/imagesSlice";
import { useAppDispatch, useAppSelector } from "../../../fullStore/hooks";
import { RootState } from "../../../fullStore/rootStore";
import useCustomDispatch from "../../../hooks/useCustomDispatch";
import {
  giveCurrentImagesCallbackType,
  hideShowToggleCallbackType,
  saveToggleCallbackType,
  sortByToggleCallbackType,
} from "../../../types/callbacks";
import { imageType } from "../../../types/storeTypes";
import { HideShowToggle } from "../../ui/Buttons/HideShowToggle/HideShowToggle";
import { Save } from "../../ui/Buttons/Save";
import { Sort } from "../../ui/Buttons/Sort";

export const OwnProfileButtons: FC<OwnProfileButtonsPropsType> = ({
  id,
  giveCurrentImagesCallback,
}) => {
  const usualImagesByDate = useAppSelector((state: RootState) =>
    selectUsualImagesByDate(state),
  );
  const usualImagesByPopularity = useAppSelector((state: RootState) =>
    selectUsualImagesByPopularity(state),
  );
  const privateImagesByDate = useAppSelector((state: RootState) =>
    selectPrivateImagesByDate(state),
  );
  const privateImagesByPopularity = useAppSelector((state: RootState) =>
    selectPrivateImagesByPopularity(state),
  );
  const savedImages = useAppSelector((state: RootState) =>
    selectSavedImages(state),
  );

  let [isSortingEnabled, setIsSortingEnabled] = useState<boolean>(true);

  let [isHideMode, setIsHideMode] = useState<boolean>(false);
  let [isSortingByPopularity, setIsSortingByPopularity] =
    useState<boolean>(false);
  let [isSaveMode, setIsSaveMode] = useState<boolean>(false);

  const thunkDispatch = useCustomDispatch();

  const thunksDispatching = (thunk: any) => {
    const resolveCallback = (result: {
      count: string;
      rows: imageType[] | [];
    }) => {
      giveCurrentImagesCallback(result);
    };
    thunkDispatch(thunk(id), resolveCallback);
  };

  useEffect(() => {
    thunksDispatching(getUsualImagesByDateThunk);
  }, []);

  const hideShowToggleCallback: hideShowToggleCallbackType = (mode) => {
    if (mode === "hide") {
      setIsSaveMode((prev) => (prev = false));
      setIsSortingEnabled((prev) => (prev = true));
      if (isSortingByPopularity) {
        if (privateImagesByPopularity.rows.length)
          giveCurrentImagesCallback(privateImagesByPopularity);
        else thunksDispatching(getPrivateImagesByPopularityThunk);
      } else {
        if (privateImagesByDate.rows.length)
          giveCurrentImagesCallback(privateImagesByDate);
        else thunksDispatching(getPrivateImagesByDateThunk);
      }
    } else {
      if (isSortingByPopularity) {
        if (usualImagesByPopularity.rows.length)
          giveCurrentImagesCallback(usualImagesByPopularity);
        else thunksDispatching(getUsualImagesByPopularityThunk);
      } else {
        if (usualImagesByDate.rows.length)
          giveCurrentImagesCallback(usualImagesByDate);
        else thunksDispatching(getUsualImagesByDateThunk);
      }
      giveCurrentImagesCallback(usualImagesByDate);
    }
    setIsSortingByPopularity((prev) => (prev = false));
    setIsHideMode((prev) => (prev = !prev));
  };

  const sortByToggleCallback: sortByToggleCallbackType = (sortBy) => {
    if (sortBy === "popularity") {
      if (isHideMode) {
        if (privateImagesByPopularity.rows.length)
          giveCurrentImagesCallback(privateImagesByPopularity);
        else thunksDispatching(getPrivateImagesByPopularityThunk);
      } else {
        if (usualImagesByPopularity.rows.length)
          giveCurrentImagesCallback(usualImagesByPopularity);
        else thunksDispatching(getUsualImagesByPopularityThunk);
      }
    } else {
      if (isHideMode) {
        if (privateImagesByDate.rows.length)
          giveCurrentImagesCallback(privateImagesByDate);
        else thunksDispatching(getPrivateImagesByDateThunk);
      } else {
        if (usualImagesByDate.rows.length)
          giveCurrentImagesCallback(usualImagesByDate);
        else thunksDispatching(getUsualImagesByDateThunk);
      }
    }
    setIsSortingByPopularity((prev) => (prev = !prev));
  };

  const saveToggleCallback: saveToggleCallbackType = (isSaveMode) => {
    if (isSaveMode) {
      if (savedImages.rows.length) giveCurrentImagesCallback(savedImages);
      else thunksDispatching(getSavedImagesThunk);
    } else {
      giveCurrentImagesCallback(usualImagesByDate);
    }
    setIsSortingEnabled((prev) => (prev = !prev));
    setIsHideMode((prev) => (prev = false));
    setIsSortingByPopularity((prev) => (prev = false));
    setIsSaveMode((prev) => (prev = !prev));
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <HideShowToggle
        isHideMode={isHideMode}
        hideShowToggleCallback={hideShowToggleCallback}
      />
      {isSortingEnabled && (
        <Sort
          isSortingByPopularity={isSortingByPopularity}
          sortByToggleCallback={sortByToggleCallback}
        />
      )}
      <Save isSaveMode={isSaveMode} saveToggleCallback={saveToggleCallback} />
    </Box>
  );
};

type OwnProfileButtonsPropsType = {
  id: number;
  giveCurrentImagesCallback: giveCurrentImagesCallbackType;
};
