import styled from "@emotion/styled";
import {
  Box,
  Link as MaterialLink,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import i18n, { addDynamicResources } from "../../../i18n/i18n";
import { giveCurrentImagesCallbackType } from "../../../types/callbacks";
import { imageType, profileType } from "../../../types/storeTypes";
import { ColumnWrap } from "../../layout/ColumnWrap/ColumnWrap";
import { PageHeader } from "../../layout/Headers/PageHeader/PageHeader";
import { Plug } from "../../layout/Plug/Plug";
import { CustomAvatar } from "../../ui/CustomAvatar/CustomAvatar";
import { CustomIcon } from "../../ui/CustomIcons/CustomIcons";
import {
  CustomStack,
  SmallGoldenRatioBox,
} from "../../ui/customStyledComponents";
import { Images } from "../Images/Images";
import { OtherProfileButtons } from "./OtherProfileButtons";
import { OwnProfileButtons } from "./OwnProfileButtons";
import styles from "./ProfileStyle";

export const Profile: FC<ProfilePropsType> = ({
  id,
  name,
  avatar,
  isOwn,
  followers,
  following,
  amIFollowed,
  isOpenedForMe,
  isRequestSended,
}) => {
  const { t } = useTranslation("authorized");
  useEffect(() => {
    addDynamicResources("authorized");
  }, []);

  let [language, setLanguage] = useState<string>(i18n.language);
  let [images, setImages] = useState<imageType[] | []>([]);
  let [postsNumber, setPostsNumber] = useState<string>("0");

  const giveCurrentImagesCallback: giveCurrentImagesCallbackType = (result) => {
    setImages((prev) => (prev = result.rows));
    setPostsNumber((prev) => (prev = result.count));
  };

  let imagesForShow =
    images && images.length ? JSON.parse(JSON.stringify(images)).reverse() : [];

  const CurrentTypography = styled(Typography)(({ theme }) => ({
    fontSize: 21,
  }));

  const theme = useTheme();
  const isSmallSize = useMediaQuery(theme.breakpoints.down("sm"));

  const changeLanguage = async () => {
    const newLanguage = language === "ru" ? "en" : "ru";
    await i18n.changeLanguage(newLanguage);
    await addDynamicResources("authorized");
    setLanguage((prev) => (prev = newLanguage));
  };

  const infoItemStyle = styles.info_item(theme);

  return (
    <ColumnWrap>
      <Images images={imagesForShow}>
        <ColumnWrap removePadding={true}>
          <PageHeader isShowing={false}>
            <Plug></Plug>
            {isOwn && (
              <Box sx={styles.header_right}>
                <Box onClick={changeLanguage} sx={styles.lang}>
                  {language}
                </Box>
                <RouterLink to="/settings">
                  <CustomIcon extra={styles.settings} type="settings" />
                </RouterLink>
              </Box>
            )}
          </PageHeader>
          <SmallGoldenRatioBox sx={styles.smallBox(theme)}>
            <CustomStack sx={styles.stack}>
              <Box sx={styles.box(isSmallSize)}>
                <ColumnWrap removePadding={true}>
                  <CustomAvatar src={avatar} width={100} />
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontSize: "25px",
                    }}
                    variant="body2"
                  >
                    {name}
                  </Typography>
                </ColumnWrap>
              </Box>
              <Box sx={styles.info}>
                <MaterialLink
                  sx={infoItemStyle}
                  component={RouterLink}
                  to={`/follow/:ers/:${id}`}
                >
                  <ColumnWrap removePadding={true}>
                    <CurrentTypography variant="body2">
                      {t("profile_followers")}
                    </CurrentTypography>
                    <CurrentTypography variant="body2">
                      {followers.number ? followers.number : 0}
                    </CurrentTypography>
                  </ColumnWrap>
                </MaterialLink>
                <Box sx={infoItemStyle}>
                  <ColumnWrap removePadding={true}>
                    <CurrentTypography variant="body2">
                      {t("profile_posts")}
                    </CurrentTypography>
                    <CurrentTypography variant="body2">
                      {postsNumber}
                    </CurrentTypography>
                  </ColumnWrap>
                </Box>
                <MaterialLink
                  sx={infoItemStyle}
                  component={RouterLink}
                  to={`/follow/:ing/:${id}`}
                >
                  <ColumnWrap removePadding={true}>
                    <CurrentTypography variant="body2">
                      {t("profile_following")}
                    </CurrentTypography>
                    <CurrentTypography variant="body2">
                      {following.number ? following.number : 0}
                    </CurrentTypography>
                  </ColumnWrap>
                </MaterialLink>
              </Box>
            </CustomStack>
            <CustomStack sx={styles.buttons}>
              {isOwn ? (
                <OwnProfileButtons
                  id={id}
                  giveCurrentImagesCallback={giveCurrentImagesCallback}
                />
              ) : (
                <OtherProfileButtons
                  id={id}
                  isRequestSended={isRequestSended}
                  isOpenedForMe={isOpenedForMe}
                  amIFollowed={amIFollowed}
                  giveCurrentImagesCallback={giveCurrentImagesCallback}
                />
              )}
            </CustomStack>
          </SmallGoldenRatioBox>
        </ColumnWrap>
      </Images>
    </ColumnWrap>
  );
};

type ProfilePropsType = profileType;
