'use server'
import { getSession } from "@/actions/getSession";
import axios from "axios";

export async function getCategories() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/category`
    );

    return response.data.data.categories;
  } catch (error) {
    console.error("Error fetching stores:", error);
    return [];
  }
}


export async function createStoreCategory(data:{name:string , description:string} , store_id:number) {
  const user = await getSession();
  console.log(store_id, data);
  
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/stores/${store_id}/categories`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}

export async function getStoreCategory(store_id: number) {
  const user = await getSession();

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/stores/${store_id}/categories`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      }
    );

    return response.data.categories;
  } catch (error) {
    console.error("Error fetching store categories:", error);
    throw error;
  }

}
