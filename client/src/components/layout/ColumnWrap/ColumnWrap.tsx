import React, { FC, ReactElement } from "react";
import styles from "./ColumnWrap.module.less";
export const ColumnWrap: FC<ColumnWrap> = ({ children, removePadding }) => (
  <div
    className={`

    ${styles.page}
    ${removePadding ? styles.removedPadding : null}`}
  >
    {children}
  </div>
);

type ColumnWrap = {
  children: ReactElement | ReactElement[];
  removePadding?: true;
};
