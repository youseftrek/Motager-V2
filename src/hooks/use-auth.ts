"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/app/store";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/features/auth/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const [loginUser, { isLoading: isLoggingIn }] = useLoginUserMutation();

  // Get auth state from Redux
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.access_token);
  const isAuthenticated = !!user && !!token;

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const result = await loginUser({ email, password }).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      };
    }
  };

  // Logout function
  const logout = () => {
    dispatch(logoutUser());
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoggingIn,
    login,
    logout,
  };
};
