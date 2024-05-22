import {
  Box,
  Link as MaterialLink,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { PageHeader } from "../../../components/layout/Headers/PageHeader/PageHeader";
import { Plug } from "../../../components/layout/Plug/Plug";
import {
  CustomButton,
  CustomCheckboxField,
  CustomEmailField,
  CustomNameField,
  CustomPasswordField,
} from "../../../components/ui/AuthFields/AuthFields";
import {
  CustomStack,
  SmallGoldenRatioBox,
} from "../../../components/ui/customStyledComponents";
import {
  getIsAuthThunk,
  signInThunk,
} from "../../../fullStore/combos/user/userQueries";
import useCustomDispatch from "../../../hooks/useCustomDispatch";
import { signInvalidationSchema } from "./signInValidation";

import { useTranslation } from "react-i18next";
import { addDynamicResources } from "../../../i18n/i18n";
import styles from "./SignInPageStyle";
import { LangPropsContext } from "../../../components/layout/Navigation/Navigation";

const initialValues: initialValuesType = {
  email: "",
  name: "",
  password: "",
  rememberMe: false,
};

const SignInPage = () => {
  const { t } = useTranslation("signIn");
  const thunkDispatch = useCustomDispatch();

  // @ts-ignore
  const submitHandler = (values) => {
    thunkDispatch(signInThunk(values));
  };

  const formik = useFormik({
    initialValues,
    validationSchema: signInvalidationSchema,
    onSubmit: submitHandler,
  });

  useEffect(() => {
    thunkDispatch(getIsAuthThunk());
  }, []);

  const { language } = useContext(LangPropsContext);

  useEffect(() => {
    addDynamicResources("signIn").then(() => {
      formik.resetForm();
    });
  }, [language]);

  const theme = useTheme();
  const linkStyle = styles.link(theme)
  const isSmallSize = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={styles.container}>
      <SmallGoldenRatioBox sx={styles.goldenRatBox}>
        <CustomStack sx={styles.column}>
          <Typography variant="h1">{t("header")}</Typography>
          <form style={styles.form} onSubmit={formik.handleSubmit}>
            <CustomEmailField formik={formik} label={t("email")} />
            <CustomNameField
              formik={formik}
              label={t("name")}
            />
            <CustomPasswordField
              sx={styles.password}
              formik={formik}
              name="password"
              label={t("passwordFieldLabel")}
            />
            <CustomCheckboxField
              formik={formik}
              name="rememberMe"
              label={t("rememberMe")}
            />
            <CustomButton sx={styles.button} text={t("submit")} />
          </form>
          <Box sx={styles.box}>
            <MaterialLink
              sx={linkStyle}
              variant="body2"
              component={RouterLink}
              to="/forgotPassword"
            >
              {t("forgotPassword")}
            </MaterialLink>
          </Box>
          <Box sx={styles.redirect(isSmallSize)}>
            <Typography variant="body2">{t("haveAccount")}</Typography>
            <MaterialLink sx={linkStyle} variant="body2" component={RouterLink} to="/signUp">
              {'\u00A0'}{t("signUp")}
            </MaterialLink>
          </Box>
        </CustomStack>
      </SmallGoldenRatioBox>
    </Box>
  );
};

type initialValuesType = {
  email: string;
  name: string;
  password: string;
  rememberMe: boolean;
};

export default SignInPage;
