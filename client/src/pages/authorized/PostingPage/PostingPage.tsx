import { Box, Button, CircularProgress } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/layout/Headers/Header/Header";
import { PageHeader } from "../../../components/layout/Headers/PageHeader/PageHeader";
import { Plug } from "../../../components/layout/Plug/Plug";
import { ImageUpload } from "../../../components/logic/ImageUpload/ImageUpload";
import { ChangeInput } from "../../../components/ui/Inputs/ChangeInput/ChangeInput";
import {
  CustomStack,
  SmallGoldenRatioBox,
} from "../../../components/ui/customStyledComponents";
import { addUsualImageByDate } from "../../../fullStore/combos/images/imagesSlice";
import {
  setIsLoading
} from "../../../fullStore/combos/user/userSlice";
import { useAppDispatch } from "../../../fullStore/hooks";
import { useUploadImage } from "../../../fullStore/queries/imageQueries";
import useSocket from "../../../hooks/useSocket";
import { addDynamicResources } from "../../../i18n/i18n";
import { readyImageCallbackType } from "../../../types/callbacks";
import { imageType } from "../../../types/storeTypes";
import styles from "./PostingPageStyle";

const PostingPage: FC<{}> = () => {
  const { t } = useTranslation("authorized");
  useEffect(() => {
    addDynamicResources("authorized");
  }, []);

  let [currentIsLoading, setCurrentIsLoading] = useState<boolean>(false);
  const [model, setModel] = useState<any>(null);

  let [image, setImage] = useState<HTMLCanvasElement>(null);
  let [imageFile, setImageFile] = useState<File>(null);
  let [description, setDescription] = useState<string>("");
  let [tags, setTags] = useState<string[]>([]);
  // let [privateTag, setPrivateTag] = useState<string>("");

  const [uploadImage] = useUploadImage();
  const navigate = useNavigate();
  const usualDispatch = useAppDispatch();

  const { data, sendData } = useSocket("images");

  // const imageLoaded = async () => {
  //     const results = await model.classify(image);
  //     const hidenTag = results[0].className.split(",")[0].split(" ").join("");
  //     setPrivateTag(prev => hidenTag);
  // };

  // useEffect(() => {
  //     if (image) imageLoaded();
  // }, [image]);

  const readyImageCallback: readyImageCallbackType = async (
    canvas,
    imageFile,
  ) => {
    setImage((prev) => (prev = canvas));
    setImageFile((prev) => (prev = imageFile));
  };

  const descriptionCallback = (text: string) => {
    setDescription((prev) => (prev = text));
  };

  const tagCallback = (text: string) => {
    const parsedTags: any[] = [];
    let splitedTags = text.split("#");
    splitedTags.splice(0, 1);
    splitedTags = Array.from(new Set(splitedTags));
    splitedTags.forEach((tag) => {
      let tagCopy: string[] | string = tag.trim().split(" ");
      if (tagCopy.length !== 1) {
        tagCopy = tagCopy.map((word, index) => {
          if (index !== 0) {
            word = word[0].toUpperCase() + word.slice(1);
          }
          return word;
        });
        tagCopy = tagCopy.join("");
      } else {
        tagCopy = tagCopy[0];
      }
      parsedTags.push(tagCopy);
    });
    setTags((prev) => {
      if (prev.length) {
        const newTagsValue: string[] = Array.from(
          new Set([...prev, ...parsedTags]),
        );
        return (prev = newTagsValue);
      } else return (prev = parsedTags);
    });
  };

  const postHandler = async () => {
    if (description && tags && imageFile) {
      const updatedTags = tags.map((tag) => {
        return {
          name: tag,
          isPrivate: false,
        };
      });
      // updatedTags.push({
      //     name: privateTag,
      //     isPrivate: true
      // });
      const formData = new FormData();
      formData.append("img", imageFile);
      formData.append("description", description);
      formData.append("tags", JSON.stringify(updatedTags));
      setDescription((prev) => (prev = ""));
      setTags((prev) => (prev = []));
      usualDispatch(setIsLoading(true));
      uploadImage(formData)
        .unwrap()
        .then((fulfilled: imageType) => {
          sendData({
            type: "images",
            body: {
              ownId: fulfilled.authorId,
              ...fulfilled,
            },
          });
          navigate(-1);
        })
        .catch((rejected: any) => console.error(rejected));
      usualDispatch(setIsLoading(false));
    }
  };

  // const loadModel = async () => {
  //     try {
  //         const model = await mobilenet.load();
  //         setModel((prev: any) => prev = model);
  //         setCurrentIsLoading(prev => prev = false);
  //     } catch (e) {
  //         console.log(e.message);
  //     };
  // };

  // useEffect(() => {
  //     setCurrentIsLoading(prev => prev = true);
  //     loadModel();
  // }, []);

  useEffect(() => {
    if (!data) return;
    usualDispatch(addUsualImageByDate(data));
  }, [data]);

  return (
    <>
      {currentIsLoading ? (
        <Box sx={styles.above}>
          <CircularProgress size={100} />
        </Box>
      ) : (
        ""
      )}
      <CustomStack sx={styles.stack}>
        <PageHeader isShowing={false}>
          <Header text="Post" />
          <Plug />
        </PageHeader>
        <SmallGoldenRatioBox sx={styles.smallGoldenRatioBox}>
          <ImageUpload readyImageCallback={readyImageCallback} />
          <CustomStack sx={styles.insideStack}>
            <ChangeInput
              text={description}
              isMultiline={true}
              changeInputCallback={descriptionCallback}
              placeholder="Description"
              sx={styles.changeInput}
            />
            <ChangeInput
              text={tags.map((tag) => (tag = "#" + tag)).join(" ")}
              changeInputCallback={tagCallback}
              placeholder="#Tags"
              isMultiline={true}
              sx={styles.changeInput}
            />
            <Button
              sx={styles.changeInput}
              onClick={postHandler}
              variant="contained"
              disabled={!(description && tags.length && imageFile)}
            >
              {t("posting_button")}
            </Button>
          </CustomStack>
        </SmallGoldenRatioBox>
      </CustomStack>
    </>
  );
};

export default PostingPage;
