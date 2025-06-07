// utils/api-client.ts
"use client";

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

// Create axios instance for client-side requests
export const clientApi: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
clientApi.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("auth_token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
clientApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      document.cookie =
        "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";

      // Redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// API utility functions
export const apiClient = {
  // GET request
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await clientApi.get(url, config);
    return response.data;
  },

  // POST request
  post: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await clientApi.post(url, data, config);
    return response.data;
  },

  // PUT request
  put: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await clientApi.put(url, data, config);
    return response.data;
  },

  // PATCH request
  patch: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await clientApi.patch(url, data, config);
    return response.data;
  },

  // DELETE request
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await clientApi.delete(url, config);
    return response.data;
  },

  // Upload file
  upload: async <T>(
    url: string,
    formData: FormData,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await clientApi.post(url, formData, {
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
        ...config?.headers,
      },
    });
    return response.data;
  },

  // Request without auth (for public endpoints)
  publicGet: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${url}`,
      config
    );
    return response.data;
  },

  publicPost: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}${url}`,
      data,
      config
    );
    return response.data;
  },
};

export default clientApi;
