import { baseApi } from "@/redux/app/baseApi";

export const productsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createProduct: build.mutation<any , {storeId:number , data:any}>({
            query: ({storeId , data}) => ({
                url: `/stores/${storeId}/products`,
                method: 'POST',
                body:data,
            }),
        }),
    }),
})
export const {useCreateProductMutation} = productsApi