import { CircularProgress } from "@mui/material";
import React, { FC, Suspense } from "react";
import { Route } from "react-router-dom";

const SignInPage = React.lazy(
  () => import("../pages/nonAuthorized/SignInPage/SignInPage"),
);
const SignUpPage = React.lazy(
  () => import("../pages/nonAuthorized/SignUpPage/SignUpPage"),
);
const ForgotPasswordPage = React.lazy(
  () => import("../pages/nonAuthorized/ForgotPasswordPage/ForgotPasswordPage"),
);
const HomePage = React.lazy(
  () => import("../pages/authorized/HomePage/HomePage"),
);
const PostingPage = React.lazy(
  () => import("../pages/authorized/PostingPage/PostingPage"),
);
const PostPage = React.lazy(
  () => import("../pages/authorized/PostPage/PostPage"),
);
const PreferencesPage = React.lazy(
  () => import("../pages/authorized/PreferencesPage/PreferencesPage"),
);
const ProfilePage = React.lazy(
  () => import("../pages/authorized/ProfilePage/ProfilePage"),
);
const RequestsPage = React.lazy(
  () => import("../pages/authorized/RequestsPage/RequestsPage"),
);
const ChatsPage = React.lazy(
  () => import("../pages/authorized/ChatsPage/ChatsPage"),
);
const SettingsPage = React.lazy(
  () => import("../pages/authorized/SettingsPage/SettingsPage"),
);
const SearchPage = React.lazy(
  () => import("../pages/authorized/SearchPage/SearchPage"),
);
const TagPage = React.lazy(() => import("../pages/authorized/TagPage/TagPage"));
const BlockedPage = React.lazy(
  () => import("../pages/authorized/Users/BlockedPage/BlockedPage"),
);
const FollowersPage = React.lazy(
  () => import("../pages/authorized/Users/FollowersPage/FollowersPage"),
);
const LikedPage = React.lazy(
  () => import("../pages/authorized/Users/LikedPage/LikedPage"),
);

export const authorizedRoutes = [
  {
    index: true,
    key: "",
    component: HomePage,
  },
  {
    path: "preferences",
    component: PreferencesPage,
  },
  {
    path: "post/:imageId/:isCommentSectionOpened",
    component: PostPage,
  },
  {
    path: "chats",
    component: ChatsPage,
  },
  {
    path: "settings",
    component: SettingsPage,
  },
  {
    path: "search",
    component: SearchPage,
  },
  {
    path: "blocked",
    component: BlockedPage,
  },
  {
    path: "requests",
    component: RequestsPage,
  },
  {
    path: "follow/:type/:id",
    component: FollowersPage,
  },
  {
    path: "liked:imageId",
    component: LikedPage,
  },
  {
    path: "profile:id",
    component: ProfilePage,
  },
  {
    path: "posting",
    component: PostingPage,
  },
  {
    path: "tags/:id/:name",
    component: TagPage,
  },
  {
    path: "*",
    component: HomePage,
  },
];

export const nonAuthorizedRoutes = [
  {
    key: "",
    index: true,
    component: SignInPage,
  },
  {
    path: "signUp",
    component: SignUpPage,
  },
  {
    path: "forgotPassword",
    component: ForgotPasswordPage,
  },
  {
    path: "*",
    component: SignInPage,
  },
];

export const customRoutes = (route: any, styles:any) => {
  return (
    <React.Fragment key={route.path}>
      <Route
        index={route?.index}
        key={route?.key}
        path={route?.path}
        element={
          <Suspense
            fallback={
              <div className={styles.loading}>
                <CircularProgress size={100} />
              </div>
            }
          >
            <route.component />
          </Suspense>
        }
      />
    </React.Fragment>
  );
};
