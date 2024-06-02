import axios from "axios";
import useAuthStore from "./stores/authStore";


export const API_URL = (process.env.NODE_ENV === 'development') ? 'http://localhost:3030/' : 'https://yeeppie-be.onrender.com';

export const axiosInstance = axios.create({
    baseURL: API_URL,
    validateStatus: function (status) {
        return status < 500;
    },
});

axiosInstance.interceptors.request.use(
    async function (config) {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    async function (response) {
        // const originalRequest: typeof response.config & {_retry?: boolean} = response.config;
        // if (response.status === 401 && !originalRequest?._retry) {
        //     originalRequest._retry = true;
        //     const res = await axiosInstance.post('/user/refresh-token');
        //     if (res.status === 200) {
        //         localStorage.setItem('ensi-36o_token', res.data.data?.accessToken);
        //         return axiosInstance(originalRequest);
        //     }
        // }
        if (response.status == 401) {
            useAuthStore.getState().logout();
        }
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);