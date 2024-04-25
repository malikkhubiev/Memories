import { Box } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../../../components/layout/Headers/Header/Header";
import { PageHeader } from "../../../../components/layout/Headers/PageHeader/PageHeader";
import { Plug } from "../../../../components/layout/Plug/Plug";
import { RowUser } from "../../../../components/logic/RowUser/RowUser";
import { UsersList } from "../../../../components/logic/UsersList/UsersList";
import { SmallGoldenRatioBox } from "../../../../components/ui/customStyledComponents";
import {
  setErrorMessage,
  setIsLoading,
} from "../../../../fullStore/combos/user/userSlice";
import { useAppDispatch } from "../../../../fullStore/hooks";
import { useGetImageLikersBySubstr } from "../../../../fullStore/queries/searchQueries";
import { imageLikerType } from "../../../../types/storeTypes";
import styles from "./LikedPageStyle";
import { useTranslation } from "react-i18next";
import { addDynamicResources } from "../../../../i18n/i18n";

const LikedPage: FC<{}> = () => {
  const { t } = useTranslation("authorized");
  useEffect(() => {
    addDynamicResources("authorized");
  }, []);

  const imageId = +useParams().imageId.slice(1);
  const [getLikers] = useGetImageLikersBySubstr();
  const usualDispatch = useAppDispatch();

  let [number, setNumber] = useState<string>("0");
  let [likers, setLikers] = useState<imageLikerType[]>(null);

  useEffect(() => {
    usualDispatch(setIsLoading(true));
    getLikers({
      imageId,
      substring: "",
    })
      .unwrap()
      .then((fulfilled) => {
        setLikers((prev) => (prev = fulfilled.rows));
        setNumber((prev) => (prev = fulfilled.count));
      })
      .catch((e) => usualDispatch(setErrorMessage(e.data.message)));
    usualDispatch(setIsLoading(false));
  }, []);

  const searchHandler = (searchValue: string) => {
    getLikers({
      imageId,
      substring: searchValue.trim() || "",
    })
      .unwrap()
      .then((fulfilled) => {
        setLikers((prev) => (prev = fulfilled.rows));
        setNumber((prev) => (prev = fulfilled.count));
      });
  };

  return (
    <Box sx={styles.container}>
      <PageHeader>
        <Header text={t("liked_title")} />
        <Plug />
      </PageHeader>
      <SmallGoldenRatioBox>
        <UsersList
          numberOf={number + " " + t("liked_numberOf")}
          searchHandler={searchHandler}
        >
          {likers
            ? likers.map((user: any) => (
                <RowUser
                  key={user.id}
                  id={user.id}
                  avatar={user.avatar}
                  name={user.name}
                />
              ))
            : ""}
        </UsersList>
      </SmallGoldenRatioBox>
    </Box>
  );
};

export default LikedPage;
