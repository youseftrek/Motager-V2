"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function getSession() {
  // Get the token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return {
      token: null,
      user: null,
    };
  }

  const response = await axios.get(
    process.env.NEXT_PUBLIC_APP_URL + "/api/me",
    {
      headers: {
        Cookie: token ? `access_token=${token}` : "",
      },
    }
  );

  return {
    token: response.data.token,
    user: response.data.user,
  };
}
