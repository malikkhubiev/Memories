import { Box, Link as MaterialLink } from "@mui/material";
import React, { FC } from "react";
import { Outlet, Link as RouterLink } from "react-router-dom";
import {
  selectAvatar,
  selectId,
} from "../../../fullStore/combos/user/userSlice";
import { useAppSelector } from "../../../fullStore/hooks";
import { RootState } from "../../../fullStore/rootStore";
import { CustomAvatar } from "../../ui/CustomAvatar/CustomAvatar";
import {
  CustomAddIcon,
  CustomHomeIcon,
  CustomListIcon,
  CustomSearchIcon,
  CustomSendIcon,
} from "../../ui/CustomIcons/CustomIcons";
import { CustomStack } from "../../ui/customStyledComponents";
import styles from "./NavigationStyle";

export const Navigation: FC<{}> = ({}) => {
  const id = useAppSelector((state: RootState) => selectId(state));
  const avatar = useAppSelector((state: RootState) => selectAvatar(state));

  return (
    <>
      <Box sx={styles.container}>
        <CustomStack sx={styles.stack}>
          <MaterialLink component={RouterLink} sx={styles.link} to="search">
            <CustomSearchIcon />
          </MaterialLink>
          <MaterialLink component={RouterLink} sx={styles.link} to="">
            <CustomHomeIcon />
          </MaterialLink>
          <MaterialLink component={RouterLink} sx={styles.link} to="posting">
            <CustomAddIcon />
          </MaterialLink>
          {/* <MaterialLink
            component={RouterLink}
            sx={styles.link}
            to="requests"
          >
            <CustomListIcon />
          </MaterialLink> */}
          <MaterialLink
            component={RouterLink}
            sx={styles.link}
            to={`profile:${id}`}
          >
            <CustomAvatar width={25} src={avatar} />
          </MaterialLink>
          <MaterialLink component={RouterLink} sx={styles.link} to="chats">
            <CustomSendIcon />
          </MaterialLink>
        </CustomStack>
      </Box>
      <Outlet></Outlet>
    </>
  );
};
