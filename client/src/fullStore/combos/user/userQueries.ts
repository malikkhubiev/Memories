import { createAsyncThunk } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { $authHost, $host } from "../../../http";

// queries
export const userApi: any = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + "api/auth",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    checkingEmailMutationQuery: builder.mutation<
      { message: string },
      { email: string; process: string }
    >({
      query: ({ email, process }) => ({
        url: "/checkingEmail",
        method: "POST",
        body: { email, process },
      }),
    }),
    signUpMutationQuery: builder.mutation<
      { message: string },
      { encryptedEmail: string; name: string; password: string }
    >({
      query: ({ encryptedEmail, name, password }) => ({
        url: "/signup",
        method: "POST",
        body: { encryptedEmail, name, password },
      }),
    }),
    changePasswordMutationQuery: builder.mutation<
      { message: string },
      { encryptedEmail: string; password: string }
    >({
      query: ({ encryptedEmail, password }) => ({
        url: "/changePassword",
        method: "PUT",
        body: { encryptedEmail, password },
      }),
    }),
  }),
});

export const useCheckingEmail =
  userApi.endpoints.checkingEmailMutationQuery.useMutation;
export const useSignUpMutationQuery =
  userApi.endpoints.signUpMutationQuery.useMutation;
export const useChangePasswordMutationQuery =
  userApi.endpoints.changePasswordMutationQuery.useMutation;

// thunks
export const compareCodeThunk = createAsyncThunk(
  "user/compareCode",
  async (
    { email, code }: { email: string; code: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await $host.post<{ encryptedEmail: string }>(
        "/auth/compareCode",
        { email, code },
      );
      return response.data.encryptedEmail;
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  },
);

export const speedSignUpThunk = createAsyncThunk(
  "user/speedSignUp",
  async (
    {},
    { rejectWithValue },
  ) => {
    try {
      const response = await $host.post<{ encryptedEmail: string, name: string }>(
        "/auth/speedSignUp",
        { kos: "til" },
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  },
);

export const signInThunk = createAsyncThunk(
  "user/signIn",
  async (
    {
      email,
      name,
      password,
      rememberMe,
    }: { email: string; name: string; password: string; rememberMe: boolean },
    { rejectWithValue },
  ) => {
    try {
      const response = await $host.post<{
        id: number;
        name: string;
        avatar: string;
        isAccountOpened: boolean;
        token?: string;
      }>("/auth/signin", { email, name, password, rememberMe });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return {
        id: response.data.id,
        name: response.data.name,
        avatar: response.data.avatar,
        isAccountOpened: response.data.isAccountOpened,
      };
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  },
);

export const getIsAuthThunk = createAsyncThunk(
  "user/getIsAuth",
  async (plug: null, { rejectWithValue }) => {
    try {
      const response = await $authHost.get<{
        id: number;
        name: string;
        avatar: string;
        isAccountOpened: boolean;
        token: string;
        message: string;
      }>("/auth/getIsAuth");
      localStorage.setItem("token", response.data.token);
      return {
        id: response.data.id,
        name: response.data.name,
        avatar: response.data.avatar,
        isAccountOpened: response.data.isAccountOpened,
      };
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  },
);

export const changeNameAvatarIsOpenedThunk = createAsyncThunk(
  "user/changeNameAvatarIsOpened",
  async (FormData: FormData, { rejectWithValue }) => {
    try {
      const response = await $authHost.put<{
        isOpened?: boolean;
        avatar?: string;
        name?: string;
      }>("/auth/changeNameAvatarIsOpened", FormData);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  },
);

export const deleteAccountThunk = createAsyncThunk(
  "user/deleteAccount",
  async (password: string, { rejectWithValue }) => {
    try {
      const response = await $authHost.delete<{
        message: string;
      }>("/auth/deleteAccount", { data: { password } });
      return null;
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  },
);
