import axios, { AxiosResponse, AxiosError } from 'axios';
import { HOST_API_URL } from '@/config';
import {
  getRefreshToken,
  removeRefreshToken,
  saveRefreshToken,
  removeToken,
  saveToken,
  getToken,
} from './cacheStorage';
import rf from '@/requests/RequestFactory';
import { getHeaders } from '.';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API_URL,
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

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const refreshToken = getRefreshToken();

    if (error.response?.status === 401) {
      const isRequestRefreshToken = error.config.url?.includes('users/refresh_token');

      if (isRequestRefreshToken) {
        removeRefreshToken();
        // TODO: Disconnect web3auth <-- FIXME
      }
      if (!refreshToken) {
        return Promise.reject(error);
      }
      removeToken();
      try {
        const params = { refresh_token: refreshToken };
        const response = await rf.getRequest('AuthRequest').refreshToken(params);
        const { access_token, refresh_token } = response.data;
        if (access_token) {
          saveToken(access_token);
          saveRefreshToken(refresh_token);
        }
      } catch (error) {
        removeRefreshToken();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error || 'Something went wrong');
  }
);

export default axiosInstance;
