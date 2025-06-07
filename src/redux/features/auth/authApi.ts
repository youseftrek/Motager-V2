import { IRegister } from "@/types/auth/auth";
import { baseApi } from "../../app/baseApi";
import { setUser } from "./authSlice";
import { UserRegisterSchemaType } from "@/validations/user-register";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<any, { email: string; password: string }>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    registerUser: builder.mutation<any,UserRegisterSchemaType>({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      })
    })
  }),
});
export const { useLoginUserMutation , useRegisterUserMutation } = authApi;
