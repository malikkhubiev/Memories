import { Box, useMediaQuery, useTheme } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchButtonHandlerType, searchResultsType } from '../../../../types/common';
import { ColumnWrap } from '../../../layout/ColumnWrap/ColumnWrap';
import { CustomAvatar } from '../../CustomAvatar/CustomAvatar';
import { SmallGoldenRatioBox, TypographyWithEllipsis } from '../../customStyledComponents';
import { SearchBar } from '../SearchBar/SearchBar';
import styles from './SearchBarWithResults.module.less';

export const SearchBarWithResults: FC<SearchBarWithResultsPropsType> = ({
    searchHandler, searchResults
}) => {
    const [localSearchResults, setLocalSearchResults] = useState<searchResultsType>(searchResults);

    const blurHandler = () => {
        setLocalSearchResults(prev => prev = { results: [] });
    };

    useEffect(() => {
        setLocalSearchResults(prev => prev = searchResults);
    }, [searchResults]);

    const theme = useTheme();
    const isSmallSize = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <SmallGoldenRatioBox
            sx={{
                position: "relative",
            }}
            onBlur={blurHandler}
        >
            <ColumnWrap removePadding={true}>
                <SearchBar searchHandler={searchHandler} />
                {
                    localSearchResults.results.length !== 0 &&
                    <Box
                        sx={{
                            top: "100%",
                            width: "100%",
                            maxHeight: "90vh",
                            overflow: "scroll",
                            position: "absolute",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            flexDirection: "column",
                            padding: () => isSmallSize ? "50px 15px" : "50px"
                        }}
                    >
                        {localSearchResults.results.map(
                            (searchResult: any) =>
                                <Link
                                    key={searchResult.name}
                                    className={styles.link}
                                    to={
                                        localSearchResults.type === "tag" ?
                                            `/tags/:${searchResult.id}/:${searchResult.name}` :
                                            `/profile:${searchResult.id}`
                                    }
                                >
                                    {
                                        localSearchResults.type !== "tag" ?
                                            <CustomAvatar
                                                src={searchResult.avatar}
                                                width={55}
                                            /> : ""
                                    }
                                    <Box
                                        sx={{
                                            maxWidth: "75%",
                                            marginLeft: "10px",
                                        }}
                                    >
                                        <TypographyWithEllipsis>
                                            {
                                                localSearchResults.type === "tag" ?
                                                    `#${searchResult.name}` : searchResult.name
                                            }
                                        </TypographyWithEllipsis>
                                    </Box>
                                </Link>
                        )}
                    </Box>
                }
            </ColumnWrap>
        </SmallGoldenRatioBox>
    )
};

type SearchBarWithResultsPropsType = {
    searchHandler: searchButtonHandlerType
    searchResults: searchResultsType
};