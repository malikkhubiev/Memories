import React, { FC } from "react";
import { sortByToggleCallbackType } from "../../../../types/callbacks";
import { CustomIcon } from "../../CustomIcons/CustomIcons";
import styles from "./SortStyle"

export const Sort: FC<SortPropsType> = ({
  isSortingByPopularity,
  sortByToggleCallback,
}) => {
  const handler = () => {
    let sortBy: "date" | "popularity" = isSortingByPopularity
      ? "date"
      : "popularity";
    sortByToggleCallback(sortBy);
  };

  return (
    <div onClick={handler}>
      {isSortingByPopularity ? (
        <div title="Sort images by date">
          <CustomIcon
            type="star"
            extra={styles.extra}
          />
        </div>
      ) : (
        <div title="Sort images by popularity">
          <CustomIcon
            type="date"
            extra={styles.extra}
          />
        </div>
      )}
    </div>
  );
};

type SortPropsType = {
  isSortingByPopularity: boolean;
  sortByToggleCallback: sortByToggleCallbackType;
};
