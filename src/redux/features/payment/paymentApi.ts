import { baseApi } from "@/redux/app/baseApi";

const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPayment: builder.mutation<any , {plan_id:number , user_id:number}>({
            query: (data) => ({
                url: '/payment',
                method: 'POST',
                body: data
            }),
        }),
    })
})
export const { useCreatePaymentMutation } = paymentApi