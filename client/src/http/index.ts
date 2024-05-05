import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

// const baseURL = "http://localhost:5000" + "/api"
const baseURL = window.location.origin + "/api"

const $host = axios.create({baseURL});
const $authHost = axios.create({baseURL});

const authInterceptor = (
  config: InternalAxiosRequestConfig<any>,
): InternalAxiosRequestConfig<any> => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
