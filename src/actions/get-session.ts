"use server";

import { cookies } from "next/headers";

interface User {
  user_id: number;
  stores: any[]; // You can replace `any` with a specific store type if available
  email: string;
  image: string;
  name: string;
}

interface SessionData {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

/**
 * Server action to get the current user session
 * Can be used in Server Components to get the user session
 */
export async function getSession(): Promise<SessionData> {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");
  const tokenCookie = cookieStore.get("token");

  let user = null;
  let token = null;

  if (userCookie?.value) {
    try {
      user = JSON.parse(userCookie.value);
    } catch (error) {
      console.error("Failed to parse user cookie:", error);
    }
  }

  if (tokenCookie?.value) {
    try {
      token = JSON.parse(tokenCookie.value);
    } catch (error) {
      // For cases where token is stored directly
      token = tokenCookie.value;
    }
  }

  return {
    user,
    token,
    isAuthenticated: !!user && !!token,
  };
}
