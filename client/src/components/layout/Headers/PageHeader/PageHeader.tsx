import React, { FC, ReactElement, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { onArrowBackClickCallbackType } from "../../../../types/callbacks";
import { CustomIcon } from "../../../ui/CustomIcons/CustomIcons";
import { CustomStack } from "../../../ui/customStyledComponents";
import { Plug } from "../../Plug/Plug";
import styles from "./PageHeader.module.less";

export const PageHeader: FC<PageHeaderType> = ({
  children,
  onArrowBackClickCallback,
  isShowing,
}) => {
  let [isFixedHeader, setIsFixedHeader] = useState<boolean>(false);
  let [isVisibleHeader, setIsVisibleHeader] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  // showing header on top scroll
  let lastScroll = 0;
  useEffect(() => {
    if (isShowing === false) return;
    window.onscroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === 0)
        return setIsFixedHeader((prev) => (prev = false));
      else setIsFixedHeader((prev) => (prev = true));
      if (currentScrollY > lastScroll) {
        setIsVisibleHeader((prev) => (prev = false));
      } else {
        setIsVisibleHeader((prev) => (prev = true));
      }
      lastScroll = currentScrollY;
    };
  }, []);

  const arrowBackClickHandler = () => {
    if (onArrowBackClickCallback) onArrowBackClickCallback();
    else navigate(-1);
  };

  return (
    <div
      className={`
        ${styles.pageHeader}
        ${isFixedHeader ? styles.fixedPageHeader : ""}
        ${isVisibleHeader ? styles.visibleHeader : ""}
        `}
    >
      <CustomStack
        sx={{
          width: "100%",
          padding: {
            md: "25px 45px",
            xs: "25px",
          },
        }}
      >
        {location.pathname === "/" ? (
          <Plug />
        ) : (
          <div className={styles.back} onClick={arrowBackClickHandler}>
            <CustomIcon type="arrow_back" />
          </div>
        )}
        {children}
      </CustomStack>
    </div>
  );
};

type PageHeaderType = {
  children: ReactElement | ReactElement[];
  isShowing?: false;
  onArrowBackClickCallback?: onArrowBackClickCallbackType;
};
