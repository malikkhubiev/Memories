import { Link as MaterialLink, Typography, useMediaQuery, useTheme, Box } from '@mui/material';
import { useFormik } from 'formik';
import React, { FC, memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ColumnWrap } from '../../../components/layout/ColumnWrap/ColumnWrap';
import { Header } from '../../../components/layout/Headers/Header/Header';
import { PageHeader } from '../../../components/layout/Headers/PageHeader/PageHeader';
import { Plug } from '../../../components/layout/Plug/Plug';
import { CustomButton, CustomNameField, CustomPasswordField } from '../../../components/ui/AuthFields/AuthFields';
import { useSignUpMutationQuery } from '../../../fullStore/combos/user/userQueries';
import { selectEncryptedEmail, setErrorMessage, setIsLoading } from '../../../fullStore/combos/user/userSlice';
import { useAppDispatch } from '../../../fullStore/hooks';
import { setIsEmailVerifiedCallbackType } from '../../../types/callbacks';
import { EmailVerifyingPage } from '../EmailVerifyingPage/EmailVerifyingPage';
import { signUpvalidationSchema } from './signUpValidation';
import { CustomStack, SmallGoldenRatioBox } from '../../../components/ui/customStyledComponents';

const initialValues: initialValuesType = {
    name: '',
    password: '',
    passwordConfirm: ''
};

export const SignUpPage: FC<{}> = () => {

    const [isEmailVerified, setIsEmailVerified] = useState(false); // Костыль
    const [signUp] = useSignUpMutationQuery();
    let encryptedEmail = useSelector(selectEncryptedEmail);
    const navigate = useNavigate();

    const usualDispatch = useAppDispatch();

    const submitHandler = useCallback((values: initialValuesType) => {
        usualDispatch(setIsLoading(true));
        signUp({
            encryptedEmail,
            name: values.name,
            password: values.password
        }).unwrap()
            .then((fulfilled: { message: string }) => {
                alert(fulfilled.message);
                navigate("/");
            })
            .catch((e: any) => usualDispatch(setErrorMessage(e.data.message)));
        usualDispatch(setIsLoading(false));
    }, [encryptedEmail]);

    const setIsEmailVerifiedCallback: setIsEmailVerifiedCallbackType =
        (isVerified) => {
            setIsEmailVerified(prev => prev = isVerified);
        };

    const formik = useFormik({
        initialValues,
        validationSchema: signUpvalidationSchema,
        onSubmit: submitHandler
    });

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
                <Header text="Sign up" />
                <Plug />
            </PageHeader>

            <SmallGoldenRatioBox
                sx={{
                    alignItems: "center"
                }}
            >
                {
                    !isEmailVerified ?
                        <EmailVerifyingPage
                            setIsEmailVerifiedCallback={setIsEmailVerifiedCallback}
                            removeBackArrow={true}
                        />
                        :
                        <CustomStack
                            sx={{
                                flexDirection: "column",
                                padding: "0 15px",
                            }}
                        >
                            <form onSubmit={formik.handleSubmit}>
                                <CustomNameField
                                    formik={formik}
                                />
                                <CustomPasswordField
                                    formik={formik}
                                    name="password"
                                    label="Password"
                                    sx={{
                                        margin: "50px 0",
                                    }}
                                />
                                <CustomPasswordField
                                    formik={formik}
                                    name="passwordConfirm"
                                    label="Confirm Password"
                                />
                                <CustomButton
                                    sx={{
                                        marginTop: "50px",
                                    }}
                                    text="Submit"
                                />
                            </form>
                            <Box
                                sx={{
                                    marginTop: "20px",
                                    textAlign: 'center',
                                }}
                            >
                                <Typography variant="body2">
                                    By pressing Submit, you agree to the
                                    <MaterialLink
                                        component={RouterLink}
                                        to="/signIn">Terms of Service
                                    </MaterialLink>
                                    and
                                    <MaterialLink
                                        component={RouterLink}
                                        to="/signIn">Privacy Policy
                                    </MaterialLink>
                                </Typography>
                            </Box>
                        </CustomStack>
                }
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
                        Already have an account?
                    </Typography>
                    <MaterialLink
                        variant="body2"
                        component={RouterLink}
                        to="/signIn"
                    >
                        Sign in
                    </MaterialLink>
                </Box>
            </SmallGoldenRatioBox>
        </Box>
    )
};

type initialValuesType = {
    name: string
    password: string,
    passwordConfirm: string
};