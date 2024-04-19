import { Box } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../../components/layout/Headers/Header/Header";
import { PageHeader } from "../../../components/layout/Headers/PageHeader/PageHeader";
import { Plug } from "../../../components/layout/Plug/Plug";
import { RowUser } from "../../../components/logic/RowUser/RowUser";
import { UsersList } from "../../../components/logic/UsersList/UsersList";
import { SmallGoldenRatioBox } from "../../../components/ui/customStyledComponents";
import {
  useFollow,
  useUnfollow,
} from "../../../fullStore/combos/profile/profileQueries";
import {
  selectId,
  setErrorMessage,
  setIsLoading,
} from "../../../fullStore/combos/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../../fullStore/hooks";
import { useGetFollowersOrFollowingsBySubstr } from "../../../fullStore/queries/searchQueries";
import useUser from "../../../hooks/useUser";
import { setSelectedUserIdCallbackType } from "../../../types/callbacks";
import { followersAndFollowingListType } from "../../../types/storeTypes";

export const FollowersPage: FC<{}> = () => {
  const ownId = useAppSelector((state) => selectId(state));
  const userId = +useParams().id.slice(1);
  const user = useUser(userId);
  const isFollowers = useParams().type.slice(1) === "ers";
  let [list, setList] = useState<followersAndFollowingListType | []>([]);
  let [number, setNumber] = useState<string>("");

  const usualDispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      setList(
        (prev) =>
          (prev = isFollowers
            ? // @ts-ignore
              user.followers.list
            : user.following.list),
      );
      setNumber(
        (prev) =>
          (prev = isFollowers
            ? // @ts-ignore
              user.followers.number
            : user.following.number),
      );
    }
  }, [user]);

  const [getUsers] = useGetFollowersOrFollowingsBySubstr();

  const searchHandler = (searchValue: string) => {
    searchValue = searchValue.trim();
    if (searchValue !== "") {
      usualDispatch(setIsLoading(true));
      getUsers({
        substring: searchValue,
        who: isFollowers ? "followers" : "following",
      })
        .unwrap()
        .then((fulfilled) => {
          setList((prev) => (prev = fulfilled));
          setNumber((prev) => (prev = `${fulfilled.length}`));
        });
      usualDispatch(setIsLoading(false));
    } else {
      if (user) {
        setList(
          (prev) =>
            (prev = isFollowers
              ? // @ts-ignore
                user.followers.list
              : user.following.list),
        );
        setNumber(
          (prev) =>
            (prev = isFollowers
              ? // @ts-ignore
                user.followers.number
              : user.following.number),
        );
      }
    }
  };

  const [follow] = useFollow();
  const [unFollow] = useUnfollow();

  const followCallback: setSelectedUserIdCallbackType = (userId) => {
    usualDispatch(setIsLoading(true));
    follow({ followingId: userId })
      .unwrap()
      .then(() => {
        const updatedList = list.map((user) => {
          const returnUser = { ...user };
          if (user.id === userId) {
            returnUser.amIFollowed = true;
          }
          return returnUser;
        });
        setList((prev) => (prev = updatedList));
      })
      .catch((e) => usualDispatch(setErrorMessage(e.data.message)));
    usualDispatch(setIsLoading(false));
  };

  const unFollowCallback: setSelectedUserIdCallbackType = (userId) => {
    usualDispatch(setIsLoading(true));
    unFollow({ unFollowingId: userId })
      .unwrap()
      .then(() => {
        const updatedList: followersAndFollowingListType = [];
        for (let i = 0; i < list.length; i++) {
          let user = list[i];
          if (!user.isOpened && !isFollowers) continue;
          const returnUser = { ...user };
          if (user.id === userId) {
            returnUser.amIFollowed = false;
          }
          updatedList.push(returnUser);
        }
        setList((prev) => (prev = updatedList));
      })
      .catch((e) => usualDispatch(setErrorMessage(e.data.message)));
    usualDispatch(setIsLoading(false));
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <PageHeader>
        <Header text={isFollowers ? "Followers" : "Following"} />
        <Plug />
      </PageHeader>
      <SmallGoldenRatioBox>
        <UsersList numberOf={number + " users"} searchHandler={searchHandler}>
          {list.length
            ? list.map((user: any) => {
                if (user.id === ownId)
                  return (
                    <RowUser
                      id={user.id}
                      avatar={user.avatar}
                      name={user.name}
                    />
                  );
                else
                  return (
                    <RowUser
                      key={user.id}
                      id={user.id}
                      setSelectedUserIdCallback={
                        user.amIFollowed ? unFollowCallback : followCallback
                      }
                      avatar={user.avatar}
                      name={user.name}
                      buttonText={user.amIFollowed ? "unfollow" : "follow"}
                    />
                  );
              })
            : ""}
        </UsersList>
      </SmallGoldenRatioBox>
    </Box>
  );
};
