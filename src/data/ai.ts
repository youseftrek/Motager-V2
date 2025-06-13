import { API_URLS } from "@/lib/api-urls";
import axios from "axios";

export async function checkAiStatus(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const res = await axios.get(API_URLS.AI_STATUS, {
      timeout: 5000,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return {
      success: res.data?.success || false,
      message: res.data?.message || "AI status check completed",
    };
  } catch (error) {
    console.error("Error getting AI status: ", error);
    return {
      success: false,
      message: "Something went wrong while fetching the model's status",
    };
  }
}

export async function generateProductNameAndDescription(values: {
  Brand_name: string;
  image_paths: string[];
}): Promise<{ success: boolean; product_name: string; description: string }> {
  try {
    const res = await axios.post(
      API_URLS.AI_GENERATE_PRODUCT_NAME_AND_DESCRIPTION,
      values
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("error generating name: ", error);
    return {
      success: false,
      product_name: "",
      description: "",
    };
  }
}

export async function extractProductColors(values: {
  image_paths: string[];
}): Promise<{ success: boolean; colors: string[] }> {
  try {
    const res = await axios.post(API_URLS.AI_EXTRACT_COLORS, values);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("error extracting colors: ", error);
    return {
      success: false,
      colors: [],
    };
  }
}
