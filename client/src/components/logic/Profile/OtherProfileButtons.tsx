import { Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setNewChatUserId } from '../../../fullStore/combos/chats/chatsSlice';
import { blockThunk, useFollow, useSendASubscriptionRequest, useUnfollow } from '../../../fullStore/combos/profile/profileQueries';
import { selectProfile } from '../../../fullStore/combos/profile/profilesSlice';
import { setErrorMessage, setIsLoading } from '../../../fullStore/combos/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../../fullStore/hooks';
import { RootState } from '../../../fullStore/rootStore';
import useCustomDispatch from '../../../hooks/useCustomDispatch';
import { followUnfollowActionType, giveCurrentImagesCallbackType, sortByToggleCallbackType, toggleButtonCallbackType } from '../../../types/callbacks';
import { profileType } from '../../../types/storeTypes';
import { Sort } from '../../ui/Buttons/Sort';
import { ToggleButton } from '../../ui/Buttons/ToggleButton';
import { CustomBlockIcon } from '../../ui/CustomIcons/CustomIcons';

const CurrentBox = styled(Box)(({ theme }) => ({
    width: "50px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}));

export const OtherProfileButtons: FC<OtherProfileButtonsPropsType> = (
    { id, isOpenedForMe = true, isRequestSended, amIFollowed, giveCurrentImagesCallback }) => {

    const user: profileType = useAppSelector((state: RootState) => selectProfile(state, id));

    useEffect(() => {
        giveCurrentImagesCallback({
            rows: user.usualImagesByDate.rows,
            count: user.usualImagesByDate.count
        });
    }, []);

    let [buttonText, setButtonText] = useState<followUnfollowActionType>(
        amIFollowed ? "unfollow" : "follow"
    );
    let [requestText, setRequestText] = useState<"send request" | "request sended">(
        isRequestSended ? "request sended" : "send request"
    );
    let [isSortingByPopularity, setIsSortingByPopularity] = useState<boolean>(false);

    const usualDispatch = useAppDispatch();
    const thunkDispatch = useCustomDispatch();
    const navigate = useNavigate();

    const block = () => {
        const resolveCallback = () => navigate(-1);
        thunkDispatch(blockThunk(id), resolveCallback);
    };

    const [sendRequest] = useSendASubscriptionRequest();
    const [follow] = useFollow();
    const [unFollow] = useUnfollow();

    const requestCallback = () => {
        usualDispatch(setIsLoading(true));
        sendRequest({ userId: id }).unwrap()
            .then(() => {
                setRequestText("request sended");
            })
            .catch(e => usualDispatch(setErrorMessage(e.data.message)));
            usualDispatch(setIsLoading(false));
    };

    const toggleButtonCallback: toggleButtonCallbackType<
        followUnfollowActionType
    > = (action) => {
        if (action === "follow") {
            follow({ followingId: id });
            setButtonText(prev => prev = "unfollow");
        } else if (action === "unfollow") {
            unFollow({ unFollowingId: id });
            setButtonText(prev => prev = "follow");
        };
    };

    const sortByToggleCallback: sortByToggleCallbackType = (sortBy) => {
        if (sortBy === 'popularity')
            giveCurrentImagesCallback({
                rows: user.usualImagesByPopularity.rows,
                count: user.usualImagesByPopularity.count
            });
        else giveCurrentImagesCallback({
            rows: user.usualImagesByDate.rows,
            count: user.usualImagesByDate.count
        });
        setIsSortingByPopularity(prev => prev = !prev);
    };

    const writeHandler = () => {
        usualDispatch(setNewChatUserId(id));
        navigate("/chats");
    };

    return <>
        <CurrentBox>
            <div
                title="Block user"
                onClick={block}
            >
                <CustomBlockIcon />
            </div>
        </CurrentBox>
            {
                isOpenedForMe ?
                    <ToggleButton
                        buttonText={buttonText}
                        toggleButtonCallback={toggleButtonCallback}
                    /> :
                    <ToggleButton
                        disabled={requestText !== "send request"}
                        buttonText={requestText}
                        toggleButtonCallback={requestCallback}
                    />
            }
            <Button onClick={writeHandler}>write</Button>
        <CurrentBox>
            <Sort
                isSortingByPopularity={isSortingByPopularity}
                sortByToggleCallback={sortByToggleCallback}
            />
        </CurrentBox>
    </>
};

type OtherProfileButtonsPropsType = {
    id: number
    amIFollowed: boolean
    isOpenedForMe?: boolean
    isRequestSended?: boolean
    giveCurrentImagesCallback: giveCurrentImagesCallbackType
};