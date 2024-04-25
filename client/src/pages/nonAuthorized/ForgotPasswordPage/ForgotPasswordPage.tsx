import { useFormik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ColumnWrap } from "../../../components/layout/ColumnWrap/ColumnWrap";
import { Header } from "../../../components/layout/Headers/Header/Header";
import { PageHeader } from "../../../components/layout/Headers/PageHeader/PageHeader";
import { Plug } from "../../../components/layout/Plug/Plug";
import {
  CustomButton,
  CustomPasswordField,
} from "../../../components/ui/AuthFields/AuthFields";
import { useChangePasswordMutationQuery } from "../../../fullStore/combos/user/userQueries";
import {
  selectEncryptedEmail,
  setErrorMessage,
  setIsLoading,
} from "../../../fullStore/combos/user/userSlice";
import { useAppDispatch } from "../../../fullStore/hooks";
import { setIsEmailVerifiedCallbackType } from "../../../types/callbacks";
import { EmailVerifying } from "../../../components/logic/EmailVerifying/EmailVerifying";
import { forgotPasswordValidationSchema } from "./forgotPasswordValidationSchema";
import { useTranslation } from "react-i18next";
import { addDynamicResources } from "../../../i18n/i18n";

const initialValues: initialValuesType = {
  password: "",
  passwordConfirm: "",
};

const ForgotPasswordPage: FC<{}> = () => {
  const { t } = useTranslation("forgotPassword");

  useEffect(() => {
    addDynamicResources("forgotPassword");
  }, []);

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  let encryptedEmail = useSelector(selectEncryptedEmail);
  const [changePassword] = useChangePasswordMutationQuery();
  const navigate = useNavigate();

  const usualDispatch = useAppDispatch();

  const submitHandler = (values: initialValuesType) => {
    usualDispatch(setIsLoading(true));
    changePassword({
      encryptedEmail,
      password: values.password,
    })
      .unwrap()
      .then((fulfilled: { message: string }) => {
        alert(fulfilled.message);
        navigate("/");
      })
      .catch((e: any) => usualDispatch(setErrorMessage(e.data.message)));
    usualDispatch(setIsLoading(false));
  };

  const setIsEmailVerifiedCallback: setIsEmailVerifiedCallbackType = (
    isVerified,
  ) => {
    setIsEmailVerified((prev) => (prev = isVerified));
  };

  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: submitHandler,
  });

  const [dynamicResourcesLoaded, setDynamicResourcesLoaded] = useState(false);

  useEffect(() => {
    addDynamicResources("signUp").then(() => {
      setDynamicResourcesLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (dynamicResourcesLoaded) {
      formik.resetForm();
    }
  }, [dynamicResourcesLoaded]);

  return (
    <>
      {!isEmailVerified ? (
        <EmailVerifying
          setIsEmailVerifiedCallback={setIsEmailVerifiedCallback}
          t={t}
        />
      ) : (
        <ColumnWrap>
          <PageHeader isShowing={false}>
            <Header text={t("forgotPasHeader")} />
            <Plug />
          </PageHeader>
          <form onSubmit={formik.handleSubmit}>
            <CustomPasswordField
              formik={formik}
              name="password"
              label={t("newPasswordLabel")}
            />
            <CustomPasswordField
              formik={formik}
              name="passwordConfirm"
              label={t("confirmPasswordLabel")}
            />
            <CustomButton text={t("button")} />
          </form>
        </ColumnWrap>
      )}
    </>
  );
};

type initialValuesType = {
  password: string;
  passwordConfirm: string;
};

export default ForgotPasswordPage;
