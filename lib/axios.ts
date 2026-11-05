import axios from "axios";

export const httpClient = axios.create({
  baseURL: "/api",
  withCredentials: true,  
  headers: { "Content-Type": "application/json" },
});

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      if (
        typeof window !== "undefined" &&
        !window.location.pathname.includes("/login")
      ) {
        const { useAuthStore } = await import("@/store/auth.store");
        useAuthStore.getState().clearUser();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);