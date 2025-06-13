"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";
import { IUser } from "@/types/auth/auth";
import { useDispatch } from "react-redux";
import { setReduxUser } from "@/redux/features/auth/authSlice";

type AuthContextType = {
  user: IUser | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch()

  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/me");
      setUser(response.data.user);
      dispatch(setReduxUser(response.data));
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    await fetchCurrentUser();
  };

  const logout = async () => {
    try {
      await axios.post("/api/logout");
      setUser(null);
      router.push("/auth/login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
