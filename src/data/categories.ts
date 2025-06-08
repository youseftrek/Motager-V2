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
