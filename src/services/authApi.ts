import axios from "axios";
import type {
  UserCreate,
  UserCreateResponse,
  TokenResponse,
  UserSignIn,
  UserMessageResponse,
  User,
} from "../types/user";

// Create a new user account : POST
export const signupUser = async (
  userData: UserCreate,
): Promise<UserCreateResponse> => {
  const response = await axios.post<UserCreateResponse>(
    `${import.meta.env.VITE_API_URL}/api/v1/users/signup`,
    userData,
  );

  return response.data;
};

// Sign in an existing user
export const signinUser = async (
  userData: UserSignIn,
): Promise<TokenResponse> => {
  const response = await axios.post<TokenResponse>(
    `${import.meta.env.VITE_API_URL}/api/v1/users/signin`,
    userData,
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

// User Logout functionality
export const logoutUser = async (): Promise<UserMessageResponse> => {
  const response = await axios.post<UserMessageResponse>(
    `${import.meta.env.VITE_API_URL}/api/v1/users/logout`,
    {},
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const refreshAccessToken = async (): Promise<TokenResponse> => {
  const response = await axios.post<TokenResponse>(
    `${import.meta.env.VITE_API_URL}/api/v1/users/refresh`,
    {},
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const getCurrentUser = async (accessToken: string): Promise<User> => {
  const response = await axios.get<User>(
    `${import.meta.env.VITE_API_URL}/api/v1/users/me`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
};
