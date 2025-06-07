import { IAuthState, IUser } from "@/types/auth/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

// Helper function to safely parse JSON from cookies
const parseUserFromCookie = (): IUser | null => {
  try {
    const userCookie = getCookie("user") as string;
    return userCookie ? JSON.parse(userCookie) : null;
  } catch {
    return null;
  }
};

const parseTokenFromCookie = (): string | null => {
  try {
    const tokenCookie = getCookie("token") as string;
    return tokenCookie ? JSON.parse(tokenCookie) : null;
  } catch {
    return (getCookie("token") as string) || null;
  }
};

const initialState: IAuthState = {
  user: parseUserFromCookie(),
  access_token: parseTokenFromCookie(),
  refresh_token: null,
  expires_in: null,
};

const cookieConfig = {
  maxAge: 60 * 60 * 24 * 7, // 7 days
  secure: true,
};

// Interface for the API response payload
interface IAuthPayload {
  user_id: number;
  stores: any[];
  email: string;
  image: string;
  name: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuthPayload>) => {
      // Extract user data from the payload
      const userData: IUser = {
        user_id: action.payload.user_id,
        stores: action.payload.stores,
        email: action.payload.email,
        image: action.payload.image,
        name: action.payload.name,
      };

      state.user = userData;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.expires_in = action.payload.expires_in;

      // Store in cookies
      setCookie("user", JSON.stringify(userData), cookieConfig);
      setCookie(
        "token",
        JSON.stringify(action.payload.access_token),
        cookieConfig
      );
    },
    logoutUser: (state) => {
      state.user = null;
      state.access_token = null;
      state.refresh_token = null;
      state.expires_in = null;
      deleteCookie("user");
      deleteCookie("token");
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer; // Export the reducer, not the slice
