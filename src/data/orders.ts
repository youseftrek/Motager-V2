import { getSession } from '@/actions/getSession'
import axios from 'axios'

export async function getStoreOrders(store_id: number) {
    const session = await getSession();    
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/stores/${store_id}/orders`, {
            headers: {
                "Authorization": `Bearer ${session?.token}`,
            }
        });
        return response.data.orders || []
    } catch (error) {
        console.error('Error fetching store orders:', error);
        return [];
    }
}

export async function getSingleOrder(store_id: number, order_id: number) {
    const session = await getSession();
    console.log('Fetching order:', order_id, 'for store:', store_id);
    
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/stores/${store_id}/orders/${order_id}/details`, {
            headers: {
                "Authorization": `Bearer ${session?.token}`,
            }
        });
        console.log('Single order response:', response.data);
        return response.data || null;
    } catch (error) {
        console.error('Error fetching single order:', error);
        return null;
    }
} 