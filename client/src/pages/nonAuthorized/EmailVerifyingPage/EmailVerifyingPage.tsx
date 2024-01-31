import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ColumnWrap } from '../../../components/layout/ColumnWrap/ColumnWrap';
import { Header } from '../../../components/layout/Headers/Header/Header';
import { PageHeader } from '../../../components/layout/Headers/PageHeader/PageHeader';
import { Plug } from '../../../components/layout/Plug/Plug';
import { AddInput } from '../../../components/ui/Inputs/AddInput/AddInput';
import { compareCodeThunk, useCheckingEmail } from '../../../fullStore/combos/user/userQueries';
import { setErrorMessage, setIsLoading } from '../../../fullStore/combos/user/userSlice';
import { useAppDispatch } from '../../../fullStore/hooks';
import useCustomDispatch from '../../../hooks/useCustomDispatch';
import { setIsEmailVerifiedCallbackType } from '../../../types/callbacks';
import { CustomStack, SmallGoldenRatioBox } from '../../../components/ui/customStyledComponents';
import { Box } from '@mui/material';

export const EmailVerifyingPage: FC<EmailVerifyingPagePropsType> =
    ({ setIsEmailVerifiedCallback, removeBackArrow }) => {

        let [hasEmailBeenSent, setHasEmailBeenSent] = useState<boolean>(false);
        let [email, setEmail] = useState<string>("");
        const process = useLocation().pathname.slice(1) === "signUp" ? "sign up" : "forgot password";

        const [sendEmail] = useCheckingEmail();
        const usualDispatch = useAppDispatch();
        const thunkDispatch = useCustomDispatch();

        const sendButtonHandler = (text: string) => {
            setEmail(prev => prev = text);
            usualDispatch(setIsLoading(true));
            sendEmail({
                email: text,
                process
            }).unwrap()
                .then((fulfilled: { message: string }) => {
                    alert(fulfilled.message);
                    setHasEmailBeenSent(true);
                })
                .catch((e: any) => usualDispatch(
                    setErrorMessage(e.data.message)
                ));
            usualDispatch(setIsLoading(false));
        };

        const verifyButtonHandler = (text: string) => {
            const resolveCallback = () => setIsEmailVerifiedCallback(true);
            thunkDispatch(compareCodeThunk({ email, code: text }), resolveCallback);
        };

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
                {
                    removeBackArrow ?
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Header
                                sx={{
                                    textAlign: 'center'
                                }}
                                text="Email validation"
                            />
                        </Box>
                        :
                        <PageHeader isShowing={false}>
                            <Header
                                sx={{
                                    textAlign: 'center'
                                }}
                                text="Email validation"
                            />
                            <Plug />
                        </PageHeader>
                }
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
                        <AddInput
                            text=""
                            buttonText="Send"
                            label="Email"
                            addInputCallback={sendButtonHandler}
                        />
                        {
                            hasEmailBeenSent ?
                                <AddInput
                                    sx={{
                                        marginTop: "20px"
                                    }}
                                    text=""
                                    buttonText="Verify"
                                    label="Verification code"
                                    addInputCallback={verifyButtonHandler}
                                /> : ""
                        }
                    </CustomStack>
                </SmallGoldenRatioBox>
            </Box>
        )
    };

type EmailVerifyingPagePropsType = {
    setIsEmailVerifiedCallback: setIsEmailVerifiedCallbackType
    removeBackArrow?: true
};