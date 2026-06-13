import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
});

// ⭐ REQUEST INTERCEPTOR — lägg till JWT-token automatiskt
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
    return config;
    },
(error) => Promise.reject(error)
);

// ⭐ RESPONSE INTERCEPTOR — hantera expired token
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        console.warn("No refresh token — redirecting to login");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
          { refreshToken }
        );

        const newAccessToken = res.data.accessToken;

        // Spara nya token
        localStorage.setItem("accessToken", newAccessToken);

        // Lägg till nya token i headern
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Kör om requesten
        return api(originalRequest);

      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;