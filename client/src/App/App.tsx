import { Alert, CircularProgress, Snackbar } from "@mui/material";
import React, { FC, useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { BottomNavigation, FullNavigation } from "../components/layout/Navigation/Navigation";
import { selectOwnImagesErrorMessage } from "../fullStore/combos/images/imagesSlice";
import { addProfileThunk } from "../fullStore/combos/profile/profileQueries";
import { selectProfilesErrorMessage, setProfilesErrorMessage } from "../fullStore/combos/profile/profilesSlice";
import { selectErrorMessage, selectId, selectIsAuth, selectIsLoading, setErrorMessage } from "../fullStore/combos/user/userSlice";
import { useAppDispatch, useAppSelector } from "../fullStore/hooks";
import { RootState } from "../fullStore/rootStore";
import useCustomDispatch from "../hooks/useCustomDispatch";
import { ChatsPage } from "../pages/authorized/ChatsPage/ChatsPage";
import { HomePage } from "../pages/authorized/HomePage/HomePage";
import { PostingPage } from "../pages/authorized/PostingPage/PostingPage";
import { PostPage } from "../pages/authorized/PostPage/PostPage";
import { PreferencesPage } from "../pages/authorized/PreferencesPage/PreferencesPage";
import { ProfilePage } from "../pages/authorized/ProfilePage/ProfilePage";
import { RequestsPage } from "../pages/authorized/RequestsPage/RequestsPage";
import { SearchPage } from "../pages/authorized/SearchPage/SearchPage";
import { SettingsPage } from "../pages/authorized/SettingsPage/SettingsPage";
import { TagPage } from "../pages/authorized/TagPage/TagPage";
import { BlockedPage } from "../pages/authorized/Users/BlockedPage";
import { FollowersPage } from "../pages/authorized/Users/FollowersPage";
import { LikedPage } from "../pages/authorized/Users/LikedPage";
import { ForgotPasswordPage } from "../pages/nonAuthorized/ForgotPasswordPage/ForgotPasswordPage";
import { SignInPage } from "../pages/nonAuthorized/SignInPage/SignInPage";
import { SignUpPage } from "../pages/nonAuthorized/SignUpPage/SignUpPage";
import styles from './App.module.less';

export const App: FC<{}> = () => {

    // selectors about errors and loading
    let isLoading = useAppSelector((state: RootState) => selectIsLoading(state));
    let errorMessage = useAppSelector((state: RootState) => selectErrorMessage(state));
    let profilesErrorMessage = useAppSelector((state: RootState) => selectProfilesErrorMessage(state));
    let ownImagesErrorMessage = useAppSelector((state: RootState) => selectOwnImagesErrorMessage(state));

    // selectors about auth
    let isAuth = useAppSelector((state: RootState) => selectIsAuth(state));
    const id = useAppSelector((state: RootState) => selectId(state));

    const usualDispatch = useAppDispatch();
    const thunkDispatch = useCustomDispatch();

    // getting user's data
    useEffect(() => {
        if (isAuth) {
            thunkDispatch(addProfileThunk(id));
        };
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
        };
    }, [profilesErrorMessage, ownImagesErrorMessage]);

    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => {
                usualDispatch(setErrorMessage(""));
            }, 3000);
        };
    }, [errorMessage]);

    return <div className={`styles.app ${isLoading && styles.overflow}`} >
        {/* loading */}
        {
            isLoading ?
                <div
                    className={styles.loading}
                >
                    <CircularProgress size={100} />
                </div>
                : ""
        }

        {/* error message */}
        <Snackbar
            sx={{
                zIndex: "9999",
                textAlign: "center",
            }}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
            open={Boolean(errorMessage)}
        >
            <Alert
                severity="error"
                icon={false}
            >
                {errorMessage}
            </Alert>
        </Snackbar>

        {/* routes */}
        <Routes>
            {
                isAuth ?
                    <Route path="/">
                        <Route
                            index={true}
                            key={"home"}
                            element={
                                <FullNavigation>
                                    <HomePage />
                                </FullNavigation>
                            } />
                        <Route path="" element={<OrdinaryRoute />} >
                            <Route path="preferences" element={<PreferencesPage />} />
                            <Route path="post/:imageId/:isCommentSectionOpened" element={<PostPage />} />
                            <Route path="chats" element={<ChatsPage />} />
                            <Route path="settings" element={<SettingsPage />} />
                        </Route>
                        <Route element={<BottomNavigationRoute />}>
                            <Route path="search" element={<SearchPage />} />
                            <Route path="blocked" element={<BlockedPage />} />
                            <Route path="requests" element={<RequestsPage />} />
                            <Route path="follow/:type/:id" element={<FollowersPage />} />
                            <Route path="liked:imageId" element={<LikedPage />} />
                            <Route path="profile:id" element={<ProfilePage />} />
                            <Route path="posting" element={<PostingPage />} />
                            <Route path="tags/:id/:name" element={<TagPage />} />
                        </Route>
                        <Route
                            path="*"
                            element={<HomePage />}
                        />
                    </Route>
                    :
                    <Route path="/">
                        <Route
                            index={true}
                            key={"signIn"}
                            element={<SignInPage />}
                        />
                        <Route path="" element={<OrdinaryRoute />} >
                            <Route path="signUp" element={<SignUpPage />} />
                            <Route path="forgotPassword" element={<ForgotPasswordPage />} />
                        </Route>
                        <Route
                            path="*"
                            element={<SignInPage />}
                        />
                    </Route>
            }
        </Routes>
    </div >
};

export const OrdinaryRoute: FC<{}> = () => <Outlet />;

export const BottomNavigationRoute: FC<{}> = () => {
    return <BottomNavigation>
        <Outlet />
    </BottomNavigation>
};