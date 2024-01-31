import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const CustomStack = styled(Stack)(({ theme }) => ({
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
}));

export const SmallGreyText = styled(Typography)(({ theme }) => ({
    fontSize: 20,
    color: theme.palette.grey.main,
}));

export const TypographyWithEllipsis = styled(Typography)(({ theme }) => ({
    fontSize: 25,
    fontWeight: "normal",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
}));

export const ThreeLineTypographyWithEllipsis = styled(Typography)(({ theme }) => ({
    fontSize: 25,
    fontWeight: "normal",
    display: "-webkit-box",
    WebkitLineClamp: "3",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "100%"
}));

export const SmallGoldenRatioBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    [theme.breakpoints.up('xs')]: {
        width: "100vw",
    },
    [theme.breakpoints.up('sm')]: {
        width: "61.80469715698393vw",
    },
    [theme.breakpoints.up('lg')]: {
        width: "38.19820590666498vw",
    },
}));

export const BigGoldenRatioBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: "start",
    alignItems: "flex-start",
    [theme.breakpoints.down('md')]: {
        width: "100vw",
    },
    [theme.breakpoints.up('lg')]: {
        width: "61.80469715698393vw",
    },
}));