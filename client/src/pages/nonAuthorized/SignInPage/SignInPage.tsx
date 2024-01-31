import { Box, FormControl, Link as MaterialLink, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import React, { useCallback, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ColumnWrap } from '../../../components/layout/ColumnWrap/ColumnWrap';
import { Header } from '../../../components/layout/Headers/Header/Header';
import { PageHeader } from '../../../components/layout/Headers/PageHeader/PageHeader';
import { Plug } from '../../../components/layout/Plug/Plug';
import { CustomButton, CustomCheckboxField, CustomEmailField, CustomPasswordField } from '../../../components/ui/AuthFields/AuthFields';
import { CustomStack, SmallGoldenRatioBox } from '../../../components/ui/customStyledComponents';
import { getIsAuthThunk, signInThunk } from '../../../fullStore/combos/user/userQueries';
import { setErrorMessage, setIsLoading } from '../../../fullStore/combos/user/userSlice';
import { useAppDispatch } from '../../../fullStore/hooks';
import useCustomDispatch from '../../../hooks/useCustomDispatch';
import { signInvalidationSchema } from './signInValidation';
import styles from "./SignInPage.less";

const initialValues: initialValuesType = {
    email: '',
    password: '',
    rememberMe: false
};

export const SignInPage = () => {

    const thunkDispatch = useCustomDispatch();

    const submitHandler = (values: initialValuesType) => {
        thunkDispatch(signInThunk(values));
    };

    const formik = useFormik({
        initialValues,
        validationSchema: signInvalidationSchema,
        onSubmit: submitHandler
    });

    useEffect(() => {
        thunkDispatch(getIsAuthThunk());
    }, []);

    const theme = useTheme();
    const isSmallSize = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <PageHeader isShowing={false}>
                <Typography
                    variant="h1"
                >{"Sign in"}
                </Typography>
                <Plug />
            </PageHeader>
            <SmallGoldenRatioBox
                sx={{
                    alignItems: "center"
                }}
            >
                <CustomStack
                    sx={{
                        flexDirection: "column",
                        padding: "0 15px",
                    }}
                >
                    <form
                        className={styles.form}
                        onSubmit={formik.handleSubmit}
                    >
                        <CustomEmailField
                            formik={formik}
                        />
                        <CustomPasswordField
                            sx={{
                                margin: "50px 0",
                            }}
                            formik={formik}
                            name="password"
                            label="Password"
                        />
                        <CustomCheckboxField
                            formik={formik}
                            name="rememberMe"
                            label="remember me" />
                        <CustomButton
                            sx={{
                                marginTop: "50px",
                            }}
                            text="Submit"
                        />
                    </form>
                    <Box
                        sx={{
                            textAlign: 'center',
                            marginTop: "20px",
                        }}
                    >
                        <MaterialLink
                            variant="body2"
                            component={RouterLink}
                            to="/forgotPassword"
                        >Forgot password?</MaterialLink>
                    </Box>
                    <Box
                        sx={{
                            margin: "20px 0",
                            textAlign: 'center',
                            display: 'flex',
                            justifyContent: "center",
                            alignItems: 'center',
                            flexDirection: () => isSmallSize ? "column" : "row"
                        }}
                    >
                        <Typography
                            variant="body2"
                        >
                            Don't have an account?
                        </Typography>
                        <MaterialLink
                            variant="body2"
                            component={RouterLink}
                            to="/signUp"
                        >
                            Sign up
                        </MaterialLink>
                    </Box>
                </CustomStack>
            </SmallGoldenRatioBox>
        </Box>
    )
};

type initialValuesType = {
    email: string,
    password: string,
    rememberMe: boolean
};