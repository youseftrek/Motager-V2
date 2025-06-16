import axios from "axios";

export const addImageToStoreGallary = async (
  storeId: number,
  imageUrl: string | string[],
  token: string
) => {
  try {
    // Convert single string to array if needed
    const imageUrlArray = Array.isArray(imageUrl) ? imageUrl : [imageUrl];
    
    // Make sure the array is not empty
    if (imageUrlArray.length === 0) {
      throw new Error("Image URL array cannot be empty");
    }
    
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/store/gallery/bulk`,
      { storeId, imageUrls: imageUrlArray },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error adding images to gallery:", error);
    return null;
  }
};
