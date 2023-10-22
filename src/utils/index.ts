import { getToken } from '@/utils/cache-storage';

export const isBrowser = typeof window !== 'undefined';

export const getHeaders = (options: object = {}): object =>
  Object.assign(
    {},
    {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    options
  );
