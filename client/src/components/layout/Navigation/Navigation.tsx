import { Box, Link as MaterialLink, useTheme } from "@mui/material";
import React, { FC } from "react";
import { Outlet, Link as RouterLink } from "react-router-dom";
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

export const Navigation: FC<NavigationPropsType> = ({
  toggleDarkMode,
  isDarkMode,
}) => {
  const theme = useTheme();
  const id = useAppSelector((state: RootState) => selectId(state));
  const avatar = useAppSelector((state: RootState) => selectAvatar(state));

  return (
    <>
      <Box
        sx={{
          ...styles.container,
          // @ts-ignore
          backgroundColor: theme.palette.primary.mainBg,
        }}
      >
        <CustomStack sx={styles.stack}>
          <MaterialLink component={RouterLink} sx={styles.link} to="search">
            <CustomIcon type="search" />
            {/* <CustomSearchIcon /> */}
          </MaterialLink>
          <MaterialLink component={RouterLink} sx={styles.link} to="">
            <CustomIcon type="home" />
          </MaterialLink>
          <MaterialLink component={RouterLink} sx={styles.link} to="requests">
            <CustomIcon type="list" />
          </MaterialLink>
          <MaterialLink component={RouterLink} sx={styles.link} to="posting">
            <CustomIcon type="add" />
          </MaterialLink>
          <Box onClick={toggleDarkMode} sx={styles.link}>
            <CustomIcon type="light_mode" />
          </Box>
          <MaterialLink
            component={RouterLink}
            sx={styles.link}
            to={`profile:${id}`}
          >
            <CustomAvatar width={25} src={avatar} />
          </MaterialLink>
          <MaterialLink component={RouterLink} sx={styles.link} to="chats">
            <CustomIcon type="send" />
          </MaterialLink>
        </CustomStack>
      </Box>
      <Outlet></Outlet>
    </>
  );
};

type NavigationPropsType = {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
};
