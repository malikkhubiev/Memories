import React, { FC, useState } from "react";
import { searchButtonHandlerType } from "../../../../types/common";
import { CustomSearchIcon } from "../../CustomIcons/CustomIcons";
import styles from "./SearchBar.module.less";

export const SearchBar: FC<{ searchHandler: searchButtonHandlerType }> = ({
  searchHandler,
}) => {
  let [searchValue, setSearchValue] = useState<string>("");

  const searchValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue((prev) => (prev = event.target.value));
    searchHandler(event.target.value);
  };

  return (
    <div className={styles.bar}>
      <input
        value={searchValue}
        onChange={searchValueHandler}
        placeholder="Search..."
        className={styles.input}
      />
      <div className={styles.icon}>
        <CustomSearchIcon />
      </div>
    </div>
  );
};
