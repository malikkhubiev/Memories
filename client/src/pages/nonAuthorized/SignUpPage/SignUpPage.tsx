import {
  Link as MaterialLink,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import React, { FC, memo, useCallback, useContext, useEffect, useState } from "react";
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
import { speedSignUpThunk, useSignUpMutationQuery } from "../../../fullStore/combos/user/userQueries";
import {
  selectEncryptedEmail,
  selectSpeedName,
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
import useCustomDispatch from "../../../hooks/useCustomDispatch";
import { LangPropsContext } from "../../../components/layout/Navigation/Navigation";

const initialValues: initialValuesType = {
  name: "",
  password: "",
  passwordConfirm: "",
};

export const SignUpPage: FC<{}> = () => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSpeedSignUp, setIsSpeedSignUp] = useState(false);
  const [signUp] = useSignUpMutationQuery();
  let encryptedEmail = useSelector(selectEncryptedEmail);
  let speedName = useSelector(selectSpeedName);
  const navigate = useNavigate();

  const { t } = useTranslation("signUp");

  const { language } = useContext(LangPropsContext);

  useEffect(() => {
    addDynamicResources("signUp").then(() => {
      formik.resetForm();
    });
  }, [language]);

  const usualDispatch = useAppDispatch();
  const thunkDispatch = useCustomDispatch();

  const submitHandler = useCallback(
    (values: initialValuesType) => {
      usualDispatch(setIsLoading(true));
      signUp({
        encryptedEmail,
        name: isSpeedSignUp ? values.name+speedName : values.name,
        password: values.password,
      })
        .unwrap()
        .then((fulfilled: { message: string }) => {
          alert(fulfilled.message);
          if (isSpeedSignUp) {
            alert("Your email is 1@mail.ru")
          };
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
  const linkStyle = styles.link(theme);
  const isSmallSize = useMediaQuery(theme.breakpoints.down("sm"));

  const speedSignUp = () => {
    setIsSpeedSignUp(prev => prev = true);
    thunkDispatch(
      speedSignUpThunk(),
      () => setIsEmailVerified((prev) => (prev = true))
    )
  };

  return (
    <Box sx={styles.container}>
      <Header text={t("signUpHeader")} />
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
              <CustomNameField
                formik={formik}
                label={t("name")}
              />
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
                {"\u00A0"}
                <MaterialLink
                  sx={linkStyle}
                  component={RouterLink}
                  to="/signIn"
                >
                  {t("terms2")}
                  {"\u00A0"}
                </MaterialLink>
                {t("terms3")}
                {"\u00A0"}
                <MaterialLink
                  sx={linkStyle}
                  component={RouterLink}
                  to="/signIn"
                >
                  {t("terms4")}
                </MaterialLink>
              </Typography>
            </Box>
          </CustomStack>
        )}
        <Box sx={styles.redirect(isSmallSize)}>
          <Typography variant="body2">{t("alreadyAccount")}</Typography>
          <MaterialLink
            sx={linkStyle}
            variant="body2"
            component={RouterLink}
            to="/signIn"
          >
            {"\u00A0"}
            {t("signIn")}
          </MaterialLink>
        </Box>
        {
          !isSpeedSignUp &&
          <Box sx={styles.testAccount}>
            <Typography variant="body2">{t("testAccountAnnounce")}</Typography>
            <Button onClick={speedSignUp}>{t("testAccountButton")}</Button>
          </Box>
        }
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
