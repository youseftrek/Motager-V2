import axios from "axios";
import { getCookie } from "cookies-next";

declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
  }
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const requiresAuth = config?.skipAuth !== true;

  if (requiresAuth) {
    let token = getCookie("token") as string;

    if (token) {
      // Remove quotes if they exist
      if (token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
      }

      config.headers.Authorization = token;
    }
  }

  return config;
});

export default axiosInstance;
