import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CustomIcon } from "../../ui/CustomIcons/CustomIcons";
import { Images } from "../Images/Images";
import { PageHeader } from "../../layout/Headers/PageHeader/PageHeader";
import { OtherProfileButtons } from "./OtherProfileButtons";
import { OwnProfileButtons } from "./OwnProfileButtons";
import { Plug } from "../../layout/Plug/Plug";
import { ColumnWrap } from "../../layout/ColumnWrap/ColumnWrap";
import styles from "./Profile.module.less";
import { imageType, profileType } from "../../../types/storeTypes";
import { giveCurrentImagesCallbackType } from "../../../types/callbacks";
import { Avatar } from "../../ui/Buttons/Avatar/Avatar";
import {
  CustomStack,
  SmallGoldenRatioBox,
} from "../../ui/customStyledComponents";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import styled from "@emotion/styled";
import { CustomAvatar } from "../../ui/CustomAvatar/CustomAvatar";
import { useTranslation } from "react-i18next";
import { addDynamicResources } from "../../../i18n/i18n";

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

  return (
    <Images images={imagesForShow}>
      <ColumnWrap removePadding={true}>
        <PageHeader isShowing={false}>
          <Plug></Plug>
          {isOwn && (
            <Link to="/settings">
              <CustomIcon type="settings" />
            </Link>
          )}
        </PageHeader>
        <SmallGoldenRatioBox
          sx={{
            justifyContent: "flex-start",
            width: {
              xs: "100%",
              md: "61.80469715698393vw",
            },
            padding: {
              xs: "0 8px",
              sm: "0 50px",
            },
          }}
        >
          <CustomStack
            sx={{
              justifyContent: "space-between",
              flexDirection: () => (isSmallSize ? "column" : "row"),
            }}
          >
            <Box
              sx={{
                maxWidth: "40%",
                marginBottom: () => (isSmallSize ? "20px" : "0"),
              }}
            >
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
            <Link to={`/follow/:ers/:${id}`}>
              <ColumnWrap removePadding={true}>
                <CurrentTypography variant="body2">
                  {t("profile_followers")}
                </CurrentTypography>
                <CurrentTypography variant="body2">
                  {followers.number ? followers.number : 0}
                </CurrentTypography>
              </ColumnWrap>
            </Link>
            <Box>
              <ColumnWrap removePadding={true}>
                <CurrentTypography variant="body2">
                  {t("profile_posts")}
                </CurrentTypography>
                <CurrentTypography variant="body2">
                  {postsNumber}
                </CurrentTypography>
              </ColumnWrap>
            </Box>
            <Link to={`/follow/:ing/:${id}`}>
              <ColumnWrap removePadding={true}>
                <CurrentTypography variant="body2">
                  {t("profile_following")}
                </CurrentTypography>
                <CurrentTypography variant="body2">
                  {following.number ? following.number : 0}
                </CurrentTypography>
              </ColumnWrap>
            </Link>
          </CustomStack>
          <CustomStack sx={{ margin: "30px 0" }}>
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
  );
};

type ProfilePropsType = profileType;
