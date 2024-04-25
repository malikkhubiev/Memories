import { Box } from "@mui/material";
import React, { FC, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ColumnWrap } from "../../../components/layout/ColumnWrap/ColumnWrap";
import { PageHeader } from "../../../components/layout/Headers/PageHeader/PageHeader";
import { Plug } from "../../../components/layout/Plug/Plug";
import { Comment } from "../../../components/logic/Comment/Comment";
import { Image } from "../../../components/logic/Image/Image";
import { SmallGoldenRatioBox } from "../../../components/ui/customStyledComponents";
import { AddInput } from "../../../components/ui/Inputs/AddInput/AddInput";
import {
  setIsLoading,
  setErrorMessage,
} from "../../../fullStore/combos/user/userSlice";
import { useAppDispatch } from "../../../fullStore/hooks";
import {
  useAddComment,
  useDeleteComment,
} from "../../../fullStore/queries/commentQueries";
import { useGetImageMutation } from "../../../fullStore/queries/imageQueries";
import useSocket from "../../../hooks/useSocket";
import {
  addInputCallbackType,
  menuOptionsHandlerCallbackType,
} from "../../../types/callbacks";
import { commentType, imageType } from "../../../types/storeTypes";
import styles from "./PostPageStyle";
import { useTranslation } from "react-i18next";
import { addDynamicResources } from "../../../i18n/i18n";

export const transformNumber = (number: number) => {
  let result = String(number);
  if (number > 999999) {
    result = `${number / 1000000}M`;
  } else if (number > 9999) {
    result = `${number / 1000}K`;
  }
  return result;
}; // потом убрать куда-нибудь

const PostPage: FC<{}> = () => {

  const {t} = useTranslation("authorized");
  useEffect(() => {
    addDynamicResources("authorized");
  }, [])

  const imageId = +useParams().imageId.slice(1);
  const isCommentSectionOpenedByParams =
    useParams().isCommentSectionOpened.slice(1) === "true";

  let [image, setImage] = useState<imageType | null>(null);
  let [comments, setComments] = useState<commentType[] | []>([]);

  const [getImage] = useGetImageMutation();

  const usualDispatch = useAppDispatch();

  useEffect(() => {
    if (!imageId) return;
    usualDispatch(setIsLoading(true));
    getImage({ imageId })
      .unwrap()
      .then((fulfilled) => {
        setComments((prev) => (prev = fulfilled.comments));
        const fulfilledCopy = JSON.parse(JSON.stringify(fulfilled));
        delete fulfilledCopy.comments;
        setImage((prev) => (prev = fulfilledCopy));
      })
      .catch((e) => usualDispatch(setErrorMessage(e.data.message)));
    usualDispatch(setIsLoading(false));
  }, [imageId]);

  const { data: socketComment, sendData } = useSocket("comments", imageId);

  useEffect(() => {
    if (socketComment) {
      if (comments) {
        setComments((prev) => (prev = [...prev, socketComment]));
        const newCommentsNumber = comments.length + 1;
        const updatedCommentsNumber = transformNumber(newCommentsNumber);
        setImage(
          (prev) =>
            (prev = {
              ...prev,
              numberOfComments: updatedCommentsNumber,
            }),
        );
      } else {
        setComments((prev) => (prev = [socketComment]));
        const newCommentsNumber = "1";
        setImage(
          (prev) =>
            (prev = {
              ...prev,
              numberOfComments: newCommentsNumber,
            }),
        );
      }
    }
  }, [socketComment]);

  const [addComment] = useAddComment();
  const [deleteComment] = useDeleteComment();

  const ref = useRef<any>();

  let [isCurrentCommentSectionOpened, setIsCurrentCommentSectionOpened] =
    useState<boolean>(isCommentSectionOpenedByParams);

  const commentsOpenCloseCallback = (isCommentSectionOpened: boolean) => {
    setIsCurrentCommentSectionOpened((prev) => (prev = isCommentSectionOpened));
    if (isCommentSectionOpened) {
      setTimeout(() => {
        window.scrollTo(0, Number.MAX_SAFE_INTEGER);
        if (ref && ref.current) {
          // @ts-ignore
          ref.current.scrollTop = Number.MAX_SAFE_INTEGER;
        }
      }, 10);
    }
  };

  let [inputText, setInputText] = useState<string>("");
  const sendCommentCallback: addInputCallbackType = (text) => {
    if (!text || text.trim() === "" || !image.id) return;
    setInputText((prev) => (prev = text));
    usualDispatch(setIsLoading(true));
    addComment({
      imageId: image.id,
      text,
    })
      .unwrap()
      .then((fulfilled: commentType) => {
        setInputText((prev) => (prev = ""));
        sendData({
          type: "comments",
          body: {
            imageId: image.id,
            ...fulfilled,
          },
        });
      })
      .catch((e) => usualDispatch(setErrorMessage(e.data.message)));
    usualDispatch(setIsLoading(false));
  };

  const menuOptionsHandlerCallback: menuOptionsHandlerCallbackType = (
    itemId,
  ) => {
    usualDispatch(setIsLoading(true));
    deleteComment({ commentId: itemId })
      .unwrap()
      .then((fulfilled) => {
        let commentsCopy = JSON.parse(JSON.stringify(comments));
        commentsCopy = commentsCopy.filter(
          (comment: commentType) => comment.id !== itemId,
        );
        if (commentsCopy[0] !== undefined)
          setComments((prev) => (prev = commentsCopy));
        else setComments((prev) => (prev = []));
        const newCommentsNumber = commentsCopy.length;
        const updatedCommentsNumber = transformNumber(newCommentsNumber);
        setImage(
          (prev) =>
            (prev = {
              ...prev,
              numberOfComments: updatedCommentsNumber,
            }),
        );
      })
      .catch((e) => usualDispatch(setErrorMessage(e.data.message)));
    usualDispatch(setIsLoading(false));
  };

  useEffect(() => {
    window.scrollTo(0, Number.MAX_SAFE_INTEGER);
    if (ref?.current) {
      ref.current.scrollTop = Number.MAX_SAFE_INTEGER;
    }
  }, [comments]);

  return (
    <ColumnWrap>
      <PageHeader isShowing={false}>
        <Plug />
        <Plug />
      </PageHeader>
      <SmallGoldenRatioBox>
        {image ? (
          <Image
            commentsCallback={commentsOpenCloseCallback}
            isCommentSectionOpened={isCurrentCommentSectionOpened}
            {...image}
          />
        ) : (
          ""
        )}
        {isCurrentCommentSectionOpened ? (
          <>
            <Box
              ref={ref}
              sx={styles.comments}
            >
              {comments && comments.length
                ? comments.map((comment: any) => (
                    <Comment
                      menuOptionsHandlerCallback={menuOptionsHandlerCallback}
                      key={comment.id}
                      {...comment}
                    />
                  ))
                : ""}
            </Box>
            <AddInput
              lines={3}
              isMultiline={true}
              text={inputText}
              addInputCallback={sendCommentCallback}
              buttonText={t("post_buttonText")}
              placeholder={t("post_placeholder")}
            />
          </>
        ) : (
          ""
        )}
      </SmallGoldenRatioBox>
    </ColumnWrap>
  );
};

export default PostPage;