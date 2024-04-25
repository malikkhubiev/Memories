import {
  Link as MaterialLink,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ColumnWrap } from "../../../components/layout/ColumnWrap/ColumnWrap";
import { Header } from "../../../components/layout/Headers/Header/Header";
import { PageHeader } from "../../../components/layout/Headers/PageHeader/PageHeader";
import { Plug } from "../../../components/layout/Plug/Plug";
import {
  CustomButton,
  CustomNameField,
  CustomPasswordField,
} from "../../../components/ui/AuthFields/AuthFields";
import { useSignUpMutationQuery } from "../../../fullStore/combos/user/userQueries";
import {
  selectEncryptedEmail,
  setErrorMessage,
  setIsLoading,
} from "../../../fullStore/combos/user/userSlice";
import { useAppDispatch } from "../../../fullStore/hooks";
import { setIsEmailVerifiedCallbackType } from "../../../types/callbacks";
import { EmailVerifying } from "../../../components/logic/EmailVerifying/EmailVerifying";
import { signUpvalidationSchema } from "./signUpValidation";
import {
  CustomStack,
  SmallGoldenRatioBox,
} from "../../../components/ui/customStyledComponents";
import { useTranslation } from "react-i18next";
import { addDynamicResources } from "../../../i18n/i18n";
import styles from "./SignUpPageStyle";

const initialValues: initialValuesType = {
  name: "",
  password: "",
  passwordConfirm: "",
};

export const SignUpPage: FC<{}> = () => {
  const [isEmailVerified, setIsEmailVerified] = useState(false); // Костыль
  const [signUp] = useSignUpMutationQuery();
  let encryptedEmail = useSelector(selectEncryptedEmail);
  const navigate = useNavigate();

  const { t } = useTranslation("signUp");
  const [dynamicResourcesLoaded, setDynamicResourcesLoaded] = useState(false);

  useEffect(() => {
    addDynamicResources("signUp").then(() => {
      setDynamicResourcesLoaded(true);
    });
  }, []);

  const usualDispatch = useAppDispatch();

  const submitHandler = useCallback(
    (values: initialValuesType) => {
      usualDispatch(setIsLoading(true));
      signUp({
        encryptedEmail,
        name: values.name,
        password: values.password,
      })
        .unwrap()
        .then((fulfilled: { message: string }) => {
          alert(fulfilled.message);
          navigate("/");
        })
        .catch((e: any) => usualDispatch(setErrorMessage(e.data.message)));
      usualDispatch(setIsLoading(false));
    },
    [encryptedEmail],
  );

  const setIsEmailVerifiedCallback: setIsEmailVerifiedCallbackType = (
    isVerified,
  ) => {
    setIsEmailVerified((prev) => (prev = isVerified));
  };

  const formik = useFormik({
    initialValues,
    validationSchema: signUpvalidationSchema,
    onSubmit: submitHandler,
  });

  const theme = useTheme();
  const isSmallSize = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (dynamicResourcesLoaded) {
      formik.resetForm();
    }
  }, [dynamicResourcesLoaded]);

  return (
    <Box sx={styles.container}>
      <PageHeader isShowing={false}>
        <Header text={t("signUpHeader")} />
        <Plug />
      </PageHeader>

      <SmallGoldenRatioBox sx={styles.goldenRatBox}>
        {!isEmailVerified ? (
          <EmailVerifying
            setIsEmailVerifiedCallback={setIsEmailVerifiedCallback}
            removeBackArrow={true}
            t={t}
          />
        ) : (
          <CustomStack sx={styles.stack}>
            <form onSubmit={formik.handleSubmit}>
              <CustomNameField formik={formik} />
              <CustomPasswordField
                formik={formik}
                name="password"
                label={t("password")}
                sx={styles.password}
              />
              <CustomPasswordField
                formik={formik}
                name="passwordConfirm"
                label={t("confirmPassword")}
              />
              <CustomButton sx={styles.button} text={t("next")} />
            </form>
            <Box sx={styles.terms}>
              <Typography variant="body2">
                {t("terms1")}
                <MaterialLink component={RouterLink} to="/signIn">
                  {t("terms2")}
                </MaterialLink>
                {t("terms3")}
                <MaterialLink component={RouterLink} to="/signIn">
                  {t("terms4")}
                </MaterialLink>
              </Typography>
            </Box>
          </CustomStack>
        )}
        <Box sx={styles.redirect(isSmallSize)}>
          <Typography variant="body2">{t("alreadyAccount")}</Typography>
          <MaterialLink variant="body2" component={RouterLink} to="/signIn">
            {t("signIn")}
          </MaterialLink>
        </Box>
      </SmallGoldenRatioBox>
    </Box>
  );
};

type initialValuesType = {
  name: string;
  password: string;
  passwordConfirm: string;
};

export default SignUpPage;
