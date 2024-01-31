import { useFormik } from 'formik';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ColumnWrap } from '../../../components/layout/ColumnWrap/ColumnWrap';
import { Header } from '../../../components/layout/Headers/Header/Header';
import { PageHeader } from '../../../components/layout/Headers/PageHeader/PageHeader';
import { Plug } from '../../../components/layout/Plug/Plug';
import { CustomButton, CustomPasswordField } from '../../../components/ui/AuthFields/AuthFields';
import { useChangePasswordMutationQuery } from '../../../fullStore/combos/user/userQueries';
import { selectEncryptedEmail, setErrorMessage, setIsLoading } from '../../../fullStore/combos/user/userSlice';
import { useAppDispatch } from '../../../fullStore/hooks';
import { setIsEmailVerifiedCallbackType } from '../../../types/callbacks';
import { EmailVerifyingPage } from '../EmailVerifyingPage/EmailVerifyingPage';
import { forgotPasswordValidationSchema } from './forgotPasswordValidationSchema';

const initialValues: initialValuesType = {
    password: '',
    passwordConfirm: ''
};

export const ForgotPasswordPage: FC<{}> = () => {

    const [isEmailVerified, setIsEmailVerified] = useState(false);
    let encryptedEmail = useSelector(selectEncryptedEmail);
    const [changePassword] = useChangePasswordMutationQuery();
    const navigate = useNavigate();

    const usualDispatch = useAppDispatch();

    const submitHandler = (values: initialValuesType) => {
        usualDispatch(setIsLoading(true));
        changePassword({
            encryptedEmail,
            password: values.password
        }).unwrap()
        .then((fulfilled: {message: string}) => {
            alert(fulfilled.message);
            navigate("/");
        })
        .catch((e:any) => usualDispatch(setErrorMessage(e.data.message)));
        usualDispatch(setIsLoading(false));
    };

    const setIsEmailVerifiedCallback: setIsEmailVerifiedCallbackType =
        (isVerified) => {
        setIsEmailVerified(prev => prev = isVerified);
    };

    const formik = useFormik({
        initialValues,
        validationSchema: forgotPasswordValidationSchema,
        onSubmit: submitHandler
    });

    return <>
        {
            !isEmailVerified ?
                <EmailVerifyingPage
                    setIsEmailVerifiedCallback={setIsEmailVerifiedCallback} />
                :
                <ColumnWrap>
                    <PageHeader isShowing={false}>
                        <Header text="Forgot password" />
                        <Plug />
                    </PageHeader>
                    <form onSubmit={formik.handleSubmit}>
                        <CustomPasswordField
                            formik={formik}
                            name="password"
                            label="New password" />
                        <CustomPasswordField
                            formik={formik}
                            name="passwordConfirm"
                            label="Confirm Password" />
                        <CustomButton text="Change password" />
                    </form>
                </ColumnWrap>
        }
    </>
};

type initialValuesType = {
    password: string,
    passwordConfirm: string
}