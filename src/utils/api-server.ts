// utils/api-server.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { cookies } from "next/headers";

// Create axios instance for server-side requests
const createServerApi = (): AxiosInstance => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Server API utility functions
export const serverApiClient = {
  // GET request
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const api = createServerApi();
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await api.get(url, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          `GET ${url} failed:`,
          error.response?.status,
          error.response?.data
        );
      }
      throw error;
    }
  },

  // POST request
  post: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const api = createServerApi();
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await api.post(url, data, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          `POST ${url} failed:`,
          error.response?.status,
          error.response?.data
        );
      }
      throw error;
    }
  },

  // PUT request
  put: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const api = createServerApi();
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await api.put(url, data, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          `PUT ${url} failed:`,
          error.response?.status,
          error.response?.data
        );
      }
      throw error;
    }
  },

  // PATCH request
  patch: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const api = createServerApi();
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await api.patch(url, data, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          `PATCH ${url} failed:`,
          error.response?.status,
          error.response?.data
        );
      }
      throw error;
    }
  },

  // DELETE request
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const api = createServerApi();
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await api.delete(url, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          `DELETE ${url} failed:`,
          error.response?.status,
          error.response?.data
        );
      }
      throw error;
    }
  },

  // Public requests (without auth)
  publicGet: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const api = createServerApi();
    try {
      const response = await api.get(url, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          `Public GET ${url} failed:`,
          error.response?.status,
          error.response?.data
        );
      }
      throw error;
    }
  },

  publicPost: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const api = createServerApi();
    try {
      const response = await api.post(url, data, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          `Public POST ${url} failed:`,
          error.response?.status,
          error.response?.data
        );
      }
      throw error;
    }
  },
};

// Helper function to get authenticated user (for server components)
export async function getAuthenticatedUser() {
  try {
    const userData = await serverApiClient.get("/auth/me");
    return userData;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null; // User not authenticated
    }
    throw error; // Re-throw other errors
  }
}

// Helper function to check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  try {
    await serverApiClient.get("/auth/me");
    return true;
  } catch (error) {
    return false;
  }
}

// Helper to get token from server
export async function getServerToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value || null;
}
