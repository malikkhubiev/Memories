import React, { FC, useState } from 'react';
import { imageProcessedCallbackType, readyImageCallbackType, uploadImageCallbackType } from '../../../types/callbacks';
import { ImageInput } from '../../ui/Inputs/ImageInput/ImageInput';
import { ImageProcessing } from './ImageProcessing';

export const ImageUpload:FC<ImageUploadPropsType> = (
    {readyImageCallback, src}) => {

    let [isImageProcessingMode, setIsImageProcessingMode] = useState<boolean>(false);
    let [uploadedImage, setUploadedImage] = useState<HTMLCanvasElement | null>(null);

    const uploadImageCallback: uploadImageCallbackType = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.addEventListener("load", () => {
                // @ts-ignore
                setUploadedImage(prev => prev = reader.result);
                setIsImageProcessingMode(prev => prev = true);
            });
        };
    };

    const imageProcessedCallback:imageProcessedCallbackType = (canvas, imgFile) => {
        setUploadedImage(prev => prev = canvas);
        setIsImageProcessingMode(prev => prev = false);
        readyImageCallback(canvas, imgFile);
    };

    return <>
        {
            isImageProcessingMode ?
            <ImageProcessing
                imageProcessedCallback={imageProcessedCallback}
                uploadedImage={uploadedImage ?
                    `${uploadedImage}` : null}
            /> :
            <ImageInput
                src={uploadedImage ?
                    uploadedImage.toDataURL() :
                    src ? src : null}
                uploadImageCallback={uploadImageCallback}
            />
        }
    </>
};

type ImageUploadPropsType = {
    readyImageCallback: readyImageCallbackType
    src?: string
};