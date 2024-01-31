import { Link as MaterialLink, Typography } from '@mui/material';
import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { blockUnblockActionType, followUnfollowActionType, setSelectedUserIdCallbackType, toggleButtonCallbackType } from '../../../types/callbacks';
import { Avatar } from '../../ui/Buttons/Avatar/Avatar';
import { ToggleButton } from '../../ui/Buttons/ToggleButton';
import { CustomAvatar } from '../../ui/CustomAvatar/CustomAvatar';
import { TypographyWithEllipsis } from '../../ui/customStyledComponents';
import styles from './RowUser.module.less';

export const RowUser: FC<RowUserPropsType> = (
    { id, avatar, name, buttonText, setSelectedUserIdCallback, buttonsData }) => {

    const toggleButtonCallback: toggleButtonCallbackType<
        followUnfollowActionType | blockUnblockActionType
    > = () => {
        if (setSelectedUserIdCallback)
            setSelectedUserIdCallback(id);
    };

    return (
        <div className={styles.row}>
            <MaterialLink
                component={RouterLink}
                sx={{
                    maxWidth: "58%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "unset",
                    textDecoration: "none",
                }}
                to={`/profile:${id}`}
            >
                <CustomAvatar
                    src={avatar}
                    width={50}
                />
                <TypographyWithEllipsis
                    sx={{
                        marginLeft: "10px",
                        maxWidth: () => buttonsData ? "67%" : "100%",
                    }}
                >
                    {name}
                </TypographyWithEllipsis>
            </MaterialLink>
            {
                buttonsData ?
                    Object.entries(buttonsData).map(([key, value]) =>
                        <ToggleButton
                            key={key}
                            // @ts-ignore
                            toggleButtonCallback={() => value[0](id)}
                            // @ts-ignore
                            buttonText={key}
                            // @ts-ignore
                            type={value[1]}
                        />
                    ) : buttonText ?
                        <ToggleButton
                            toggleButtonCallback={toggleButtonCallback}
                            buttonText={buttonText}
                        /> : ""
            }
        </div>
    );
};

type RowUserPropsType = {
    id: number
    buttonText?: followUnfollowActionType | blockUnblockActionType | "confirm"
    setSelectedUserIdCallback?: setSelectedUserIdCallbackType
    avatar: string
    name: string
    buttonsData?: any
};