import {
  CircularProgress,
  Container,
  CssBaseline,
  Snackbar,
  ThemeProvider,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import { Navigation } from "../components/layout/Navigation/Navigation";
import { CustomAlert } from "../components/ui/CustomAlert/CustomAlert";
import { selectOwnImagesErrorMessage } from "../fullStore/combos/images/imagesSlice";
import { addProfileThunk } from "../fullStore/combos/profile/profileQueries";
import {
  selectProfilesErrorMessage,
  setProfilesErrorMessage,
} from "../fullStore/combos/profile/profilesSlice";
import {
  selectErrorMessage,
  selectId,
  selectIsAuth,
  selectIsLoading,
  setErrorMessage,
} from "../fullStore/combos/user/userSlice";
import { useAppDispatch, useAppSelector } from "../fullStore/hooks";
import { RootState } from "../fullStore/rootStore";
import useCustomDispatch from "../hooks/useCustomDispatch";
import i18n, { addDynamicResources } from "../i18n/i18n";
import styles from "./App.module.less";
import { authorizedRoutes, customRoutes, nonAuthorizedRoutes } from "./routes";
import { lightTheme, darkTheme } from "../theme/theme";

export const App: FC<{}> = () => {
  const { t } = useTranslation("authorized");
  useEffect(() => {
    addDynamicResources("authorized");
  }, []);

  // selectors about errors and loading
  let isLoading = useAppSelector((state: RootState) => selectIsLoading(state));
  let errorMessage = useAppSelector((state: RootState) =>
    selectErrorMessage(state),
  );
  console.log(errorMessage);
  let profilesErrorMessage = useAppSelector((state: RootState) =>
    selectProfilesErrorMessage(state),
  );
  let ownImagesErrorMessage = useAppSelector((state: RootState) =>
    selectOwnImagesErrorMessage(state),
  );

  // selectors about auth
  let isAuth = useAppSelector((state: RootState) => selectIsAuth(state));
  const id = useAppSelector((state: RootState) => selectId(state));

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const usualDispatch = useAppDispatch();
  const thunkDispatch = useCustomDispatch();

  // getting user's data
  useEffect(() => {
    if (isAuth) {
      thunkDispatch(addProfileThunk(id));
    }
  }, [isAuth]);

  // error handling
  const commonErrorMessageHandler = (message: string) => {
    usualDispatch(setErrorMessage(message));
    setTimeout(() => {
      usualDispatch(setProfilesErrorMessage(""));
    }, 3000);
  };

  useEffect(() => {
    if (profilesErrorMessage) {
      commonErrorMessageHandler(profilesErrorMessage);
    } else if (ownImagesErrorMessage) {
      commonErrorMessageHandler(ownImagesErrorMessage);
    }
  }, [profilesErrorMessage, ownImagesErrorMessage]);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        usualDispatch(setErrorMessage(""));
      }, 3000);
    }
  }, [errorMessage]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline>
        <div className={`styles.app ${isLoading && styles.overflow}`}>
          {/* loading */}
          {isLoading ? (
            <div className={styles.loading}>
              <CircularProgress size={100} />
            </div>
          ) : (
            ""
          )}

          {/* error message */}
          {errorMessage && <CustomAlert message={errorMessage} />}
          <I18nextProvider i18n={i18n}>
            <Routes>
              {isAuth ? (
                <Route
                  path="/"
                  element={
                    <Navigation
                      isDarkMode={isDarkMode}
                      toggleDarkMode={toggleDarkMode}
                    />
                  }
                >
                  {authorizedRoutes.map((route: any) =>
                    customRoutes(route, styles),
                  )}
                </Route>
              ) : (
                <Route path="/">
                  {nonAuthorizedRoutes.map((route) =>
                    customRoutes(route, styles),
                  )}
                </Route>
              )}
            </Routes>
          </I18nextProvider>
        </div>
      </CssBaseline>
    </ThemeProvider>
  );
};
