import { Store } from "@/types/store";
import axios from "axios";

export async function getStores(id: any, token: any) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/store/user/${id}`,
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching stores:", error);
    return { data: [] };
  }
}

export async function checkStore(
  userId: any,
  token: any,
  storeId: number
): Promise<boolean> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/store/user/${userId}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    const stores: Store[] = response.data.data;

    const isValidStore = stores.some((store: Store) => store.id === storeId);

    return isValidStore;
  } catch (error) {
    console.error("Error checking store:", error);
    return false;
  }
}

export async function createStore(data: any, token: any) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/store`,
      data,
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const updateTokenResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/refresh`,
      {
        ...response.data.tokens,
      },
      {
        headers: { Authorization: `${token}` },
      }
    );

    console.log("updateTokenResponse: ", updateTokenResponse);

    return response; // return the full response object
  } catch (error: any) {
    console.error("Error creating store:", error);
    throw error; // This ensures the error is caught in onSubmit
  }
}
