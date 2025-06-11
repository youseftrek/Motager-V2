"use server";

import { cookies } from "next/headers";

export async function logout() {
  // Clear the token cookie
  const cookieStore = await cookies();
  cookieStore.set("access_token", "", {
    expires: new Date(0),
    path: "/",
  });

  cookieStore.set("refresh_token", "", {
    expires: new Date(0),
    path: "/",
  });

  // Return success instead of redirecting
  return { success: true };
}
