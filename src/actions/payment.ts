"use server";

import axios from "axios";
export async function createPayment(
  data: { plan_id: number; user_id: number },
  token: string
) {
  try {
    const response = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });

    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching stores:",
      error?.response?.data || error.message
    );
    return {};
  }
}
