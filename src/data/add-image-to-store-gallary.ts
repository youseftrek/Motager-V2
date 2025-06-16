import axios from "axios";

export const addImageToStoreGallary = async (
  storeId: number,
  imageUrl: string[],
  token: string
) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/store/gallery/bulk`,
      { storeId, imageUrl },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
