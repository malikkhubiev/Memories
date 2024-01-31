import { Box } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../../components/layout/Headers/Header/Header';
import { PageHeader } from '../../../components/layout/Headers/PageHeader/PageHeader';
import { Plug } from '../../../components/layout/Plug/Plug';
import { RowUser } from '../../../components/logic/RowUser/RowUser';
import { UsersList } from '../../../components/logic/UsersList/UsersList';
import { SmallGoldenRatioBox } from '../../../components/ui/customStyledComponents';
import { setErrorMessage, setIsLoading } from '../../../fullStore/combos/user/userSlice';
import { useAppDispatch } from '../../../fullStore/hooks';
import { useGetImageLikersBySubstr } from '../../../fullStore/queries/searchQueries';
import { imageLikerType } from '../../../types/storeTypes';

export const LikedPage: FC<{}> = () => {

    const imageId = +useParams().imageId.slice(1);
    const [getLikers] = useGetImageLikersBySubstr();
    const usualDispatch = useAppDispatch();

    let [number, setNumber] = useState<string>("0");
    let [likers, setLikers] = useState<imageLikerType[]>(null);

    useEffect(() => {
        usualDispatch(setIsLoading(true));
        getLikers({
            imageId,
            substring: ""
        }).unwrap()
            .then(fulfilled => {
                setLikers(
                    prev => prev = fulfilled.rows
                );
                setNumber(
                    prev => prev = fulfilled.count
                );
            })
            .catch(e => usualDispatch(setErrorMessage(e.data.message)));
        usualDispatch(setIsLoading(false));
    }, []);

    const searchHandler = (searchValue: string) => {
        getLikers({
            imageId,
            substring: searchValue.trim() || ""
        }).unwrap()
            .then(fulfilled => {
                setLikers(
                    prev => prev = fulfilled.rows
                );
                setNumber(
                    prev => prev = fulfilled.count
                );
            });
    };

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <PageHeader>
                <Header text="Liked" />
                <Plug />
            </PageHeader>
            <SmallGoldenRatioBox>
                <UsersList
                    numberOf={number + " users liked this post"}
                    searchHandler={searchHandler}
                >
                    {
                        likers ? likers.map((user: any) =>
                            <RowUser
                                key={user.id}
                                id={user.id}
                                avatar={user.avatar}
                                name={user.name}
                            />
                        ) : ""
                    }
                </UsersList>
            </SmallGoldenRatioBox>
        </Box>
    );
};