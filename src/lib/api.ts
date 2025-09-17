import axios from "axios"

const api = axios.create({
  baseURL: "https://api.logistix.one/api",
})

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token")
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
          localStorage.clear();
          return Promise.reject(err);
        }

        const { data } = await axios.post("https://api.logistix.one/api/auth/token/refresh", {
          refresh_token: refreshToken,
        });

        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);

        api.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

        return api(originalRequest);
      } catch (refreshError: any) {
        if (refreshError.response?.status === 401) {
        localStorage.clear();
        window.location.href = "/auth/login"
        return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(err);
  }
);


export default api
