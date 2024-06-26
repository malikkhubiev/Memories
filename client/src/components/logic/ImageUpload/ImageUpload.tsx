import React, { FC, useState } from "react";
import {
  imageProcessedCallbackType,
  readyImageCallbackType,
  uploadImageCallbackType,
} from "../../../types/callbacks";
import { ImageInput } from "../../ui/Inputs/ImageInput/ImageInput";
import { ImageProcessing } from "./ImageProcessing";
import { Alert } from "@mui/material";
import { CustomAlert } from "../../ui/CustomAlert/CustomAlert";

export const ImageUpload: FC<ImageUploadPropsType> = ({
  readyImageCallback,
  src,
}) => {
  let [error, setError] = useState<string>("");
  let [isImageProcessingMode, setIsImageProcessingMode] =
    useState<boolean>(false);
  let [uploadedImage, setUploadedImage] = useState<HTMLCanvasElement | null>(
    null,
  );

  const uploadImageCallback: uploadImageCallbackType = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size < 5 * 1024 * 1024) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", () => {
          // @ts-ignore
          setUploadedImage((prev) => (prev = reader.result));
          setIsImageProcessingMode((prev) => (prev = true));
        });
      } else {
        setError((prev) => (prev = "Maximum file size is 5MB"));
        setTimeout(() => {
          setError((prev) => (prev = ""));
        }, 3000);
      }
    }
  };

  const imageProcessedCallback: imageProcessedCallbackType = (
    canvas,
    imgFile,
  ) => {
    setUploadedImage((prev) => (prev = canvas));
    setIsImageProcessingMode((prev) => (prev = false));
    readyImageCallback(canvas, imgFile);
  };

  return (
    <>
      {error && <CustomAlert message={error} />}
      {isImageProcessingMode ? (
        <ImageProcessing
          imageProcessedCallback={imageProcessedCallback}
          uploadedImage={uploadedImage ? `${uploadedImage}` : null}
        />
      ) : (
        <ImageInput
          src={uploadedImage ? uploadedImage.toDataURL() : src ? src : null}
          uploadImageCallback={uploadImageCallback}
        />
      )}
    </>
  );
};

type ImageUploadPropsType = {
  readyImageCallback: readyImageCallbackType;
  src?: string;
};
