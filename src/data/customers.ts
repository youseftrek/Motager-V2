import { getSession } from '@/actions/getSession'
import axios from 'axios'

export async function getStoreCustomers(store_id: number) {
    const session = await getSession();
    
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/stores/${store_id}/customers`, {
            headers: {
                "Authorization": `Bearer ${session?.token}`,
            }
        });
        return response.data.customers || []
    } catch (error) {
        console.error('Error fetching store customers:', error);
        return [];
    }
}

export async function getSingleCustomer(store_id: number, customer_id: number) {
    const session = await getSession();
    console.log('Fetching customer:', customer_id, 'for store:', store_id);
    
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/stores/${store_id}/customers/${customer_id}`, {
            headers: {
                "Authorization": `Bearer ${session?.token}`,
            }
        });
        return response.data.customer || response.data || null;
    } catch (error) {
        console.error('Error fetching single customer:', error);
        return null;
    }
} 