// ----------------------------------------------------------------------
// Import
import Cookies from 'js-cookie';
import { isBrowser } from '@/utils';

// Define
const TOKEN_NAME = '_w.token';
const REFRESH_NAME = '_w.rt';

// ----------------------------------------------------------------------

// Cookies
export const saveRefreshToken = (token: string, exp?: number): void => {
  const date = new Date();
  exp = exp || 7;
  Cookies.set(REFRESH_NAME, token, {
    expires: new Date(date.setDate(date.getDate() + exp)),
  });
};
export const getRefreshToken = (): string | undefined => Cookies.get(REFRESH_NAME);
export const removeRefreshToken = (): void => Cookies.remove(REFRESH_NAME);

// ----------------------------------------------------------------------

// LocalStorage
export const saveToken = (token: string) => {
  return isBrowser && token ? localStorage.setItem(TOKEN_NAME, token) : null;
};

export const getToken = () => {
  return isBrowser ? localStorage.getItem(TOKEN_NAME) : null;
};

export const removeToken = () => {
  return isBrowser ? localStorage.removeItem(TOKEN_NAME) : null;
};

// ----------------------------------------------------------------------

// SessionStorage

// ----------------------------------------------------------------------
