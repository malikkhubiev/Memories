import { createAsyncThunk } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { $authHost } from "../../../http";
import {
  imageType,
  preferenceType,
  profileType,
  requestersType,
  tagType,
} from "../../../types/storeTypes";

// queries
export const profilesApi = createApi({
  reducerPath: "profilesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + "api/user",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPreferences: builder.query<preferenceType[], null>({
      query: () => "getPreferences",
    }),
    getImagesByPreferences: builder.query<
      {
        rows: imageType[];
        count: string;
      },
      null
    >({
      query: () => "getImagesByPreferences",
    }),
    setPreferences: builder.mutation<
      any,
      { preferences: any[]; isFirstTime?: boolean }
    >({
      query: ({ preferences, isFirstTime }) => ({
        url: "/setPreferences",
        method: "POST",
        body: {
          preferences,
          isFirstTime,
        },
      }),
    }),
    sendASubscriptionRequest: builder.mutation<any, { userId: number }>({
      query: ({ userId }) => ({
        url: "/sendASubscriptionRequest",
        method: "POST",
        body: {
          userId,
        },
      }),
    }),
    confirmSubRequest: builder.mutation<any, { userId: number }>({
      query: ({ userId }) => ({
        url: "/confirmSubRequest",
        method: "POST",
        body: {
          userId,
        },
      }),
    }),
    denySubRequest: builder.mutation<any, { userId: number }>({
      query: ({ userId }) => ({
        url: "/denySubRequest",
        method: "POST",
        body: {
          userId,
        },
      }),
    }),
    getRequests: builder.query<requestersType, null>({
      query: () => "getRequests",
    }),
    follow: builder.mutation<any, { followingId: number }>({
      query: ({ followingId }) => ({
        url: "/follow",
        method: "POST",
        body: {
          followingId,
        },
      }),
    }),
    unFollow: builder.mutation<any, { unFollowingId: number }>({
      query: ({ unFollowingId }) => ({
        url: "/unFollow",
        method: "POST",
        body: {
          unFollowingId,
        },
      }),
    }),
  }),
});

export const useGetPreferences = profilesApi.endpoints.getPreferences.useQuery;
export const useGetImagesByPreferences =
  profilesApi.endpoints.getImagesByPreferences.useQuery;
export const useSetPreferences =
  profilesApi.endpoints.setPreferences.useMutation;
export const useSendASubscriptionRequest =
  profilesApi.endpoints.sendASubscriptionRequest.useMutation;
export const useConfirmSubRequest =
  profilesApi.endpoints.confirmSubRequest.useMutation;
export const useDenySubRequest =
  profilesApi.endpoints.denySubRequest.useMutation;
export const useGetRequests = profilesApi.endpoints.getRequests.useQuery;
export const useFollow = profilesApi.endpoints.follow.useMutation;
export const useUnfollow = profilesApi.endpoints.unFollow.useMutation;

// thunks
export const addProfileThunk = createAsyncThunk(
  "profiles/addProfile",
  // @ts-ignore
  async (userId?: number | null, { rejectWithValue }) => {
    try {
      const response = await $authHost.get<profileType>(
        `/user/getUserProfile:${userId}`,
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  },
);

export const blockThunk = createAsyncThunk(
  "profiles/block",
  async (userId: number, { rejectWithValue }) => {
    try {
      await $authHost.post<{ message: string }>("/user/block", {
        blockingId: userId,
      });
      return userId;
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  },
);

export const unBlockThunk = createAsyncThunk(
  "profiles/unBlock",
  async (userId: number, { rejectWithValue }) => {
    try {
      await $authHost.post<null>("/user/unBlock", { unBlockingId: userId });
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  },
);
