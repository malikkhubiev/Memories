import { Box } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { Header } from "../../../../components/layout/Headers/Header/Header";
import { PageHeader } from "../../../../components/layout/Headers/PageHeader/PageHeader";
import { Plug } from "../../../../components/layout/Plug/Plug";
import { RowUser } from "../../../../components/logic/RowUser/RowUser";
import { UsersList } from "../../../../components/logic/UsersList/UsersList";
import { SmallGoldenRatioBox } from "../../../../components/ui/customStyledComponents";
import {
  blockThunk,
  unBlockThunk,
} from "../../../../fullStore/combos/profile/profileQueries";
import { updateBlockedUsers } from "../../../../fullStore/combos/profile/profilesSlice";
import {
  selectId,
  setErrorMessage,
  setIsLoading,
} from "../../../../fullStore/combos/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../../../fullStore/hooks";
import { useGetBlockedUsersBySubstr } from "../../../../fullStore/queries/searchQueries";
import { RootState } from "../../../../fullStore/rootStore";
import useCustomDispatch from "../../../../hooks/useCustomDispatch";
import useUser from "../../../../hooks/useUser";
import { setSelectedUserIdCallbackType } from "../../../../types/callbacks";
import { blockedUserType } from "../../../../types/storeTypes";
import { transformNumber } from "../../PostPage/PostPage";
import styles from "./BlockedPageStyle";
import { useTranslation } from "react-i18next";

let customBlockedUsers: blockedUserType[] | [] = [];

const BlockedPage: FC<{}> = () => {
  const { t } = useTranslation("authorized");

  const id = useAppSelector((state: RootState) => selectId(state));
  const user = useUser();

  const [blockedUsers, setBlockedUsers] = useState<blockedUserType[] | []>([]);
  const [blockedNumber, setBlockedNumber] = useState<string>(
    user?.blocked?.count || "0",
  );

  const [getBlockedUsers] = useGetBlockedUsersBySubstr();
  const usualDispatch = useAppDispatch();
  const thunkDispatch = useCustomDispatch();

  const searchHandler = (searchValue: string) => {
    searchValue = searchValue.trim();
    if (searchValue !== "") {
      usualDispatch(setIsLoading(true));
      getBlockedUsers({
        substring: searchValue,
      })
        .unwrap()
        .then((fulfilled) => {
          setBlockedUsers((prev) => (prev = fulfilled));
          setBlockedNumber((prev) => (prev = `${fulfilled.length}`));
        })
        .catch((e) => usualDispatch(setErrorMessage(e.data.message)));
      usualDispatch(setIsLoading(false));
    } else {
      if (customBlockedUsers.length) {
        setBlockedUsers((prev) => (prev = customBlockedUsers));
        let counter = 0;
        customBlockedUsers.forEach((user) => {
          // @ts-ignore
          if (user.isBlocked) counter++;
        });
        setBlockedNumber((prev) => (prev = transformNumber(counter)));
      } else {
        setBlockedUsers((prev) => (prev = user.blocked.rows));
        setBlockedNumber((prev) => (prev = `${user.blocked.rows.length}`));
      }
    }
  };

  const blockCallback: setSelectedUserIdCallbackType = (userId) => {
    const resolveCallback = () => {
      setBlockedUsers((prev) => {
        const updatedBlockedUsers = prev.map((user) => {
          const updatedUser = { ...user };
          if (updatedUser.id === userId) updatedUser.isBlocked = true;
          return updatedUser;
        });
        customBlockedUsers = updatedBlockedUsers;
        return (prev = updatedBlockedUsers);
      });
      let counter = 0;
      customBlockedUsers.forEach((user) => {
        // @ts-ignore
        if (user.isBlocked) counter++;
      });
      setBlockedNumber((prev) => (prev = transformNumber(counter)));
    };
    thunkDispatch(blockThunk(userId), resolveCallback);
  };

  const unBlockCallback: setSelectedUserIdCallbackType = (userId) => {
    const resolveCallback = () => {
      setBlockedUsers((prev) => {
        const updatedBlockedUsers = prev.map((user) => {
          const updatedUser = { ...user };
          if (updatedUser.id === userId) updatedUser.isBlocked = false;
          return updatedUser;
        });
        customBlockedUsers = updatedBlockedUsers;
        return (prev = updatedBlockedUsers);
      });
      let counter = 0;
      customBlockedUsers.forEach((user) => {
        // @ts-ignore
        if (user.isBlocked) counter++;
      });
      setBlockedNumber((prev) => (prev = transformNumber(counter)));
    };
    thunkDispatch(unBlockThunk(userId), resolveCallback);
  };

  useEffect(() => {
    if (user?.blocked?.rows) {
      setBlockedUsers((prev) => (prev = user.blocked.rows));
      setBlockedNumber((prev) => (prev = user.blocked.count));
    }
    return () => {
      const unblockedUsers = customBlockedUsers.map((user) => {
        if (!user.isBlocked) return user.id;
      });
      usualDispatch(
        updateBlockedUsers({
          ownId: id,
          unblockedUsers,
        }),
      );
    };
  }, [user]);

  return (
    <Box sx={styles.container}>
      <PageHeader>
        <Header text={t("blocked_title")} />
        <Plug />
      </PageHeader>
      <SmallGoldenRatioBox>
        {user ? (
          <UsersList
            numberOf={blockedNumber + " " + t("blocked_users")}
            searchHandler={searchHandler}
          >
            {blockedUsers.map((user: any) => (
              <RowUser
                key={user.id}
                id={user.id}
                setSelectedUserIdCallback={
                  user.isBlocked ? unBlockCallback : blockCallback
                }
                avatar={user.avatar}
                name={user.name}
                buttonText={user.isBlocked ? t("blocked_unblock") : t("block")}
              />
            ))}
          </UsersList>
        ) : (
          ""
        )}
      </SmallGoldenRatioBox>
    </Box>
  );
};

export default BlockedPage;