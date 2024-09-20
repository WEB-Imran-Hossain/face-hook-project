import { useEffect } from "react";
import axios from "axios";
import { api } from "../api"; // Custom axios instance
import { useAuth } from "./useAuth";

const useAxios = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const token = auth?.authToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = auth?.refreshToken;
            const { data } = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            );

            const newToken = data.token;
            setAuth((prevAuth) => ({ ...prevAuth, authToken: newToken }));
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, setAuth]);

  return { api }; // Make sure to return an object with `api`
};

export default useAxios;
