import axios  from 'axios';
export async function getStoreCollection(id:number , token:string) {
    try{
        const reponse =  await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/stores/${id}/collections`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        } }
    )
    return reponse.data.collections;
    }catch(error){
        console.error("Error fetching store collections:", error);
        throw error;
    }

}

export async function createStoreCollection(storeId:number , data:any , token:string) {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/stores/${storeId}/collections`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }catch(error){
        console.error("Error creating store collection:", error);
        throw error;
    }
}