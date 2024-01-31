import { Box } from '@mui/material';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { selectAvatar, selectId } from '../../../fullStore/combos/user/userSlice';
import { useAppSelector } from '../../../fullStore/hooks';
import { RootState } from '../../../fullStore/rootStore';
import useUser from '../../../hooks/useUser';
import { Avatar } from '../../ui/Buttons/Avatar/Avatar';
import { CustomAvatar } from '../../ui/CustomAvatar/CustomAvatar';
import { CustomAddIcon, CustomHomeIcon, CustomListIcon, CustomSearchIcon, CustomSendIcon } from '../../ui/CustomIcons/CustomIcons';
import { CustomStack } from '../../ui/customStyledComponents';
import styles from './Navigation.module.less';

export const FullNavigation: FC<{ children: any }> = ({ children }) => {
    return (
        <div className={styles.fullNavigation}>
            <CustomStack
                sx={{
                    padding: {
                        md: "25px 45px",
                        xs: "25px",
                    }
                }}
            >
                <Link to="search">
                    <CustomSearchIcon />
                </Link>
                <Link to="chats">
                    <CustomSendIcon />
                </Link>
            </CustomStack>
            <BottomNavigation />
            {children}
        </div>
    );
};

export const BottomNavigation: FC<{ children?: any }> = ({ children }) => {

    const id = useAppSelector((state: RootState) => selectId(state));
    const avatar = useAppSelector((state: RootState) => selectAvatar(state));

    return <>
        <div className={styles.bottomNavigation}>
            <CustomStack
                sx={{
                    padding: {
                        md: "25px 45px",
                        xs: "15px 25px",
                    }
                }}
            >
                <Link to="">
                    <CustomHomeIcon />
                </Link>
                <Link to="posting">
                    <CustomAddIcon />
                </Link>
                <Link to="requests">
                    <CustomListIcon />
                </Link>
                <Link to={`profile:${id}`}>
                    <CustomAvatar width={50} src={avatar} />
                </Link>
            </CustomStack>
        </div>
        {children}
    </>
};