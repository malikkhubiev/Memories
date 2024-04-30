import React, { FC, useEffect, useState } from "react";
import { searchButtonHandlerType } from "../../../../types/common";
import { CustomIcon } from "../../CustomIcons/CustomIcons";
import styles from "./SearchBarStyle";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { addDynamicResources } from "../../../../i18n/i18n";

export const SearchBar: FC<{ searchHandler: searchButtonHandlerType }> = ({
  searchHandler,
}) => {
  let [searchValue, setSearchValue] = useState<string>("");
  const { t } = useTranslation("authorized");
  useEffect(() => {
    addDynamicResources("authorized");
  }, []);

  const theme = useTheme();

  const searchValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setSearchValue((prev) => (prev = val));
    if (val.trim() !== "") searchHandler(val);
  };

  return (
    <div style={styles.bar}>
      <input
        value={searchValue}
        onChange={searchValueHandler}
        placeholder={t("search_placeholder") + "..."}
        style={{
          ...styles.input,
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
          borderColor: theme.palette.mode === "dark" ? "#fff" : "#000",
        }}
      />
      <CustomIcon type="search" />
    </div>
  );
};
