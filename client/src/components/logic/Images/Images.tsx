import { Box } from '@mui/material';
import React, { FC, useState } from 'react';
import { onArrowBackClickCallbackType } from '../../../types/callbacks';
import { ColumnWrap } from '../../layout/ColumnWrap/ColumnWrap';
import { PageHeader } from '../../layout/Headers/PageHeader/PageHeader';
import { Plug } from '../../layout/Plug/Plug';
import { BigGoldenRatioBox, CustomStack } from '../../ui/customStyledComponents';
import styles from './Images.module.less';
import { ImagesByOne } from './ImagesByOne';

export const Images: FC<ImagesPropsType> = ({ images, children }) => {

    let [idOfSelected, setIdOfSelected] = useState<number | null>(null);

    const imageClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        // @ts-ignore
        setIdOfSelected(prev => prev = +event.target.id);
    };

    const resetIdOfSelected: onArrowBackClickCallbackType = () => {
        setIdOfSelected(prev => prev = null);
    };

    return <div className={styles.imagesComponent}>
        {
            idOfSelected ?
                <CustomStack
                    sx={{
                        flexDirection: "column"
                    }}
                >
                    <PageHeader onArrowBackClickCallback={resetIdOfSelected}>
                        <Plug />
                        <Plug />
                    </PageHeader>
                    <ImagesByOne
                        images={images}
                        idOfSelected={idOfSelected}
                    />
                </CustomStack>
                :
                <CustomStack
                    sx={{
                        flexDirection: "column"
                    }}
                >
                    {children}
                    <BigGoldenRatioBox
                        sx={{ "flexWrap": "wrap" }}
                    >
                        {images && images.map((image: any) => (
                            <Box
                                key={image.id}
                                sx={{
                                    width: {
                                        "lg": "18vw",
                                        "xs": "33vw",
                                    },
                                    height: {
                                        "lg": "18vw",
                                        "xs": "33vw",
                                    },
                                    margin: {
                                        "lg": "1vw"
                                    }
                                }}
                            >
                                <img
                                    onClick={imageClickHandler}
                                    id={image.id}
                                    className={styles.image}
                                    src={process.env.REACT_APP_API_URL + image.src}
                                />
                            </Box>
                        ))}
                    </BigGoldenRatioBox>
                </CustomStack>
        }
    </div>
};

type ImagesPropsType = {
    images: any[],
    children?: any
};