import { baseApi } from "@/redux/app/baseApi";

const plansApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPlans: builder.query<any , void>({
            query: () => ({
                url: '/plans',
                method: 'GET',
            })
        }),
    })
})
export const { useGetPlansQuery } = plansApi