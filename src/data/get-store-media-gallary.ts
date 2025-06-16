import axios from "axios";

export const getStoreMediaGallary = async (storeId: number, token: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/store/gallery/${storeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Gallery Response:", res.data);
    
    // Handle different response formats
    if (res.data && res.data.data) {
      return Array.isArray(res.data.data) ? res.data.data : [];
    }
    
    // If the data is directly in the response
    if (res.data && Array.isArray(res.data)) {
      return res.data;
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return [];
  }
};
