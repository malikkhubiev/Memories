import React, { memo, useCallback, useEffect, useState } from 'react';
import { useGetPreferences, useSetPreferences } from '../../../fullStore/combos/profile/profileQueries';
import { setErrorMessage, setIsLoading } from '../../../fullStore/combos/user/userSlice';
import { useAppDispatch } from '../../../fullStore/hooks';
import { useDeleteImage, useHideImage, useNotInterestedImage, useSaveImage, useShowImage, useUnSaveImage, useViewImage } from '../../../fullStore/queries/imageQueries';
import useCustomDispatch from '../../../hooks/useCustomDispatch';
import { menuOptionsHandlerCallbackType } from '../../../types/callbacks';
import { imageType, preferenceType } from '../../../types/storeTypes';
import { SmallGoldenRatioBox } from '../../ui/customStyledComponents';
import { Image } from '../Image/Image';
import styles from './Images.module.less';

const modifiedImages: any = {};
const processedServerPreferences: any = {};
let imageIdsWithSeconds: any = {};

export const ImagesByOne = memo((
    { images, idOfSelected, onScrollHomePageFunc }: ImagesByOnePropsType) => {

    const [currentImages, setCurrentImages] = useState<imageType[]>(images);
    const { data: serverPreferences, isLoading, error } = useGetPreferences(null);

    const [setPreferences] = useSetPreferences();

    const usualDispatch = useAppDispatch();

    useEffect(() => {
        if (error){
            // @ts-ignore
        usualDispatch(setErrorMessage(error.data.message));
    };
}, [error]);

useEffect(() => {
    if (isLoading) usualDispatch(setIsLoading(true));
    else usualDispatch(setIsLoading(false));
}, [isLoading]);

useEffect(() => {
    if (serverPreferences) {
        serverPreferences.forEach((pref: preferenceType) => {
            processedServerPreferences[pref.name] = pref.rating;
        });
    };
}, [serverPreferences]);

useEffect(() => {
    setCurrentImages(prev => prev = images);
}, [images]);

const clientHeight = window.innerHeight;
let imageHeight: number | null = null;

const imagePositions: any = {};
const setImagePosition = useCallback((id: number, position: number, loadedImageHeight: number) => {
    imagePositions[id] = position;
    if (loadedImageHeight) imageHeight = loadedImageHeight;
}, []);

let observableImageId: number | null = null;
let startOfObserving: number | null = 0;
let endOfObserving: number | null = 0;

const preferenceHandler = useCallback(() => {
    const seconds = Math.round((endOfObserving - startOfObserving) / 1000);
    if (imageIdsWithSeconds) {
        const prevSecondsNumber = imageIdsWithSeconds[observableImageId] || 0;
        imageIdsWithSeconds = {
            ...imageIdsWithSeconds,
            [observableImageId]: prevSecondsNumber + seconds
        };
    };
}, []);

useEffect(() => {
    currentImages && currentImages.length && currentImages.forEach(image => {
        modifiedImages[image.id] = image.tags.map(tag => tag.name);
    });
}, [currentImages]);

const [view] = useViewImage();

useEffect(() => {
    window.onscroll = () => {
        onScrollHomePageFunc && onScrollHomePageFunc();
        const clientCenter = window.scrollY + clientHeight / 2;
        for (let [key, value] of Object.entries(imagePositions)) {
            // @ts-ignore
            if (Math.abs(clientCenter - value) < imageHeight / 2) {
                if (observableImageId !== +key) {
                    if (observableImageId === null) {
                        observableImageId = +key;
                        startOfObserving = Date.now();
                    } else {
                        endOfObserving = Date.now();
                        preferenceHandler();
                        observableImageId = +key;
                        startOfObserving = Date.now();
                    }
                }
            };
        };
    };
    return () => {
        Object.keys(imageIdsWithSeconds).forEach(imageId => {
            modifiedImages[imageId].forEach((tag: string) => {
                if (!processedServerPreferences[tag])
                    processedServerPreferences[tag] = 0;
                processedServerPreferences[tag] =
                    processedServerPreferences[tag] + imageIdsWithSeconds[imageId];
            });
        });
        const preferencesForSending: any[] = [];
        Object.entries(processedServerPreferences).forEach(entrie => {
            preferencesForSending.push({
                name: entrie[0],
                rating: entrie[1]
            })
        });
        usualDispatch(setIsLoading(true));
        setPreferences({
            preferences: preferencesForSending,
            isFirstTime: false
        }).unwrap()
            .catch(e => usualDispatch(setErrorMessage(e.data.message)));
        usualDispatch(setIsLoading(false));
        const imagesIds = Object.keys(imageIdsWithSeconds).map(id => +id);
        usualDispatch(setIsLoading(true));
        view({
            imagesIds
        }).unwrap()
            .then(() => usualDispatch(setIsLoading(false)));
    };
}, []);

const [saveImage] = useSaveImage();
const [unsaveImage] = useUnSaveImage();
const [hideImage] = useHideImage();
const [deleteImage] = useDeleteImage();
const [notInterested] = useNotInterestedImage();
const [showImage] = useShowImage();

const menuOptionsHandlerCallback: menuOptionsHandlerCallbackType = (itemId, action) => {
    if (action === "Save") {
        usualDispatch(setIsLoading(true));
        saveImage({ imageId: itemId }).unwrap()
            .then((fulfilled) => {
                setCurrentImages(prev => {
                    const copy = JSON.parse(
                        JSON.stringify(currentImages)
                    );
                    copy.forEach((image: imageType) => {
                        if (image.id === itemId) image.isSaved = true;
                    });
                    return prev = copy;
                });
            })
            .catch(e => usualDispatch(setErrorMessage(e.data.message)));
        usualDispatch(setIsLoading(false));
    } else if (action === "Unsave") {
        usualDispatch(setIsLoading(true));
        unsaveImage({ imageId: itemId }).unwrap()
            .then((fulfilled) => {
                setCurrentImages(prev => {
                    const copy = JSON.parse(
                        JSON.stringify(currentImages)
                    );
                    copy.forEach((image: imageType) => {
                        if (image.id === itemId) image.isSaved = false;
                    });
                    return prev = copy;
                });
            })
            .catch(e => usualDispatch(setErrorMessage(e.data.message)));
        usualDispatch(setIsLoading(false));
    } else if (action === "Hide") {
        usualDispatch(setIsLoading(true));
        hideImage({ imageId: itemId }).unwrap()
            .then((fulfilled) => {
                setCurrentImages(prev => prev = prev.filter(
                    image => image.id !== itemId
                ));
            })
            .catch(e => usualDispatch(setErrorMessage(e.data.message)));
        usualDispatch(setIsLoading(false));
    } else if (action === "Delete") {
        usualDispatch(setIsLoading(true));
        deleteImage({ imageId: itemId }).unwrap()
            .then((fulfilled) => {
                setCurrentImages(prev => prev = prev.filter(
                    image => image.id !== itemId
                ));
            })
            .catch(e => usualDispatch(setErrorMessage(e.data.message)));
        usualDispatch(setIsLoading(false));
    } else if (action === "Not interested") {
        usualDispatch(setIsLoading(true));
        notInterested({ imageId: itemId }).unwrap()
            .then(() => {
                setCurrentImages(prev => prev = prev.filter(
                    image => image.id !== itemId
                ));
            })
            .catch(e => usualDispatch(setErrorMessage(e.data.message)));
        usualDispatch(setIsLoading(false));
    } else if (action === "Show") {
        usualDispatch(setIsLoading(true));
        showImage({ imageId: itemId });
        usualDispatch(setIsLoading(false));
    };
};

return (
    <SmallGoldenRatioBox>
        {
            currentImages && currentImages.map((image: any) =>
                <Image
                    key={image.id}
                    menuOptionsHandlerCallback={menuOptionsHandlerCallback}
                    setImagePosition={setImagePosition}
                    idOfSelected={idOfSelected}
                    authorId={image.authorId}
                    authorName={image.authorName}
                    isOwn={image.isOwn}
                    avatar={image.avatar}
                    id={image.id}
                    createdAt={image.createdAt}
                    numberOfViews={image.numberOfViews}
                    src={image.src}
                    isLiked={image.isLiked}
                    description={image.description}
                    tags={image.tags}
                    numberOfComments={image.numberOfComments}
                    numberOfLikes={image.numberOfLikes}
                    isPrivate={image.isPrivate}
                    isSaved={image.isSaved}
                />)}
    </SmallGoldenRatioBox>
)
});

type ImagesByOnePropsType = {
    images: any[],
    idOfSelected?: number | null,
    onScrollHomePageFunc?: () => void
};