"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function saveTheme(storeTheme: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  console.log("Saving theme", storeTheme, token, storeTheme.storeId);

  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_BASE_URL + "/store/theme",
      {
        storeId: storeTheme.storeId,
        theme: storeTheme,
        isActive: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Theme saved successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to save theme:", error);
    throw error;
  }
}
