import axios from "axios";

export async function getPlans() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/plans`
    );    
    return response.data.data;
  } catch (error) {
    console.error("Error fetching stores:", error);
    return [];
  }
}
