import { Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { ColumnWrap } from "../../../components/layout/ColumnWrap/ColumnWrap";
import { PageHeader } from "../../../components/layout/Headers/PageHeader/PageHeader";
import { Plug } from "../../../components/layout/Plug/Plug";
import { RowUser } from "../../../components/logic/RowUser/RowUser";
import {
  blockThunk,
  useConfirmSubRequest,
  useGetRequests,
} from "../../../fullStore/combos/profile/profileQueries";
import {
  setIsLoading,
  setErrorMessage,
} from "../../../fullStore/combos/user/userSlice";
import { useAppDispatch } from "../../../fullStore/hooks";
import useCustomDispatch from "../../../hooks/useCustomDispatch";
import { setSelectedUserIdCallbackType } from "../../../types/callbacks";
import { requestersType } from "../../../types/storeTypes";
import { useTranslation } from "react-i18next";
import { addDynamicResources } from "../../../i18n/i18n";

export const RequestsPage: FC<{}> = () => {

  const {t} = useTranslation("authorized");
  useEffect(() => {
    addDynamicResources("authorized");
  }, [])

  const [confirmRequest] = useConfirmSubRequest();
  const [denyRequest] = useConfirmSubRequest();

  let { data: requests, isLoading, error } = useGetRequests(null);
  let [currentRequests, setCurrentRequests] = useState<requestersType | []>([]);

  const thunkDispatch = useCustomDispatch();
  const usualDispatch = useAppDispatch();

  useEffect(() => {
    if (error) {
      // @ts-ignore
      usualDispatch(setErrorMessage(error.data.message));
    }
  }, [error]);

  useEffect(() => {
    if (isLoading) usualDispatch(setIsLoading(true));
    else usualDispatch(setIsLoading(false));
  }, [isLoading]);

  useEffect(() => {
    if (requests && requests.length) {
      setCurrentRequests((prev) => (prev = requests));
    }
  }, [requests]);

  const confirmCallback: setSelectedUserIdCallbackType = (userId) => {
    usualDispatch(setIsLoading(true));
    confirmRequest({ userId })
      .unwrap()
      .then(() => {
        let copy = JSON.parse(JSON.stringify(currentRequests));
        copy = copy.filter((req: any) => req.id !== userId);
        setCurrentRequests((prev: any) => copy);
      })
      .catch((e: any) => usualDispatch(setErrorMessage(e.data.message)));
    usualDispatch(setIsLoading(false));
  };

  const denyCallback: setSelectedUserIdCallbackType = (userId) => {
    usualDispatch(setIsLoading(true));
    denyRequest({ userId })
      .unwrap()
      .then(() => {
        let copy = JSON.parse(JSON.stringify(currentRequests));
        copy = copy.filter((req: any) => req.id !== userId);
        setCurrentRequests((prev: any) => copy);
      })
      .catch((e: any) => usualDispatch(setErrorMessage(e.data.message)));
    usualDispatch(setIsLoading(false));
  };

  const blockCallback: setSelectedUserIdCallbackType = (userId) => {
    thunkDispatch(blockThunk(userId));
  };

  const buttonsData = {
    confirm: [confirmCallback, "contained"],
    deny: [denyCallback, "text"],
    block: [blockCallback, "outlined"],
  };

  return (
    <ColumnWrap>
      <PageHeader>
        <Typography variant="h1">{t("requests_title")}</Typography>
        <Plug />
      </PageHeader>
      <>
        {(requests?.length &&
          requests.map((request: any) => (
            <RowUser
              key={request.id}
              id={request.id}
              avatar={request.avatar}
              name={request.name}
              buttonsData={buttonsData}
            />
          ))) || (
          <Typography variant="body2">
            {t("requests_noRequestsMessage")}
          </Typography>
        )}
      </>
    </ColumnWrap>
  );
};

export default RequestsPage;