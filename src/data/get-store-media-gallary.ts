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

    console.log("THIS IS THE RES:: ", res);
    return res.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
