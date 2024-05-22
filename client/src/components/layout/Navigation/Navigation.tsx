import { Box, Link as MaterialLink, useTheme } from "@mui/material";
import React, { FC, createContext, useEffect, useState } from "react";
import { Outlet, Link as RouterLink, useLocation } from "react-router-dom";
import {
  selectAvatar,
  selectId,
} from "../../../fullStore/combos/user/userSlice";
import { useAppSelector } from "../../../fullStore/hooks";
import { RootState } from "../../../fullStore/rootStore";
import { CustomAvatar } from "../../ui/CustomAvatar/CustomAvatar";
import { CustomStack } from "../../ui/customStyledComponents";
import styles from "./NavigationStyle";
import { CustomIcon } from "../../ui/CustomIcons/CustomIcons";
import { PageHeader } from "../Headers/PageHeader/PageHeader";
import { Plug } from "../Plug/Plug";
import i18n, { addDynamicResources } from "../../../i18n/i18n";
import { useTranslation } from "react-i18next";

export const Navigation: FC<NavigationPropsType> = ({ toggleDarkMode }) => {
  const theme = useTheme();
  const id = useAppSelector((state: RootState) => selectId(state));
  const avatar = useAppSelector((state: RootState) => selectAvatar(state));
  const location = useLocation();
  const linkStyle = styles.link(theme);
  const pathsWithoutNav = ["/chats", "/settings"];
  return (
    <>
      {!pathsWithoutNav.includes(location.pathname) && (
        <Box
          sx={{
            ...styles.container(theme),
          }}
        >
          <CustomStack sx={styles.stack(theme)}>
            <MaterialLink component={RouterLink} sx={linkStyle} to="search">
              <CustomIcon type="search" />
            </MaterialLink>
            <MaterialLink component={RouterLink} sx={linkStyle} to="">
              <CustomIcon type="home" />
            </MaterialLink>
            <MaterialLink component={RouterLink} sx={linkStyle} to="requests">
              <CustomIcon type="list" />
            </MaterialLink>
            <MaterialLink component={RouterLink} sx={linkStyle} to="posting">
              <CustomIcon type="add" />
            </MaterialLink>
            <Box onClick={toggleDarkMode} sx={linkStyle}>
              <CustomIcon type="light_mode" />
            </Box>
            <MaterialLink
              component={RouterLink}
              sx={linkStyle}
              to={`profile:${id}`}
            >
              <CustomAvatar width={25} src={avatar} />
            </MaterialLink>
            <MaterialLink component={RouterLink} sx={linkStyle} to="chats">
              <CustomIcon type="send" />
            </MaterialLink>
          </CustomStack>
        </Box>
      )}
      <Outlet></Outlet>
    </>
  );
};

export const LangPropsContext = createContext(null);

export const UnAuthourizedNavigation: FC<{ toggleDarkMode: any }> = ({
  toggleDarkMode,
}) => {
  const theme = useTheme();
  const linkStyle = styles.link(theme);

  let [language, setLanguage] = useState<string>(i18n.language);
  const { t } = useTranslation("authorized");
  
  useEffect(() => {
    addDynamicResources("authorized");
  }, []);

  const changeLanguage = async () => {
    const newLanguage = language === "ru" ? "en" : "ru";
    await i18n.changeLanguage(newLanguage);
    await addDynamicResources("authorized");
    setLanguage((prev) => (prev = newLanguage));
  };
  return (
    <>
      <PageHeader isShowing={false}>
        <Box onClick={changeLanguage} sx={styles.box}>
          {language}
        </Box>
        <Box onClick={toggleDarkMode} sx={styles.box}>
          <CustomIcon type="light_mode" />
        </Box>
      </PageHeader>
      <LangPropsContext.Provider value={{language}}>
        <Outlet></Outlet>
      </LangPropsContext.Provider>
    </>
  );
};

type NavigationPropsType = {
  toggleDarkMode: () => void;
};
