import axios from "axios";

export const getStoreCategories = async (storeId: number) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/stores/${storeId}/categories`
    );
    return res.data.categories;
  } catch (error) {
    console.error(error);
    return null;
  }
};
