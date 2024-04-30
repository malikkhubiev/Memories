import React, { FC, useState } from "react";
import { searchButtonHandlerType } from "../../../../types/common";
import { CustomIcon } from "../../CustomIcons/CustomIcons";
import styles from "./SearchBarStyle";
import { useTheme } from "@mui/material";

export const SearchBar: FC<{ searchHandler: searchButtonHandlerType }> = ({
  searchHandler,
}) => {
  let [searchValue, setSearchValue] = useState<string>("");

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
        placeholder="Search..."
        style={{  
          ...styles.input,
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
          borderColor: theme.palette.mode === "dark"? "#fff" : "#000"
        }}
      />
      <CustomIcon type="search" />
    </div>
  );
};
