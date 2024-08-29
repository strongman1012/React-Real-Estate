import axios from 'axios';

export const AUTHENTICATION_SERVER_URL = "https://react-userroles-backend.onrender.com/api/v0"; // authentication server
export const SELF_SERVER_URL = "https://react-applicationb-backend.onrender.com/api/v0"; // self server
export const API_VERSION = "v0";

export const apiClient = axios.create({
    baseURL: AUTHENTICATION_SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const selfApiClient = axios.create({
    baseURL: SELF_SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

selfApiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

