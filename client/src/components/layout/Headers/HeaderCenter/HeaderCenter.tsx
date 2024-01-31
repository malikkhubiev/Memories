import { Typography } from "@mui/material";
import React, { FC } from "react";
import { sortByToggleCallbackType } from "../../../../types/callbacks";
import { Sort } from "../../../ui/Buttons/Sort";
import styles from './HeaderCenter.module.less';

export const HeaderCenter: FC<HeaderCenterPropsType> = (
    { numberOf, isSortingByPopularity, sortByToggleCallback, children }) => {

    return (
        <div className={styles.headerCenter}>
            {children}
            <Typography variant="body2">{numberOf}</Typography>
            <Sort
                isSortingByPopularity={isSortingByPopularity}
                sortByToggleCallback={sortByToggleCallback}
            />
        </div>
    );
};

type HeaderCenterPropsType = {
    numberOf: string
    sortByToggleCallback: sortByToggleCallbackType
    isSortingByPopularity: boolean
    children: any
};