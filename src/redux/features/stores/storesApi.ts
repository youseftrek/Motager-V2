import { baseApi } from "@/redux/app/baseApi";
import { Store } from "@/types/store";
import { createApi } from "@reduxjs/toolkit/query/react";

const storesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStores: builder.query<Store[], void>({
      query: (id) => `/stores/user/${id}`,
    }),

    getStoreBySlug: builder.query<{data:Store}, string>({
      query: (slug) => `/store/slug/${slug}`,
    }),
  }),
});

export const { useGetStoresQuery , useGetStoreBySlugQuery } = storesApi;
