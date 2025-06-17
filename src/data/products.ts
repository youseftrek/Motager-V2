import { getSession } from '@/actions/getSession'
import axios from 'axios'

export async function getStoreProducts(store_id:number) {
    const session = await getSession();
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/stores/${store_id}/products`,{
            headers:{
                "Authorization": `Bearer ${session?.token}`,
            }
        });
        return response.data.products
    }catch(error){
    }
}

export async function getSingleProduct(store_id: number, product_id: number) {
    const session = await getSession();
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/stores/${store_id}/products/${product_id}/details`,{
            headers:{
                "Authorization": `Bearer ${session?.token}`,
            }
        });        
        return response.data
    }catch(error){
        console.error('Error fetching product:', error);
        return null;
    }
}