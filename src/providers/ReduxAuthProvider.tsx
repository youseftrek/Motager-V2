"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { fetchUserProfile } from "@/redux/store/authSlice";

export default function ReduxAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const [isInitialized, setIsInitialized] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      if (!isAuthenticated) {
        await dispatch(fetchUserProfile());
      }
      setIsInitialized(true);
    };

    initializeAuth();
  }, [dispatch, isAuthenticated]);

  // Show loading spinner while initializing
  if (!isInitialized || loading) {
    return <div>Loading...</div>; // Replace with your loading component
  }

  return <>{children}</>;
}
