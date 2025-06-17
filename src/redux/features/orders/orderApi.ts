import { baseApi } from "@/redux/app/baseApi";

export const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation<any, any>({
        query: (orderData) => ({
            url: `/payment/order`,
            method: 'POST',
            body: orderData,
        }),
        }),
        getStoreOrder:builder.query<{orders:any[]} , {storeId:number}>({
            query:(storeId)=>`stores/${storeId}/orders`
        }),
        deleteOrder: builder.mutation<any, {orderId: number, storeId: number}>({
            query: ({orderId, storeId}) => ({
                url: `/stores/${storeId}/orders/${orderId}`,
                method: 'DELETE',
            }),
        }),
    }),
})
export const { 
    useCreateOrderMutation, 
    useGetStoreOrderQuery,
    useDeleteOrderMutation 
} = orderApi;