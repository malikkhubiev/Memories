import axios, { InternalAxiosRequestConfig } from "axios";

// const baseURL = process.env.REACT_APP_API_URL + "api"; 
const baseURL = window.location.origin + "/api";

const $host = axios.create({baseURL});
const $authHost = axios.create({baseURL});

const authInterceptor = (
  config: InternalAxiosRequestConfig<any>,
): InternalAxiosRequestConfig<any> => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $authHost, $host };

