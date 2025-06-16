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

        getStoreProductsBySlug: build.query<any, {storeSlug:string}>({
            query: ({storeSlug}) => `/stores/slug/${storeSlug}/products`,
        }),

        getSingleProduct:build.query<any , {id:number , storeId:number}>({
            query:({id , storeId})=> `/stores/${storeId}/products/${id}/details`
        })
    }),
})
export const {useCreateProductMutation ,useGetStoreProductsBySlugQuery , useGetSingleProductQuery } = productsApi