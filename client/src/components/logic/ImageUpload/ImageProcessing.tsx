import { Box, Button } from "@mui/material";
import React, { FC, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { useNavigate } from "react-router-dom";
import { imageProcessedCallbackType } from "../../../types/callbacks";
import getCroppedImg from "../../../utils/imageProcessing/cropImage";
import { dataURLtoFile } from "../../../utils/imageProcessing/dataUrlToFile";
import { CustomArrowBackIcon } from "../../ui/CustomIcons/CustomIcons";
import styles from "./ImageProcessing.module.less";

export const ImageProcessing: FC<ImageProcessingType> = ({
  uploadedImage,
  imageProcessedCallback,
}) => {
  const [cropedArea, setCropedArea] = useState<Area | null>(null);
  const [crop, setCrop] = useState<cropType>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCropedArea((prev) => (prev = croppedAreaPixels));
  };

  const uploadHandler = async () => {
    const canvas = await getCroppedImg(uploadedImage, cropedArea);
    let imgfile = dataURLtoFile(canvas.toDataURL(), "image.png");
    imageProcessedCallback(canvas, imgfile);
  };

  const navigate = useNavigate();

  const arrowBackClickHandler = () => navigate(-1);

  return (
    <div className={styles.App}>
      <div className={styles.cropContainer}>
        <Cropper
          image={uploadedImage}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className={styles.controls}>
        <Box
          sx={{
            cursor: "pointer",
          }}
          onClick={arrowBackClickHandler}
        >
          <CustomArrowBackIcon />
        </Box>
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setZoom(+event.target.value);
          }}
          className={styles.zoomRange}
        />
        <Button onClick={uploadHandler} variant="contained">
          Upload
        </Button>
      </div>
    </div>
  );
};

type cropType = {
  x: number;
  y: number;
};

type ImageProcessingType = {
  imageProcessedCallback: imageProcessedCallbackType;
  uploadedImage: string;
};
