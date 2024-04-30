import { Box, Link as MaterialLink, Typography } from "@mui/material";
import React, { FC, useEffect, useRef, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  setErrorMessage,
  setIsLoading,
} from "../../../fullStore/combos/user/userSlice";
import { useAppDispatch } from "../../../fullStore/hooks";
import {
  useLikeImage,
  useUnLikeImage,
} from "../../../fullStore/queries/imageQueries";
import {
  commentsCallbackType,
  imageMenuOptionsActionsType,
  menuOptionsHandlerCallbackType,
  optionActionCallbackType,
} from "../../../types/callbacks";
import { tagType } from "../../../types/storeTypes";
import { ItemHeader } from "../../layout/Headers/ItemHeader/ItemHeader";
import { Buttons } from "../../ui/Buttons/ImageButtons/ImageButtons";
import { BasicMenuComponent } from "../../ui/CustomMenu/CustomComponents/CustomMenuComponents";
import { menuOption } from "../../ui/CustomMenu/CustomMenu";
import { ThreeLineTypographyWithEllipsis } from "../../ui/customStyledComponents";
import styles from "./Image.module.less";
import { useTranslation } from "react-i18next";
import { addDynamicResources } from "../../../i18n/i18n";

const ownImageMenuOptions = [
  { id: 1, props: { body: "image_button_save", icon: "filled_bookmark" } },
  { id: 2, props: { body: "image_button_unsave", icon: "unsave" } },
  { id: 3, props: { body: "image_button_download", icon: "download" } },
  { id: 4, props: { body: "image_button_hide", icon: "hide" } },
  { id: 5, props: { body: "image_button_show", icon: "show" } },
  { id: 6, props: { body: "image_button_delete", icon: "delete" } },
];

const notOwnImageMenuOptions = [
  { id: 7, props: { body: "image_button_notInterested", icon: "not_interested" } },
  { id: 8, props: { body: "image_button_download", icon: "download" } },
  { id: 9, props: { body: "image_button_save", icon: "filled_bookmark" } },
  { id: 10, props: { body: "image_button_unsave", icon: "unsave" } },
];

export const Image: FC<ImagePropsType> = ({
  setImagePosition,
  authorId,
  authorName,
  isOwn,
  avatar,
  id,
  createdAt,
  src,
  isLiked,
  numberOfLikes,
  description,
  tags,
  idOfSelected,
  numberOfViews,
  commentsCallback,
  isCommentSectionOpened,
  menuOptionsHandlerCallback,
  numberOfComments,
  isPrivate,
  isSaved,
}) => {

  let [outSideMenuOptions, setOutsideMenuOptions] = useState<any[]>([]);
  const { t } = useTranslation("authorized");
  useEffect(() => {
    addDynamicResources("authorized");
    let menuOptions: any[];
    if (isOwn) {
      menuOptions = JSON.parse(JSON.stringify(ownImageMenuOptions));
      if (isPrivate)
        menuOptions.splice(3, 1); // splice HIDE
      else menuOptions.splice(4, 1); // splice SHOW
    } else {
      menuOptions = JSON.parse(JSON.stringify(notOwnImageMenuOptions));
    }
    if (isSaved) {
      menuOptions = menuOptions.filter(
        (option) => ![1,9].includes(option.id) // splice SAVE
      );
    } else {
      menuOptions = menuOptions.filter(
        (option) => ![2,10].includes(option.id) // splice UNSAVE
      );
    }
    menuOptions = menuOptions.map((option) => {
      option["props"]["body"] = t(option["props"]["body"]);
      return option;
    })
    const processedOptions = menuOptions;
    processedOptions.forEach((option: menuOption) => {
      option["component"] = BasicMenuComponent;
    });
    setOutsideMenuOptions(prev=>prev=processedOptions)
  }, []);

  const isPostPage = useLocation().pathname.includes("post");

  const optionActionCallback: optionActionCallbackType<
    imageMenuOptionsActionsType
  > = (action) => {
    menuOptionsHandlerCallback(id, action);
  };

  let [currentNumberOfLikes, setCurrentNumberOfLikes] =
    useState<string>(numberOfLikes);
  let [currentIsLiked, setCurrentIsLiked] = useState<boolean>(isLiked);

  const url = `http://localhost:8080/#/post/:${id}/:false`;

  const [likeImage] = useLikeImage();
  const [unLikeImage] = useUnLikeImage();

  const usualDispatch = useAppDispatch();

  const like = () => {
    usualDispatch(setIsLoading(true));
    likeImage({ imageId: id })
      .unwrap()
      .then((fulfilled) => {
        setCurrentIsLiked((prev) => (prev = true));
        setCurrentNumberOfLikes((prev) => (prev = `${+prev + 1}`));
      })
      .catch((e) => usualDispatch(setErrorMessage(e.data.message)));
    usualDispatch(setIsLoading(false));
  };

  const unLike = () => {
    usualDispatch(setIsLoading(true));
    unLikeImage({ imageId: id })
      .unwrap()
      .then((fulfilled) => {
        setCurrentIsLiked((prev) => (prev = false));
        setCurrentNumberOfLikes((prev) => (prev = `${+prev - 1}`));
      })
      .catch((e) => usualDispatch(setErrorMessage(e.data.message)));
    usualDispatch(setIsLoading(false));
  };

  const ref = useRef<any>();

  useEffect(() => {
    if (setImagePosition) {
      // Preference checking
      if (ref.current && ref.current.offsetTop && ref.current.clientHeight) {
        const position = ref.current.offsetTop + ref.current.clientHeight / 2;
        setImagePosition(id, position, ref.current.clientHeight);

        // Scrolling to the image
        if (idOfSelected === id) {
          setTimeout(() => {
            const position = ref.current.offsetTop;
            window.scrollTo(0, position);
          }, 100);
        }
      }
    }
  }, []);

  const tagsForShow = JSON.parse(JSON.stringify(tags)).filter(
    (tag: tagType) => !tag.isPrivate,
  );

  return (
    <div id={`${id}`} ref={ref} className={styles.imageComponent}>
      <div className={styles.header}>
        <ItemHeader
          optionActionCallback={optionActionCallback}
          menuOptions={outSideMenuOptions}
          imgSrc={src}
          authorId={authorId}
          authorName={authorName}
          isOwn={isOwn}
          avatar={avatar}
          createdAt={createdAt}
        />
      </div>
      <img className={styles.image} src={process.env.REACT_APP_API_URL + src} />
      <Buttons
        numberOfComments={numberOfComments}
        commentsCallback={commentsCallback || null}
        isCommentSectionOpened={isCommentSectionOpened || null}
        isLiked={currentIsLiked}
        like={like}
        unLike={unLike}
        numberOfLikes={currentNumberOfLikes}
        imageId={id}
        url={url}
      />
      <Box
        sx={{
          width: "100%",
          padding: {
            md: "0",
            xs: "0 30px",
          },
        }}
      >
        <Box sx={{ width: "100%", justifyContent: "center" }}>
          <Typography variant="h5">{numberOfViews} {t('image_views')}</Typography>
        </Box>
        <div className={styles.description}>
          <div className={styles.line}></div>
          <Box sx={{ maxWidth: "80%" }}>
            {isPostPage ? (
              <Typography variant="body2">{description}</Typography>
            ) : (
              <ThreeLineTypographyWithEllipsis>
                {description}
              </ThreeLineTypographyWithEllipsis>
            )}
          </Box>
        </div>
        <div className={styles.tags}>
          {tagsForShow.map((tag: any) => (
            <MaterialLink
              key={tag.id}
              variant="body2"
              component={RouterLink}
              sx={{
                textDecoration: "none",
                color: "primary.main",
              }}
              to={`/tags/:${tag.id}/:${tag.name}`}
            >
              #{tag.name}
            </MaterialLink>
          ))}
        </div>
      </Box>
    </div>
  );
};

type ImagePropsType = {
  setImagePosition?: (
    id: number,
    position: number,
    loadedImageHeight?: number,
  ) => void;
  commentsCallback?: commentsCallbackType;
  menuOptionsHandlerCallback?: menuOptionsHandlerCallbackType;
  isCommentSectionOpened?: boolean;
  numberOfComments: string;
  authorId: number;
  numberOfViews: string;
  authorName: string;
  isOwn: boolean;
  avatar: string;
  id: number;
  createdAt: string;
  src: string;
  isLiked: boolean;
  numberOfLikes: string;
  description: string;
  tags: tagType[];
  idOfSelected?: number;
  isPrivate: boolean;
  isSaved: boolean;
};
