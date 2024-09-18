import { useEffect } from "react";
import axios from "axios";
import { api } from "../api"; // Custom axios instance
import { useAuth } from "./useAuth";

const useAxios = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    // Request Interceptor: Attach the authorization token to every request
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

    // Response Interceptor: Handle token refresh if 401 Unauthorized occurs
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true; // Avoid infinite loops
          try {
            const refreshToken = auth?.refreshToken;
            const { data } = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            );

            const newToken = data.token;
            // Update the auth token in the state
            setAuth((prevAuth) => ({ ...prevAuth, authToken: newToken }));

            // Update the original request with the new token and retry it
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axios(originalRequest); // Retry the original request
          } catch (refreshError) {
            return Promise.reject(refreshError); // Forward the error if refresh fails
          }
        }

        return Promise.reject(error); // Reject any other errors
      }
    );

    // Cleanup interceptors when the component unmounts
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, setAuth]); // Dependencies are auth and setAuth

  return api; // Return the custom axios instance
};

export default useAxios;