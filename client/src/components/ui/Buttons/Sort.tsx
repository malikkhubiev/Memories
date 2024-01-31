import React, { FC } from "react";
import { sortByToggleCallbackType } from "../../../types/callbacks";
import { CustomDateIcon, CustomStarIcon } from "../CustomIcons/CustomIcons";

export const Sort: FC<SortPropsType> = ({ isSortingByPopularity, sortByToggleCallback }) => {

    const handler = () => {
        let sortBy: "date" | "popularity" = isSortingByPopularity ? "date" : "popularity";
        sortByToggleCallback(sortBy);
    };

    return <div onClick={handler}>
        {
            isSortingByPopularity ?
                <div
                    title="Sort images by date"
                >
                    <CustomStarIcon
                        width={`${35}`}
                    />
                </div>
                :
                <div
                    title="Sort images by popularity"
                >
                    <CustomDateIcon
                        width={`${35}`}
                    />
                </div>
        }
    </div>
};

type SortPropsType = {
    isSortingByPopularity: boolean
    sortByToggleCallback: sortByToggleCallbackType
};