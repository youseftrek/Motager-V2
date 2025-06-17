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

        updateProduct: build.mutation<any, {storeId: number, productId: number, data: any}>({
            query: ({storeId, productId, data}) => ({
                url: `/stores/${storeId}/products/${productId}`,
                method: 'PUT',
                body: data,
            }),
        }),

        deleteProduct: build.mutation<any, {storeId: number, productId: number}>({
            query: ({storeId, productId}) => ({
                url: `/stores/${storeId}/products/${productId}`,
                method: 'DELETE',
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
export const {
    useCreateProductMutation, 
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetStoreProductsBySlugQuery, 
    useGetSingleProductQuery 
} = productsApi