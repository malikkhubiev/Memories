import { Box, Button, useTheme } from "@mui/material";
import React, { FC, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { useNavigate } from "react-router-dom";
import { imageProcessedCallbackType } from "../../../types/callbacks";
import getCroppedImg from "../../../utils/imageProcessing/cropImage";
import { dataURLtoFile } from "../../../utils/imageProcessing/dataUrlToFile";
import { CustomIcon } from "../../ui/CustomIcons/CustomIcons";
import styles from "./ImageProcessingStyle";

export const ImageProcessing: FC<ImageProcessingType> = ({
  uploadedImage,
  imageProcessedCallback,
}) => {
  const theme = useTheme();

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
    <Box sx={styles.app(theme)}>
      <Box sx={styles.cropContainer}>
        <Cropper
          image={uploadedImage}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </Box>
      <Box sx={styles.controls(theme)}>
        <Box
          sx={{
            cursor: "pointer",
          }}
          onClick={arrowBackClickHandler}
        >
          <Button variant="contained">
            Cancel
          </Button>
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
        />
        <Button onClick={uploadHandler} variant="contained">
          Upload
        </Button>
      </Box>
    </Box>
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
