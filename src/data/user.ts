import axios from "axios";

export async function getUser(id: string , token:string) {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/user/${id}`,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );        
        return response.data.data;
    } catch (error:any) {        
        console.error("Error fetching stores:", error.response);
        return {};
    }
}