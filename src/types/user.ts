// Data sent to the backend when creating a user account
export interface UserCreate {
  name: string;
  email: string;
  password: string;
}

// Data sent to the backend when signing in
export interface UserSignIn {
  email: string;
  password: string;
}

// Safe user information returned by the backend
export interface User {
  id: string;
  name: string;
  email: string;
  active: boolean;
}

// Response returned after creating a user account
export interface UserCreateResponse {
  message: string;
  error?: string | null;
  user: User;
}

// Response returned after signin or token refresh
export interface TokenResponse {
  message: string;
  error?: string | null;
  access_token: string;
  // refresh_token: string;
  token_type: string;
}

// Data sent to the refresh and logout APIs
export interface RefreshTokenRequest {
  refresh_token: string;
}

// Response returned after logout
export interface UserMessageResponse {
  message: string;
  error?: string | null;
}
