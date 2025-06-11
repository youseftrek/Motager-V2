import { BASE_URL } from '@/constants';
import { RootState } from './store';
import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { toast } from 'sonner';

interface ErrorResponse {
    message: string;
    error: boolean;
}

  // Define success response type with a dynamic DT
export interface SuccessResponse<DataType = any> {
    data: DataType;
}

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL ,
  prepareHeaders:(headers , {getState})=>{
      const token = (getState() as RootState).auth.access_token;
      if(token) headers.set('authorization', `Bearer ${token}`)
      return headers;
  }
})


const baseQueryWithInterceptor: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);
  const method = typeof args === "string" ? "GET" : args.method || "GET";

  if (result.error) {
    const fallbackMessage = "An unexpected error occurred";
    const errorData = result.error.data as ErrorResponse | undefined;

    toast.error(errorData?.message || fallbackMessage);
  }

  return result;
};

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithInterceptor,
    tagTypes: [],
    endpoints: () => ({}),
});