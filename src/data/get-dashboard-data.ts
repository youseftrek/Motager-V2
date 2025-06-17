import axios from "axios"

export const getDashboardData = async (storeId: string, token: string, startDate?: string, endDate?: string) => {
    try {
        const queryParams = new URLSearchParams();
        
        if (startDate) queryParams.append('startDate', startDate);
        if (endDate) queryParams.append('endDate', endDate);
        
        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
        
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/stores/${storeId}/dashboard${queryString}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.error(error)
        return null
    }
}

