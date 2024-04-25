import React, { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Profile } from "../../../components/logic/Profile/Profile";
import { addProfileThunk } from "../../../fullStore/combos/profile/profileQueries";
import { selectProfile } from "../../../fullStore/combos/profile/profilesSlice";
import { useAppDispatch, useAppSelector } from "../../../fullStore/hooks";
import useCustomDispatch from "../../../hooks/useCustomDispatch";

export const ProfilePage: FC<{}> = () => {
  const id = +useLocation().pathname.split(":")[1];
  const user = useAppSelector((state) => selectProfile(state, id));
  const dispatch = useCustomDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const rejectCallback = () => navigate(-1);
    dispatch(addProfileThunk(id === 0 ? null : +id), null, rejectCallback);
  }, [id]);

  return user && <Profile {...user} />;
};

export default ProfilePage;
