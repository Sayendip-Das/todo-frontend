import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/user";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  user: User | null;
}

interface LoginPayload {
  accessToken: string;
}

// const accessToken = localStorage.getItem("access_token");
// const refreshToken = localStorage.getItem("refresh_token");

const initialState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,

  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.accessToken = action.payload.accessToken;
      //   state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },

    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.accessToken = null;
      //   state.refreshToken = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout, setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
