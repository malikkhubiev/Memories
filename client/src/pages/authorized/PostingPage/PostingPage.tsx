import { Box, Button, CircularProgress } from '@mui/material';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../../components/layout/Headers/Header/Header';
import { PageHeader } from '../../../components/layout/Headers/PageHeader/PageHeader';
import { ImageUpload } from '../../../components/logic/ImageUpload/ImageUpload';
import { ChangeInput } from '../../../components/ui/Inputs/ChangeInput/ChangeInput';
import { ColumnWrap } from '../../../components/layout/ColumnWrap/ColumnWrap';
import { Plug } from '../../../components/layout/Plug/Plug';
import * as mobilenet from "@tensorflow-models/mobilenet";
import styles from './PostingPage.module.less';
import { readyImageCallbackType } from '../../../types/callbacks';
import { useUploadImage } from '../../../fullStore/queries/imageQueries';
import { imageType } from '../../../types/storeTypes';
import useSocket from '../../../hooks/useSocket';
import { useAppDispatch, useAppSelector } from '../../../fullStore/hooks';
import { addUsualImageByDate } from '../../../fullStore/combos/images/imagesSlice';
import { selectIsLoading, setIsLoading } from '../../../fullStore/combos/user/userSlice';
import { RootState } from '../../../fullStore/rootStore';
import { CustomStack, SmallGoldenRatioBox } from '../../../components/ui/customStyledComponents';

export const PostingPage: FC<{}> = () => {

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

    const readyImageCallback: readyImageCallbackType = async (canvas, imageFile) => {
        setImage(prev => prev = canvas);
        setImageFile(prev => prev = imageFile);
    };

    const descriptionCallback = (text: string) => {
        setDescription(prev => prev = text);
    };

    const tagCallback = (text: string) => {
        const parsedTags: any[] = [];
        let splitedTags = text.split("#");
        splitedTags.splice(0, 1);
        splitedTags = Array.from(new Set(splitedTags));
        splitedTags.forEach(tag => {
            let tagCopy: string[] | string = tag.trim().split(" ");
            if (tagCopy.length !== 1) {
                tagCopy = tagCopy.map((word, index) => {
                    if (index !== 0) {
                        word = word[0].toUpperCase() + word.slice(1);
                    };
                    return word;
                });
                tagCopy = tagCopy.join("");
            } else {
                tagCopy = tagCopy[0];
            };
            parsedTags.push(tagCopy);
        });
        setTags(prev => {
            if (prev.length) {
                const newTagsValue: string[] = Array.from(new Set([...prev, ...parsedTags]));
                return prev = newTagsValue;
            } else return prev = parsedTags;
        });
    };

    const postHandler = async () => {
        if (description && tags && imageFile) {
            const updatedTags = tags.map(tag => {
                return {
                    name: tag,
                    isPrivate: false
                }
            });
            // updatedTags.push({
            //     name: privateTag,
            //     isPrivate: true
            // });
            const formData = new FormData();
            formData.append("img", imageFile);
            formData.append("description", description);
            formData.append("tags", JSON.stringify(updatedTags));
            setDescription(prev => prev = "");
            setTags(prev => prev = []);
            usualDispatch(setIsLoading(true));
            uploadImage(formData).unwrap()
                .then((fulfilled: imageType) => {
                    sendData({
                        type: "images",
                        body: {
                            ownId: fulfilled.authorId,
                            ...fulfilled
                        }
                    });
                    navigate(-1);
                })
                .catch((rejected: any) => console.error(rejected));
            usualDispatch(setIsLoading(false));
        };
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
            {
                currentIsLoading ?
                    <Box
                        sx={{
                            width: "100vw",
                            height: "100vh",
                            overflow: "hidden",
                            position: "fixed",
                            zIndex: "9999",
                            display: 'flex',
                            justifyContent: "center",
                            alignItems: 'center',
                            backgroundColor: "#fff",
                            top: "0",
                            left: "0",
                        }}
                    >
                        <CircularProgress size={100} />
                    </Box> : ""
            }
            <CustomStack
                sx={{
                    flexDirection: "column",
                    paddingBottom: "120px",
                }}
            >
                <PageHeader
                    isShowing={false}
                >
                    <Header text="Post" />
                    <Plug />
                </PageHeader>
                <SmallGoldenRatioBox
                    sx={{
                        alignItems: "center",
                    }}
                >
                    <ImageUpload
                        readyImageCallback={readyImageCallback}
                    />
                    <CustomStack
                        sx={{
                            flexDirection: "column",
                            padding: "0 15px",
                        }}
                    >
                        <ChangeInput
                            text={description}
                            isMultiline={true}
                            changeInputCallback={descriptionCallback}
                            placeholder="Description"
                            sx={{
                                marginTop: "20px"
                            }}
                        />
                        <ChangeInput
                            text={tags.map(tag => tag = "#" + tag).join(" ")}
                            changeInputCallback={tagCallback}
                            placeholder="#Tags"
                            isMultiline={true}
                            sx={{
                                marginTop: "20px"
                            }}
                        />
                        <Button
                            sx={{
                                marginTop: "20px"
                            }}
                            onClick={postHandler}
                            variant="contained"
                            disabled={!(description && tags.length && imageFile)}
                        >Post
                        </Button>
                    </CustomStack>
                </SmallGoldenRatioBox>
            </CustomStack>
        </>
    )
};