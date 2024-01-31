import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NonNullChain } from 'typescript';
import { RootState } from '../../rootStore';
import { changeNameAvatarIsOpenedThunk, compareCodeThunk, deleteAccountThunk, getIsAuthThunk, signInThunk } from './userQueries';

export interface UserState {
  id: number | null
  isAuth: boolean
  name: string | null
  avatar: string | null
  isAccountOpened: boolean | NonNullChain
  encryptedEmail: string | null
  isLoading: boolean
  errorMessage: string
};

const initialState: UserState = {
  id: null,
  isAuth: false,
  name: null,
  avatar: null,
  isAccountOpened: null,
  encryptedEmail: null,
  isLoading: false,
  errorMessage: "",
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getIsAuth: (state, action: PayloadAction<null>) => {
      state.isAuth = true;
    },
    changePassword: (state, action: PayloadAction<{
      password: string
    }>) => {
      const encryptedEmail = state.encryptedEmail;
      const { password } = action.payload;
    },
    setIsAuthFalse: (state, action: PayloadAction<null>) => {
      state.isAuth = false;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    logOut: (state, action: PayloadAction<string>) => {
      state.isAuth = false;
      const stateProps: string[] = [
        "id",
        "name",
        "avatar",
        "isAccountOpened",
        "encryptedEmail"
      ];
      stateProps.forEach((prop: string) => {
        // @ts-ignore
        state[prop] = null;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(compareCodeThunk.fulfilled,
      (state: UserState, action: PayloadAction<string>) => {
        state.encryptedEmail = action.payload;
      });
    builder.addCase(compareCodeThunk.rejected,
      (state: any, action: PayloadAction<any>) => {
        state["errorMessage"] = action.payload;
      });
    builder.addCase(signInThunk.fulfilled,
      (state: UserState, action: PayloadAction<{
        id: number,
        name: string,
        avatar: string,
        isAccountOpened: boolean,
      }>) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.avatar = action.payload.avatar;
        state.isAccountOpened = action.payload.isAccountOpened;
        state.isAuth = true;
      });
    builder.addCase(signInThunk.rejected,
      (state: any, action: PayloadAction<any>) => {
        console.log("login error is here:")
        console.log(action.payload);
        state["errorMessage"] = action.payload;
      });
    builder.addCase(getIsAuthThunk.fulfilled,
      (state: UserState, action: PayloadAction<{
        id: number,
        name: string,
        avatar: string,
        isAccountOpened: boolean,
      }>) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.avatar = action.payload.avatar;
        state.isAccountOpened = action.payload.isAccountOpened;
        state.isAuth = true;
      });
    builder.addCase(getIsAuthThunk.rejected,
      (state: any, action: PayloadAction<any>) => {
        // state["errorMessage"] = action.payload;
      });
    builder.addCase(changeNameAvatarIsOpenedThunk.fulfilled,
      (state: UserState, action: PayloadAction<{
        name?: string,
        avatar?: string
      }>) => {
        state.name = action.payload.name;
        state.avatar = action.payload.avatar;
      });
    builder.addCase(changeNameAvatarIsOpenedThunk.rejected,
      (state: any, action: PayloadAction<any>) => {
        state["errorMessage"] = action.payload;
      });
    builder.addCase(deleteAccountThunk.fulfilled,
      (state: UserState, action: PayloadAction<any>) => {
        state.isAuth = false;
        const stateProps: string[] = [
          "id",
          "name",
          "avatar",
          "isAccountOpened",
          "encryptedEmail"
        ];
        stateProps.forEach((prop: string) => {
          // @ts-ignore
          state[prop] = null;
        });
      });
    builder.addCase(deleteAccountThunk.rejected,
      (state: any, action: PayloadAction<any>) => {
        state["errorMessage"] = action.payload;
      });
  },
});

// actions
export const {
  getIsAuth,
  changePassword,
  setIsAuthFalse,
  setIsLoading,
  setErrorMessage,
  logOut,
} = userSlice.actions;

// selectors
export const selectEncryptedEmail = (state: RootState): string => state.user.encryptedEmail;
export const selectId = (state: RootState): number => +state.user.id;
export const selectAvatar = (state: RootState): string => state.user.avatar;
export const selectIsLoading = (state: RootState): boolean => state.user.isLoading;
export const selectIsAuth = (state: RootState): boolean => state.user.isAuth;
export const selectErrorMessage = (state: RootState): string => state.user.errorMessage;

// reducer
export const userReducer = userSlice.reducer;