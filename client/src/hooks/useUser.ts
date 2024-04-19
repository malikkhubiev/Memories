import { useEffect } from "react";
import { addProfileThunk } from "../fullStore/combos/profile/profileQueries";
import { selectProfile } from "../fullStore/combos/profile/profilesSlice";
import { selectId } from "../fullStore/combos/user/userSlice";
import { useAppDispatch, useAppSelector } from "../fullStore/hooks";
import { RootState } from "../fullStore/rootStore";
import useCustomDispatch from "./useCustomDispatch";

const useUser = (userId?: number) => {
  if (userId === null) return null;

  const id = useAppSelector((state: RootState) => selectId(state));
  const user = useAppSelector((state: RootState) =>
    selectProfile(state, userId ? userId : id),
  );
  const dispatch = useCustomDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(addProfileThunk(userId ? userId : id));
    }
  }, [user]);

  return user;
};

export default useUser;
