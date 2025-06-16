'use server'
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

export async function updatePayment(tap_id:string) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/callback?tap_id=${tap_id}`);    
    return response.data;
  }
  catch (error) {
    console.log(error)
  }

}

export async function getCharge(tap_id: string) {
  console.log("Fetching charge for tap_id:", tap_id);
  
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/payment/order/${tap_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TAP_SECRET_KEY}`,
        },
      }
    );    
    return response.data;
  } catch (error) {
    console.log(error);
  }
}