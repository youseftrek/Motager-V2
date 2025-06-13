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
  token: parseTokenFromCookie(),
};

const cookieConfig = {
  maxAge: 60 * 60 * 24 * 7, // 7 days
  secure: true,
};

// Interface for the API response payload
interface IAuthPayload {
  token:string;
  user:any
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setReduxUser: (state, action: PayloadAction<IAuthPayload>) => {
      console.log(action.payload); 

      
      // Extract user data from the payload
      const userData: IUser = {
        user_id: action.payload.user.user_id,
        stores: action.payload.user.stores,
        email: action.payload.user.email,
        image: action.payload.user.image,
        name: action.payload.user.name,
      };      

      state.user = userData;
      state.token = action.payload.token;
      setCookie("user", JSON.stringify(userData), cookieConfig);
      setCookie(
        "token",
        JSON.stringify(action.payload.token),
        cookieConfig
      );
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null
      deleteCookie("user");
      deleteCookie("token");
    },
  },
});

export const { setReduxUser, logoutUser } = authSlice.actions;
export default authSlice.reducer; // Export the reducer, not the slice
