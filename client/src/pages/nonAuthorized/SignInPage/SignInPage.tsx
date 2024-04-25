import {
  Box,
  Link as MaterialLink,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { PageHeader } from "../../../components/layout/Headers/PageHeader/PageHeader";
import { Plug } from "../../../components/layout/Plug/Plug";
import {
  CustomButton,
  CustomCheckboxField,
  CustomEmailField,
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

const initialValues: initialValuesType = {
  email: "",
  password: "",
  rememberMe: false,
};

const SignInPage = () => {
  const { t } = useTranslation("signIn");
  const thunkDispatch = useCustomDispatch();
  const [dynamicResourcesLoaded, setDynamicResourcesLoaded] = useState(false);

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
    addDynamicResources("signIn").then(() => {
      setDynamicResourcesLoaded(true);
    });
  }, []);

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
        <Typography variant="h1">{t("header")}</Typography>
        <Plug />
      </PageHeader>
      <SmallGoldenRatioBox sx={styles.goldenRatBox}>
        <CustomStack sx={styles.column}>
          <form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
            <CustomEmailField formik={formik} label={t("email")} />
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
              variant="body2"
              component={RouterLink}
              to="/forgotPassword"
            >
              {t("forgotPassword")}
            </MaterialLink>
          </Box>
          <Box sx={styles.redirect(isSmallSize)}>
            <Typography variant="body2">{t("haveAccount")}</Typography>
            <MaterialLink variant="body2" component={RouterLink} to="/signUp">
              {t("signUp")}
            </MaterialLink>
          </Box>
        </CustomStack>
      </SmallGoldenRatioBox>
    </Box>
  );
};

type initialValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default SignInPage;