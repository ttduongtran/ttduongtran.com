/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// config
import {
  getRefreshToken,
  removeRefreshToken,
  saveRefreshToken,
  removeToken,
  saveToken,
  getToken,
} from './cache-storage';

import { getHeaders } from '.';
import { HOST_API } from '@/config-global';

const API_VERSION = '/v1';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API + API_VERSION,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers = getHeaders() as any;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error: AxiosError) => {
//     const refreshToken = getRefreshToken();

//     if (error.response?.status === 401) {
//       const isRequestRefreshToken = error.config.url?.includes('users/refresh_token');

//       if (isRequestRefreshToken) {
//         removeRefreshToken();
//         // TODO: Disconnect web3auth <-- FIXME
//       }
//       if (!refreshToken) {
//         return Promise.reject(error);
//       }
//       removeToken();
//       try {
//         const params = { refresh_token: refreshToken };
//         const response = await rf.getRequest('AuthRequest').refreshToken(params);
//         const { access_token, refresh_token } = response.data;
//         if (access_token) {
//           saveToken(access_token);
//           saveRefreshToken(refresh_token);
//         }
//       } catch (error) {
//         removeRefreshToken();
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(error || 'Something went wrong');
//   }
// );

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
    register: '/api/auth/register',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
};
