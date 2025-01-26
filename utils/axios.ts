import axios from "axios";
import { handleApiError } from "./errors";

const isServer = typeof window === "undefined";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;
axios.interceptors.request.use(
  async (config) => {
    if (isServer) {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value;
      if (token) {
        config.headers["Authorization"] = token;
      }
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      return Promise.reject({
        ...error,
        customRedirect: true,
      });
    }
    if (error.code === "ECONNABORTED") {
      return Promise.reject(
        new Error(
          "پردازش درخواست خیلی طول کشید. لطفاً اتصال خود را بررسی کنید و دوباره امتحان کنید."
        )
      );
    }
    console.error("API error:", {
      message: error.message,
      status: error.response?.status,
      headers: error.response?.headers,
      data: error.response?.data,
      response: error.response.data.detail,
    });
    // return Promise.reject(new Error(error.response.data));
    const userFriendlyMessage = handleApiError(error);
    return Promise.reject(
      new Error(
        error.response?.data?.detail ||
          error.response?.data ||
          userFriendlyMessage
      )
    );
  }
);

export default axios;
