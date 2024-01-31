import { Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ColumnWrap } from '../../../components/layout/ColumnWrap/ColumnWrap';
import { HeaderCenter } from '../../../components/layout/Headers/HeaderCenter/HeaderCenter';
import { PageHeader } from '../../../components/layout/Headers/PageHeader/PageHeader';
import { Plug } from '../../../components/layout/Plug/Plug';
import { Images } from '../../../components/logic/Images/Images';
import { setErrorMessage, setIsLoading } from '../../../fullStore/combos/user/userSlice';
import { useAppDispatch } from '../../../fullStore/hooks';
import { useGetImagesByTag } from '../../../fullStore/queries/tagsQueries';
import { sortByToggleCallbackType } from '../../../types/callbacks';
import { imageType } from '../../../types/storeTypes';
import styles from './TagPage.module.less';

type imagesType = {
    count: string,
    rows: imageType[] | []
};

export const TagPage: FC<{}> = () => {

    const [currentImages, setCurrentImages] = useState<imagesType>({
        count: "0",
        rows: []
    });

    const [imagesByDate, setImagesByDate] = useState<imagesType>({
        count: "0",
        rows: []
    });

    const [imagesByPopularity, setImagesByPopularity] = useState<imagesType>({
        count: "0",
        rows: []
    });

    let [isSortingByPopularity, setIsSortingByPopularity] = useState<boolean>(false);


    const tagId = +useParams().id.slice(1);
    const tagName = useParams().name.slice(1);

    const usualDispatch = useAppDispatch();

    const sortByToggleCallback: sortByToggleCallbackType = (sortBy) => {
        if (sortBy === "date") {
            setCurrentImages(prev => prev = imagesByDate);
        }else{
            if (imagesByPopularity.rows.length) {
                setCurrentImages(prev => prev = imagesByPopularity);    
            }else{
                usualDispatch(setIsLoading(true));
                getImagesByTag({
                    tagId,
                    sortBy: "popularity"
                })
                .unwrap()
                .then((serverData) => {
                    setImagesByPopularity(prev => prev = serverData);
                    setCurrentImages(prev => prev = serverData);
                });
                usualDispatch(setIsLoading(false));
            };
        };
        setIsSortingByPopularity(prev => prev = !prev);
    };

    const [getImagesByTag] = useGetImagesByTag();

    useEffect(() => {
        usualDispatch(setIsLoading(true));
        getImagesByTag({
            tagId,
            sortBy: "date"
        })
        .unwrap()
        .then((serverData) => {
            setImagesByDate(prev => prev = serverData);
            setCurrentImages(prev => prev = serverData);
        })
        .catch(e => usualDispatch(setErrorMessage(e.data.message)));
        usualDispatch(setIsLoading(false));
    }, []);

    return (
        <ColumnWrap>
            {
                <Images
                    images={currentImages.rows}
                >
                    <PageHeader>
                        <Plug />
                        <Plug />
                    </PageHeader>
                    <HeaderCenter
                        numberOf={
                            currentImages.count
                        }
                        isSortingByPopularity={isSortingByPopularity}
                        sortByToggleCallback={sortByToggleCallback}
                    >
                        <Typography
                            sx={{
                                fontSize: "30px"
                            }}
                            variant="body2"
                        >
                            #{tagName}
                        </Typography>
                    </HeaderCenter>
                </Images>
            }
        </ColumnWrap>
    );
};