import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Link as MaterialLink,
  Switch,
  useTheme,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ColumnWrap } from "../../../components/layout/ColumnWrap/ColumnWrap";
import { Header } from "../../../components/layout/Headers/Header/Header";
import { PageHeader } from "../../../components/layout/Headers/PageHeader/PageHeader";
import { Plug } from "../../../components/layout/Plug/Plug";
import { DeleteAccountButton } from "../../../components/logic/DeleteAccountButton/DeleteAccountButton";
import { ImageUpload } from "../../../components/logic/ImageUpload/ImageUpload";
import { CustomIcon } from "../../../components/ui/CustomIcons/CustomIcons";
import { ChangeInput } from "../../../components/ui/Inputs/ChangeInput/ChangeInput";
import { SmallGoldenRatioBox } from "../../../components/ui/customStyledComponents";
import { changeNameAvatarIsOpenedThunk } from "../../../fullStore/combos/user/userQueries";
import { logOut } from "../../../fullStore/combos/user/userSlice";
import { useAppDispatch } from "../../../fullStore/hooks";
import useCustomDispatch from "../../../hooks/useCustomDispatch";
import useUser from "../../../hooks/useUser";
import { addDynamicResources } from "../../../i18n/i18n";
import {
  changeInputCallbackType,
  readyImageCallbackType,
} from "../../../types/callbacks";
import styles from "./SettingsPageStyle";

const SettingsPage: FC<{}> = () => {
  const theme = useTheme();

  const { t } = useTranslation("authorized");
  useEffect(() => {
    addDynamicResources("authorized");
  }, []);

  const usualDispatch = useAppDispatch();

  const user = useUser();
  let [image, setImage] = useState<HTMLCanvasElement | string>(null);
  let [imageFile, setImageFile] = useState<File>(null);
  let [username, setUsername] = useState<string>("");
  let [isAccountOpened, setIsAccountOpened] = useState<boolean | null>(null);

  let [didUsernameChanged, setDidUsernameChanged] = useState<boolean>(false);
  let [didImageChanged, setDidImageChanged] = useState<boolean>(false);
  let [didIsOpenedUpdated, setDidIsOpenedUpdated] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      if (user.avatar) setImage((prev) => (prev = user.avatar));
      if (user.name) setUsername((prev) => (prev = user.name));
      if (user.isOpened) setIsAccountOpened((prev) => (prev = user.isOpened));
    }
  }, [user]);

  const readyImageCallback: readyImageCallbackType = (canvas, imageFile) => {
    setImage((prev) => (prev = canvas));
    setImageFile((prev) => (prev = imageFile));
    setDidImageChanged(true);
  };

  const usernameCallback: changeInputCallbackType = (text: string) => {
    setUsername((prev) => (prev = text));
    setDidUsernameChanged(true);
  };

  const isAccauntOpenedCallback = () => {
    setIsAccountOpened((prev) => (prev = !prev));
    setDidIsOpenedUpdated(true);
  };

  const navigate = useNavigate();

  const thunkDispatch = useCustomDispatch();

  const applyChanges = () => {
    const formData = new FormData();
    if (didUsernameChanged) formData.append("name", username);
    if (didImageChanged) formData.append("avatar", imageFile);
    if (didIsOpenedUpdated) formData.append("isOpened", `${isAccountOpened}`);

    const resolveCallback = () => navigate("/");

    thunkDispatch(changeNameAvatarIsOpenedThunk(formData), resolveCallback);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    usualDispatch(logOut());
  };

  return (
    <ColumnWrap removePadding={true}>
      {user && (
        <>
          <PageHeader isShowing={false}>
            <Header sx={styles.header(theme)} text={t("settings_title")} />
            <Plug />
          </PageHeader>
          <Box sx={styles.container}>
            <SmallGoldenRatioBox sx={styles.goldenRatioBox}>
              <MaterialLink
                to="/blocked"
                variant="body2"
                component={RouterLink}
                sx={styles.blocked(theme.palette.mode === "dark")}
              >
                {t("settings_blockedUsers")}
                <CustomIcon type="arrow_outward" />
              </MaterialLink>
              <Box sx={styles.image}>
                <ImageUpload
                  readyImageCallback={readyImageCallback}
                  src={(image as string) || null}
                />
              </Box>
              <Box sx={styles.user_info}>
                <ChangeInput
                  sx={styles.changeInput}
                  text={username}
                  changeInputCallback={usernameCallback}
                />
                <Box sx={styles.account}>
                  <Box
                    sx={styles.account_type(theme)}
                    onClick={isAccauntOpenedCallback}
                  >
                    {isAccountOpened ? t("settings_acc2") : t("settings_acc3")}
                  </Box>
                  {"\u00A0"}
                  {t("settings_acc4")}
                </Box>
                <Button
                  onClick={applyChanges}
                  variant="contained"
                  sx={styles.buttonApply}
                >
                  {t("settings_apply")}
                </Button>
              </Box>
            </SmallGoldenRatioBox>
            <Box sx={styles.line(theme)}>
              <DeleteAccountButton />
              <Button
                fullWidth
                sx={styles.buttonLogOut}
                onClick={logoutHandler}
              >
                {t("settings_logout")}
              </Button>
            </Box>
          </Box>
        </>
      )}
    </ColumnWrap>
  );
};

export default SettingsPage;
