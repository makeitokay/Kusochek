import axios, {AxiosInstance} from "axios";

const $authHost: AxiosInstance = axios.create({
    baseURL:  process.env.REACT_APP_API_BASE_URL
});

const $host: AxiosInstance = axios.create({
    baseURL:  process.env.REACT_APP_API_BASE_URL
});
const $host2: AxiosInstance = axios.create({
    baseURL:  "https://api.kusochek.site"
});

const $adminHost: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_ADMIN_URL
});

const authInterceptor = (config: any) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
};

$authHost.interceptors.request.use(authInterceptor);

export {
    $host2,
    $host,
    $authHost,
    $adminHost
};