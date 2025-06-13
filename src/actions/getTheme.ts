"use server";

import axios from "axios";

export async function getStore(storeSlug: string) {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL +
        "/store/theme/slug/" +
        storeSlug +
        "/active"
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch store:", error);
    throw error;
  }
}

export async function getStoreById(storeId: number) {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + "/store/theme/" + storeId
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch store:", error);
    throw error;
  }
}
