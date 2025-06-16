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
    }),
})
export const { useCreateOrderMutation } = orderApi;